import type { Metadata } from "next";

import JsonLd from "@/components/seo/JsonLd";
import ServiceMoneyLanding from "@/components/seo/ServiceMoneyLanding";
import "@/components/seo/service-money.css";

const TITLE =
  "Мобильность и подвижность тела — тренировки в Москве | Атмосфера 3D";
const DESCRIPTION =
  "Мобильность в Москве: свобода суставов в связке с контролем и силой. Студия Атмосфера 3D у м. Савёловская — запись через анкету.";
const CANONICAL = "/mobilnost";

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
    question: "Мобильность — это просто растяжка?",
    answer:
      "Нет. Растяжка может быть частью работы, но цель шире: дать суставу и ткани рабочий диапазон и удержать его контролем. Без силы и паттерна «просто размяться» часто не держится.",
  },
  {
    question: "Можно ли прийти только за мобильностью, без силовых?",
    answer:
      "Да, можно начать с разбора и работы на подвижность. На практике устойчивее связка: ткани → дыхание → диапазон → контроль. Формат обсуждаем после анкеты.",
  },
  {
    question: "Это заменяет зал или оборудование?",
    answer:
      "Нет. Мы не против зала и не обещаем «без оборудования навсегда». Мобильность усиливает то, что вы уже делаете — и дома, и в зале, и в спорте.",
  },
  {
    question: "Как записаться?",
    answer:
      "Через анкету на сайте. После разбора предложим очный приём в Москве или онлайн-продолжение, если оно уместно.",
  },
  {
    question: "Где студия?",
    answer:
      "Москва, ул. Вятская, 27с12, рядом с м. Савёловская. Точный адрес и карта — ниже на странице.",
  },
];

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://eg.egoshev.ru/mobilnost#service",
      name: "Мобильность и подвижность тела в Москве",
      serviceType: "Мобильность / работа с диапазоном движения",
      description: DESCRIPTION,
      url: "https://eg.egoshev.ru/mobilnost",
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
          name: "Мобильность",
          item: "https://eg.egoshev.ru/mobilnost",
        },
      ],
    },
  ],
});

export default function MobilityPage() {
  return (
    <>
      <JsonLd items={[JSON_LD]} />
      <ServiceMoneyLanding
        eyebrow="Студия · Москва"
        h1="Мобильность: свобода суставов в связке с контролем и силой"
        answerFirst="Мобильность в студии Атмосфера 3D — не «просто размяться». Это работа с диапазоном движения, тканями и контролем, чтобы подвижность держалась в жизни и нагрузке. Евгений Гошев принимает в Москве у м. Савёловская. Без обещаний «снять всё навсегда» — с ясным маршрутом: оценка → диапазон → контроль → сила."
        bullets={[
          "Диапазон движения как рабочий инструмент, а не разовое «потянуться»",
          "Связка с дыханием, тканями и контролем корпуса",
          "Мобильность усиливает зал и спорт — не заменяет систему",
          "Следующий шаг: персоналка, функционал, онлайн-база или клуб",
        ]}
        howItWorks={[
          "Анкета — где «зажато», какая нагрузка, что уже пробовали",
          "Очный разбор: суставы, ткани, дыхание, паттерн",
          "Работа на диапазон + контроль, чтобы результат удерживался",
          "При необходимости — персональные / функциональные тренировки или онлайн-форматы",
        ]}
        faq={FAQ}
        relatedLinks={[
          {
            href: "/mfr-massazh-moskva",
            label: "МФР и массаж в системе движения",
          },
          {
            href: "/funkcionalnye-trenirovki-moskva",
            label: "Функциональные тренировки в Москве",
          },
          { href: "/osanka", label: "Осанка как система" },
          { href: "/club", label: "Онлайн-клуб Атмосфера 3D" },
          { href: "/blog", label: "Блог: метод и практика" },
          { href: "https://egoshev.ru/baza", label: "Онлайн-база настройки тела" },
        ]}
        primaryCtaLabel="Разобрать мобильность на приёме в Москве"
      />
    </>
  );
}
