import Image from "next/image";
import Link from "next/link";

import ClubMotion from "@/components/club/ClubMotion";
import {
  CLUB_FAQ,
  CLUB_FOR_WHOM,
  CLUB_INSIDE,
  CLUB_LIBRARY,
  CLUB_NAV,
  CLUB_OUTCOMES,
  CLUB_PATHS,
  CLUB_PILLARS,
  CLUB_PRICE_FROM,
  CLUB_ROADBLOCKS,
  CLUB_STATS,
  CLUB_STEPS,
  CLUB_SUPPORT_TG,
  CLUB_TRIBUTE_TG,
  CLUB_TRIBUTE_WEB,
  CLUB_WEEK,
} from "@/lib/club/landing-content";

import "./club-landing.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4 10 4 4 8-9" />
    </svg>
  );
}

function CtaLink({
  children = "Вступить в клуб",
  secondary = false,
  compact = false,
}: {
  children?: React.ReactNode;
  secondary?: boolean;
  compact?: boolean;
}) {
  return (
    <a
      className={[
        "club-btn",
        secondary ? "club-btn--ghost" : "",
        compact ? "club-btn--compact" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      href={secondary ? CLUB_TRIBUTE_WEB : CLUB_TRIBUTE_TG}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{children}</span>
      <ArrowIcon />
    </a>
  );
}

function SectionHead({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={`club-section-head club-section-head--${align}`} data-club-reveal>
      <p className="club-kicker">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </header>
  );
}

export default function ClubLandingPage() {
  return (
    <div className="club-page">
      <ClubMotion />
      <a className="club-skip" href="#club-main">
        Перейти к содержанию
      </a>

      <header className="club-nav">
        <div className="club-shell club-nav__inner">
          <Link className="club-nav__brand" href="/" aria-label="Атмосфера 3D — на главную">
            <Image
              src="/club/source/eg-logo-white.png"
              alt="EG Атмосфера 3D"
              width={160}
              height={106}
              priority
            />
          </Link>
          <nav className="club-nav__links" aria-label="Навигация клуба">
            {CLUB_NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <CtaLink compact />
        </div>
      </header>

      <main id="club-main">
        <section className="club-hero">
          <div className="club-hero__media" aria-hidden="true">
            <video autoPlay muted loop playsInline preload="metadata" poster="/club/source/hero-brand.png">
              <source src="/club/generated/club-hero.mp4" type="video/mp4" />
            </video>
            <Image
              className="club-hero__poster"
              src="/club/source/hero-brand.png"
              alt=""
              fill
              sizes="100vw"
              priority
            />
          </div>
          <div className="club-hero__shade" />
          <div className="club-shell club-hero__content">
            <p className="club-kicker">Онлайн-клуб Евгения Гошева</p>
            <h1>
              Соберите тело
              <br />
              <span>в систему</span>
            </h1>
            <p className="club-hero__lead">
              Понятный маршрут от базовой настройки и дыхания — к свободному движению,
              силе и устойчивому ритму.
            </p>
            <div className="club-hero__actions">
              <CtaLink>Получить доступ</CtaLink>
              <a className="club-text-link" href="#inside">
                Посмотреть, что внутри <ArrowIcon />
              </a>
            </div>
            <div className="club-hero__proof" aria-label="Преимущества клуба">
              <span>15–30 минут</span>
              <span>Дом или зал</span>
              <span>Поддержка</span>
              <span>От {CLUB_PRICE_FROM} ₽/мес</span>
            </div>
          </div>
        </section>

        <section className="club-statbar" aria-label="Клуб в цифрах">
          <div className="club-statbar__track">
            {[...CLUB_STATS, ...CLUB_STATS].map((stat, index) => (
              <div className="club-stat" key={`${stat.label}-${index}`}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="club-manifesto club-section" id="about">
          <div className="club-shell">
            <p className="club-kicker" data-club-reveal>
              Не очередной набор тренировок
            </p>
            <div className="club-manifesto__grid">
              <h2 data-club-reveal>
                Вы всегда знаете,
                <br />
                <span>что делать дальше</span>
              </h2>
              <div className="club-manifesto__copy" data-club-reveal>
                <p>
                  Большинство людей застревают не из-за отсутствия старания. Им не
                  хватает последовательной системы, в которой каждый следующий шаг
                  опирается на предыдущий.
                </p>
                <p>
                  В клубе движение, дыхание и дисциплина собраны в единый маршрут:
                  оценить состояние, настроить базу, вернуть качество движения и
                  постепенно укреплять функцию.
                </p>
                <CtaLink secondary>Увидеть программу</CtaLink>
              </div>
            </div>
          </div>
        </section>

        <section className="club-paths club-section" id="for-whom">
          <div className="club-shell">
            <SectionHead
              eyebrow="Два входа — одна система"
              title="Выберите свой вектор"
              text="Не нужно соответствовать чужому уровню. Начните с той задачи, которая важна вашему телу сейчас."
            />
            <div className="club-paths__grid">
              {CLUB_PATHS.map((path, index) => (
                <article className="club-path" key={path.title} data-club-reveal>
                  <Image
                    src={
                      index === 0
                        ? "/club/source/evgeny-stage.png"
                        : "/club/source/evgeny-training.png"
                    }
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                  <div className="club-path__shade" />
                  <div className="club-path__content">
                    <p className="club-kicker">{path.eyebrow}</p>
                    <h3>{path.title}</h3>
                    <p>{path.text}</p>
                    <ul>
                      {path.points.map((point) => (
                        <li key={point}>
                          <CheckIcon />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="club-roadblocks club-section">
          <div className="club-shell">
            <SectionHead
              eyebrow="Почему результат не закрепляется"
              title="Проблема не в вашей силе воли"
              text="Чаще всего мешает не человек, а система без логики, ритма и понятной прогрессии."
            />
            <div className="club-roadblocks__grid">
              {CLUB_ROADBLOCKS.map((item, index) => (
                <article className="club-roadblock" key={item.title} data-club-reveal>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="club-system club-section">
          <div className="club-shell club-system__grid">
            <div className="club-system__visual" data-club-reveal>
              <Image
                src="/club/generated/club-system-visual.png"
                alt="Движение тела как взаимосвязанная система"
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
              />
            </div>
            <div className="club-system__content">
              <SectionHead
                eyebrow="Метод Атмосфера 3D"
                title="Тело работает целиком"
                text="Поэтому мы не пытаемся улучшить одну часть в отрыве от остальных."
              />
              <div className="club-system__pillars">
                {CLUB_PILLARS.map((item, index) => (
                  <article key={item.title} data-club-reveal>
                    <span>0{index + 1}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="club-platform club-section" id="inside">
          <div className="club-shell">
            <SectionHead
              eyebrow="Внутри клуба"
              title="Всё собрано в одном пространстве"
              text="Открываете клуб — и видите не хаотичную ленту, а понятные направления работы."
              align="center"
            />
            <div className="club-platform__stage" data-club-reveal>
              <div className="club-platform__sidebar">
                <div className="club-platform__brand">
                  <Image src="/club/source/eg-logo-white.png" alt="" width={84} height={56} />
                  <span>Клуб</span>
                </div>
                <span className="is-active">Мой маршрут</span>
                <span>Библиотека</span>
                <span>Новые практики</span>
                <span>Сообщество</span>
              </div>
              <div className="club-platform__main">
                <div className="club-platform__top">
                  <div>
                    <small>Ваш текущий этап</small>
                    <h3>Базовая настройка тела</h3>
                  </div>
                  <strong>Шаг 01</strong>
                </div>
                <div className="club-library">
                  {CLUB_LIBRARY.map((item, index) => (
                    <article key={item.title}>
                      <div className={`club-library__art club-library__art--${index + 1}`}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <div>
                        <small>{item.tag}</small>
                        <h4>{item.title}</h4>
                        <p>{item.meta}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className="club-inside-grid">
              {CLUB_INSIDE.map((item, index) => (
                <article key={item.title} data-club-reveal>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="club-week club-section">
          <div className="club-shell">
            <SectionHead
              eyebrow="Ваш ритм"
              title="Неделя, в которой есть место телу"
              text="Это пример спокойного ритма. Вы выбираете практики под состояние, уровень и доступное время."
            />
            <div className="club-week__board" data-club-reveal>
              {CLUB_WEEK.map((item, index) => (
                <article className={index === 2 || index === 4 ? "is-accent" : ""} key={item.day}>
                  <span>{item.day}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                  </div>
                  <b>{index === 3 || index === 6 ? "—" : "→"}</b>
                </article>
              ))}
            </div>
            <div className="club-week__cta" data-club-reveal>
              <p>Не идеальная неделя. <strong>Устойчивая неделя.</strong></p>
              <CtaLink>Начать свой маршрут</CtaLink>
            </div>
          </div>
        </section>

        <section className="club-outcomes club-section">
          <div className="club-shell club-outcomes__grid">
            <div>
              <p className="club-kicker">Что меняется</p>
              <h2 data-club-reveal>
                От догадок
                <br />
                <span>к управляемости</span>
              </h2>
              <Image
                src="/club/source/body-system.png"
                alt="Схема тела как единой системы"
                width={1024}
                height={1024}
              />
            </div>
            <ul>
              {CLUB_OUTCOMES.map((item, index) => (
                <li key={item} data-club-reveal>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="club-author club-section">
          <div className="club-shell club-author__grid">
            <div className="club-author__collage" data-club-reveal>
              <div className="club-author__portrait">
                <Image
                  src="/club/source/evgeny-portrait.png"
                  alt="Евгений Гошев"
                  fill
                  sizes="(max-width: 767px) 70vw, 34vw"
                />
              </div>
              <div className="club-author__sport">
                <Image
                  src="/club/source/evgeny-football.png"
                  alt="Евгений Гошев — профессиональный спортсмен"
                  fill
                  sizes="(max-width: 767px) 45vw, 20vw"
                />
              </div>
            </div>
            <div className="club-author__content" data-club-reveal>
              <p className="club-kicker">Создатель системы</p>
              <h2>Евгений Гошев</h2>
              <p className="club-author__role">
                Физический терапевт · профессиональный спортсмен · специалист по
                биомеханике движения
              </p>
              <p>
                Я знаю тело не только по учебникам. Много лет я работаю с движением
                как спортсмен и специалист: оцениваю, ищу взаимосвязи, возвращаю базу
                и только затем добавляю нагрузку.
              </p>
              <p>
                Клуб — это способ передать эту логику в понятном формате, чтобы вы
                могли регулярно работать с телом и видеть направление следующего
                шага.
              </p>
              <div className="club-author__facts">
                <span>
                  <strong>15+</strong> лет практики
                </span>
                <span>
                  <strong>20+</strong> лет в спорте
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="club-pricing club-section" id="pricing">
          <div className="club-shell">
            <SectionHead
              eyebrow="Доступ в клуб"
              title="Начните сейчас"
              text="Выберите удобный период подписки в Tribute. Стоимость начинается от указанной суммы в пересчёте на месяц."
              align="center"
            />
            <article className="club-price-card" data-club-reveal>
              <div className="club-price-card__top">
                <div>
                  <p className="club-kicker">Атмосфера 3D</p>
                  <h3>Полный доступ к клубу</h3>
                </div>
                <span className="club-price-card__badge">Основной формат</span>
              </div>
              <div className="club-price-card__body">
                <div className="club-price-card__amount">
                  <small>от</small>
                  <strong>{CLUB_PRICE_FROM} ₽</strong>
                  <span>в месяц</span>
                </div>
                <ul>
                  <li><CheckIcon />Все программы и практики клуба</li>
                  <li><CheckIcon />Понятный стартовый маршрут</li>
                  <li><CheckIcon />Чат и поддержка сообщества</li>
                  <li><CheckIcon />Регулярные обновления</li>
                  <li><CheckIcon />Доступ через Telegram</li>
                </ul>
                <div className="club-price-card__actions">
                  <CtaLink>Выбрать период</CtaLink>
                  <p>Планы на 1, 3 и 6 месяцев — на странице Tribute</p>
                </div>
              </div>
            </article>
            <aside className="club-guarantee" data-club-reveal>
              <span>7</span>
              <div>
                <h3>Дней на знакомство с клубом</h3>
                <p>
                  Если формат вам не подошёл, возврат можно запросить в течение
                  семи дней с момента вступления — по условиям оферты.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="club-steps club-section">
          <div className="club-shell">
            <SectionHead
              eyebrow="Три шага"
              title="От решения — к движению"
              text="Без сложной регистрации и длинной настройки."
            />
            <div className="club-steps__grid">
              {CLUB_STEPS.map((item) => (
                <article key={item.step} data-club-reveal>
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="club-faq club-section" id="faq">
          <div className="club-shell club-faq__grid">
            <div>
              <p className="club-kicker">FAQ</p>
              <h2>Ответы перед стартом</h2>
              <p>
                Остался личный вопрос? Напишите мне — спокойно разберём, подходит ли
                вам клуб.
              </p>
              <a href={CLUB_SUPPORT_TG} target="_blank" rel="noopener noreferrer">
                Написать Евгению <ArrowIcon />
              </a>
            </div>
            <div className="club-faq__items">
              {CLUB_FAQ.map((item, index) => (
                <details key={item.q} data-club-reveal>
                  <summary>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {item.q}
                    <b>+</b>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="club-final">
          <Image
            src="/club/source/evgeny-stage.png"
            alt=""
            fill
            sizes="100vw"
          />
          <div className="club-final__shade" />
          <div className="club-shell club-final__content" data-club-reveal>
            <p className="club-kicker">Движение · дыхание · дисциплина</p>
            <h2>
              Ваше тело —
              <br />
              <span>не набор проблем</span>
            </h2>
            <p>Это система, которую можно понять, настроить и постепенно укрепить.</p>
            <CtaLink>Вступить в клуб</CtaLink>
          </div>
        </section>
      </main>

      <footer className="club-footer">
        <div className="club-shell club-footer__inner">
          <div>
            <Image
              src="/club/source/eg-logo-white.png"
              alt="EG Атмосфера 3D"
              width={150}
              height={100}
            />
            <p>Движение · дыхание · дисциплина</p>
          </div>
          <div className="club-footer__links">
            <Link href="/">Основной сайт</Link>
            <Link href="/oferta">Оферта</Link>
            <Link href="/policy">Политика</Link>
            <Link href="/personal">Персональные данные</Link>
          </div>
          <p>Самозанятый Гошев Евгений Николаевич<br />ИНН 366224223508</p>
        </div>
      </footer>

      <div className="club-mobile-cta">
        <div>
          <strong>от {CLUB_PRICE_FROM} ₽</strong>
          <span>в месяц</span>
        </div>
        <CtaLink compact>Вступить</CtaLink>
      </div>
    </div>
  );
}
