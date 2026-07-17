import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Badge,
  CompanyMark,
  ConfidenceBadge,
  PriorityBadge,
  ScoreRing,
} from "@/components/ui/primitives";
import { getScoredAccount } from "@/modules/accounts/service";
import { generateBriefing } from "@/modules/outreach/briefing";
import { getSession } from "@/modules/auth/service";
import { getSavedAccountIds } from "@/modules/workspace/service";
import { hasPermission } from "@/modules/auth/rbac";
import { formatEmployees, formatRevenue, isOverdue, relativeDate } from "@/lib/utils";
import ProfileTabs from "./ProfileTabs";
import SaveButton from "./SaveButton";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const row = getScoredAccount(params.id);
  return { title: row ? row.account.name : "Account" };
}

export default async function AccountProfilePage({ params }: { params: { id: string } }) {
  const row = getScoredAccount(params.id);
  if (!row) notFound();
  const { account, score } = row;
  const briefing = generateBriefing(row);

  const session = await getSession();
  const saved = session ? getSavedAccountIds(session.userId).includes(account.id) : false;
  const canEdit = session ? hasPermission(session.role, "accounts:update") : false;

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="text-xs text-[var(--ink-muted)]">
        <Link href="/accounts" className="font-semibold text-emerald-700 hover:underline">
          Accounts
        </Link>
        <span className="mx-1.5">/</span>
        <span>{account.name}</span>
      </nav>

      {/* Header */}
      <div className="rounded-xl border border-[var(--hairline)] bg-white p-6 shadow-sm shadow-navy-950/[0.03]">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex min-w-0 items-start gap-4">
            <CompanyMark name={account.name} size="lg" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-navy-950">{account.name}</h1>
                <PriorityBadge priority={score.priority} />
                <ConfidenceBadge band={score.salesforce.band} />
              </div>
              <p className="mt-1 text-sm text-[var(--ink-secondary)]">
                {account.industry}
                {account.subIndustry ? ` · ${account.subIndustry}` : ""} · {account.city},{" "}
                {account.country} · {account.ownership}
              </p>
              <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--ink-muted)]">
                <span>{formatEmployees(account.employees)} employees</span>
                <span>{formatRevenue(account.revenueEstimateUSD)} est. revenue</span>
                <span>{account.growthRatePct}% growth</span>
                <a
                  href={account.website}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  Website ↗
                </a>
                <span>Researched {relativeDate(account.lastResearchedAt)}</span>
                {account.ownerName && <span>Owner: {account.ownerName}</span>}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {account.tags.map((tag) => (
                  <Badge key={tag} tone="teal">
                    #{tag}
                  </Badge>
                ))}
                {isOverdue(account.nextFollowUpAt) && <Badge tone="red">Follow-up overdue</Badge>}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex gap-5">
              <div className="text-center">
                <ScoreRing value={score.overall} size={72} color="var(--series-1)" />
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[var(--ink-muted)]">
                  Overall
                </p>
              </div>
              <div className="text-center">
                <ScoreRing value={score.salesforce.score} size={72} color="var(--series-3)" />
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[var(--ink-muted)]">
                  Salesforce
                </p>
              </div>
              <div className="text-center">
                <ScoreRing value={score.aiOpportunity.score} size={72} color="var(--series-4)" />
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[var(--ink-muted)]">
                  AI opp.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <SaveButton accountId={account.id} initialSaved={saved} />
              <Link
                href={`/accounts/${account.id}/report`}
                className="rounded-lg bg-navy-950 px-3.5 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-navy-800"
              >
                Executive report
              </Link>
            </div>
          </div>
        </div>

        {/* Next action banner */}
        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50/70 px-4 py-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-800">
            Recommended next action
          </span>
          <span className="text-sm font-semibold text-navy-950">{score.nextAction.label}</span>
          <span className="text-xs text-[var(--ink-secondary)]">{score.nextAction.rationale}</span>
        </div>
      </div>

      <ProfileTabs
        account={account}
        score={score}
        briefing={briefing}
        canEdit={canEdit}
      />
    </div>
  );
}
