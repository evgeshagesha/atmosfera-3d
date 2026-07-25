import ReviewsSlider from "./ReviewsSlider";
import { GALLERY_V2_CSS } from "./v2-styles";

const REVIEWS = [
  {
    name: "Елизавета Г.",
    avatar: "ЕГ",
    meta: "Знаток города 4 уровня · 28 марта",
    text: [
      "Была на функциональной тренировке. У меня болели колено и поясница, поэтому обычный фитнес мне не подходил.",
      "Евгений протестировал меня и подобрал специальные упражнения. После тренировки и восстановления поясница практически полностью прошла. Для себя поняла основной момент: важно укреплять ягодицы — от них зависит стабильность колена.",
      "Очень крутая wellness-студия, уже записалась на следующую тренировку.",
    ],
  },
  {
    name: "AA",
    avatar: "AA",
    meta: "180K просмотров · 6 дней назад",
    text: [
      "Евгений — настоящий фанатик своего дела. Видит мышцы насквозь и скрупулёзно ищет проблемные места. Видно, что человек — профессиональный спортсмен и хорошо знает анатомию.",
    ],
  },
  {
    name: "Мария И.",
    avatar: "МИ",
    meta: "6 лайков · 5 апреля",
    text: [
      "10 из 10! Вновь двигаюсь, чувствуя тело полностью. Профессиональный подход, сбор анамнеза, индивидуальная работа и результат.",
    ],
  },
  {
    name: "Лиза Брандт",
    avatar: "ЛБ",
    meta: "11 лайков · 3 дня назад",
    text: [
      "Отличный массаж. С первых минут чувствуется индивидуальный подход и внимание к пожеланиям. После сеанса появляется лёгкость.",
    ],
  },
  {
    name: "Юлия Р.",
    avatar: "ЮР",
    meta: "Знаток города 3 уровня · 5 дней назад",
    text: [
      "Посетила тренировку с детьми. Евгений к каждому находит позитивный подход и тактично всё объясняет. Занятия прошли в атмосфере доверия.",
    ],
  },
  {
    name: "Сергей Ефимов",
    avatar: "СЕ",
    meta: "10 отзывов · 9 апреля",
    text: [
      "Я спортсмен и занимаюсь парусным спортом. На тренировке пополнил запас знаний по мобильности и координации. Понравились разнообразие и профессиональный подход.",
    ],
  },
] as const;

function Stars() {
  return (
    <span className="eg-review-card__stars" aria-label="Оценка: 5 из 5">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 20 20" aria-hidden="true">
          <path d="m10 1.8 2.45 4.96 5.47.8-3.96 3.85.94 5.45L10 14.29l-4.9 2.57.94-5.45-3.96-3.86 5.47-.79L10 1.8Z" />
        </svg>
      ))}
    </span>
  );
}

export default function GallerySectionV2() {
  return (
    <section
      id="rec2224175751"
      className="eg-reviews-v2"
      aria-labelledby="eg-reviews-v2-title"
    >
      <style dangerouslySetInnerHTML={{ __html: GALLERY_V2_CSS }} />
      <div className="eg-reviews-v2__inner">
        <header className="eg-reviews-v2__head">
          <p>Доверие и результат</p>
          <h2 id="eg-reviews-v2-title">Отзывы</h2>
          <span>Реальные отзывы клиентов о работе со мной</span>
        </header>

        <div className="eg-reviews-v2__slider">
          <ul
            id="eg-reviews-v2-track"
            className="eg-reviews-v2__track"
            aria-label="Отзывы клиентов"
          >
            {REVIEWS.map((review) => (
              <li key={review.name} className="eg-review-card">
                <div className="eg-review-card__head">
                  <span className="eg-review-card__avatar">{review.avatar}</span>
                  <div>
                    <h3>{review.name}</h3>
                    <p>{review.meta}</p>
                  </div>
                  <span className="eg-review-card__quote" aria-hidden="true">
                    ”
                  </span>
                </div>
                <Stars />
                <div className="eg-review-card__text">
                  {review.text.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <div className="eg-reviews-v2__nav">
            <button
              type="button"
              className="eg-reviews-v2__btn"
              data-reviews-prev
              aria-label="Предыдущий отзыв"
            >
              ‹
            </button>
            <button
              type="button"
              className="eg-reviews-v2__btn"
              data-reviews-next
              aria-label="Следующий отзыв"
            >
              ›
            </button>
          </div>
        </div>
      </div>
      <ReviewsSlider />
    </section>
  );
}
