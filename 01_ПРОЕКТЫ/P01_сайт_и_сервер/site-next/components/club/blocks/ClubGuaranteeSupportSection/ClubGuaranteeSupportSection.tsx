import { CLUB_SUPPORT_TG } from "@/lib/club/landing-content";

import { CLUB_GUARANTEE_SUPPORT_CSS } from "./styles";

const GUARANTEE_POINTS = [
  {
    icon: "days" as const,
    text: "7 дней на проверку результата",
  },
  {
    icon: "refund" as const,
    text: "Без споров и лишних вопросов",
  },
  {
    icon: "safe" as const,
    text: "Твои деньги под защитой",
  },
] as const;

function ShieldArt() {
  return (
    <svg className="club-gs__art" viewBox="0 0 240 240" aria-hidden="true">
      <defs>
        <linearGradient id="gs-shield-body" x1="40" y1="20" x2="200" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6ea0ff" />
          <stop offset="0.45" stopColor="#2f6bff" />
          <stop offset="1" stopColor="#163fc7" />
        </linearGradient>
        <linearGradient id="gs-shield-shine" x1="70" y1="36" x2="150" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="gs-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>
      <ellipse cx="120" cy="198" rx="54" ry="10" fill="rgba(47,107,255,0.28)" filter="url(#gs-soft)" />
      <path
        d="M120 28c28 14 52 18 72 20v70c0 42-28 74-72 94-44-20-72-52-72-94V48c20-2 44-6 72-20Z"
        fill="url(#gs-shield-body)"
      />
      <path
        d="M120 42c24 12 44 16 60 18v60c0 34-22 60-60 76-38-16-60-42-60-76V60c16-2 36-6 60-18Z"
        fill="url(#gs-shield-shine)"
        opacity="0.55"
      />
      <circle cx="120" cy="118" r="34" fill="#0b1220" opacity="0.22" />
      <circle cx="120" cy="118" r="30" fill="#fff" />
      <path
        d="m104 118 10 10 22-24"
        fill="none"
        stroke="#1a56ff"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 92c18-24 44-38 72-42"
        fill="none"
        stroke="rgba(170,200,255,0.45)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M178 148c-10 28-34 48-58 58"
        fill="none"
        stroke="rgba(170,200,255,0.28)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeadsetArt() {
  return (
    <svg className="club-gs__art" viewBox="0 0 240 240" aria-hidden="true">
      <defs>
        <linearGradient id="gs-head-metal" x1="40" y1="40" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3a4458" />
          <stop offset="0.5" stopColor="#171d28" />
          <stop offset="1" stopColor="#0b1018" />
        </linearGradient>
        <linearGradient id="gs-head-blue" x1="60" y1="80" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7eb0ff" />
          <stop offset="1" stopColor="#1a56ff" />
        </linearGradient>
        <filter id="gs-head-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <ellipse cx="120" cy="202" rx="58" ry="10" fill="rgba(47,107,255,0.24)" filter="url(#gs-head-soft)" />
      <path
        d="M52 118c0-42 30-76 68-76s68 34 68 76"
        fill="none"
        stroke="url(#gs-head-metal)"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <rect x="34" y="104" width="42" height="64" rx="18" fill="url(#gs-head-metal)" />
      <rect x="164" y="104" width="42" height="64" rx="18" fill="url(#gs-head-metal)" />
      <circle cx="55" cy="136" r="12" fill="url(#gs-head-blue)" />
      <circle cx="185" cy="136" r="12" fill="url(#gs-head-blue)" />
      <circle cx="55" cy="136" r="5" fill="#dff0ff" />
      <circle cx="185" cy="136" r="5" fill="#dff0ff" />
      <path
        d="M186 168c8 4 14 12 16 22"
        fill="none"
        stroke="#2f6bff"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="204" cy="196" r="7" fill="#2f6bff" />
      <path
        d="M72 88c14-18 34-28 48-28"
        fill="none"
        stroke="rgba(170,200,255,0.35)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PointIcon({ type }: { type: (typeof GUARANTEE_POINTS)[number]["icon"] }) {
  if (type === "days") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
        <path d="M9.2 15.2h2.2V12h1.4v5.2H9.2z" strokeWidth="1.4" />
      </svg>
    );
  }
  if (type === "refund") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 5.5 5.5v5.2c0 4.2 2.8 7.7 6.5 8.8 3.7-1.1 6.5-4.6 6.5-8.8V5.5L12 3Z" />
        <path d="M12 9v5M12 16.5h.01" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.8 12.2 2.4 2.4 4.2-4.6" />
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

export default function ClubGuaranteeSupportSection() {
  return (
    <div
      id="rec1146281676"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="396"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <style dangerouslySetInnerHTML={{ __html: CLUB_GUARANTEE_SUPPORT_CSS }} />

      <section className="club-gs" aria-label="Гарантия и поддержка">
        <div className="club-gs__shell">
          <article className="club-gs__card">
            <div className="club-gs__visual" aria-hidden="true">
              <div className="club-gs__visual-glow" />
              <ShieldArt />
            </div>

            <div className="club-gs__copy">
              <h2 className="club-gs__title">
                Верну тебе <span>деньги</span> в течение 7 дней
              </h2>
              <p className="club-gs__lead">
                Если применив все мои рекомендации, ты не увидишь результата, я
                верну деньги — без споров и разбирательств.
              </p>

              <ul className="club-gs__points">
                {GUARANTEE_POINTS.map((point) => (
                  <li className="club-gs__point" key={point.text}>
                    <span className="club-gs__point-icon">
                      <PointIcon type={point.icon} />
                    </span>
                    <p>{point.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="club-gs__card club-gs__card--support">
            <div className="club-gs__visual" aria-hidden="true">
              <div className="club-gs__visual-glow" />
              <HeadsetArt />
            </div>

            <div className="club-gs__copy">
              <h2 className="club-gs__title">
                Отдел <span>поддержки</span>
              </h2>
              <p className="club-gs__lead">
                Наша команда всегда на связи и готова помочь. Ответим на любые
                вопросы по клубу, тарифам и работе платформы.
              </p>

              <a
                className="club-gs__cta"
                href={CLUB_SUPPORT_TG}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ChatIcon />
                Написать в поддержку
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
