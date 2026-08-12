"use client";

/**
 * SNAPSHOT 2026-08-12 — каталог Mini App до пересборки в навигацию.
 * Чтобы вернуть: скопировать этот файл поверх MiniAppClient.tsx
 * и откатить lib/miniapp/* если они появятся.
 */

import Image from "next/image";
import { useEffect } from "react";

type Program = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  href: string;
  accent?: boolean;
  startHere?: boolean;
};

const PROGRAMS: Program[] = [
  {
    id: "guide",
    title: "Гайд «Фундамент тела»",
    subtitle: "Бесплатный старт: с чего начинать работу с телом",
    price: "0 ₽",
    href: "https://egoshev.ru/gaid",
  },
  {
    id: "test",
    title: "Онлайн тест",
    subtitle: "Оценка и персональный план действий",
    price: "684 ₽",
    href: "https://egoshev.ru/testik",
    accent: true,
    startHere: true,
  },
  {
    id: "breath",
    title: "Дыхание и осанка",
    subtitle: "Мини-программа для базы и положения тела",
    price: "1 990 ₽",
    href: "https://egoshev.ru/dyhanieosanka",
  },
  {
    id: "course",
    title: "Базовая настройка тела",
    subtitle: "Пошаговая программа качества движения",
    price: "9 990 ₽",
    href: "https://egoshev.ru/baza",
  },
  {
    id: "club",
    title: "Клуб Атмосфера 3D",
    subtitle: "Страница клуба: формат, условия и как вступить",
    price: "от 1 758 ₽/мес",
    href: "https://eg.egoshev.ru/club",
  },
  {
    id: "online-consult",
    title: "Личная онлайн консультация",
    subtitle: "2 часа · разбор и план работы с телом",
    price: "20 000 ₽",
    href: "https://egoshev.ru/anketaplan",
    accent: true,
  },
];

