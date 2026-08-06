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
          <div className="st-brand">
            <span className="st-brand__name">{c.brand.name}</span>
            <span className="st-brand__pillars">{c.brand.pillars}</span>
          </div>
          <button
            type="button"
            className="st-btn st-btn--ghost st-btn--sm"
            onClick={() => openForm("strategy_header_cta")}
          >
            {c.header.cta}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="st-hero" aria-labelledby="st-hero-title">
          <div className="st-container st-hero__grid">
            <div className="st-hero__copy">
              <p className="st-eyebrow">{c.hero.eyebrow}</p>
              <h1 id="st-hero-title" className="st-hero__title">
                <span className="st-hero__title-line">{c.hero.titleLine1}</span>
                <span className="st-hero__title-accent">{c.hero.titleLine2}</span>
              </h1>
              <p className="st-hero__body">{c.hero.body}</p>
              <p className="st-hero__body-accent">{c.hero.bodyAccent}</p>

              <ul className="st-hero__insights" aria-label="Что станет понятно">
                {c.hero.insights.map((item) => (
                  <li key={item.text} className="st-hero__insight">
                    <StrategyIcon name={item.icon} />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>

              <div className="st-hero__actions">
                <button
                  type="button"
                  className="st-btn st-btn--primary"
                  onClick={() => openForm("strategy_hero_cta")}
                >
                  {c.hero.primaryCta}
                </button>
                <button
                  type="button"
                  className="st-text-link st-text-link--btn"
                  onClick={() => openForm("strategy_hero_secondary")}
                >
                  {c.hero.secondaryCta}
                </button>
              </div>
              <p className="st-price-line">{c.hero.priceLine}</p>
            </div>

            <div className="st-hero__media">
              <div className="st-hero__frame">
                <Image
                  className="st-hero__photo"
                  src={p.heroImage}
                  alt={c.hero.photoAlt}
                  width={819}
                  height={1024}
                  priority
                  sizes="(max-width: 900px) 90vw, 420px"
                />
                <div className="st-hero__fade" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="st-container">
            <ul className="st-glass" aria-label="Что входит в систему">
              {c.benefits.map((item) => (
                <li key={item.title} className="st-glass__item">
                  <StrategyIcon name={item.icon} />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
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
