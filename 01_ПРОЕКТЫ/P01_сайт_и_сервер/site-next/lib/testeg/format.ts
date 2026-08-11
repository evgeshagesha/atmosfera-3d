import type { TestegCompletePayload } from "./schema";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function formatTestegTelegramMessage(payload: TestegCompletePayload): string {
  const { result } = payload;
  const utm = payload.attribution || result.attribution || {};
  const utmLine = Object.entries(utm)
    .map(([k, v]) => `${k}=${v}`)
    .join(" · ");

  const zones = result.zones
    .map((z) => `• ${esc(z.label)}: <b>${z.score}</b>/20`)
    .join("\n");

  const safety =
    result.safetyFlags.length > 0
      ? result.safetyFlags.map(esc).join(", ")
      : "нет";

  const lines = [
    "<b>EG · Функциональный тест тела</b>",
    "",
    `Уровень: <b>${esc(result.level.toUpperCase())}</b> (raw: ${esc(result.rawLevel)})`,
    `Балл: <b>${result.total}</b> / 100`,
    `Приоритет: <b>${esc(result.priorityZone)}</b>`,
    `Асимметрия: ${result.asymmetry ? "да" : "нет"}`,
    `Safety: ${safety}`,
    "",
    "<b>Зоны</b>",
    zones,
    "",
    `session: <code>${esc(result.sessionId)}</code>`,
  ];

  const qid = payload.questionnaireId || result.questionnaireId;
  if (qid) lines.push(`questionnaire: <code>${esc(qid)}</code>`);
  if (payload.duration != null) lines.push(`duration: ${payload.duration}s`);
  if (utmLine) lines.push(`utm: ${esc(utmLine)}`);
  lines.push(`completed: ${esc(result.completedAt)}`);

  return lines.join("\n");
}
