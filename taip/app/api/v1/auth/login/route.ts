import { NextResponse, type NextRequest } from "next/server";
import { authenticate } from "@/modules/auth/service";
import { SESSION_COOKIE, SESSION_TTL_SECONDS } from "@/modules/auth/session";
import { apiError } from "@/lib/api";

export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return apiError(400, "Invalid JSON body.");
  }
  if (!body.email || !body.password) {
    return apiError(400, "email and password are required.");
  }

  const result = await authenticate(body.email, body.password);
  if (!result) return apiError(401, "Invalid credentials.");

  const res = NextResponse.json({
    data: {
      user: {
        id: result.session.userId,
        name: result.session.name,
        email: result.session.email,
        role: result.session.role,
      },
    },
  });
  res.cookies.set(SESSION_COOKIE, result.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
  });
  return res;
}
