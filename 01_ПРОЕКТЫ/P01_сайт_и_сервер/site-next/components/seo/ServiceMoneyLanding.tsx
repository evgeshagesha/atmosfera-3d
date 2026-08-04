import Link from "next/link";

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type ServiceMoneyLandingProps = {
  eyebrow: string;
  h1: string;
  answerFirst: string;
  bullets: string[];
  howItWorks: string[];
  faq: ServiceFaqItem[];
  relatedLinks: { href: string; label: string }[];
  primaryCtaLabel?: string;
};

const NAP = {
  name: "Атмосфера 3D",
  person: "Евгений Гошев",
  address: "ул. Вятская, 27с12, Москва",
  metro: "м. Савёловская",
  maps: "https://yandex.ru/maps/-/CTu240~o",
  phone: "+7 912 849-14-11",
  phoneHref: "tel:+79128491411",
};

export default function ServiceMoneyLanding({
  eyebrow,
  h1,
  answerFirst,
  bullets,
  howItWorks,
  faq,
  relatedLinks,
  primaryCtaLabel = "Записаться на приём в студии",
}: ServiceMoneyLandingProps) {
  return (
    <div className="eg-money">
      <header className="eg-money__nav">
        <Link href="/" className="eg-money__brand">
          Атмосфера 3D
        </Link>
        <nav className="eg-money__nav-links" aria-label="Разделы">
          <Link href="/#online">Онлайн</Link>
          <Link href="/club">Клуб</Link>
          <Link href="/blog">Блог</Link>
          <Link href="/anketa" className="eg-money__nav-cta">
            Анкета
          </Link>
        </nav>
      </header>

      <main>
        <section className="eg-money__hero">
          <p className="eg-money__eyebrow">{eyebrow}</p>
          <h1 className="eg-money__h1">{h1}</h1>
          <p className="eg-money__lead">{answerFirst}</p>
          <div className="eg-money__cta-row">
            <Link href="/anketa" className="eg-money__btn eg-money__btn--primary">
              {primaryCtaLabel}
              <span aria-hidden="true"> →</span>
            </Link>
            <a href="/#online" className="eg-money__btn eg-money__btn--ghost">
              Онлайн-форматы
            </a>
          </div>
        </section>

        <section className="eg-money__section" aria-labelledby="what-title">
          <h2 id="what-title" className="eg-money__h2">
            Что это даёт
          </h2>
          <ul className="eg-money__list">
            {bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="eg-money__section" aria-labelledby="how-title">
          <h2 id="how-title" className="eg-money__h2">
            Как устроена работа
          </h2>
          <ol className="eg-money__steps">
            {howItWorks.map((step, index) => (
              <li key={step}>
                <span className="eg-money__step-num">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="eg-money__section eg-money__nap" aria-labelledby="where-title">
          <h2 id="where-title" className="eg-money__h2">
            Где принимаю
          </h2>
          <p>
            <strong>{NAP.name}</strong> · {NAP.person}
          </p>
          <p>
            {NAP.address} · {NAP.metro}
          </p>
          <p>
            <a href={NAP.maps} target="_blank" rel="noreferrer">
              Открыть на Яндекс Картах
            </a>
            {" · "}
            <a href={NAP.phoneHref}>{NAP.phone}</a>
          </p>
        </section>

        <section className="eg-money__section" aria-labelledby="faq-title">
          <h2 id="faq-title" className="eg-money__h2">
            Частые вопросы
          </h2>
          <div className="eg-money__faq">
            {faq.map((item) => (
              <details key={item.question} className="eg-money__faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="eg-money__section eg-money__cta-block" aria-labelledby="cta-title">
          <h2 id="cta-title" className="eg-money__h2">
            Следующий шаг
          </h2>
          <p className="eg-money__cta-copy">
            Заполните анкету — разберём запрос и предложим формат: студия в
            Москве или онлайн-маршрут.
          </p>
          <div className="eg-money__cta-row">
            <Link href="/anketa" className="eg-money__btn eg-money__btn--primary">
              Заполнить анкету
              <span aria-hidden="true"> →</span>
            </Link>
            <Link href="/club" className="eg-money__btn eg-money__btn--ghost">
              Клуб Атмосфера 3D
            </Link>
          </div>
        </section>

        <section className="eg-money__section" aria-labelledby="related-title">
          <h2 id="related-title" className="eg-money__h2">
            Ещё по теме
          </h2>
          <ul className="eg-money__related">
            {relatedLinks.map((link) => {
              const external = /^https?:\/\//i.test(link.href);
              return (
                <li key={link.href}>
                  {external ? (
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </main>

      <footer className="eg-money__footer">
        <p>
          © {new Date().getFullYear()} {NAP.person} · {NAP.name} · Москва
        </p>
        <p>
          <Link href="/">Главная</Link>
          {" · "}
          <Link href="/uslugi">Услуги</Link>
          {" · "}
          <Link href="/policy">Политика</Link>
        </p>
      </footer>
    </div>
  );
}

export { NAP };
