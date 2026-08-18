import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAdminUser } from "@/lib/admin";

export async function getCurrentSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireSession() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireSession();
  if (
    !isAdminUser({
      email: session.user.email,
      role: "role" in session.user ? String(session.user.role) : undefined,
    })
  ) {
    redirect("/today");
  }
  return session;
}

export async function redirectIfAuthed(to = "/today") {
  const session = await getCurrentSession();
  if (session) {
    redirect(to);
  }
}
