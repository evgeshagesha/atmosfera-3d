import type { Metadata } from "next";

import JsonLd from "@/components/seo/JsonLd";
import ServiceMoneyLanding from "@/components/seo/ServiceMoneyLanding";
import "@/components/seo/service-money.css";

const TITLE =
  "Персональные тренировки в Москве — Евгений Гошев | Атмосфера 3D";
const DESCRIPTION =
  "Персональные тренировки в Москве: сначала качество движения и база, затем нагрузка. Студия Атмосфера 3D у м. Савёловская — запись через анкету.";
const CANONICAL = "/personalnye-trenirovki-moskva";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: "website",
    locale: "ru_RU",
    siteName: "Евгений Гошев | Атмосфера 3D",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const FAQ = [
  {
    question: "Чем персональная тренировка у вас отличается от обычного зала?",
    answer:
      "Мы не гоним объём ради объёма. Сначала оцениваем движение, дыхание и ограничения, затем собираем базу и уже поверх неё даём нагрузку. Зал может быть частью пути — но не вместо системы.",
  },
  {
    question: "Нужен ли опыт тренировок?",
    answer:
      "Нет. Формат подходит и тем, кто давно тренируется, и тем, кто возвращается к движению после паузы. Важно честно описать запрос в анкете.",
  },
  {
    question: "Это только силовые тренировки?",
    answer:
      "Нет. В работе соединяются оценка, мобильность, дыхание, контроль корпуса и силовая прогрессия. Цель — устойчивая функция тела, а не разовый «жёсткий час».",
  },
  {
    question: "Как записаться?",
    answer:
      "Заполните анкету на сайте. По ней разберём запрос и предложим формат: личный приём в студии в Москве или онлайн-маршрут.",
  },
  {
    question: "Где студия?",
    answer:
      "Москва, ул. Вятская, 27с12, рядом с м. Савёловская. Точный адрес и карта — в блоке «Где принимаю» на этой странице.",
  },
];

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://eg.egoshev.ru/personalnye-trenirovki-moskva#service",
      name: "Персональные тренировки в Москве",
      serviceType: "Персональные тренировки / системная работа с телом",
      description: DESCRIPTION,
      url: "https://eg.egoshev.ru/personalnye-trenirovki-moskva",
      areaServed: { "@type": "City", name: "Москва" },
      provider: {
        "@type": "Person",
        name: "Евгений Гошев",
        jobTitle:
          "Специалист по движению, физический терапевт, основатель студии «Атмосфера 3D»",
        url: "https://eg.egoshev.ru/",
      },
      brand: {
        "@type": "Brand",
        name: "Атмосфера 3D",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Главная",
          item: "https://eg.egoshev.ru/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Персональные тренировки в Москве",
          item: "https://eg.egoshev.ru/personalnye-trenirovki-moskva",
        },
      ],
    },
  ],
});

export default function PersonalTrainingMoscowPage() {
  return (
    <>
      <JsonLd items={[JSON_LD]} />
      <ServiceMoneyLanding
        eyebrow="Студия · Москва"
        h1="Персональные тренировки в Москве: система тела, а не хаос нагрузки"
        answerFirst="Персональная работа в студии Атмосфера 3D — это путь от оценки движения к качественной нагрузке. Сначала база и контроль, затем сила. Евгений Гошев ведёт приём в Москве у м. Савёловская и собирает программу под ваш запрос — без медобещаний и без «жёсткого зала ради зала»."
        bullets={[
          "Оценка паттернов движения, дыхания и ограничений до нагрузки",
          "База: мобильность, контроль корпуса, устойчивость",
          "Силовая и функциональная прогрессия поверх собранной системы",
          "Понятный следующий шаг: студия, онлайн-курс или клуб",
        ]}
        howItWorks={[
          "Заполняете анкету — фиксируем цель и ограничения",
          "На приёме разбираем движение и собираем гипотезу работы",
          "Строим прогрессию: ткани → дыхание → паттерн → сила",
          "При необходимости подключаем онлайн-лестницу или клуб для регулярности",
        ]}
        faq={FAQ}
        relatedLinks={[
          { href: "/mfr-massazh-moskva", label: "МФР и массаж в системе движения" },
          { href: "/club", label: "Онлайн-клуб Атмосфера 3D" },
          { href: "/blog", label: "Блог: метод и практика" },
          { href: "/#online", label: "Онлайн-продукты на главной" },
          { href: "/uslugi", label: "Все услуги" },
        ]}
        primaryCtaLabel="Записаться на личный приём в Москве"
      />
    </>
  );
}
