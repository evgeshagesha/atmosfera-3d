/** Club help benefits block — desktop grid + mobile compact list. */
export const CLUB_HELP_CSS = `
.club-help {
  --ch-bg: var(--eg-bg, #0c0e12);
  --ch-surface: #151a22;
  --ch-card: #12171f;
  --ch-text: #fff;
  --ch-dim: rgba(220, 228, 238, 0.72);
  --ch-line: rgba(255, 255, 255, 0.1);
  --ch-accent: #3db4ff;
  --ch-accent-soft: rgba(61, 180, 255, 0.16);
  position: relative;
  background: var(--ch-bg);
  color: var(--ch-text);
  font-family: var(--font-body, Manrope, system-ui, sans-serif);
  padding: 36px 0 52px;
  overflow: clip;
}

.club-help__shell {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 28px;
}

.club-help__intro {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(240px, 0.85fr);
  gap: 28px 40px;
  align-items: center;
  margin-bottom: 28px;
}

.club-help__copy {
  max-width: 620px;
  padding-bottom: 8px;
}

.club-help__title {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(34px, 5vw, 56px);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.club-help__title span {
  background: linear-gradient(120deg, #7ad4ff 0%, #3db4ff 55%, #2a8de0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.club-help__lead {
  margin: 16px 0 0;
  max-width: 46ch;
  color: var(--ch-dim);
  font-size: clamp(15px, 1.35vw, 17px);
  line-height: 1.55;
}

.club-help__photo {
  position: relative;
  justify-self: end;
  width: min(100%, 360px);
  aspect-ratio: 3 / 4;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(circle at 50% 30%, rgba(61, 180, 255, 0.18), transparent 55%),
    #0d1218;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.45),
    0 0 40px rgba(61, 180, 255, 0.12);
}

.club-help__photo::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 34%;
  background: linear-gradient(180deg, transparent, rgba(12, 14, 18, 0.92));
  pointer-events: none;
  z-index: 1;
}

.club-help__photo img {
  object-fit: cover !important;
  object-position: center 12% !important;
}

.club-help__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  align-items: stretch;
}

.club-help__card {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  gap: 14px 16px;
  align-items: start;
  min-height: 100%;
  height: 100%;
  padding: 18px 18px 20px;
  border-radius: 18px;
  border: 1px solid var(--ch-line);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 55%),
    var(--ch-card);
  box-sizing: border-box;
}

.club-help__card--glow {
  border-color: rgba(61, 180, 255, 0.35);
  background:
    radial-gradient(ellipse 80% 90% at 85% 20%, rgba(61, 180, 255, 0.22), transparent 55%),
    linear-gradient(180deg, rgba(61, 180, 255, 0.08), transparent 60%),
    var(--ch-card);
  box-shadow: 0 0 28px rgba(61, 180, 255, 0.14);
}

.club-help__icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  border: 1px solid rgba(61, 180, 255, 0.4);
  background:
    linear-gradient(160deg, rgba(61, 180, 255, 0.22), rgba(61, 180, 255, 0.06));
  box-shadow: 0 0 18px rgba(61, 180, 255, 0.2);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.club-help__icon svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: var(--ch-accent);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-help__body h3 {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 17px;
  font-weight: 650;
  line-height: 1.25;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.club-help__body p {
  margin: 8px 0 0;
  color: var(--ch-dim);
  font-size: 14px;
  line-height: 1.5;
}

.club-help__mobile {
  display: none;
}

.club-help__row {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) 18px;
  gap: 12px;
  align-items: center;
  min-height: 72px;
  padding: 14px 14px;
  border-radius: 16px;
  border: 1px solid var(--ch-line);
  background: var(--ch-card);
  text-decoration: none;
  color: #fff !important;
}

.club-help__row--glow {
  border-color: rgba(61, 180, 255, 0.4);
  background:
    radial-gradient(ellipse 70% 120% at 100% 0%, rgba(61, 180, 255, 0.2), transparent 50%),
    var(--ch-card);
  box-shadow: 0 0 22px rgba(61, 180, 255, 0.12);
}

.club-help__row .club-help__icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
}

.club-help__row .club-help__icon svg {
  width: 20px;
  height: 20px;
}

.club-help__row strong {
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 15px;
  font-weight: 650;
  line-height: 1.25;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.club-help__chevron {
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  line-height: 1;
}

.club-help__list {
  display: grid;
  gap: 10px;
}

@media (max-width: 980px) {
  .club-help {
    padding: 28px 0 40px;
  }

  .club-help__shell {
    padding: 0 16px;
  }

  .club-help__intro {
    grid-template-columns: minmax(0, 1fr) minmax(140px, 42%);
    gap: 8px 14px;
    align-items: start;
    margin-bottom: 18px;
  }

  .club-help__title {
    font-size: clamp(30px, 9vw, 40px);
    max-width: 8ch;
  }

  .club-help__lead {
    margin-top: 12px;
    font-size: 14px;
    max-width: none;
  }

  .club-help__photo {
    width: 100%;
    max-width: 180px;
    aspect-ratio: 3 / 4;
    border-radius: 18px;
    justify-self: end;
    align-self: start;
  }

  .club-help__grid {
    display: none;
  }

  .club-help__mobile {
    display: block;
  }
}

@media (max-width: 420px) {
  .club-help__photo {
    max-width: 150px;
  }

  .club-help__row {
    min-height: 68px;
    padding: 12px;
  }

  .club-help__row strong {
    font-size: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .club-help__card,
  .club-help__row {
    transition: none;
  }
}
`;
