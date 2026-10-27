interface EmailEnv {
  RESEND_API_KEY: string;
  SITE_URL: string;
  EMAIL_FROM: string;
}

interface VerificationEmail {
  email: string;
  name: string;
  token: string;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendVerificationEmail(
  env: EmailEnv,
  { email, name, token }: VerificationEmail
) {
  if (!env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const verificationUrl = new URL("/verify", env.SITE_URL);
  verificationUrl.searchParams.set("token", token);
  const greeting = name ? `Hello ${name},` : "Hello,";
  const safeGreeting = escapeHtml(greeting);
  const url = verificationUrl.toString();
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [email],
      reply_to: "info@tamilnandu.org",
      subject: "Please confirm your TamilNandu email",
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937">
        <p>${safeGreeting}</p>
        <p>Thank you for joining the TamilNandu early community. Please confirm that you can access this email address to complete your signup.</p>
        <p><a href="${url}" style="display:inline-block;padding:12px 20px;background:#115e59;color:#ffffff;text-decoration:none;border-radius:8px">Confirm my email</a></p>
        <p>This link expires in 24 hours. If you did not sign up, you can ignore this email.</p>
        <hr style="border:0;border-top:1px solid #e5e7eb;margin:24px 0">
        <p>Want to help shape TamilNandu? <a href="https://github.com/ShankarSomu/tamilnandu">Explore the project on GitHub</a>, read the <a href="https://github.com/ShankarSomu/tamilnandu/blob/main/CONTRIBUTING.md">contribution guide</a>, or <a href="https://tamilnandu.org/#join-early">tell us what support you need or what you would like to contribute</a>.</p>
        <p>Questions or want to opt out? Reply to this email or write to <a href="mailto:info@tamilnandu.org">info@tamilnandu.org</a>.</p>
        <p>With care,<br>The TamilNandu team</p>
      </div>`,
      text: `${greeting}

Thank you for joining the TamilNandu early community. Please confirm that you can access this email address to complete your signup.

Confirm your email: ${url}

This link expires in 24 hours. If you did not sign up, you can ignore this email.

Want to help shape TamilNandu? Explore the project on GitHub: https://github.com/ShankarSomu/tamilnandu
Contribution guide: https://github.com/ShankarSomu/tamilnandu/blob/main/CONTRIBUTING.md
Tell us what support you need or what you would like to contribute: https://tamilnandu.org/#join-early

Questions or want to opt out? Reply to this email or write to info@tamilnandu.org.

With care,
The TamilNandu team`
    })
  });

  if (!response.ok) {
    throw new Error(`Resend API request failed with status ${response.status}.`);
  }
}
