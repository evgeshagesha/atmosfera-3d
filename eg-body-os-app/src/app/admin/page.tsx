import { SilverWaves } from "@/components/os/SilverWaves";
import { requireAdmin } from "@/lib/session";

export default async function AdminPage() {
  await requireAdmin();

  return (
    <main className="relative flex min-h-svh flex-col px-6 pb-8 pt-10">
      <SilverWaves />
      <div className="relative z-10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Admin</p>
        <h1 className="chrome-text mt-3 font-display text-[28px] uppercase">Админ</h1>
        <p className="mt-4 max-w-[320px] text-sm leading-6 text-muted">
          Оболочка Slice 0. Тот же OTP, вход по allowlist ADMIN_EMAIL. 2FA и passkey — позже.
        </p>
      </div>
    </main>
  );
}
