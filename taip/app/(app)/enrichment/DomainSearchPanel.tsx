"use client";

import { useState } from "react";
import type { DomainEnrichmentResult } from "@/modules/enrichment/types";

export default function DomainSearchPanel({ hunterConnected }: { hunterConnected: boolean }) {
  const [domain, setDomain] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DomainEnrichmentResult | null>(null);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setResult(null);
    const res = await fetch("/api/v1/enrichment/domain-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: "hunter", domain }),
    });
    const body = await res.json().catch(() => null);
    if (res.ok && body?.data) {
      setResult(body.data as DomainEnrichmentResult);
    } else {
      setError(body?.error?.message ?? "Enrichment failed.");
    }
    setBusy(false);
  }

  return (
    <div>
      <form onSubmit={search} className="flex flex-wrap gap-2">
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="company-domain.com"
          className="min-w-64 flex-1 rounded-lg border border-[var(--hairline)] px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
        <button
          type="submit"
          disabled={busy || !domain.trim()}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
        >
          {busy ? "Searching…" : "Search via Hunter.io"}
        </button>
      </form>
      {!hunterConnected && (
        <p className="mt-2 text-xs text-gold-800">
          Hunter.io is not configured in this environment — set{" "}
          <code className="rounded bg-navy-50 px-1 py-0.5">HUNTER_API_KEY</code> to enable live
          lookups.
        </p>
      )}
      {error && (
        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-800">
          {error}
        </p>
      )}
      {result && (
        <div className="mt-4 overflow-x-auto">
          <p className="mb-2 text-xs text-[var(--ink-secondary)]">
            <span className="font-bold text-navy-950">{result.organisation ?? result.domain}</span>{" "}
            · {result.contacts.length} contact{result.contacts.length === 1 ? "" : "s"} found
          </p>
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--hairline)] text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Title</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {result.contacts.map((c) => (
                <tr key={`${c.fullName}-${c.email}`}>
                  <td className="py-2 pr-3 font-medium text-navy-950">{c.fullName}</td>
                  <td className="py-2 pr-3 text-xs text-[var(--ink-secondary)]">{c.title ?? "—"}</td>
                  <td className="py-2 pr-3 text-xs text-[var(--ink-secondary)]">{c.email ?? "—"}</td>
                  <td className="py-2 text-xs tabular-nums text-[var(--ink-muted)]">
                    {c.emailConfidence != null ? `${c.emailConfidence}%` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
