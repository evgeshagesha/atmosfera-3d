import type { AnketaAnswers, LeadScoreResult } from "@/app/anketaeg/types";

function moscowDateStamp(): string {
  return new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatValue(value: unknown): string {
  if (value === undefined || value === null || value === "") return "—";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => `${k}: ${String(v)}`)
      .join(" · ");
  }
  if (typeof value === "boolean") return value ? "Да" : "Нет";
  return String(value);
}

const LABELS: Record<string, string> = {
  name: "Имя",
  age: "Возраст",
  gender: "Пол",
  location: "Город / страна",
  occupation: "Занятость",
  body_concern: "Главная проблема / запрос",
  goals_now: "Актуальные задачи",
  pain_areas: "Зоны дискомфорта",
  pain_duration: "Длительность",
  pain_limit: "Ограничение жизни 0–10",
  pain_impact: "Как ограничивает жизнь",
  future_body: "Желаемое тело через год",
  top_results: "ТОП-3 результата",
  training_frequency: "Частота тренировок",
  activities: "Активности",
  movement_limits: "Что даётся сложно",
  sitting_hours: "Сидение",
  wellbeing: "Сон / энергия / стресс / движение / восстановление",
  morning: "Самочувствие утром",
  recovery_practices: "Практики восстановления",
  holistic_interest: "Интерес к комплексному подходу",
  pregnancy: "Беременность / роды",
  postpartum_tasks: "Задачи после беременности",
  tried: "Что пробовал(а)",
  what_helped: "Что помогло",
  what_failed: "Что не сработало",
  why_not_sustained: "Почему результат не сохранился",
  investments: "Инвестиции за 2 года",
  max_spend: "Макс. сумма",
  best_investment: "Лучшее вложение",
  wasted_money: "Потеря денег",
  readiness: "Готовность 0–10",
  time_available: "Время на тело",
  barriers: "Барьеры",
  program_must_have: "Что должно быть в программе",
  work_format: "Формат работы",
  trust_factors: "Факторы доверия",
  ideal_specialist: "Идеальный специалист",
  following: "Как давно подписан(а)",
  first_source: "Источник знакомства",
  why_stayed: "Почему остался / осталась",
  approach_closest: "Что близко в подходе",
  content_topics: "Желаемые темы контента",
  life_change: "Что изменится в жизни",
  interview: "Готовность к интервью",
  telegram: "Telegram",
  email: "Email",
  privacy: "Согласие",
};

const SECTION_ORDER: { title: string; keys: string[] }[] = [
  {
    title: "👤 ПРОФИЛЬ",
    keys: ["name", "age", "gender", "location", "occupation"],
  },
  {
    title: "🎯 ГЛАВНАЯ ЗАДАЧА",
    keys: ["body_concern", "goals_now", "future_body", "top_results", "life_change"],
  },
  {
    title: "🩻 ТЕЛО",
    keys: [
      "pain_areas",
      "pain_duration",
      "pain_limit",
      "pain_impact",
      "pregnancy",
      "postpartum_tasks",
    ],
  },
  {
    title: "🏃 ДВИЖЕНИЕ",
    keys: [
      "training_frequency",
      "activities",
      "movement_limits",
      "sitting_hours",
      "wellbeing",
      "morning",
      "recovery_practices",
      "holistic_interest",
    ],
  },
  {
    title: "💰 ОПЫТ И ПОКУПКИ",
    keys: [
      "tried",
      "what_helped",
      "what_failed",
      "why_not_sustained",
      "investments",
      "max_spend",
      "best_investment",
      "wasted_money",
    ],
  },
  {
    title: "🚧 БАРЬЕРЫ И ГОТОВНОСТЬ",
    keys: ["readiness", "time_available", "barriers", "program_must_have"],
  },
  {
    title: "🤝 ФОРМАТ",
    keys: ["work_format", "trust_factors", "ideal_specialist"],
  },
  {
    title: "📣 ПРО EG / КОНТЕНТ",
    keys: [
      "following",
      "first_source",
      "why_stayed",
      "approach_closest",
      "content_topics",
    ],
  },
  {
    title: "📞 КОНТАКТ",
    keys: ["interview", "telegram", "email", "privacy"],
  },
];

export function splitTelegram(text: string, max = 3800): string[] {
  const parts: string[] = [];
  let rest = text;
  while (rest.length > max) {
    let cut = rest.lastIndexOf("\n", max);
    if (cut < max * 0.55) cut = max;
    parts.push(rest.slice(0, cut));
    rest = rest.slice(cut).replace(/^\n+/, "");
  }
  if (rest) parts.push(rest);
  return parts;
}

function line(label: string, value: unknown): string {
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(formatValue(value))}`;
}

export function formatAnketaegTelegramMessages(opts: {
  answers: AnketaAnswers;
  lead: LeadScoreResult;
  meta?: {
    utm?: Record<string, string>;
    page?: string;
    referrer?: string | null;
    submittedAt?: string;
  };
}): string[] {
  const { answers, lead, meta } = opts;
  const emoji =
    lead.segment === "HOT" ? "🔥" : lead.segment === "WARM" ? "🟡" : "⚪️";

  const header = [
    `${emoji} <b>НОВАЯ АНКЕТА — ${escapeHtml(lead.segment)}</b>`,
    "",
    line("Имя", answers.name),
    line("Возраст", answers.age),
    line("Пол", answers.gender),
    line("Город", answers.location),
    line("Telegram", answers.telegram),
    "━━━━━━━━━━━━━━",
  ];

  const body: string[] = [];
  const used = new Set<string>();

  for (const section of SECTION_ORDER) {
    const rows = section.keys
      .filter((key) => {
        const v = answers[key];
        if (v === undefined || v === null || v === "") return false;
        if (Array.isArray(v) && v.length === 0) return false;
        return true;
      })
      .map((key) => {
        used.add(key);
        return line(LABELS[key] || key, answers[key]);
      });
    if (!rows.length) continue;
    body.push("", section.title, ...rows);
  }

  for (const [key, value] of Object.entries(answers)) {
    if (used.has(key)) continue;
    if (value === undefined || value === null || value === "") continue;
    body.push(line(LABELS[key] || key, value));
  }

  const utm = meta?.utm || {};
  const source = utm.utm_source || "—";
  const campaign = utm.utm_campaign || "—";

  const footer = [
    "━━━━━━━━━━━━━━",
    `LEAD SCORE: <b>${escapeHtml(String(lead.score))}</b>`,
    `TEMPERATURE: <b>${emoji} ${escapeHtml(lead.segment)}</b>`,
    `Source: ${escapeHtml(String(source))}`,
    `Campaign: ${escapeHtml(String(campaign))}`,
    `Referrer: ${escapeHtml(formatValue(meta?.referrer))}`,
    `Page: ${escapeHtml(formatValue(meta?.page))}`,
    `Дата (МСК): ${escapeHtml(moscowDateStamp())}`,
  ];

  return splitTelegram([...header, ...body, "", ...footer].join("\n"));
}
