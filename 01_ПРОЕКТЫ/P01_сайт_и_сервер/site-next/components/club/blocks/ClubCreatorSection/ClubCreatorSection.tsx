"use client";

import Image from "next/image";

import { CLUB_CREATOR_CSS } from "./styles";

const CARDS = [
  {
    icon: "path" as const,
    text: "Прошёл путь от серьёзных травм до полной реабилитации под руководством ведущих специалистов, включая практику в Германии.",
  },
  {
    icon: "body" as const,
    text: "Работаю с телом ежедневно — как спортсмен и практик. Поэтому понимаю механику боли, ограничений и устойчивого результата.",
  },
  {
    icon: "study" as const,
    text: "Имею медицинское образование. Постоянно повышаю квалификацию: анатомия, биомеханика, нейрофизиология, дыхание, восстановление и прикладная работа с телом.",
  },
  {
    icon: "method" as const,
    text: "Методика клуба — практическая система без фанатизма, без боли и без жёстких ограничений. Основана на принципах естественного движения, дыхания и дисциплины.",
  },
] as const;

const GOAL =
  "Моя цель — вернуть телу свободу, опору и силу, чтобы результат сохранялся в реальной жизни.";

const STATS = [
  { icon: "trophy" as const, label: "20+ лет в спорте" },
  { icon: "shield" as const, label: "Практика и восстановление" },
  { icon: "layers" as const, label: "Системный подход" },
] as const;

function CardIcon({ type }: { type: (typeof CARDS)[number]["icon"] | "goal" }) {
  if (type === "body") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="5" r="2.2" />
        <path d="M12 8.5v5.5M9 22l3-8 3 8M7.5 12.5 12 14l4.5-1.5" />
      </svg>
    );
  }
  if (type === "study") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 9.5 12 5l9 4.5-9 4.5L3 9.5Z" />
        <path d="M7 12.5v4.2c0 .8 2.2 2.3 5 2.3s5-1.5 5-2.3v-4.2" />
        <path d="M21 9.5V15" />
      </svg>
    );
  }
  if (type === "method") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="2.2" />
        <circle cx="12" cy="12" r="6.2" />
        <path d="M12 2.8v2.2M12 19v2.2M2.8 12h2.2M19 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
      </svg>
    );
  }
  if (type === "goal") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 17c2-4 4.5-7 7-9 2.5 2 5 5 7 9" />
      <path d="M8 17h8" />
      <circle cx="12" cy="6.5" r="1.6" />
    </svg>
  );
}

function StatIcon({ type }: { type: (typeof STATS)[number]["icon"] }) {
  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 5.5 5.5v5.2c0 4.2 2.8 7.7 6.5 8.8 3.7-1.1 6.5-4.6 6.5-8.8V5.5L12 3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (type === "layers") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m4 9 8-4 8 4-8 4-8-4Z" />
        <path d="m4 13 8 4 8-4" />
        <path d="m4 17 8 4 8-4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 19V9.5l4-2.5 4 2.5V19" />
      <path d="M8 12.5h8" />
      <path d="M12 7V4.5" />
    </svg>
  );
}

export default function ClubCreatorSection() {
  return (
    <div
      id="rec1144367136"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="396"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <style dangerouslySetInnerHTML={{ __html: CLUB_CREATOR_CSS }} />
      <section id="me" className="club-creator" aria-labelledby="club-creator-title">
        <div className="club-creator__shell">
          <div className="club-creator__card">
            <header className="club-creator__header">
              <p className="club-creator__eyebrow">О создателе клуба</p>
              <h2 id="club-creator-title" className="club-creator__title">
                Евгений <span>Гошев</span>
              </h2>
              <p className="club-creator__role">
                Профессиональный спортсмен, физический терапевт, специалист по
                биомеханике, телесным практикам и функциональным тренировкам
              </p>
            </header>

            <div className="club-creator__visual">
              <div className="club-creator__glow" aria-hidden="true" />
              <div className="club-creator__photo">
                <Image
                  src="/club/source/club-creator-cut.png"
                  alt="Евгений Гошев — основатель клуба Атмосфера 3D"
                  fill
                  sizes="(max-width: 980px) 80vw, 420px"
                  priority={false}
                />
              </div>
              <div className="club-creator__sign">
                <span className="club-creator__sign-mark">E. Goshev</span>
                <p className="club-creator__sign-caption">
                  Евгений Гошев, основатель клуба.
                </p>
              </div>
            </div>

            <div className="club-creator__content">
              <div className="club-creator__grid">
                {CARDS.map((item) => (
                  <article className="club-creator__item" key={item.icon}>
                    <div className="club-creator__icon">
                      <CardIcon type={item.icon} />
                    </div>
                    <p>{item.text}</p>
                  </article>
                ))}
                <article className="club-creator__item club-creator__item--wide">
                  <div className="club-creator__icon">
                    <CardIcon type="goal" />
                  </div>
                  <p>{GOAL}</p>
                </article>
              </div>

              <div className="club-creator__stats">
                {STATS.map((item) => (
                  <div className="club-creator__stat" key={item.label}>
                    <div className="club-creator__stat-icon">
                      <StatIcon type={item.icon} />
                    </div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
