"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AGENTS,
  AGENT_RATING_LABELS,
  AgentDef,
  CLOUD_OPTIONS,
  COUNTRIES,
  CRM_OPTIONS,
  EMPLOYEE_BANDS,
  INDUSTRIES,
  LANGUAGE_OPTIONS,
  OBJECTIVES,
  PARTNER_OPTIONS,
  REVENUE_BANDS,
  SCALE_QUESTIONS,
  STAGES,
  ScaleQuestion,
  StageId,
} from "@/lib/data/navigator";
import {
  EMPTY_ANSWERS,
  NavigatorAnswers,
  buildInitiatives,
  computeScores,
  questionsFor,
  stagePct,
} from "@/lib/navigator/engine";
import JourneyRail from "@/components/navigator/JourneyRail";
import PriorityMatrix from "@/components/navigator/PriorityMatrix";
import NavigatorReport from "./NavigatorReport";

/* ------------------------------------------------------------------ */
/* Screen sequence                                                     */
/* ------------------------------------------------------------------ */

type Screen =
  | { kind: "welcome"; stage: StageId }
  | { kind: "profile-org"; stage: StageId }
  | { kind: "profile-platform"; stage: StageId }
  | { kind: "objectives"; stage: StageId }
  | { kind: "scale"; stage: StageId; q: ScaleQuestion; n: number; of: number }
  | { kind: "international"; stage: StageId; n: number; of: number }
  | { kind: "languages"; stage: StageId; n: number; of: number }
  | { kind: "agent"; stage: StageId; agent: AgentDef; n: number; of: number }
  | { kind: "priorities"; stage: StageId }
  | { kind: "report"; stage: StageId };

function buildScreens(): Screen[] {
  const screens: Screen[] = [
    { kind: "welcome", stage: "welcome" },
    { kind: "profile-org", stage: "profile" },
    { kind: "profile-platform", stage: "profile" },
    { kind: "objectives", stage: "objectives" },
  ];
  (["maturity", "data", "sales", "service", "slack"] as const).forEach(
    (stage) => {
      const qs = SCALE_QUESTIONS.filter((q) => q.stage === stage);
      qs.forEach((q, i) =>
        screens.push({ kind: "scale", stage, q, n: i + 1, of: qs.length })
      );
    }
  );
  const mlQs = SCALE_QUESTIONS.filter((q) => q.stage === "multilingual");
  const mlTotal = mlQs.length + 2;
  screens.push({ kind: "international", stage: "multilingual", n: 1, of: mlTotal });
  screens.push({ kind: "languages", stage: "multilingual", n: 2, of: mlTotal });
  mlQs.forEach((q, i) =>
    screens.push({
      kind: "scale",
      stage: "multilingual",
      q,
      n: i + 3,
      of: mlTotal,
    })
  );
  AGENTS.forEach((agent, i) =>
    screens.push({
      kind: "agent",
      stage: "agentforce",
      agent,
      n: i + 1,
      of: AGENTS.length,
    })
  );
  screens.push({ kind: "priorities", stage: "priorities" });
  screens.push({ kind: "report", stage: "report" });
  return screens;
}

const SCREENS = buildScreens();
const STORAGE_KEY = "tazkia-ai-navigator-v1";

const stageTitle = (id: StageId) => STAGES.find((s) => s.id === id)!;

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                 */
/* ------------------------------------------------------------------ */

