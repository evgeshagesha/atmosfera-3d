type SendTelegramMessageOptions = {
  text: string;
  /** Optional override; defaults to TELEGRAM_BOT_TOKEN / STRATEGY_TG_BOT_TOKEN */
  token?: string;
  /** Optional override; defaults to TELEGRAM_CHAT_ID / STRATEGY_TG_CHAT_ID */
  chatId?: string;
};

export async function sendTelegramMessage({
  text,
  token: tokenOverride,
  chatId: chatIdOverride,
}: SendTelegramMessageOptions) {
  const token =
    tokenOverride ||
    process.env.STRATEGY_TG_BOT_TOKEN ||
    process.env.TELEGRAM_BOT_TOKEN;
  const chatId =
    chatIdOverride ||
    process.env.STRATEGY_TG_CHAT_ID ||
    process.env.TELEGRAM_CHAT_ID;

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
