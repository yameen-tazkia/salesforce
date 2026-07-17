import type { NextRequest } from "next/server";
import { json, requireSession } from "@/lib/api";

export async function GET(req: NextRequest) {
  const auth = await requireSession(req);
  if ("response" in auth) return auth.response;
  const { userId, name, email, role } = auth.session;
  return json({ user: { id: userId, name, email, role } });
}
