"use client";

import { FormEvent, useEffect, useState } from "react";

type Status = "loading" | "ready" | "submitting" | "success" | "error";

export default function VerifyPage() {
  const [status, setStatus] = useState<Status>("loading");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("status") === "success") {
      setStatus("success");
      return;
    }

    const verificationToken = params.get("token");
    if (verificationToken) {
      setToken(verificationToken);
      setStatus("ready");
      return;
    }

    setError("This verification link is missing. Return to the signup form to request a new one.");
    setStatus("error");
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        if (response.status === 400) {
          setToken("");
        }
        throw new Error(result.error ?? "We couldn't verify your email. Please try again.");
      }

      window.history.replaceState(null, "", "/verify?status=success");
      setStatus("success");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-offwhite px-4 py-14 text-charcoal sm:px-6">
      <section className="w-full max-w-xl rounded-3xl border border-charcoal/10 bg-white p-7 shadow-sm sm:p-10">
        <a href="/" className="text-sm font-semibold text-teal">
          TamilNandu
        </a>

        {status === "success" ? (
          <>
            <h1 className="mt-6 font-serif text-3xl font-bold">Thank you for confirming.</h1>
            <p className="mt-4 leading-relaxed text-charcoal/80">
              Your email is verified and your early-community signup is confirmed. We appreciate
              you being here.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/ShankarSomu/tamilnandu"
                className="inline-flex items-center justify-center rounded-xl bg-teal px-5 py-3 text-sm font-semibold text-white no-underline hover:bg-teal/90"
              >
                Explore the GitHub project
              </a>
              <a
                href="https://github.com/ShankarSomu/tamilnandu/blob/main/CONTRIBUTING.md"
                className="inline-flex items-center justify-center rounded-xl border border-teal/25 px-5 py-3 text-sm font-semibold text-teal no-underline hover:bg-teal/5"
              >
                How to contribute
              </a>
            </div>
            <p className="mt-6 text-sm text-charcoal/75">
              Have an idea or looking for support?{" "}
              <a href="/#join-early" className="font-medium text-teal">
                Tell us what you need
              </a>{" "}
              or reply to our email.
            </p>
          </>
        ) : (
          <>
            <h1 className="mt-6 font-serif text-3xl font-bold">Confirm your email</h1>
            <p className="mt-4 leading-relaxed text-charcoal/80">
              Confirm that you can access this email address to complete your TamilNandu signup.
            </p>
            <div aria-live="polite" className="mt-5 min-h-6 text-sm">
              {status === "error" && <p className="font-medium text-red-700">{error}</p>}
              {status === "loading" && <p>Loading your verification link...</p>}
            </div>
            {token && (
              <form className="mt-5" onSubmit={onSubmit}>
                <button
                  type="submit"
                  disabled={status !== "ready" && status !== "error"}
                  className="inline-flex items-center justify-center rounded-xl bg-teal px-5 py-3 text-sm font-semibold text-white hover:bg-teal/90 disabled:cursor-not-allowed disabled:bg-teal/60"
                >
                  {status === "submitting" ? "Verifying..." : "Confirm my email"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="mt-5 text-sm text-charcoal/75">
                Go back to the{" "}
                <a href="/#join-early" className="font-medium text-teal">
                  signup form
                </a>{" "}
                to request a fresh link.
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
}
