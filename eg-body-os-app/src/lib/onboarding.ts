export const ONBOARDING_COOKIE = "eg_onboarding_route";

export const ONBOARDING_ROUTES = ["diagnose", "club", "system", "personal"] as const;

export type OnboardingRoute = (typeof ONBOARDING_ROUTES)[number];

export type TodayAction = {
  route: OnboardingRoute | "default";
  cta: string;
  note: string;
};

const TODAY_BY_ROUTE: Record<OnboardingRoute, TodayAction> = {
  diagnose: {
    route: "diagnose",
    cta: "Пройти тест",
    note: "Функциональный тест ещё не собран. Это честный следующий шаг выбранного маршрута.",
  },
  club: {
    route: "club",
    cta: "Посмотреть Club",
    note: "Club как продукт внутри OS появится позже. Сейчас это выбранный маршрут, без фейкового расписания.",
  },
  system: {
    route: "system",
    cta: "Выбрать программу",
    note: "Курсы и программы здесь пока пустые. Маршрут сохранён.",
  },
  personal: {
    route: "personal",
    cta: "Узнать формат",
    note: "Персональный план в этом срезе не собирается. Формат появится отдельным шагом.",
  },
};

export const DEFAULT_TODAY_ACTION: TodayAction = {
  route: "default",
  cta: "Пройти функциональный тест",
  note: "Маршрут ещё не выбран. Начните с диагностики, когда она появится.",
};

export function isOnboardingRoute(value: string | undefined | null): value is OnboardingRoute {
  return ONBOARDING_ROUTES.includes(value as OnboardingRoute);
}

export function todayActionFor(route: string | undefined | null): TodayAction {
  if (isOnboardingRoute(route)) return TODAY_BY_ROUTE[route];
  return DEFAULT_TODAY_ACTION;
}
