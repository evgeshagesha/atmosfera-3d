/** Club guarantee + support block after tariffs. */
export const CLUB_GUARANTEE_SUPPORT_CSS = `
.club-gs {
  --gs-bg: #000000;
  --gs-card: #0d1016;
  --gs-line: rgba(255, 255, 255, 0.1);
  --gs-text: #ffffff;
  --gs-dim: rgba(210, 218, 230, 0.72);
  --gs-accent: #2f6bff;
  --gs-accent-strong: #1a56ff;
  position: relative;
  overflow: clip;
  padding: 28px 0 48px;
  background: var(--gs-bg);
  color: var(--gs-text);
  font-family: var(--font-body, Manrope, system-ui, sans-serif);
}

.club-gs__shell {
  width: min(100% - 20px, 1120px);
  margin: 0 auto;
  display: grid;
  gap: 14px;
}

.club-gs__card {
  position: relative;
  display: grid;
  gap: 22px;
  padding: 24px 20px;
  border: 1px solid var(--gs-line);
  border-radius: 24px;
  background:
    radial-gradient(ellipse 70% 80% at 12% 40%, rgba(47, 107, 255, 0.14), transparent 58%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 46%),
    var(--gs-card);
  overflow: hidden;
}

.club-gs__card--support {
  background:
    radial-gradient(ellipse 70% 80% at 12% 45%, rgba(47, 107, 255, 0.12), transparent 58%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 46%),
    var(--gs-card);
}

.club-gs__visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 180px;
}

.club-gs__visual-glow {
  position: absolute;
  inset: 18% 20%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(47, 107, 255, 0.34), transparent 70%);
  filter: blur(8px);
  pointer-events: none;
}

.club-gs__art {
  position: relative;
  z-index: 1;
  width: min(100%, 210px);
  height: auto;
  filter: drop-shadow(0 16px 28px rgba(26, 86, 255, 0.28));
}

.club-gs__copy {
  display: grid;
  gap: 14px;
  align-content: center;
}

.club-gs__title {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(28px, 7vw, 44px);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.club-gs__title span {
  color: var(--gs-accent);
}

.club-gs__lead {
  margin: 0;
  max-width: 42ch;
  color: var(--gs-dim);
  font-size: 14px;
  line-height: 1.45;
}

.club-gs__points {
  display: grid;
  gap: 10px;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
}

.club-gs__point {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
}

.club-gs__point-icon {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 12px;
  background: rgba(47, 107, 255, 0.14);
  color: var(--gs-accent);
}

.club-gs__point-icon svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-gs__point p {
  margin: 0;
  color: rgba(235, 240, 248, 0.9);
  font-size: 13px;
  line-height: 1.3;
  font-weight: 600;
}

.club-gs__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: fit-content;
  min-height: 48px;
  margin-top: 4px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.03);
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-decoration: none;
  transition: background 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.club-gs__cta:hover,
.club-gs__cta:focus-visible {
  border-color: rgba(47, 107, 255, 0.55);
  background: rgba(47, 107, 255, 0.12);
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  box-shadow: 0 10px 24px rgba(26, 86, 255, 0.18);
}

.club-gs__cta:focus-visible {
  outline: 3px solid rgba(105, 151, 255, 0.65);
  outline-offset: 3px;
}

.club-gs__cta svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: var(--gs-accent);
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (min-width: 860px) {
  .club-gs {
    padding: 36px 0 64px;
  }

  .club-gs__shell {
    width: min(100% - 32px, 1180px);
    gap: 18px;
  }

  .club-gs__card {
    grid-template-columns: 280px minmax(0, 1fr);
    gap: 28px 36px;
    align-items: center;
    padding: 32px 36px;
    border-radius: 28px;
  }

  .club-gs__visual {
    min-height: 240px;
  }

  .club-gs__art {
    width: min(100%, 240px);
  }

  .club-gs__title {
    font-size: clamp(36px, 3.4vw, 48px);
  }

  .club-gs__lead {
    font-size: 16px;
  }

  .club-gs__points {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  .club-gs__point {
    grid-template-columns: 1fr;
    gap: 10px;
    justify-items: start;
    min-height: 100%;
    padding: 14px;
  }

  .club-gs__point p {
    font-size: 14px;
  }

  .club-gs__cta {
    min-height: 52px;
    padding: 0 22px;
    font-size: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .club-gs__cta {
    transition: none;
  }
}
`;
