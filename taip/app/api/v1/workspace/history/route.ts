import type { NextRequest } from "next/server";
import { json, requireSession } from "@/lib/api";
import { getSearchHistory } from "@/modules/workspace/service";

/** GET /api/v1/workspace/history — the user's recent searches. */
export async function GET(req: NextRequest) {
  const auth = await requireSession(req);
  if ("response" in auth) return auth.response;
  return json({ history: getSearchHistory(auth.session.userId) });
}
