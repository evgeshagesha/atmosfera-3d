import type { Metadata } from "next";

import JsonLd from "@/components/seo/JsonLd";
import ServiceMoneyLanding from "@/components/seo/ServiceMoneyLanding";
import "@/components/seo/service-money.css";

const TITLE =
  "МФР и массаж в Москве — восстановление в системе движения | Атмосфера 3D";
const DESCRIPTION =
  "МФР и ручная работа в Москве: подготовка тканей к качественному движению. Студия Атмосфера 3D у м. Савёловская — запись через анкету.";
const CANONICAL = "/mfr-massazh-moskva";

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
    question: "МФР у вас — это просто массаж?",
    answer:
      "Нет. Ручная работа и МФР здесь — часть системы: освободить ткани, улучшить ощущение и подвижность, затем встроить это в дыхание и движение. Не «расслабили и забыли».",
  },
  {
    question: "Можно ли прийти только на МФР без тренировок?",
    answer:
      "Да, можно начать с приёма под запрос. На практике чаще сильнее работает связка: ткани → движение → контроль. Формат обсуждаем после анкеты.",
  },
  {
    question: "Это заменяет врача или лечение?",
    answer:
      "Нет. Это не клиника и не медицинские обещания. При медицинских вопросах нужна профильная помощь. Здесь — системная работа с движением, тканями и нагрузкой.",
  },
  {
    question: "Сколько длится приём?",
    answer:
      "Длительность и формат согласуем после анкеты — в зависимости от запроса и выбранного пакета работы.",
  },
  {
    question: "Как записаться в студию?",
    answer:
      "Через анкету на сайте. После разбора предложим очный формат в Москве или онлайн-продолжение, если оно уместно.",
  },
];

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://eg.egoshev.ru/mfr-massazh-moskva#service",
      name: "МФР и массаж в Москве",
      serviceType: "МФР / миофасциальная работа / ручная подготовка тканей",
      description: DESCRIPTION,
      url: "https://eg.egoshev.ru/mfr-massazh-moskva",
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
          name: "МФР и массаж в Москве",
          item: "https://eg.egoshev.ru/mfr-massazh-moskva",
        },
      ],
    },
  ],
});

export default function MfrMassageMoscowPage() {
  return (
    <>
      <JsonLd items={[JSON_LD]} />
      <ServiceMoneyLanding
        eyebrow="Студия · Москва"
        h1="МФР и ручная работа: подготовка тканей к качественному движению"
        answerFirst="МФР и массаж в студии Атмосфера 3D — не отдельная «услуга ради расслабления», а этап системы: ткани → ощущение → дыхание → движение. Евгений Гошев принимает в Москве у м. Савёловская. Цель — дать телу возможность двигаться чище и устойчивее, без обещаний «снять всё навсегда»."
        bullets={[
          "Работа с тканями как подготовка к движению, а не финальная точка",
          "Связка с дыханием, мобильностью и контролем корпуса",
          "Понятный маршрут после приёма: персоналка, онлайн-база или клуб",
          "Честный тон: функция и прогрессия, без клиники и медобещаний",
        ]}
        howItWorks={[
          "Анкета — запрос, история нагрузки, ограничения",
          "Очный приём: ручная работа / МФР в контексте вашей механики",
          "Ретест ощущения и подвижности, рекомендации по движению",
          "При необходимости — персональные тренировки или онлайн-форматы",
        ]}
        faq={FAQ}
        relatedLinks={[
          {
            href: "/personalnye-trenirovki-moskva",
            label: "Персональные тренировки в Москве",
          },
          { href: "/mobilnost", label: "Мобильность и подвижность тела" },
          { href: "/osanka", label: "Осанка как система" },
          { href: "/club", label: "Онлайн-клуб Атмосфера 3D" },
          { href: "/blog", label: "Блог: метод и практика" },
          { href: "/uslugi", label: "Все услуги" },
        ]}
        primaryCtaLabel="Записаться на приём в студии"
      />
    </>
  );
}
