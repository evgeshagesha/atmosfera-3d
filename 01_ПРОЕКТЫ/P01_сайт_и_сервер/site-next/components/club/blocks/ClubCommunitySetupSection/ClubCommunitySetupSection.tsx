import Image from "next/image";

import { CLUB_COMMUNITY_SETUP_CSS } from "./styles";

const ITEMS = [
  {
    n: "01",
    icon: "plan" as const,
    title: "Старт — с чёткого плана действий",
    text: "Ты сразу понимаешь, с чего начать. Сначала тестируем твоё тело. Далее я веду тебя по этапам: дыхание — самомассаж — база — движения — нагрузка. Так прогресс становится спокойным и предсказуемым.",
  },
  {
    n: "02",
    icon: "calendar" as const,
    title: "Большой выбор коротких тренировок",
    text: "Контент разделён по темам: тренировки дома и в зале, восстановление, осанка, пресс и ягодицы, закаливание, питание — и многое другое. Всё разложено по полочкам.",
  },
  {
    n: "03",
    icon: "support" as const,
    title: "Сопровождение от меня",
    text: "Всегда на связи создатель сообщества — Евгений, а также кураторы. Можно задать любой вопрос и получить персональные рекомендации.",
  },
  {
    n: "04",
    icon: "chat" as const,
    title: "Чат с участниками",
    text: "Ты будешь не один — в чате клуба живое общение с участниками, которые идут к тем же целям. Делитесь опытом, задавайте вопросы, поддерживайте друг друга и двигайтесь вперёд вместе.",
  },
] as const;

const AVATARS = [
  { src: "/club/source/community/avatar-1-sm.png", className: "club-csetup__bubble--1", alt: "" },
  { src: "/club/source/community/avatar-2-sm.png", className: "club-csetup__bubble--2", alt: "" },
  { src: "/club/source/community/avatar-3-sm.png", className: "club-csetup__bubble--3", alt: "" },
] as const;

function SetupIcon({ type }: { type: (typeof ITEMS)[number]["icon"] }) {
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </svg>
    );
  }
  if (type === "support") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 18v-5a7 7 0 0 1 14 0v5" />
        <path d="M5 15H4a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h1" />
        <path d="M19 15h1a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-1" />
        <path d="M12 19a2 2 0 0 0 2 2h0" />
      </svg>
    );
  }
  if (type === "chat") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 18H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v2" />
        <path d="M9 21h10a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4h8v3H8z" />
      <path d="M7 7h10v13H7z" />
      <path d="M10 11h4M10 15h4" />
    </svg>
  );
}

export default function ClubCommunitySetupSection() {
  return (
    <div
      id="rec1145742951"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="396"
      data-bg-color="#0c0e12"
      suppressHydrationWarning
    >
      <style dangerouslySetInnerHTML={{ __html: CLUB_COMMUNITY_SETUP_CSS }} />
      <section className="club-csetup" aria-labelledby="club-csetup-title">
        <div className="club-csetup__shell">
          <div className="club-csetup__layout">
            <div className="club-csetup__left">
              <h2 id="club-csetup-title" className="club-csetup__title">
                Сообщество устроено <span>просто, и интуитивно</span> понятно
              </h2>

              <div className="club-csetup__visual" aria-hidden="true">
                <div className="club-csetup__glow" />

                <div className="club-csetup__fly" aria-hidden="true">
                  <span className="club-csetup__orb club-csetup__orb--rocket club-csetup__orb--fly-a">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3c2.5 2.2 4 5.4 4 9.2 0 1.4-.2 2.6-.6 3.8L12 21l-3.4-5c-.4-1.2-.6-2.4-.6-3.8C8 8.4 9.5 5.2 12 3Z" />
                      <path d="M10 14.5c-1.8.4-3.2 1.4-4.2 2.8" />
                      <path d="M14 14.5c1.8.4 3.2 1.4 4.2 2.8" />
                      <circle cx="12" cy="10" r="1.4" />
                    </svg>
                  </span>
                  <span className="club-csetup__orb club-csetup__orb--heart club-csetup__orb--fly-b">
                    <svg viewBox="0 0 24 24">
                      <path d="M8.5 10.5c0-1.4 1-2.5 2.3-2.5 1 0 1.7.5 2.2 1.3.5-.8 1.2-1.3 2.2-1.3 1.3 0 2.3 1.1 2.3 2.5 0 2.8-4.5 5.8-4.5 5.8S8.5 13.3 8.5 10.5Z" />
                    </svg>
                  </span>
                  <span className="club-csetup__orb club-csetup__orb--kettle club-csetup__orb--fly-c">
                    <svg viewBox="0 0 24 24">
                      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
                      <path d="M7.5 8.5h9l.8 2.2c.7 2 .7 4.2 0 6.2L16.5 20h-9l-.8-3.1c-.7-2-.7-4.2 0-6.2L7.5 8.5Z" />
                    </svg>
                  </span>
                  <span className="club-csetup__orb club-csetup__orb--people club-csetup__orb--fly-d">
                    <svg viewBox="0 0 24 24">
                      <circle cx="9" cy="8" r="2.2" />
                      <circle cx="15.5" cy="8.5" r="1.8" />
                      <path d="M4.5 17.5c.8-3 2.6-4.5 4.5-4.5s3.7 1.5 4.5 4.5" />
                      <path d="M13 14.2c1.2-.7 2.4-.7 3.5.2 1 .8 1.7 2.2 2 3.1" />
                    </svg>
                  </span>
                  <span className="club-csetup__orb club-csetup__orb--dumbbell club-csetup__orb--fly-e">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 9v6M17 9v6M5 10.5v3M19 10.5v3M7 12h10" />
                    </svg>
                  </span>
                </div>

                <div className="club-csetup__pack">
                  <div className="club-csetup__pack-shine" />
                  <div className="club-csetup__pack-logo">
                    <Image
                      src="/club/source/community/eg-sticker-cut.png"
                      alt="EG Атмосфера 3D"
                      width={724}
                      height={470}
                      className="club-csetup__sticker"
                      priority={false}
                    />
                  </div>
                </div>

                {AVATARS.map((avatar) => (
                  <div
                    key={avatar.src}
                    className={`club-csetup__bubble ${avatar.className}`}
                  >
                    <Image src={avatar.src} alt={avatar.alt} fill sizes="72px" />
                  </div>
                ))}
              </div>
            </div>

            <div className="club-csetup__grid" role="list">
              {ITEMS.map((item) => (
                <article key={item.n} className="club-csetup__card" role="listitem">
                  <div className="club-csetup__meta">
                    <span className="club-csetup__num">{item.n}</span>
                    <span className="club-csetup__icon">
                      <SetupIcon type={item.icon} />
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="club-csetup__mobile">
            <div className="club-csetup__list" role="list">
              {ITEMS.map((item) => (
                <div key={item.n} className="club-csetup__row" role="listitem">
                  <span className="club-csetup__num">{item.n}</span>
                  <span className="club-csetup__icon">
                    <SetupIcon type={item.icon} />
                  </span>
                  <div className="club-csetup__row-body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <span className="club-csetup__chevron" aria-hidden="true">
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
