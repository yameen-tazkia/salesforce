import type { NextRequest } from "next/server";
import { json, requireSession } from "@/lib/api";
import { listProviders } from "@/modules/enrichment/providers";

/** GET /api/v1/enrichment/providers — registered enrichment integrations. */
export async function GET(req: NextRequest) {
  const auth = await requireSession(req);
  if ("response" in auth) return auth.response;
  return json({ providers: listProviders() });
}
