"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";

import { CLUB_TRIBUTE_TG } from "@/lib/club/landing-content";

import { CLUB_FOR_YOU_CSS } from "./styles";

const ITEMS = [
  {
    n: "01",
    icon: "spine" as const,
    title: "Боль в спине и шее, ощущение тела в напряжении",
    text: "Начнём с дыхания, регуляции нервной системы и базовой опоры, чтобы вернуть телу ощущение свободы и устойчивости.",
  },
  {
    n: "02",
    icon: "clock" as const,
    title: "Работа, семья, дела — и нет времени на себя",
    text: "Ты получишь понятный и короткий план, который реально встроить в день без перегруза и откатов.",
  },
  {
    n: "03",
    icon: "brain" as const,
    title: "Хочешь тренироваться с умом",
    text: "Я даю последовательную систему: что делать сначала, как повышать нагрузку и как прогрессировать безопасно.",
  },
  {
    n: "04",
    icon: "shield" as const,
    title: "Понимаешь, что травмы — не повод останавливаться",
    text: "Мы идём по этапам: восстановление, контроль, а затем сила и выносливость.",
  },
  {
    n: "05",
    icon: "aware" as const,
    title: "Ценишь осознанный подход к телу",
    text: "После системной работы ты начнёшь лучше понимать, как устроено и работает твоё тело.",
  },
  {
    n: "06",
    icon: "cycle" as const,
    title: "Пробовал многое, но результата нет",
    text: "Если йога, фитнес, массажи и разовые консультации не дали устойчивого эффекта — здесь будет структура, логика и система.",
  },
] as const;

function ItemIcon({ type }: { type: (typeof ITEMS)[number]["icon"] }) {
  if (type === "clock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
      </svg>
    );
  }
  if (type === "brain") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 5.5a3 3 0 0 0-3 3v1.2A2.8 2.8 0 0 0 4.5 12 2.8 2.8 0 0 0 6 14.5V17a3 3 0 0 0 3 3h1" />
        <path d="M15 5.5a3 3 0 0 1 3 3v1.2A2.8 2.8 0 0 1 19.5 12 2.8 2.8 0 0 1 18 14.5V17a3 3 0 0 1-3 3h-1" />
        <path d="M12 4.5v15" />
      </svg>
    );
  }
  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 5.5 5.5v5.2c0 4.2 2.8 7.7 6.5 8.8 3.7-1.1 6.5-4.6 6.5-8.8V5.5L12 3Z" />
        <path d="m9.5 12 1.8 1.8 3.4-3.5" />
      </svg>
    );
  }
  if (type === "aware") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 19c-3.5-2.2-6-5-6-8.2A6 6 0 0 1 12 5a6 6 0 0 1 6 5.8c0 3.2-2.5 6-6 8.2Z" />
        <circle cx="12" cy="11" r="2" />
      </svg>
    );
  }
  if (type === "cycle") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 8a7 7 0 0 0-12.2-3.2" />
        <path d="M5 5.5V9h3.5" />
        <path d="M5 16a7 7 0 0 0 12.2 3.2" />
        <path d="M19 18.5V15h-3.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5c-1.2 2.2-2 4.2-2 6.2 0 2.6 1 4.4 2 6.8 1-2.4 2-4.2 2-6.8 0-2-.8-4-2-6.2Z" />
      <path d="M8.5 9.5c-1.8.6-3 1.8-3.5 3.5" />
      <path d="M15.5 9.5c1.8.6 3 1.8 3.5 3.5" />
      <path d="M10 20h4" />
    </svg>
  );
}

export default function ClubForYouSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = useCallback((dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-foryou-card]");
    const amount = card ? card.offsetWidth + 12 : track.clientWidth * 0.55;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  return (
    <div
      id="rec1144222031"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="396"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <style dangerouslySetInnerHTML={{ __html: CLUB_FOR_YOU_CSS }} />
      <section className="club-foryou" aria-labelledby="club-foryou-title">
        <div className="club-foryou__shell">
          <header className="club-foryou__head">
            <h2 id="club-foryou-title" className="club-foryou__title">
              Это для <span>тебя</span>, если
            </h2>
            <div className="club-foryou__nav" aria-label="Листать карточки">
              <button
                type="button"
                className="club-foryou__nav-btn"
                aria-label="Назад"
                onClick={() => scrollByCard(-1)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 6 9 12l6 6" />
                </svg>
              </button>
              <button
                type="button"
                className="club-foryou__nav-btn"
                aria-label="Вперёд"
                onClick={() => scrollByCard(1)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
            </div>
          </header>

          <div className="club-foryou__desktop">
            <div className="club-foryou__grid">
              {ITEMS.map((item) => (
                <article className="club-foryou__card" key={item.n} data-n={item.n}>
                  <span className="club-foryou__num">{item.n}</span>
                  <div className="club-foryou__icon">
                    <ItemIcon type={item.icon} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}

              <div className="club-foryou__visual" aria-hidden="true">
                <div className="club-foryou__visual-glow" />
                <Image
                  src="/club/source/body-system.png"
                  alt=""
                  fill
                  sizes="(max-width: 980px) 0px, 320px"
                />
              </div>

              <a
                className="club-foryou__cta"
                href={CLUB_TRIBUTE_TG}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="club-foryou__num">07</span>
                <strong>Это про меня</strong>
                <span className="club-foryou__cta-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h12M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <div className="club-foryou__mobile">
            <div className="club-foryou__track" ref={trackRef}>
              {ITEMS.map((item) => (
                <article
                  className="club-foryou__square"
                  key={item.n}
                  data-foryou-card
                >
                  <span className="club-foryou__num">{item.n}</span>
                  <div className="club-foryou__icon">
                    <ItemIcon type={item.icon} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
              <a
                className="club-foryou__square club-foryou__square--cta"
                href={CLUB_TRIBUTE_TG}
                target="_blank"
                rel="noopener noreferrer"
                data-foryou-card
              >
                <span className="club-foryou__num">07</span>
                <strong>Это про меня</strong>
                <span className="club-foryou__cta-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h12M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <p className="club-foryou__foot">
            <span className="club-foryou__spark" aria-hidden="true" />
            Клуб для тех, кто выбирает осознанный подход, доказательные методы и
            системный результат.
          </p>
        </div>
      </section>
    </div>
  );
}
