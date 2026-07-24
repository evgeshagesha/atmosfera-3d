import AudienceSlider from "./AudienceSlider";
import { AUDIENCE_SECTION_CSS } from "./styles";

function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

type AudienceCard = {
  id: string;
  title: string;
  description: string;
  image: string;
};

/** «Для кого» — состояния и запросы, с которыми приходят ко мне. */
const AUDIENCE_CARDS: AudienceCard[] = [
  {
    id: "tension",
    title: "Хроническое напряжение",
    description:
      "Тело живёт в постоянном тонусе — трудно расслабиться и по-настоящему восстановиться.",
    image: "/assets/eg/method-deep.jpg",
  },
  {
    id: "pain",
    title: "Боль и дискомфорт",
    description:
      "Неприятные ощущения в спине, шее или суставах мешают двигаться свободно.",
    image: "/assets/eg/method-massage.jpg",
  },
  {
    id: "posture",
    title: "Нарушение осанки",
    description:
      "Сутулость, перекосы и привычные компенсации в положении тела.",
    image: "/assets/eg/method-posture.jpg",
  },
  {
    id: "mobility",
    title: "Ограничение подвижности",
    description:
      "Скованность и ощущение, что тело двигается не так свободно, как хочется.",
    image: "/assets/eg/method-mobility.jpg",
  },
  {
    id: "recovery",
    title: "Восстановление и телесные практики",
    description:
      "Хочется мягко освободить ткани, наладить дыхание и вернуть телу лёгкость.",
    image: "/assets/eg/method-pravilo.jpg",
  },
  {
    id: "training",
    title: "Функциональные тренировки",
    description:
      "Готовы двигаться дальше: сила, выносливость и уверенный контроль над телом.",
    image: "/assets/eg/method-training.jpg",
  },
];

export default function AudienceIntroSection() {
  return (
    <div
      id="rec2040539251"
      className="r t-rec t-rec_pt_0 t-rec_pt-res-480_0 t-rec_pb_0 t-rec_pb-res-480_0 eg-audience"
      style={{ paddingTop: "0px", paddingBottom: "0px", backgroundColor: "#000000" }}
      data-record-type="43"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <StyleTag css={AUDIENCE_SECTION_CSS} />
      <div className="eg-audience__inner">
        <header className="eg-audience__head" data-reveal>
          <p className="eg-audience__eyebrow">Кому это подходит</p>
          <h2 className="eg-audience__title">для кого?</h2>
          <p className="eg-audience__descr">
            Ко мне приходят и спортсмены, и люди без специальной подготовки.
            Моя задача — подобрать персональный комплекс и выстроить системную
            работу с телом: телесные практики, массажные техники, восстановление
            и функциональные тренировки.
          </p>
        </header>

        <div className="eg-audience__track-wrap">
          <ul
            id="eg-audience-track"
            className="eg-audience__grid"
            aria-label="Для кого — состояния и запросы"
          >
            {AUDIENCE_CARDS.map((card, index) => (
              <li
                key={card.id}
                className="eg-audience__card"
                style={{
                  backgroundImage: `url('${card.image}')`,
                  ["--reveal-delay" as string]: `${Math.min(index, 4) * 70}ms`,
                }}
                data-reveal
              >
                <div className="eg-audience__card-overlay" />
                <div className="eg-audience__card-body">
                  <h3 className="eg-audience__card-title">{card.title}</h3>
                  <p className="eg-audience__card-text">{card.description}</p>
                  <a href="#online" className="eg-audience__cta">
                    Выбрать формат
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <div className="eg-audience__nav">
            <button
              type="button"
              className="eg-audience__btn"
              data-aud-prev
              aria-label="Предыдущая карточка"
            >
              ‹
            </button>
            <button
              type="button"
              className="eg-audience__btn"
              data-aud-next
              aria-label="Следующая карточка"
            >
              ›
            </button>
          </div>
        </div>
      </div>
      <AudienceSlider />
    </div>
  );
}
