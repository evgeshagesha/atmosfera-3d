import Link from "next/link";
import { BrandLockup } from "@/components/os/BrandLockup";
import { ChromeButton } from "@/components/os/ChromeButton";
import { SilverWaves } from "@/components/os/SilverWaves";
import { redirectIfAuthed } from "@/lib/session";

export default async function WelcomePage() {
  await redirectIfAuthed();

  return (
    <main className="relative flex min-h-svh flex-col items-center px-6 pb-10 pt-12">
      <SilverWaves placement="welcome" />
      <BrandLockup size="hero" />

      <div className="relative z-10 mt-auto flex w-full flex-col items-center pb-6 pt-10 text-center">
        <h1 className="chrome-text font-display text-[34px] uppercase leading-tight tracking-wide">
          Начни с себя
        </h1>
        <p className="mt-3 text-sm tracking-wide text-fg">
          Движение • Дыхание • Дисциплина
        </p>
        <p className="mt-4 max-w-[280px] text-sm leading-6 text-muted">
          Определи состояние тела и получи понятный маршрут действий.
        </p>
      </div>

      <div className="relative z-10 mt-auto w-full pb-4">
        <ChromeButton href="/onboarding">Начать</ChromeButton>
        <p className="mt-5 text-center text-sm text-muted">
          Уже есть аккаунт?{" "}
          <Link href="/auth" className="text-fg">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}
