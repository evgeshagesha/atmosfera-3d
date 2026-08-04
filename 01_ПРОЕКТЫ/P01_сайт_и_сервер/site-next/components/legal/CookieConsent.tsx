"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  COOKIE_CONSENT_KEY,
  LEGAL_ROUTES,
  type CookieConsentValue,
} from "@/lib/legal/consent";
import YandexMetrika from "@/components/seo/YandexMetrika";

function readConsent(): CookieConsentValue | null {
  try {
    const v = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (v === "accepted" || v === "declined") return v;
  } catch {
    // ignore
  }
  return null;
}

/**
 * Cookie + Яндекс.Метрика banner.
 * Metrika loads only after explicit accept — never on first paint.
 */
export default function CookieConsent() {
  const [decision, setDecision] = useState<CookieConsentValue | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDecision(readConsent());
    setReady(true);
  }, []);

  const choose = useCallback((value: CookieConsentValue) => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch {
      // ignore
    }
    setDecision(value);
  }, []);

  return (
    <>
      {decision === "accepted" ? <YandexMetrika /> : null}

      {ready && decision === null ? (
        <div className="eg-cookie" role="dialog" aria-label="Уведомление о cookies и аналитике">
          <style dangerouslySetInnerHTML={{ __html: COOKIE_CSS }} />
          <div className="eg-cookie__inner">
            <p className="eg-cookie__text">
              Мы используем cookies и Яндекс.Метрику, чтобы сайт работал стабильно и мы
              понимали, какие страницы полезны. Подробнее — в{" "}
              <Link href={LEGAL_ROUTES.policy}>Политике обработки персональных данных</Link>.
            </p>
            <div className="eg-cookie__actions">
              <button type="button" className="eg-cookie__btn eg-cookie__btn--ghost" onClick={() => choose("declined")}>
                Только необходимые
              </button>
              <button type="button" className="eg-cookie__btn eg-cookie__btn--primary" onClick={() => choose("accepted")}>
                Принять
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

const COOKIE_CSS = `
.eg-cookie {
  position: fixed;
  z-index: 99999;
  left: 16px;
  right: 16px;
  bottom: 16px;
  max-width: 560px;
  margin: 0 auto;
  padding: 16px 18px;
  border-radius: 16px;
  border: 1px solid rgba(94, 200, 255, 0.22);
  background: rgba(10, 12, 15, 0.96);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45), 0 0 24px rgba(94, 200, 255, 0.08);
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}
.eg-cookie__text {
  margin: 0 0 14px;
  font-size: 13.5px;
  line-height: 1.5;
}
.eg-cookie__text a {
  color: #cfe8f7;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.eg-cookie__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
}
.eg-cookie__btn {
  appearance: none;
  border: 0;
  cursor: pointer;
  border-radius: 999px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.eg-cookie__btn:hover { opacity: 0.92; transform: translateY(-1px); }
.eg-cookie__btn--primary {
  background: linear-gradient(135deg, #5ec8ff, #3aa0e0);
  color: #061018;
}
.eg-cookie__btn--ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
@media (max-width: 520px) {
  .eg-cookie { left: 10px; right: 10px; bottom: 10px; }
  .eg-cookie__actions { flex-direction: column-reverse; }
  .eg-cookie__btn { width: 100%; }
}
`;
