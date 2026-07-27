import Image from "next/image";

import { CLUB_HELP_CSS } from "./styles";

const LEAD =
  "Инструменты и поддержка, которые помогут тебе восстановиться, стать сильнее и строить здоровое, свободное тело каждый день.";

const ITEMS = [
  {
    icon: "spine" as const,
    title: "Убрать боль и вернуть ровную, лёгкую осанку",
    text: "Работаем с причиной боли и восстанавливаем баланс тела через движение и дыхание.",
    glow: false,
  },
  {
    icon: "bolt" as const,
    title: "Улучшить мобильность и вернуть природную силу своему телу",
    text: "Развиваем гибкость, подвижность суставов и силу без вреда для здоровья.",
    glow: false,
  },
  {
    icon: "dumbbell" as const,
    title: "Выстроить тренировки по этапам — чтобы результат был понятным",
    text: "Чёткая система: от диагностики до результата. Ты всегда понимаешь, на каком этапе и зачем.",
    glow: false,
  },
  {
    icon: "apple" as const,
    title: "Понять как правильно питаться, без диет и ограничений",
    text: "Учим осознанному питанию, которое даёт энергию и не требует жёстких запретов.",
    glow: false,
  },
  {
    icon: "bandage" as const,
    title: "Вернуться к нагрузкам после травм — спокойно и безопасно",
    text: "Восстанавливаем тело поэтапно и грамотно, чтобы ты снова был в форме без риска.",
    glow: false,
  },
  {
    icon: "shield" as const,
    title: "Научиться закаляться правильно, чтобы укрепить иммунитет",
    text: "Простые практики для укрепления организма, устойчивости к стрессу и болезням.",
    glow: false,
  },
  {
    icon: "cycle" as const,
    title: "Изменить образ жизни через дисциплину, а не мотивацию",
    text: "Создаём привычки, которые работают на тебя каждый день, а не только когда есть вдохновение.",
    glow: false,
  },
  {
    icon: "bulb" as const,
    title: "Двигаться свободно и уверенно в повседневной жизни",
    text: "Ты забудешь про скованность и усталость. Лёгкость в теле — твоя новая норма.",
    glow: true,
  },
] as const;

function HelpIcon({ type }: { type: (typeof ITEMS)[number]["icon"] }) {
  if (type === "bolt") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 2 6 13h5l-1 9 8-12h-5l1-8Z" />
      </svg>
    );
  }
  if (type === "dumbbell") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 8v8M17 8v8" />
        <path d="M5 9.5v5M19 9.5v5" />
        <path d="M7 12h10" />
        <path d="M3.5 10.5v3M20.5 10.5v3" />
      </svg>
    );
  }
  if (type === "apple") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 7c-3.5 0-6 2.8-6 6.5S8.5 20 12 20s6-2.8 6-6.5S15.5 7 12 7Z" />
        <path d="M12 7c.8-1.8 2.2-3 4-3" />
      </svg>
    );
  }
  if (type === "bandage") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m8 16 8-8" />
        <path d="M7.5 14.5 5 17a2.8 2.8 0 0 0 4 4l2.5-2.5" />
        <path d="M16.5 9.5 19 7a2.8 2.8 0 0 0-4-4l-2.5 2.5" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    );
  }
  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 5.5 5.5v5.2c0 4.2 2.8 7.7 6.5 8.8 3.7-1.1 6.5-4.6 6.5-8.8V5.5L12 3Z" />
        <path d="M12 9v4M12 15.5h.01" />
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
  if (type === "bulb") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 18h6M10 21h4" />
        <path d="M12 3a6 6 0 0 0-3.5 10.8c.7.5 1.1 1.1 1.2 1.9h4.6c.1-.8.5-1.4 1.2-1.9A6 6 0 0 0 12 3Z" />
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

export default function ClubHelpSection() {
  return (
    <div
      id="rec1145595476"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="396"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <style dangerouslySetInnerHTML={{ __html: CLUB_HELP_CSS }} />
      <section className="club-help" aria-labelledby="club-help-title">
        <div className="club-help__shell">
          <div className="club-help__intro">
            <div className="club-help__copy">
              <h2 id="club-help-title" className="club-help__title">
                Мой клуб <span>поможет тебе</span>
              </h2>
              <p className="club-help__lead">{LEAD}</p>
            </div>
            <div className="club-help__photo">
              <Image
                src="/club/source/club-help-physique-portrait.jpg"
                alt="Евгений Гошев — форма и результат системной работы с телом"
                fill
                sizes="(max-width: 980px) 180px, 360px"
                priority={false}
              />
            </div>
          </div>

          <div className="club-help__grid" role="list">
            {ITEMS.map((item) => (
              <article
                key={item.title}
                className={
                  item.glow ? "club-help__card club-help__card--glow" : "club-help__card"
                }
                role="listitem"
              >
                <div className="club-help__icon">
                  <HelpIcon type={item.icon} />
                </div>
                <div className="club-help__body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="club-help__mobile">
            <div className="club-help__list" role="list">
              {ITEMS.map((item) => (
                <div
                  key={item.title}
                  className={
                    item.glow ? "club-help__row club-help__row--glow" : "club-help__row"
                  }
                  role="listitem"
                >
                  <div className="club-help__icon">
                    <HelpIcon type={item.icon} />
                  </div>
                  <strong>{item.title}</strong>
                  <span className="club-help__chevron" aria-hidden="true">
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
