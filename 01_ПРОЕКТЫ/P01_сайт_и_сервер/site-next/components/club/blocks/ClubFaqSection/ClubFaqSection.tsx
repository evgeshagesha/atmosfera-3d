"use client";

import { useId, useState } from "react";

import ClubSalesLink from "@/components/club/ClubSalesLink";

import { CLUB_FAQ_CSS } from "./styles";

const FAQ_ITEMS = [
  {
    icon: "calendar" as const,
    q: "Как часто добавляются новые материалы?",
    a: "Мы обновляем контент практически каждый день, чтобы тебе всегда было с чем работать: новые упражнения, фишки, ответы на вопросы, мотивация — всё по делу, без воды.",
  },
  {
    icon: "card" as const,
    q: "Когда и как нужно платить?",
    a: "Один платёж через платёжную систему Tribute. После оплаты сразу открывается доступ в клуб.",
  },
  {
    icon: "shield" as const,
    q: "Могу ли я вернуть деньги?",
    a: "Да, в течение 7 дней. Если формат не подойдёт — верну деньги по условиям оферты.",
  },
  {
    icon: "target" as const,
    q: "Под какие цели подойдёт клуб?",
    a: "Клуб подойдёт тем, кто хочет вернуть подвижность, укрепить тело, улучшить осанку, выстроить дыхание и получить системный подход вместо хаотичных тренировок.",
  },
  {
    icon: "chart" as const,
    q: "Сколько будет доступен клуб?",
    a: "Сейчас есть три тарифа: на 1 месяц, 3 месяца и 6 месяцев. Выбираешь срок — и работаешь в системе.",
  },
  {
    icon: "user" as const,
    q: "Будет ли связь от Евгения Гошева?",
    a: "Да. Евгений отвечает на вопросы, комментирует тренировки, даёт рекомендации и делится опытом.",
  },
] as const;

function FaqIcon({ type }: { type: (typeof FAQ_ITEMS)[number]["icon"] }) {
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </svg>
    );
  }
  if (type === "card") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18M7 14h4" />
      </svg>
    );
  }
  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.5c4 2 7 2.7 9 3v8c0 5-3.4 8.5-9 10.5C6.4 23 3 19.5 3 14.5v-8c2-.3 5-1 9-3Z" />
        <path d="m9 12.2 2.2 2.2 4-4.4" />
      </svg>
    );
  }
  if (type === "target") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    );
  }
  if (type === "chart") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 19V9M12 19V5M19 19v-7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19c1-4 3.5-6 6.5-6s5.5 2 6.5 6" />
    </svg>
  );
}

function ShieldBannerIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="cf-shield" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7eb0ff" />
          <stop offset="0.55" stopColor="#2f6bff" />
          <stop offset="1" stopColor="#163fc7" />
        </linearGradient>
      </defs>
      <path
        d="M32 6c10 5 18 7 24 8v22c0 14-9 24-24 30C17 60 8 50 8 36V14c6-1 14-3 24-8Z"
        fill="url(#cf-shield)"
      />
      <circle cx="32" cy="32" r="11" fill="#fff" />
      <path
        d="m26.5 32.2 3.6 3.6 7.4-8"
        fill="none"
        stroke="#1a56ff"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ClubFaqSection() {
  const baseId = useId();
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div
      id="rec1146573076"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="396"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <style dangerouslySetInnerHTML={{ __html: CLUB_FAQ_CSS }} />

      <section
        id="faq"
        className="club-faq-acc"
        aria-labelledby="club-faq-title"
      >
        <div className="club-faq-acc__shell">
          <h2 id="club-faq-title" className="club-faq-acc__title">
            Отвечаю на ваши <span>вопросы</span>
          </h2>

          <ul className="club-faq-acc__list">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openId === index;
              const panelId = `${baseId}-panel-${index}`;
              const triggerId = `${baseId}-trigger-${index}`;
              return (
                <li
                  key={item.q}
                  className={`club-faq-acc__item${isOpen ? " is-open" : ""}`}
                >
                  <button
                    type="button"
                    id={triggerId}
                    className="club-faq-acc__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : index)}
                  >
                    <span className="club-faq-acc__icon" aria-hidden="true">
                      <FaqIcon type={item.icon} />
                    </span>
                    <span className="club-faq-acc__q">{item.q}</span>
                    <span className="club-faq-acc__chevron" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={panelId}
                    className="club-faq-acc__panel"
                    role="region"
                    aria-labelledby={triggerId}
                  >
                    <div className="club-faq-acc__panel-inner">
                      <p className="club-faq-acc__a">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="club-faq-acc__banner">
            <div className="club-faq-acc__banner-top">
              <span className="club-faq-acc__banner-icon" aria-hidden="true">
                <ShieldBannerIcon />
              </span>
              <h3>
                Мы рядом на каждом шаге вашего пути{" "}
                <span>к результату</span>
              </h3>
            </div>
            <ClubSalesLink className="club-faq-acc__cta">
              Присоединиться к клубу
              <span aria-hidden="true">→</span>
            </ClubSalesLink>
          </div>
        </div>
      </section>
    </div>
  );
}
