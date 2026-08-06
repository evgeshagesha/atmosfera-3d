/**
 * Runtime / product config — change here first.
 * Secrets (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) live only in server .env — never here.
 */
window.SITE_CONFIG = {
  productCode: "personal_body_strategy",
  priceRub: 30000,
  priceLabel: "30 000 ₽",
  currency: "RUB",
  formats: ["online", "moscow_in_person"],
  canonicalUrl: "https://eg.egoshev.ru/personalnaya-strategiya-tela",
  policyUrl: "https://eg.egoshev.ru/policy",
  personalConsentUrl: "https://eg.egoshev.ru/personal",
  /** Public Telegram profile — not the bot token */
  telegramPublicUrl: "https://t.me/EvgeniiGoshev",
  leadEndpoint: "/api/lead",
  sourcePage: "personal-body-strategy-landing",
  heroImage: "assets/hero-evgeny.webp",
  heroImageFallback: "assets/hero-evgeny.jpg",
};
