import { BrandLockup } from "@/components/os/BrandLockup";
import { SilverWaves } from "@/components/os/SilverWaves";
import { StepProgress } from "@/components/os/StepProgress";
import { OnboardingCards } from "@/app/onboarding/OnboardingCards";
import { redirectIfAuthed } from "@/lib/session";

export default async function OnboardingPage() {
  await redirectIfAuthed();

  return (
    <main className="relative flex min-h-svh flex-col px-5 pb-8 pt-8">
      <SilverWaves />
      <div className="relative z-10 flex flex-col gap-6">
        <BrandLockup />
        <div className="text-center">
          <h1 className="chrome-text font-display text-[28px] uppercase leading-tight tracking-wide">
            С чего начнём?
          </h1>
          <p className="mx-auto mt-3 max-w-[300px] text-sm leading-6 text-muted">
            Выберите, что сейчас для вас важнее. Маршрут можно изменить позже.
          </p>
        </div>
        <OnboardingCards />
        <div className="mt-2 pb-4">
          <StepProgress step={1} total={2} />
        </div>
      </div>
    </main>
  );
}
