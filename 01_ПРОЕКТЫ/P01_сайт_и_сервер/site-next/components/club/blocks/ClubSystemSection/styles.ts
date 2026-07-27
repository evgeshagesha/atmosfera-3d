/** Club System 3D block — EG colors, soft coaching visual */
export const CLUB_SYSTEM_CSS = `
.club-system {
  --cs-bg: #000000;
  --cs-surface: var(--eg-surface, #14181f);
  --cs-text: var(--eg-text, #fff);
  --cs-dim: var(--eg-text-dim, rgba(255, 255, 255, 0.72));
  --cs-line: var(--eg-line, rgba(255, 255, 255, 0.14));
  --cs-accent: rgba(120, 170, 220, 0.85);
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
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 28px 40px;
  align-items: center;
  margin-bottom: 36px;
}

.club-system__eyebrow {
  margin: 0 0 12px;
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
  margin: 16px 0 0;
  max-width: 46ch;
  color: var(--cs-dim);
  font-size: 16px;
  line-height: 1.55;
}

.club-system__visual {
  position: relative;
  min-height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.club-system__glow {
  position: absolute;
  inset: 10% 4%;
  border-radius: 28px;
  background: radial-gradient(circle at 50% 45%, rgba(70, 120, 180, 0.18), transparent 70%);
  filter: blur(10px);
  pointer-events: none;
}

.club-system__photo {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 560px;
  aspect-ratio: 4 / 3;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35);
}

.club-system__photo img {
  object-fit: cover !important;
  object-position: center 42% !important;
  filter: none;
}

.club-system__pillars {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 18px;
}

.club-system__pillar {
  padding: 22px 20px 24px;
  border: 1px solid var(--cs-line);
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 55%),
    var(--cs-surface);
}

.club-system__pillar-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 14px;
  border-radius: 50%;
  border: 1px solid rgba(140, 180, 220, 0.35);
  display: grid;
  place-items: center;
  background: rgba(80, 130, 190, 0.12);
}

.club-system__pillar-icon svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: rgba(180, 210, 240, 0.92);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-system__pillar strong {
  display: block;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 18px;
  font-weight: 650;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.club-system__pillar p {
  margin: 8px 0 0;
  color: var(--cs-dim);
  font-size: 14px;
  line-height: 1.45;
}

.club-system__meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.club-system__meta-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 64px;
  padding: 14px 16px;
  border: 1px solid var(--cs-line);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 14px;
  line-height: 1.35;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.club-system__meta-item:hover {
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.04);
}

.club-system__meta-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: grid;
  place-items: center;
}

.club-system__meta-icon svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: rgba(220, 230, 240, 0.9);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-system__meta-chevron {
  margin-left: auto;
  opacity: 0.45;
  font-size: 16px;
}

@media (max-width: 980px) {
  .club-system {
    padding: 40px 0 48px;
  }

  .club-system__inner {
    padding: 0 18px;
  }

  .club-system__hero {
    grid-template-columns: 1fr;
    gap: 18px;
    margin-bottom: 22px;
  }

  .club-system__visual {
    order: 2;
    min-height: 240px;
  }

  .club-system__photo {
    max-width: 100%;
    aspect-ratio: 5 / 4;
  }

  .club-system__pillars,
  .club-system__meta {
    grid-template-columns: 1fr;
  }

  .club-system__meta-chevron {
    display: inline;
  }
}

@media (min-width: 981px) {
  .club-system__meta-chevron {
    display: none;
  }
}
`;
