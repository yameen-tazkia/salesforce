"use client";

import { useState } from "react";

export type DonutSlice = {
  label: string;
  value: number;
  color: string;
};

export default function DonutChart({
  slices,
  centerLabel,
  centerValue,
  title,
}: {
  slices: DonutSlice[];
  centerLabel?: string;
  centerValue?: string;
  title?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const total = slices.reduce((s, d) => s + d.value, 0) || 1;
  const size = 200;
  const c = size / 2;
  const r = 74;
  const width = 26;

  // small angular padding renders as a surface gap between segments
  const gap = slices.length > 1 ? 0.03 : 0;
  let acc = 0;
  const arcs = slices.map((slice) => {
    const start = (acc / total) * Math.PI * 2 - Math.PI / 2 + gap;
    acc += slice.value;
    const end = Math.max(
      start + 0.01,
      (acc / total) * Math.PI * 2 - Math.PI / 2 - gap
    );
    const large = end - start > Math.PI ? 1 : 0;
    const x1 = c + r * Math.cos(start);
    const y1 = c + r * Math.sin(start);
    const x2 = c + r * Math.cos(end);
    const y2 = c + r * Math.sin(end);
    return { slice, d: `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}` };
  });

  const active = hover !== null ? slices[hover] : null;

  return (
    <div role="img" aria-label={title ?? "Donut chart"}>
      {title && <p className="mb-3 text-sm font-semibold text-navy-950">{title}</p>}
      <div className="flex flex-wrap items-center gap-6">
        <svg viewBox={`0 0 ${size} ${size}`} className="h-44 w-44 shrink-0">
          {arcs.map(({ slice, d }, i) => (
            <path
              key={slice.label}
              d={d}
              fill="none"
              stroke={slice.color}
              strokeWidth={hover === i ? width + 4 : width}
              opacity={hover === null || hover === i ? 1 : 0.4}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="transition-all duration-150"
            />
          ))}
          <text
            x={c}
            y={active ? c - 8 : c - 6}
            textAnchor="middle"
            fontSize={active ? 20 : 24}
            fontWeight={700}
            className="fill-navy-950"
          >
            {active
              ? `${Math.round((active.value / total) * 100)}%`
              : centerValue}
          </text>
          <text
            x={c}
            y={c + 16}
            textAnchor="middle"
            fontSize={10.5}
            className="fill-[var(--ink-muted)]"
          >
            {active ? active.label : centerLabel}
          </text>
        </svg>
        <ul className="min-w-[160px] flex-1 space-y-2">
          {slices.map((slice, i) => (
            <li
              key={slice.label}
              className="flex cursor-default items-center justify-between gap-3 text-sm"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <span className="inline-flex items-center gap-2 text-[var(--ink-secondary)]">
                <span
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ background: slice.color }}
                />
                {slice.label}
              </span>
              <span className="font-semibold tabular-nums text-navy-950">
                {Math.round((slice.value / total) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
