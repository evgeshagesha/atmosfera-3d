import type { Metadata } from "next";

import JsonLd from "@/components/seo/JsonLd";
import ServiceMoneyLanding from "@/components/seo/ServiceMoneyLanding";
import "@/components/seo/service-money.css";

const TITLE =
  "Функциональные тренировки в Москве — качество движения и сила | Атмосфера 3D";
const DESCRIPTION =
  "Функциональные тренировки в Москве: сначала паттерн и контроль, затем нагрузка. Студия Атмосфера 3D у м. Савёловская — запись через анкету.";
const CANONICAL = "/funkcionalnye-trenirovki-moskva";

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
    question: "Чем функциональная тренировка отличается от обычного «круга» в зале?",
    answer:
      "Мы не собираем набор случайных упражнений. Сначала смотрим, как вы двигаетесь, дышите и держите корпус — и только потом даём нагрузку. Зал может быть частью пути, но не заменой системе.",
  },
  {
    question: "Это подходит, если я уже хожу в спортзал?",
    answer:
      "Да. Часто зал уже есть, а не хватает базы: мобильности, контроля и чистого паттерна. Мы усиливаем то, что вы делаете, а не противопоставляем себя залу.",
  },
  {
    question: "Нужна ли специальная подготовка?",
    answer:
      "Нет. Формат подходит и новичкам, и тем, кто давно тренируется. Важно честно описать цель и ограничения в анкете.",
  },
  {
    question: "Как записаться?",
    answer:
      "Заполните анкету на сайте. По ней разберём запрос и предложим очный формат в Москве или онлайн-маршрут.",
  },
  {
    question: "Где студия?",
    answer:
      "Москва, ул. Вятская, 27с12, рядом с м. Савёловская. Адрес и карта — в блоке «Где принимаю» на этой странице.",
  },
];

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://eg.egoshev.ru/funkcionalnye-trenirovki-moskva#service",
      name: "Функциональные тренировки в Москве",
      serviceType: "Функциональные тренировки / системная работа с движением",
      description: DESCRIPTION,
      url: "https://eg.egoshev.ru/funkcionalnye-trenirovki-moskva",
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
          name: "Функциональные тренировки в Москве",
          item: "https://eg.egoshev.ru/funkcionalnye-trenirovki-moskva",
        },
      ],
    },
  ],
});

export default function FunctionalTrainingMoscowPage() {
  return (
    <>
      <JsonLd items={[JSON_LD]} />
      <ServiceMoneyLanding
        eyebrow="Студия · Москва"
        h1="Функциональные тренировки: сначала паттерн, затем нагрузка"
        answerFirst="Функциональная работа в студии Атмосфера 3D — это не хаос упражнений «на всё сразу». Сначала качество движения, дыхание и контроль корпуса, затем сила и объём. Евгений Гошев принимает в Москве у м. Савёловская и собирает прогрессию под ваш запрос — спокойно, системно, без медобещаний."
        bullets={[
          "Оценка паттерна до нагрузки: стопы, таз, кор, дыхание",
          "Функция и контроль важнее «сжечь калории любой ценой»",
          "Силовая прогрессия поверх собранной базы",
          "Понятный следующий шаг: студия, онлайн-база или клуб",
        ]}
        howItWorks={[
          "Анкета — цель, опыт нагрузки, ограничения",
          "На приёме разбираем движение и собираем гипотезу работы",
          "Строим прогрессию: мобильность → контроль → функция → сила",
          "При необходимости подключаем онлайн-лестницу или клуб для регулярности",
        ]}
        faq={FAQ}
        relatedLinks={[
          {
            href: "/personalnye-trenirovki-moskva",
            label: "Персональные тренировки в Москве",
          },
          { href: "/mobilnost", label: "Мобильность и подвижность тела" },
          { href: "/club", label: "Онлайн-клуб Атмосфера 3D" },
          { href: "/blog", label: "Блог: метод и практика" },
          { href: "/uslugi", label: "Все услуги" },
        ]}
        primaryCtaLabel="Записаться на функциональную работу в студии"
      />
    </>
  );
}
