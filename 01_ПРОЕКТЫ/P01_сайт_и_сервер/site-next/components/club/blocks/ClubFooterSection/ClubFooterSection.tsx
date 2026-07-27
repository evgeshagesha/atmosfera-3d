import Image from "next/image";
import Link from "next/link";

import { CLUB_SUPPORT_TG } from "@/lib/club/landing-content";

import { CLUB_FOOTER_CSS } from "./styles";

const MENU = [
  { href: "#about", label: "О клубе" },
  { href: "#for", label: "Для кого" },
  { href: "#program", label: "Программа" },
  { href: "#tariff", label: "Тарифы" },
  { href: "#results", label: "Результаты" },
  { href: "#contacts", label: "Контакты" },
] as const;

const SUPPORT = [
  {
    href: CLUB_SUPPORT_TG,
    label: "Отдел поддержки",
    external: true,
    icon: "headset" as const,
  },
  {
    href: "#faq",
    label: "Ответы на вопросы",
    external: false,
    icon: "faq" as const,
  },
  {
    href: "/oferta",
    label: "Условия оферты",
    external: false,
    icon: "doc" as const,
  },
  {
    href: "/policy",
    label: "Политика конфиденциальности",
    external: false,
    icon: "lock" as const,
  },
] as const;

const SOCIAL = [
  {
    href: "https://t.me/EGoshev",
    label: "Telegram",
    icon: "tg" as const,
  },
  {
    href: "https://www.instagram.com/egoshev1",
    label: "Instagram",
    icon: "ig" as const,
  },
] as const;

function SupportIcon({ type }: { type: (typeof SUPPORT)[number]["icon"] }) {
  if (type === "headset") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12a7 7 0 0 1 14 0" />
        <path d="M5 12v4.5A2.5 2.5 0 0 0 7.5 19H9" />
        <path d="M19 12v4.5A2.5 2.5 0 0 1 16.5 19H15" />
        <path d="M9 19h6" />
      </svg>
    );
  }
  if (type === "faq") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9.6 9.4a2.5 2.5 0 1 1 3.7 2.2c-.8.5-1.3 1-1.3 2" />
        <path d="M12 16.8h.01" />
      </svg>
    );
  }
  if (type === "doc") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 4.5h7l3 3V19.5H7z" />
        <path d="M14 4.5v3h3M9 11h6M9 14.5h6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function SocialIcon({ type }: { type: (typeof SOCIAL)[number]["icon"] }) {
  if (type === "tg") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 5 3.5 12.2l4.7 1.7L10 19.5l2.4-3.4 4.8 3.5L21 5Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.7" cy="7.3" r="1" />
    </svg>
  );
}

function MenuList() {
  return (
    <ul className="club-foot__links">
      {MENU.map((item) => (
        <li key={item.href}>
          <a href={item.href}>{item.label}</a>
        </li>
      ))}
    </ul>
  );
}

function SupportList() {
  return (
    <ul className="club-foot__links">
      {SUPPORT.map((item) => (
        <li key={item.href}>
          {item.external ? (
            <a
              className="club-foot__support-link"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SupportIcon type={item.icon} />
              {item.label}
            </a>
          ) : item.href.startsWith("/") ? (
            <Link className="club-foot__support-link" href={item.href}>
              <SupportIcon type={item.icon} />
              {item.label}
            </Link>
          ) : (
            <a className="club-foot__support-link" href={item.href}>
              <SupportIcon type={item.icon} />
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

function SocialList() {
  return (
    <div className="club-foot__social">
      {SOCIAL.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="club-foot__social-ico" aria-hidden="true">
            <SocialIcon type={item.icon} />
          </span>
          {item.label}
        </a>
      ))}
    </div>
  );
}

export default function ClubFooterSection() {
  return (
    <div
      id="rec1146579081"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="396"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <style dangerouslySetInnerHTML={{ __html: CLUB_FOOTER_CSS }} />

      <footer id="contacts" className="club-foot">
        <div className="club-foot__shell">
          <div className="club-foot__top">
            <div className="club-foot__brand">
              <a className="club-foot__logo" href="/" aria-label="Атмосфера 3D — на главную">
                <Image
                  src="/assets/eg/eg-atmosfera-logo-header.png"
                  alt=""
                  width={96}
                  height={66}
                />
                <span>Атмосфера 3D</span>
              </a>
              <p className="club-foot__lead">
                Улучши качество жизни через движение, опираясь на человеческую
                природу.
              </p>
            </div>

            <div className="club-foot__desktop-cols">
              <div className="club-foot__col">
                <h3>Меню</h3>
                <MenuList />
              </div>
              <div className="club-foot__col">
                <h3>Соц.сети</h3>
                <SocialList />
              </div>
              <div className="club-foot__col">
                <h3>Поддержка</h3>
                <SupportList />
              </div>
            </div>

            <div className="club-foot__mobile-cols">
              <details className="club-foot__acc">
                <summary>Меню</summary>
                <div className="club-foot__acc-body">
                  <MenuList />
                </div>
              </details>
              <details className="club-foot__acc">
                <summary>Поддержка</summary>
                <div className="club-foot__acc-body">
                  <SupportList />
                </div>
              </details>
              <details className="club-foot__acc" open>
                <summary>Соц.сети</summary>
                <div className="club-foot__acc-body">
                  <SocialList />
                </div>
              </details>
            </div>
          </div>

          <div className="club-foot__bottom">
            <p className="club-foot__copy">
              © 2026 Атмосфера 3D. Все права защищены.
            </p>
            <p className="club-foot__legal">
              Самозанятый Гошев Евгений Николаевич
              <br />
              ИНН: 366224223508
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
