"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  USE_CASES,
  DEPARTMENTS,
  TECHNOLOGIES,
  OBJECTIVES,
} from "@/lib/data/useCases";
import Badge from "@/components/ui/Badge";
import Expandable from "@/components/ui/Expandable";

const INDUSTRY_OPTIONS = Array.from(
  new Set(USE_CASES.map((uc) => uc.industry))
).sort();

function FilterGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: readonly string[];
  selected: string | null;
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            aria-pressed={selected === opt}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              selected === opt
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-[var(--hairline)] bg-white text-navy-800 hover:border-emerald-300 hover:bg-emerald-50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function UseCaseLibrary() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string | null>(null);
  const [department, setDepartment] = useState<string | null>(null);
  const [technology, setTechnology] = useState<string | null>(null);
  const [objective, setObjective] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return USE_CASES.filter((uc) => {
      if (industry && uc.industry !== industry) return false;
      if (department && uc.department !== department) return false;
      if (technology && !uc.technology.includes(technology)) return false;
      if (objective && uc.objective !== objective) return false;
      if (
        q &&
        ![uc.title, uc.problem, uc.solution, uc.industry, uc.department]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });
  }, [query, industry, department, technology, objective]);

  const clear = () => {
    setQuery("");
    setIndustry(null);
    setDepartment(null);
    setTechnology(null);
    setObjective(null);
  };

  const hasFilters = query || industry || department || technology || objective;

  return (
    <div>
      {/* Search + filters */}
      <div className="mb-8 rounded-2xl border border-[var(--hairline)] bg-white p-6 shadow-sm">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search use cases — e.g. 'lead', 'shipment', 'approvals'…"
          className="mb-5 w-full rounded-lg border border-[var(--hairline)] bg-[var(--surface-tint)] px-4 py-3 text-sm text-navy-950 outline-none transition-colors placeholder:text-[var(--ink-muted)] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          aria-label="Search use cases"
        />
        <div className="space-y-4">
          <FilterGroup label="Industry" options={INDUSTRY_OPTIONS} selected={industry} onToggle={(v) => setIndustry(industry === v ? null : v)} />
          <FilterGroup label="Department" options={DEPARTMENTS} selected={department} onToggle={(v) => setDepartment(department === v ? null : v)} />
          <FilterGroup label="Technology" options={TECHNOLOGIES} selected={technology} onToggle={(v) => setTechnology(technology === v ? null : v)} />
          <FilterGroup label="Business objective" options={OBJECTIVES} selected={objective} onToggle={(v) => setObjective(objective === v ? null : v)} />
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-[var(--hairline)] pt-4">
          <p className="text-sm font-medium text-[var(--ink-secondary)]">
            <strong className="text-navy-950">{results.length}</strong> of{" "}
            {USE_CASES.length} use cases
          </p>
          {hasFilters && (
            <button onClick={clear} className="text-sm font-semibold text-emerald-700 hover:underline">
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {results.map((uc) => (
          <Expandable
            key={uc.id}
            title={uc.title}
            subtitle={`${uc.industry} · ${uc.department} · ${uc.effortWeeks}`}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-700">
                  Problem
                </p>
                <p className="text-sm leading-relaxed text-[var(--ink-secondary)]">{uc.problem}</p>
                <p className="mb-1.5 mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                  Solution
                </p>
                <p className="text-sm leading-relaxed text-[var(--ink-secondary)]">{uc.solution}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
                    Technology
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {uc.technology.map((t) => (
                      <Badge key={t} tone="navy">{t}</Badge>
                    ))}
                  </div>
                </div>
                <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-lg bg-[var(--surface-tint)] p-3">
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Effort</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-navy-950">{uc.effort} · {uc.effortWeeks}</dd>
                  </div>
                  <div className="rounded-lg bg-[var(--surface-tint)] p-3 sm:col-span-2">
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Business value</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-navy-950">{uc.value}</dd>
                  </div>
                </dl>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">ROI outlook</p>
                  <p className="mt-0.5 text-sm font-medium text-emerald-900">{uc.roi}</p>
                </div>
              </div>
            </div>
          </Expandable>
        ))}
        {results.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[var(--hairline)] bg-[var(--surface-tint)] p-12 text-center">
            <p className="font-semibold text-navy-950">No use cases match those filters.</p>
            <p className="mt-1 text-sm text-[var(--ink-secondary)]">
              Try clearing a filter — or{" "}
              <Link href="/contact" className="font-semibold text-emerald-700 hover:underline">
                tell us about your use case
              </Link>{" "}
              and we'll scope it with you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
