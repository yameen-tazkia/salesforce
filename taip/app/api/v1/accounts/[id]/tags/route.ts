import type { NextRequest } from "next/server";
import { apiError, json, requireSession } from "@/lib/api";
import { addTag, removeTag } from "@/modules/accounts/repository";

/** POST /api/v1/accounts/:id/tags — add a tag. DELETE — remove a tag. */

async function parseTag(req: NextRequest): Promise<string | null> {
  try {
    const body = (await req.json()) as { tag?: string };
    return body.tag?.trim() || null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireSession(req, "tags:write");
  if ("response" in auth) return auth.response;

  const tag = await parseTag(req);
  if (!tag) return apiError(400, "tag is required.");
  const account = addTag(params.id, tag);
  if (!account) return apiError(404, "Account not found.");
  return json({ tags: account.tags });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireSession(req, "tags:write");
  if ("response" in auth) return auth.response;

  const tag = await parseTag(req);
  if (!tag) return apiError(400, "tag is required.");
  const account = removeTag(params.id, tag);
  if (!account) return apiError(404, "Account not found.");
  return json({ tags: account.tags });
}
