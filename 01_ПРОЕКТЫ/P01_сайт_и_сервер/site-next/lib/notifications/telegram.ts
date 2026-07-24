type SendTelegramMessageOptions = {
  text: string;
};

export async function sendTelegramMessage({ text }: SendTelegramMessageOptions) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { ok: false as const, reason: "not_configured" as const };
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text().catch(() => "unknown error");
    console.error("[telegram]", error);
    return { ok: false as const, reason: "api_error" as const };
  }

  return { ok: true as const };
}
