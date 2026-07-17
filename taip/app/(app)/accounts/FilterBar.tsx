"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

const SELECTS: { key: string; label: string; options: [string, string][] }[] = [
  {
    key: "country",
    label: "Country",
    options: [
      ["UAE", "UAE"],
      ["Saudi Arabia", "Saudi Arabia"],
      ["Qatar", "Qatar"],
      ["Oman", "Oman"],
      ["Bahrain", "Bahrain"],
      ["Kuwait", "Kuwait"],
      ["Malaysia", "Malaysia ◇"],
      ["Indonesia", "Indonesia ◇"],
    ],
  },
  {
    key: "industry",
    label: "Industry",
    options: [
      "Real Estate",
      "Luxury Retail",
      "Hospitality",
      "Government",
      "Banking",
      "Financial Services",
      "Logistics",
      "Healthcare",
      "Telecommunications",
      "Aviation",
      "Construction",
    ].map((i) => [i, i]),
  },
  {
    key: "confidence",
    label: "Salesforce confidence",
    options: [
      ["Confirmed", "Confirmed"],
      ["Highly likely", "Highly likely"],
      ["Possible", "Possible"],
      ["Unknown", "Unknown"],
    ],
  },
  {
    key: "minRevenue",
    label: "Revenue",
    options: [
      ["500", "≥ $500M"],
      ["1000", "≥ $1B"],
      ["2000", "≥ $2B"],
      ["5000", "≥ $5B"],
    ],
  },
  {
    key: "minEmployees",
    label: "Employees",
    options: [
      ["1000", "≥ 1,000"],
      ["5000", "≥ 5,000"],
      ["10000", "≥ 10,000"],
    ],
  },
  {
    key: "minAiOpportunity",
    label: "Agentforce opportunity",
    options: [
      ["80", "≥ 80 (exceptional)"],
      ["65", "≥ 65 (strong)"],
      ["50", "≥ 50 (developing)"],
    ],
  },
  {
    key: "minAiReadiness",
    label: "AI readiness",
    options: [
      ["60", "≥ 60"],
      ["40", "≥ 40"],
      ["20", "≥ 20"],
    ],
  },
  {
    key: "priority",
    label: "Priority",
    options: [
      ["P1 Strategic", "P1 Strategic"],
      ["P2 High", "P2 High"],
      ["P3 Medium", "P3 Medium"],
      ["P4 Nurture", "P4 Nurture"],
    ],
  },
  {
    key: "sort",
    label: "Sort by",
    options: [
      ["overall", "Overall score"],
      ["aiOpportunity", "AI opportunity"],
      ["salesforce", "Salesforce confidence"],
      ["recent", "Recently researched"],
      ["name", "Name"],
    ],
  },
];

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  function apply(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    startTransition(() => router.replace(`${pathname}?${params.toString()}`, { scroll: false }));
  }

  // Debounced free-text search.
  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      if ((searchParams.get("q") ?? "") !== q) apply("q", q);
    }, 350);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const activeCount = Array.from(searchParams.keys()).filter((k) => k !== "sort").length;

  return (
    <div className="rounded-xl border border-[var(--hairline)] bg-white p-4 shadow-sm shadow-navy-950/[0.03]">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-56 flex-1">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ink-muted)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search company, city, tag…"
            className="w-full rounded-lg border border-[var(--hairline)] py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--hairline)] px-3 py-2 text-xs font-semibold text-[var(--ink-secondary)]">
          <input
            type="checkbox"
            checked={searchParams.get("slack") === "true"}
            onChange={(e) => apply("slack", e.target.checked ? "true" : "")}
            className="h-3.5 w-3.5 accent-emerald-600"
          />
          Slack evidence
        </label>
        {activeCount > 0 && (
          <button
            onClick={() => startTransition(() => router.replace(pathname, { scroll: false }))}
            className="rounded-lg px-3 py-2 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50"
          >
            Clear filters ({activeCount})
          </button>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5">
        {SELECTS.map((select) => (
          <label key={select.key} className="block">
            <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
              {select.label}
            </span>
            <select
              value={searchParams.get(select.key) ?? ""}
              onChange={(e) => apply(select.key, e.target.value)}
              className="w-full rounded-lg border border-[var(--hairline)] bg-white px-2 py-1.5 text-xs font-medium outline-none transition-colors focus:border-emerald-500"
            >
              <option value="">{select.key === "sort" ? "Overall score" : "Any"}</option>
              {select.options.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
}
