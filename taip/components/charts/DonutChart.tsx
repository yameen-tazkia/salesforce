"use client";

import { useState } from "react";

export type Slice = { label: string; value: number; color: string };

/**
 * Donut for part-of-whole identity. Fixed hue order supplied by the caller
 * (never cycled), 2px surface gaps between segments, legend always present,
 * centre shows total (or hovered slice).
 */
export default function DonutChart({
  slices,
  title,
  centreLabel,
}: {
  slices: Slice[];
  title?: string;
  centreLabel?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const total = slices.reduce((sum, s) => sum + s.value, 0) || 1;
  const size = 168;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const gap = 2; // 2px surface gap between segments

  let offset = 0;
  const segments = slices
    .filter((s) => s.value > 0)
    .map((s, i) => {
      const fraction = s.value / total;
      const length = Math.max(fraction * circumference - gap, 1);
      const seg = { ...s, index: i, dash: `${length} ${circumference - length}`, offset };
      offset -= fraction * circumference;
      return seg;
    });

  const active = hover !== null ? slices[hover] : null;

  return (
    <div role="img" aria-label={title ?? "Donut chart"}>
      {title && <p className="mb-3 text-sm font-semibold text-navy-950">{title}</p>}
      <div className="flex items-center gap-6">
        <div className="relative shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            {segments.map((seg) => (
              <circle
                key={seg.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={hover === seg.index ? stroke + 4 : stroke}
                strokeDasharray={seg.dash}
                strokeDashoffset={seg.offset}
                opacity={hover === null || hover === seg.index ? 1 : 0.35}
                className="transition-all duration-200"
                onMouseEnter={() => setHover(seg.index)}
                onMouseLeave={() => setHover(null)}
              />
            ))}
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-extrabold tabular-nums text-navy-950">
              {active ? active.value : total}
            </span>
            <span className="max-w-[90px] text-[10px] font-medium leading-tight text-[var(--ink-muted)]">
              {active ? active.label : (centreLabel ?? "Total")}
            </span>
          </div>
        </div>
        <ul className="min-w-0 flex-1 space-y-1.5">
          {slices.map((s, i) => (
            <li
              key={s.label}
              className="flex cursor-default items-center gap-2 text-xs"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ background: s.color }}
                aria-hidden
              />
              <span
                className={`truncate font-medium ${
                  hover === i ? "text-navy-950" : "text-[var(--ink-secondary)]"
                }`}
              >
                {s.label}
              </span>
              <span className="ml-auto font-semibold tabular-nums text-[var(--ink-muted)]">
                {s.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
