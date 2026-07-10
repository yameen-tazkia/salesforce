import ProgressBar from "./ProgressBar";

export type ScoreBand = {
  min: number;
  label: string;
  narrative: string;
};

export function bandFor(score: number, bands: ScoreBand[]): ScoreBand {
  return (
    [...bands].sort((a, b) => b.min - a.min).find((b) => score >= b.min) ??
    bands[0]
  );
}

export default function Scorecard({
  title,
  score,
  max = 5,
  detail,
}: {
  title: string;
  score: number;
  max?: number;
  detail?: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--hairline)] bg-white p-5 shadow-sm shadow-navy-950/[0.03]">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold text-navy-950">{title}</h3>
        <p className="text-lg font-bold tabular-nums text-emerald-700">
          {score.toFixed(1)}
          <span className="text-xs font-medium text-[var(--ink-muted)]"> / {max}</span>
        </p>
      </div>
      <div className="mt-3">
        <ProgressBar value={score} max={max} showValue={false} label={undefined} />
      </div>
      {detail && (
        <p className="mt-3 text-xs leading-relaxed text-[var(--ink-secondary)]">{detail}</p>
      )}
    </div>
  );
}
