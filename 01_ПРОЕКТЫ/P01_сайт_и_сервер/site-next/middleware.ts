import { NextResponse, type NextRequest } from "next/server";

import {
  ADMIN_COOKIE,
  SESSION_VERSION,
  getConfiguredAdminSecret,
} from "@/lib/admin/auth";

/** Edge-compatible HMAC-SHA256 hex (matches Node createHmac output). */
async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function isValidAdminToken(token: string | undefined): Promise<boolean> {
  try {
    if (!token) return false;
    const secret = getConfiguredAdminSecret();
    if (!secret) return false;
    const expected = await hmacSha256Hex(secret, SESSION_VERSION);
    return timingSafeEqualHex(token, expected);
  } catch {
    // Fail-closed: auth errors must deny access.
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (await isValidAdminToken(token)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
