"use client";

import { useState } from "react";

export type HeatCell = {
  id: string;
  label: string; // short capability label
  full: string; // full question text for the tooltip
  value: number | null; // 1..5 or null when unanswered
};

export type HeatRow = {
  name: string;
  cells: HeatCell[];
};

/**
 * Capability heat map — sequential single-hue emerald, light → dark
 * (steps from the validated brand ramp). Identity is carried by the
 * text label in every cell, never by colour alone.
 */
const STEPS = [
  { bg: "#eefaf4", ink: "dark" }, // 1
  { bg: "#d5f2e3", ink: "dark" }, // 2
  { bg: "#7dd0ae", ink: "dark" }, // 3
  { bg: "#199a70", ink: "light" }, // 4
  { bg: "#0b674a", ink: "light" }, // 5
] as const;

export default function Heatmap({ rows }: { rows: HeatRow[] }) {
  const [hover, setHover] = useState<HeatCell | null>(null);

  return (
    <div>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.name}>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
              {row.name}
            </p>
            <div
              className="grid gap-0.5"
              style={{
                gridTemplateColumns: `repeat(${row.cells.length}, minmax(0, 1fr))`,
              }}
            >
              {row.cells.map((cell) => {
                const step = cell.value ? STEPS[cell.value - 1] : null;
                return (
                  <button
                    key={cell.id}
                    type="button"
                    onMouseEnter={() => setHover(cell)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(cell)}
                    onBlur={() => setHover(null)}
                    className="flex min-h-[52px] flex-col items-center justify-center rounded px-1 py-1.5 text-center outline-offset-2"
                    style={{
                      background: step ? step.bg : "var(--surface-tint)",
                    }}
                    aria-label={`${cell.label}: ${
                      cell.value ? `${cell.value} of 5` : "not answered"
                    }`}
                  >
                    <span
                      className="max-w-full text-[10px] font-semibold leading-tight [overflow-wrap:anywhere]"
                      style={{
                        color:
                          step?.ink === "light" ? "#ffffff" : "var(--ink)",
                      }}
                    >
                      {cell.label}
                    </span>
                    <span
                      className="mt-0.5 text-[10px] font-bold tabular-nums"
                      style={{
                        color:
                          step?.ink === "light"
                            ? "rgba(255,255,255,0.85)"
                            : "var(--ink-secondary)",
                      }}
                    >
                      {cell.value ?? "–"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--ink-muted)]">
          <span>Emerging</span>
          {STEPS.map((s, i) => (
            <span
              key={i}
              className="h-3 w-6 rounded-sm"
              style={{ background: s.bg }}
              aria-hidden
            />
          ))}
          <span>Leading</span>
        </div>
        <div className="min-h-[18px] text-xs text-[var(--ink-secondary)]">
          {hover && (
            <span>
              <strong className="text-navy-950">{hover.label}</strong> —{" "}
              {hover.full}{" "}
              <strong className="text-emerald-700">
                {hover.value ? `${hover.value}/5` : "n/a"}
              </strong>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
