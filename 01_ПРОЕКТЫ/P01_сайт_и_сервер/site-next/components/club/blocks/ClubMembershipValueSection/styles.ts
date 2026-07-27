export const CLUB_MEMBERSHIP_VALUE_CSS = `
.club-value {
  --cv-bg: #000000;
  --cv-card: #0b0d11;
  --cv-line: rgba(255, 255, 255, 0.12);
  --cv-text: #ffffff;
  --cv-dim: rgba(210, 218, 230, 0.68);
  --cv-muted: rgba(190, 200, 214, 0.42);
  --cv-accent: #2f6bff;
  --cv-accent-strong: #1a56ff;
  position: relative;
  overflow: clip;
  padding: 48px 0 36px;
  background: var(--cv-bg);
  color: var(--cv-text);
  font-family: var(--font-body, Manrope, system-ui, sans-serif);
}

.club-value__shell {
  position: relative;
  z-index: 1;
  width: min(100% - 24px, 430px);
  margin: 0 auto;
}

.club-value__hero {
  position: relative;
  min-height: 168px;
  margin-bottom: 14px;
}

.club-value__copy {
  position: relative;
  z-index: 2;
  max-width: 68%;
}

.club-value__title {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(34px, 10.5vw, 44px);
  font-weight: 700;
  line-height: 0.96;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.club-value__title span {
  display: block;
  color: var(--cv-accent);
}

.club-value__lead {
  max-width: 22ch;
  margin: 12px 0 0;
  color: var(--cv-dim);
  font-size: 12px;
  line-height: 1.45;
}

.club-value__portrait {
  position: absolute;
  top: -28px;
  right: -18px;
  width: 178px;
  height: 220px;
  pointer-events: none;
}

.club-value__portrait::after {
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  height: 42%;
  background: linear-gradient(transparent, #000 88%);
  content: "";
}

.club-value__portrait-image {
  object-fit: cover !important;
  object-position: center top !important;
  filter: contrast(1.05) saturate(0.92);
}

.club-value__catalog {
  position: relative;
  z-index: 2;
  padding: 16px 12px 10px;
  border: 1px solid var(--cv-line);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 40%), var(--cv-card);
}

.club-value__catalog-label {
  margin: 0 0 12px;
  color: rgba(214, 222, 234, 0.55);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.club-value__columns {
  display: grid;
  grid-template-columns: 1.15fr 0.95fr;
  gap: 0 10px;
}

.club-value__columns ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.club-value__benefit {
  display: flex;
  gap: 7px;
  align-items: flex-start;
  min-height: 34px;
  padding: 5px 0;
}

.club-value__check {
  display: grid;
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  margin-top: 1px;
  place-items: center;
}

.club-value__check svg {
  width: 16px;
  height: 16px;
}

.club-value__check circle {
  fill: var(--cv-accent-strong);
  stroke: none;
}

.club-value__check path {
  fill: none;
  stroke: #fff;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-value__benefit-copy {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 8px;
  align-items: baseline;
  min-width: 0;
}

.club-value__benefit-title {
  color: rgba(255, 255, 255, 0.92);
  font-size: 9.5px;
  line-height: 1.28;
}

.club-value__old-price {
  flex: 0 0 auto;
  color: rgba(180, 190, 205, 0.48);
  font-size: 8.5px;
  line-height: 1.2;
  text-decoration-thickness: 1px;
  white-space: nowrap;
}

.club-value__offer {
  position: relative;
  display: grid;
  gap: 14px;
  margin-top: 12px;
  padding: 18px 16px 16px;
  border: 1px solid var(--cv-line);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 50%), var(--cv-card);
  text-align: center;
}

.club-value__anchor {
  position: absolute;
  top: -90px;
  pointer-events: none;
}

.club-value__total,
.club-value__price {
  display: grid;
  gap: 4px;
  justify-items: center;
}

.club-value__total span,
.club-value__price > span {
  color: var(--cv-muted);
  font-size: 11px;
}

.club-value__total s {
  color: rgba(210, 218, 230, 0.42);
  font-size: 34px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.02em;
}

.club-value__price p {
  display: grid;
  gap: 2px;
  margin: 0;
  justify-items: center;
}

.club-value__price strong {
  font-size: 52px;
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.club-value__price small {
  color: rgba(230, 235, 243, 0.72);
  font-size: 15px;
}

.club-value__price em {
  color: rgba(210, 218, 230, 0.5);
  font-size: 12px;
  font-style: normal;
}

.club-value__price em b {
  color: var(--cv-accent);
  font-weight: 700;
}

.club-value__cta,
.club-value__cta:link,
.club-value__cta:visited {
  display: flex;
  min-height: 52px;
  align-items: center;
  justify-content: center;
  gap: 14px;
  border-radius: 999px;
  background: linear-gradient(135deg, #1a56ff, #2f6bff);
  box-shadow: 0 14px 34px rgba(26, 86, 255, 0.35);
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  text-transform: uppercase;
  transition: background 180ms ease, box-shadow 180ms ease;
}

.club-value__cta:hover,
.club-value__cta:focus-visible {
  background: linear-gradient(135deg, #2a63ff, #3a76ff);
  box-shadow: 0 16px 40px rgba(26, 86, 255, 0.45);
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
}

.club-value__cta:focus-visible {
  outline: 3px solid rgba(105, 151, 255, 0.65);
  outline-offset: 4px;
}

.club-value__cta svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: #fff !important;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-value__features {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  margin-top: 14px;
  padding: 14px 6px;
  border: 1px solid var(--cv-line);
  border-radius: 16px;
  background: var(--cv-card);
}

.club-value__feature {
  display: grid;
  gap: 8px;
  justify-items: center;
  padding: 4px 4px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.club-value__feature:last-child {
  border-right: 0;
}

.club-value__feature > span {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
}

.club-value__feature svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: var(--cv-accent);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-value__feature p {
  display: grid;
  gap: 2px;
  margin: 0;
}

.club-value__feature strong,
.club-value__feature small {
  color: rgba(240, 244, 250, 0.78);
  font-size: 8.5px;
  font-weight: 500;
  line-height: 1.25;
}

.club-value__feature small {
  color: rgba(200, 210, 224, 0.55);
  font-weight: 400;
}

.club-value__safe {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin: 14px 0 0;
  color: rgba(190, 200, 214, 0.42);
  font-size: 10px;
}

.club-value__safe svg {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (min-width: 721px) {
  .club-value {
    padding: 72px 0 56px;
  }

  .club-value__shell {
    width: min(100% - 56px, 1180px);
  }

  .club-value__hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 340px;
    gap: 24px;
    align-items: end;
    min-height: 0;
    margin-bottom: 22px;
  }

  .club-value__copy {
    max-width: none;
  }

  .club-value__title {
    max-width: 14ch;
    font-size: clamp(48px, 5vw, 68px);
  }

  .club-value__lead {
    max-width: 42ch;
    margin-top: 18px;
    font-size: 16px;
  }

  .club-value__portrait {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    height: 360px;
  }

  .club-value__portrait::after {
    height: 28%;
    background: linear-gradient(transparent, #000 90%);
  }

  .club-value__catalog {
    padding: 24px 28px 18px;
    border-radius: 22px;
  }

  .club-value__catalog-label {
    margin-bottom: 16px;
    font-size: 12px;
  }

  .club-value__columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 48px;
  }

  .club-value__benefit {
    gap: 12px;
    min-height: 42px;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .club-value__columns ul > .club-value__benefit:last-child {
    border-bottom: 0;
  }

  .club-value__check,
  .club-value__check svg {
    width: 20px;
    height: 20px;
  }

  .club-value__benefit-copy {
    gap: 6px 12px;
  }

  .club-value__benefit-title {
    font-size: 14px;
  }

  .club-value__old-price {
    font-size: 13px;
  }

  .club-value__offer {
    grid-template-columns: 0.9fr 1fr 0.95fr;
    gap: 24px;
    align-items: center;
    margin-top: 18px;
    padding: 24px 28px;
    border-radius: 22px;
    text-align: left;
  }

  .club-value__total,
  .club-value__price {
    justify-items: start;
  }

  .club-value__total {
    padding-right: 24px;
    border-right: 1px solid var(--cv-line);
  }

  .club-value__price {
    justify-items: center;
    text-align: center;
  }

  .club-value__total s {
    font-size: 44px;
  }

  .club-value__price p {
    display: flex;
    gap: 10px;
    align-items: baseline;
  }

  .club-value__price strong {
    font-size: 58px;
  }

  .club-value__price small {
    font-size: 18px;
  }

  .club-value__cta {
    min-height: 64px;
    border-radius: 16px;
    font-size: 15px;
  }

  .club-value__features {
    margin-top: 18px;
    padding: 8px 0;
    border-radius: 18px;
  }

  .club-value__feature {
    min-height: 88px;
    align-content: center;
    padding: 16px 12px;
  }

  .club-value__feature strong,
  .club-value__feature small {
    font-size: 12px;
  }
}

@media (max-width: 380px) {
  .club-value__portrait {
    width: 156px;
    height: 196px;
    right: -14px;
  }

  .club-value__benefit-title {
    font-size: 8.8px;
  }

  .club-value__old-price {
    font-size: 7.4px;
  }

  .club-value__price strong {
    font-size: 46px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .club-value__cta {
    transition: none;
  }
}
`;
