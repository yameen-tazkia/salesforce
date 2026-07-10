"use client";

import { useRef, useState } from "react";

export type LineSeries = {
  name: string;
  color: string;
  values: number[];
};

/** Line chart with crosshair + tooltip. 2px lines, recessive grid. */
export default function LineChart({
  labels,
  series,
  title,
  formatValue = (v) => v.toLocaleString(),
  height = 260,
}: {
  labels: string[];
  series: LineSeries[];
  title?: string;
  formatValue?: (v: number) => string;
  height?: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const width = 640;
  const pad = { top: 16, right: 16, bottom: 28, left: 72 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;

  const all = series.flatMap((s) => s.values);
  const rawMax = Math.max(...all, 0);
  const rawMin = Math.min(...all, 0);
  const span = rawMax - rawMin || 1;
  const yMax = rawMax + span * 0.08;
  const yMin = rawMin < 0 ? rawMin - span * 0.08 : 0;

  const x = (i: number) =>
    pad.left + (labels.length === 1 ? innerW / 2 : (i / (labels.length - 1)) * innerW);
  const y = (v: number) => pad.top + ((yMax - v) / (yMax - yMin)) * innerH;

  const ticks = [yMin, yMin + (yMax - yMin) * 0.5, yMax];

  const onMove = (e: React.MouseEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = ((e.clientX - rect.left) / rect.width) * width;
    const i = Math.round(((px - pad.left) / innerW) * (labels.length - 1));
    setHover(Math.max(0, Math.min(labels.length - 1, i)));
  };

  return (
    <div>
      {title && <p className="mb-3 text-sm font-semibold text-navy-950">{title}</p>}
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
          role="img"
          aria-label={title ?? "Line chart"}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={pad.left}
                x2={width - pad.right}
                y1={y(t)}
                y2={y(t)}
                stroke="var(--grid)"
                strokeWidth={1}
              />
              <text
                x={pad.left - 8}
                y={y(t)}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={10.5}
                className="fill-[var(--ink-muted)]"
              >
                {formatValue(t)}
              </text>
            </g>
          ))}
          {rawMin < 0 && (
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={y(0)}
              y2={y(0)}
              stroke="var(--axis)"
              strokeWidth={1}
            />
          )}
          {labels.map((l, i) =>
            i % Math.ceil(labels.length / 8) === 0 || i === labels.length - 1 ? (
              <text
                key={l + i}
                x={x(i)}
                y={height - 8}
                textAnchor="middle"
                fontSize={10.5}
                className="fill-[var(--ink-muted)]"
              >
                {l}
              </text>
            ) : null
          )}
          {hover !== null && (
            <line
              x1={x(hover)}
              x2={x(hover)}
              y1={pad.top}
              y2={height - pad.bottom}
              stroke="var(--axis)"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          )}
          {series.map((s) => (
            <g key={s.name}>
              <polyline
                points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {hover !== null && (
                <circle
                  cx={x(hover)}
                  cy={y(s.values[hover])}
                  r={4.5}
                  fill={s.color}
                  stroke="#fff"
                  strokeWidth={2}
                />
              )}
            </g>
          ))}
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute top-2 z-10 rounded-lg border border-[var(--hairline)] bg-white px-3 py-2 text-xs shadow-lg"
            style={{
              left: `${(x(hover) / width) * 100}%`,
              transform: x(hover) > width * 0.6 ? "translateX(-105%)" : "translateX(8px)",
            }}
          >
            <p className="font-semibold text-navy-950">{labels[hover]}</p>
            {series.map((s) => (
              <p key={s.name} className="mt-0.5 flex items-center gap-1.5 text-[var(--ink-secondary)]">
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                {s.name}:{" "}
                <strong className="tabular-nums text-navy-950">
                  {formatValue(s.values[hover])}
                </strong>
              </p>
            ))}
          </div>
        )}
      </div>
      {series.length >= 2 && (
        <div className="mt-2 flex flex-wrap gap-4">
          {series.map((s) => (
            <span key={s.name} className="inline-flex items-center gap-2 text-xs font-medium text-[var(--ink-secondary)]">
              <span className="h-0.5 w-4 rounded" style={{ background: s.color }} />
              {s.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
