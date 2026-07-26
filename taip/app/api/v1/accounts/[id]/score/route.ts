import type { NextRequest } from "next/server";
import { apiError, json, requireSession } from "@/lib/api";
import { getScoredAccount } from "@/modules/accounts/service";

/** GET /api/v1/accounts/:id/score — the full scoring breakdown only. */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireSession(req, "accounts:read");
  if ("response" in auth) return auth.response;

  const row = getScoredAccount(params.id);
  if (!row) return apiError(404, "Account not found.");
  return json(row.score);
}
