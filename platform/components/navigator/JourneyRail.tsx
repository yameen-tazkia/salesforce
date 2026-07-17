"use client";

import { STAGES, StageId } from "@/lib/data/navigator";

/**
 * The consulting journey rail — chapter progress with live dimension
 * scores appearing as each chapter completes.
 */
export default function JourneyRail({
  currentStage,
  completed,
  progressPct,
  liveScores,
}: {
  currentStage: StageId;
  completed: StageId[];
  progressPct: number;
  liveScores: { label: string; pct: number }[];
}) {
  const journeyStages = STAGES.filter(
    (s) => s.id !== "welcome" && s.id !== "report"
  );

  return (
    <aside className="hidden w-60 shrink-0 lg:block" aria-label="Journey progress">
      <div className="sticky top-24 space-y-6">
        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)]">
              Your journey
            </p>
            <p className="text-xs font-bold tabular-nums text-emerald-700">
              {Math.round(progressPct)}%
            </p>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-navy-100">
            <div
              className="h-full rounded-full bg-emerald-600 transition-[width] duration-700 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <ol className="space-y-1">
          {journeyStages.map((stage) => {
            const isDone = completed.includes(stage.id);
            const isCurrent = stage.id === currentStage;
            return (
              <li
                key={stage.id}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                  isCurrent
                    ? "bg-emerald-50 font-semibold text-emerald-800"
                    : isDone
                      ? "text-navy-800"
                      : "text-[var(--ink-muted)]"
                }`}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    isDone
                      ? "bg-emerald-600 text-white"
                      : isCurrent
                        ? "border-2 border-emerald-600 bg-white text-emerald-700"
                        : "border border-[var(--hairline)] bg-white text-[var(--ink-muted)]"
                  }`}
                  aria-hidden
                >
                  {isDone ? "✓" : ""}
                </span>
                {stage.short}
              </li>
            );
          })}
        </ol>

        {liveScores.length > 0 && (
          <div className="rounded-xl border border-[var(--hairline)] bg-white p-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-700">
              Emerging profile
            </p>
            <div className="space-y-2.5">
              {liveScores.map((s) => (
                <div key={s.label}>
                  <div className="mb-0.5 flex items-baseline justify-between">
                    <span className="text-xs font-medium text-navy-900">
                      {s.label}
                    </span>
                    <span className="text-xs font-bold tabular-nums text-emerald-700">
                      {s.pct}
                    </span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-navy-100">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-[width] duration-700 ease-out"
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
