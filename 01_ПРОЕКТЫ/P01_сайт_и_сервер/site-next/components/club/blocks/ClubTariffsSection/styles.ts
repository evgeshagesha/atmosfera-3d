/** Club tariffs — compact 3-column row, featured card slightly raised. */
export const CLUB_TARIFFS_CSS = `
.club-tariffs {
  --ct-bg: #000000;
  --ct-card: #0d1016;
  --ct-card-2: #11151d;
  --ct-line: rgba(255, 255, 255, 0.12);
  --ct-text: #ffffff;
  --ct-dim: rgba(210, 218, 238, 0.72);
  --ct-muted: rgba(190, 200, 214, 0.48);
  --ct-accent: #2f6bff;
  --ct-accent-strong: #1a56ff;
  position: relative;
  overflow: clip;
  padding: 48px 0 40px;
  background: var(--ct-bg);
  color: var(--ct-text);
  font-family: var(--font-body, Manrope, system-ui, sans-serif);
}

.club-tariffs__shell {
  width: min(100% - 20px, 1120px);
  margin: 0 auto;
}

.club-tariffs__head {
  max-width: 640px;
  margin: 0 auto 22px;
  text-align: center;
}

.club-tariffs__title {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(28px, 6vw, 48px);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.club-tariffs__title span {
  display: block;
  color: var(--ct-accent);
}

.club-tariffs__lead {
  max-width: 34ch;
  margin: 12px auto 0;
  color: var(--ct-dim);
  font-size: 13px;
  line-height: 1.4;
}

.club-tariffs__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  align-items: stretch;
  padding-top: 14px;
}

.club-tariffs__card {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 12px;
  align-content: start;
  min-width: 0;
  min-height: 100%;
  padding: 18px 12px 14px;
  border: 1px solid var(--ct-line);
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 42%),
    var(--ct-card);
}

.club-tariffs__card--featured {
  z-index: 3;
  border-color: rgba(47, 107, 255, 0.78);
  background:
    radial-gradient(ellipse 90% 55% at 50% 0%, rgba(47, 107, 255, 0.24), transparent 58%),
    linear-gradient(180deg, rgba(47, 107, 255, 0.1), transparent 42%),
    var(--ct-card-2);
  box-shadow:
    0 0 0 1px rgba(47, 107, 255, 0.22),
    0 18px 36px rgba(26, 86, 255, 0.22);
  transform: scale(1.03);
}

.club-tariffs__badge {
  position: absolute;
  top: -11px;
  left: 50%;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transform: translateX(-50%);
  padding: 5px 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, #1a56ff, #2f6bff);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 8px 18px rgba(26, 86, 255, 0.35);
}

.club-tariffs__badge svg {
  width: 11px;
  height: 11px;
  fill: currentColor;
}

.club-tariffs__card-top {
  display: grid;
  gap: 3px;
}

.club-tariffs__period {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(18px, 2.2vw, 26px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.club-tariffs__subtitle {
  margin: 0;
  color: var(--ct-muted);
  font-size: 11px;
  line-height: 1.25;
}

.club-tariffs__price-block {
  display: grid;
  gap: 4px;
}

.club-tariffs__old {
  color: rgba(180, 190, 205, 0.48);
  font-size: 12px;
  line-height: 1;
  text-decoration-thickness: 1px;
}

.club-tariffs__price-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 8px;
}

.club-tariffs__price {
  margin: 0;
  font-size: clamp(26px, 3.2vw, 40px);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.club-tariffs__price-meta {
  display: grid;
  gap: 1px;
}

.club-tariffs__price-meta span {
  color: rgba(230, 235, 243, 0.72);
  font-size: 11px;
}

.club-tariffs__price-meta small {
  color: var(--ct-accent);
  font-size: 11px;
  font-weight: 600;
}

.club-tariffs__discount {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  background: rgba(47, 107, 255, 0.18);
  color: #7ea2ff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.club-tariffs__features {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 7px;
}

.club-tariffs__feature {
  display: grid;
  grid-template-columns: 15px minmax(0, 1fr);
  gap: 7px;
  align-items: start;
  color: rgba(240, 244, 250, 0.88);
  font-size: 11px;
  line-height: 1.3;
}

.club-tariffs__check {
  display: grid;
  width: 15px;
  height: 15px;
  margin-top: 1px;
  place-items: center;
}

.club-tariffs__check svg {
  width: 15px;
  height: 15px;
}

.club-tariffs__check circle {
  fill: var(--ct-accent-strong);
}

.club-tariffs__check path {
  fill: none;
  stroke: #fff;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-tariffs__cta {
  display: flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: transparent;
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-decoration: none;
  text-transform: uppercase;
  transition: background 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.club-tariffs__cta:hover,
.club-tariffs__cta:focus-visible {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.04);
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
}

.club-tariffs__cta--primary {
  border: 0;
  background: linear-gradient(135deg, #1a56ff, #2f6bff);
  box-shadow: 0 10px 24px rgba(26, 86, 255, 0.32);
}

.club-tariffs__cta--primary:hover,
.club-tariffs__cta--primary:focus-visible {
  background: linear-gradient(135deg, #2a63ff, #3a76ff);
  box-shadow: 0 12px 28px rgba(26, 86, 255, 0.42);
}

.club-tariffs__cta:focus-visible {
  outline: 3px solid rgba(105, 151, 255, 0.65);
  outline-offset: 3px;
}

.club-tariffs__bonus {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  margin-top: 16px;
  padding: 14px 16px;
  border: 1px solid var(--ct-line);
  border-radius: 16px;
  background:
    linear-gradient(90deg, rgba(47, 107, 255, 0.1), transparent 55%),
    var(--ct-card);
}

.club-tariffs__bonus-icon {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 12px;
  background: rgba(47, 107, 255, 0.16);
  color: var(--ct-accent);
}

.club-tariffs__bonus-icon svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-tariffs__bonus p {
  margin: 0;
  color: rgba(230, 235, 243, 0.86);
  font-size: 13px;
  line-height: 1.35;
}

.club-tariffs__bonus strong {
  color: var(--ct-accent);
  font-weight: 700;
}

.club-tariffs__trust {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 14px;
}

.club-tariffs__trust-item {
  display: grid;
  gap: 6px;
  justify-items: center;
  text-align: center;
  padding: 8px 4px;
}

.club-tariffs__trust-item span {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  color: var(--ct-accent);
}

.club-tariffs__trust-item svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-tariffs__trust-item p {
  margin: 0;
  color: rgba(210, 218, 230, 0.7);
  font-size: 10px;
  line-height: 1.25;
}

@media (min-width: 900px) {
  .club-tariffs {
    padding: 64px 0 56px;
  }

  .club-tariffs__shell {
    width: min(100% - 32px, 1180px);
  }

  .club-tariffs__head {
    margin-bottom: 28px;
  }

  .club-tariffs__lead {
    margin-top: 14px;
    font-size: 15px;
  }

  .club-tariffs__grid {
    gap: 14px;
    padding-top: 18px;
  }

  .club-tariffs__card {
    gap: 14px;
    padding: 24px 18px 18px;
    border-radius: 22px;
  }

  .club-tariffs__card--featured {
    transform: scale(1.045);
  }

  .club-tariffs__period {
    font-size: 28px;
  }

  .club-tariffs__subtitle {
    font-size: 13px;
  }

  .club-tariffs__price {
    font-size: 42px;
  }

  .club-tariffs__price-meta span,
  .club-tariffs__price-meta small {
    font-size: 13px;
  }

  .club-tariffs__feature {
    font-size: 12.5px;
    gap: 9px;
    grid-template-columns: 17px minmax(0, 1fr);
  }

  .club-tariffs__check,
  .club-tariffs__check svg {
    width: 17px;
    height: 17px;
  }

  .club-tariffs__cta {
    min-height: 48px;
    font-size: 13px;
  }

  .club-tariffs__bonus {
    grid-template-columns: 48px minmax(0, 1fr);
    gap: 14px;
    margin-top: 20px;
    padding: 18px 22px;
    border-radius: 18px;
  }

  .club-tariffs__bonus-icon {
    width: 48px;
    height: 48px;
  }

  .club-tariffs__bonus p {
    font-size: 15px;
  }

  .club-tariffs__trust {
    margin-top: 18px;
  }

  .club-tariffs__trust-item p {
    font-size: 12px;
  }
}

/* Narrow phones: keep a swipeable row so all three stay side-by-side */
@media (max-width: 719px) {
  .club-tariffs__grid {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 10px;
    padding: 14px 4px 8px;
    margin-inline: -4px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .club-tariffs__grid::-webkit-scrollbar {
    display: none;
  }

  .club-tariffs__card {
    flex: 0 0 min(78vw, 260px);
    scroll-snap-align: center;
  }

  .club-tariffs__card--featured {
    transform: none;
    box-shadow:
      0 0 0 1px rgba(47, 107, 255, 0.28),
      0 14px 28px rgba(26, 86, 255, 0.22);
  }
}

@media (prefers-reduced-motion: reduce) {
  .club-tariffs__cta,
  .club-tariffs__card--featured {
    transition: none;
    transform: none;
  }
}
`;
