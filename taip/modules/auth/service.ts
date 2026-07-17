import { cookies } from "next/headers";
import { getStore } from "@/lib/store";
import {
  SESSION_COOKIE,
  createSessionToken,
  sha256Hex,
  verifySessionToken,
  type SessionPayload,
} from "./session";

export async function authenticate(
  email: string,
  password: string,
): Promise<{ token: string; session: SessionPayload } | null> {
  const user = getStore().users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
  );
  if (!user) return null;
  const hash = await sha256Hex(password);
  if (hash !== user.passwordHash) return null;
  const token = await createSessionToken({
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
  const session = (await verifySessionToken(token))!;
  return { token, session };
}

/** Reads the current session from the request cookies (server-side only). */
export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
