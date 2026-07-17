"use client";

import { useMemo, useState } from "react";
import type { Initiative, Bucket } from "@/lib/navigator/engine";
import { BUCKET_META } from "@/lib/navigator/engine";

const BUCKET_STYLE: Record<Bucket, { chip: string; dot: string }> = {
  "quick-win": {
    chip: "border-emerald-300 bg-emerald-50 text-emerald-900",
    dot: "bg-emerald-600",
  },
  strategic: {
    chip: "border-navy-200 bg-navy-50 text-navy-900",
    dot: "bg-navy-800",
  },
  medium: {
    chip: "border-teal-200 bg-teal-50 text-teal-900",
    dot: "bg-teal-600",
  },
  low: {
    chip: "border-slate-200 bg-slate-50 text-slate-600",
    dot: "bg-slate-400",
  },
};

/**
 * Interactive impact × effort matrix. Initiatives are positioned by the
 * engine's scores; clicking an initiative marks it as a focus priority.
 * A grouped list below the plot carries the same data for small screens
 * and assistive tech.
 */
export default function PriorityMatrix({
  initiatives,
  selected,
  onToggle,
  interactive = true,
}: {
  initiatives: Initiative[];
  selected: string[];
  onToggle?: (id: string) => void;
  interactive?: boolean;
}) {
  const [active, setActive] = useState<Initiative | null>(null);

  // Position: x = effort (light → heavy), y = impact (low at bottom),
  // with a greedy collision pass so chip labels stay readable.
  const positions = useMemo(() => {
    const placed: { x: number; y: number }[] = [];
    return initiatives.map((init) => {
      let x = Math.min(80, Math.max(3, ((init.effort - 0.6) / 5) * 100));
      let y = Math.min(86, Math.max(6, 100 - ((init.impact - 0.6) / 5) * 100));
      let guard = 0;
      while (
        placed.some((p) => Math.abs(p.x - x) < 16 && Math.abs(p.y - y) < 8) &&
        guard < 24
      ) {
        y += 8;
        if (y > 86) {
          y = 6 + (guard % 3) * 4;
          x = Math.min(80, x + 10);
        }
        guard++;
      }
      placed.push({ x, y });
      return { left: `${x}%`, top: `${y}%` };
    });
  }, [initiatives]);

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-[var(--hairline)] bg-white">
        {/* quadrant tints */}
        <div className="pointer-events-none absolute inset-0 grid grid-cols-2 grid-rows-2" aria-hidden>
          <div className="bg-emerald-50/60" /> {/* high impact, low effort */}
          <div className="bg-navy-50/50" /> {/* high impact, high effort */}
          <div className="bg-white" />
          <div className="bg-slate-50/70" />
        </div>

        {/* quadrant labels */}
        <span className="pointer-events-none absolute left-3 top-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700">
          Quick Wins
        </span>
        <span className="pointer-events-none absolute right-3 top-2.5 text-right text-[11px] font-bold uppercase tracking-[0.14em] text-navy-700">
          Strategic Initiatives
        </span>
        <span className="pointer-events-none absolute bottom-2.5 left-3 text-[11px] font-bold uppercase tracking-[0.14em] text-teal-800">
          Medium Impact
        </span>
        <span className="pointer-events-none absolute bottom-2.5 right-3 text-right text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          Low Priority
        </span>

        <div className="relative h-[420px]">
          {/* midlines */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-[var(--hairline)]" aria-hidden />
          <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-[var(--hairline)]" aria-hidden />

          {initiatives.map((init, idx) => {
            const style = BUCKET_STYLE[init.bucket];
            const isSelected = selected.includes(init.id);
            return (
              <button
                key={init.id}
                type="button"
                onClick={() => interactive && onToggle?.(init.id)}
                onMouseEnter={() => setActive(init)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(init)}
                onBlur={() => setActive(null)}
                className={`absolute z-10 max-w-[180px] -translate-x-1 rounded-full border px-2.5 py-1 text-left text-[11px] font-semibold leading-tight shadow-sm transition-all ${style.chip} ${
                  isSelected
                    ? "ring-2 ring-gold-500 ring-offset-1"
                    : "hover:-translate-y-0.5 hover:shadow-md"
                } ${interactive ? "cursor-pointer" : "cursor-default"}`}
                style={positions[idx]}
                aria-pressed={interactive ? isSelected : undefined}
              >
                <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden />
                {init.name}
                {isSelected && (
                  <span className="ml-1 text-gold-600" aria-hidden>
                    ★
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* axes */}
      <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-[var(--ink-muted)]">
        <span>← Lighter to deliver</span>
        <span className="font-semibold text-[var(--ink-secondary)]">Delivery effort →</span>
      </div>
      <p className="mt-0.5 text-[11px] font-medium text-[var(--ink-muted)]">
        ↑ Higher business impact (positioned from your answers)
      </p>

      {/* detail strip */}
      <div className="mt-3 min-h-[44px] rounded-lg border border-[var(--hairline)] bg-[var(--surface-tint)] px-4 py-2.5 text-sm text-[var(--ink-secondary)]">
        {active ? (
          <span>
            <strong className="text-navy-950">{active.name}</strong> —{" "}
            {active.detail}{" "}
            <span className="text-xs font-semibold text-emerald-700">
              Impact {active.impact.toFixed(1)}/5 · Effort {active.effort.toFixed(1)}/5
            </span>
          </span>
        ) : interactive ? (
          <span>
            Hover an initiative for detail — <strong className="text-navy-950">click to mark it as a priority</strong>. Your selections shape the roadmap.
          </span>
        ) : (
          <span>Hover an initiative for detail.</span>
        )}
      </div>

      {/* grouped list — the accessible/table view of the same data */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {(Object.keys(BUCKET_META) as Bucket[]).map((bucket) => {
          const items = initiatives.filter((i) => i.bucket === bucket);
          if (!items.length) return null;
          return (
            <div key={bucket} className="rounded-lg border border-[var(--hairline)] bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy-950">
                {BUCKET_META[bucket].label}
              </p>
              <p className="mb-2 text-[11px] text-[var(--ink-muted)]">
                {BUCKET_META[bucket].blurb}
              </p>
              <ul className="space-y-1">
                {items.map((i) => (
                  <li key={i.id} className="flex items-baseline gap-2 text-sm text-[var(--ink-secondary)]">
                    <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${BUCKET_STYLE[bucket].dot}`} aria-hidden />
                    <span>
                      {i.name}
                      {selected.includes(i.id) && (
                        <span className="ml-1.5 text-xs font-semibold text-gold-700">★ priority</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
