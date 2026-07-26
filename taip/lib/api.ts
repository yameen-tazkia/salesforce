import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken, type SessionPayload } from "@/modules/auth/session";
import { hasPermission, type Permission } from "@/modules/auth/rbac";
import type { AccountFilters } from "@/modules/accounts/service";
import { COUNTRIES, INDUSTRIES, PIPELINE_STAGES } from "@/modules/core/taxonomy";

/** Shared helpers for /api/v1 route handlers. */

export function json<T>(data: T, init?: ResponseInit): NextResponse {
  return NextResponse.json({ data }, init);
}

export function apiError(status: number, message: string): NextResponse {
  return NextResponse.json({ error: { status, message } }, { status });
}

export async function requireSession(
  req: NextRequest,
  permission?: Permission,
): Promise<{ session: SessionPayload } | { response: NextResponse }> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  if (!session) return { response: apiError(401, "Authentication required.") };
  if (permission && !hasPermission(session.role, permission)) {
    return { response: apiError(403, `Missing permission: ${permission}.`) };
  }
  return { session };
}

const CONFIDENCE_BANDS = ["Confirmed", "Highly likely", "Possible", "Unknown"] as const;
const PRIORITIES = ["P1 Strategic", "P2 High", "P3 Medium", "P4 Nurture"] as const;
const SORTS = ["overall", "aiOpportunity", "salesforce", "name", "recent"] as const;

/** Parses and validates account list filters from query params. */
export function parseAccountFilters(searchParams: URLSearchParams): AccountFilters {
  const filters: AccountFilters = {};
  const q = searchParams.get("q");
  if (q) filters.q = q.slice(0, 100);

  const country = searchParams.get("country");
  if (country && (COUNTRIES as readonly string[]).includes(country))
    filters.country = country as AccountFilters["country"];

  const industry = searchParams.get("industry");
  if (industry && (INDUSTRIES as readonly string[]).includes(industry))
    filters.industry = industry as AccountFilters["industry"];

  const num = (key: string): number | undefined => {
    const raw = searchParams.get(key);
    if (raw === null || raw === "") return undefined;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? n : undefined;
  };
  filters.minRevenue = num("minRevenue");
  filters.minEmployees = num("minEmployees");
  filters.minAiOpportunity = num("minAiOpportunity");
  filters.minAiReadiness = num("minAiReadiness");

  const confidence = searchParams.get("confidence");
  if (confidence && (CONFIDENCE_BANDS as readonly string[]).includes(confidence))
    filters.confidence = confidence as AccountFilters["confidence"];

  const priority = searchParams.get("priority");
  if (priority && (PRIORITIES as readonly string[]).includes(priority))
    filters.priority = priority as AccountFilters["priority"];

  const stage = searchParams.get("stage");
  if (stage && (PIPELINE_STAGES as readonly string[]).includes(stage))
    filters.stage = stage as AccountFilters["stage"];

  if (searchParams.get("slack") === "true") filters.slack = true;

  const tag = searchParams.get("tag");
  if (tag) filters.tag = tag.slice(0, 40);

  const sort = searchParams.get("sort");
  if (sort && (SORTS as readonly string[]).includes(sort))
    filters.sort = sort as AccountFilters["sort"];

  return filters;
}

/** Human-readable summary of active filters, used for search history. */
export function describeFilters(filters: AccountFilters): string {
  const parts: string[] = [];
  if (filters.q) parts.push(`"${filters.q}"`);
  if (filters.country) parts.push(filters.country);
  if (filters.industry) parts.push(filters.industry);
  if (filters.confidence) parts.push(`SF: ${filters.confidence}`);
  if (filters.priority) parts.push(filters.priority);
  if (filters.stage) parts.push(`stage: ${filters.stage}`);
  if (filters.minRevenue) parts.push(`rev ≥ $${filters.minRevenue}M`);
  if (filters.minEmployees) parts.push(`emp ≥ ${filters.minEmployees}`);
  if (filters.minAiOpportunity) parts.push(`AI opp ≥ ${filters.minAiOpportunity}`);
  if (filters.minAiReadiness) parts.push(`AI readiness ≥ ${filters.minAiReadiness}`);
  if (filters.slack) parts.push("Slack evidence");
  if (filters.tag) parts.push(`#${filters.tag}`);
  return parts.length ? parts.join(" · ") : "All accounts";
}
