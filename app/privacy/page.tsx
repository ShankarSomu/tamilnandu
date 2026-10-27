export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-content bg-offwhite px-4 py-14 text-charcoal sm:px-6 lg:px-8">
      <a href="/" className="text-sm font-medium text-teal">
        ← Back to TamilNandu
      </a>
      <h1 className="mt-6 text-3xl font-bold">Privacy Notice</h1>
      <div className="mt-6 space-y-4 rounded-2xl border border-charcoal/10 bg-white p-6 text-sm leading-relaxed sm:text-base">
        <p>
          TamilNandu currently collects only the details submitted through the early-interest form:
          optional name, required email address, optional interests, an optional free-text note about
          what you are looking for, and email consent. We also store whether you confirmed access to
          your email address and the expiry time for a one-time verification link. The link itself is
          not stored in readable form.
        </p>
        <p>
          We send one verification email after signup. Only after you confirm your email do we use
          your information to send occasional community updates and opportunities to contribute, and
          to understand what the community needs. We do not sell your information. Please do not
          include sensitive personal details in your note.
        </p>
        <p>
          To stop receiving emails or request deletion of your signup, reply to an email or write to{" "}
          <a className="font-medium text-teal" href="mailto:info@tamilnandu.org">
            info@tamilnandu.org
          </a>
          .
        </p>
      </div>
    </main>
  );
}
