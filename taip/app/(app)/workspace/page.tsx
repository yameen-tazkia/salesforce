import Link from "next/link";
import type { Metadata } from "next";
import {
  Card,
  CompanyMark,
  ConfidenceBadge,
  EmptyState,
  PriorityBadge,
  SectionTitle,
} from "@/components/ui/primitives";
import { getScoredAccount } from "@/modules/accounts/service";
import { getSession } from "@/modules/auth/service";
import { getSavedAccountIds, getSearchHistory } from "@/modules/workspace/service";
import { relativeDate } from "@/lib/utils";

export const metadata: Metadata = { title: "My Workspace" };
export const dynamic = "force-dynamic";

export default async function WorkspacePage() {
  const session = (await getSession())!;
  const saved = getSavedAccountIds(session.userId)
    .map((id) => getScoredAccount(id))
    .filter((row): row is NonNullable<typeof row> => !!row);
  const history = getSearchHistory(session.userId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-navy-950">My Workspace</h1>
        <p className="mt-0.5 text-sm text-[var(--ink-muted)]">
          Your saved accounts and recent research activity, {session.name.split(" ")[0]}.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionTitle
            title="Saved accounts"
            hint="Pinned from account profiles"
            action={
              <Link href="/accounts" className="text-xs font-semibold text-emerald-700 hover:underline">
                Browse accounts →
              </Link>
            }
          />
          {saved.length === 0 ? (
            <EmptyState
              title="No saved accounts yet"
              hint="Open an account profile and press “Save account” to pin it here."
            />
          ) : (
            <ul className="divide-y divide-[var(--hairline)]">
              {saved.map(({ account, score }) => (
                <li key={account.id}>
                  <Link
                    href={`/accounts/${account.id}`}
                    className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-emerald-50/60"
                  >
                    <CompanyMark name={account.name} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-navy-950">
                        {account.name}
                      </span>
                      <span className="block truncate text-[11px] text-[var(--ink-muted)]">
                        {account.industry} · {account.country} · researched{" "}
                        {relativeDate(account.lastResearchedAt)}
                      </span>
                    </span>
                    <PriorityBadge priority={score.priority} />
                    <ConfidenceBadge band={score.salesforce.band} />
                    <span className="w-7 text-right text-sm font-bold tabular-nums text-navy-950">
                      {score.overall}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <SectionTitle title="Search history" hint="Your latest account searches" />
          {history.length === 0 ? (
            <EmptyState
              title="No searches yet"
              hint="Filtered searches on the Accounts page are recorded here."
            />
          ) : (
            <ul className="space-y-1">
              {history.slice(0, 15).map((entry) => (
                <li key={entry.id}>
                  <Link
                    href={`/accounts?${new URLSearchParams(entry.query).toString()}`}
                    className="block rounded-lg px-2.5 py-2 transition-colors hover:bg-emerald-50/60"
                  >
                    <span className="block truncate text-[13px] font-medium text-navy-950">
                      {entry.summary}
                    </span>
                    <span className="block text-[11px] text-[var(--ink-muted)]">
                      {relativeDate(entry.at)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
