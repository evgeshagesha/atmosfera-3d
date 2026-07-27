/** Club final footer block. */
export const CLUB_FOOTER_CSS = `
.club-foot {
  --cf-bg: #000000;
  --cf-card: #0d1016;
  --cf-line: rgba(255, 255, 255, 0.1);
  --cf-text: #ffffff;
  --cf-dim: rgba(210, 218, 230, 0.72);
  --cf-accent: #2f6bff;
  --cf-accent-strong: #1a56ff;
  position: relative;
  overflow: clip;
  padding: 40px 0 28px;
  background:
    radial-gradient(ellipse 70% 50% at 50% 0%, rgba(47, 107, 255, 0.14), transparent 60%),
    var(--cf-bg);
  color: var(--cf-text);
  font-family: var(--font-body, Manrope, system-ui, sans-serif);
}

.club-foot__shell {
  width: min(100% - 20px, 1180px);
  margin: 0 auto;
}

.club-foot__top {
  display: grid;
  gap: 28px;
}

.club-foot__brand {
  display: grid;
  gap: 12px;
  max-width: 34ch;
}

.club-foot__logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  text-decoration: none;
}

.club-foot__logo img {
  width: 42px;
  height: auto;
  display: block;
}

.club-foot__logo span {
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
}

.club-foot__lead {
  margin: 0;
  color: var(--cf-dim);
  font-size: 14px;
  line-height: 1.5;
}

.club-foot__col h3,
.club-foot__acc summary {
  margin: 0 0 12px;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
}

.club-foot__links {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.club-foot__links a {
  color: var(--cf-dim) !important;
  -webkit-text-fill-color: var(--cf-dim) !important;
  text-decoration: none;
  font-size: 14px;
  line-height: 1.4;
  transition: color 160ms ease;
}

.club-foot__links a:hover,
.club-foot__links a:focus-visible {
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
}

.club-foot__support-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.club-foot__support-link svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  fill: none;
  stroke: var(--cf-accent);
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-foot__social {
  display: grid;
  gap: 10px;
}

.club-foot__social a {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 48px;
  padding: 0 14px;
  border: 1px solid var(--cf-line);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: border-color 160ms ease, background 160ms ease, box-shadow 160ms ease;
}

.club-foot__social a:hover,
.club-foot__social a:focus-visible {
  border-color: rgba(47, 107, 255, 0.55);
  background: rgba(47, 107, 255, 0.12);
  box-shadow: 0 10px 24px rgba(26, 86, 255, 0.14);
}

.club-foot__social a:focus-visible {
  outline: 3px solid rgba(105, 151, 255, 0.65);
  outline-offset: 3px;
}

.club-foot__social-ico {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 8px;
  background: rgba(47, 107, 255, 0.16);
  color: var(--cf-accent);
}

.club-foot__social-ico svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.club-foot__desktop-cols {
  display: none;
}

.club-foot__mobile-cols {
  display: grid;
  gap: 8px;
}

.club-foot__acc {
  border: 1px solid var(--cf-line);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  overflow: hidden;
}

.club-foot__acc summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0;
  padding: 14px 14px;
  cursor: pointer;
  list-style: none;
}

.club-foot__acc summary::-webkit-details-marker {
  display: none;
}

.club-foot__acc summary::after {
  content: "";
  width: 10px;
  height: 10px;
  border-right: 2px solid var(--cf-accent);
  border-bottom: 2px solid var(--cf-accent);
  transform: rotate(45deg);
  transition: transform 180ms ease;
}

.club-foot__acc[open] summary::after {
  transform: rotate(225deg);
  margin-top: 4px;
}

.club-foot__acc-body {
  padding: 0 14px 14px;
}

.club-foot__bottom {
  display: grid;
  gap: 10px;
  margin-top: 28px;
  padding-top: 18px;
  border-top: 1px solid var(--cf-line);
}

.club-foot__copy,
.club-foot__legal {
  margin: 0;
  color: rgba(210, 218, 230, 0.58);
  font-size: 12px;
  line-height: 1.45;
}

@media (min-width: 900px) {
  .club-foot {
    padding: 56px 0 32px;
  }

  .club-foot__shell {
    width: min(100% - 32px, 1180px);
  }

  .club-foot__top {
    grid-template-columns: minmax(220px, 1.2fr) repeat(3, minmax(0, 1fr));
    gap: 28px 24px;
    align-items: start;
  }

  .club-foot__desktop-cols {
    display: contents;
  }

  .club-foot__mobile-cols {
    display: none;
  }

  .club-foot__bottom {
    grid-template-columns: 1fr auto;
    align-items: end;
    gap: 16px;
    margin-top: 36px;
    padding-top: 22px;
  }

  .club-foot__legal {
    text-align: right;
  }
}

@media (prefers-reduced-motion: reduce) {
  .club-foot__acc summary::after,
  .club-foot__links a,
  .club-foot__social a {
    transition: none;
  }
}
`;
