import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import FilterBar from "./FilterBar";
import {
  Badge,
  CompanyMark,
  ConfidenceBadge,
  EmptyState,
  Meter,
  PriorityBadge,
} from "@/components/ui/primitives";
import { listScoredAccounts } from "@/modules/accounts/service";
import { describeFilters, parseAccountFilters } from "@/lib/api";
import { getSession } from "@/modules/auth/service";
import { recordSearch } from "@/modules/workspace/service";
import { formatEmployees, formatRevenue, isOverdue, relativeDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Accounts" };
export const dynamic = "force-dynamic";

export default async function AccountsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = new URLSearchParams(
    Object.entries(searchParams).flatMap(([k, v]) =>
      typeof v === "string" ? [[k, v] as [string, string]] : [],
    ),
  );
  const filters = parseAccountFilters(params);
  const rows = listScoredAccounts(filters);

  // Log meaningful searches to the user's history (server-rendered path).
  const session = await getSession();
  if (session && Object.keys(filters).some((k) => k !== "sort")) {
    recordSearch(session.userId, describeFilters(filters), Object.fromEntries(params));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-navy-950">Accounts</h1>
          <p className="mt-0.5 text-sm text-[var(--ink-muted)]">
            {rows.length} account{rows.length === 1 ? "" : "s"} · {describeFilters(filters)}
          </p>
        </div>
      </div>

      <Suspense>
        <FilterBar />
      </Suspense>

      {rows.length === 0 ? (
        <EmptyState
          title="No accounts match these filters"
          hint="Broaden the filters or clear them to see the full portfolio."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--hairline)] bg-white shadow-sm shadow-navy-950/[0.03]">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--hairline)] text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                <th className="px-4 py-3">Account</th>
                <th className="px-3 py-3">Country</th>
                <th className="px-3 py-3 text-right">Employees</th>
                <th className="px-3 py-3 text-right">Est. revenue</th>
                <th className="px-3 py-3">Salesforce</th>
                <th className="px-3 py-3">AI opportunity</th>
                <th className="px-3 py-3 text-right">Overall</th>
                <th className="px-3 py-3">Priority</th>
                <th className="px-4 py-3">Researched</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {rows.map(({ account, score }) => (
                <tr key={account.id} className="group transition-colors hover:bg-emerald-50/40">
                  <td className="px-4 py-3">
                    <Link href={`/accounts/${account.id}`} className="flex items-center gap-3">
                      <CompanyMark name={account.name} size="sm" />
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-navy-950 group-hover:text-emerald-700">
                          {account.name}
                        </span>
                        <span className="block truncate text-[11px] text-[var(--ink-muted)]">
                          {account.industry}
                          {account.tags.slice(0, 2).map((t) => (
                            <span key={t} className="ml-1.5 text-teal-700">
                              #{t}
                            </span>
                          ))}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-[13px] text-[var(--ink-secondary)]">
                    {account.country}
                  </td>
                  <td className="px-3 py-3 text-right text-[13px] tabular-nums text-[var(--ink-secondary)]">
                    {formatEmployees(account.employees)}
                  </td>
                  <td className="px-3 py-3 text-right text-[13px] tabular-nums text-[var(--ink-secondary)]">
                    {formatRevenue(account.revenueEstimateUSD)}
                  </td>
                  <td className="px-3 py-3">
                    <span className="flex items-center gap-1.5">
                      <ConfidenceBadge band={score.salesforce.band} />
                      <span className="text-xs font-semibold tabular-nums text-[var(--ink-muted)]">
                        {score.salesforce.score}
                      </span>
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <Meter value={score.aiOpportunity.score} color="var(--series-4)" />
                  </td>
                  <td className="px-3 py-3 text-right text-base font-extrabold tabular-nums text-navy-950">
                    {score.overall}
                  </td>
                  <td className="px-3 py-3">
                    <PriorityBadge priority={score.priority} />
                  </td>
                  <td className="px-4 py-3">
                    <span className="block text-xs text-[var(--ink-secondary)]">
                      {relativeDate(account.lastResearchedAt)}
                    </span>
                    {isOverdue(account.nextFollowUpAt) && (
                      <Badge tone="red" className="mt-1">
                        Follow-up due
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
