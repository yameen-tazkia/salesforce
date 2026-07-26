import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge, ConfidenceBadge, Meter, PriorityBadge, PRODUCT_LEVEL_TONES } from "@/components/ui/primitives";
import { getScoredAccount } from "@/modules/accounts/service";
import { generateBriefing } from "@/modules/outreach/briefing";
import { formatDate, formatEmployees, formatRevenue } from "@/lib/utils";
import PrintButton from "./PrintButton";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const row = getScoredAccount(params.id);
  return { title: row ? `${row.account.name} — Executive report` : "Report" };
}

function ReportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="print-page mt-8">
      <h2 className="border-b-2 border-navy-950 pb-1.5 text-sm font-extrabold uppercase tracking-[0.14em] text-navy-950">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function ExecutiveReportPage({ params }: { params: { id: string } }) {
  const row = getScoredAccount(params.id);
  if (!row) notFound();
  const { account, score } = row;
  const briefing = generateBriefing(row);
  const detectedProducts = score.products.filter((p) => p.level !== "none");
  const r = account.readiness;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Screen-only toolbar */}
      <div className="print-hidden mb-6 flex items-center justify-between rounded-xl border border-[var(--hairline)] bg-white px-4 py-3">
        <Link
          href={`/accounts/${account.id}`}
          className="text-xs font-semibold text-emerald-700 hover:underline"
        >
          ← Back to {account.name}
        </Link>
        <PrintButton />
      </div>

      <article className="rounded-xl border border-[var(--hairline)] bg-white p-10 shadow-sm print:rounded-none print:border-0 print:p-0 print:shadow-none">
        {/* Cover */}
        <header className="border-b-4 border-emerald-600 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-950 text-sm font-extrabold text-white">
                T
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-navy-950">
                Tazkia Intelligence
              </span>
            </div>
            <p className="text-[11px] text-[var(--ink-muted)]">
              Confidential · Internal use only · {formatDate(new Date().toISOString())}
            </p>
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-navy-950">{account.name}</h1>
          <p className="mt-1 text-sm text-[var(--ink-secondary)]">
            Account intelligence &amp; engagement strategy · {account.industry} · {account.city},{" "}
            {account.country}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <PriorityBadge priority={score.priority} />
            <ConfidenceBadge band={score.salesforce.band} />
            <Badge tone="slate">Overall {score.overall}/100</Badge>
            <Badge tone="teal">AI opportunity {score.aiOpportunity.score}/100</Badge>
          </div>
        </header>

        {/* Company overview */}
        <ReportSection title="1 · Company overview">
          <p className="text-sm leading-relaxed text-[var(--ink-secondary)]">
            {briefing.companySummary}
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm md:grid-cols-4">
            {[
              ["Employees", formatEmployees(account.employees)],
              ["Est. revenue", formatRevenue(account.revenueEstimateUSD)],
              ["Growth", `${account.growthRatePct}% p.a.`],
              ["Ownership", account.ownership],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                  {label}
                </dt>
                <dd className="font-semibold text-navy-950">{value}</dd>
              </div>
            ))}
          </dl>
        </ReportSection>

        {/* Salesforce blueprint */}
        <ReportSection title="2 · Salesforce blueprint">
          <p className="text-sm text-[var(--ink-secondary)]">
            Salesforce confidence:{" "}
            <span className="font-bold text-navy-950">
              {score.salesforce.band} ({score.salesforce.score}/100)
            </span>{" "}
            from {score.salesforce.signalCount} evidence signal
            {score.salesforce.signalCount === 1 ? "" : "s"} across{" "}
            {score.salesforce.contributions.length} indicator categories.
          </p>
          {detectedProducts.length > 0 ? (
            <table className="mt-4 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--hairline)] text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                  <th className="py-2 pr-3">Product</th>
                  <th className="py-2 pr-3">Evidence level</th>
                  <th className="py-2">Key evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--hairline)]">
                {detectedProducts.map((p) => (
                  <tr key={p.product}>
                    <td className="py-2 pr-3 font-semibold text-navy-950">{p.product}</td>
                    <td className="py-2 pr-3">
                      <Badge tone={PRODUCT_LEVEL_TONES[p.level]} className="capitalize">
                        {p.level}
                      </Badge>
                    </td>
                    <td className="py-2 text-xs text-[var(--ink-secondary)]">
                      {p.evidence[0]?.title ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-3 text-sm text-[var(--ink-muted)]">
              No product-level evidence captured. Treat the platform landscape as open.
            </p>
          )}
        </ReportSection>

        {/* Technology assessment */}
        <ReportSection title="3 · Technology assessment">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                Known technology stack
              </p>
              <ul className="space-y-1.5">
                {account.techStack.map((t) => (
                  <li key={t.name} className="flex justify-between gap-2 text-[13px]">
                    <span className="font-medium text-navy-950">{t.name}</span>
                    <span className="text-[11px] text-[var(--ink-muted)]">{t.source}</span>
                  </li>
                ))}
              </ul>
              {account.consultingPartners.length > 0 && (
                <p className="mt-3 text-xs text-[var(--ink-secondary)]">
                  <span className="font-bold">Known partners:</span>{" "}
                  {account.consultingPartners.join(", ")}
                </p>
              )}
            </div>
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                Maturity estimates (0–100)
              </p>
              <div className="space-y-2">
                {[
                  ["CRM maturity", r.crmMaturity],
                  ["Data maturity", r.dataMaturity],
                  ["Service maturity", r.serviceMaturity],
                  ["Sales maturity", r.salesMaturity],
                  ["AI readiness", r.aiReadiness],
                  ["Slack readiness", r.slackReadiness],
                  ["Multilingual opportunity", r.multilingualOpportunity],
                  ["Digital transformation", r.digitalTransformationMaturity],
                ].map(([label, value]) => (
                  <div key={label as string} className="flex items-center gap-3">
                    <span className="w-44 shrink-0 text-xs font-medium text-[var(--ink-secondary)]">
                      {label}
                    </span>
                    <Meter value={value as number} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ReportSection>

        {/* Stakeholder map */}
        <ReportSection title="4 · Stakeholder map">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--hairline)] text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                <th className="py-2 pr-3">Name &amp; title</th>
                <th className="py-2 pr-3">Priority</th>
                <th className="py-2 pr-3">Influence</th>
                <th className="py-2">Outreach angle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {briefing.recommendedDecisionMakers.map((s) => (
                <tr key={s.id}>
                  <td className="py-2.5 pr-3">
                    <span className="block font-semibold text-navy-950">{s.name}</span>
                    <span className="block text-xs text-[var(--ink-muted)]">{s.title}</span>
                  </td>
                  <td className="py-2.5 pr-3 font-semibold tabular-nums">{s.relationshipPriority}</td>
                  <td className="py-2.5 pr-3 text-xs">{s.buyingInfluence}</td>
                  <td className="py-2.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
                    {s.outreachAngle}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ReportSection>

        {/* AI opportunity assessment */}
        <ReportSection title="5 · AI opportunity assessment">
          <p className="text-sm text-[var(--ink-secondary)]">
            AI Opportunity Score:{" "}
            <span className="font-bold text-navy-950">{score.aiOpportunity.score}/100</span>
            {score.aiOpportunity.drivers.length > 0 && (
              <>
                {" "}
                — driven by{" "}
                {score.aiOpportunity.drivers.map((d) => d.label.toLowerCase()).join(", ")}.
              </>
            )}
          </p>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                Likely pain points
              </p>
              <ul className="list-disc space-y-1 pl-4 text-[13px] text-[var(--ink-secondary)]">
                {briefing.likelyPainPoints.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                Agentforce opportunities
              </p>
              <ul className="list-disc space-y-1 pl-4 text-[13px] text-[var(--ink-secondary)]">
                {briefing.agentforceOpportunities.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </ReportSection>

        {/* Engagement strategy */}
        <ReportSection title="6 · Recommended engagement strategy">
          <p className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 text-sm">
            <span className="font-bold text-navy-950">{score.nextAction.label}.</span>{" "}
            <span className="text-[var(--ink-secondary)]">{score.nextAction.rationale}</span>
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                Discovery workshop agenda
              </p>
              <ol className="list-decimal space-y-1 pl-4 text-[13px] text-[var(--ink-secondary)]">
                {briefing.discoveryWorkshopAgenda.map((a) => (
                  <li key={a.item}>
                    {a.item} <span className="text-[var(--ink-muted)]">({a.duration})</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                Pilot programme
              </p>
              <p className="text-[13px] font-semibold text-navy-950">
                {briefing.pilotProgramme.name}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--ink-secondary)]">
                {briefing.pilotProgramme.scope}
              </p>
              <p className="mt-1 text-xs text-[var(--ink-muted)]">
                {briefing.pilotProgramme.duration}
              </p>
            </div>
          </div>
        </ReportSection>

        <footer className="mt-10 border-t border-[var(--hairline)] pt-4 text-[10px] leading-relaxed text-[var(--ink-muted)]">
          Prepared by the Tazkia Account Intelligence Platform. Scores are evidence-weighted
          estimates from public and authorised sources and should be validated in discovery.
          This report contains demonstration data.
        </footer>
      </article>
    </div>
  );
}
