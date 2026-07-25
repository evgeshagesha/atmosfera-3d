import Image from "next/image";

import { SITE_FOOTER_V2_CSS } from "./v2-styles";

const NAV_LINKS = [
  { href: "#rec2034125521", label: "Обо мне" },
  { href: "#online", label: "Форматы работы" },
  { href: "https://yandex.ru/maps/-/CTu240~o", label: "Студия" },
  { href: "#rec2169195921", label: "Блог" },
  { href: "#rec2191126061", label: "Контакты" },
] as const;

const LEGAL_LINKS = [
  { href: "/about", label: "Евгений Гошев" },
  { href: "/policy", label: "Политика конфиденциальности" },
  { href: "/personal", label: "Согласие на обработку данных" },
  { href: "/oferta", label: "Публичная оферта" },
] as const;

export default function SiteFooterV2() {
  return (
    <footer id="rec2039329591" className="eg-footer">
      <style dangerouslySetInnerHTML={{ __html: SITE_FOOTER_V2_CSS }} />
      <div className="eg-footer__inner">
        <nav className="eg-footer__nav" aria-label="Навигация в подвале">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="eg-footer__brand" href="#egmain-hero" aria-label="Наверх">
          <Image
            src="/assets/eg/eg-atmosfera-logo-header.png"
            alt="EG Атмосфера 3D"
            width={545}
            height={370}
            sizes="(max-width: 760px) 110px, 140px"
          />
        </a>

        <nav className="eg-footer__legal" aria-label="Юридическая информация">
          {LEGAL_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="eg-footer__meta">
          <p>Самозанятый Гошев Евгений Николаевич</p>
          <p>ИНН: 366224223508</p>
          <p>© 2026 Евгений Гошев · Атмосфера 3D</p>
        </div>
      </div>
    </footer>
  );
}
