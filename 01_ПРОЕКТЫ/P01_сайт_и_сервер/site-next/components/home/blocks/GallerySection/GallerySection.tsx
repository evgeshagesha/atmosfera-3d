import GallerySlider from "./GallerySlider";
import { GALLERY_SECTION_CSS } from "./styles";

function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

/** Screenshots of real Yandex / Maps reviews — proof block. */
const REVIEW_SHOTS = [
  {
    src: "/assets/tild3064-6166-4364-a262-383130396564/IMG_3959.jpg",
    alt: "Отзыв клиента Атмосфера 3D — AA",
  },
  {
    src: "/assets/tild6533-3666-4733-b539-313164303035/IMG_3950.jpg",
    alt: "Отзыв клиента Атмосфера 3D",
  },
  {
    src: "/assets/tild3133-6432-4136-b337-343139656462/IMG_3951.jpg",
    alt: "Отзыв клиента Атмосфера 3D",
  },
  {
    src: "/assets/tild3434-3566-4531-b430-666634656135/IMG_3952.jpg",
    alt: "Отзыв клиента Атмосфера 3D",
  },
  {
    src: "/assets/tild6336-3166-4334-a533-653461643037/IMG_3953.jpg",
    alt: "Отзыв клиента Атмосфера 3D",
  },
  {
    src: "/assets/tild3662-6434-4363-b734-646533346563/IMG_3954.jpg",
    alt: "Отзыв клиента Атмосфера 3D",
  },
  {
    src: "/assets/tild3962-3366-4334-a465-343135333962/IMG_3955.jpg",
    alt: "Отзыв клиента Атмосфера 3D",
  },
  {
    src: "/assets/tild6236-3734-4734-a431-643361643164/IMG_3956.jpg",
    alt: "Отзыв клиента Атмосфера 3D",
  },
  {
    src: "/assets/tild3664-3834-4638-a135-323366333835/IMG_3957.jpg",
    alt: "Отзыв клиента Атмосфера 3D",
  },
] as const;

export default function GallerySection() {
  return (
    <section
      id="rec2224175751"
      className="eg-reviews-gallery"
      aria-labelledby="eg-reviews-gallery-heading"
      data-site-block="rec2224175751"
    >
      <StyleTag css={GALLERY_SECTION_CSS} />
      <div className="eg-reviews-gallery__inner">
        <header className="eg-reviews-gallery__head" data-reveal>
          <p className="eg-reviews-gallery__eyebrow">Доверие и результат</p>
          <h2
            id="eg-reviews-gallery-heading"
            className="eg-reviews-gallery__title"
          >
            Отзывы
          </h2>
          <p className="eg-reviews-gallery__descr">
            Реальные отзывы клиентов о работе со мной и студией Атмосфера 3D
          </p>
        </header>

        <div className="eg-reviews-gallery__track-wrap">
          <ul
            id="eg-reviews-gallery-track"
            className="eg-reviews-gallery__track"
            aria-label="Галерея отзывов"
          >
            {REVIEW_SHOTS.map((shot, index) => (
              <li
                key={shot.src}
                className="eg-reviews-gallery__item"
                style={{
                  ["--reveal-delay" as string]: `${Math.min(index, 4) * 70}ms`,
                }}
                data-reveal
              >
                <figure className="eg-reviews-gallery__card">
                  <img
                    className="eg-reviews-gallery__img"
                    src={shot.src}
                    alt={shot.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                  />
                </figure>
              </li>
            ))}
          </ul>
          <div className="eg-reviews-gallery__nav" aria-hidden="false">
            <button
              type="button"
              className="eg-reviews-gallery__btn"
              data-gallery-prev
              aria-label="Предыдущий отзыв"
            >
              ‹
            </button>
            <button
              type="button"
              className="eg-reviews-gallery__btn"
              data-gallery-next
              aria-label="Следующий отзыв"
            >
              ›
            </button>
          </div>
        </div>
      </div>
      <GallerySlider />
    </section>
  );
}
