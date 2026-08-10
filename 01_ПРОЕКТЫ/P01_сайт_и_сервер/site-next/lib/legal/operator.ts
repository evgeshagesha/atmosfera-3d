/** Реквизиты исполнителя для юридических страниц сайта. */
export const LEGAL_OPERATOR = {
  fullName: "Гошев Евгений Николаевич",
  status: "самозанятый (плательщик налога на профессиональный доход)",
  inn: "366224223508",
  brand: "Атмосфера 3D",
  sites: ["https://egoshev.ru", "https://eg.egoshev.ru"],
  telegram: "https://t.me/EGoshev",
  channel: "https://t.me/EvgeniiGoshev",
  bot: "https://t.me/EGoshev_bot",
  form: "https://egoshev.ru/anketaplan",
  studioMaps: "https://yandex.ru/maps/-/CTu240~o",
  city: "Москва",
  updated: "10.08.2026",
} as const;

/** Актуальные публичные цены (синхрон с products.yaml / Mini App). */
export const LEGAL_PRODUCTS = [
  {
    name: "Гайд «С чего начинать работу с телом» + функциональная зарядка EG 3D",
    price: "бесплатно",
    url: "https://egoshev.ru/gaid",
  },
  {
    name: "Онлайн-тест тела (оценка и персональный план действий)",
    price: "684 ₽",
    url: "https://egoshev.ru/testik",
  },
  {
    name: "Мини-программа «Дыхание и осанка»",
    price: "1 990 ₽",
    url: "https://egoshev.ru/dyhanieosanka",
  },
  {
    name: "Курс «Базовая настройка тела»",
    price: "9 990 ₽",
    url: "https://egoshev.ru/baza",
  },
  {
    name: "Онлайн-клуб «Атмосфера 3D» (подписка)",
    price: "от 1 758 ₽ / месяц",
    url: "https://egoshev.ru/club",
  },
  {
    name: "Персональная стратегия тела (30 дней)",
    price: "30 000 ₽",
    url: "https://eg.egoshev.ru/strategy",
  },
  {
    name: "Личная онлайн-консультация (2 часа)",
    price: "20 000 ₽",
    url: "https://egoshev.ru/anketaplan",
  },
  {
    name: "Личный приём в студии (Москва)",
    price: "по согласованию после анкеты",
    url: "https://egoshev.ru/anketaplan",
  },
] as const;
