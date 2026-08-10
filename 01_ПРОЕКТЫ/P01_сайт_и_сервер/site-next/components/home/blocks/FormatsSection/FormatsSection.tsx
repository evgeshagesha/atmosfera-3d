import FormatsReveal from "./FormatsReveal";
import { FORMATS_SECTION_CSS } from "./styles";

type FormatCard = {
  id: string;
  step: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  /** Emphasized bestseller frame (gold / bronze). */
  featured?: boolean;
  /** Club accent (cyan / blue). */
  club?: boolean;
  /** Keep title on one line (club card). */
  titleNowrap?: boolean;
  badges?: string[];
};

/**
 * Home formats — exactly 4 cards, 2×2.
 * Prices are not shown in this section (copy only).
 */
const FORMAT_CARDS: FormatCard[] = [
  {
    id: "strategy",
    step: "1",
    title: "Получить персональный план на 30 дней",
    description:
      "Персональная стратегия: разбор, сессия и система на каждый день под ваши цели",
    cta: "Получить план",
    href: "https://eg.egoshev.ru/strategy",
    image: "/assets/eg/format-strategy-plan.webp",
    featured: true,
    badges: ["Bestseller", "Выбор клиентов"],
  },
  {
    id: "club",
    step: "2",
    title: "Онлайн-клуб «Атмосфера 3D»",
    description:
      "Регулярные тренировки, программы и поддержка для системного результата",
    cta: "Вступить",
    href: "https://eg.egoshev.ru/club",
    image: "/assets/eg/method-pravilo.jpg",
    club: true,
    titleNowrap: true,
  },
  {
    id: "breath",
    step: "3",
    title: "Мини-курс «Дыхание / осанка»",
    description:
      "Свободное дыхание, подвижность грудной клетки и более устойчивое положение тела",
    cta: "Начать",
    href: "https://egoshev.ru/dyhanieosanka",
    image: "/assets/eg/method-posture.jpg",
  },
  {
    id: "baza",
    step: "4",
    title: "Курс «Базовая настройка тела»",
    description:
      "Фундамент: снять скованность, вернуть подвижность и контроль в движении",
    cta: "К программе",
    href: "https://egoshev.ru/baza",
    image: "/assets/eg/method-training.jpg",
  },
];

function cardClassName(card: FormatCard): string {
  const classes = ["eg-formats__card"];
  if (card.featured) classes.push("eg-formats__card--featured");
  if (card.club) classes.push("eg-formats__card--club");
  return classes.join(" ");
}

function ctaClassName(card: FormatCard): string {
  if (card.featured) return "eg-formats__cta eg-formats__cta--glow";
  if (card.club) return "eg-formats__cta eg-formats__cta--club";
  return "eg-formats__cta";
}

function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function FormatsSection() {
  return (
    <div id="online" data-site-block="rec2034125511-wrap">
      <StyleTag css={FORMATS_SECTION_CSS} />
      <section
        id="rec2034125511"
        className="eg-formats"
        aria-labelledby="eg-formats-heading"
      >
        <header className="eg-formats__header" data-reveal>
          <p className="eg-formats__eyebrow">Онлайн-программы и форматы работы</p>
          <h2 id="eg-formats-heading" className="eg-formats__title">
            Выберите подходящий формат работы
          </h2>
        </header>

        <div className="eg-formats__grid">
          {FORMAT_CARDS.map((card, index) => (
            <article
              key={card.id}
              className={cardClassName(card)}
              style={{
                backgroundImage: `url('${card.image}')`,
                ["--reveal-delay" as string]: `${index * 70}ms`,
              }}
              data-reveal
            >
              <div className="eg-formats__card-overlay" />
              {card.badges?.length ? (
                <div className="eg-formats__badges" aria-label="Метки">
                  {card.badges.map((badge) => (
                    <span key={badge} className="eg-formats__badge">
                      {badge}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="eg-formats__card-body">
                <h3
                  className={
                    card.titleNowrap
                      ? "eg-formats__card-title eg-formats__card-title--nowrap"
                      : "eg-formats__card-title"
                  }
                >
                  <span className="eg-formats__step">{card.step}.</span>{" "}
                  {card.title}
                </h3>
                <p className="eg-formats__card-text">{card.description}</p>
                <a href={card.href} className={ctaClassName(card)}>
                  {card.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <FormatsReveal />
    </div>
  );
}
