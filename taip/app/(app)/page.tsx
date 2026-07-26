import Link from "next/link";
import type { Metadata } from "next";
import BarChart from "@/components/charts/BarChart";
import DonutChart from "@/components/charts/DonutChart";
import {
  Card,
  CompanyMark,
  ConfidenceBadge,
  PriorityBadge,
  SectionTitle,
  StatCard,
} from "@/components/ui/primitives";
import { getDashboardSummary, type ScoredAccount } from "@/modules/accounts/service";
import { PIPELINE_STAGE_LABELS } from "@/modules/core/taxonomy";
import { formatDate, relativeDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

const SERIES = [
  "var(--series-1)",
  "var(--series-2)",
  "var(--series-3)",
  "var(--series-4)",
  "var(--series-5)",
  "var(--series-6)",
];

function AccountRow({ row, meta }: { row: ScoredAccount; meta?: React.ReactNode }) {
  const { account, score } = row;
  return (
    <li>
      <Link
        href={`/accounts/${account.id}`}
        className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-emerald-50/60"
      >
        <CompanyMark name={account.name} size="sm" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold text-navy-950">
            {account.name}
          </span>
          <span className="block truncate text-[11px] text-[var(--ink-muted)]">
            {account.industry} · {account.country}
          </span>
        </span>
        {meta ?? (
          <span className="flex items-center gap-2">
            <ConfidenceBadge band={score.salesforce.band} />
            <span className="w-7 text-right text-sm font-bold tabular-nums text-navy-950">
              {score.overall}
            </span>
          </span>
        )}
      </Link>
    </li>
  );
}

export default function DashboardPage() {
  const summary = getDashboardSummary();
  const { totals } = summary;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-navy-950">Executive Dashboard</h1>
          <p className="mt-0.5 text-sm text-[var(--ink-muted)]">
            Portfolio view of Salesforce &amp; Agentforce opportunity across the GCC.
          </p>
        </div>
        <Link
          href="/accounts"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Search accounts
        </Link>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Target accounts" value={totals.targetAccounts} href="/accounts" />
        <StatCard
          label="High priority"
          value={totals.highPriority}
          hint="P1 + P2 rated"
          href="/accounts?priority=P1+Strategic"
          accent
        />
        <StatCard
          label="Salesforce confirmed"
          value={totals.salesforceConfirmed}
          href="/accounts?confidence=Confirmed"
        />
        <StatCard
          label="Salesforce suspected"
          value={totals.salesforceSuspected}
          hint="Highly likely + possible"
          href="/accounts?confidence=Highly+likely"
        />
        <StatCard
          label="AI-ready"
          value={totals.aiReady}
          hint="AI opportunity ≥ 65"
          href="/accounts?minAiOpportunity=65"
        />
        <StatCard
          label="Needs follow-up"
          value={totals.needingFollowUp}
          hint={totals.needingFollowUp > 0 ? "Action overdue" : "All up to date"}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Top opportunities */}
        <Card className="lg:col-span-2">
          <SectionTitle
            title="Top opportunities"
            hint="Ranked by overall account score"
            action={
              <Link href="/accounts" className="text-xs font-semibold text-emerald-700 hover:underline">
                View all →
              </Link>
            }
          />
          <ul className="divide-y divide-[var(--hairline)]">
            {summary.topOpportunities.map((row) => (
              <AccountRow
                key={row.account.id}
                row={row}
                meta={
                  <span className="flex items-center gap-2">
                    <PriorityBadge priority={row.score.priority} />
                    <ConfidenceBadge band={row.score.salesforce.band} />
                    <span className="w-7 text-right text-sm font-bold tabular-nums text-navy-950">
                      {row.score.overall}
                    </span>
                  </span>
                }
              />
            ))}
          </ul>
        </Card>

        {/* Salesforce confidence distribution */}
        <Card>
          <SectionTitle title="Salesforce confidence" hint="Across the tracked portfolio" />
          <DonutChart
            centreLabel="Accounts"
            slices={summary.confidenceBands.map((b, i) => ({
              label: b.band,
              value: b.count,
              color: SERIES[i]!,
            }))}
          />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Pipeline */}
        <Card>
          <SectionTitle title="Pipeline status" hint="Accounts by research stage" />
          <BarChart
            bars={(
              [
                "identified",
                "researching",
                "qualified",
                "outreach_planned",
                "engaged",
                "opportunity",
                "on_hold",
              ] as const
            ).map((stage) => ({
              label: PIPELINE_STAGE_LABELS[stage],
              value: summary.pipeline.find((p) => p.stage === stage)?.count ?? 0,
              color: "var(--series-4)",
            }))}
          />
        </Card>

        {/* Industry breakdown */}
        <Card>
          <SectionTitle title="Industry breakdown" />
          <BarChart
            bars={summary.byIndustry.map((row) => ({
              label: row.industry,
              value: row.count,
              color: "var(--series-1)",
            }))}
          />
        </Card>

        {/* Country breakdown */}
        <Card>
          <SectionTitle title="Country breakdown" hint="Future markets marked ◇" />
          <BarChart
            bars={summary.byCountry.map((row) => ({
              label: row.future ? `${row.country} ◇` : row.country,
              value: row.count,
              color: row.future ? "var(--series-5)" : "var(--series-3)",
            }))}
          />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recently researched */}
        <Card>
          <SectionTitle title="Recently researched" hint="Latest intelligence updates" />
          <ul className="divide-y divide-[var(--hairline)]">
            {summary.recentlyResearched.map((row) => (
              <AccountRow
                key={row.account.id}
                row={row}
                meta={
                  <span className="text-xs font-medium text-[var(--ink-muted)]">
                    {relativeDate(row.account.lastResearchedAt)}
                  </span>
                }
              />
            ))}
          </ul>
        </Card>

        {/* Follow-ups */}
        <Card>
          <SectionTitle title="Accounts needing follow-up" hint="Scheduled follow-up date reached" />
          {summary.followUps.length === 0 ? (
            <p className="py-8 text-center text-sm text-[var(--ink-muted)]">
              Nothing overdue — all follow-ups are scheduled ahead.
            </p>
          ) : (
            <ul className="divide-y divide-[var(--hairline)]">
              {summary.followUps.map((row) => (
                <AccountRow
                  key={row.account.id}
                  row={row}
                  meta={
                    <span className="text-xs font-semibold text-red-700">
                      due {formatDate(row.account.nextFollowUpAt!)}
                    </span>
                  }
                />
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
