"use client";

import { useState } from "react";

export type RadarAxis = { label: string; value: number };

/**
 * Single-series radar for the readiness profile (0–100 per axis).
 * One series → no legend box; the title names it. Hovering an axis label
 * or vertex highlights its value.
 */
export default function RadarChart({
  axes,
  title,
  color = "var(--series-1)",
}: {
  axes: RadarAxis[];
  title?: string;
  color?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const width = 440;
  const height = 320;
  const cx = width / 2;
  const cy = height / 2;
  const radius = height / 2 - 64;
  const n = axes.length;

  const point = (index: number, value: number): [number, number] => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const r = (value / 100) * radius;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };

  const polygon = axes.map((a, i) => point(i, a.value).join(",")).join(" ");
  const rings = [25, 50, 75, 100];

  return (
    <div role="img" aria-label={title ?? "Radar chart"} className="flex flex-col items-center">
      {title && <p className="mb-1 self-start text-sm font-semibold text-navy-950">{title}</p>}
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="max-w-full">
        {rings.map((ring) => (
          <polygon
            key={ring}
            points={axes.map((_, i) => point(i, ring).join(",")).join(" ")}
            fill="none"
            stroke="var(--grid)"
            strokeWidth={1}
          />
        ))}
        {axes.map((_, i) => {
          const [x, y] = point(i, 100);
          return (
            <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--grid)" strokeWidth={1} />
          );
        })}
        <polygon points={polygon} fill={color} fillOpacity={0.14} stroke={color} strokeWidth={2} />
        {axes.map((a, i) => {
          const [x, y] = point(i, a.value);
          return (
            <circle
              key={a.label}
              cx={x}
              cy={y}
              r={hover === i ? 6 : 4}
              fill={color}
              stroke="#fff"
              strokeWidth={2}
              className="transition-all"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            />
          );
        })}
        {axes.map((a, i) => {
          const [x, y] = point(i, 126);
          const anchor = Math.abs(x - cx) < 12 ? "middle" : x > cx ? "start" : "end";
          return (
            <text
              key={a.label}
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="middle"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="cursor-default"
              style={{
                fontSize: 10.5,
                fontWeight: hover === i ? 700 : 500,
                fill: hover === i ? "var(--ink)" : "var(--ink-secondary)",
              }}
            >
              {a.label}
              {hover === i ? ` · ${a.value}` : ""}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
