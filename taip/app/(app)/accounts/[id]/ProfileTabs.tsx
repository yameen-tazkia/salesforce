"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import RadarChart from "@/components/charts/RadarChart";
import BarChart from "@/components/charts/BarChart";
import {
  Badge,
  Card,
  Meter,
  PRODUCT_LEVEL_TONES,
  SectionTitle,
} from "@/components/ui/primitives";
import type { Account, SalesforceSignal, Stakeholder } from "@/modules/accounts/types";
import type { AccountScore } from "@/modules/scoring/engine";
import type { OutreachBriefing } from "@/modules/outreach/briefing";
import { PIPELINE_STAGES, PIPELINE_STAGE_LABELS, SIGNAL_TYPE_LABELS } from "@/modules/core/taxonomy";
import { cn, formatDate } from "@/lib/utils";

const TABS = [
  "Overview",
  "Salesforce Intelligence",
  "Product Detection",
  "AI Readiness",
  "Stakeholders",
  "Outreach Briefing",
  "Workspace",
] as const;
type Tab = (typeof TABS)[number];

const STRENGTH_TONES = { strong: "emerald", moderate: "teal", weak: "slate" } as const;

export default function ProfileTabs({
  account,
  score,
  briefing,
  canEdit,
}: {
  account: Account;
  score: AccountScore;
  briefing: OutreachBriefing;
  canEdit: boolean;
}) {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <div>
      <div className="print-hidden mb-4 flex flex-wrap gap-1 rounded-xl border border-[var(--hairline)] bg-white p-1.5 shadow-sm shadow-navy-950/[0.03]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors",
              tab === t
                ? "bg-navy-950 text-white"
                : "text-[var(--ink-secondary)] hover:bg-navy-50",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && <OverviewTab account={account} />}
      {tab === "Salesforce Intelligence" && <SalesforceTab account={account} score={score} />}
      {tab === "Product Detection" && <ProductsTab score={score} />}
      {tab === "AI Readiness" && <ReadinessTab account={account} score={score} />}
      {tab === "Stakeholders" && <StakeholdersTab stakeholders={account.stakeholders} />}
      {tab === "Outreach Briefing" && <BriefingTab briefing={briefing} accountId={account.id} />}
      {tab === "Workspace" && <WorkspaceTab account={account} canEdit={canEdit} />}
    </div>
  );
}

// ---------------------------------------------------------------- Overview

