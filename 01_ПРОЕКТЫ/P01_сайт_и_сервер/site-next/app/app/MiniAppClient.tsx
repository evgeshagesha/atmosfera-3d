"use client";

import Image from "next/image";
import { useEffect } from "react";

import { MINIAPP_EVENTS, trackMiniapp } from "@/lib/miniapp/analytics";
import { LINKS, anketaUrlWithUtm } from "@/lib/miniapp/links";
import { bootTelegramWebApp, openExternalUrl } from "@/lib/miniapp/telegram";

function openTracked(event: string, url: string) {
  trackMiniapp(event);
  openExternalUrl(url);
}

export default function MiniAppClient() {
  useEffect(() => {
    bootTelegramWebApp();
    trackMiniapp(MINIAPP_EVENTS.view);
  }, []);

  return (
    <div className="nav">
      <header className="nav__header">
        <Image
          src="/eg-symbol.png"
          alt="EG"
          width={28}
          height={28}
          className="nav__mark"
          priority
        />
        <div>
          <p className="nav__brand">Атмосфера 3D</p>
          <p className="nav__kicker">Навигация</p>
        </div>
      </header>

      <section className="nav__about" aria-label="Евгений Гошев">
        <div className="nav__photo">
          <Image
            src="/assets/eg/hero-evgeny-black.png"
            alt="Евгений Гошев"
            width={72}
            height={72}
            className="nav__photo-img"
            priority
          />
        </div>
        <div>
          <h1>Евгений Гошев</h1>
          <p className="nav__role">Профессиональный спортсмен · физический терапевт</p>
          <p className="nav__bio">
            Помогаю выстраивать здоровое, сильное и функциональное тело через
            движение, дыхание и системные тренировки.
          </p>
        </div>
      </section>

      <article className="card card--hero">
        <p className="card__eyebrow">Начните здесь</p>
        <h2>Узнайте, с чего начать именно вам</h2>
        <p className="card__text">
          Заполните короткую анкету. После неё я бесплатно открою доступ к моему
          функциональному тесту.
        </p>
        <p className="card__sub">
          После прохождения вы получите свой результат, главный приоритет и
          понятный маршрут дальнейших действий.
        </p>
        <ul className="card__tags" aria-label="Что внутри">
          <li>≈ 5–7 мин</li>
          <li>Тест в подарок</li>
          <li>Персональный результат</li>
        </ul>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => openTracked(MINIAPP_EVENTS.anketa, anketaUrlWithUtm())}
        >
          Пройти анкету →
        </button>
      </article>

      <article className="card">
        <div className="card__row">
          <p className="card__eyebrow">Москва · очно</p>
          <span className="card__chip">Личная практика</span>
        </div>
        <h2>Записаться ко мне в студию</h2>
        <p className="card__text">
          Если вы в Москве, можно приехать ко мне на очную практику.
        </p>
        <ul className="card__meta">
          <li>Индивидуальный разбор</li>
          <li>Оценка движения</li>
          <li>Практическая работа</li>
          <li>Рекомендации дальше</li>
        </ul>
        <p className="card__price">Первичный приём — 6 000 ₽</p>
        <p className="card__place">📍 Москва · Савёловская</p>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => openTracked(MINIAPP_EVENTS.studio, LINKS.studio)}
        >
          Записаться →
        </button>
      </article>

      <article className="card">
        <p className="card__eyebrow">Отзывы</p>
        <h2>Что говорят о работе со мной</h2>
        <p className="card__text">
          Посмотрите реальные отзывы людей, которые уже проходили занятия и
          практики со мной.
        </p>
        <p className="card__stars" aria-hidden="true">
          ★★★★★
        </p>
        <p className="card__place">Отзывы на Яндекс Картах</p>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => openTracked(MINIAPP_EVENTS.reviews, LINKS.reviews)}
        >
          Посмотреть отзывы →
        </button>
      </article>

      <nav className="social" aria-label="Соцсети">
        <button
          type="button"
          className="social__btn"
          aria-label="Instagram"
          onClick={() => openTracked(MINIAPP_EVENTS.instagram, LINKS.instagram)}
        >
          <InstagramIcon />
        </button>
        <button
          type="button"
          className="social__btn"
          aria-label="YouTube"
          onClick={() => openTracked(MINIAPP_EVENTS.youtube, LINKS.youtube)}
        >
          <YouTubeIcon />
        </button>
        <button
          type="button"
          className="social__btn"
          aria-label="Telegram-канал"
          onClick={() => openTracked(MINIAPP_EVENTS.telegram, LINKS.telegram)}
        >
          <TelegramIcon />
        </button>
      </nav>

      <footer className="nav__foot">
        <p>EG · Атмосфера 3D</p>
        <p>Движение · Дыхание · Дисциплина</p>
        <p className="nav__copy">© 2026 Евгений Гошев</p>
      </footer>

      <style jsx>{`
        .nav {
          min-height: 100dvh;
          min-height: 100svh;
          padding: 12px 16px calc(20px + env(safe-area-inset-bottom, 0px));
          background:
            radial-gradient(ellipse 90% 42% at 50% -8%, rgba(210, 218, 228, 0.14), transparent 58%),
            #050505;
          color: #f3f3f3;
          font-family: var(--font-body, Manrope, system-ui, sans-serif);
          overflow-x: hidden;
        }
        .nav__header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .nav__mark {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }
        .nav__brand {
          margin: 0;
          font-family: var(--font-display, Oswald, sans-serif);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          line-height: 1.1;
        }
        .nav__kicker {
          margin: 2px 0 0;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #a7a7a7;
        }
        .nav__about {
          display: grid;
          grid-template-columns: 72px 1fr;
          gap: 12px;
          margin-bottom: 14px;
          align-items: start;
        }
        .nav__photo {
          width: 72px;
          height: 72px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(220, 226, 234, 0.38);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.04);
          background: #111;
        }
        .nav__photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 70% 12%;
        }
        .nav__about h1 {
          margin: 0 0 4px;
          font-family: var(--font-display, Oswald, sans-serif);
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #fff;
          line-height: 1.15;
        }
        .nav__role {
          margin: 0 0 6px;
          font-size: 11px;
          line-height: 1.35;
          color: #a7a7a7;
        }
        .nav__bio {
          margin: 0;
          font-size: 13px;
          line-height: 1.45;
          color: #d6d6d6;
        }
        .card {
          position: relative;
          margin-bottom: 10px;
          padding: 16px 16px 14px;
          border-radius: 18px;
          border: 1px solid rgba(210, 218, 228, 0.14);
          background: #111111;
        }
        .card--hero {
          border-color: rgba(230, 236, 244, 0.42);
          background:
            radial-gradient(circle at 12% 0%, rgba(230, 236, 244, 0.12), transparent 52%),
            #151515;
          box-shadow:
            0 0 0 1px rgba(220, 226, 234, 0.12),
            0 0 28px rgba(180, 194, 214, 0.16);
          overflow: hidden;
        }
        .card--hero::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            110deg,
            transparent 40%,
            rgba(255, 255, 255, 0.06) 50%,
            transparent 60%
          );
          transform: translateX(-120%);
          animation: sweep 5.5s ease-in-out 1.2s infinite;
        }
        .card__row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .card__eyebrow {
          margin: 0 0 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #a7a7a7;
        }
        .card__chip {
          flex: 0 0 auto;
          margin-bottom: 8px;
          padding: 3px 8px;
          border-radius: 999px;
          border: 1px solid rgba(220, 226, 234, 0.28);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #d6d6d6;
        }
        .card h2 {
          margin: 0 0 8px;
          font-family: var(--font-display, Oswald, sans-serif);
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #fff;
          line-height: 1.2;
        }
        .card__text,
        .card__sub {
          margin: 0 0 8px;
          font-size: 15px;
          line-height: 1.45;
          color: #d6d6d6;
        }
        .card__sub {
          font-size: 13px;
          color: #a7a7a7;
        }
        .card__tags,
        .card__meta {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          list-style: none;
          margin: 0 0 12px;
          padding: 0;
        }
        .card__tags li,
        .card__meta li {
          padding: 4px 8px;
          border-radius: 999px;
          border: 1px solid rgba(220, 226, 234, 0.18);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #d6d6d6;
        }
        .card__meta li {
          text-transform: none;
          letter-spacing: 0;
          font-size: 12px;
          color: #a7a7a7;
        }
        .card__price {
          margin: 0 0 2px;
          font-size: 14px;
          font-weight: 700;
          color: #f3f3f3;
        }
        .card__place {
          margin: 0 0 12px;
          font-size: 13px;
          color: #a7a7a7;
        }
        .card__stars {
          margin: 0 0 4px;
          letter-spacing: 0.12em;
          color: #e8e8e8;
          font-size: 13px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 52px;
          padding: 12px 16px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          z-index: 1;
        }
        .btn:focus-visible {
          outline: 2px solid #f3f3f3;
          outline-offset: 3px;
        }
        .btn--primary {
          border: 1px solid rgba(236, 240, 246, 0.7);
          background: linear-gradient(180deg, #f4f6f8 0%, #d8dde4 100%);
          color: #050505;
          box-shadow: 0 0 22px rgba(200, 210, 222, 0.28);
        }
        .btn--ghost {
          border: 1px solid rgba(220, 226, 234, 0.32);
          background: transparent;
          color: #f3f3f3;
        }
        .btn--primary:active,
        .btn--ghost:active {
          transform: scale(0.99);
        }
        .social {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin: 18px 0 16px;
        }
        .social__btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(220, 226, 234, 0.22);
          background: #111;
          color: #f3f3f3;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .social__btn:focus-visible {
          outline: 2px solid #f3f3f3;
          outline-offset: 3px;
        }
        .social__btn:active {
          transform: scale(1.03);
        }
        .nav__foot {
          text-align: center;
          color: #a7a7a7;
        }
        .nav__foot p {
          margin: 0 0 4px;
          font-size: 12px;
          letter-spacing: 0.06em;
        }
        .nav__copy {
          margin-top: 8px !important;
          font-size: 11px !important;
          letter-spacing: 0.04em !important;
          color: #6f6f6f;
        }
        @keyframes sweep {
          0%,
          70% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }
        @media (hover: hover) {
          .btn--primary:hover {
            box-shadow: 0 0 28px rgba(200, 210, 222, 0.4);
          }
          .btn--ghost:hover {
            border-color: rgba(236, 240, 246, 0.55);
          }
          .social__btn:hover {
            border-color: rgba(230, 236, 244, 0.5);
            box-shadow: 0 0 16px rgba(200, 210, 222, 0.22);
            transform: scale(1.03);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .card--hero::after,
          .btn--primary:active,
          .btn--ghost:active,
          .social__btn:active {
            animation: none;
            transform: none;
          }
        }
        @media (min-width: 430px) {
          .nav {
            max-width: 430px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 24 17" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="22" height="15" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 5.2v6.6L16 8.5 10 5.2Z" fill="currentColor" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="18" height="16" viewBox="0 0 24 20" fill="none" aria-hidden="true">
      <path
        d="M2.2 9.4 21 1.8 17.6 18.2l-5.3-4.1-2.9 2.8-.4-4.8 8.2-7.4-10.2 5.9-4.8-1.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
