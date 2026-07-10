"use client";

import { useState } from "react";

export type RadarSeries = {
  name: string;
  color: string;
  values: number[]; // aligned with axes
};

export default function RadarChart({
  axes,
  series,
  max = 5,
  size = 340,
}: {
  axes: string[];
  series: RadarSeries[];
  max?: number;
  size?: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 56;
  const n = axes.length;

  const point = (axisIdx: number, value: number) => {
    const angle = (Math.PI * 2 * axisIdx) / n - Math.PI / 2;
    const rad = (value / max) * r;
    return [cx + rad * Math.cos(angle), cy + rad * Math.sin(angle)] as const;
  };

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[420px]"
        role="img"
        aria-label={`Radar chart across ${axes.join(", ")}`}
      >
        {rings.map((f) => (
          <polygon
            key={f}
            points={axes
              .map((_, i) => point(i, max * f).join(","))
              .join(" ")}
            fill="none"
            stroke="var(--grid)"
            strokeWidth={1}
          />
        ))}
        {axes.map((axis, i) => {
          const [x, y] = point(i, max);
          const [lx, ly] = point(i, max * 1.22);
          return (
            <g key={axis}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--grid)" strokeWidth={1} />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-[var(--ink-secondary)]"
                fontSize={11}
                fontWeight={hover === i ? 700 : 500}
              >
                {axis}
              </text>
            </g>
          );
        })}
        {series.map((s) => (
          <g key={s.name}>
            <polygon
              points={s.values.map((v, i) => point(i, v).join(",")).join(" ")}
              fill={s.color}
              fillOpacity={0.14}
              stroke={s.color}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {s.values.map((v, i) => {
              const [x, y] = point(i, v);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={hover === i ? 5 : 3.5}
                  fill={s.color}
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              );
            })}
          </g>
        ))}
        {/* invisible hover hit sectors */}
        {axes.map((_, i) => {
          const [x, y] = point(i, max);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={26}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            />
          );
        })}
      </svg>
      {hover !== null && (
        <div className="mt-1 rounded-lg border border-[var(--hairline)] bg-white px-3 py-1.5 text-xs shadow-md">
          <span className="font-semibold text-navy-950">{axes[hover]}</span>
          {series.map((s) => (
            <span key={s.name} className="ml-3 inline-flex items-center gap-1.5 text-[var(--ink-secondary)]">
              <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
              {s.name}: <strong className="text-navy-950">{s.values[hover].toFixed(1)}</strong>
            </span>
          ))}
        </div>
      )}
      {series.length >= 2 && (
        <div className="mt-3 flex flex-wrap justify-center gap-4">
          {series.map((s) => (
            <span key={s.name} className="inline-flex items-center gap-2 text-xs font-medium text-[var(--ink-secondary)]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
              {s.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
