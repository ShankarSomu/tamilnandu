import { sendVerificationEmail } from "../_shared/email";

interface D1Database {
  prepare(query: string): {
    bind(...values: unknown[]): {
      first<T>(): Promise<T | null>;
      run(): Promise<unknown>;
    };
  };
}

interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  SITE_URL: string;
  EMAIL_FROM: string;
}

type WaitlistRequest = {
  name?: unknown;
  email?: unknown;
  interests?: unknown;
  message?: unknown;
  consent?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedInterests = new Set(["developer", "community", "member", "mentor"]);
const verificationCooldownMs = 15 * 60 * 1000;
const verificationLifetimeMs = 24 * 60 * 60 * 1000;

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

async function createVerificationToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const token = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  const hash = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");

  return { token, hash };
}

export const onRequestPost = async ({
  request,
  env
}: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  let body: WaitlistRequest;
  try {
    body = (await request.json()) as WaitlistRequest;
  } catch {
    return json({ error: "Invalid request payload." }, 400);
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const interests = Array.isArray(body.interests) ? body.interests : [];
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (email.length > 254 || !emailPattern.test(email)) {
    return json({ error: "Please provide a valid email address." }, 400);
  }
  if (body.consent !== true) {
    return json({ error: "Email consent is required to join the early-interest list." }, 400);
  }
  if (name.length > 120) {
    return json({ error: "Name is too long." }, 400);
  }
  if (message.length > 1000) {
    return json({ error: "Your message is too long. Please keep it under 1000 characters." }, 400);
  }
  if (!interests.every((item) => typeof item === "string" && allowedInterests.has(item))) {
    return json({ error: "Invalid interest selected." }, 400);
  }

  const { token, hash } = await createVerificationToken();
  const now = new Date();
  const nowIso = now.toISOString();
  const expiresAt = new Date(now.getTime() + verificationLifetimeMs).toISOString();
  const resendAfter = new Date(now.getTime() - verificationCooldownMs).toISOString();
  let signup: {
    verified_at: string | null;
    verification_sent_at: string | null;
    verification_token_hash: string | null;
  } | null;

  try {
    signup = await env.DB.prepare(
      `INSERT INTO waitlist (
         email, name, interests, message, consent, created_at, verified_at,
         verification_token_hash, verification_expires_at, verification_sent_at
       )
       VALUES (?1, ?2, ?3, ?4, 1, ?5, NULL, ?6, ?7, ?5)
       ON CONFLICT(email) DO UPDATE SET name = excluded.name, interests = excluded.interests,
         message = COALESCE(excluded.message, waitlist.message),
         verification_token_hash = CASE
           WHEN waitlist.verified_at IS NULL
             AND (waitlist.verification_sent_at IS NULL OR waitlist.verification_sent_at <= ?8)
           THEN excluded.verification_token_hash
           ELSE waitlist.verification_token_hash
         END,
         verification_expires_at = CASE
           WHEN waitlist.verified_at IS NULL
             AND (waitlist.verification_sent_at IS NULL OR waitlist.verification_sent_at <= ?8)
           THEN excluded.verification_expires_at
           ELSE waitlist.verification_expires_at
         END,
         verification_sent_at = CASE
           WHEN waitlist.verified_at IS NULL
             AND (waitlist.verification_sent_at IS NULL OR waitlist.verification_sent_at <= ?8)
           THEN excluded.verification_sent_at
           ELSE waitlist.verification_sent_at
         END
       RETURNING verified_at, verification_sent_at, verification_token_hash`
    )
      .bind(
        email,
        name || null,
        JSON.stringify(Array.from(new Set(interests))),
        message || null,
        nowIso,
        hash,
        expiresAt,
        resendAfter
      )
      .first<{
        verified_at: string | null;
        verification_sent_at: string | null;
        verification_token_hash: string | null;
      }>();
  } catch (error) {
    console.error("Failed to save waitlist signup:", error);
    return json({ error: "Unable to save your request right now. Please try again shortly." }, 500);
  }

  if (!signup) {
    console.error("Waitlist signup query returned no record.");
    return json({ error: "Unable to save your request right now. Please try again shortly." }, 500);
  }

  const shouldSendEmail =
    signup.verified_at === null &&
    signup.verification_sent_at === nowIso &&
    signup.verification_token_hash === hash;

  if (shouldSendEmail) {
    try {
      await sendVerificationEmail(env, { email, name, token });
    } catch (error) {
      console.error("Failed to send waitlist verification email:", error);
      try {
        await env.DB.prepare(
          `UPDATE waitlist
           SET verification_token_hash = NULL, verification_expires_at = NULL,
               verification_sent_at = NULL
           WHERE email = ?1 AND verification_token_hash = ?2 AND verified_at IS NULL`
        )
          .bind(email, hash)
          .run();
      } catch (cleanupError) {
        console.error("Failed to clear an unsent verification token:", cleanupError);
      }
      return json(
        { error: "We couldn't send the verification email. Please try again shortly." },
        502
      );
    }
  }

  return json(
    {
      ok: true,
      message: "If this address is awaiting confirmation, check your inbox for the verification link."
    },
    200
  );
};
