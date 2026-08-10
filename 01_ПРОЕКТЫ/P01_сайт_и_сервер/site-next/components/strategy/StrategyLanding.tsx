"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

import StrategyFormModal from "@/components/strategy/StrategyFormModal";
import StrategyHowSection from "@/components/strategy/StrategyHowSection";
import StrategyIcon from "@/components/strategy/StrategyIcon";
import StrategyOfferSection from "@/components/strategy/StrategyOfferSection";
import { STRATEGY_CONTENT, STRATEGY_PRODUCT } from "@/lib/strategy/content";

function track(event: string) {
  try {
    const w = window as Window & { dataLayer?: Array<Record<string, unknown>> };
    w.dataLayer?.push({ event });
  } catch {
    /* noop */
  }
}

function EgMark({ className }: { className?: string }) {
  return (
    <Image
      className={className}
      src={STRATEGY_PRODUCT.logoImage}
      alt=""
      width={28}
      height={28}
      aria-hidden="true"
    />
  );
}

export default function StrategyLanding() {
  const c = STRATEGY_CONTENT;
  const p = STRATEGY_PRODUCT;
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openLeadModal = useCallback((source: string) => {
    track(source);
    setMenuOpen(false);
    setModalOpen(true);
  }, []);

  const scrollToOffer = useCallback(() => {
    track("strategy_hero_cta_scroll");
    setMenuOpen(false);
    const el = document.getElementById(c.offer.id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [c.offer.id]);

  return (
    <div className="st-page">
      <a className="st-skip" href="#main">
        К содержимому
      </a>

      <header className="st-header">
        <div className="st-bleed st-header__inner">
          <Link href="/" className="st-brand" aria-label="Евгений Гошев — на главную">
            <Image
              className="st-brand__img"
              src={p.logoImage}
              alt={c.brand.name}
              width={120}
              height={60}
              priority
            />
          </Link>
          <button
            type="button"
            className="st-menu-btn"
            aria-label={c.header.menuLabel}
            aria-expanded={menuOpen}
            aria-controls="st-mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="st-menu-btn__bar" />
            <span className="st-menu-btn__bar" />
            <span className="st-menu-btn__bar" />
          </button>
        </div>
        {menuOpen ? (
          <nav id="st-mobile-menu" className="st-mobile-menu" aria-label="Меню">
            <div className="st-bleed st-mobile-menu__inner">
              <button type="button" className="st-mobile-menu__link" onClick={scrollToOffer}>
                {c.hero.primaryCta}
              </button>
              <a
                className="st-mobile-menu__link"
                href={`#${c.how.id}`}
                onClick={() => setMenuOpen(false)}
              >
                Как это проходит
              </a>
              <a
                className="st-mobile-menu__link"
                href={`#${c.offer.id}`}
                onClick={() => setMenuOpen(false)}
              >
                Начать путь
              </a>
              <Link className="st-mobile-menu__link" href="/" onClick={() => setMenuOpen(false)}>
                Главная
              </Link>
            </div>
          </nav>
        ) : null}
      </header>

      <main id="main">
        <section className="st-hero" aria-labelledby="st-hero-title">
          <div className="st-hero__grid">
            <div className="st-bleed st-hero__copy">
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

              <div className="st-hero__offer st-hero__offer--cta-only">
                <div className="st-hero__cta-row">
                  <button
                    type="button"
                    className="st-btn st-btn--primary st-btn--hero"
                    onClick={scrollToOffer}
                  >
                    {c.hero.primaryCta}
                  </button>
                  <p className="st-trust">
                    <StrategyIcon name="lock" />
                    <span>{c.hero.trustBefore}</span>
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

            <div className="st-hero__media">
              <div className="st-hero__frame">
                <Image
                  className="st-hero__photo"
                  src={p.heroImage}
                  alt={c.hero.photoAlt}
                  width={819}
                  height={1024}
                  priority
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
                <div className="st-hero__fade st-hero__fade--bottom" aria-hidden="true" />
                <div className="st-hero__fade st-hero__fade--left" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <StrategyHowSection />
        <StrategyOfferSection onCta={openLeadModal} />
      </main>

      <footer className="st-footer">
        <div className="st-container st-footer__inner">
          <p className="st-footer__pillars" aria-label={c.footer.note}>
            <span>Движение</span>
            <EgMark className="st-footer__mark" />
            <span>Дыхание</span>
            <EgMark className="st-footer__mark" />
            <span>Долголетие</span>
          </p>
          <p className="st-footer__phrase">{c.footer.brandPhrase}</p>
          <nav className="st-footer__legal" aria-label="Юридическая информация">
            {c.footer.links.map((link, i) => (
              <span key={link.href}>
                {i > 0 ? " · " : null}
                <Link href={link.href}>{link.label}</Link>
              </span>
            ))}
            {" · "}
            <Link href="/">Главная</Link>
          </nav>
        </div>
      </footer>

      <StrategyFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
