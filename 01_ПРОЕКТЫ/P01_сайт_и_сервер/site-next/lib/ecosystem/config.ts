/**
 * Продуктовая экосистема «Атмосфера 3D» — источник правды по ТЗ v1.0 (июль 2026).
 * Маршрут: гайд → тест → дыхание и осанка → курс → клуб → персональная работа.
 */

export type EcosystemProductStatus = "live" | "building" | "planned";

export type EcosystemProduct = {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  href?: string;
  cta: string;
  status: EcosystemProductStatus;
  botTag?: string;
};

export type EcosystemQuickLink = {
  label: string;
  description: string;
  href: string;
  accent?: boolean;
};

export type EcosystemSocialLink = {
  label: string;
  href: string;
};

export type EcosystemPhase = {
  id: string;
  title: string;
  items: string[];
  ready: boolean;
};

export const ECOSYSTEM_TAGLINE = "Движение. Дыхание. Дисциплина.";

export const ECOSYSTEM_RESULT =
  "Из скованности и хаоса — к свободе движения и регулярным тренировкам с удовольствием.";

/** Основная продуктовая лестница — один маршрут на сайте, в боте и на оплате. */
/** Цены публичные — сверка с products.yaml / Tilda. Не выдумывать. */
export const ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
  {
    id: "guide",
    step: 1,
    title: "Гайд + функциональная зарядка EG 3D",
    subtitle: "Вход через кодовое слово ТЕЛО (ChatPlace). С чего начинать работу с телом.",
    price: "Бесплатно",
    href: "/gaid",
    cta: "Получить гайд",
    status: "live",
    botTag: "guide_received",
  },
  {
    id: "test",
    step: 2,
    title: "Онлайн-тест тела",
    subtitle: "20 движений, оценка и персональный план действий.",
    price: "684 ₽",
    href: "https://egoshev.ru/testik",
    cta: "Пройти тест",
    status: "live",
    botTag: "test_bought",
  },
  {
    id: "breathing",
    step: 3,
    title: "Дыхание и осанка",
    subtitle: "Мини-программа: дыхание, грудная клетка, более устойчивое положение тела.",
    price: "1 990 ₽",
    href: "/anketa",
    cta: "Начать программу",
    status: "live",
    botTag: "mini_bought",
  },
  {
    id: "course",
    step: 4,
    title: "Базовая настройка тела",
    subtitle: "Пошаговая программа: подвижность, дыхание, качество движения.",
    price: "9 990 ₽",
    href: "https://egoshev.ru/baza",
    cta: "К программе",
    status: "live",
    botTag: "course_bought",
  },
  {
    id: "club",
    step: 5,
    title: "Клуб Атмосфера 3D",
    subtitle: "Регулярные тренировки, поддержка и сообщество. Оплата: Tribute.",
    price: "1 758 ₽ / мес.",
    priceNote: "Также периоды 3 и 6 месяцев в Tribute",
    href: "https://egoshev.ru/club",
    cta: "Вступить в клуб",
    status: "live",
    botTag: "club_active",
  },
  {
    id: "personal",
    step: 6,
    title: "Личная онлайн-консультация",
    subtitle: "2 часа · разбор запроса и план работы с телом.",
    price: "20 000 ₽",
    href: "https://egoshev.ru/anketaplan",
    cta: "Заполнить анкету",
    status: "live",
    botTag: "high_ticket_lead",
  },
];

export const ECOSYSTEM_QUICK_LINKS: EcosystemQuickLink[] = [
  {
    label: "Главный сайт",
    description: "Полная витрина: метод, отзывы, блог, студия",
    href: "/",
  },
  {
    label: "Записаться на приём",
    description: "Личный разбор и подбор формата",
    href: "/anketa",
    accent: true,
  },
  {
    label: "Студия в Москве",
    description: "Очный приём и диагностика",
    href: "/#rec2038650181",
  },
  {
    label: "Онлайн-форматы",
    description: "Тренировки и программы из любой точки",
    href: "/#online",
  },
  {
    label: "Все услуги",
    description: "Консультации, сопровождение, пакеты",
    href: "/uslugi",
  },
];

export const ECOSYSTEM_SOCIAL_LINKS: EcosystemSocialLink[] = [
  { label: "Telegram", href: "https://t.me/EGoshev" },
  { label: "ВКонтакте", href: "https://vk.ru/egoshevclub" },
  { label: "YouTube", href: "https://www.youtube.com/@EGoshev" },
];

/** Этапы реализации из ТЗ — для админки и планирования. */
export const ECOSYSTEM_PHASES: EcosystemPhase[] = [
  {
    id: "core",
    title: "Этап 1 — Ядро воронки",
    ready: false,
    items: [
      "Тест 21 движение + PDF по 5 зонам",
      "Мини-продукт «Дыхание и осанка»",
      "Оплата Prodamus и автовыдача доступов",
      "Зачёт 1 990 ₽ в курс в течение 10 дней",
      "Telegram-бот: теги, напоминания, один CTA на экран",
    ],
  },
  {
    id: "club",
    title: "Этап 2 — Клуб и регулярность",
    ready: false,
    items: [
      "Подписка 1 / 3 / 12 месяцев с автопродлением",
      "Каталог тренировок и навигация в клубе",
      "Оффер клуба после курса (990 ₽ первый месяц)",
      "Kinescope + LMS: сроки доступа и прогресс",
    ],
  },
  {
    id: "scale",
    title: "Этап 3 — Масштаб",
    ready: false,
    items: [
      "CRM и сквозная аналитика (UTM, источники)",
      "Сегментация и персональные ветки в боте",
      "Куратор в клубе",
      "Премиальная ветка и студия",
    ],
  },
];

export const ECOSYSTEM_METRICS = [
  "Тест завершили > 70%",
  "Тест → мини: 10–20%",
  "Мини → курс: 10–25%",
  "Курс → клуб: 20–40%",
];

export const ECOSYSTEM_DO_NOT_BUILD = [
  "Отдельный курс по МФР",
  "Пять локальных мини-курсов",
  "Платный VSL-урок",
  "Пожизненный клуб за 5 990 ₽",
  "Миграция платформы без списка требований",
  "Ручная выдача результатов и доступов",
];

export function getLiveProducts(): EcosystemProduct[] {
  return ECOSYSTEM_PRODUCTS.filter((product) => product.status === "live");
}

export function getProductById(id: string): EcosystemProduct | undefined {
  return ECOSYSTEM_PRODUCTS.find((product) => product.id === id);
}
