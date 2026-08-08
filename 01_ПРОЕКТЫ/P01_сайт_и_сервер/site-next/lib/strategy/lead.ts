import { STRATEGY_CONTENT } from "@/lib/strategy/content";

export const CONTACT_METHODS = [
  "telegram",
  "whatsapp",
  "vk",
  "instagram",
  "call",
] as const;

export type ContactMethod = (typeof CONTACT_METHODS)[number];

export type StrategyLeadPayload = {
  company_website?: string;
  name?: string;
  /** Phone or Telegram handle — single contact field */
  contact?: string;
  contactMethod?: string;
  /** Optional goal / what to change */
  goal?: string;
  consent?: boolean;
};

function trimStr(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function normalizeLeadPayload(raw: unknown): StrategyLeadPayload | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const data = raw as Record<string, unknown>;

  return {
    company_website: trimStr(data.company_website, 200),
    name: trimStr(data.name, 80),
    contact: trimStr(data.contact, 120),
    contactMethod: trimStr(data.contactMethod, 40).toLowerCase(),
    goal: trimStr(data.goal, 500),
    consent: data.consent === true,
  };
}

export function validateLeadPayload(data: StrategyLeadPayload): string | null {
  if (data.company_website) return "spam";

  const lead = STRATEGY_CONTENT.lead;
  if (!data.name) return lead.errors.name;
  if (!data.contact) return lead.errors.contact;
  if (!data.contactMethod || !CONTACT_METHODS.includes(data.contactMethod as ContactMethod)) {
    return lead.errors.contactMethod;
  }
  if (!data.consent) return lead.errors.consent;

  return null;
}

function contactMethodLabel(value: string): string {
  const found = STRATEGY_CONTENT.lead.contactMethods.find((m) => m.value === value);
  return found?.label ?? value;
}

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Exact Telegram marker format for inbox filter. */
export function formatStrategyLeadMessage(data: StrategyLeadPayload): string {
  const goal = data.goal?.trim() ? data.goal.trim() : "—";
  const method = contactMethodLabel(data.contactMethod ?? "");

  return [
    "🔥 НОВАЯ ЗАЯВКА — 30 ДНЕЙ",
    "",
    `Имя: ${escapeHtml(data.name ?? "")}`,
    `Контакт: ${escapeHtml(data.contact ?? "")}`,
    `Связаться: ${escapeHtml(method)}`,
    `Цель: ${escapeHtml(goal)}`,
    `Дата: ${moscowDateStamp()}`,
    "",
    "Статус: НОВЫЙ ЛИД",
  ].join("\n");
}
