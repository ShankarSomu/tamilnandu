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
          what you are looking for, and email consent.
        </p>
        <p>
          This information is used only to send updates about the community launch and opportunities
          to contribute, and to help us understand what the community needs. We do not sell your
          information, and we collect only what is needed. Please do not include sensitive personal
          details in your note.
        </p>
        <p>
          If you no longer want updates, you can unsubscribe from future emails once outreach
          begins.
        </p>
      </div>
    </main>
  );
}
