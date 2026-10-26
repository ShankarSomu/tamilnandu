interface D1Database {
  prepare(query: string): {
    bind(...values: unknown[]): { run(): Promise<unknown> };
  };
}

interface Env {
  DB: D1Database;
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

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
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

  try {
    // Re-submitting the same email updates the record instead of creating a duplicate.
    await env.DB.prepare(
      `INSERT INTO waitlist (email, name, interests, message, consent, created_at)
       VALUES (?1, ?2, ?3, ?4, 1, ?5)
       ON CONFLICT(email) DO UPDATE SET name = excluded.name, interests = excluded.interests,
         message = COALESCE(excluded.message, waitlist.message)`
    )
      .bind(
        email,
        name || null,
        JSON.stringify(Array.from(new Set(interests))),
        message || null,
        new Date().toISOString()
      )
      .run();
  } catch (error) {
    console.error("Failed to save waitlist signup:", error);
    return json({ error: "Unable to save your request right now. Please try again shortly." }, 500);
  }

  return json({ ok: true }, 201);
};
