import { STRATEGY_CONTENT, STRATEGY_PRODUCT, type FormStep } from "@/lib/strategy/content";

export type StrategyLeadPayload = {
  company_website?: string;
  name?: string;
  age?: string;
  city?: string;
  occupation?: string;
  occupationOther?: string;
  concerns?: string[];
  concernsOther?: string;
  goal?: string;
  training?: string;
  limits?: string;
  limitsDetail?: string;
  motivation?: string;
  startWhen?: string;
  readiness?: string;
  telegram?: string;
  phone?: string;
  consent?: boolean;
};

function trimStr(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 20);
}

export function normalizeLeadPayload(raw: unknown): StrategyLeadPayload | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const data = raw as Record<string, unknown>;

  return {
    company_website: trimStr(data.company_website, 200),
    name: trimStr(data.name, 80),
    age: trimStr(data.age, 3),
    city: trimStr(data.city, 80),
    occupation: trimStr(data.occupation, 40),
    occupationOther: trimStr(data.occupationOther, 120),
    concerns: asStringArray(data.concerns),
    concernsOther: trimStr(data.concernsOther, 200),
    goal: trimStr(data.goal, 40),
    training: trimStr(data.training, 40),
    limits: trimStr(data.limits, 40),
    limitsDetail: trimStr(data.limitsDetail, 500),
    motivation: trimStr(data.motivation, 1000),
    startWhen: trimStr(data.startWhen, 40),
    readiness: trimStr(data.readiness, 40),
    telegram: trimStr(data.telegram, 80),
    phone: trimStr(data.phone, 40),
    consent: data.consent === true,
  };
}

function optionLabel(step: FormStep, fieldKey: string, value: string): string {
  for (const field of step.fields) {
    if (field.key !== fieldKey) continue;
    if (field.type === "radio" || field.type === "checkbox") {
      const found = field.options.find((opt) => opt.value === value);
      return found?.label ?? value;
    }
  }
  return value;
}

export function validateLeadPayload(data: StrategyLeadPayload): string | null {
  if (data.company_website) {
    return "spam";
  }

  const steps = STRATEGY_CONTENT.form.steps;
  for (const step of steps) {
    for (const field of step.fields) {
      if (field.type === "consent") {
        if (!data.consent) return STRATEGY_CONTENT.form.consentRequired;
        continue;
      }

      if (field.type === "checkbox") {
        const values = data.concerns ?? [];
        if (field.required && values.length === 0) {
          return STRATEGY_CONTENT.form.requiredHint;
        }
        if (values.includes("other") && !data.concernsOther) {
          return STRATEGY_CONTENT.form.requiredHint;
        }
        continue;
      }

      if (field.type === "radio") {
        const value = trimStr((data as Record<string, unknown>)[field.key], 80);
        if (field.required && !value) return STRATEGY_CONTENT.form.requiredHint;
        const otherKey = "otherKey" in field ? field.otherKey : undefined;
        if (otherKey && value === "other") {
          const other = trimStr((data as Record<string, unknown>)[otherKey], 200);
          if (!other) return STRATEGY_CONTENT.form.requiredHint;
        }
        const detailWhen = "detailWhen" in field ? field.detailWhen : undefined;
        const detailKey = "detailKey" in field ? field.detailKey : undefined;
        const detailRequired = "detailRequired" in field ? field.detailRequired : undefined;
        if (detailWhen && detailKey && detailWhen.includes(value)) {
          const detail = trimStr((data as Record<string, unknown>)[detailKey], 500);
          if (detailRequired && !detail) return STRATEGY_CONTENT.form.requiredHint;
        }
        continue;
      }

      if (field.type === "text" || field.type === "tel" || field.type === "textarea") {
        if (step.requireOneOf) continue;
        const value = trimStr((data as Record<string, unknown>)[field.key], field.maxLength ?? 500);
        if (field.required && !value) return STRATEGY_CONTENT.form.requiredHint;
      }
    }

    if (step.requireOneOf) {
      const ok = step.requireOneOf.some((key) => trimStr((data as Record<string, unknown>)[key], 80));
      if (!ok) return STRATEGY_CONTENT.form.contactRequired;
    }
  }

  return null;
}

export function formatStrategyLeadMessage(data: StrategyLeadPayload): string {
  const steps = STRATEGY_CONTENT.form.steps;
  const lines = [
    "<b>Заявка: Персональная стратегия тела</b>",
    "",
    `<b>Продукт:</b> ${STRATEGY_PRODUCT.name}`,
    `<b>Цена:</b> ${STRATEGY_PRODUCT.priceLabel}`,
    `<b>Источник:</b> ${STRATEGY_PRODUCT.sourcePage}`,
    "",
  ];

  const push = (label: string, value: string) => {
    if (!value) return;
    lines.push(`<b>${escapeHtml(label)}:</b> ${escapeHtml(value)}`);
  };

  push("Имя", data.name ?? "");
  push("Возраст", data.age ?? "");
  push("Город", data.city ?? "");

  const occupationStep = steps.find((s) => s.id === "occupation");
  if (occupationStep && data.occupation) {
    push("Деятельность", optionLabel(occupationStep, "occupation", data.occupation));
  }
  push("Деятельность (уточнение)", data.occupationOther ?? "");

  const concernsStep = steps.find((s) => s.id === "concerns");
  if (concernsStep && data.concerns?.length) {
    const labels = data.concerns.map((v) => optionLabel(concernsStep, "concerns", v));
    push("Запрос", labels.join(", "));
  }
  push("Запрос (уточнение)", data.concernsOther ?? "");

  const goalStep = steps.find((s) => s.id === "goal");
  if (goalStep && data.goal) push("Цель", optionLabel(goalStep, "goal", data.goal));

  const trainingStep = steps.find((s) => s.id === "training");
  if (trainingStep && data.training) {
    push("Тренировки", optionLabel(trainingStep, "training", data.training));
  }

  const limitsStep = steps.find((s) => s.id === "limits");
  if (limitsStep && data.limits) {
    push("Ограничения", optionLabel(limitsStep, "limits", data.limits));
  }
  push("Ограничения (детали)", data.limitsDetail ?? "");

  push("Почему сейчас", data.motivation ?? "");

  const startStep = steps.find((s) => s.id === "when_start");
  if (startStep && data.startWhen) {
    push("Когда начать", optionLabel(startStep, "startWhen", data.startWhen));
  }

  const readyStep = steps.find((s) => s.id === "readiness");
  if (readyStep && data.readiness) {
    push("Готовность к цене", optionLabel(readyStep, "readiness", data.readiness));
  }

  push("Telegram", data.telegram ?? "");
  push("Телефон", data.phone ?? "");
  push("Согласие ПДн", data.consent ? "да" : "нет");

  lines.push("", `<i>${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}</i>`);
  return lines.join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