export default function MiniAppClient() {
  useEffect(() => {
    const wa = (
      window as unknown as {
        Telegram?: {
          WebApp?: {
            ready: () => void;
            expand: () => void;
            setHeaderColor?: (c: string) => void;
            setBackgroundColor?: (c: string) => void;
          };
        };
      }
    ).Telegram?.WebApp;
    if (!wa) return;
    wa.ready();
    wa.expand();
    wa.setHeaderColor?.("#0a0c0f");
    wa.setBackgroundColor?.("#0a0c0f");
  }, []);

  return (
    <div className="eg-mini">
      <header className="eg-mini__top">
        <Image
          src="/assets/eg/eg-atmosfera-logo-header.png"
          alt="Атмосфера 3D"
          width={132}
          height={36}
          className="eg-mini__logo"
          priority
        />
        <p className="eg-mini__tag">Движение · Дыхание · Дисциплина</p>
      </header>

      <section className="eg-mini__about" aria-label="О Евгении Гошеве">
        <div className="eg-mini__portrait-wrap">
          <Image
            src="/assets/eg/hero-evgeny-black.png"
            alt="Евгений Гошев"
            width={120}
            height={120}
            className="eg-mini__portrait"
            priority
          />
        </div>
        <div className="eg-mini__about-text">
          <h1>Евгений Гошев</h1>
          <p className="eg-mini__role">Физический терапевт · спортсмен · 15 лет практики</p>
          <p className="eg-mini__bio">
            Возвращаю телу свободу. Помогаю улучшить мобильность, осанку и
            избавляю от выпирающего живота и напряжения во всём теле. Через
            движение, дыхание и естественные практики.
          </p>
        </div>
      </section>

      <div className="eg-mini__cta-row">
        <a
          className="eg-mini__btn eg-mini__btn--neon"
          href="https://eg.egoshev.ru/"
          target="_blank"
          rel="noreferrer"
        >
          Перейти на сайт
        </a>
      </div>

      <section id="programs" className="eg-mini__programs" aria-label="Онлайн программы">
        <h2>Онлайн программы</h2>
        <ul>
          {PROGRAMS.map((item) => (
            <li key={item.id}>
              <a
                className={`eg-mini__card${item.accent ? " eg-mini__card--accent" : ""}${
                  item.startHere ? " eg-mini__card--start" : ""
                }`}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  {item.startHere ? (
                    <span className="eg-mini__start">Начни здесь</span>
                  ) : null}
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </div>
                <em>{item.price}</em>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="eg-mini__foot">
        <a href="https://t.me/EvgeniiGoshev" target="_blank" rel="noreferrer">
          Канал
        </a>
      </footer>

      <style jsx>{`
        .eg-mini {
          min-height: 100dvh;
          padding: 16px 16px calc(28px + env(safe-area-inset-bottom, 0px));
          background:
            radial-gradient(ellipse 80% 40% at 50% 0%, rgba(90, 102, 120, 0.22), transparent 60%),
            #0a0c0f;
          color: #fff;
          font-family: var(--font-body, Manrope, system-ui, sans-serif);
        }
        .eg-mini__top {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 18px;
        }
        .eg-mini__logo {
          width: auto;
          height: 34px;
          object-fit: contain;
        }
        .eg-mini__tag {
          margin: 0;
          color: rgba(255, 255, 255, 0.55);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .eg-mini__about {
          display: grid;
          grid-template-columns: 88px 1fr;
          gap: 14px;
          margin-bottom: 16px;
          padding: 14px;
          border: 1px solid rgba(210, 220, 232, 0.16);
          border-radius: 18px;
          background: rgba(16, 18, 22, 0.85);
          box-shadow: 0 0 28px rgba(150, 164, 184, 0.08);
        }
        .eg-mini__portrait-wrap {
          width: 88px;
          height: 88px;
          border-radius: 16px;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(220, 228, 238, 0.2);
        }
        .eg-mini__portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 70% 12%;
        }
        .eg-mini__about-text h1 {
          margin: 0 0 4px;
          font-family: var(--font-display, Oswald, sans-serif);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .eg-mini__role {
          margin: 0 0 8px;
          color: rgba(255, 255, 255, 0.62);
          font-size: 11px;
          line-height: 1.35;
        }
        .eg-mini__bio {
          margin: 0;
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          line-height: 1.45;
        }
        .eg-mini__cta-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          margin-bottom: 22px;
        }
        .eg-mini__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 12px 10px;
          border-radius: 999px;
          border: 1px solid rgba(220, 228, 238, 0.45);
          background: linear-gradient(180deg, #f2f4f7 0%, #d5dae2 100%);
          color: #0a0c0f;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          text-align: center;
        }
        .eg-mini__btn--neon {
          box-shadow:
            0 0 0 1px rgba(200, 210, 222, 0.25),
            0 0 18px rgba(180, 194, 214, 0.4),
            0 0 36px rgba(150, 168, 190, 0.22);
        }
        .eg-mini__programs h2 {
          margin: 0 0 12px;
          font-family: var(--font-display, Oswald, sans-serif);
          font-size: 18px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .eg-mini__programs ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .eg-mini__card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 14px;
          border-radius: 16px;
          border: 1px solid rgba(210, 220, 232, 0.14);
          background: rgba(18, 20, 24, 0.92);
          color: inherit;
          text-decoration: none;
        }
        .eg-mini__card--accent {
          border-color: rgba(220, 228, 238, 0.35);
          box-shadow: 0 0 22px rgba(170, 184, 204, 0.16);
        }
        .eg-mini__card--start {
          border-color: rgba(236, 242, 250, 0.55);
          background:
            radial-gradient(circle at 12% 0%, rgba(220, 228, 238, 0.16), transparent 55%),
            rgba(22, 24, 28, 0.98);
          box-shadow:
            0 0 0 1px rgba(210, 220, 232, 0.28),
            0 0 24px rgba(180, 194, 214, 0.35),
            0 0 40px rgba(150, 168, 190, 0.18);
        }
        .eg-mini__start {
          display: inline-block;
          margin-bottom: 6px;
          padding: 3px 8px;
          border-radius: 999px;
          border: 1px solid rgba(230, 236, 244, 0.45);
          background: rgba(240, 244, 248, 0.12);
          color: #f2f5f8;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .eg-mini__card strong {
          display: block;
          margin-bottom: 4px;
          font-size: 14px;
          font-weight: 700;
        }
        .eg-mini__card span:not(.eg-mini__start) {
          display: block;
          color: rgba(255, 255, 255, 0.62);
          font-size: 12px;
          line-height: 1.35;
        }
        .eg-mini__card em {
          flex: 0 0 auto;
          font-style: normal;
          font-size: 12px;
          font-weight: 700;
          color: rgba(230, 236, 244, 0.92);
          white-space: nowrap;
        }
        .eg-mini__foot {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 22px;
        }
        .eg-mini__foot a {
          color: rgba(255, 255, 255, 0.55);
          font-size: 12px;
          text-decoration: none;
          letter-spacing: 0.04em;
        }
      `}</style>
    </div>
  );
}
