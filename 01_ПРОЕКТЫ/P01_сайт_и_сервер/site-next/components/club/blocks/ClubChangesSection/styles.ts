/** Club "changes awaiting you" results block. */
export const CLUB_CHANGES_CSS = `
.club-changes {
  --cc-bg: #000000;
  --cc-card: #0d1016;
  --cc-line: rgba(255, 255, 255, 0.1);
  --cc-text: #ffffff;
  --cc-dim: rgba(210, 218, 230, 0.72);
  --cc-accent: #2f6bff;
  --cc-accent-strong: #1a56ff;
  position: relative;
  overflow: clip;
  padding: 48px 0 52px;
  background: var(--cc-bg);
  color: var(--cc-text);
  font-family: var(--font-body, Manrope, system-ui, sans-serif);
}

.club-changes__shell {
  width: min(100% - 20px, 1180px);
  margin: 0 auto;
}

.club-changes__head {
  margin: 0 0 22px;
  text-align: left;
}

.club-changes__title {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(30px, 8vw, 52px);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.club-changes__title span {
  display: block;
  color: var(--cc-accent);
}

.club-changes__grid {
  display: grid;
  gap: 12px;
}

.club-changes__card {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  padding: 16px 14px;
  border: 1px solid var(--cc-line);
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 50%),
    var(--cc-card);
}

.club-changes__icon {
  display: grid;
  width: 64px;
  height: 64px;
  place-items: center;
  border-radius: 18px;
  background:
    radial-gradient(circle at 50% 40%, rgba(126, 176, 255, 0.28), transparent 68%),
    rgba(47, 107, 255, 0.12);
  box-shadow: 0 0 24px rgba(47, 107, 255, 0.18);
  color: var(--cc-accent);
}

.club-changes__icon svg {
  width: 40px;
  height: 40px;
  overflow: visible;
  filter: drop-shadow(0 0 10px rgba(47, 107, 255, 0.5));
}

.club-changes__card h3 {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.club-changes__card p {
  margin: 6px 0 0;
  color: var(--cc-dim);
  font-size: 13px;
  line-height: 1.4;
}

.club-changes__banner {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  margin-top: 14px;
  padding: 16px 16px;
  border: 1px solid rgba(47, 107, 255, 0.45);
  border-radius: 18px;
  background:
    radial-gradient(ellipse 80% 120% at 0% 50%, rgba(47, 107, 255, 0.18), transparent 55%),
    var(--cc-card);
  box-shadow: 0 0 28px rgba(26, 86, 255, 0.12);
}

.club-changes__banner-icon {
  display: grid;
  width: 56px;
  height: 56px;
  place-items: center;
  color: var(--cc-accent);
}

.club-changes__banner-icon svg {
  width: 48px;
  height: 48px;
  filter: drop-shadow(0 0 12px rgba(47, 107, 255, 0.45));
}

.club-changes__banner h3 {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(18px, 4.5vw, 24px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.club-changes__banner h3 span {
  color: var(--cc-accent);
}

.club-changes__banner p {
  margin: 8px 0 0;
  color: var(--cc-dim);
  font-size: 13px;
  line-height: 1.4;
}

.club-changes__support {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.club-changes__support-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  min-height: 48px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  text-transform: uppercase;
  transition: background 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.club-changes__support-link:hover,
.club-changes__support-link:focus-visible {
  border-color: rgba(47, 107, 255, 0.55);
  background: rgba(47, 107, 255, 0.12);
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  box-shadow: 0 10px 24px rgba(26, 86, 255, 0.16);
}

.club-changes__support-link:focus-visible {
  outline: 3px solid rgba(105, 151, 255, 0.65);
  outline-offset: 3px;
}

.club-changes__support-link svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: var(--cc-accent);
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-changes__support p {
  margin: 0;
  max-width: 48ch;
  color: var(--cc-dim);
  font-size: 14px;
  line-height: 1.45;
}

@media (min-width: 900px) {
  .club-changes {
    padding: 64px 0 72px;
  }

  .club-changes__shell {
    width: min(100% - 32px, 1180px);
  }

  .club-changes__head {
    margin-bottom: 28px;
    text-align: center;
  }

  .club-changes__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
  }

  .club-changes__card {
    grid-template-columns: 1fr;
    gap: 16px;
    justify-items: center;
    text-align: center;
    min-height: 100%;
    padding: 22px 16px 20px;
    border-radius: 22px;
  }

  .club-changes__icon {
    width: 72px;
    height: 72px;
    border-radius: 22px;
  }

  .club-changes__icon svg {
    width: 44px;
    height: 44px;
  }

  .club-changes__card h3 {
    font-size: 16px;
    max-width: 16ch;
  }

  .club-changes__card p {
    font-size: 13.5px;
  }

  .club-changes__banner {
    grid-template-columns: 72px minmax(0, 1fr);
    gap: 18px;
    margin-top: 18px;
    padding: 22px 24px;
    border-radius: 22px;
  }

  .club-changes__banner-icon,
  .club-changes__banner-icon svg {
    width: 64px;
    height: 64px;
  }

  .club-changes__banner h3 {
    font-size: 28px;
  }

  .club-changes__banner p {
    font-size: 15px;
  }

  .club-changes__support {
    grid-template-columns: auto minmax(0, 1fr);
    gap: 20px;
    align-items: center;
    margin-top: 22px;
  }

  .club-changes__support-link {
    min-height: 52px;
    padding: 0 18px;
    font-size: 14px;
  }

  .club-changes__support p {
    font-size: 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .club-changes__support-link {
    transition: none;
  }
}
`;
