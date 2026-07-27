/** Club creator block — photo on top, content below. */
export const CLUB_CREATOR_CSS = `
.club-creator {
  --cc-bg: #000000;
  --cc-card: #10141a;
  --cc-surface: #151a22;
  --cc-text: #fff;
  --cc-dim: rgba(220, 228, 238, 0.72);
  --cc-line: rgba(255, 255, 255, 0.1);
  --cc-accent: #3db4ff;
  --cc-accent-soft: rgba(61, 180, 255, 0.16);
  position: relative;
  background: var(--cc-bg);
  color: var(--cc-text);
  font-family: var(--font-body, Manrope, system-ui, sans-serif);
  padding: 28px 0 40px;
  overflow: clip;
}

.club-creator__shell {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 28px;
}

.club-creator__card {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
  padding: 32px 36px 28px;
  border-radius: 28px;
  background:
    radial-gradient(ellipse 48% 36% at 50% 18%, rgba(40, 110, 190, 0.16), transparent 70%),
    linear-gradient(165deg, #141922 0%, #0e1218 55%, #0c1016 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  overflow: hidden;
}

.club-creator__card::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  width: min(420px, 55%);
  height: 2px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, transparent, var(--cc-accent), transparent);
  box-shadow: 0 0 18px rgba(61, 180, 255, 0.55);
  pointer-events: none;
}

.club-creator__header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
}

.club-creator__eyebrow {
  margin: 0;
  color: var(--cc-accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.club-creator__title {
  margin: 10px 0 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(34px, 4.4vw, 52px);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.club-creator__title span {
  color: var(--cc-accent);
}

.club-creator__role {
  margin: 14px auto 0;
  max-width: 52ch;
  color: var(--cc-dim);
  font-size: 15px;
  line-height: 1.5;
}

.club-creator__visual {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  min-height: 360px;
  padding: 4px 0 0;
}

.club-creator__glow {
  position: absolute;
  top: 2%;
  left: 50%;
  width: min(420px, 70%);
  aspect-ratio: 1;
  transform: translateX(-50%);
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(61, 180, 255, 0.4) 0%, rgba(61, 180, 255, 0.12) 42%, transparent 70%);
  filter: blur(2px);
  pointer-events: none;
  z-index: 0;
}

.club-creator__photo {
  position: relative;
  z-index: 1;
  width: min(100%, 400px);
  aspect-ratio: 1 / 1.05;
  margin: 0 auto;
}

.club-creator__photo img {
  object-fit: contain !important;
  object-position: center bottom !important;
  filter: contrast(1.04) saturate(1.05) brightness(1.03);
}

.club-creator__sign {
  position: relative;
  z-index: 2;
  margin-top: -6px;
  text-align: center;
}

.club-creator__sign-mark {
  display: block;
  font-family: "Segoe Script", "Brush Script MT", "Apple Chancery", cursive;
  font-size: 28px;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1;
}

.club-creator__sign-caption {
  margin: 6px 0 0;
  font-size: 12px;
  color: rgba(220, 228, 238, 0.7);
}

.club-creator__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.club-creator__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.club-creator__item {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  align-items: start;
  padding: 16px 14px;
  border-radius: 16px;
  border: 1px solid var(--cc-line);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 60%),
    var(--cc-surface);
}

.club-creator__item--wide {
  grid-column: 1 / -1;
}

.club-creator__icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(61, 180, 255, 0.45);
  background: var(--cc-accent-soft);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.club-creator__icon svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: var(--cc-accent);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-creator__item p {
  margin: 0;
  color: rgba(230, 236, 244, 0.86);
  font-size: 13.5px;
  line-height: 1.45;
}

.club-creator__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 2px;
  padding-top: 2px;
}

.club-creator__stat {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  justify-content: center;
}

.club-creator__stat-icon {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(61, 180, 255, 0.4);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.club-creator__stat-icon svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: var(--cc-accent);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-creator__stat span {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: rgba(235, 240, 246, 0.9);
  line-height: 1.25;
}

@media (max-width: 980px) {
  .club-creator {
    padding: 18px 0 28px;
  }

  .club-creator__shell {
    padding: 0 16px;
  }

  .club-creator__card {
    gap: 16px;
    padding: 22px 16px 20px;
    border-radius: 22px;
  }

  .club-creator__header {
    text-align: left;
  }

  .club-creator__role {
    margin-left: 0;
    margin-right: 0;
    font-size: 14px;
  }

  .club-creator__visual {
    min-height: 300px;
  }

  .club-creator__photo {
    width: min(100%, 320px);
  }

  .club-creator__grid {
    grid-template-columns: 1fr;
  }

  .club-creator__item--wide {
    grid-column: auto;
  }

  .club-creator__stats {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .club-creator__stat {
    justify-content: flex-start;
  }

  .club-creator__title {
    font-size: clamp(30px, 9vw, 40px);
  }
}

@media (min-width: 700px) and (max-width: 980px) {
  .club-creator__stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .club-creator__stat {
    justify-content: center;
  }
}
`;
