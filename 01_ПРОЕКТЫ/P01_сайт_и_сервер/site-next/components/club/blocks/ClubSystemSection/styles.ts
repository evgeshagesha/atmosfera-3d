/** Club System 3D block — EG colors, soft coaching visual */
export const CLUB_SYSTEM_CSS = `
.club-system {
  --cs-bg: #000000;
  --cs-surface: #0d1016;
  --cs-text: #ffffff;
  --cs-dim: rgba(210, 218, 230, 0.72);
  --cs-line: rgba(255, 255, 255, 0.1);
  --cs-accent: #2f6bff;
  position: relative;
  background: var(--cs-bg);
  color: var(--cs-text);
  font-family: var(--font-body, Manrope, system-ui, sans-serif);
  overflow: clip;
  padding: 56px 0 64px;
}

.club-system__inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 28px;
}

.club-system__hero {
  display: grid;
  gap: 12px;
  max-width: 780px;
  margin-bottom: 28px;
}

.club-system__eyebrow {
  margin: 0;
  color: var(--cs-accent);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.club-system__title {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(28px, 4.2vw, 44px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.club-system__lead {
  margin: 4px 0 0;
  max-width: 58ch;
  color: var(--cs-dim);
  font-size: 16px;
  line-height: 1.55;
}

.club-system__pillars {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 0;
}

.club-system__pillar {
  padding: 18px 18px 20px;
  border: 1px solid var(--cs-line);
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 55%),
    var(--cs-surface);
}

.club-system__pillar-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.club-system__pillar-icon {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid rgba(47, 107, 255, 0.4);
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 50% 40%, rgba(126, 176, 255, 0.22), transparent 70%),
    rgba(47, 107, 255, 0.12);
}

.club-system__pillar-icon svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: #7eb0ff;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-system__pillar strong {
  display: block;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  line-height: 1.1;
}

.club-system__pillar p {
  margin: 0;
  color: var(--cs-dim);
  font-size: 14px;
  line-height: 1.45;
}

@media (max-width: 980px) {
  .club-system {
    padding: 40px 0 48px;
  }

  .club-system__inner {
    padding: 0 18px;
  }

  .club-system__hero {
    gap: 10px;
    margin-bottom: 18px;
  }

  .club-system__pillars {
    grid-template-columns: 1fr;
  }

  .club-system__pillar strong {
    white-space: normal;
  }
}

@media (min-width: 700px) and (max-width: 980px) {
  .club-system__pillars {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .club-system__pillar {
    padding: 14px 12px 16px;
  }

  .club-system__pillar strong {
    font-size: 14px;
    white-space: nowrap;
  }

  .club-system__pillar p {
    font-size: 12.5px;
  }
}
`;
