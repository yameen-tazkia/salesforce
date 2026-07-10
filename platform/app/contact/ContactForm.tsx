"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const ENGAGEMENTS = [
  {
    id: "discovery",
    name: "Book a Discovery Workshop",
    duration: "1 day · on-site or remote",
    deliverable: "A prioritised AI opportunity map for your organisation",
    detail:
      "We facilitate your leadership team through challenges, opportunities and prioritisation — the same method behind this platform's Opportunity Assessment.",
  },
  {
    id: "readiness",
    name: "Book an AI Readiness Assessment",
    duration: "2–3 weeks",
    deliverable: "Scored readiness profile, gap analysis and roadmap",
    detail:
      "A structured assessment across technology, data, governance, people, process and departments — with an executive readout.",
  },
  {
    id: "pilot",
    name: "Request a Pilot Programme",
    duration: "4–6 weeks",
    deliverable: "A working AI agent measured against a business case",
    detail:
      "One high-value use case, delivered and measured. You keep the results either way — proof before commitment.",
  },
] as const;

export default function ContactForm() {
  const params = useSearchParams();
  const resource = params.get("resource");
  const [engagement, setEngagement] = useState<string>(
    resource ? "" : "discovery"
  );
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const selected = ENGAGEMENTS.find((e) => e.id === engagement);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600">
          <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 13l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="text-xl font-bold text-navy-950">Thank you — we've received your request.</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
          A consultant (not an autoresponder) will reply within one business
          day to schedule your session.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-emerald-700 hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Engagement selector */}
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
          Choose your starting point
        </p>
        <div className="space-y-3" role="radiogroup" aria-label="Engagement type">
          {ENGAGEMENTS.map((e) => (
            <button
              key={e.id}
              role="radio"
              aria-checked={engagement === e.id}
              onClick={() => setEngagement(e.id)}
              className={`block w-full rounded-xl border p-5 text-left transition-all ${
                engagement === e.id
                  ? "border-emerald-600 bg-emerald-50 shadow-md shadow-emerald-600/10"
                  : "border-[var(--hairline)] bg-white hover:border-emerald-300"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-base font-bold text-navy-950">{e.name}</p>
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    engagement === e.id ? "border-emerald-600" : "border-navy-200"
                  }`}
                  aria-hidden
                >
                  {engagement === e.id && <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />}
                </span>
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold-700">
                {e.duration}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">{e.detail}</p>
              <p className="mt-2 text-sm font-medium text-emerald-800">
                You leave with: {e.deliverable}
              </p>
            </button>
          ))}
        </div>
        {resource && (
          <p className="mt-4 rounded-lg border border-gold-200 bg-gold-50 px-4 py-3 text-sm text-gold-900">
            Requesting resource: <strong>{resource}</strong> — we'll include it in
            our reply.
          </p>
        )}
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="h-fit rounded-2xl border border-[var(--hairline)] bg-white p-6 shadow-sm md:p-8">
        <input type="hidden" name="access_key" value="d67d4ce4-a2c2-48f4-9112-14381c904af7" />
        <input type="hidden" name="subject" value={`Platform enquiry — ${selected?.name ?? "Resource request"}`} />
        <input type="hidden" name="engagement" value={selected?.name ?? "Resource request"} />
        {resource && <input type="hidden" name="resource" value={resource} />}
        <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />

        <h2 className="text-lg font-bold text-navy-950">Tell us about you</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-navy-900">Full name</span>
            <input required name="name" className="w-full rounded-lg border border-[var(--hairline)] px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-navy-900">Work email</span>
            <input required type="email" name="email" className="w-full rounded-lg border border-[var(--hairline)] px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-navy-900">Organisation</span>
            <input required name="organisation" className="w-full rounded-lg border border-[var(--hairline)] px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-navy-900">Country</span>
            <select name="country" className="w-full rounded-lg border border-[var(--hairline)] bg-white px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
              {["United Arab Emirates", "Saudi Arabia", "Qatar", "Malaysia", "Indonesia", "Other"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block font-medium text-navy-900">Industry</span>
            <select name="industry" className="w-full rounded-lg border border-[var(--hairline)] bg-white px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
              {["Real Estate", "Luxury Retail", "Banking / Financial Services", "Hospitality", "Government", "Logistics", "Aviation", "Healthcare", "Telecom", "Software Development", "Other"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block font-medium text-navy-900">
              What would you like AI to change in your organisation?
            </span>
            <textarea name="message" rows={4} className="w-full rounded-lg border border-[var(--hairline)] px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
          </label>
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-6 w-full rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : selected ? selected.name : "Send request"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-center text-sm font-medium text-red-700">
            Something went wrong — please try again, or email us directly.
          </p>
        )}
        <p className="mt-4 text-center text-xs text-[var(--ink-muted)]">
          No newsletters, no automated sequences. A consultant replies within
          one business day.
        </p>
      </form>
    </div>
  );
}
