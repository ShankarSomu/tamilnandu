"use client";

import { FormEvent, useState } from "react";

const interestOptions = [
  { id: "developer", label: "I'm a developer and want to help build the platform" },
  { id: "community", label: "I can help with design, content, or community building" },
  { id: "member", label: "I want to join as an early member" },
  { id: "mentor", label: "I can share guidance, introductions, or mentoring" }
];

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: (formData.get("name") ?? "").toString().trim(),
      email: (formData.get("email") ?? "").toString().trim(),
      interests: formData.getAll("interests").map((item) => item.toString()),
      consent: formData.get("consent") === "on"
    };

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const responseBody = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(
          responseBody?.error ??
            "We could not save your request. Please try again."
        );
      }

      setStatus("success");
      form.reset();
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <form
      className="rounded-2xl border border-teal/10 bg-white p-6 shadow-md sm:p-8"
      onSubmit={onSubmit}
      aria-describedby="form-note"
    >
      <div className="grid gap-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal" htmlFor="name">
            Name (optional)
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            className="w-full rounded-xl border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/45"
            placeholder="What should we call you?"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal" htmlFor="email">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/45"
            placeholder="you@example.com"
          />
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-charcoal">
            I&apos;m interested in (optional)
          </legend>
          <div className="grid gap-2">
            {interestOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-start gap-3 rounded-lg border border-charcoal/10 p-3 text-sm text-charcoal"
              >
                <input
                  type="checkbox"
                  name="interests"
                  value={option.id}
                  className="mt-0.5 h-4 w-4 rounded border-charcoal/30 text-teal focus:ring-teal"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label className="flex items-start gap-3 text-sm text-charcoal">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 h-4 w-4 rounded border-charcoal/30 text-teal focus:ring-teal"
            />
            <span>
              I agree to receive TamilNandu updates by email and understand I can unsubscribe at
              any time. <span aria-hidden="true">*</span>
            </span>
          </label>
        </div>

        <p id="form-note" className="text-sm text-charcoal/75">
          By signing up, you consent to occasional launch and community updates. Read our{" "}
          <a href="/privacy" className="font-medium text-teal">
            Privacy Notice
          </a>
          .
        </p>

        <div aria-live="polite" className="min-h-6 text-sm">
          {status === "error" && <p className="font-medium text-red-700">{error}</p>}
          {status === "success" && (
            <p className="font-medium text-teal">
              Thank you. You&apos;re on the early-interest list, and we&apos;ll share updates soon.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-xl bg-teal px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal/90 disabled:cursor-not-allowed disabled:bg-teal/60"
        >
          {status === "loading" ? "Saving your request..." : "Keep Me Updated"}
        </button>
      </div>
    </form>
  );
}
