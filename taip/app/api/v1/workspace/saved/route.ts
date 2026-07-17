import type { NextRequest } from "next/server";
import { apiError, json, requireSession } from "@/lib/api";
import { getSavedAccountIds, saveAccount, unsaveAccount } from "@/modules/workspace/service";

/** GET/POST/DELETE /api/v1/workspace/saved — the user's saved accounts. */

export async function GET(req: NextRequest) {
  const auth = await requireSession(req);
  if ("response" in auth) return auth.response;
  return json({ accountIds: getSavedAccountIds(auth.session.userId) });
}

async function parseAccountId(req: NextRequest): Promise<string | null> {
  try {
    const body = (await req.json()) as { accountId?: string };
    return body.accountId?.trim() || null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireSession(req);
  if ("response" in auth) return auth.response;
  const accountId = await parseAccountId(req);
  if (!accountId) return apiError(400, "accountId is required.");
  return json({ accountIds: saveAccount(auth.session.userId, accountId) });
}

export async function DELETE(req: NextRequest) {
  const auth = await requireSession(req);
  if ("response" in auth) return auth.response;
  const accountId = await parseAccountId(req);
  if (!accountId) return apiError(400, "accountId is required.");
  return json({ accountIds: unsaveAccount(auth.session.userId, accountId) });
}
