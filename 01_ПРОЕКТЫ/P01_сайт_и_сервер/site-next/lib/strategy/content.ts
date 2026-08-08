/**
 * Centralized strategy landing copy — edit texts/price/CTAs here only.
 * Do not invent testimonials, stats, medical promises, or awards.
 */

export type StrategyIconName =
  | "person"
  | "calendar"
  | "calendar30"
  | "chat"
  | "doc"
  | "support"
  | "scan"
  | "focus"
  | "start"
  | "discipline"
  | "target"
  | "chart"
  | "lock"
  | "monitor"
  | "shield"
  | "cycle"
  | "bolt"
  | "walk"
  | "dumbbell"
  | "wave"
  | "lungs"
  | "heart"
  | "utensils"
  | "star"
  | "check";

export const STRATEGY_PRODUCT = {
  code: "personal_body_strategy",
  name: "Персональная стратегия тела",
  priceRub: 30_000,
  priceLabel: "30 000 ₽",
  pricePerDayLabel: "1 000 ₽",
  currency: "RUB" as const,
  formats: ["online", "moscow_in_person"] as const,
  pagePath: "/strategy",
  canonicalUrl: "https://eg.egoshev.ru/strategy",
  policyUrl: "/policy",
  personalConsentUrl: "/personal",
  anketaplanUrl: "https://eg.egoshev.ru/anketaplan",
  telegramPublicUrl: "https://t.me/EvgeniiGoshev",
  leadEndpoint: "/api/strategy/lead",
  sourcePage: "personal-body-strategy-landing",
  heroImage: "/strategy/hero-evgeny-v3.webp",
  heroImageFallback: "/strategy/hero-evgeny-v3.jpg",
  logoImage: "/strategy/logo-eg.webp",
  logoImagePng: "/strategy/logo-eg.png",
  notebookImage: "/strategy/plan-notebook.webp",
} as const;

