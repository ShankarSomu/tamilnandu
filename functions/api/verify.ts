interface D1Database {
  prepare(query: string): {
    bind(...values: unknown[]): {
      first<T>(): Promise<T | null>;
    };
  };
}

interface Env {
  DB: D1Database;
}

interface VerificationRequest {
  token?: unknown;
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

async function hashToken(token: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export const onRequestPost = async ({
  request,
  env
}: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  let body: VerificationRequest;
  try {
    body = (await request.json()) as VerificationRequest;
  } catch {
    return json({ error: "Invalid request payload." }, 400);
  }

  if (typeof body.token !== "string" || !/^[a-f0-9]{64}$/.test(body.token)) {
    return json({ error: "This verification link is invalid or has expired." }, 400);
  }

  try {
    const now = new Date().toISOString();
    const verified = await env.DB.prepare(
      `UPDATE waitlist
       SET status = 'verified', verified_at = ?1, verification_token_hash = NULL,
           verification_expires_at = NULL, verification_sent_at = NULL
       WHERE verification_token_hash = ?2 AND verification_expires_at > ?1
         AND verified_at IS NULL
       RETURNING email`
    )
      .bind(now, await hashToken(body.token))
      .first<{ email: string }>();

    if (!verified) {
      return json({ error: "This verification link is invalid, expired, or already used." }, 400);
    }

    return json({ ok: true }, 200);
  } catch (error) {
    console.error("Failed to verify waitlist email:", error);
    return json({ error: "We couldn't verify your email right now. Please try again." }, 500);
  }
};
