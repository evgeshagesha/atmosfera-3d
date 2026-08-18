"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChromeButton } from "@/components/os/ChromeButton";
import { authClient } from "@/lib/auth-client";

export function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromOnboarding = searchParams.get("from") === "onboarding";
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [devOtp, setDevOtp] = useState<string | null>(null);

  useEffect(() => {
    if (!sent || process.env.NODE_ENV === "production" || !email) return;
    let cancelled = false;

    const load = async () => {
      const response = await fetch(`/api/dev/otp?email=${encodeURIComponent(email)}`);
      if (!response.ok || cancelled) return;
      const data = (await response.json()) as { otp?: string | null };
      if (!cancelled) setDevOtp(data.otp ?? null);
    };

    void load();
    const timer = window.setInterval(() => {
      void load();
    }, 800);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [email, sent]);

  async function sendCode(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);
    const { error: sendError } = await authClient.emailOtp.sendVerificationOtp({
      email: email.trim(),
      type: "sign-in",
    });
    setPending(false);
    if (sendError) {
      setError("Не удалось отправить код. Проверьте почту и попробуйте ещё раз.");
      return;
    }
    setSent(true);
  }

  async function verifyCode(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);
    const { error: verifyError } = await authClient.signIn.emailOtp({
      email: email.trim(),
      otp: otp.trim(),
    });
    setPending(false);
    if (verifyError) {
      setError("Код не подошёл. Запросите новый, если попытки закончились.");
      return;
    }
    router.push("/today");
    router.refresh();
  }

  return (
    <div className="w-full">
      {!sent ? (
        <form onSubmit={sendCode} className="flex flex-col gap-4">
          <label className="text-left text-sm text-muted">
            Email
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 h-14 w-full rounded-full border border-white/12 bg-surface px-5 text-fg outline-none"
              placeholder="you@email.com"
            />
          </label>
          <ChromeButton type="submit" disabled={pending}>
            Получить код
          </ChromeButton>
        </form>
      ) : (
        <form onSubmit={verifyCode} className="flex flex-col gap-4">
          <p className="text-sm leading-6 text-muted">
            Код отправлен на {email}. Он нужен один раз на этом устройстве — не при каждом открытии.
          </p>
          <label className="text-left text-sm text-muted">
            6-значный код
            <input
              required
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
              className="mt-2 h-14 w-full rounded-full border border-white/12 bg-surface px-5 text-center font-display text-2xl tracking-[0.4em] text-fg outline-none"
            />
          </label>
          {process.env.NODE_ENV !== "production" && devOtp ? (
            <p className="rounded-2xl border border-white/10 bg-surface px-4 py-3 text-center text-sm text-muted">
              Dev: код <span className="font-display tracking-[0.2em] text-fg">{devOtp}</span>
            </p>
          ) : null}
          <ChromeButton type="submit" disabled={pending || otp.length !== 6}>
            Войти
          </ChromeButton>
          <button
            type="button"
            className="text-sm text-muted"
            onClick={() => {
              setSent(false);
              setOtp("");
              setDevOtp(null);
            }}
          >
            Другая почта
          </button>
        </form>
      )}
      {error ? <p className="mt-4 text-center text-sm text-fg">{error}</p> : null}
      {fromOnboarding ? (
        <p className="mt-6 text-center text-xs text-muted">После входа откроется Today с выбранным шагом.</p>
      ) : null}
    </div>
  );
}