export const STRATEGY_CONTENT = {
  brand: {
    name: "EG",
    pillars: "Движение. Дыхание. Дисциплина.",
    brandPhrase: "Тебе нужен только ты",
    studio: "Атмосфера 3D",
  },

  seo: {
    title: "Персональная стратегия тела — Евгений Гошев",
    description:
      "Персональный план на 30 дней: движение, восстановление, питание и дисциплина. Диагностика, разбор и система под ваш график и цели. Онлайн или очно в Москве.",
  },

  header: {
    cta: "Начать",
    menuLabel: "Меню",
  },

  hero: {
    eyebrow: "Персональная стратегия тела",
    titleLine1: "30 дней,",
    titleLine2: "которые изменят вашу жизнь",
    body: "Я составлю ваш персональный план на каждый день — движение, восстановление, питание и дисциплина, подстроенные под вас, ваш график и ваши цели.",
    features: [
      {
        title: "План на 30 дней",
        text: "готовая система на каждый день",
        icon: "calendar30" as const,
      },
      {
        title: "Индивидуальный подход",
        text: "под ваши цели и возможности",
        icon: "person" as const,
      },
      {
        title: "Диагностика и разбор",
        text: "2 часа со мной, ответы на вопросы",
        icon: "target" as const,
      },
      {
        title: "Реальный результат",
        text: "больше энергии, силы и контроля",
        icon: "chart" as const,
      },
    ],
    priceLabel: "Стоимость",
    pricePerDaySuffix: "в день",
    primaryCta: "Начать свои 30 дней",
    trustBefore: "Оставьте контакты ниже — я или моя команда свяжется с вами и расскажет, как начать.",
    trustLink: "",
    trustAfter: "",
    badges: [
      { text: "Онлайн / очно", icon: "monitor" as const },
      { text: "Индивидуально", icon: "person" as const },
      { text: "Конфиденциально", icon: "shield" as const },
    ],
    photoAlt: "Евгений Гошев — специалист по комплексной работе с телом",
    secondaryCta: "Получить свои 30 дней",
    priceLine: "30 000 ₽ · Онлайн или очно в Москве",
  },

  plan: {
    id: "plan",
    title: "ПЛАН НА 30 ДНЕЙ",
    subtitle: "ПЕРСОНАЛЬНАЯ СИСТЕМА НА КАЖДЫЙ ДЕНЬ",
    body: "Движение, питание, восстановление и привычки, подстроенные под ваш ритм жизни и цели.",
    notebookAlt: "Блокнот «План на 30 дней»",
    features: [
      {
        title: "30 ДНЕЙ",
        text: "структурированной работы",
        icon: "calendar30" as const,
      },
      {
        title: "ИНДИВИДУАЛЬНО",
        text: "под ваше тело, цели и возможности",
        icon: "person" as const,
      },
      {
        title: "СИСТЕМА НА КАЖДЫЙ ДЕНЬ",
        text: "движение, восстановление, питание и режим",
        icon: "cycle" as const,
      },
      {
        title: "РЕАЛЬНЫЙ ПРОГРЕСС",
        text: "контроль, корректировка и поддержка",
        icon: "chart" as const,
      },
      {
        title: "БОЛЬШЕ ЭНЕРГИИ",
        text: "лучшее самочувствие и результат",
        icon: "bolt" as const,
      },
    ],
    weekTitle: "ПРИМЕР ВАШЕГО ПЛАНА НА НЕДЕЛЮ",
    weekHint: "Каждый день имеет свою задачу. Вместе они дают результат.",
    dayTitle: "ПРИМЕР ВАШЕГО ПЛАНА НА ДЕНЬ",
    days: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"] as const,
    highlightDayIndex: 3, // ЧТ
    rows: [
      {
        key: "movement",
        label: "ДВИЖЕНИЕ",
        icon: "walk" as const,
        cells: [
          "Функциональная тренировка",
          "Ходьба 8-10 тыс. шагов",
          "Мобильность + растяжка",
          "Сила и стабильность",
          "Функциональная тренировка",
          "Активное движение",
          "Восстановление и прогулка",
        ],
        highlightCells: [3],
      },
      {
        key: "strength",
        label: "СИЛА",
        icon: "dumbbell" as const,
        cells: [
          "Верх тела",
          "Низ тела",
          "Корпус и стабилизация",
          "Верх тела",
          "Низ тела",
          "Смешанная тренировка",
          "Лёгкая активность",
        ],
        highlightCells: [] as number[],
      },
      {
        key: "mobility",
        label: "МОБИЛЬНОСТЬ",
        icon: "wave" as const,
        cells: [
          "Грудной отдел и плечи",
          "Тазобедренные суставы",
          "Голеностоп и стопы",
          "Позвоночник и таз",
          "Плечи и лопатки",
          "Весь корпус",
          "Лёгкая мобильность",
        ],
        highlightCells: [] as number[],
      },
      {
        key: "breath",
        label: "ДЫХАНИЕ",
        icon: "lungs" as const,
        cells: [
          "Утром 10 мин",
          "Днём 5 мин",
          "Вечером 10 мин",
          "Утром 10 мин",
          "Днём 5 мин",
          "Вечером 10 мин",
          "Дыхательная практика",
        ],
        highlightCells: [3],
      },
      {
        key: "recovery",
        label: "ВОССТАНОВЛЕНИЕ",
        icon: "heart" as const,
        cells: [
          "Растяжка и расслабление",
          "Массаж или МФР",
          "Сон не менее 7 ч",
          "Контраст или баня",
          "Растяжка и расслабление",
          "Массаж или МФР",
          "Полный отдых",
        ],
        highlightCells: [] as number[],
      },
      {
        key: "nutrition",
        label: "ПИТАНИЕ И РЕЖИМ",
        icon: "utensils" as const,
        cells: [
          "Баланс белков и жиров",
          "Много воды 2–3 л",
          "Контроль сахара",
          "Полноценный завтрак",
          "Чистые продукты",
          "Контроль порций",
          "Режим и планирование",
        ],
        highlightCells: [] as number[],
      },
    ],
    footerLead: "Это не просто план. Это ваша персональная система на 30 дней.",
    footerAccent: "Создана для результата. Подстроена под вашу жизнь.",
    cta: "Получить свои 30 дней",
  },

  lead: {
    id: "lead",
    title: "СДЕЛАЙТЕ ПЕРВЫЙ ШАГ",
    body: "Оставьте контакты. Я или моя команда свяжемся с вами, уточним вашу задачу и расскажем, как начать персональную работу.",
    fields: {
      name: { label: "Ваше имя", placeholder: "Как к вам обращаться", required: true },
      contact: {
        label: "Телефон или Telegram",
        placeholder: "+7… или @username",
        required: true,
      },
      contactMethod: { label: "Как удобнее связаться?", required: true },
      goal: {
        label: "Что хотите изменить?",
        placeholder: "Кратко о задаче — по желанию",
        required: false,
      },
    },
    contactMethods: [
      { value: "telegram", label: "Telegram" },
      { value: "whatsapp", label: "WhatsApp" },
      { value: "vk", label: "VK" },
      { value: "instagram", label: "Instagram" },
      { value: "call", label: "Звонок" },
    ],
    submit: "ОТПРАВИТЬ ЗАЯВКУ",
    sending: "Отправляем…",
    consentPrefix: "Я даю согласие на обработку персональных данных и принимаю",
    consentPolicy: "Политику конфиденциальности",
    consentPersonal: "Согласие на ПДн",
    errors: {
      name: "Укажите имя",
      contact: "Укажите телефон или Telegram",
      contactMethod: "Выберите удобный способ связи",
      consent: "Нужно согласие на обработку данных",
      network: "Не удалось отправить. Проверьте соединение и попробуйте ещё раз.",
    },
    success: {
      title: "ЗАЯВКА ПРИНЯТА",
      line1: "Первый шаг сделан.",
      line2:
        "Я или моя команда свяжемся с вами, чтобы обсудить вашу задачу и определить дальнейшие действия.",
      line3: "До встречи.",
      signature: "Евгений Гошев",
    },
  },

  placeholders: [
    { id: "result", title: "Результат", note: "Секция будет наполнена позже" },
    { id: "process", title: "Как проходит работа", note: "Секция будет наполнена позже" },
    { id: "inside", title: "Что внутри", note: "Секция будет наполнена позже" },
    { id: "expert", title: "Эксперт", note: "Секция будет наполнена позже" },
    { id: "faq", title: "Вопросы", note: "Секция будет наполнена позже" },
  ],

  expertBrief: [
    "Профессиональный спортсмен",
    "Более 15 лет внутри профессиональной спортивной системы",
    "Специалист по комплексной работе с телом",
    "Движение, дыхание, сила, мобильность и восстановление",
    "Система под реальную жизнь — не жизнь в зале",
    "Сначала качество движения, затем сила",
  ],

  productIncludes: [
    "предварительный анализ анкеты",
    "оценка образа жизни и состояния тела",
    "разбор теста «20 движений»",
    "двухчасовая личная сессия",
    "запись встречи",
    "персональный PDF",
    "индивидуальный план на 30 дней",
    "силовые тренировки, мобильность, дыхание, самомассаж, восстановление",
    "базовые рекомендации по питанию",
    "правила действий в дни усталости",
    "семь дней для уточняющих вопросов",
  ],

  footer: {
    note: "Движение. Дыхание. Дисциплина.",
    brandPhrase: "Тебе нужен только ты",
  },
};
