"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

import StrategyFormModal from "@/components/strategy/StrategyFormModal";
import StrategyIcon from "@/components/strategy/StrategyIcon";
import { STRATEGY_CONTENT, STRATEGY_PRODUCT } from "@/lib/strategy/content";

function track(event: string) {
  try {
    const w = window as Window & { dataLayer?: Array<Record<string, unknown>> };
    w.dataLayer?.push({ event });
  } catch {
    /* noop */
  }
}

export default function StrategyLanding() {
  const c = STRATEGY_CONTENT;
  const p = STRATEGY_PRODUCT;
  const [formOpen, setFormOpen] = useState(false);

  const openForm = useCallback((source: string) => {
    track(source);
    setFormOpen(true);
  }, []);

  return (
    <div className="st-page">
      <a className="st-skip" href="#main">
        К содержимому
      </a>

      <header className="st-header">
        <div className="st-container st-header__inner">
          <Link href="/" className="st-brand" aria-label="Евгений Гошев — на главную">
            <span className="st-brand__logo">{c.brand.name}</span>
          </Link>
          <button
            type="button"
            className="st-menu-btn"
            aria-label={c.header.menuLabel}
            onClick={() => openForm("strategy_header_menu")}
          >
            <span className="st-menu-btn__bar" />
            <span className="st-menu-btn__bar" />
            <span className="st-menu-btn__bar" />
          </button>
        </div>
      </header>

      <main id="main">
        <section className="st-hero" aria-labelledby="st-hero-title">
          <div className="st-hero__media">
            <div className="st-hero__frame">
              <Image
                className="st-hero__photo"
                src={p.heroImage}
                alt={c.hero.photoAlt}
                width={819}
                height={1024}
                priority
                sizes="(max-width: 900px) 100vw, 52vw"
              />
              <div className="st-hero__fade st-hero__fade--bottom" aria-hidden="true" />
              <div className="st-hero__fade st-hero__fade--left" aria-hidden="true" />
            </div>
          </div>

          <div className="st-container st-hero__copy">
            <p className="st-eyebrow">
              <span className="st-eyebrow__bar" aria-hidden="true" />
              <span>{c.hero.eyebrow}</span>
            </p>

            <h1 id="st-hero-title" className="st-hero__title">
              <span className="st-hero__title-line">{c.hero.titleLine1}</span>
              <span className="st-hero__title-accent">{c.hero.titleLine2}</span>
            </h1>

            <p className="st-hero__body">{c.hero.body}</p>

            <ul className="st-features" aria-label="Что входит">
              {c.hero.features.map((item) => (
                <li key={item.title} className="st-features__item">
                  <StrategyIcon name={item.icon} />
                  <div className="st-features__text">
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="st-hero__offer">
              <div className="st-price">
                <span className="st-price__label">{c.hero.priceLabel}</span>
                <div className="st-price__row">
                  <span className="st-price__main">{p.priceLabel}</span>
                  <span className="st-price__divider" aria-hidden="true" />
                  <span className="st-price__day">
                    <span className="st-price__day-value">{p.pricePerDayLabel}</span>
                    <span className="st-price__day-suffix">{c.hero.pricePerDaySuffix}</span>
                  </span>
                </div>
              </div>

              <div className="st-hero__cta-row">
                <button
                  type="button"
                  className="st-btn st-btn--primary st-btn--hero"
                  onClick={() => openForm("strategy_hero_cta")}
                >
                  {c.hero.primaryCta}
                </button>
                <p className="st-trust">
                  <StrategyIcon name="lock" />
                  <span>
                    {c.hero.trustBefore}
                    <a href={p.anketaplanUrl} className="st-trust__link">
                      {c.hero.trustLink}
                    </a>
                    {c.hero.trustAfter}
                  </span>
                </p>
              </div>
            </div>

            <ul className="st-badges" aria-label="Формат работы">
              {c.hero.badges.map((badge) => (
                <li key={badge.text} className="st-badges__item">
                  <StrategyIcon name={badge.icon} />
                  <span>{badge.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {c.placeholders.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="st-placeholder"
            aria-labelledby={`${section.id}-title`}
          >
            <div className="st-container">
              <h2 id={`${section.id}-title`} className="st-h2">
                {section.title}
              </h2>
              <p className="st-muted">{section.note}</p>
              {section.id === "expert" ? (
                <ul className="st-expert-list">
                  {c.expertBrief.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : null}
              {section.id === "inside" ? (
                <ul className="st-includes">
                  {c.productIncludes.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : null}
              {section.id === "price" ? (
                <div className="st-price-card">
                  <p className="st-price-card__value">{p.priceLabel}</p>
                  <p className="st-muted">Онлайн или очно в Москве · заявка, не мгновенная оплата</p>
                  <button
                    type="button"
                    className="st-btn st-btn--primary"
                    onClick={() => openForm("strategy_price_cta")}
                  >
                    {c.hero.primaryCta}
                  </button>
                </div>
              ) : null}
            </div>
          </section>
        ))}
      </main>

      <footer className="st-footer">
        <div className="st-container st-footer__inner">
          <p>{c.footer.note}</p>
          <p className="st-footer__phrase">{c.footer.brandPhrase}</p>
          <p className="st-footer__legal">
            <Link href={p.policyUrl}>Политика</Link>
            {" · "}
            <Link href={p.personalConsentUrl}>Согласие на ПДн</Link>
            {" · "}
            <Link href="/">Главная</Link>
          </p>
        </div>
      </footer>

      <StrategyFormModal open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
}
