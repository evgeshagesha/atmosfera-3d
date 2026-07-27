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
  /** Stronger gray glow on the CTA — entry product. */
  featured?: boolean;
};

/** Photos from «для кого» / method set — square cards. */
const FORMAT_CARDS: FormatCard[] = [
  {
    id: "test",
    step: "1",
    title: "Начни отсюда",
    description: "Пройди тест и получи персональный план",
    cta: "Пройти тест | 684 ₽",
    href: "https://egoshev.ru/testik",
    image: "/assets/eg/method-deep.jpg",
    featured: true,
  },
  {
    id: "breath",
    step: "2",
    title: "Дыхание и осанка",
    description:
      "Мини-курс для свободного дыхания, грудной клетки и устойчивой осанки",
    cta: "Начать | 1 990 ₽",
    href: "https://egoshev.ru/dyhanieosanka",
    image: "/assets/eg/method-posture.jpg",
  },
  {
    id: "baza",
    step: "3",
    title: "Базовая настройка тела",
    description:
      "Программа, чтобы снять напряжение, вернуть подвижность и уверенность в движении",
    cta: "К программе | 9 990 ₽",
    href: "https://egoshev.ru/baza",
    image: "/assets/eg/method-training.jpg",
  },
  {
    id: "club",
    step: "4",
    title: "Онлайн-клуб «Атмосфера 3D»",
    description:
      "Регулярные тренировки, программы и поддержка для системного результата",
    cta: "Вступить | от 1 758 ₽/мес",
    href: "https://eg.egoshev.ru/club",
    image: "/assets/eg/method-pravilo.jpg",
  },
  {
    id: "kids",
    step: "5",
    title: "Атмосфера 3D Kids Camp",
    description:
      "Закрытые занятия и программы выходного дня для детей в мини-группе до четырёх человек",
    cta: "О программе",
    href: "https://eg.egoshev.ru/kids",
    image: "/assets/eg/method-mobility.jpg",
  },
  {
    id: "consultation",
    step: "6",
    title: "Онлайн-консультация",
    description:
      "Разберём ваш запрос и определим оптимальный маршрут работы",
    cta: "2 часа | 20 000 ₽",
    href: "https://egoshev.ru/anketaplan",
    image: "/assets/eg/online-consultation.png",
  },
];

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
              className={
                card.featured
                  ? "eg-formats__card eg-formats__card--featured"
                  : "eg-formats__card"
              }
              style={{
                backgroundImage: `url('${card.image}')`,
                ["--reveal-delay" as string]: `${index * 70}ms`,
              }}
              data-reveal
            >
              <div className="eg-formats__card-overlay" />
              <div className="eg-formats__card-body">
                <h3 className="eg-formats__card-title">
                  <span className="eg-formats__step">{card.step}.</span>{" "}
                  {card.title}
                </h3>
                <p className="eg-formats__card-text">{card.description}</p>
                <a
                  href={card.href}
                  className={
                    card.featured
                      ? "eg-formats__cta eg-formats__cta--glow"
                      : "eg-formats__cta"
                  }
                >
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
