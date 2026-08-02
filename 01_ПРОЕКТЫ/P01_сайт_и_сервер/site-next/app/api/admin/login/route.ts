import { NextResponse } from "next/server";

import {
  createAdminSessionToken,
  getAdminCookieOptions,
  isAdminAuthConfigured,
  verifyAdminPassword,
  ADMIN_COOKIE,
} from "@/lib/admin/auth";

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Админка не настроена (ADMIN_PASSWORD)" },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  const password =
    body && typeof body === "object" && "password" in body
      ? String((body as { password?: string }).password ?? "")
      : "";

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ ok: false, error: "Неверный пароль" }, { status: 401 });
  }

  try {
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, createAdminSessionToken(), getAdminCookieOptions());
    return response;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Админка не настроена" },
      { status: 503 },
    );
  }
}
