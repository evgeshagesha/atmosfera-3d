import {
  answerAsString,
  type AnketaplanSubmitPayload,
} from "@/lib/anketaplan/schema";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Short Telegram message (≤4096). Full passport goes as .txt document. */
export function formatAnketaplanTelegramMessage(
  data: AnketaplanSubmitPayload,
): string {
  const name = answerAsString(data.answers, "Имя и фамилия") || "—";
  const contact = answerAsString(data.answers, "Контакт") || "—";
  const why = answerAsString(data.answers, "Почему сейчас") || "—";
  const forWhom = answerAsString(data.answers, "Для кого план") || "—";
  const city = answerAsString(data.answers, "Город и часовой пояс") || "—";

  const lines = [
    "<b>Анкета: месячный план (anketaplan)</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(name.slice(0, 120))}`,
    `<b>Контакт:</b> ${escapeHtml(contact.slice(0, 120))}`,
    `<b>Город:</b> ${escapeHtml(city.slice(0, 120))}`,
    `<b>Для кого:</b> ${escapeHtml(forWhom.slice(0, 80))}`,
    `<b>Почему сейчас:</b> ${escapeHtml(why.slice(0, 800))}`,
    "",
    "<i>Полный паспорт — во вложении .txt</i>",
    `<i>${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}</i>`,
  ];

  return lines.join("\n").slice(0, 4000);
}

export function anketaplanDocumentFilename(data: AnketaplanSubmitPayload): string {
  const raw = answerAsString(data.answers, "Имя и фамилия") || "client";
  const slug = raw
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "client";
  const day = new Date().toISOString().slice(0, 10);
  return `anketaplan-${slug}-${day}.txt`;
}
