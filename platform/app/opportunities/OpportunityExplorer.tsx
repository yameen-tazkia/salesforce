"use client";

import { Fragment, useMemo, useState } from "react";
import { OPPORTUNITY_PROFILES, type Opportunity } from "@/lib/data/opportunities";
import Badge from "@/components/ui/Badge";

const HORIZON_ORDER = ["0–3 months", "3–6 months", "6–12 months", "12+ months"] as const;

function MatrixCell({ items }: { items: Opportunity[] }) {
  return (
    <div className="min-h-[96px] space-y-1.5 p-2">
      {items.map((o) => (
        <p
          key={o.title}
          className="rounded-md border border-[var(--hairline)] bg-white px-2 py-1.5 text-[11px] font-medium leading-snug text-navy-900 shadow-sm"
        >
          {o.title}
        </p>
      ))}
    </div>
  );
}

export default function OpportunityExplorer() {
  const [slug, setSlug] = useState(OPPORTUNITY_PROFILES[0].slug);
  const [department, setDepartment] = useState<string | null>(null);

  const profile = OPPORTUNITY_PROFILES.find((p) => p.slug === slug)!;
  const opportunities = useMemo(
    () =>
      department
        ? profile.opportunities.filter((o) => o.department === department)
        : profile.opportunities,
    [profile, department]
  );

  const quickWins = profile.opportunities.filter((o) => o.quickWin);

  const download = () => {
    const lines: string[] = [
      "TAZKIA INTELLIGENCE — AI OPPORTUNITY ASSESSMENT SUMMARY",
      `Industry: ${profile.industry}`,
      `Generated: ${new Date().toISOString().slice(0, 10)}`,
      "",
      "BUSINESS CHALLENGES",
      ...profile.challenges.map((c) => `  • ${c}`),
      "",
      "QUICK WINS (0–3 MONTHS)",
      ...quickWins.map((o) => `  • ${o.title} [${o.department}] — ${o.description}`),
      "",
      "FULL OPPORTUNITY MAP",
      ...profile.opportunities.map(
        (o) =>
          `  • ${o.title} [${o.department}] — impact ${o.impact}/3, effort ${o.effort}/3, horizon ${o.horizon}\n    ${o.description}`
      ),
      "",
      "ROADMAP",
      ...HORIZON_ORDER.flatMap((h) => {
        const items = profile.opportunities.filter((o) => o.horizon === h);
        return items.length
          ? [`  ${h}:`, ...items.map((o) => `    - ${o.title}`)]
          : [];
      }),
      "",
      "Next step: book a discovery workshop to validate and price this map for your organisation.",
      "tazkia.ai — Practical AI. Delivered with trust.",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tazkia-ai-opportunities-${profile.slug}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-12">
      {/* Industry selector */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
          Select your industry
        </p>
        <div className="flex flex-wrap gap-2">
          {OPPORTUNITY_PROFILES.map((p) => (
            <button
              key={p.slug}
              onClick={() => {
                setSlug(p.slug);
                setDepartment(null);
              }}
              aria-pressed={p.slug === slug}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                p.slug === slug
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "border-[var(--hairline)] bg-white text-navy-800 hover:border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              {p.industry}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges */}
      <div className="animate-fade-up" key={`challenges-${slug}`}>
        <h2 className="mb-4 text-lg font-bold text-navy-950">
          Typical business challenges — {profile.industry}
        </h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {profile.challenges.map((c) => (
            <div key={c} className="flex gap-3 rounded-lg border border-[var(--hairline)] bg-white p-4 text-sm text-[var(--ink-secondary)] shadow-sm">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold-500" aria-hidden />
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* Department filter + opportunities */}
      <div key={`opps-${slug}`}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-navy-950">Suggested AI opportunities</h2>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setDepartment(null)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${!department ? "bg-navy-900 text-white" : "bg-navy-50 text-navy-700 hover:bg-navy-100"}`}
            >
              All departments
            </button>
            {profile.departments.map((d) => (
              <button
                key={d}
                onClick={() => setDepartment(department === d ? null : d)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${department === d ? "bg-navy-900 text-white" : "bg-navy-50 text-navy-700 hover:bg-navy-100"}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((o) => (
            <div key={o.title} className="flex flex-col rounded-xl border border-[var(--hairline)] bg-white p-5 shadow-sm">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge tone="navy">{o.department}</Badge>
                {o.quickWin && <Badge tone="gold">Quick win</Badge>}
              </div>
              <h3 className="text-sm font-semibold text-navy-950">{o.title}</h3>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-[var(--ink-secondary)]">
                {o.description}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-[var(--hairline)] pt-3 text-[11px] font-medium text-[var(--ink-muted)]">
                <span>
                  Impact{" "}
                  <span className="text-emerald-700">{"●".repeat(o.impact)}{"○".repeat(3 - o.impact)}</span>
                </span>
                <span>
                  Effort{" "}
                  <span className="text-navy-700">{"●".repeat(o.effort)}{"○".repeat(3 - o.effort)}</span>
                </span>
                <span>{o.horizon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prioritisation matrix */}
      <div>
        <h2 className="mb-1 text-lg font-bold text-navy-950">Prioritisation matrix</h2>
        <p className="mb-4 text-sm text-[var(--ink-secondary)]">
          Impact against effort. Top-left is where we start: high impact, low effort.
        </p>
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[80px_1fr_1fr_1fr]">
              <div />
              {["Low effort", "Medium effort", "High effort"].map((h) => (
                <p key={h} className="pb-2 text-center text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
                  {h}
                </p>
              ))}
              {[3, 2, 1].map((impact) => (
                <Fragment key={impact}>
                  <p className="flex items-center justify-end pr-3 text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
                    {impact === 3 ? "High impact" : impact === 2 ? "Med impact" : "Low impact"}
                  </p>
                  {[1, 2, 3].map((effort) => {
                    const items = profile.opportunities.filter(
                      (o) => o.impact === impact && o.effort === effort
                    );
                    const highlight = impact === 3 && effort === 1;
                    return (
                      <div
                        key={`${impact}-${effort}`}
                        className={`border border-[var(--hairline)] ${
                          highlight
                            ? "bg-emerald-50"
                            : impact >= 2 && effort <= 2
                              ? "bg-teal-50/50"
                              : "bg-[var(--surface-tint)]"
                        }`}
                      >
                        <MatrixCell items={items} />
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-navy-950">Long-term roadmap</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {HORIZON_ORDER.map((h, i) => {
            const items = profile.opportunities.filter((o) => o.horizon === h);
            return (
              <div key={h} className="rounded-xl border border-[var(--hairline)] bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                  Phase {i + 1}
                </p>
                <p className="mt-0.5 text-sm font-bold text-navy-950">{h}</p>
                <ul className="mt-3 space-y-2">
                  {items.length ? (
                    items.map((o) => (
                      <li key={o.title} className="flex gap-2 text-xs leading-relaxed text-[var(--ink-secondary)]">
                        <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden />
                        {o.title}
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-[var(--ink-muted)]">
                      Scale and optimise earlier phases
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Download */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex-1">
          <h3 className="text-base font-bold text-navy-950">
            Take this summary with you
          </h3>
          <p className="mt-1 text-sm text-[var(--ink-secondary)]">
            Download the {profile.industry} opportunity map — challenges, quick
            wins, prioritisation and roadmap — to share with your team.
          </p>
        </div>
        <button
          onClick={download}
          className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Download summary
        </button>
      </div>
    </div>
  );
}
