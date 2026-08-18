import { Suspense } from "react";
import { OtpForm } from "@/components/auth/OtpForm";
import { BrandLockup } from "@/components/os/BrandLockup";
import { SilverWaves } from "@/components/os/SilverWaves";
import { StepProgress } from "@/components/os/StepProgress";
import { redirectIfAuthed } from "@/lib/session";

export default async function AuthPage() {
  await redirectIfAuthed();

  return (
    <main className="relative flex min-h-svh flex-col px-6 pb-10 pt-10">
      <SilverWaves />
      <div className="relative z-10 flex flex-1 flex-col items-center text-center">
        <BrandLockup />
        <h1 className="chrome-text mt-10 font-display text-[28px] uppercase tracking-wide">
          Вход
        </h1>
        <p className="mt-3 max-w-[280px] text-sm leading-6 text-muted">
          Код на почту. Без пароля. Сессия остаётся на устройстве.
        </p>
        <div className="mt-8 w-full">
          <Suspense>
            <OtpForm />
          </Suspense>
        </div>
        <div className="mt-auto pt-10">
          <StepProgress step={2} total={2} />
        </div>
      </div>
    </main>
  );
}
