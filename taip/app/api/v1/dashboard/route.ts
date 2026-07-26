import type { NextRequest } from "next/server";
import { json, requireSession } from "@/lib/api";
import { getDashboardSummary } from "@/modules/accounts/service";

/** GET /api/v1/dashboard — executive dashboard aggregates. */
export async function GET(req: NextRequest) {
  const auth = await requireSession(req, "accounts:read");
  if ("response" in auth) return auth.response;
  return json(getDashboardSummary());
}
