/**
 * Centralized strategy landing copy — edit texts/price/CTAs here only.
 * Do not invent testimonials, stats, medical promises, or awards.
 */

export const STRATEGY_PRODUCT = {
  code: "personal_body_strategy",
  name: "Система тела 30",
  priceRub: 30_000,
  priceLabel: "30 000 ₽",
  currency: "RUB" as const,
  formats: ["online", "moscow_in_person"] as const,
  pagePath: "/strategy",
  canonicalUrl: "https://eg.egoshev.ru/strategy",
  policyUrl: "/policy",
  personalConsentUrl: "/personal",
  telegramPublicUrl: "https://t.me/EvgeniiGoshev",
  leadEndpoint: "/api/strategy/lead",
  sourcePage: "personal-body-strategy-landing",
  heroImage: "/strategy/hero-evgeny.webp",
  heroImageFallback: "/strategy/hero-evgeny.jpg",
} as const;

export type FormFieldOption = { value: string; label: string };

export type FormField =
  | {
      key: string;
      type: "text" | "tel" | "textarea";
      label: string;
      required?: boolean;
      placeholder?: string;
      autocomplete?: string;
      inputmode?: string;
      maxLength?: number;
      rows?: number;
    }
  | {
      key: string;
      type: "radio" | "checkbox";
      label: string;
      required?: boolean;
      options: FormFieldOption[];
      otherKey?: string;
      otherLabel?: string;
      otherMaxLength?: number;
      detailWhen?: string[];
      detailKey?: string;
      detailLabel?: string;
      detailRequired?: boolean;
      detailMaxLength?: number;
    }
  | {
      key: string;
      type: "consent";
      required: true;
    };

export type FormStep = {
  id: string;
  question: string;
  hint?: string;
  fields: FormField[];
  requireOneOf?: string[];
};

