"use client";

import { useMemo, useState } from "react";
import {
  READINESS_DIMENSIONS,
  ANSWER_SCALE,
  bandForScore,
} from "@/lib/data/readiness";
import RadarChart from "@/components/charts/RadarChart";
import Scorecard from "@/components/ui/Scorecard";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";

const TOTAL_QUESTIONS = READINESS_DIMENSIONS.reduce(
  (n, d) => n + d.questions.length,
  0
);

export default function ReadinessAssessment() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(answers).length;
  const complete = answered === TOTAL_QUESTIONS;

  const dimensionScores = useMemo(
    () =>
      READINESS_DIMENSIONS.map((dim) => {
        const values = dim.questions
          .map((q) => answers[q.id])
          .filter((v): v is number => v !== undefined);
        const avg = values.length
          ? values.reduce((a, b) => a + b, 0) / values.length
          : 0;
        return { dim, score: avg };
      }),
    [answers]
  );

  const overall =
    dimensionScores.reduce((a, d) => a + d.score, 0) /
    (READINESS_DIMENSIONS.length || 1);
  const band = bandForScore(overall);

  const sorted = [...dimensionScores].sort((a, b) => a.score - b.score);
  const weakest = sorted[0];
  const strongest = sorted[sorted.length - 1];

  if (submitted) {
    return (
      <div className="animate-fade-up space-y-10">
        {/* Executive summary */}
        <div className="rounded-2xl border border-[var(--hairline)] bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
                Executive summary
              </p>
              <h2 className="mt-1 text-2xl font-bold text-navy-950 md:text-3xl">
                Your organisation is{" "}
                <span className="text-emerald-700">{band.name}</span>
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--ink-secondary)]">
                {band.narrative}
              </p>
              <p className="mt-3 text-sm text-[var(--ink-secondary)]">
                Strongest dimension:{" "}
                <strong className="text-navy-950">{strongest.dim.name}</strong>{" "}
                ({strongest.score.toFixed(1)}/5). Greatest opportunity:{" "}
                <strong className="text-navy-950">{weakest.dim.name}</strong> (
                {weakest.score.toFixed(1)}/5).
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-8 py-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">
                Overall score
              </p>
              <p className="mt-1 text-5xl font-bold tracking-tight text-emerald-700">
                {overall.toFixed(1)}
              </p>
              <p className="text-sm font-medium text-emerald-800">out of 5.0</p>
            </div>
          </div>
        </div>

        {/* Radar + scorecards */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--hairline)] bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-sm font-semibold text-navy-950">
              Readiness profile
            </h3>
            <RadarChart
              axes={READINESS_DIMENSIONS.map((d) => d.short)}
              series={[
                {
                  name: "Your organisation",
                  color: "var(--series-1)",
                  values: dimensionScores.map((d) => d.score),
                },
              ]}
              max={5}
            />
          </div>
          <div className="grid content-start gap-4 sm:grid-cols-2">
            {dimensionScores.map(({ dim, score }) => (
              <Scorecard
                key={dim.id}
                title={dim.name}
                score={score}
                max={5}
                detail={
                  score < 2.5
                    ? "Priority gap — address before scaling AI."
                    : score < 3.5
                      ? "Workable foundation — strengthen while piloting."
                      : "A strength to build your first deployments on."
                }
              />
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="rounded-2xl border border-[var(--hairline)] bg-white p-8 shadow-sm">
          <h3 className="text-lg font-bold text-navy-950">Recommendations</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {band.recommendations.map((rec, i) => (
              <div key={rec} className="flex gap-3 rounded-lg border border-[var(--hairline)] bg-[var(--surface-tint)] p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-[var(--ink-secondary)]">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div className="rounded-2xl border border-[var(--hairline)] bg-white p-8 shadow-sm">
          <h3 className="text-lg font-bold text-navy-950">Recommended roadmap</h3>
          <ol className="mt-6 space-y-0">
            {band.roadmap.map((step, i) => (
              <li key={step.horizon} className="relative flex gap-5 pb-8 last:pb-0">
                {i < band.roadmap.length - 1 && (
                  <span className="absolute left-[15px] top-8 h-full w-0.5 bg-emerald-100" aria-hidden />
                )}
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-emerald-600 bg-white text-xs font-bold text-emerald-700">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-950">{step.horizon}</p>
                  <p className="mt-0.5 text-sm text-[var(--ink-secondary)]">{step.focus}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/contact"
            className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Discuss your results with us
          </a>
          <button
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
            }}
            className="text-sm font-semibold text-emerald-700 hover:underline"
          >
            Retake the assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-6 mb-8 border-b border-[var(--hairline)] bg-white/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto max-w-container">
          <ProgressBar
            label={`Progress — ${answered} of ${TOTAL_QUESTIONS} answered`}
            value={answered}
            max={TOTAL_QUESTIONS}
          />
        </div>
      </div>

      <div className="space-y-10">
        {READINESS_DIMENSIONS.map((dim, di) => (
          <fieldset key={dim.id} className="rounded-2xl border border-[var(--hairline)] bg-white p-6 shadow-sm md:p-8">
            <legend className="sr-only">{dim.name}</legend>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
                {di + 1}
              </span>
              <div>
                <h2 className="text-lg font-bold text-navy-950">{dim.name}</h2>
                <p className="text-xs text-[var(--ink-muted)]">
                  {dim.questions.length} questions · rate 1 (not started) to 5 (leading)
                </p>
              </div>
            </div>
            <div className="space-y-6">
              {dim.questions.map((q) => (
                <div key={q.id}>
                  <p className="mb-3 text-sm font-medium leading-relaxed text-navy-900">
                    {q.text}
                  </p>
                  <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label={q.text}>
                    {ANSWER_SCALE.map((opt) => {
                      const selected = answers[q.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          role="radio"
                          aria-checked={selected}
                          onClick={() =>
                            setAnswers({ ...answers, [q.id]: opt.value })
                          }
                          className={`rounded-lg border px-2 py-2.5 text-center transition-all ${
                            selected
                              ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                              : "border-[var(--hairline)] bg-white text-navy-800 hover:border-emerald-300 hover:bg-emerald-50"
                          }`}
                        >
                          <span className="block text-sm font-bold">{opt.value}</span>
                          <span className={`block text-[10px] font-medium leading-tight ${selected ? "text-emerald-50" : "text-[var(--ink-muted)]"}`}>
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button
          onClick={() => setSubmitted(true)}
          disabled={!complete}
          className="rounded-lg bg-emerald-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Generate my results
        </button>
        {!complete && (
          <Badge tone="gold">
            Answer all {TOTAL_QUESTIONS} questions to generate your scorecard
          </Badge>
        )}
      </div>
    </div>
  );
}
