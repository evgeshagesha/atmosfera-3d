import { NextResponse } from "next/server";

import {
  createAdminSessionToken,
  getAdminCookieOptions,
  verifyAdminPassword,
  ADMIN_COOKIE,
} from "@/lib/admin/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password =
    body && typeof body === "object" && "password" in body
      ? String((body as { password?: string }).password ?? "")
      : "";

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ ok: false, error: "Неверный пароль" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createAdminSessionToken(), getAdminCookieOptions());
  return response;
}
