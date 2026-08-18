import { LogoutButton } from "@/app/(app)/me/LogoutButton";
import { SilverWaves } from "@/components/os/SilverWaves";
import { isAdminUser } from "@/lib/admin";
import {
  RESOURCE_LABELS,
  formatEntitlementExpiry,
  listEntitlementsForUser,
  type Resource,
} from "@/lib/entitlements";
import { requireSession } from "@/lib/session";
import Link from "next/link";

export default async function MePage() {
  const session = await requireSession();
  const entitlements = await listEntitlementsForUser(session.user.id);
  const admin = isAdminUser({
    email: session.user.email,
    role: "role" in session.user ? String(session.user.role) : undefined,
  });

  return (
    <main className="relative flex min-h-full flex-col px-6 pb-8 pt-10">
      <SilverWaves />
      <div className="relative z-10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Me</p>
        <h1 className="chrome-text mt-3 font-display text-[28px] uppercase">Профиль</h1>
        <p className="mt-4 text-sm text-fg">{session.user.email}</p>

        <section className="mt-8">
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted">Доступы</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {entitlements.length === 0 ? (
              <li className="glass-card rounded-2xl px-4 py-4 text-sm text-muted">
                Entitlements ещё не выданы.
              </li>
            ) : (
              entitlements.map((row) => (
                <li key={row.id} className="glass-card rounded-2xl px-4 py-4">
                  <p className="text-sm text-fg">
                    {RESOURCE_LABELS[row.resource as Resource] ?? row.resource}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {row.status} · {formatEntitlementExpiry(row.expiresAt)}
                  </p>
                </li>
              ))
            )}
          </ul>
        </section>

        {admin ? (
          <p className="mt-6 text-center text-sm">
            <Link href="/admin" className="text-fg">
              Админ-оболочка
            </Link>
          </p>
        ) : null}

        <div className="mt-10">
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
