import { isFutureMarket, type ConfidenceBand, type Country, type Industry, type PipelineStage, type PriorityLevel } from "@/modules/core/taxonomy";
import { computeAccountScore, type AccountScore } from "@/modules/scoring/engine";
import { findAllAccounts, findAccountById } from "./repository";
import type { Account } from "./types";

/** An account joined with its computed scores — the shape most of the UI and API serve. */
export interface ScoredAccount {
  account: Account;
  score: AccountScore;
}

export interface AccountFilters {
  q?: string;
  country?: Country;
  industry?: Industry;
  /** Minimum revenue in USD millions. */
  minRevenue?: number;
  /** Minimum employee count. */
  minEmployees?: number;
  confidence?: ConfidenceBand;
  /** Minimum AI opportunity score. */
  minAiOpportunity?: number;
  slack?: boolean;
  /** Minimum AI readiness dimension estimate. */
  minAiReadiness?: number;
  priority?: PriorityLevel;
  stage?: PipelineStage;
  tag?: string;
  sort?: "overall" | "aiOpportunity" | "salesforce" | "name" | "recent";
}

export function getScoredAccount(id: string): ScoredAccount | undefined {
  const account = findAccountById(id);
  if (!account) return undefined;
  return { account, score: computeAccountScore(account) };
}

export function listScoredAccounts(filters: AccountFilters = {}): ScoredAccount[] {
  let rows: ScoredAccount[] = findAllAccounts().map((account) => ({
    account,
    score: computeAccountScore(account),
  }));

  const {
    q,
    country,
    industry,
    minRevenue,
    minEmployees,
    confidence,
    minAiOpportunity,
    slack,
    minAiReadiness,
    priority,
    stage,
    tag,
  } = filters;

  if (q) {
    const needle = q.toLowerCase();
    rows = rows.filter(
      ({ account: a }) =>
        a.name.toLowerCase().includes(needle) ||
        a.city.toLowerCase().includes(needle) ||
        a.industry.toLowerCase().includes(needle) ||
        a.description.toLowerCase().includes(needle) ||
        a.tags.some((t) => t.includes(needle)),
    );
  }
  if (country) rows = rows.filter(({ account: a }) => a.country === country);
  if (industry) rows = rows.filter(({ account: a }) => a.industry === industry);
  if (minRevenue !== undefined)
    rows = rows.filter(({ account: a }) => a.revenueEstimateUSD >= minRevenue);
  if (minEmployees !== undefined)
    rows = rows.filter(({ account: a }) => a.employees >= minEmployees);
  if (confidence)
    rows = rows.filter(({ score }) => score.salesforce.band === confidence);
  if (minAiOpportunity !== undefined)
    rows = rows.filter(({ score }) => score.aiOpportunity.score >= minAiOpportunity);
  if (slack)
    rows = rows.filter(
      ({ account: a, score }) =>
        score.products.some((p) => p.product === "Slack" && p.level !== "none") ||
        a.techStack.some((t) => t.name.toLowerCase() === "slack"),
    );
  if (minAiReadiness !== undefined)
    rows = rows.filter(({ account: a }) => a.readiness.aiReadiness >= minAiReadiness);
  if (priority) rows = rows.filter(({ score }) => score.priority === priority);
  if (stage) rows = rows.filter(({ account: a }) => a.pipelineStage === stage);
  if (tag) rows = rows.filter(({ account: a }) => a.tags.includes(tag));

  const sort = filters.sort ?? "overall";
  rows.sort((a, b) => {
    switch (sort) {
      case "name":
        return a.account.name.localeCompare(b.account.name);
      case "aiOpportunity":
        return b.score.aiOpportunity.score - a.score.aiOpportunity.score;
      case "salesforce":
        return b.score.salesforce.score - a.score.salesforce.score;
      case "recent":
        return (
          new Date(b.account.lastResearchedAt).getTime() -
          new Date(a.account.lastResearchedAt).getTime()
        );
      default:
        return b.score.overall - a.score.overall;
    }
  });

  return rows;
}

/** Aggregations behind the executive dashboard. */
export interface DashboardSummary {
  totals: {
    targetAccounts: number;
    highPriority: number;
    salesforceConfirmed: number;
    salesforceSuspected: number;
    aiReady: number;
    needingFollowUp: number;
  };
  recentlyResearched: ScoredAccount[];
  followUps: ScoredAccount[];
  topOpportunities: ScoredAccount[];
  pipeline: { stage: PipelineStage; count: number }[];
  byIndustry: { industry: Industry; count: number }[];
  byCountry: { country: Country; count: number; future: boolean }[];
  confidenceBands: { band: ConfidenceBand; count: number }[];
}

export function getDashboardSummary(): DashboardSummary {
  const rows = listScoredAccounts();
  const now = Date.now();

  const needsFollowUp = rows.filter(
    ({ account }) =>
      account.nextFollowUpAt && new Date(account.nextFollowUpAt).getTime() <= now,
  );

  const countBy = <K extends string>(pick: (r: ScoredAccount) => K): Map<K, number> => {
    const map = new Map<K, number>();
    rows.forEach((r) => {
      const key = pick(r);
      map.set(key, (map.get(key) ?? 0) + 1);
    });
    return map;
  };

  const industryCounts = countBy(({ account }) => account.industry);
  const countryCounts = countBy(({ account }) => account.country);
  const stageCounts = countBy(({ account }) => account.pipelineStage);
  const bandCounts = countBy(({ score }) => score.salesforce.band);

  return {
    totals: {
      targetAccounts: rows.length,
      highPriority: rows.filter(({ score }) =>
        ["P1 Strategic", "P2 High"].includes(score.priority),
      ).length,
      salesforceConfirmed: bandCounts.get("Confirmed") ?? 0,
      salesforceSuspected:
        (bandCounts.get("Highly likely") ?? 0) + (bandCounts.get("Possible") ?? 0),
      aiReady: rows.filter(({ score }) => score.aiOpportunity.score >= 65).length,
      needingFollowUp: needsFollowUp.length,
    },
    recentlyResearched: listScoredAccounts({ sort: "recent" }).slice(0, 6),
    followUps: needsFollowUp.slice(0, 6),
    topOpportunities: rows.slice(0, 6),
    pipeline: Array.from(stageCounts, ([stage, count]) => ({ stage, count })),
    byIndustry: Array.from(industryCounts, ([industry, count]) => ({ industry, count })).sort(
      (a, b) => b.count - a.count,
    ),
    byCountry: Array.from(countryCounts, ([country, count]) => ({
      country,
      count,
      future: isFutureMarket(country),
    })).sort((a, b) => b.count - a.count),
    confidenceBands: (
      ["Confirmed", "Highly likely", "Possible", "Unknown"] as ConfidenceBand[]
    ).map((band) => ({ band, count: bandCounts.get(band) ?? 0 })),
  };
}
