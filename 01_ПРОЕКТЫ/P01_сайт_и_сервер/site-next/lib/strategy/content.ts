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
  | "check"
  | "medal"
  | "users"
  | "timer"
  | "arm"
  | "eye"
  | "clipboard";

/** Zero-Copy from 03_РЕСУРСЫ/config/products.yaml → personal_body_strategy.price_rub */
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
  homeUrl: "https://eg.egoshev.ru",
  policyUrl: "/policy",
  ofertaUrl: "/oferta",
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
  offerPortrait: "/strategy/step4-evgeny.webp",
  offerPortraitFallback: "/strategy/step4-evgeny.jpg",
  howImages: {
    anketa: "/strategy/step3-anketa.webp",
    anatomy: "/strategy/step3-anatomy.webp",
    plan: "/strategy/step3-plan.webp",
  },
} as const;

export const STRATEGY_CONTENT = {
  brand: {
    name: "EG",
    pillars: "Движение. Дыхание. Дисциплина.",
    brandPhrase: "Тебе нужен только ты",
    studio: "Атмосфера 3D",
  },

  seo: {
    title: "Персональная стратегия тела на 30 дней — Евгений Гошев",
    description:
      "Персональный план на 30 дней: диагностика, 2-часовая сессия и система движения, восстановления, питания и дисциплины под ваш график. Онлайн или очно в Москве. 30 000 ₽.",
    ogTitle: "30 дней персональной стратегии тела | Евгений Гошев",
    ogDescription:
      "Не универсальный курс — ваша система на каждый день. Анкета, разбор и план под тело, цели и ритм жизни.",
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
    primaryCta: "Начать",
    trustBefore: "Пролистайте ниже — увидите систему, путь и оффер.",
    trustLink: "",
    trustAfter: "",
    badges: [
      { text: "Онлайн / очно", icon: "monitor" as const },
      { text: "Индивидуально", icon: "person" as const },
      { text: "Конфиденциально", icon: "shield" as const },
    ],
    photoAlt: "Евгений Гошев — специалист по комплексной работе с телом",
    secondaryCta: "Начать путь",
    priceLine: "30 000 ₽ · Онлайн или очно в Москве",
  },

  plan: {
    id: "step2",
    eyebrow: "ШАГ 2",
    title: "КАК ПРОХОДЯТ 30 ДНЕЙ",
    subtitle: "ВАША СИСТЕМА. ВАШ РИТМ. ВАШ РЕЗУЛЬТАТ.",
    body: [
      "Это не просто курс и не набор упражнений.",
      "Это персональная система, созданная специально для вас.",
      "Каждый день имеет свою задачу. Вместе они дают результат.",
    ],
    notebookAlt: "Блокнот «План на 30 дней»",
    pillars: [
      {
        title: "ПЕРСОНАЛЬНО",
        text: "План строится под ваше тело, цели, образ жизни и возможности.",
        icon: "person" as const,
      },
      {
        title: "СИСТЕМНО",
        text: "Каждый день имеет задачу и логично ведёт к результату.",
        icon: "cycle" as const,
      },
      {
        title: "ПРОГРЕССИВНО",
        text: "Нагрузка и задачи адаптируются под ваш прогресс и состояние.",
        icon: "chart" as const,
      },
      {
        title: "ЭФФЕКТИВНО",
        text: "Минимум времени в день — максимальный результат.",
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
        highlightCells: [] as number[],
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
        highlightCells: [3],
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
    footerLead: "ЭТО НЕ ПРОСТО ПЛАН. ЭТО ВАША ПЕРСОНАЛЬНАЯ СИСТЕМА НА 30 ДНЕЙ.",
    footerAccent: "СОЗДАНА ДЛЯ РЕЗУЛЬТАТА. ПОДСТРОЕНА ПОД ВАШУ ЖИЗНЬ.",
    stats: [
      {
        title: "МИНИМУМ ВРЕМЕНИ",
        text: "30–60 минут в день",
        icon: "timer" as const,
      },
      {
        title: "МАКСИМУМ РЕЗУЛЬТАТА",
        text: "через систему",
        icon: "arm" as const,
      },
      {
        title: "ФОКУС НА ВАС",
        text: "ваше тело, ваш темп",
        icon: "target" as const,
      },
      {
        title: "УСТОЙЧИВЫЙ РЕЗУЛЬТАТ",
        text: "на годы вперёд",
        icon: "medal" as const,
      },
    ],
  },

  how: {
    id: "step3",
    eyebrow: "ШАГ 3",
    title: "КАК ЭТО ПРОХОДИТ",
    subtitle: "ВСЕГО 3 ШАГА ОТ АНКЕТЫ ДО ВАШЕГО ПЛАНА НА 30 ДНЕЙ",
    steps: [
      {
        num: "01",
        title: "ЗАПОЛНЯЕТЕ АНКЕТУ",
        text: "11 блоков о вашем теле, образе жизни, нагрузках, питании, сне и целях. Это занимает 15–20 минут, но даёт мне полную картину именно о вас.",
        check: "Честные ответы = точный план под вас",
        icon: "clipboard" as const,
        imageKey: "anketa" as const,
        imageAlt: "Телефон с экраном анкеты на тёмном фоне",
      },
      {
        num: "02",
        title: "ПРОХОДИМ 2-ЧАСОВУЮ ИНДИВИДУАЛЬНУЮ СЕССИЮ",
        text: "Разбираем движение, тестируем ключевые функции тела, выявляем ограничения, сильные стороны и приоритеты. Отвечаю на все ваши вопросы.",
        check: "Глубокая диагностика и разбор без спешки",
        icon: "person" as const,
        imageKey: "anatomy" as const,
        imageAlt: "Блокнот с анатомическими заметками и ручкой",
      },
      {
        num: "03",
        title: "ПОЛУЧАЕТЕ ПЕРСОНАЛЬНЫЙ ПЛАН НА 30 ДНЕЙ",
        text: "Пошаговая система на каждый день: движение, восстановление, питание, сон, привычки и контроль прогресса. Всё подстроено под вашу жизнь.",
        check: "Готовая система. Остаётся только выполнять",
        icon: "calendar30" as const,
        imageKey: "plan" as const,
        imageAlt: "Блокнот «План на 30 дней»",
      },
    ],
    bannerLead: "ВЫ ПОЛУЧАЕТЕ НЕ СОВЕТЫ.",
    bannerAccent: "ВЫ ПОЛУЧАЕТЕ СВОЮ СИСТЕМУ НА 30 ДНЕЙ, СОЗДАННУЮ ЛИЧНО ДЛЯ ВАС.",
    bannerSub:
      "Это не универсальный курс. Это ваш персональный маршрут к сильному, здоровому и функциональному телу.",
  },

  offer: {
    id: "step4",
    eyebrow: "ШАГ 4",
    titleLine1: "Начни менять",
    titleLine2: "свою жизнь прямо сейчас",
    body: "Вы получаете не просто план. Вы получаете систему, которая перестроит ваше тело, привычки и состояние на новый уровень.",
    benefits: [
      {
        title: "ПОЛНЫЙ ФОКУС",
        text: "только на вашем теле и задачах",
        icon: "target" as const,
      },
      {
        title: "ПОДДЕРЖКА ЭКСПЕРТА",
        text: "я с вами на связи на каждом этапе",
        icon: "person" as const,
      },
      {
        title: "РАБОТАЕТ В РЕАЛЬНОЙ ЖИЗНИ",
        text: "без жёстких ограничений и срывов",
        icon: "shield" as const,
      },
      {
        title: "РЕЗУЛЬТАТ, КОТОРЫЙ ОЩУЩАЕТСЯ",
        text: "больше энергии, силы и уверенности",
        icon: "chart" as const,
      },
    ],
    cardTitle: "ПЕРСОНАЛЬНАЯ СТРАТЕГИЯ ТЕЛА",
    perDayBox: "1 000 ₽ В ДЕНЬ",
    perDayNote: "за вашу персональную систему и новые результаты",
    checklist: [
      {
        title: "Анкета из 11 блоков",
        text: "полная картина о вас и вашем теле",
      },
      {
        title: "2 часа персональной сессии",
        text: "диагностика, разбор, ответы на вопросы",
      },
      {
        title: "Персональная стратегия",
        text: "под ваши цели, тело и образ жизни",
      },
      {
        title: "План на каждый день на 30 дней",
        text: "движение, восстановление, питание, сон, привычки и контроль прогресса",
      },
      {
        title: "Поддержка и ответы на вопросы",
        text: "на протяжении всего месяца",
      },
    ],
    cta: "Начать путь",
    trust: "Оставьте заявку — я или моя команда свяжемся с вами и расскажем, как начать.",
    quote: "Я ДАМ ВАМ СИСТЕМУ. ВАША ЗАДАЧА — ВЫПОЛНЯТЬ ЕЁ КАЖДЫЙ ДЕНЬ.",
    quoteSub:
      "Дайте мне 30 дней, чтобы изменить ваше отношение к телу и показать, на что вы действительно способны.",
    portraitAlt: "Евгений Гошев — руки скрещены, уверенный портрет",
    bio: [
      { text: "ПРОФЕССИОНАЛЬНЫЙ СПОРТСМЕН", icon: "walk" as const },
      {
        text: "ФИЗИЧЕСКИЙ ТЕРАПЕВТ И СПЕЦИАЛИСТ ПО БИОМЕХАНИКЕ",
        icon: "person" as const,
      },
      { text: "БОЛЕЕ 20 ЛЕТ В СПОРТЕ", icon: "medal" as const },
      {
        text: "500+ КЛИЕНТОВ ИЗМЕНИЛИ СВОЁ ТЕЛО И ЖИЗНЬ",
        icon: "users" as const,
      },
    ],
    footerLine: "30 ДНЕЙ МОГУТ СТАТЬ ЛУЧШИМ МЕСЯЦЕМ ВАШЕЙ ЖИЗНИ.",
    footerAccent: "НАЧНИТЕ ПРЯМО СЕЙЧАС.",
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

  footer: {
    note: "Движение. Дыхание. Дисциплина.",
    brandPhrase: "Тебе нужен только ты",
    links: [
      { href: "/policy", label: "Политика конфиденциальности" },
      { href: "/oferta", label: "Оферта" },
      { href: "/personal", label: "Согласие на обработку ПДн" },
    ],
  },
};
