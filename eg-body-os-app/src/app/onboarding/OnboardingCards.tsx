"use client";

import { CardArt } from "@/components/os/CardArt";
import { chooseOnboardingRoute } from "@/app/onboarding/actions";
import type { OnboardingRoute } from "@/lib/onboarding";

const CARDS: Array<{
  route: OnboardingRoute;
  number: string;
  title: string;
  kicker?: string;
  subtitle?: string;
  description: string;
  cta: string;
  art: "body" | "club" | "system" | "personal";
}> = [
  {
    route: "diagnose",
    number: "01",
    kicker: "Рекомендуем начать",
    title: "Проверить тело",
    description: "Функциональный тест и стартовый маршрут",
    cta: "Начать с диагностики",
    art: "body",
  },
  {
    route: "club",
    number: "02",
    title: "Тренироваться регулярно",
    subtitle: "ATMOSFERA 3D CLUB",
    description: "Тренировки • практики • эфиры • сообщество",
    cta: "Посмотреть Club",
    art: "club",
  },
  {
    route: "system",
    number: "03",
    title: "Пройти систему",
    description: "Курсы и программы, например «Базовая настройка тела»",
    cta: "Выбрать программу",
    art: "system",
  },
  {
    route: "personal",
    number: "04",
    title: "Нужен персональный план",
    description: "Персональный маршрут и программа",
    cta: "Узнать формат",
    art: "personal",
  },
];

export function OnboardingCards() {
  return (
    <div className="flex flex-col gap-3">
      {CARDS.map((card) => (
        <form key={card.route} action={() => chooseOnboardingRoute(card.route)}>
          <button type="submit" className="glass-card w-full rounded-[22px] p-4 text-left">
            {card.kicker ? (
              <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-muted">
                ★ {card.kicker}
              </p>
            ) : null}
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-display text-2xl tracking-wide text-gold">{card.number}</p>
                <h2 className="mt-1 font-display text-[15px] uppercase leading-snug tracking-wide text-fg">
                  {card.title}
                </h2>
                {card.subtitle ? (
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted">
                    {card.subtitle}
                  </p>
                ) : null}
                <p className="mt-2 text-sm leading-5 text-muted">{card.description}</p>
                <p className="mt-3 text-sm text-fg">{card.cta} →</p>
              </div>
              <CardArt kind={card.art} />
            </div>
          </button>
        </form>
      ))}
    </div>
  );
}
