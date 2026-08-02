/** Route slug for the homepage (`/`). */
export const HOME_ROUTE = "" as const;

/**
 * Homepage migration status.
 * Update `version` when shipping visual or structural changes to `/`.
 */
export const HOME_PAGE_STATUS = {
  ready: true,
  version: "1.4.0",
  label: "hero-about-v2",
  blocksTotal: 21,
  blocksNamed: 14,
  blocksDividers: 7,
  updatedAt: "2026-07-24",
} as const;

/** Named React blocks — edit these files when changing homepage content or layout. */
export const HOME_NAMED_BLOCKS = [
  { id: "rec2034125441", name: "SiteHeader", path: "components/home/blocks/SiteHeader" },
  { id: "rec2315596141", name: "HeroSection", path: "components/home/blocks/HeroSection" },
  { id: "rec2191858991", name: "MarqueeSection", path: "components/home/blocks/MarqueeSection" },
  { id: "rec2169195921", name: "BlogSection", path: "components/home/blocks/BlogSection" },
  { id: "rec2034125511", name: "FormatsSection", path: "components/home/blocks/FormatsSection" },
  { id: "rec2224175751", name: "GallerySection", path: "components/home/blocks/GallerySection" },
  { id: "rec2191126061", name: "ContactFormSection", path: "components/home/blocks/ContactFormSection" },
  { id: "rec2038650181", name: "StudioSection", path: "components/home/blocks/StudioSection" },
  { id: "rec2040539251", name: "AudienceIntroSection", path: "components/home/blocks/AudienceIntroSection" },
  { id: "rec2191985091", name: "YandexRatingSection", path: "components/home/blocks/YandexRatingSection" },
  { id: "rec2097875471", name: "MoreReviewsButtonSection", path: "components/home/blocks/MoreReviewsButtonSection" },
  { id: "rec2034125521", name: "AboutSection", path: "components/home/blocks/AboutSection" },
  { id: "rec2038979781", name: "AboutCtaSection", path: "components/home/blocks/AboutCtaSection" },
  { id: "rec2039329591", name: "SiteFooter", path: "components/home/blocks/SiteFooter" },
] as const;

/** Shared runtime used only on the homepage (no Tilda artboard JS). */
export const HOME_RUNTIME = {
  artboardScripts: false,
  legacyInteractivity: true,
  tAnimate: true,
  stylesheets: "data/index.json → public/styles/legacy/css",
} as const;

/** Check before deploy. */
export const HOME_DEPLOY_NOTES = [
  "Форма контактов: нужны TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в .env",
  "Админка: ADMIN_PASSWORD обязателен в .env (без пароля вход закрыт)",
  "Блог: data/blog.json, управление в /admin/blog",
  "Стили: legacy CSS из public/styles/legacy/css (без Tilda CDN)",
] as const;
