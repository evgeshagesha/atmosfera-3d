/** Canonical legal routes for PDN contour (eg.egoshev.ru). */
export const LEGAL_ROUTES = {
  policy: "/policy",
  consent: "/personal",
  oferta: "/oferta",
} as const;

export const COOKIE_CONSENT_KEY = "eg_cookie_consent_v1";
export type CookieConsentValue = "accepted" | "declined";

export const CONSENT_CHECKBOX_NAME = "consent_pdn";

/** Label HTML fragment with links to policy + consent (not pre-checked wording). */
export function consentCheckboxLabelHtml(): string {
  return (
    `Я даю <a href="${LEGAL_ROUTES.consent}" target="_blank" rel="noopener noreferrer">согласие на обработку персональных данных</a>` +
    ` и подтверждаю, что ознакомлен(а) с ` +
    `<a href="${LEGAL_ROUTES.policy}" target="_blank" rel="noopener noreferrer">Политикой обработки персональных данных</a>.`
  );
}
