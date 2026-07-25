import Image from "next/image";

import { ABOUT_V2_CSS } from "./v2-styles";

const WIKIPEDIA_URL =
  "https://ru.wikipedia.org/wiki/%D0%93%D0%BE%D1%88%D0%B5%D0%B2,_%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B5%D0%B2%D0%B8%D1%87";

const FEATURES = [
  {
    icon: "experience",
    title: "15+ лет опыта",
    text: "Профессиональный спорт, работа с телом и практический опыт восстановления движения.",
  },
  {
    icon: "medical",
    title: "Медицинская база",
    text: "Имея медицинское образование, прохожу постоянные клинические практики.",
  },
  {
    icon: "integration",
    title: "Комплексная работа с телом",
    text: "Соединяю телесные практики, восстановление, биомеханику и функциональные тренировки, чтобы дать телу опору, свободу движения и устойчивый результат.",
  },
  {
    icon: "system",
    title: "Системный подход",
    text: "Я работаю не с симптомом изолированно, а с телом как с единой биомеханической системой. Ткани, дыхание, осанка, движение и постепенная прогрессия нагрузки.",
  },
] as const;

function AboutIcon({ type }: { type: (typeof FEATURES)[number]["icon"] }) {
  if (type === "medical") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="12" />
        <path d="M16 9v14M9 16h14" />
      </svg>
    );
  }
  if (type === "system") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="6" r="3" />
        <path d="M10 28V17l-4 3-3-4 8-6h10l8 6-3 4-4-3v11M12 16h8M16 10v18" />
      </svg>
    );
  }
  if (type === "integration") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="m13 19-2 2a5 5 0 0 1-7-7l5-5a5 5 0 0 1 7 0M19 13l2-2a5 5 0 1 1 7 7l-5 5a5 5 0 0 1-7 0M11 21l10-10" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M10 4h12v5c0 5-2 8-6 10-4-2-6-5-6-10V4Zm2 15-2 9h12l-2-9M7 6H3c0 5 2 8 7 9M25 6h4c0 5-2 8-7 9" />
    </svg>
  );
}

export default function AboutSectionV2() {
  return (
    <section
      id="rec2034125521"
      className="eg-about"
      aria-labelledby="eg-about-title"
    >
      <style dangerouslySetInnerHTML={{ __html: ABOUT_V2_CSS }} />
      <div className="eg-about__inner">
        <div className="eg-about__copy">
          <p className="eg-about__eyebrow">Обо мне</p>
          <h2 id="eg-about-title">Евгений Гошев</h2>
          <p className="eg-about__text">
            Я профессиональный спортсмен, физический терапевт и специалист по
            биомеханике, телесным практикам и комплексной работе с телом.
          </p>
        </div>

        <div className="eg-about__photo">
          <Image
            src="/assets/eg/about-evgeny-football.png"
            alt="Евгений Гошев — профессиональный спортсмен и физический терапевт"
            fill
            sizes="(max-width: 760px) calc(100vw - 32px), 48vw"
          />
        </div>

        <div className="eg-about__features">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="eg-about__feature">
              <span className="eg-about__feature-icon">
                <AboutIcon type={feature.icon} />
              </span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </article>
          ))}
        </div>

        <a
          className="eg-about__wiki"
          href={WIKIPEDIA_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Википедия <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
