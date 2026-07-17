"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { NavigatorAnswers } from "@/lib/navigator/engine";
import { buildReport, questionsFor } from "@/lib/navigator/engine";
import RadarChart from "@/components/charts/RadarChart";
import KpiWidget from "@/components/ui/KpiWidget";
import Scorecard from "@/components/ui/Scorecard";
import Badge from "@/components/ui/Badge";
import ScoreDial from "@/components/navigator/ScoreDial";
import Heatmap, { HeatRow } from "@/components/navigator/Heatmap";
import PriorityMatrix from "@/components/navigator/PriorityMatrix";
import RoadmapTimeline from "@/components/navigator/RoadmapTimeline";

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[var(--hairline)] bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
        {eyebrow}
      </p>
      <h3 className="mt-1 text-xl font-bold text-navy-950 md:text-2xl">
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function BulletList({ items, tone = "emerald" }: { items: string[]; tone?: "emerald" | "gold" }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-baseline gap-2.5 text-sm leading-relaxed text-[var(--ink-secondary)]"
        >
          <span
            className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
              tone === "gold" ? "bg-gold-500" : "bg-emerald-500"
            }`}
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function NavigatorReport({
  answers,
  onRestart,
}: {
  answers: NavigatorAnswers;
  onRestart: () => void;
}) {
  const report = useMemo(() => buildReport(answers), [answers]);
  const { scores, value } = report;
  const company = answers.profile.company.trim() || "Your organisation";

  const radarAxes = [
    "Salesforce",
    "Data & AI",
    "Sales AI",
    "Service AI",
    "Slack",
    "Agentforce",
  ];
  const radarValues = [
    scores.maturity,
    scores.data,
    scores.sales,
    scores.service,
    scores.slack,
    scores.agentforce,
  ].map((p) => p / 20);

  const heatRows: HeatRow[] = (
    [
      ["maturity", "Salesforce Maturity"],
      ["data", "Data & AI Readiness"],
      ["sales", "Sales AI"],
      ["service", "Service AI"],
      ["slack", "Slack & Workflow"],
      ["multilingual", "Multilingual"],
    ] as const
  ).map(([key, name]) => ({
    name,
    cells: questionsFor(key).map((q) => ({
      id: q.id,
      label: q.short,
      full: q.text,
      value: answers.scales[q.id] ?? null,
    })),
  }));

  const dimensionCards = [
    { title: "CRM Maturity", pct: scores.maturity },
    { title: "Data Readiness", pct: scores.data },
    { title: "Sales AI", pct: scores.sales },
    { title: "Service AI", pct: scores.service },
    { title: "Slack Readiness", pct: scores.slack },
    { title: "Agentforce Readiness", pct: scores.agentforce },
  ];

  const reportDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-[var(--surface-tint)]">
      {/* Report masthead */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(700px 420px at 85% -10%, rgba(12,130,89,0.45), transparent 60%), radial-gradient(560px 380px at -5% 40%, rgba(14,148,174,0.25), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-container px-6 py-14 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl animate-fade-up">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden />
                Tazkia AI Navigator™ · Executive Report
              </p>
              <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                {company}
              </h1>
              <p className="mt-2 text-sm text-navy-200">
                {answers.profile.industry || "—"} ·{" "}
                {answers.profile.country || "—"} · Prepared {reportDate}
              </p>
              <p className="mt-5 text-lg leading-relaxed text-navy-100">
                Your organisation is{" "}
                <strong className="text-emerald-300">
                  {scores.band.headline}
                </strong>
                .
              </p>
            </div>
            <div className="animate-fade-up rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
              <ScoreDial
                value={scores.overall}
                label="Overall AI Readiness"
                sublabel={scores.band.name}
                dark
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-container space-y-8 px-6 py-10 md:py-14">
        {/* Executive summary */}
        <Section eyebrow="Executive summary" title="Where you stand — and what to do about it">
          <p className="max-w-4xl text-[15px] leading-relaxed text-[var(--ink-secondary)]">
            {report.summary}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dimensionCards.map((d) => (
              <Scorecard
                key={d.title}
                title={d.title}
                score={d.pct}
                max={100}
                detail={
                  d.pct < 40
                    ? "Priority gap — foundational work needed first."
                    : d.pct < 65
                      ? "Workable foundation — strengthen while piloting."
                      : "A strength to build your first deployments on."
                }
              />
            ))}
          </div>
        </Section>

        {/* Readiness profile */}
        <div className="grid gap-8 lg:grid-cols-2">
          <Section eyebrow="Readiness profile" title="Your dimensions at a glance">
            <RadarChart
              axes={radarAxes}
              series={[
                {
                  name: company,
                  color: "var(--series-1)",
                  values: radarValues,
                },
              ]}
              max={5}
            />
          </Section>
          <Section eyebrow="Capability heat map" title="All 46 signals, scored">
            <Heatmap rows={heatRows} />
          </Section>
        </div>

        {/* Agentforce suitability */}
        <Section
          eyebrow="Agentforce readiness"
          title="Agent suitability, ranked for your organisation"
        >
          <div className="space-y-3">
            {report.agents.map((s, i) => (
              <div
                key={s.agent.id}
                className="flex items-center gap-4 rounded-xl border border-[var(--hairline)] bg-white p-4"
              >
                <span className="text-2xl" aria-hidden>
                  {s.agent.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-bold text-navy-950">
                      {s.agent.name}
                      {i === 0 && (
                        <span className="ml-2 align-middle">
                          <Badge tone="gold">Recommended first</Badge>
                        </span>
                      )}
                    </p>
                    <p className="text-sm font-bold tabular-nums text-emerald-700">
                      {s.suitabilityPct}
                      <span className="text-xs font-medium text-[var(--ink-muted)]">
                        {" "}
                        / 100 suitability
                      </span>
                    </p>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-navy-100">
                    <div
                      className="h-full rounded-full bg-emerald-600 transition-[width] duration-700 ease-out"
                      style={{ width: `${s.suitabilityPct}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-[var(--ink-muted)]">
                    {s.agent.blurb} · your interest{" "}
                    {s.interest ? `${s.interest}/5` : "n/a"} · organisational
                    readiness {s.readinessPct}/100
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Opportunities & risks */}
        <div className="grid gap-8 lg:grid-cols-2">
          <Section eyebrow="Top opportunities" title="Where AI moves your numbers">
            <BulletList items={report.opportunities} />
          </Section>
          <Section eyebrow="Top risks" title="What could stall the programme">
            <BulletList items={report.risks} tone="gold" />
          </Section>
        </div>

        {/* Priority matrix */}
        <Section
          eyebrow="Business priorities"
          title="Your opportunity portfolio, mapped"
        >
          <PriorityMatrix
            initiatives={report.initiatives}
            selected={answers.focusInitiatives}
            interactive={false}
          />
          {answers.focusInitiatives.length > 0 && (
            <p className="mt-4 text-sm text-[var(--ink-secondary)]">
              ★ marks the {answers.focusInitiatives.length} initiative
              {answers.focusInitiatives.length > 1 ? "s" : ""} you selected as
              priorities — they lead the roadmap below.
            </p>
          )}
        </Section>

        {/* Roadmaps */}
        <div className="grid gap-8 lg:grid-cols-2">
          <Section eyebrow="90-day roadmap" title="The first ninety days">
            <RoadmapTimeline phases={report.roadmap90} />
          </Section>
          <Section eyebrow="12-month roadmap" title="The first year, by quarter">
            <RoadmapTimeline phases={report.roadmap12} />
          </Section>
        </div>

        {/* Pilot */}
        <Section eyebrow="Suggested pilot programme" title={report.pilot.name}>
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--ink-secondary)]">
            {report.pilot.detail}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge tone="emerald">6-week supervised pilot</Badge>
            <Badge tone="teal">Weekly value measurement</Badge>
            <Badge tone="gold">Go / no-go gate before scale</Badge>
          </div>
        </Section>

        {/* Improvement lists */}
        <div className="grid gap-8 lg:grid-cols-2">
          <Section
            eyebrow="Suggested Salesforce improvements"
            title="Strengthening the platform"
          >
            <BulletList items={report.salesforceImprovements} />
          </Section>
          <Section
            eyebrow="Suggested Slack improvements"
            title="Intelligence in the flow of work"
          >
            <BulletList items={report.slackImprovements} />
          </Section>
          <Section
            eyebrow="Suggested Agentforce use cases"
            title="Your first agents"
          >
            <BulletList items={report.agentUseCases} />
          </Section>
          <Section eyebrow="Recommended workshops" title="Where to go deeper">
            <BulletList items={report.workshops} />
          </Section>
        </div>

        {/* Business value */}
        <Section
          eyebrow="Business value estimate"
          title="What this could be worth"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <KpiWidget
              label="Estimated ROI"
              value={value.roiMultiple}
              suffix="×"
              decimals={1}
              caption={`Modelled payback in ~${value.paybackMonths} months`}
              tone="emerald"
            />
            <KpiWidget
              label="Time saved"
              value={value.hoursPerWeek}
              suffix=" hrs/wk"
              caption={`≈ ${value.fteEquivalent} FTE of capacity redirected to higher-value work`}
              tone="teal"
            />
            <KpiWidget
              label="Revenue uplift"
              value={value.revenueUpliftPct}
              prefix="+"
              suffix="%"
              decimals={1}
              caption="From faster lead response, coverage and coaching"
              tone="gold"
            />
            <KpiWidget
              label="Customer satisfaction"
              value={value.csatPoints}
              prefix="+"
              suffix=" pts"
              caption="From instant, always-on, in-language response"
              tone="emerald"
            />
            <KpiWidget
              label="Case deflection"
              value={value.deflectionPct}
              suffix="%"
              caption="Routine contacts resolved autonomously"
              tone="teal"
            />
            <KpiWidget
              label="FTE capacity released"
              value={value.fteEquivalent}
              decimals={1}
              caption="Capacity redeployed, not necessarily reduced"
              tone="navy"
            />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[var(--ink-muted)]">
            Directional estimates modelled from your answers and typical
            outcomes we observe at organisations of your size and readiness.
            A validated business case with your actual baselines is produced
            in the Discovery Workshop.
          </p>
        </Section>

        {/* Services */}
        <Section
          eyebrow="Recommended Tazkia services"
          title="How we would help, in order"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {report.services.map((svc, i) => (
              <div
                key={svc.name}
                className={`rounded-xl border p-5 ${
                  svc.flagship
                    ? "border-emerald-300 bg-emerald-50/60"
                    : "border-[var(--hairline)] bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <h4 className="text-sm font-bold text-navy-950">
                    {svc.name}
                  </h4>
                  {svc.flagship && <Badge tone="gold">Start here</Badge>}
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--ink-secondary)]">
                  {svc.reason}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Book workshop CTA */}
        <section className="overflow-hidden rounded-2xl bg-emerald-800 text-white">
          <div className="flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                The next step
              </p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
                Book your Discovery Workshop
              </h3>
              <p className="mt-2 max-w-xl leading-relaxed text-emerald-100">
                Bring this report. In half a day with your leadership team we
                validate the findings, pressure-test the business case and
                leave you with a sponsored, sequenced plan — whatever you
                decide next.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <Link
                href="/contact"
                className="rounded-lg bg-white px-7 py-3.5 text-center text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
              >
                Book a Discovery Workshop
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-lg border border-white/25 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Save this report (PDF)
              </button>
            </div>
          </div>
        </section>

        <div className="flex justify-center pb-4">
          <button
            type="button"
            onClick={onRestart}
            className="text-sm font-semibold text-emerald-700 hover:underline"
          >
            Start a new assessment
          </button>
        </div>
      </div>
    </div>
  );
}
