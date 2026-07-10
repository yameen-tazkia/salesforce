"use client";

import { useState } from "react";
import { FRAMEWORK_PHASES } from "@/lib/data/framework";
import Badge from "@/components/ui/Badge";

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
        {title}
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FrameworkJourney() {
  const [active, setActive] = useState(0);
  const phase = FRAMEWORK_PHASES[active];

  return (
    <div>
      {/* Timeline */}
      <ol className="relative mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {FRAMEWORK_PHASES.map((p, i) => {
          const isActive = i === active;
          return (
            <li key={p.id} className="relative">
              {i < FRAMEWORK_PHASES.length - 1 && (
                <span
                  className="absolute left-1/2 top-5 hidden h-0.5 w-full bg-navy-100 lg:block"
                  aria-hidden
                />
              )}
              <button
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className="relative z-10 flex w-full flex-col items-center gap-2 rounded-xl p-2 text-center transition-colors hover:bg-emerald-50"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                    isActive
                      ? "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
                      : i < active
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : "border-navy-200 bg-white text-navy-500"
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`text-xs font-semibold leading-tight ${
                    isActive ? "text-emerald-700" : "text-navy-800"
                  }`}
                >
                  {p.name}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Active phase detail */}
      <div
        key={phase.id}
        className="animate-fade-up rounded-2xl border border-[var(--hairline)] bg-white p-8 shadow-sm shadow-navy-950/[0.03]"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
              Phase {active + 1} of {FRAMEWORK_PHASES.length}
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-navy-950 md:text-3xl">
              {phase.name}
            </h2>
            <p className="mt-1 text-[var(--ink-secondary)]">{phase.tagline}</p>
          </div>
          <Badge tone="teal">Typical duration · {phase.duration}</Badge>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <DetailList title="Objectives" items={phase.objectives} />
          <DetailList title="Key activities" items={phase.activities} />
          <DetailList title="Deliverables" items={phase.deliverables} />
          <DetailList title="Outputs" items={phase.outputs} />
          <div className="lg:col-span-2">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Business outcomes
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {phase.outcomes.map((o) => (
                <div key={o} className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
                  {o}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between border-t border-[var(--hairline)] pt-5">
          <button
            onClick={() => setActive(Math.max(0, active - 1))}
            disabled={active === 0}
            className="text-sm font-semibold text-emerald-700 disabled:opacity-30"
          >
            ← {active > 0 ? FRAMEWORK_PHASES[active - 1].name : "Previous"}
          </button>
          <button
            onClick={() => setActive(Math.min(FRAMEWORK_PHASES.length - 1, active + 1))}
            disabled={active === FRAMEWORK_PHASES.length - 1}
            className="text-sm font-semibold text-emerald-700 disabled:opacity-30"
          >
            {active < FRAMEWORK_PHASES.length - 1
              ? FRAMEWORK_PHASES[active + 1].name
              : "Next"}{" "}
            →
          </button>
        </div>
      </div>
    </div>
  );
}
