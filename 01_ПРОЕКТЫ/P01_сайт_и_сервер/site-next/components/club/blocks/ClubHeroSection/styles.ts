/** Club hero — colors from main site globals (--eg-*). */
export const CLUB_HERO_CSS = `
.club-hero {
  --ch-bg: var(--eg-bg, #0c0e12);
  --ch-surface: var(--eg-surface, #14181f);
  --ch-text: var(--eg-text, #fff);
  --ch-dim: var(--eg-text-dim, rgba(255, 255, 255, 0.72));
  --ch-line: var(--eg-line, rgba(255, 255, 255, 0.14));
  --ch-btn: var(--eg-btn-bg, #fff);
  --ch-btn-text: var(--eg-btn-text, #0a0c0f);
  position: relative;
  isolation: isolate;
  background: var(--ch-bg);
  color: var(--ch-text);
  font-family: var(--font-body, Manrope, system-ui, sans-serif);
  overflow: clip;
}

.club-hero__copy > *,
.club-hero__visual,
.club-hero__features {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.club-hero__visual {
  transform: translateY(28px) scale(0.985);
  transition:
    opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.club-hero.is-ready .club-hero__copy > *,
.club-hero.is-ready .club-hero__visual,
.club-hero.is-ready .club-hero__features {
  opacity: 1;
  transform: none;
}

.club-hero.is-ready .club-hero__copy > *:nth-child(1) { transition-delay: 0.05s; }
.club-hero.is-ready .club-hero__copy > *:nth-child(2) { transition-delay: 0.12s; }
.club-hero.is-ready .club-hero__copy > *:nth-child(3) { transition-delay: 0.18s; }
.club-hero.is-ready .club-hero__copy > *:nth-child(4) { transition-delay: 0.24s; }
.club-hero.is-ready .club-hero__copy > *:nth-child(5) { transition-delay: 0.32s; }
.club-hero.is-ready .club-hero__visual { transition-delay: 0.18s; }
.club-hero.is-ready .club-hero__features { transition-delay: 0.42s; }

.club-hero__header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: color-mix(in srgb, var(--ch-bg) 88%, transparent);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.25s ease, background 0.25s ease;
}

.club-hero__header.is-scrolled {
  border-bottom-color: var(--ch-line);
  background: color-mix(in srgb, var(--ch-bg) 94%, transparent);
}

.club-hero__header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 14px 28px;
}

.club-hero__logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--ch-text);
  text-decoration: none;
  flex-shrink: 0;
}

.club-hero__logo img {
  width: 42px;
  height: auto;
  display: block;
}

.club-hero__logo span {
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  color: #fff !important;
}

.club-hero__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px 22px;
}

.club-hero__nav a {
  color: rgba(255, 255, 255, 0.78) !important;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: color 0.2s ease;
}

.club-hero__nav a:hover {
  color: #fff !important;
}

.club-hero__header-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  padding: 10px 18px 10px 18px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 999px;
  background: transparent;
  color: #fff !important;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.club-hero__header-cta:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: #fff;
  transform: translateY(-1px);
}

.club-hero__header-cta i {
  display: inline-grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  color: #0a0c0f;
  font-style: normal;
  font-size: 12px;
  line-height: 1;
}

.club-hero__menu-btn {
  display: none;
  width: 44px;
  height: 44px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
}

.club-hero__menu-btn span {
  display: block;
  width: 22px;
  height: 1.5px;
  margin: 5px auto;
  background: currentColor;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.club-hero__menu-btn.is-open span:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}
.club-hero__menu-btn.is-open span:nth-child(2) {
  opacity: 0;
}
.club-hero__menu-btn.is-open span:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

.club-hero__stage {
  position: relative;
  max-width: 1240px;
  margin: 0 auto;
  padding: 8px 28px 28px;
  min-height: calc(100svh - 72px);
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(300px, 1.12fr);
  grid-template-rows: auto auto;
  gap: 10px 20px;
  align-items: start;
  overflow: hidden;
}

.club-hero__copy {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 18px 0 0;
  max-width: 520px;
  grid-column: 1;
  grid-row: 1;
}

.club-hero__visual {
  position: relative;
  z-index: 1;
  grid-column: 2;
  grid-row: 1;
  min-height: 520px;
  height: clamp(480px, 68vh, 640px);
  align-self: start;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: -6px;
}

.club-hero__photo {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.club-hero__photo--cut {
  display: block;
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 58% 52% at 54% 56%, rgba(40, 92, 180, 0.28), transparent 74%),
    radial-gradient(ellipse 36% 30% at 48% 38%, rgba(255, 255, 255, 0.06), transparent 70%);
}

.club-hero__photo--cut::before {
  content: "";
  position: absolute;
  left: 10%;
  right: 10%;
  top: 22%;
  bottom: 0;
  background: radial-gradient(ellipse at 50% 72%, rgba(24, 48, 88, 0.58), transparent 74%);
  filter: blur(34px);
  z-index: 0;
}

.club-hero__photo img,
.club-hero__photo-img {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  object-position: 62% top !important;
  transform: scale(1.08);
  transform-origin: center top;
  filter: contrast(1.08) saturate(1.06) brightness(1.04);
  -webkit-mask-image:
    linear-gradient(180deg, #000 0%, #000 92%, transparent 100%),
    linear-gradient(90deg, transparent 0%, #000 4%, #000 96%, transparent 100%);
  mask-image:
    linear-gradient(180deg, #000 0%, #000 92%, transparent 100%),
    linear-gradient(90deg, transparent 0%, #000 4%, #000 96%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  z-index: 1;
  animation: clubHeroPhotoFloat 7.5s ease-in-out infinite;
}

@keyframes clubHeroPhotoFloat {
  0%, 100% { transform: scale(1.08) translateY(0); }
  50% { transform: scale(1.08) translateY(-8px); }
}

.club-hero__photo::after {
  content: none;
}

.club-hero__photo--cut::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, var(--ch-bg) 0%, transparent 10%, transparent 90%, var(--ch-bg) 100%),
    linear-gradient(180deg, transparent 84%, rgba(12, 14, 18, 0.2) 95%, var(--ch-bg) 100%);
  pointer-events: none;
  z-index: 2;
}

.club-hero__features {
  grid-column: 1 / -1;
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px 24px;
  margin-top: 0;
  padding: 18px 0 8px;
  border-top: 1px solid var(--ch-line);
  position: relative;
  z-index: 3;
  max-width: none;
}

.club-hero__brand {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(36px, 5.4vw, 64px);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.club-hero__sub {
  margin: 12px 0 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(13px, 1.35vw, 16px);
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
}

.club-hero__motto {
  margin: 16px 0 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(15px, 1.55vw, 20px);
  font-weight: 650;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.club-hero__lead {
  margin: 12px 0 0;
  max-width: 38ch;
  color: var(--ch-dim);
  font-size: 14px;
  line-height: 1.5;
}

.club-hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
}

.club-hero__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  padding: 9px 16px;
  border-radius: 999px;
  text-decoration: none;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.club-hero__btn:hover {
  transform: translateY(-2px);
}

.club-hero__btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}

.club-hero__btn--primary {
  background: linear-gradient(180deg, #f4f6f9 0%, #d9dee6 100%);
  color: var(--ch-btn-text) !important;
  border: 1px solid rgba(236, 240, 246, 0.95);
  box-shadow:
    0 0 0 1px rgba(230, 236, 244, 0.16),
    0 6px 16px rgba(0, 0, 0, 0.22);
}

.club-hero__btn--ghost {
  background: transparent;
  color: #fff !important;
  border: 1px solid rgba(255, 255, 255, 0.42);
}

.club-hero__btn--ghost:hover {
  border-color: #fff;
  background: rgba(255, 255, 255, 0.06);
}

.club-hero__feature {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 14px;
  align-items: start;
}

.club-hero__feature-icon {
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 50%;
  display: grid;
  place-items: center;
}

.club-hero__feature-icon svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: rgba(255, 255, 255, 0.88);
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-hero__feature strong {
  display: block;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 14px;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.club-hero__feature p {
  margin: 6px 0 0;
  color: var(--ch-dim);
  font-size: 13px;
  line-height: 1.45;
}

.club-hero__scroll {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  width: 28px;
  height: 28px;
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  display: grid;
  place-items: center;
  animation: clubHeroScroll 1.8s ease-in-out infinite;
}

.club-hero__scroll svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
}

@keyframes clubHeroScroll {
  0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.55; }
  50% { transform: translateX(-50%) translateY(5px); opacity: 1; }
}

.club-hero__mobile-panel {
  display: none;
}

@media (max-width: 980px) {
  .club-hero__nav,
  .club-hero__header-cta {
    display: none;
  }

  .club-hero__menu-btn {
    display: inline-block;
  }

  .club-hero__logo span {
    display: none;
  }

  .club-hero__mobile-panel {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    padding: 12px 20px 20px;
    background: color-mix(in srgb, var(--ch-bg) 96%, transparent);
    border-bottom: 1px solid var(--ch-line);
    backdrop-filter: blur(16px);
  }

  .club-hero__mobile-panel a {
    display: block;
    padding: 12px 4px;
    color: rgba(255, 255, 255, 0.86);
    text-decoration: none;
    font-size: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .club-hero__mobile-panel a:last-child {
    margin-top: 10px;
    border: 1px solid rgba(255, 255, 255, 0.45);
    border-radius: 999px;
    text-align: center;
    padding: 12px 16px;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .club-hero__stage {
    grid-template-columns: minmax(0, 0.92fr) minmax(168px, 1.12fr);
    grid-template-rows: auto auto;
    min-height: auto;
    padding: 4px 14px 36px;
    gap: 6px 6px;
    align-items: start;
  }

  .club-hero__copy {
    grid-column: 1;
    grid-row: 1;
    order: 0;
    max-width: none;
    padding-top: 4px;
    z-index: 3;
  }

  .club-hero__visual {
    grid-column: 2;
    grid-row: 1;
    order: 0;
    position: relative;
    width: 100%;
    min-height: 300px;
    height: clamp(300px, 72vw, 400px);
    max-height: none;
    margin: -8px -4px 0 0;
    align-self: start;
    justify-content: flex-end;
  }

  .club-hero__photo,
  .club-hero__photo--cut {
    inset: 0;
  }

  .club-hero__photo--cut {
    background:
      radial-gradient(ellipse 72% 58% at 55% 36%, rgba(40, 92, 180, 0.28), transparent 72%),
      radial-gradient(ellipse 40% 30% at 50% 24%, rgba(255, 255, 255, 0.05), transparent 70%);
  }

  .club-hero__photo--cut img,
  .club-hero__photo-img {
    object-fit: contain !important;
    object-position: center top !important;
    transform: scale(1.22);
    transform-origin: center top;
    animation: none;
    -webkit-mask-image:
      linear-gradient(180deg, #000 0%, #000 88%, transparent 100%),
      linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%) !important;
    mask-image:
      linear-gradient(180deg, #000 0%, #000 88%, transparent 100%),
      linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%) !important;
  }

  .club-hero__photo--cut::after {
    background: linear-gradient(180deg, transparent 55%, rgba(12, 14, 18, 0.42) 86%, var(--ch-bg) 100%);
  }

  .club-hero__brand {
    font-size: clamp(26px, 7.4vw, 34px);
  }

  .club-hero__sub {
    margin-top: 8px;
    letter-spacing: 0.1em;
    font-size: 10px;
  }

  .club-hero__motto {
    margin-top: 10px;
    font-size: 12px;
  }

  .club-hero__lead {
    margin-top: 8px;
    font-size: 12.5px;
    line-height: 1.45;
    max-width: 26ch;
  }

  .club-hero__actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-top: 12px;
  }

  .club-hero__btn {
    width: auto;
    min-width: 0;
    min-height: 0;
    height: 34px;
    padding: 0 14px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1;
    box-shadow: none;
  }

  .club-hero__btn--primary {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .club-hero__features {
    grid-column: 1 / -1;
    grid-row: 2;
    order: 0;
    grid-template-columns: 1fr;
    gap: 14px;
    margin-top: 2px;
  }
}

@media (max-width: 560px) {
  .club-hero__stage {
    grid-template-columns: minmax(0, 0.9fr) minmax(150px, 1.15fr);
    gap: 4px 4px;
  }

  .club-hero__visual {
    min-height: 280px;
    height: clamp(280px, 78vw, 380px);
    margin-right: -6px;
  }

  .club-hero__photo--cut img,
  .club-hero__photo-img {
    transform: scale(1.28);
  }

  .club-hero__lead {
    max-width: 22ch;
  }
}

@media (prefers-reduced-motion: reduce) {
  .club-hero__scroll,
  .club-hero__btn,
  .club-hero__header-cta,
  .club-hero__photo-img,
  .club-hero__copy > *,
  .club-hero__visual,
  .club-hero__features {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
`;
