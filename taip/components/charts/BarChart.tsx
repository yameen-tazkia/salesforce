"use client";

import { useState } from "react";

export type Bar = {
  label: string;
  value: number;
  color?: string;
  valueLabel?: string;
  href?: string;
};

/**
 * Horizontal bar chart: thin marks, rounded data-end anchored at the
 * baseline, per-bar hover emphasis, values always direct-labelled in ink.
 */
export default function BarChart({
  bars,
  max,
  title,
}: {
  bars: Bar[];
  max?: number;
  title?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const peak = max ?? Math.max(...bars.map((b) => b.value), 1);

  return (
    <div role="img" aria-label={title ?? "Bar chart"}>
      {title && <p className="mb-3 text-sm font-semibold text-navy-950">{title}</p>}
      <div className="space-y-3">
        {bars.map((bar, i) => {
          const pct = (bar.value / peak) * 100;
          return (
            <div
              key={bar.label}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="cursor-default"
            >
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <span className="truncate text-xs font-medium text-[var(--ink-secondary)]">
                  {bar.label}
                </span>
                <span
                  className={`text-xs font-semibold tabular-nums ${
                    hover === i ? "text-navy-950" : "text-[var(--ink-muted)]"
                  }`}
                >
                  {bar.valueLabel ?? bar.value.toLocaleString()}
                </span>
              </div>
              <div className="h-3 rounded-r bg-navy-50">
                <div
                  className="h-full rounded-r transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    background: bar.color ?? "var(--series-1)",
                    opacity: hover === null || hover === i ? 1 : 0.45,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
