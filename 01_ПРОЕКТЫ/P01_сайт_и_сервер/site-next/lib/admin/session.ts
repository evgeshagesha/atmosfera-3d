import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/admin/auth";

/** Fail-closed: any exception → unauthenticated. */
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    return verifyAdminSessionToken(cookieStore.get(ADMIN_COOKIE)?.value);
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}