function OverviewTab({ account }: { account: Account }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <SectionTitle title="Company overview" />
        <p className="text-sm leading-relaxed text-[var(--ink-secondary)]">{account.description}</p>
        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:grid-cols-3">
          {[
            ["Industry", account.industry],
            ["Sub-industry", account.subIndustry ?? "—"],
            ["Country", `${account.city}, ${account.country}`],
            ["Ownership", account.ownership],
            ["Founded", account.founded ? String(account.founded) : "—"],
            ["Employees", account.employees.toLocaleString()],
            ["Est. revenue (USD)", account.revenueEstimateUSD >= 1000 ? `$${(account.revenueEstimateUSD / 1000).toFixed(1)}B` : `$${account.revenueEstimateUSD}M`],
            ["Growth rate", `${account.growthRatePct}% p.a.`],
            ["Regional presence", `${account.attributes.regionalPresence} market(s)`],
          ].map(([label, value]) => (
            <div key={label as string}>
              <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                {label}
              </dt>
              <dd className="mt-0.5 font-medium text-navy-950">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <SectionTitle title="Digital transformation" />
            {account.digitalInitiatives.length === 0 ? (
              <p className="text-sm text-[var(--ink-muted)]">No initiatives recorded.</p>
            ) : (
              <ul className="space-y-3">
                {account.digitalInitiatives.map((i) => (
                  <li key={i.title} className="rounded-lg border border-[var(--hairline)] p-3">
                    <p className="text-[13px] font-semibold text-navy-950">{i.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
                      {i.summary}
                    </p>
                    <p className="mt-1 text-[11px] text-[var(--ink-muted)]">
                      Announced {formatDate(i.announcedAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <SectionTitle title="AI initiatives" />
            {account.aiInitiatives.length === 0 ? (
              <p className="text-sm text-[var(--ink-muted)]">No AI initiatives recorded.</p>
            ) : (
              <ul className="space-y-3">
                {account.aiInitiatives.map((i) => (
                  <li key={i.title} className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3">
                    <p className="text-[13px] font-semibold text-navy-950">{i.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
                      {i.summary}
                    </p>
                    <p className="mt-1 text-[11px] text-[var(--ink-muted)]">
                      Announced {formatDate(i.announcedAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <Card>
          <SectionTitle title="Recent news" />
          {account.news.length === 0 ? (
            <p className="text-sm text-[var(--ink-muted)]">No recent news captured.</p>
          ) : (
            <ul className="space-y-3">
              {account.news.map((n) => (
                <li key={n.title}>
                  <p className="text-[13px] font-semibold leading-snug text-navy-950">{n.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
                    {n.summary}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[var(--ink-muted)]">
                    {n.source} · {formatDate(n.publishedAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <SectionTitle title="Hiring trends" />
          {account.hiringTrends.length === 0 ? (
            <p className="text-sm text-[var(--ink-muted)]">No hiring data captured.</p>
          ) : (
            <ul className="space-y-2.5">
              {account.hiringTrends.map((h) => (
                <li key={h.function} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-navy-950">{h.function}</p>
                    {h.note && <p className="text-[11px] text-[var(--ink-muted)]">{h.note}</p>}
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold tabular-nums text-[var(--ink-secondary)]">
                    {h.openRoles} roles
                    <span
                      aria-label={h.trend}
                      className={cn(
                        h.trend === "rising" && "text-emerald-700",
                        h.trend === "falling" && "text-red-700",
                        h.trend === "steady" && "text-[var(--ink-muted)]",
                      )}
                    >
                      {h.trend === "rising" ? "▲" : h.trend === "falling" ? "▼" : "→"}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <SectionTitle title="Technology stack" hint="From public/authorised sources" />
          <ul className="space-y-2">
            {account.techStack.map((t) => (
              <li key={t.name} className="flex items-center justify-between gap-2 text-[13px]">
                <span className="font-medium text-navy-950">{t.name}</span>
                <span className="text-right text-[11px] text-[var(--ink-muted)]">
                  {t.category} · {t.source}
                </span>
              </li>
            ))}
          </ul>
          {account.consultingPartners.length > 0 && (
            <>
              <p className="mb-1.5 mt-4 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                Known consulting partners
              </p>
              <div className="flex flex-wrap gap-1.5">
                {account.consultingPartners.map((p) => (
                  <Badge key={p} tone="slate">
                    {p}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

// ------------------------------------------------------ Salesforce intel

function SignalCard({ signal }: { signal: SalesforceSignal }) {
  return (
    <li className="rounded-lg border border-[var(--hairline)] p-3.5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] font-semibold leading-snug text-navy-950">{signal.title}</p>
        <Badge tone={STRENGTH_TONES[signal.strength]}>{signal.strength}</Badge>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-[var(--ink-secondary)]">{signal.detail}</p>
      <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--ink-muted)]">
        <span className="font-semibold">{SIGNAL_TYPE_LABELS[signal.type]}</span>
        <span>{signal.source}</span>
        <span>{formatDate(signal.observedAt)}</span>
        {signal.products?.map((p) => (
          <Badge key={p} tone="teal">
            {p}
          </Badge>
        ))}
      </p>
    </li>
  );
}

function SalesforceTab({ account, score }: { account: Account; score: AccountScore }) {
  const signals = [...account.salesforceSignals].sort(
    (a, b) => new Date(b.observedAt).getTime() - new Date(a.observedAt).getTime(),
  );
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card>
        <SectionTitle
          title="Confidence breakdown"
          hint="Weighted evidence with diminishing repeats"
        />
        <p className="mb-4 text-sm text-[var(--ink-secondary)]">
          <span className="text-2xl font-extrabold tabular-nums text-navy-950">
            {score.salesforce.score}
          </span>
          <span className="text-[var(--ink-muted)]"> /100 · </span>
          <span className="font-semibold">{score.salesforce.band}</span>
          <span className="text-[var(--ink-muted)]">
            {" "}
            from {score.salesforce.signalCount} signal{score.salesforce.signalCount === 1 ? "" : "s"}
          </span>
        </p>
        {score.salesforce.contributions.length === 0 ? (
          <p className="text-sm text-[var(--ink-muted)]">
            No Salesforce evidence captured yet. Run research to populate indicators.
          </p>
        ) : (
          <BarChart
            bars={score.salesforce.contributions.map((c) => ({
              label: `${c.label}${c.count > 1 ? ` ×${c.count}` : ""}`,
              value: c.points,
              valueLabel: `+${c.points}`,
              color: "var(--series-3)",
            }))}
          />
        )}
        <p className="mt-4 rounded-lg bg-navy-50 p-3 text-[11px] leading-relaxed text-[var(--ink-secondary)]">
          &ldquo;Confirmed&rdquo; additionally requires at least one conclusive strong signal
          (case study, partner announcement or public documentation) — job adverts alone
          can never confirm usage.
        </p>
      </Card>

      <Card className="lg:col-span-2">
        <SectionTitle
          title="Evidence timeline"
          hint="All indicators from public and authorised sources, newest first"
        />
        {signals.length === 0 ? (
          <p className="py-8 text-center text-sm text-[var(--ink-muted)]">
            No signals captured for this account yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {signals.map((s) => (
              <SignalCard key={s.id} signal={s} />
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

// ------------------------------------------------------ Product detection

function ProductsTab({ score }: { score: AccountScore }) {
  const withEvidence = score.products.filter((p) => p.level !== "none");
  const without = score.products.filter((p) => p.level === "none");
  return (
    <div className="space-y-4">
      <Card>
        <SectionTitle
          title="Salesforce product detection"
          hint="Evidence-based confidence per product"
        />
        {withEvidence.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--ink-muted)]">
            No product-level evidence captured yet.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {withEvidence.map((p) => (
              <div key={p.product} className="rounded-lg border border-[var(--hairline)] p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-navy-950">{p.product}</p>
                  <Badge tone={PRODUCT_LEVEL_TONES[p.level]} className="capitalize">
                    {p.level}
                  </Badge>
                </div>
                <div className="mt-2">
                  <Meter value={p.score} color="var(--series-3)" />
                </div>
                <ul className="mt-3 space-y-1.5">
                  {p.evidence.map((e) => (
                    <li key={e.id} className="text-[11px] leading-snug text-[var(--ink-secondary)]">
                      <span className="font-semibold text-navy-950">{e.title}</span>
                      <span className="text-[var(--ink-muted)]">
                        {" "}
                        · {e.source} · {formatDate(e.observedAt)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Card>
      {without.length > 0 && (
        <Card>
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
            No evidence yet
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {without.map((p) => (
              <Badge key={p.product} tone="slate">
                {p.product}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ------------------------------------------------------ AI readiness

function ReadinessTab({ account, score }: { account: Account; score: AccountScore }) {
  const r = account.readiness;
  const axes = [
    { label: "CRM", value: r.crmMaturity },
    { label: "Data", value: r.dataMaturity },
    { label: "Service", value: r.serviceMaturity },
    { label: "Sales", value: r.salesMaturity },
    { label: "AI", value: r.aiReadiness },
    { label: "Slack", value: r.slackReadiness },
    { label: "Multilingual", value: r.multilingualOpportunity },
    { label: "Digital", value: r.digitalTransformationMaturity },
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <SectionTitle
          title="Readiness profile"
          hint="Analyst estimates, 0–100 per dimension"
        />
        <RadarChart axes={axes} />
      </Card>
      <Card>
        <SectionTitle
          title="AI Opportunity score"
          hint="Weighted readiness blend plus demand-side drivers"
        />
        <p className="mb-4 text-sm text-[var(--ink-secondary)]">
          <span className="text-2xl font-extrabold tabular-nums text-navy-950">
            {score.aiOpportunity.score}
          </span>
          <span className="text-[var(--ink-muted)]"> /100 · readiness blend contributes </span>
          <span className="font-semibold tabular-nums">{score.aiOpportunity.readinessComponent}</span>
        </p>
        {score.aiOpportunity.drivers.length > 0 && (
          <BarChart
            bars={score.aiOpportunity.drivers.map((d) => ({
              label: d.label,
              value: d.points,
              valueLabel: `+${d.points}`,
              color: "var(--series-4)",
            }))}
            max={15}
          />
        )}
        <div className="mt-5">
          <SectionTitle title="Scoring criteria" hint="Named checks feeding firmographic fit" />
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {score.criteria.map((c) => (
              <li
                key={c.id}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs",
                  c.met
                    ? "border-emerald-200 bg-emerald-50/50 text-navy-950"
                    : "border-[var(--hairline)] text-[var(--ink-muted)]",
                )}
                title={c.evidence}
              >
                <span className="flex items-center gap-1.5 font-medium">
                  <span aria-hidden>{c.met ? "✓" : "○"}</span>
                  {c.label}
                </span>
                <span className="font-semibold tabular-nums">
                  {c.points}/{c.maxPoints}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}

// ------------------------------------------------------ Stakeholders

const INFLUENCE_TONES = {
  "Economic Buyer": "navy",
  Champion: "emerald",
  "Technical Evaluator": "teal",
  Influencer: "gold",
  Gatekeeper: "slate",
} as const;

function StakeholdersTab({ stakeholders }: { stakeholders: Stakeholder[] }) {
  const ordered = [...stakeholders].sort((a, b) => {
    const rank = { P1: 0, P2: 1, P3: 2 } as const;
    return rank[a.relationshipPriority] - rank[b.relationshipPriority];
  });
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {ordered.length === 0 && (
        <Card className="md:col-span-2">
          <p className="py-6 text-center text-sm text-[var(--ink-muted)]">
            No stakeholders mapped yet. Use enrichment imports to add contacts.
          </p>
        </Card>
      )}
      {ordered.map((s) => (
        <Card key={s.id}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-navy-950">{s.name}</p>
              <p className="text-[13px] text-[var(--ink-secondary)]">{s.title}</p>
              <p className="mt-0.5 text-[11px] text-[var(--ink-muted)]">
                {s.department} · {s.location}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <Badge tone={s.relationshipPriority === "P1" ? "navy" : s.relationshipPriority === "P2" ? "teal" : "slate"}>
                {s.relationshipPriority}
              </Badge>
              <Badge tone={INFLUENCE_TONES[s.buyingInfluence]}>{s.buyingInfluence}</Badge>
            </div>
          </div>
          <p className="mt-3 rounded-lg bg-navy-50 p-3 text-xs leading-relaxed text-[var(--ink-secondary)]">
            <span className="font-bold text-navy-950">Outreach angle: </span>
            {s.outreachAngle}
          </p>
          <div className="mt-2.5 flex items-center gap-3 text-[11px]">
            <Badge tone="slate">{s.persona}</Badge>
            {s.linkedinUrl && (
              <a
                href={s.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-emerald-700 hover:underline"
              >
                LinkedIn ↗
              </a>
            )}
            {s.email && <span className="text-[var(--ink-muted)]">{s.email}</span>}
          </div>
        </Card>
      ))}
    </div>
  );
}

// ------------------------------------------------------ Outreach briefing

function BriefList({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <Card className={accent ? "border-emerald-200" : undefined}>
      <SectionTitle title={title} />
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-[13px] leading-relaxed text-[var(--ink-secondary)]">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function BriefingTab({ briefing, accountId }: { briefing: OutreachBriefing; accountId: string }) {
  return (
    <div className="space-y-4">
      <Card>
        <SectionTitle
          title="Company summary"
          action={
            <a
              href={`/accounts/${accountId}/report`}
              className="rounded-lg bg-navy-950 px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy-800"
            >
              Open executive report
            </a>
          }
        />
        <p className="text-sm leading-relaxed text-[var(--ink-secondary)]">
          {briefing.companySummary}
        </p>
        {briefing.recentInitiatives.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {briefing.recentInitiatives.map((i) => (
              <Badge key={i.title} tone={i.category === "AI" ? "emerald" : "teal"}>
                {i.title}
              </Badge>
            ))}
          </div>
        )}
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <BriefList title="Likely pain points" items={briefing.likelyPainPoints} />
        <BriefList title="Agentforce opportunities" items={briefing.agentforceOpportunities} accent />
        <BriefList title="Slack opportunities" items={briefing.slackOpportunities} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionTitle title="Discovery workshop agenda" hint="Suggested half-day structure" />
          <ol className="space-y-2">
            {briefing.discoveryWorkshopAgenda.map((item, i) => (
              <li key={item.item} className="flex items-center gap-3 text-[13px]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-950 text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="flex-1 font-medium text-navy-950">{item.item}</span>
                <span className="shrink-0 text-xs tabular-nums text-[var(--ink-muted)]">
                  {item.duration}
                </span>
              </li>
            ))}
          </ol>
        </Card>
        <Card>
          <SectionTitle title="Suggested pilot programme" />
          <p className="text-sm font-bold text-navy-950">{briefing.pilotProgramme.name}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[var(--ink-secondary)]">
            {briefing.pilotProgramme.scope}
          </p>
          <p className="mt-2 text-xs text-[var(--ink-muted)]">
            Duration: {briefing.pilotProgramme.duration}
          </p>
          <p className="mb-1.5 mt-4 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
            Success measures
          </p>
          <ul className="space-y-1.5">
            {briefing.pilotProgramme.successMeasures.map((m) => (
              <li key={m} className="flex gap-2 text-xs text-[var(--ink-secondary)]">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" aria-hidden />
                {m}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <BriefList title="Conversation starters" items={briefing.conversationStarters} />
        <BriefList title="Personalisation ideas" items={briefing.personalisationIdeas} />
      </div>
    </div>
  );
}

// ------------------------------------------------------ Workspace (notes, tags, workflow)

function WorkspaceTab({ account, canEdit }: { account: Account; canEdit: boolean }) {
  const router = useRouter();
  const [noteDraft, setNoteDraft] = useState("");
  const [tagDraft, setTagDraft] = useState("");
  const [busy, setBusy] = useState(false);

  async function mutate(run: () => Promise<Response>) {
    setBusy(true);
    const res = await run();
    setBusy(false);
    if (res.ok) router.refresh();
  }

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!noteDraft.trim()) return;
    await mutate(() =>
      fetch(`/api/v1/accounts/${account.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: noteDraft }),
      }),
    );
    setNoteDraft("");
  }

  async function addTag(e: React.FormEvent) {
    e.preventDefault();
    if (!tagDraft.trim()) return;
    await mutate(() =>
      fetch(`/api/v1/accounts/${account.id}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag: tagDraft }),
      }),
    );
    setTagDraft("");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <SectionTitle title="Research notes" hint="Shared with the whole team" />
        {canEdit && (
          <form onSubmit={addNote} className="mb-4">
            <textarea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              rows={3}
              placeholder="Add a research note, call summary or next step…"
              className="w-full rounded-lg border border-[var(--hairline)] p-3 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
            <button
              type="submit"
              disabled={busy || !noteDraft.trim()}
              className="mt-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
            >
              Add note
            </button>
          </form>
        )}
        {account.notes.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--ink-muted)]">No notes yet.</p>
        ) : (
          <ul className="space-y-3">
            {account.notes.map((n) => (
              <li key={n.id} className="rounded-lg border border-[var(--hairline)] p-3.5">
                <p className="text-[13px] leading-relaxed text-[var(--ink-secondary)]">{n.body}</p>
                <p className="mt-1.5 text-[11px] text-[var(--ink-muted)]">
                  {n.authorName} · {formatDate(n.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className="space-y-4">
        <Card>
          <SectionTitle title="Workflow" />
          <label className="mb-3 block">
            <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
              Pipeline stage
            </span>
            <select
              disabled={!canEdit || busy}
              value={account.pipelineStage}
              onChange={(e) =>
                mutate(() =>
                  fetch(`/api/v1/accounts/${account.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ pipelineStage: e.target.value }),
                  }),
                )
              }
              className="w-full rounded-lg border border-[var(--hairline)] bg-white px-3 py-2 text-sm font-medium outline-none focus:border-emerald-500 disabled:opacity-60"
            >
              {PIPELINE_STAGES.map((stage) => (
                <option key={stage} value={stage}>
                  {PIPELINE_STAGE_LABELS[stage]}
                </option>
              ))}
            </select>
          </label>
          <label className="mb-3 block">
            <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
              Next follow-up
            </span>
            <input
              type="date"
              disabled={!canEdit || busy}
              defaultValue={account.nextFollowUpAt ?? ""}
              onChange={(e) =>
                mutate(() =>
                  fetch(`/api/v1/accounts/${account.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nextFollowUpAt: e.target.value || null }),
                  }),
                )
              }
              className="w-full rounded-lg border border-[var(--hairline)] bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 disabled:opacity-60"
            />
          </label>
          {canEdit && (
            <button
              disabled={busy}
              onClick={() =>
                mutate(() =>
                  fetch(`/api/v1/accounts/${account.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ markResearched: true }),
                  }),
                )
              }
              className="w-full rounded-lg border border-[var(--hairline)] px-3 py-2 text-xs font-semibold text-[var(--ink-secondary)] transition-colors hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-50"
            >
              Mark researched today
            </button>
          )}
        </Card>

        <Card>
          <SectionTitle title="Tags" />
          <div className="flex flex-wrap gap-1.5">
            {account.tags.length === 0 && (
              <p className="text-sm text-[var(--ink-muted)]">No tags.</p>
            )}
            {account.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-[11px] font-semibold text-teal-800"
              >
                #{tag}
                {canEdit && (
                  <button
                    aria-label={`Remove tag ${tag}`}
                    disabled={busy}
                    onClick={() =>
                      mutate(() =>
                        fetch(`/api/v1/accounts/${account.id}/tags`, {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ tag }),
                        }),
                      )
                    }
                    className="text-teal-600 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
          {canEdit && (
            <form onSubmit={addTag} className="mt-3 flex gap-2">
              <input
                value={tagDraft}
                onChange={(e) => setTagDraft(e.target.value)}
                placeholder="new-tag"
                className="min-w-0 flex-1 rounded-lg border border-[var(--hairline)] px-3 py-1.5 text-xs outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={busy || !tagDraft.trim()}
                className="rounded-lg bg-navy-950 px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy-800 disabled:opacity-50"
              >
                Add
              </button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
