import type { AnketaSubmitPayload } from "@/lib/anketa/schema";

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

function clip(value: string, max: number) {
  const t = value.trim();
  if (!t) return "—";
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

/** Short Telegram message (≤4096). Full form goes as .txt document. */
export function formatAnketaTelegramMessage(data: AnketaSubmitPayload): string {
  const contact =
    [data.phone, data.email].filter(Boolean).join(" · ") || "—";
  const methods =
    data.contactMethods && data.contactMethods.length
      ? data.contactMethods.join(", ")
      : "—";

  const lines = [
    "🔥 НОВАЯ ЗАЯВКА — АНКЕТА ПРИЁМА",
    "",
    `Имя: ${escapeHtml(clip(data.name, 120))}`,
    `Контакт: ${escapeHtml(clip(contact, 160))}`,
    `Город: ${escapeHtml(clip(data.city || "", 120))}`,
    `Формат: ${escapeHtml(clip(data.format || "", 120))}`,
    `Запрос: ${escapeHtml(clip(data.request || "", 400))}`,
    `Связь: ${escapeHtml(clip(methods, 160))}`,
    `Зоны: ${escapeHtml(clip(data.zones || "", 200))}`,
    `Когда начать: ${escapeHtml(clip(data.whenStart || "", 120))}`,
    `Готовность: ${escapeHtml(clip(data.commitment || "", 20))}`,
    `Дата: ${moscowDateStamp()}`,
    "",
    "Статус: НОВЫЙ ЛИД",
    "",
    "<i>Полная анкета — во вложении .txt</i>",
  ];

  return lines.join("\n").slice(0, 4000);
}

export function anketaDocumentFilename(data: AnketaSubmitPayload): string {
  const raw = data.name || "client";
  const slug =
    raw
      .toLowerCase()
      .replace(/[^a-zа-яё0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "client";
  const day = new Date().toISOString().slice(0, 10);
  return `anketa-${slug}-${day}.txt`;
}
