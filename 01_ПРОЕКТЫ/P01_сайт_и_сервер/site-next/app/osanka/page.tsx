import type { Metadata } from "next";

import JsonLd from "@/components/seo/JsonLd";
import ServiceMoneyLanding from "@/components/seo/ServiceMoneyLanding";
import "@/components/seo/service-money.css";

const TITLE =
  "Осанка и тренировки в Москве — настройка тела, не «выровнять навсегда» | Атмосфера 3D";
const DESCRIPTION =
  "Осанка как система: дыхание, грудной отдел, стопы, контроль. Студия Атмосфера 3D в Москве у м. Савёловская — запись через анкету. Есть онлайн-мини-курс.";
const CANONICAL = "/osanka";

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
    question: "Почему «просто выпрямиться» не держится?",
    answer:
      "Осанка — не поза «грудь вперёд» на минуту. Это связь стоп, таза, дыхания, грудного отдела и привычной нагрузки. Без системы тело возвращается к старому паттерну.",
  },
  {
    question: "Это коррекция осанки как в клинике?",
    answer:
      "Нет. Это не клиника и не медицинские обещания. При медицинских вопросах нужна профильная помощь. Здесь — системная работа с движением, дыханием и контролем.",
  },
  {
    question: "Можно начать онлайн, без студии?",
    answer:
      "Да. Есть мини-курс «Дыхание и осанка» на отдельной странице продукта. Если нужен разбор вживую — после анкеты предложим приём в Москве.",
  },
  {
    question: "Как записаться в студию?",
    answer:
      "Через анкету на сайте. Разберём запрос и предложим очный формат или онлайн-маршрут.",
  },
  {
    question: "Где студия?",
    answer:
      "Москва, ул. Вятская, 27с12, рядом с м. Савёловская. Адрес и карта — в блоке «Где принимаю».",
  },
];

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://eg.egoshev.ru/osanka#service",
      name: "Осанка и настройка тела в Москве",
      serviceType: "Работа с осанкой / дыхание / контроль паттерна",
      description: DESCRIPTION,
      url: "https://eg.egoshev.ru/osanka",
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
          name: "Осанка",
          item: "https://eg.egoshev.ru/osanka",
        },
      ],
    },
  ],
});

export default function PosturePage() {
  return (
    <>
      <JsonLd items={[JSON_LD]} />
      <ServiceMoneyLanding
        eyebrow="Студия · Москва · онлайн-мост"
        h1="Осанка как система: дыхание, грудной отдел, стопы, контроль"
        answerFirst="Осанка в логике Атмосфера 3D — не «выровнять и забыть». Это настройка связей: стопы → таз → дыхание → грудной отдел → привычная нагрузка. Евгений Гошев принимает в Москве у м. Савёловская. Можно начать с очного разбора или с онлайн-мини-курса «Дыхание и осанка» — без обещаний «идеальной осанки навсегда»."
        bullets={[
          "Осанка как функция системы, а не разовая «прямая спина»",
          "Дыхание и грудной отдел — часть механики, не отдельный ритуал",
          "Очный разбор в студии или мягкий вход через мини-курс",
          "Дальше: персоналка, мобильность, клуб — по запросу",
        ]}
        howItWorks={[
          "Анкета — запрос, нагрузка, что уже пробовали",
          "Очный разбор паттерна и дыхания в студии — или старт с мини-курса",
          "Практика контроля: стопы, таз, грудной отдел, привычные позы",
          "При необходимости — персональные тренировки, мобильность или клуб",
        ]}
        faq={FAQ}
        relatedLinks={[
          {
            href: "https://egoshev.ru/dyhanieosanka",
            label: "Мини-курс «Дыхание и осанка»",
          },
          { href: "/mobilnost", label: "Мобильность и подвижность тела" },
          {
            href: "/personalnye-trenirovki-moskva",
            label: "Персональные тренировки в Москве",
          },
          { href: "/club", label: "Онлайн-клуб Атмосфера 3D" },
          { href: "/blog", label: "Блог: метод и практика" },
          { href: "/uslugi", label: "Все услуги" },
        ]}
        primaryCtaLabel="Записаться на разбор осанки в студии"
      />
    </>
  );
}
