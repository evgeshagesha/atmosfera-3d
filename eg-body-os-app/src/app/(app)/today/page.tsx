import { cookies } from "next/headers";
import { ChromeButton } from "@/components/os/ChromeButton";
import { SilverWaves } from "@/components/os/SilverWaves";
import { ONBOARDING_COOKIE, todayActionFor } from "@/lib/onboarding";

export default async function TodayPage() {
  const route = (await cookies()).get(ONBOARDING_COOKIE)?.value;
  const action = todayActionFor(route);

  return (
    <main className="relative flex min-h-full flex-col px-6 pb-8 pt-10">
      <SilverWaves />
      <div className="relative z-10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Today</p>
        <h1 className="chrome-text mt-3 font-display text-[28px] uppercase leading-tight">
          Сегодня
        </h1>
        <p className="mt-4 max-w-[320px] text-sm leading-6 text-muted">{action.note}</p>
        <div className="mt-8">
          <ChromeButton disabled>{action.cta}</ChromeButton>
        </div>
      </div>
    </main>
  );
}
