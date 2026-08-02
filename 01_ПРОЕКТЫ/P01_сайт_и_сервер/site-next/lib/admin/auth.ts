import crypto from "crypto";

export const ADMIN_COOKIE = "eg_admin_session";
export const SESSION_VERSION = "eg-admin-v1";

/** Fail-closed: no hardcoded secrets or default passwords. */
export function getConfiguredAdminSecret(): string | null {
  const secret = (process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "").trim();
  return secret.length > 0 ? secret : null;
}

export function getConfiguredAdminPassword(): string | null {
  const password = (process.env.ADMIN_PASSWORD || "").trim();
  return password.length > 0 ? password : null;
}

export function isAdminAuthConfigured(): boolean {
  return getConfiguredAdminPassword() !== null;
}

function timingSafeEqualString(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export function createAdminSessionToken(): string {
  const secret = getConfiguredAdminSecret();
  if (!secret) {
    throw new Error("ADMIN_SECRET or ADMIN_PASSWORD must be configured");
  }

  return crypto.createHmac("sha256", secret).update(SESSION_VERSION).digest("hex");
}

/**
 * Fail-closed session check: any error / missing config / bad token → false.
 */
export function verifyAdminSessionToken(token: string | undefined): boolean {
  try {
    if (!token) return false;
    if (!getConfiguredAdminSecret()) return false;

    const expected = createAdminSessionToken();
    return timingSafeEqualString(token, expected);
  } catch {
    return false;
  }
}

/**
 * Fail-closed password check: missing/empty ADMIN_PASSWORD → nobody gets in.
 * No default "admin".
 */
export function verifyAdminPassword(password: string): boolean {
  try {
    const configured = getConfiguredAdminPassword();
    if (!configured) return false;
    if (!password) return false;
    return timingSafeEqualString(password, configured);
  } catch {
    return false;
  }
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
