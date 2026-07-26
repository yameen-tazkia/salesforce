import type { NextRequest } from "next/server";
import { apiError, json, requireSession } from "@/lib/api";
import { getAdapter } from "@/modules/enrichment/providers";

/**
 * POST /api/v1/enrichment/domain-search — run an authorised provider's
 * domain search. Body: { provider: "hunter", domain: "example.com" }.
 */
export async function POST(req: NextRequest) {
  const auth = await requireSession(req, "enrichment:run");
  if ("response" in auth) return auth.response;

  let body: { provider?: string; domain?: string };
  try {
    body = await req.json();
  } catch {
    return apiError(400, "Invalid JSON body.");
  }
  if (!body.provider || !body.domain) {
    return apiError(400, "provider and domain are required.");
  }
  const domain = body.domain.trim().toLowerCase();
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) {
    return apiError(400, "Invalid domain.");
  }

  const adapter = getAdapter(body.provider);
  if (!adapter) return apiError(404, "Unknown provider.");
  if (!adapter.domainSearch) {
    return apiError(400, `${adapter.info().name} does not support domain search via API yet.`);
  }
  try {
    return json(await adapter.domainSearch(domain));
  } catch (err) {
    return apiError(502, err instanceof Error ? err.message : "Enrichment provider error.");
  }
}
