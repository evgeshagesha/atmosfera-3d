"use client";

import Image from "next/image";
import { useState } from "react";

import { SITE_HEADER_V2_CSS } from "./v2-styles";

const NAV_ITEMS = [
  { href: "#rec2034125521", label: "Обо мне" },
  { href: "#rec2040539251", label: "Подход" },
  { href: "https://yandex.ru/maps/-/CTu240~o", label: "Студия" },
  { href: "#online", label: "Программы" },
  { href: "#rec2224175751", label: "Отзывы" },
  { href: "#rec2169195921", label: "Блог" },
  { href: "#rec2191126061", label: "Контакты" },
] as const;

export default function SiteHeaderV2() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header id="rec2034125441" className="eg-site-header">
      <style dangerouslySetInnerHTML={{ __html: SITE_HEADER_V2_CSS }} />
      <div className="eg-site-header__inner">
        <a
          className="eg-site-header__logo"
          href="#egmain-hero"
          aria-label="EG Атмосфера 3D — на главную"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/assets/eg/eg-atmosfera-logo-header.png"
            alt="EG Атмосфера 3D"
            width={545}
            height={370}
            sizes="(max-width: 960px) 78px, 96px"
          />
        </a>

        <nav
          className={`eg-site-header__nav${menuOpen ? " is-open" : ""}`}
          aria-label="Основная навигация"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`eg-site-header__menu${menuOpen ? " is-open" : ""}`}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span>Меню</span>
          <i aria-hidden="true">
            <b />
            <b />
            <b />
          </i>
        </button>
      </div>
    </header>
  );
}
