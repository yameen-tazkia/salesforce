import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Badge, Card, SectionTitle } from "@/components/ui/primitives";
import { getSession } from "@/modules/auth/service";
import { getStore } from "@/lib/store";
import { ROLE_LABELS } from "@/modules/auth/rbac";
import {
  ACCOUNT_CRITERIA,
  CONFIDENCE_BANDS,
  OVERALL_BLEND,
  SIGNAL_WEIGHTS,
} from "@/modules/scoring/weights";
import { SIGNAL_TYPE_LABELS, type SignalType } from "@/modules/core/taxonomy";

export const metadata: Metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();
  if (!session || session.role !== "admin") redirect("/");

  const users = getStore().users;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-navy-950">Administration</h1>
        <p className="mt-0.5 text-sm text-[var(--ink-muted)]">
          Users, roles and scoring configuration. Weights live in{" "}
          <code className="rounded bg-navy-50 px-1 py-0.5 text-[11px]">modules/scoring/weights.ts</code>{" "}
          and are surfaced here for transparency.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionTitle title="Users & roles" hint="Replace with SSO/OIDC in production" />
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--hairline)] text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="py-2.5 pr-3">
                    <span className="block font-semibold text-navy-950">{u.name}</span>
                    <span className="block text-[11px] text-[var(--ink-muted)]">{u.title}</span>
                  </td>
                  <td className="py-2.5 pr-3 text-xs text-[var(--ink-secondary)]">{u.email}</td>
                  <td className="py-2.5">
                    <Badge tone={u.role === "admin" ? "navy" : u.role === "consultant" ? "emerald" : u.role === "analyst" ? "teal" : "slate"}>
                      {ROLE_LABELS[u.role]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 rounded-lg bg-navy-50 p-3 text-[11px] leading-relaxed text-[var(--ink-secondary)]">
            <p className="font-bold text-navy-950">Role capabilities</p>
            <p className="mt-1">
              <span className="font-semibold">Admin</span> — everything incl. scoring config &amp; users ·{" "}
              <span className="font-semibold">Consultant</span> — research, notes, tags, reports, enrichment ·{" "}
              <span className="font-semibold">Analyst</span> — research &amp; enrichment, no report export ·{" "}
              <span className="font-semibold">Viewer</span> — read-only.
            </p>
          </div>
        </Card>

        <Card>
          <SectionTitle
            title="Overall score blend"
            hint="How component scores combine into the Overall Account Score"
          />
          <ul className="space-y-2">
            {(
              [
                ["Salesforce confidence", OVERALL_BLEND.salesforceConfidence],
                ["AI opportunity", OVERALL_BLEND.aiOpportunity],
                ["Firmographic fit", OVERALL_BLEND.firmographicFit],
                ["Engagement & recency", OVERALL_BLEND.engagement],
              ] as const
            ).map(([label, weight]) => (
              <li key={label} className="flex items-center gap-3">
                <span className="w-44 shrink-0 text-[13px] font-medium text-[var(--ink-secondary)]">
                  {label}
                </span>
                <div className="h-2 flex-1 rounded-r bg-navy-50">
                  <div
                    className="h-full rounded-r bg-emerald-600"
                    style={{ width: `${weight * 100}%` }}
                  />
                </div>
                <span className="w-10 text-right text-xs font-bold tabular-nums text-navy-950">
                  {Math.round(weight * 100)}%
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <SectionTitle title="Confidence bands" />
            <p className="text-[13px] leading-relaxed text-[var(--ink-secondary)]">
              <Badge tone="emerald">Confirmed</Badge> ≥ {CONFIDENCE_BANDS.confirmed} + conclusive
              strong signal · <Badge tone="teal">Highly likely</Badge> ≥{" "}
              {CONFIDENCE_BANDS.highlyLikely} · <Badge tone="gold">Possible</Badge> ≥{" "}
              {CONFIDENCE_BANDS.possible} · <Badge tone="slate">Unknown</Badge> below.
            </p>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionTitle
            title="Salesforce indicator weights"
            hint="Base points at moderate strength; ×0.5 weak, ×1.5 strong, ×0.35 repeats"
          />
          <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {(Object.entries(SIGNAL_WEIGHTS) as [SignalType, number][])
              .sort((a, b) => b[1] - a[1])
              .map(([type, weight]) => (
                <li
                  key={type}
                  className="flex items-center justify-between gap-2 rounded-lg border border-[var(--hairline)] px-3 py-1.5 text-xs"
                >
                  <span className="font-medium text-[var(--ink-secondary)]">
                    {SIGNAL_TYPE_LABELS[type]}
                  </span>
                  <span className="font-bold tabular-nums text-navy-950">{weight}</span>
                </li>
              ))}
          </ul>
        </Card>

        <Card>
          <SectionTitle
            title="Account criteria points"
            hint="Named checks contributing to firmographic fit"
          />
          <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {ACCOUNT_CRITERIA.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between gap-2 rounded-lg border border-[var(--hairline)] px-3 py-1.5 text-xs"
              >
                <span className="font-medium text-[var(--ink-secondary)]">{c.label}</span>
                <span className="font-bold tabular-nums text-navy-950">{c.points}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
