import type { NextRequest } from "next/server";
import { describeFilters, json, parseAccountFilters, requireSession } from "@/lib/api";
import { listScoredAccounts } from "@/modules/accounts/service";
import { recordSearch } from "@/modules/workspace/service";

/**
 * GET /api/v1/accounts — filtered, scored account list.
 * Query params: q, country, industry, minRevenue, minEmployees, confidence,
 * minAiOpportunity, slack, minAiReadiness, priority, stage, tag, sort.
 */
export async function GET(req: NextRequest) {
  const auth = await requireSession(req, "accounts:read");
  if ("response" in auth) return auth.response;

  const filters = parseAccountFilters(req.nextUrl.searchParams);
  const rows = listScoredAccounts(filters);

  // Log meaningful searches (any active filter) to the user's history.
  if (Object.keys(filters).some((k) => k !== "sort")) {
    recordSearch(
      auth.session.userId,
      describeFilters(filters),
      Object.fromEntries(req.nextUrl.searchParams),
    );
  }

  return json({
    count: rows.length,
    accounts: rows.map(({ account, score }) => ({
      id: account.id,
      name: account.name,
      country: account.country,
      city: account.city,
      industry: account.industry,
      employees: account.employees,
      revenueEstimateUSD: account.revenueEstimateUSD,
      growthRatePct: account.growthRatePct,
      pipelineStage: account.pipelineStage,
      ownerName: account.ownerName,
      tags: account.tags,
      lastResearchedAt: account.lastResearchedAt,
      nextFollowUpAt: account.nextFollowUpAt,
      score: {
        overall: score.overall,
        priority: score.priority,
        salesforce: { score: score.salesforce.score, band: score.salesforce.band },
        aiOpportunity: score.aiOpportunity.score,
        nextAction: score.nextAction.label,
      },
    })),
  });
}
