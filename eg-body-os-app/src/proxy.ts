import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const APP_PREFIXES = ["/today", "/library", "/club", "/progress", "/me", "/admin"];
const GUEST_ONLY = ["/", "/onboarding", "/auth"];

function isAppPath(pathname: string): boolean {
  return APP_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function isGuestOnly(pathname: string): boolean {
  return GUEST_ONLY.some((path) => pathname === path);
}

/**
 * Cookie presence only — optimistic redirect.
 * Real session is validated in layouts and server pages.
 */
export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  if (!sessionCookie && isAppPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (sessionCookie && isGuestOnly(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/today";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons|manifest).*)"],
};
