"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  CLUB_TRIBUTE_TG,
} from "@/lib/club/landing-content";

import { CLUB_HERO_CSS } from "./styles";

const NAV = [
  { href: "#about", label: "О клубе" },
  { href: "#for", label: "Для кого" },
  { href: "#program", label: "Программа" },
  { href: "#tariff", label: "Тарифы" },
  { href: "#results", label: "Результаты" },
  { href: "#contacts", label: "Контакты" },
] as const;

const FEATURES = [
  {
    title: "Системный подход",
    text: "работаем с телом комплексно",
    icon: "system" as const,
  },
  {
    title: "Практика и результат",
    text: "реальные инструменты и поддержка",
    icon: "practice" as const,
  },
  {
    title: "Движение к свободе",
    text: "больше энергии, меньше скованности, выше качество жизни",
    icon: "freedom" as const,
  },
] as const;

function FeatureIcon({ type }: { type: (typeof FEATURES)[number]["icon"] }) {
  if (type === "practice") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 8h10M7 12h10M7 16h6" />
        <rect x="4" y="4" width="16" height="16" rx="3" />
      </svg>
    );
  }
  if (type === "freedom") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20V10" />
        <path d="M12 10c-2.5-4-6-5-8-2 0 4 3 7 8 9 5-2 8-5 8-9-2-3-5.5-2-8 2Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
    </svg>
  );
}

export default function ClubHeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setReady(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <div
      id="rec1144359426"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="396"
      data-bg-color="#0c0e12"
      suppressHydrationWarning
    >
      <style dangerouslySetInnerHTML={{ __html: CLUB_HERO_CSS }} />
      <section
        className={`club-hero${ready ? " is-ready" : ""}`}
        aria-label="Онлайн-клуб Атмосфера 3D"
      >
        <header className={`club-hero__header${scrolled ? " is-scrolled" : ""}`}>
          <div className="club-hero__header-inner">
            <a className="club-hero__logo" href="/" aria-label="Атмосфера 3D — на главную">
              <Image
                src="/assets/eg/eg-atmosfera-logo-header.png"
                alt=""
                width={96}
                height={66}
                priority
              />
              <span>Атмосфера 3D</span>
            </a>

            <nav className="club-hero__nav" aria-label="Навигация клуба">
              {NAV.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              className="club-hero__header-cta"
              href={CLUB_TRIBUTE_TG}
              target="_blank"
              rel="noopener noreferrer"
            >
              Присоединиться
              <i aria-hidden="true">→</i>
            </a>

            <button
              type="button"
              className={`club-hero__menu-btn${menuOpen ? " is-open" : ""}`}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          {menuOpen ? (
            <div className="club-hero__mobile-panel">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={CLUB_TRIBUTE_TG}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                Присоединиться
              </a>
            </div>
          ) : null}
        </header>

        <div className="club-hero__stage">
          <div className="club-hero__copy">
            <h1 className="club-hero__brand">Атмосфера 3D</h1>
            <p className="club-hero__sub">Онлайн-клуб Евгения Гошева</p>
            <p className="club-hero__motto">Движение. Дыхание. Дисциплина.</p>
            <p className="club-hero__lead">
              Улучши качество жизни через движение, опираясь на человеческую
              природу. Верни телу баланс — и снова получай удовольствие от жизни
              без боли и таблеток.
            </p>
            <div className="club-hero__actions">
              <a
                className="club-hero__btn club-hero__btn--primary"
                href={CLUB_TRIBUTE_TG}
                target="_blank"
                rel="noopener noreferrer"
              >
                Войти в клуб
                <span aria-hidden="true">→</span>
              </a>
              <a className="club-hero__btn club-hero__btn--ghost" href="#about">
                Узнать подробнее
              </a>
            </div>
          </div>

          <div className="club-hero__visual" aria-hidden="true">
            <div className="club-hero__photo club-hero__photo--cut">
              <Image
                className="club-hero__photo-img"
                src="/club/source/club-hero-stage-cut.png"
                alt=""
                fill
                priority
                sizes="(max-width: 980px) 92vw, 46vw"
              />
            </div>
          </div>

          <div className="club-hero__features">
            {FEATURES.map((item) => (
              <article className="club-hero__feature" key={item.title}>
                <div className="club-hero__feature-icon">
                  <FeatureIcon type={item.icon} />
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          <a className="club-hero__scroll" href="#about" aria-label="Дальше">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
