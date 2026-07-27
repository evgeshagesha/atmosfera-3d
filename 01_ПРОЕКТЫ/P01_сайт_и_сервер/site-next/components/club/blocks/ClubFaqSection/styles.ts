/** Club FAQ accordion block. */
export const CLUB_FAQ_CSS = `
.club-faq-acc {
  --cf-bg: #000000;
  --cf-card: #0d1016;
  --cf-line: rgba(255, 255, 255, 0.1);
  --cf-text: #ffffff;
  --cf-dim: rgba(210, 218, 230, 0.74);
  --cf-accent: #2f6bff;
  --cf-accent-strong: #1a56ff;
  position: relative;
  overflow: clip;
  padding: 48px 0 56px;
  background: var(--cf-bg);
  color: var(--cf-text);
  font-family: var(--font-body, Manrope, system-ui, sans-serif);
}

.club-faq-acc__shell {
  width: min(100% - 20px, 980px);
  margin: 0 auto;
}

.club-faq-acc__title {
  margin: 0 0 22px;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(28px, 7vw, 48px);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.club-faq-acc__title span {
  color: var(--cf-accent);
}

.club-faq-acc__list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.club-faq-acc__item {
  border: 1px solid var(--cf-line);
  border-radius: 16px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 55%),
    var(--cf-card);
  overflow: hidden;
  transition: border-color 180ms ease, box-shadow 180ms ease;
}

.club-faq-acc__item.is-open {
  border-color: rgba(47, 107, 255, 0.45);
  box-shadow: 0 0 24px rgba(26, 86, 255, 0.12);
}

.club-faq-acc__trigger {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) 28px;
  gap: 12px;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 14px 14px;
  border: 0;
  background: transparent;
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  text-align: left;
  cursor: pointer;
  font: inherit;
}

.club-faq-acc__trigger:focus-visible {
  outline: 3px solid rgba(105, 151, 255, 0.65);
  outline-offset: -3px;
}

.club-faq-acc__icon {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: 12px;
  background:
    radial-gradient(circle at 50% 40%, rgba(126, 176, 255, 0.28), transparent 68%),
    rgba(47, 107, 255, 0.14);
  color: var(--cf-accent);
  box-shadow: 0 0 16px rgba(47, 107, 255, 0.16);
}

.club-faq-acc__icon svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 0 6px rgba(47, 107, 255, 0.4));
}

.club-faq-acc__q {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(15px, 3.8vw, 18px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.01em;
}

.club-faq-acc__chevron {
  display: grid;
  place-items: center;
  color: var(--cf-accent);
  transition: transform 220ms ease;
}

.club-faq-acc__item.is-open .club-faq-acc__chevron {
  transform: rotate(180deg);
}

.club-faq-acc__chevron svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-faq-acc__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 260ms ease;
}

.club-faq-acc__item.is-open .club-faq-acc__panel {
  grid-template-rows: 1fr;
}

.club-faq-acc__panel-inner {
  overflow: hidden;
}

.club-faq-acc__a {
  margin: 0;
  padding: 0 14px 16px 70px;
  color: var(--cf-dim);
  font-size: 14px;
  line-height: 1.5;
}

.club-faq-acc__banner {
  display: grid;
  gap: 16px;
  margin-top: 18px;
  padding: 18px 16px;
  border: 1px solid rgba(47, 107, 255, 0.45);
  border-radius: 18px;
  background:
    radial-gradient(ellipse 80% 120% at 0% 50%, rgba(47, 107, 255, 0.18), transparent 55%),
    var(--cf-card);
  box-shadow: 0 0 28px rgba(26, 86, 255, 0.12);
}

.club-faq-acc__banner-top {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
}

.club-faq-acc__banner-icon {
  display: grid;
  width: 56px;
  height: 56px;
  place-items: center;
}

.club-faq-acc__banner-icon svg {
  width: 48px;
  height: 48px;
  filter: drop-shadow(0 0 12px rgba(47, 107, 255, 0.45));
}

.club-faq-acc__banner h3 {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(18px, 4.4vw, 24px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.club-faq-acc__banner h3 span {
  color: var(--cf-accent);
}

.club-faq-acc__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: fit-content;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1a56ff, #2f6bff);
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  text-transform: uppercase;
  box-shadow: 0 8px 20px rgba(26, 86, 255, 0.22);
  transition: background 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.club-faq-acc__cta:hover,
.club-faq-acc__cta:focus-visible {
  background: linear-gradient(135deg, #2a63ff, #3a76ff);
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  box-shadow: 0 14px 32px rgba(26, 86, 255, 0.34);
  transform: translateY(-1px);
}

.club-faq-acc__cta:focus-visible {
  outline: 3px solid rgba(105, 151, 255, 0.65);
  outline-offset: 3px;
}

@media (min-width: 900px) {
  .club-faq-acc {
    padding: 64px 0 72px;
  }

  .club-faq-acc__shell {
    width: min(100% - 32px, 980px);
  }

  .club-faq-acc__title {
    margin-bottom: 28px;
  }

  .club-faq-acc__list {
    gap: 12px;
  }

  .club-faq-acc__item {
    border-radius: 18px;
  }

  .club-faq-acc__trigger {
    grid-template-columns: 52px minmax(0, 1fr) 32px;
    gap: 16px;
    padding: 16px 18px;
  }

  .club-faq-acc__icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
  }

  .club-faq-acc__icon svg {
    width: 24px;
    height: 24px;
  }

  .club-faq-acc__a {
    padding: 0 18px 18px 86px;
    font-size: 15px;
    max-width: 62ch;
  }

  .club-faq-acc__banner {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 20px;
    align-items: center;
    margin-top: 22px;
    padding: 20px 22px;
    border-radius: 22px;
  }

  .club-faq-acc__banner-top {
    grid-template-columns: 64px minmax(0, 1fr);
    gap: 16px;
  }

  .club-faq-acc__banner-icon,
  .club-faq-acc__banner-icon svg {
    width: 64px;
    height: 64px;
  }

  .club-faq-acc__banner h3 {
    font-size: 26px;
  }

  .club-faq-acc__cta {
    width: auto;
    min-width: 0;
    min-height: 40px;
    padding: 0 16px;
    font-size: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .club-faq-acc__panel,
  .club-faq-acc__chevron,
  .club-faq-acc__item,
  .club-faq-acc__cta {
    transition: none;
  }
}
`;
