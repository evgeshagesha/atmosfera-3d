import crypto from "crypto";

export const ADMIN_COOKIE = "eg_admin_session";
const SESSION_VERSION = "eg-admin-v1";

function getAdminSecret(): string {
  return (
    process.env.ADMIN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "egoshev-dev-admin-change-me"
  );
}

export function createAdminSessionToken(): string {
  return crypto
    .createHmac("sha256", getAdminSecret())
    .update(SESSION_VERSION)
    .digest("hex");
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const expected = createAdminSessionToken();
  if (token.length !== expected.length) return false;

  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

export function verifyAdminPassword(password: string): boolean {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) return password === "admin";
  return password === configured;
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  };
}
