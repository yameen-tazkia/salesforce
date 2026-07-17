import type { NextRequest } from "next/server";
import { apiError, json, requireSession } from "@/lib/api";
import { addNote, findAccountById } from "@/modules/accounts/repository";
import { generateId } from "@/lib/utils";

/** POST /api/v1/accounts/:id/notes — append a research note. */
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireSession(req, "notes:write");
  if ("response" in auth) return auth.response;

  let body: { body?: string };
  try {
    body = await req.json();
  } catch {
    return apiError(400, "Invalid JSON body.");
  }
  const text = body.body?.trim();
  if (!text) return apiError(400, "Note body is required.");
  if (!findAccountById(params.id)) return apiError(404, "Account not found.");

  const account = addNote(params.id, {
    id: generateId("note"),
    authorId: auth.session.userId,
    authorName: auth.session.name,
    body: text.slice(0, 4000),
    createdAt: new Date().toISOString(),
  });
  return json({ notes: account!.notes });
}
