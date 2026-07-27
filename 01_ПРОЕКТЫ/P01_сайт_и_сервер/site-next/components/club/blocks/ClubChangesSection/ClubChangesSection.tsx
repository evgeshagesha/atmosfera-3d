import { CLUB_SUPPORT_TG } from "@/lib/club/landing-content";

import { CLUB_CHANGES_CSS } from "./styles";

const ITEMS = [
  {
    icon: "feather" as const,
    title: "Тело снова двигается естественно",
    text: "Ты вернёшь природную подвижность суставов, освободишь тело от скованности и почувствуешь лёгкость в движении.",
  },
  {
    icon: "focus" as const,
    title: "Больше энергии, устойчивости и концентрации",
    text: "Правильное дыхание, закаливание, улучшение нейромышечной координации и восстановление естественных паттернов дадут стабильную энергию на весь день.",
  },
  {
    icon: "leaves" as const,
    title: "Поймёшь природу боли и научишься выключать её движением",
    text: "Ты узнаешь, как работает твоя биомеханика, и научишься управлять своим телом без ставки только на таблетки.",
  },
  {
    icon: "balance" as const,
    title: "Наконец-то появится дисциплина и чёткий план",
    text: "Ты перестанешь гадать, что делать, и начнёшь двигаться последовательно — без срывов и хаоса.",
  },
] as const;

function ItemIcon({ type }: { type: (typeof ITEMS)[number]["icon"] }) {
  const gid = `cc-${type}`;
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={`${gid}-g`} x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9ec2ff" />
          <stop offset="0.45" stopColor="#2f6bff" />
          <stop offset="1" stopColor="#163fc7" />
        </linearGradient>
        <linearGradient id={`${gid}-s`} x1="16" y1="8" x2="40" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {type === "feather" ? (
        <>
          <path
            d="M48 12c-14 2-24 12-28 28 10-2 20-10 28-28Z"
            fill={`url(#${gid}-g)`}
          />
          <path d="M20 52 48 12" stroke="#d7e6ff" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M26 40c6-4 12-10 16-18" stroke={`url(#${gid}-s)`} strokeWidth="2" fill="none" />
        </>
      ) : null}
      {type === "focus" ? (
        <>
          <circle cx="32" cy="24" r="9" fill={`url(#${gid}-g)`} />
          <path
            d="M16 54c2-10 8-16 16-16s14 6 16 16"
            fill={`url(#${gid}-g)`}
          />
          <path d="M12 30c4-5 9-8 14-9" stroke={`url(#${gid}-s)`} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M52 30c-4-5-9-8-14-9" stroke={`url(#${gid}-s)`} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </>
      ) : null}
      {type === "leaves" ? (
        <>
          <path d="M18 50c0-14 8-26 22-30 0 14-8 26-22 30Z" fill={`url(#${gid}-g)`} />
          <path d="M46 50c0-14-8-26-22-30 0 14 8 26 22 30Z" fill={`url(#${gid}-g)`} opacity="0.85" />
          <path d="M32 20v30" stroke="#d7e6ff" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M24 28c4-2 8-2 12 0" stroke={`url(#${gid}-s)`} strokeWidth="2" fill="none" />
        </>
      ) : null}
      {type === "balance" ? (
        <>
          <circle cx="32" cy="32" r="22" fill={`url(#${gid}-g)`} />
          <path d="M32 10a22 22 0 0 0 0 44Z" fill="#0b1220" opacity="0.35" />
          <circle cx="32" cy="20" r="4" fill="#fff" />
          <circle cx="32" cy="44" r="4" fill="#9ec2ff" />
          <path d="M18 22c6-8 14-10 20-10" stroke={`url(#${gid}-s)`} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </>
      ) : null}
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="cc-shield" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7eb0ff" />
          <stop offset="0.55" stopColor="#2f6bff" />
          <stop offset="1" stopColor="#163fc7" />
        </linearGradient>
      </defs>
      <path
        d="M32 6c10 5 18 7 24 8v22c0 14-9 24-24 30C17 60 8 50 8 36V14c6-1 14-3 24-8Z"
        fill="url(#cc-shield)"
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

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H11l-4 3.2V15H7.5A2.5 2.5 0 0 1 5 12.5v-6Z" />
      <path d="M8.5 9h7M8.5 12h4.5" />
    </svg>
  );
}

export default function ClubChangesSection() {
  return (
    <div
      id="rec1146332496"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="396"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <style dangerouslySetInnerHTML={{ __html: CLUB_CHANGES_CSS }} />

      <section
        id="results"
        className="club-changes"
        aria-labelledby="club-changes-title"
      >
        <div className="club-changes__shell">
          <header className="club-changes__head">
            <h2 id="club-changes-title" className="club-changes__title">
              Изменения,
              <span>которые ждут тебя</span>
            </h2>
          </header>

          <div className="club-changes__grid">
            {ITEMS.map((item) => (
              <article className="club-changes__card" key={item.title}>
                <span className="club-changes__icon" aria-hidden="true">
                  <ItemIcon type={item.icon} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="club-changes__banner">
            <span className="club-changes__banner-icon" aria-hidden="true">
              <ShieldIcon />
            </span>
            <div>
              <h3>
                Все изменения —{" "}
                <span>это результат системной работы.</span>
              </h3>
              <p>
                Без волшебных таблеток, без жёстких ограничений и без вреда для
                здоровья.
              </p>
            </div>
          </div>

          <div className="club-changes__support">
            <a
              className="club-changes__support-link"
              href={CLUB_SUPPORT_TG}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ChatIcon />
              Отдел поддержки
            </a>
            <p>
              Наша команда всегда на связи и готова помочь. Ответим на любые
              вопросы по клубу, тарифам и работе платформы.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
