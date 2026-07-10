"use client";

import { useState } from "react";
import { SLACK_WORKFLOWS } from "@/lib/data/slackWorkflows";
import Badge from "@/components/ui/Badge";

const ACTOR_STYLES: Record<string, { chip: string; label: string }> = {
  Trigger: { chip: "bg-gold-100 text-gold-900 border-gold-300", label: "Trigger" },
  Slack: { chip: "bg-navy-100 text-navy-900 border-navy-300", label: "Slack" },
  Agent: { chip: "bg-emerald-100 text-emerald-900 border-emerald-300", label: "Agentforce" },
  Human: { chip: "bg-teal-100 text-teal-900 border-teal-300", label: "Human" },
  Salesforce: { chip: "bg-navy-100 text-navy-900 border-navy-300", label: "Salesforce" },
};

export default function WorkflowExplorer() {
  const [activeId, setActiveId] = useState(SLACK_WORKFLOWS[0].id);
  const [step, setStep] = useState(0);

  const wf = SLACK_WORKFLOWS.find((w) => w.id === activeId)!;

  const select = (id: string) => {
    setActiveId(id);
    setStep(0);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      {/* Workflow list */}
      <div className="space-y-2">
        {SLACK_WORKFLOWS.map((w) => (
          <button
            key={w.id}
            onClick={() => select(w.id)}
            aria-pressed={w.id === activeId}
            className={`block w-full rounded-xl border p-4 text-left transition-all ${
              w.id === activeId
                ? "border-emerald-600 bg-emerald-50 shadow-md shadow-emerald-600/10"
                : "border-[var(--hairline)] bg-white hover:border-emerald-300"
            }`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-700">
              {w.category}
            </p>
            <p className="mt-0.5 text-sm font-bold text-navy-950">{w.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--ink-secondary)]">{w.outcome}</p>
          </button>
        ))}
      </div>

      {/* Stepper */}
      <div className="h-fit rounded-2xl border border-[var(--hairline)] bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-navy-950">{wf.name}</h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-[var(--ink-secondary)]">
              {wf.description}
            </p>
          </div>
          <Badge tone="emerald">{wf.outcome}</Badge>
        </div>

        {/* Progress dots */}
        <div className="mt-6 flex items-center gap-2" role="tablist" aria-label="Workflow steps">
          {wf.steps.map((s, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === step}
              aria-label={`Step ${i + 1}: ${s.title}`}
              onClick={() => setStep(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === step
                  ? "w-8 bg-emerald-600"
                  : i < step
                    ? "w-2.5 bg-emerald-300"
                    : "w-2.5 bg-navy-100"
              }`}
            />
          ))}
        </div>

        {/* Steps rail */}
        <ol className="mt-8 space-y-0">
          {wf.steps.map((s, i) => {
            const style = ACTOR_STYLES[s.actor];
            const state = i === step ? "active" : i < step ? "done" : "todo";
            return (
              <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
                {i < wf.steps.length - 1 && (
                  <span
                    className={`absolute left-[15px] top-9 h-full w-0.5 ${i < step ? "bg-emerald-300" : "bg-navy-100"}`}
                    aria-hidden
                  />
                )}
                <button
                  onClick={() => setStep(i)}
                  aria-label={`Go to step ${i + 1}`}
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                    state === "active"
                      ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                      : state === "done"
                        ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                        : "border-navy-200 bg-white text-navy-400"
                  }`}
                >
                  {i + 1}
                </button>
                <div
                  className={`flex-1 rounded-xl border p-4 transition-all ${
                    state === "active"
                      ? "border-emerald-300 bg-emerald-50/60"
                      : "border-transparent"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${style.chip}`}>
                      {style.label}
                    </span>
                    <p className={`text-sm font-semibold ${state === "todo" ? "text-navy-500" : "text-navy-950"}`}>
                      {s.title}
                    </p>
                  </div>
                  {state === "active" && (
                    <p className="animate-fade-in mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
                      {s.detail}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 flex justify-between border-t border-[var(--hairline)] pt-4">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="text-sm font-semibold text-emerald-700 disabled:opacity-30"
          >
            ← Previous step
          </button>
          <button
            onClick={() => setStep(Math.min(wf.steps.length - 1, step + 1))}
            disabled={step === wf.steps.length - 1}
            className="text-sm font-semibold text-emerald-700 disabled:opacity-30"
          >
            Next step →
          </button>
        </div>
      </div>
    </div>
  );
}
