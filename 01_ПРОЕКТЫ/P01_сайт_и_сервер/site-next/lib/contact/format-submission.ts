export function formatContactSubmission(data: Record<string, FormDataEntryValue>) {
  const lines = ["<b>Новая заявка с egoshev.ru</b>", ""];

  for (const [key, value] of Object.entries(data)) {
    if (key.startsWith("formservices")) continue;
    const text = String(value).trim();
    if (!text) continue;
    lines.push(`<b>${escapeHtml(key)}:</b> ${escapeHtml(text)}`);
  }

  lines.push("", `<i>${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}</i>`);
  return lines.join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
