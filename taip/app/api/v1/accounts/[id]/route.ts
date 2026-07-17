import type { NextRequest } from "next/server";
import { apiError, json, requireSession } from "@/lib/api";
import { getScoredAccount } from "@/modules/accounts/service";
import { updateAccount } from "@/modules/accounts/repository";
import { PIPELINE_STAGES } from "@/modules/core/taxonomy";

/** GET /api/v1/accounts/:id — full intelligence record with computed scores. */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireSession(req, "accounts:read");
  if ("response" in auth) return auth.response;

  const row = getScoredAccount(params.id);
  if (!row) return apiError(404, "Account not found.");
  return json(row);
}

/** PATCH /api/v1/accounts/:id — update workflow fields (stage, owner, follow-up). */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireSession(req, "accounts:update");
  if ("response" in auth) return auth.response;

  let body: {
    pipelineStage?: string;
    nextFollowUpAt?: string | null;
    markResearched?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return apiError(400, "Invalid JSON body.");
  }

  const patch: Parameters<typeof updateAccount>[1] = {};
  if (body.pipelineStage !== undefined) {
    if (!(PIPELINE_STAGES as readonly string[]).includes(body.pipelineStage)) {
      return apiError(400, "Invalid pipelineStage.");
    }
    patch.pipelineStage = body.pipelineStage as (typeof PIPELINE_STAGES)[number];
  }
  if (body.nextFollowUpAt !== undefined) {
    if (body.nextFollowUpAt !== null && Number.isNaN(Date.parse(body.nextFollowUpAt))) {
      return apiError(400, "Invalid nextFollowUpAt date.");
    }
    patch.nextFollowUpAt = body.nextFollowUpAt ?? undefined;
  }
  if (body.markResearched) {
    patch.lastResearchedAt = new Date().toISOString().slice(0, 10);
  }

  const account = updateAccount(params.id, patch);
  if (!account) return apiError(404, "Account not found.");
  return json(getScoredAccount(params.id));
}