function Chip({
  label,
  sub,
  selected,
  onClick,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-xl border px-4 py-3 text-left transition-all ${
        selected
          ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
          : "border-[var(--hairline)] bg-white text-navy-900 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm"
      }`}
    >
      <span className="block text-sm font-semibold">{label}</span>
      {sub && (
        <span
          className={`mt-0.5 block text-xs leading-snug ${
            selected ? "text-emerald-50" : "text-[var(--ink-muted)]"
          }`}
        >
          {sub}
        </span>
      )}
    </button>
  );
}

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-navy-950">
        {label}
        {optional && (
          <span className="ml-1.5 text-xs font-medium text-[var(--ink-muted)]">
            optional
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-[var(--hairline)] bg-white px-3.5 py-2.5 text-sm text-navy-950 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

function Insight({ text }: { text: string }) {
  return (
    <div className="mt-6 flex animate-fade-up gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-[11px] font-bold text-white"
        aria-hidden
      >
        TI
      </span>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-800">
          Navigator insight
        </p>
        <p className="mt-1 text-sm leading-relaxed text-navy-900">{text}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function AiNavigator() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<NavigatorAnswers>(EMPTY_ANSWERS);
  const [generating, setGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [canResume, setCanResume] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const screen = SCREENS[idx];
  const stage = stageTitle(screen.stage);

  /* Persistence ------------------------------------------------------ */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as {
          answers: NavigatorAnswers;
          idx: number;
        };
        if (saved.idx > 0 && saved.idx < SCREENS.length - 1) setCanResume(true);
      }
    } catch {
      /* ignore corrupted state */
    }
  }, []);

  useEffect(() => {
    if (idx === 0) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, idx }));
    } catch {
      /* storage full or unavailable */
    }
  }, [answers, idx]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [idx]);

  /* Derived ---------------------------------------------------------- */
  const progressPct = (idx / (SCREENS.length - 1)) * 100;

  const completedStages = useMemo(() => {
    const done: StageId[] = [];
    for (const s of STAGES) {
      if (s.id === "welcome" || s.id === "report") continue;
      const last = SCREENS.map((sc, i) => ({ sc, i }))
        .filter((x) => x.sc.stage === s.id)
        .pop();
      if (last && idx > last.i) done.push(s.id);
    }
    return done;
  }, [idx]);

  const liveScores = useMemo(() => {
    const entries: { label: string; pct: number }[] = [];
    const map: { key: Parameters<typeof stagePct>[0]; label: string }[] = [
      { key: "maturity", label: "Salesforce" },
      { key: "data", label: "Data & AI" },
      { key: "sales", label: "Sales AI" },
      { key: "service", label: "Service AI" },
      { key: "slack", label: "Slack" },
      { key: "multilingual", label: "Multilingual" },
    ];
    for (const m of map) {
      const qs = questionsFor(m.key);
      if (qs.every((q) => answers.scales[q.id] !== undefined))
        entries.push({ label: m.label, pct: stagePct(m.key, answers.scales) });
    }
    return entries;
  }, [answers.scales]);

  /* Actions ---------------------------------------------------------- */
  const next = () => setIdx((i) => Math.min(SCREENS.length - 1, i + 1));
  const back = () => setIdx((i) => Math.max(0, i - 1));

  const startFresh = () => {
    setAnswers(EMPTY_ANSWERS);
    setIdx(1);
  };

  const resume = () => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as {
          answers: NavigatorAnswers;
          idx: number;
        };
        setAnswers({ ...EMPTY_ANSWERS, ...saved.answers });
        setIdx(Math.min(saved.idx, SCREENS.length - 2));
        return;
      }
    } catch {
      /* fall through */
    }
    startFresh();
  };

  const restart = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setAnswers(EMPTY_ANSWERS);
    setGenerating(false);
    setIdx(0);
    setCanResume(false);
  };

  const finishPriorities = () => {
    setGenerating(true);
    setGenStep(0);
    const steps = [700, 1500, 2300];
    steps.forEach((t, i) =>
      window.setTimeout(() => setGenStep(i + 1), t)
    );
    window.setTimeout(() => {
      setGenerating(false);
      next();
    }, 3000);
  };

  const setScale = (id: string, value: number) =>
    setAnswers((a) => ({ ...a, scales: { ...a.scales, [id]: value } }));

  const toggleList = (list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  /* Validation --------------------------------------------------------- */
  const canContinue = (() => {
    switch (screen.kind) {
      case "welcome":
        return true;
      case "profile-org": {
        const p = answers.profile;
        return !!(p.company.trim() && p.industry && p.country && p.employees);
      }
      case "profile-platform":
        return !!(answers.profile.crm && answers.profile.partner);
      case "objectives":
        return answers.objectives.length > 0;
      case "scale":
        return answers.scales[screen.q.id] !== undefined;
      case "international":
        return answers.international !== null;
      case "languages":
        return answers.languages.length > 0;
      case "agent":
        return answers.agents[screen.agent.id] !== undefined;
      case "priorities":
        return true;
      default:
        return false;
    }
  })();

  /* ------------------------------------------------------------------ */
  /* Screens                                                             */
  /* ------------------------------------------------------------------ */

  if (screen.kind === "welcome") {
    return (
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(720px 440px at 80% -10%, rgba(12,130,89,0.5), transparent 60%), radial-gradient(560px 400px at -5% 40%, rgba(14,148,174,0.28), transparent 60%), radial-gradient(500px 320px at 60% 115%, rgba(184,134,11,0.2), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-container flex-col justify-center px-6 py-20">
          <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden />
            The flagship Tazkia experience
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight animate-fade-up md:text-6xl">
            Tazkia AI Navigator
            <span className="align-super text-lg font-semibold text-gold-400 md:text-2xl">
              ™
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100 animate-fade-up">
            A guided consultation with a senior Salesforce AI advisor — not a
            survey. In about fifteen minutes we&apos;ll assess your organisation
            across Salesforce, data, Slack and Agentforce readiness, respond to
            every answer with real consulting insight, and hand you a
            board-ready transformation blueprint.
          </p>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3 animate-fade-up">
            {[
              ["46 signals", "assessed across seven dimensions"],
              ["Real-time insight", "consulting advice with every answer"],
              ["Executive report", "scores, roadmap and business case"],
            ].map(([t, d]) => (
              <div
                key={t}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm font-bold text-emerald-300">{t}</p>
                <p className="mt-0.5 text-xs leading-snug text-navy-200">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up">
            <button
              onClick={startFresh}
              className="rounded-lg bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-500"
            >
              Begin your consultation
            </button>
            {canResume && (
              <button
                onClick={resume}
                className="rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Resume where you left off
              </button>
            )}
          </div>
          <p className="mt-8 text-xs text-navy-300">
            Your answers stay in your browser until you choose to share them
            with us.
          </p>
        </div>
      </section>
    );
  }

  if (screen.kind === "report") {
    return <NavigatorReport answers={answers} onRestart={restart} />;
  }

  /* Generating overlay ------------------------------------------------- */
  if (generating) {
    const genLines = [
      "Scoring 46 readiness signals…",
      "Mapping your opportunity portfolio…",
      "Modelling business value and ROI…",
      "Assembling your executive report…",
    ];
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white shadow-lg shadow-emerald-600/30">
          TI
        </span>
        <h2 className="mt-6 text-2xl font-bold text-navy-950">
          Preparing your executive report
        </h2>
        <div className="mt-6 w-full space-y-3 text-left">
          {genLines.map((line, i) => (
            <div
              key={line}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-all duration-500 ${
                i <= genStep
                  ? "border-emerald-200 bg-emerald-50 text-navy-900"
                  : "border-[var(--hairline)] bg-white text-[var(--ink-muted)]"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  i < genStep
                    ? "bg-emerald-600 text-white"
                    : i === genStep
                      ? "animate-pulse border-2 border-emerald-500 text-emerald-600"
                      : "border border-[var(--hairline)] text-transparent"
                }`}
                aria-hidden
              >
                {i < genStep ? "✓" : ""}
              </span>
              {line}
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* Question screens ---------------------------------------------------- */
  const isFirstOfStage =
    idx > 0 && SCREENS[idx - 1].stage !== screen.stage;

  const body = (() => {
    switch (screen.kind) {
      case "profile-org": {
        const p = answers.profile;
        const set = (patch: Partial<typeof p>) =>
          setAnswers((a) => ({ ...a, profile: { ...a.profile, ...patch } }));
        return (
          <>
            <h2 className="text-2xl font-bold text-navy-950 md:text-3xl">
              Tell us about your organisation
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
              This calibrates every score and recommendation to your industry
              and scale.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Company name">
                <input
                  className={inputCls}
                  value={p.company}
                  onChange={(e) => set({ company: e.target.value })}
                  placeholder="e.g. Al Noor Group"
                />
              </Field>
              <Field label="Industry">
                <select
                  className={inputCls}
                  value={p.industry}
                  onChange={(e) => set({ industry: e.target.value })}
                >
                  <option value="">Select industry…</option>
                  {INDUSTRIES.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </Field>
              <Field label="Country / primary market">
                <select
                  className={inputCls}
                  value={p.country}
                  onChange={(e) => set({ country: e.target.value })}
                >
                  <option value="">Select country…</option>
                  {COUNTRIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Annual revenue" optional>
                <select
                  className={inputCls}
                  value={p.revenue}
                  onChange={(e) => set({ revenue: e.target.value })}
                >
                  <option value="">Select range…</option>
                  {REVENUE_BANDS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="mt-5">
              <p className="mb-1.5 text-sm font-semibold text-navy-950">
                Number of employees
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {EMPLOYEE_BANDS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    aria-pressed={p.employees === b.id}
                    onClick={() => set({ employees: b.id })}
                    className={`rounded-lg border px-2 py-2.5 text-center text-xs font-semibold transition-all ${
                      p.employees === b.id
                        ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "border-[var(--hairline)] bg-white text-navy-900 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        );
      }

      case "profile-platform": {
        const p = answers.profile;
        const set = (patch: Partial<typeof p>) =>
          setAnswers((a) => ({ ...a, profile: { ...a.profile, ...patch } }));
        return (
          <>
            <h2 className="text-2xl font-bold text-navy-950 md:text-3xl">
              Your current platform landscape
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
              Where you are today shapes the fastest path forward — there are
              strong AI moves from every starting point.
            </p>
            <div className="mt-6">
              <p className="mb-1.5 text-sm font-semibold text-navy-950">
                Primary CRM today
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {CRM_OPTIONS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={p.crm === c}
                    onClick={() => set({ crm: c })}
                    className={`rounded-lg border px-3 py-2.5 text-left text-xs font-semibold transition-all ${
                      p.crm === c
                        ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "border-[var(--hairline)] bg-white text-navy-900 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <p className="mb-1.5 text-sm font-semibold text-navy-950">
                Salesforce products in use{" "}
                <span className="text-xs font-medium text-[var(--ink-muted)]">
                  select all that apply
                </span>
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {CLOUD_OPTIONS.map((c) => {
                  const on = p.clouds.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        set({ clouds: toggleList(p.clouds, c.id) })
                      }
                      className={`rounded-lg border px-3 py-2.5 text-left text-xs font-semibold transition-all ${
                        on
                          ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                          : "border-[var(--hairline)] bg-white text-navy-900 hover:border-emerald-300"
                      }`}
                    >
                      <span
                        className={`mr-1.5 inline-block h-2 w-2 rounded-full ${on ? "bg-emerald-600" : "bg-navy-100"}`}
                        aria-hidden
                      />
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-6">
              <p className="mb-1.5 text-sm font-semibold text-navy-950">
                Implementation partner
              </p>
              <div className="grid gap-2">
                {PARTNER_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={p.partner === opt}
                    onClick={() => set({ partner: opt })}
                    className={`rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-all ${
                      p.partner === opt
                        ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "border-[var(--hairline)] bg-white text-navy-900 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </>
        );
      }

      case "objectives":
        return (
          <>
            <h2 className="text-2xl font-bold text-navy-950 md:text-3xl">
              What are your biggest priorities right now?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
              Select everything that matters — your report weights every
              recommendation against these outcomes.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {OBJECTIVES.map((o) => (
                <Chip
                  key={o.id}
                  label={o.label}
                  sub={o.blurb}
                  selected={answers.objectives.includes(o.id)}
                  onClick={() =>
                    setAnswers((a) => ({
                      ...a,
                      objectives: toggleList(a.objectives, o.id),
                    }))
                  }
                />
              ))}
            </div>
            {answers.objectives.length >= 3 && (
              <Insight text="A focused portfolio: we'll design the roadmap so one flagship initiative leads for each priority, rather than diluting effort across everything at once." />
            )}
          </>
        );

      case "scale": {
        const { q } = screen;
        const value = answers.scales[q.id];
        const insight =
          value === undefined
            ? null
            : value <= 2
              ? q.insights.low
              : value === 3
                ? q.insights.mid
                : q.insights.high;
        return (
          <>
            <h2 className="text-2xl font-bold leading-snug text-navy-950 md:text-3xl">
              {q.text}
            </h2>
            <p className="mt-2 flex gap-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden />
              <span>
                <strong className="font-semibold text-navy-900">
                  Why we ask:
                </strong>{" "}
                {q.why}
              </span>
            </p>
            <div className="mt-6 grid gap-2">
              {q.levels.map((level, i) => {
                const v = i + 1;
                const on = value === v;
                return (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setScale(q.id, v)}
                    className={`flex items-center gap-4 rounded-xl border px-4 py-3 text-left transition-all ${
                      on
                        ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "border-[var(--hairline)] bg-white text-navy-900 hover:-translate-y-px hover:border-emerald-300 hover:bg-emerald-50/50"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        on
                          ? "bg-white/20 text-white"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                      aria-hidden
                    >
                      {v}
                    </span>
                    <span className="text-sm font-medium leading-snug">
                      {level}
                    </span>
                  </button>
                );
              })}
            </div>
            {insight && <Insight text={insight} />}
          </>
        );
      }

      case "international":
        return (
          <>
            <h2 className="text-2xl font-bold text-navy-950 md:text-3xl">
              Do you operate internationally?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
              Multi-market operations change the economics of AI — one agent
              can serve every market you enter, in its own language.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Chip
                label="Yes — multiple markets"
                sub="We serve customers in more than one country"
                selected={answers.international === true}
                onClick={() =>
                  setAnswers((a) => ({ ...a, international: true }))
                }
              />
              <Chip
                label="Not yet — one primary market"
                sub="We operate domestically today"
                selected={answers.international === false}
                onClick={() =>
                  setAnswers((a) => ({ ...a, international: false }))
                }
              />
            </div>
            {answers.international === true && (
              <Insight text="International operations make multilingual AI a force multiplier — the same agent covers every market and time zone without duplicating teams." />
            )}
            {answers.international === false && (
              <Insight text="Even in one market, the Gulf is multilingual by nature — Arabic and English at minimum. AI removes the staffing constraint either way, and keeps the door open to expansion." />
            )}
          </>
        );

      case "languages":
        return (
          <>
            <h2 className="text-2xl font-bold text-navy-950 md:text-3xl">
              Which languages do your customers speak?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
              Select every language your customers use — whether or not you
              formally support it today.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {LANGUAGE_OPTIONS.map((lang) => {
                const on = answers.languages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    aria-pressed={on}
                    onClick={() =>
                      setAnswers((a) => ({
                        ...a,
                        languages: toggleList(a.languages, lang),
                      }))
                    }
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                      on
                        ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "border-[var(--hairline)] bg-white text-navy-900 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
            {answers.languages.length >= 3 && (
              <Insight text="Three or more customer languages is exactly where AI translation pays for itself — native-quality service in every language without a native-speaking team for each." />
            )}
          </>
        );

      case "agent": {
        const { agent } = screen;
        const rating = answers.agents[agent.id];
        return (
          <>
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden>
                {agent.emoji}
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-700">
                  Agentforce · {agent.blurb}
                </p>
                <h2 className="text-2xl font-bold text-navy-950 md:text-3xl">
                  {agent.name}
                </h2>
              </div>
            </div>
            <p className="mt-4 rounded-xl border border-[var(--hairline)] bg-[var(--surface-tint)] p-4 text-sm leading-relaxed text-navy-900">
              {agent.question}
            </p>
            <p className="mt-5 text-sm font-semibold text-navy-950">
              How valuable would this be for your organisation?
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-5">
              {AGENT_RATING_LABELS.map((label, i) => {
                const v = i + 1;
                const on = rating === v;
                return (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={on}
                    onClick={() =>
                      setAnswers((a) => ({
                        ...a,
                        agents: { ...a.agents, [agent.id]: v },
                      }))
                    }
                    className={`rounded-xl border px-2 py-3 text-center transition-all ${
                      on
                        ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "border-[var(--hairline)] bg-white text-navy-900 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    <span className="block text-sm font-bold">{v}</span>
                    <span
                      className={`mt-0.5 block text-[10px] font-medium leading-tight ${
                        on ? "text-emerald-50" : "text-[var(--ink-muted)]"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
            {rating !== undefined && rating >= 4 && (
              <Insight
                text={`Noted as a priority. We'll score ${agent.name} suitability against your platform, data and workflow readiness and position it on your roadmap accordingly.`}
              />
            )}
          </>
        );
      }

      case "priorities": {
        const scores = computeScores(answers);
        const initiatives = buildInitiatives(answers, scores);
        return (
          <>
            <h2 className="text-2xl font-bold text-navy-950 md:text-3xl">
              Your AI opportunity portfolio
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
              {stage.intro}
            </p>
            <div className="mt-6">
              <PriorityMatrix
                initiatives={initiatives}
                selected={answers.focusInitiatives}
                onToggle={(id) =>
                  setAnswers((a) => ({
                    ...a,
                    focusInitiatives: toggleList(a.focusInitiatives, id),
                  }))
                }
              />
            </div>
          </>
        );
      }
    }
  })();

  const questionMeta =
    "n" in screen ? `Question ${screen.n} of ${screen.of}` : null;

  return (
    <div ref={topRef} className="scroll-mt-20 bg-[var(--surface-tint)]">
      <div className="mx-auto flex max-w-container gap-10 px-6 py-10 md:py-14">
        <JourneyRail
          currentStage={screen.stage}
          completed={completedStages}
          progressPct={progressPct}
          liveScores={liveScores}
        />

        <div className="min-w-0 flex-1">
          {/* mobile progress */}
          <div className="mb-6 lg:hidden">
            <div className="mb-1.5 flex items-baseline justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)]">
                {stage.title}
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

          {/* chapter opener */}
          {isFirstOfStage && stage.intro && (
            <div
              key={`intro-${stage.id}`}
              className="mb-6 flex animate-fade-up gap-3 rounded-2xl bg-navy-950 p-5 text-white"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold"
                aria-hidden
              >
                TI
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                  {stage.title} · {stage.tagline}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-100">
                  {stage.intro}
                </p>
              </div>
            </div>
          )}

          <div
            key={idx}
            className="animate-fade-up rounded-2xl border border-[var(--hairline)] bg-white p-6 shadow-sm md:p-10"
          >
            {questionMeta && (
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--ink-muted)]">
                {stage.title}{" "}
                <span className="text-emerald-700">· {questionMeta}</span>
              </p>
            )}
            {body}

            <div className="mt-8 flex items-center justify-between border-t border-[var(--hairline)] pt-6">
              <button
                type="button"
                onClick={back}
                className="text-sm font-semibold text-[var(--ink-muted)] transition-colors hover:text-navy-900"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={screen.kind === "priorities" ? finishPriorities : next}
                disabled={!canContinue}
                className="rounded-lg bg-emerald-600 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none disabled:hover:translate-y-0"
              >
                {screen.kind === "priorities"
                  ? "Generate my executive report"
                  : "Continue →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