export const STRATEGY_CONTENT = {
  brand: {
    name: "ЕВГЕНИЙ ГОШЕВ",
    pillars: "Движение. Дыхание. Дисциплина.",
    brandPhrase: "Тебе нужен только ты",
    studio: "Атмосфера 3D",
  },

  seo: {
    title: "Система тела 30 — Евгений Гошев",
    description:
      "Функциональная оценка, двухчасовая сессия и персональный план движения, силовых, дыхания, восстановления и питания на 30 дней. Онлайн или очно в Москве.",
  },

  header: {
    cta: "Подать заявку",
  },

  hero: {
    eyebrow: "Функциональная оценка и персональный план на 30 дней",
    titleLine1: "Вашему телу нужна не ещё одна случайная тренировка.",
    titleLine2: "Ему нужна система.",
    body: "За одну глубокую сессию и 30 дней я выстрою персональный план движения, силовых тренировок, дыхания, восстановления и базового питания — под ваш график, состояние и доступный инвентарь.",
    bodyAccent:
      "«СИСТЕМА ТЕЛА 30» — это функциональная оценка, двухчасовая работа со мной и персональный календарь на каждый день месяца.",
    insights: [
      { text: "что сейчас происходит с вашим телом", icon: "scan" as const },
      { text: "какие зоны требуют внимания", icon: "focus" as const },
      { text: "с чего начать", icon: "start" as const },
      { text: "как сохранять дисциплину", icon: "discipline" as const },
    ],
    primaryCta: "Подать заявку на персональную систему",
    secondaryCta: "Получить план на 30 дней",
    priceLine: "30 000 ₽ · Онлайн или очно в Москве",
    photoAlt: "Евгений Гошев — специалист по комплексной работе с телом",
  },

  /** Bottom glass bar under hero */
  benefits: [
    {
      title: "Глубокая анкета",
      text: "Разбор образа жизни и запроса.",
      icon: "doc" as const,
    },
    {
      title: "Тест «20 движений»",
      text: "Функциональная оценка тела.",
      icon: "scan" as const,
    },
    {
      title: "Двухчасовая личная сессия",
      text: "Работа со мной один на один.",
      icon: "chat" as const,
    },
    {
      title: "Персональный PDF",
      text: "Все рекомендации в одном файле.",
      icon: "doc" as const,
    },
    {
      title: "План на 30 дней",
      text: "Календарь действий на месяц.",
      icon: "calendar" as const,
    },
  ],

  placeholders: [
    { id: "problem", title: "Проблема", note: "Секция будет наполнена позже" },
    { id: "result", title: "Результат", note: "Секция будет наполнена позже" },
    { id: "process", title: "Как проходит работа", note: "Секция будет наполнена позже" },
    { id: "inside", title: "Что внутри", note: "Секция будет наполнена позже" },
    { id: "expert", title: "Эксперт", note: "Секция будет наполнена позже" },
    { id: "price", title: "Стоимость", note: "Секция будет наполнена позже" },
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

  form: {
    title: "Заявка",
    progressLabel: "Шаг",
    back: "Назад",
    continue: "Продолжить",
    submit: "ОТПРАВИТЬ ЗАЯВКУ",
    closeLabel: "Закрыть форму",
    requiredHint: "Заполните поле, чтобы продолжить",
    contactRequired: "Укажите Telegram или телефон",
    consentRequired: "Нужно согласие на обработку данных",
    networkError: "Не удалось отправить. Проверьте соединение и попробуйте ещё раз.",
    retry: "Повторить отправку",
    successTitle: "Заявка отправлена",
    successText:
      "Спасибо. Мы изучим ваш запрос и свяжемся с вами, чтобы уточнить детали и определить следующий шаг.",
    successBack: "Вернуться на страницу",
    successTelegram: "Написать в Telegram",
    consentPrefix: "Я согласен на обработку персональных данных и принимаю",
    consentLinkLabel: "политику конфиденциальности",
    steps: [
      {
        id: "name",
        question: "Как вас зовут?",
        fields: [
          {
            key: "name",
            type: "text",
            label: "Имя",
            required: true,
            autocomplete: "name",
            maxLength: 80,
          },
        ],
      },
      {
        id: "age_city",
        question: "Сколько вам лет и в каком городе вы живёте?",
        fields: [
          {
            key: "age",
            type: "text",
            label: "Возраст",
            required: true,
            inputmode: "numeric",
            maxLength: 3,
          },
          {
            key: "city",
            type: "text",
            label: "Город",
            required: true,
            autocomplete: "address-level2",
            maxLength: 80,
          },
        ],
      },
      {
        id: "occupation",
        question: "Чем вы занимаетесь?",
        fields: [
          {
            key: "occupation",
            type: "radio",
            label: "Деятельность",
            required: true,
            options: [
              { value: "entrepreneur", label: "Предприниматель или руководитель" },
              { value: "office", label: "Офисная работа" },
              { value: "remote", label: "Удалённая работа" },
              { value: "physical", label: "Физическая работа" },
              { value: "sport", label: "Спорт" },
              { value: "other", label: "Другое" },
            ],
            otherKey: "occupationOther",
            otherLabel: "Уточните",
            otherMaxLength: 120,
          },
        ],
      },
      {
        id: "concerns",
        question: "Что сейчас беспокоит вас больше всего?",
        hint: "Можно выбрать несколько вариантов",
        fields: [
          {
            key: "concerns",
            type: "checkbox",
            label: "Запрос",
            required: true,
            options: [
              { value: "lower_back", label: "Поясница" },
              { value: "neck_shoulders", label: "Шея и плечи" },
              { value: "knees", label: "Колени" },
              { value: "feet", label: "Стопы" },
              { value: "stiffness", label: "Скованность тела" },
              { value: "weight", label: "Лишний вес или живот" },
              { value: "energy", label: "Недостаток энергии" },
              { value: "discipline", label: "Отсутствие дисциплины" },
              { value: "other", label: "Другое" },
            ],
            otherKey: "concernsOther",
            otherLabel: "Уточните",
            otherMaxLength: 200,
          },
        ],
      },
      {
        id: "goal",
        question: "Какой главный результат вы хотите получить?",
        fields: [
          {
            key: "goal",
            type: "radio",
            label: "Цель",
            required: true,
            options: [
              { value: "reduce_tension", label: "Уменьшить напряжение и скованность" },
              { value: "strong_functional", label: "Построить сильное и функциональное тело" },
              { value: "weight", label: "Снизить вес" },
              { value: "mobility", label: "Улучшить мобильность" },
              { value: "return_training", label: "Вернуться к регулярным тренировкам" },
              { value: "recovery_routine", label: "Наладить режим и восстановление" },
              { value: "clear_plan", label: "Получить чёткий персональный план" },
            ],
          },
        ],
      },
      {
        id: "training",
        question: "Тренируетесь ли вы сейчас?",
        fields: [
          {
            key: "training",
            type: "radio",
            label: "Тренировочный опыт",
            required: true,
            options: [
              { value: "regular", label: "Регулярно" },
              { value: "sometimes", label: "Время от времени" },
              { value: "long_break", label: "Давно не тренировался" },
              { value: "never_system", label: "Никогда не тренировался системно" },
            ],
          },
        ],
      },
      {
        id: "limits",
        question: "Есть ли серьёзные заболевания, травмы, операции или ограничения?",
        fields: [
          {
            key: "limits",
            type: "radio",
            label: "Ограничения",
            required: true,
            options: [
              { value: "none", label: "Нет" },
              { value: "yes", label: "Есть" },
              { value: "exam", label: "Сейчас прохожу обследование" },
            ],
            detailWhen: ["yes", "exam"],
            detailKey: "limitsDetail",
            detailLabel: "Кратко опишите",
            detailRequired: true,
            detailMaxLength: 500,
          },
        ],
      },
      {
        id: "why_now",
        question: "Почему вы решили заняться своим телом именно сейчас?",
        fields: [
          {
            key: "motivation",
            type: "textarea",
            label: "Почему сейчас",
            required: true,
            maxLength: 1000,
            rows: 5,
          },
        ],
      },
      {
        id: "when_start",
        question: "Когда вы готовы начать?",
        fields: [
          {
            key: "startWhen",
            type: "radio",
            label: "Срок начала",
            required: true,
            options: [
              { value: "days", label: "В ближайшие дни" },
              { value: "two_weeks", label: "В течение двух недель" },
              { value: "month", label: "В течение месяца" },
              { value: "exploring", label: "Пока изучаю варианты" },
            ],
          },
        ],
      },
      {
        id: "readiness",
        question:
          "Стоимость персональной работы составляет 30 000 ₽. Насколько вы готовы к такой инвестиции?",
        fields: [
          {
            key: "readiness",
            type: "radio",
            label: "Готовность к стоимости",
            required: true,
            options: [
              { value: "ready", label: "Готов начать" },
              { value: "ready_clarify", label: "Готов, но хочу уточнить детали" },
              { value: "not_ready", label: "Пока не готов" },
              { value: "cheaper", label: "Рассматриваю более доступный формат" },
            ],
          },
        ],
      },
      {
        id: "contacts",
        question: "Как с вами связаться?",
        hint: "Укажите хотя бы один способ связи",
        fields: [
          {
            key: "telegram",
            type: "text",
            label: "Telegram",
            required: false,
            placeholder: "@username или ссылка",
            autocomplete: "username",
            maxLength: 80,
          },
          {
            key: "phone",
            type: "tel",
            label: "Телефон",
            required: false,
            autocomplete: "tel",
            maxLength: 40,
          },
        ],
        requireOneOf: ["telegram", "phone"],
      },
      {
        id: "consent",
        question: "Согласие на обработку данных",
        fields: [{ key: "consent", type: "consent", required: true }],
      },
    ] as FormStep[],
  },

  footer: {
    note: "Движение. Дыхание. Дисциплина.",
    brandPhrase: "Тебе нужен только ты",
  },
};
