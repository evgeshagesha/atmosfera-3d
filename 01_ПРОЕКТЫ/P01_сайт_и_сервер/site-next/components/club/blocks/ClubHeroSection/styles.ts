/** Club hero — colors from main site globals (--eg-*). */
export const CLUB_HERO_CSS = `
.club-hero {
  --ch-bg: #000000;
  --ch-surface: #0d1016;
  --ch-text: #fff;
  --ch-dim: rgba(210, 218, 230, 0.78);
  --ch-line: rgba(255, 255, 255, 0.12);
  --ch-accent: #2f6bff;
  --ch-accent-strong: #1a56ff;
  position: relative;
  isolation: isolate;
  background: var(--ch-bg);
  color: var(--ch-text);
  font-family: var(--font-body, Manrope, system-ui, sans-serif);
  overflow: clip;
}

.club-hero__copy > *,
.club-hero__visual,
.club-hero__bridge,
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
.club-hero.is-ready .club-hero__bridge,
.club-hero.is-ready .club-hero__features {
  opacity: 1;
  transform: none;
}

.club-hero.is-ready .club-hero__copy > *:nth-child(1) { transition-delay: 0.05s; }
.club-hero.is-ready .club-hero__copy > *:nth-child(2) { transition-delay: 0.12s; }
.club-hero.is-ready .club-hero__copy > *:nth-child(3) { transition-delay: 0.18s; }
.club-hero.is-ready .club-hero__copy > *:nth-child(4) { transition-delay: 0.24s; }
.club-hero.is-ready .club-hero__visual { transition-delay: 0.18s; }
.club-hero.is-ready .club-hero__bridge { transition-delay: 0.36s; }
.club-hero.is-ready .club-hero__features { transition-delay: 0.48s; }

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
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
  opacity: 0.92;
  transition: opacity 0.2s ease;
}

.club-hero__nav a:hover {
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  opacity: 1;
}

.club-hero__header-actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.club-hero__site-link {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  background: transparent;
  color: rgba(255, 255, 255, 0.88) !important;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.88) !important;
  text-decoration: none;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.club-hero__site-link:hover,
.club-hero__site-link:focus-visible {
  border-color: rgba(47, 107, 255, 0.55);
  background: rgba(47, 107, 255, 0.12);
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
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
  padding: 8px 28px 36px;
  min-height: calc(100svh - 72px);
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(300px, 1.12fr);
  grid-template-rows: auto auto auto;
  gap: 18px 20px;
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
  grid-row: 1 / -1;
  min-height: 0;
  height: 100%;
  max-height: min(620px, 78vh);
  align-self: stretch;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: -6px;
  overflow: hidden;
  pointer-events: none;
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
  overflow: hidden;
  background:
    radial-gradient(ellipse 58% 48% at 54% 42%, rgba(40, 92, 180, 0.28), transparent 74%),
    radial-gradient(ellipse 36% 30% at 48% 28%, rgba(255, 255, 255, 0.06), transparent 70%);
}

.club-hero__photo--cut::before {
  content: "";
  position: absolute;
  left: 10%;
  right: 10%;
  top: 18%;
  bottom: 28%;
  background: radial-gradient(ellipse at 50% 55%, rgba(24, 48, 88, 0.58), transparent 74%);
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
  object-position: 56% 4% !important;
  transform: scale(1.42);
  transform-origin: center top;
  filter: contrast(1.06) saturate(1.04) brightness(1.05);
  -webkit-mask-image:
    linear-gradient(180deg, #000 0%, #000 68%, rgba(0, 0, 0, 0.55) 82%, transparent 94%),
    linear-gradient(90deg, transparent 0%, #000 3%, #000 97%, transparent 100%);
  mask-image:
    linear-gradient(180deg, #000 0%, #000 68%, rgba(0, 0, 0, 0.55) 82%, transparent 94%),
    linear-gradient(90deg, transparent 0%, #000 3%, #000 97%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
  z-index: 1;
  animation: clubHeroPhotoFloat 7.5s ease-in-out infinite;
}

@keyframes clubHeroPhotoFloat {
  0%, 100% { transform: scale(1.42) translateY(0); }
  50% { transform: scale(1.42) translateY(-8px); }
}

.club-hero__photo::after {
  content: none;
}

.club-hero__photo--cut::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, var(--ch-bg) 0%, transparent 8%, transparent 92%, var(--ch-bg) 100%),
    linear-gradient(
      180deg,
      transparent 62%,
      rgba(0, 0, 0, 0.22) 78%,
      rgba(0, 0, 0, 0.62) 90%,
      var(--ch-bg) 100%
    );
  pointer-events: none;
  z-index: 2;
}

.club-hero__bridge {
  grid-column: 1 / -1;
  grid-row: 2;
  position: relative;
  z-index: 3;
  max-width: 62ch;
  margin-top: 8px;
  padding-top: 4px;
}

.club-hero__bridge-lead {
  margin: 0;
  color: #fff;
  font-size: clamp(16px, 1.7vw, 20px);
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.01em;
}

.club-hero__bridge-sub {
  margin: 10px 0 0;
  max-width: 54ch;
  color: var(--ch-dim);
  font-size: clamp(13px, 1.25vw, 15px);
  line-height: 1.5;
}

.club-hero__features {
  grid-column: 1 / -1;
  grid-row: 3;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
  padding: 0;
  border-top: 0;
  position: relative;
  z-index: 3;
  max-width: none;
  align-self: end;
}

@media (min-width: 981px) {
  .club-hero__features {
    gap: 14px;
    margin-top: 28px;
  }

  .club-hero__bridge {
    margin-top: 12px;
  }
}

.club-hero__brand {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(34px, 4.8vw, 58px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  white-space: nowrap;
}

.club-hero__sub {
  margin: 14px 0 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(13px, 1.35vw, 16px);
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
}

.club-hero__motto {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  margin: 16px 0 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(14px, 1.4vw, 18px);
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
}

.club-hero__motto i {
  color: var(--ch-accent);
  font-style: normal;
  font-weight: 700;
  opacity: 0.95;
}

.club-hero__motto span {
  color: #fff;
}

.club-hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 22px;
}

.club-hero__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 10px 20px;
  border-radius: 14px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.club-hero__btn:hover {
  transform: translateY(-2px);
}

.club-hero__btn:focus-visible {
  outline: 3px solid rgba(105, 151, 255, 0.65);
  outline-offset: 3px;
}

.club-hero__btn--primary {
  background: linear-gradient(135deg, #1a56ff, #2f6bff);
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  border: 1px solid transparent;
  box-shadow: 0 10px 28px rgba(26, 86, 255, 0.28);
}

.club-hero__btn--primary:hover {
  background: linear-gradient(135deg, #2a63ff, #3a76ff);
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
}

.club-hero__btn--ghost {
  background: transparent;
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  border: 1px solid rgba(255, 255, 255, 0.28);
}

.club-hero__btn--ghost:hover {
  border-color: rgba(47, 107, 255, 0.55);
  background: rgba(47, 107, 255, 0.12);
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
}

.club-hero__feature {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  min-height: 100%;
  padding: 14px 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 55%),
    #0d1016;
}

.club-hero__feature-icon {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(47, 107, 255, 0.4);
  border-radius: 12px;
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 50% 40%, rgba(126, 176, 255, 0.22), transparent 70%),
    rgba(47, 107, 255, 0.12);
}

.club-hero__feature-icon svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: #7eb0ff;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-hero__feature strong {
  display: block;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.2;
}

.club-hero__feature p {
  margin: 6px 0 0;
  color: var(--ch-dim);
  font-size: 12.5px;
  line-height: 1.4;
}

.club-hero__scroll {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  width: 28px;
  height: 28px;
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  text-decoration: none;
  display: grid;
  place-items: center;
  animation: clubHeroScroll 1.8s ease-in-out infinite;
}

.club-hero__scroll svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: #fff !important;
  stroke-width: 1.6;
}

@keyframes clubHeroScroll {
  0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.55; }
  50% { transform: translateX(-50%) translateY(5px); opacity: 1; }
}

.club-hero__mobile-panel {
  display: none;
}

@media (max-width: 1100px) {
  .club-hero__nav {
    gap: 6px 14px;
  }

  .club-hero__nav a {
    font-size: 12px;
  }

  .club-hero__header-inner {
    gap: 12px;
    padding: 12px 18px;
  }
}

@media (max-width: 900px) {
  .club-hero__nav {
    display: flex;
    flex: 1;
    justify-content: center;
    flex-wrap: nowrap;
    gap: 4px 10px;
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .club-hero__nav::-webkit-scrollbar {
    display: none;
  }

  .club-hero__nav a {
    font-size: 11px;
    white-space: nowrap;
  }

  .club-hero__nav-secondary,
  .club-hero__header-cta {
    display: none;
  }

  .club-hero__header-actions {
    display: inline-flex;
  }

  .club-hero__site-link {
    min-height: 30px;
    padding: 0 10px;
    font-size: 10px;
  }

  .club-hero__menu-btn {
    display: inline-block;
    flex-shrink: 0;
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
    color: #fff !important;
    -webkit-text-fill-color: #fff !important;
    text-decoration: none;
    font-size: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .club-hero__mobile-panel a:last-child {
    margin-top: 10px;
    border: 1px solid rgba(47, 107, 255, 0.55);
    border-radius: 14px;
    text-align: center;
    padding: 12px 16px;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #1a56ff, #2f6bff);
  }
}

@media (max-width: 980px) {
  .club-hero__stage {
    grid-template-columns: minmax(0, 0.92fr) minmax(168px, 1.12fr);
    grid-template-rows: auto auto auto;
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
    min-height: 0;
    height: auto;
    max-height: none;
    margin: -8px -4px 0 0;
    align-self: stretch;
    justify-content: flex-end;
    overflow: hidden;
  }

  .club-hero__photo,
  .club-hero__photo--cut {
    inset: 0;
  }

  .club-hero__photo--cut {
    background:
      radial-gradient(ellipse 72% 48% at 55% 28%, rgba(40, 92, 180, 0.28), transparent 72%),
      radial-gradient(ellipse 40% 30% at 50% 18%, rgba(255, 255, 255, 0.05), transparent 70%);
  }

  .club-hero__photo--cut img,
  .club-hero__photo-img {
    object-fit: contain !important;
    object-position: center 0% !important;
    transform: scale(1.55);
    transform-origin: center top;
    animation: none;
    -webkit-mask-image:
      linear-gradient(180deg, #000 0%, #000 66%, rgba(0, 0, 0, 0.5) 80%, transparent 92%),
      linear-gradient(90deg, transparent 0%, #000 5%, #000 95%, transparent 100%) !important;
    mask-image:
      linear-gradient(180deg, #000 0%, #000 66%, rgba(0, 0, 0, 0.5) 80%, transparent 92%),
      linear-gradient(90deg, transparent 0%, #000 5%, #000 95%, transparent 100%) !important;
  }

  .club-hero__photo--cut::after {
    background: linear-gradient(
      180deg,
      transparent 58%,
      rgba(0, 0, 0, 0.28) 78%,
      rgba(0, 0, 0, 0.7) 90%,
      var(--ch-bg) 100%
    );
  }

  .club-hero__brand {
    font-size: clamp(22px, 6.2vw, 30px);
    white-space: nowrap;
  }

  .club-hero__sub {
    margin-top: 8px;
    letter-spacing: 0.1em;
    font-size: 10px;
  }

  .club-hero__motto {
    margin-top: 10px;
    font-size: 11px;
    gap: 6px;
    letter-spacing: 0.05em;
  }

  .club-hero__actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-top: 14px;
  }

  .club-hero__btn {
    width: auto;
    min-width: 0;
    min-height: 38px;
    height: auto;
    padding: 0 16px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1;
    border-radius: 12px;
    box-shadow: none;
  }

  .club-hero__btn--primary {
    box-shadow: 0 8px 18px rgba(26, 86, 255, 0.28);
  }

  .club-hero__features {
    grid-column: 1 / -1;
    grid-row: 3;
    order: 0;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    margin-top: 16px;
    max-width: none;
    padding-top: 0;
  }

  .club-hero__bridge {
    grid-column: 1 / -1;
    grid-row: 2;
    margin-top: 10px;
    max-width: none;
  }

  .club-hero__bridge-lead {
    font-size: 14px;
  }

  .club-hero__bridge-sub {
    font-size: 12px;
    margin-top: 8px;
  }

  .club-hero__feature {
    grid-template-columns: 1fr;
    justify-items: start;
    gap: 8px;
    padding: 10px 10px 12px;
    border-radius: 14px;
  }

  .club-hero__feature-icon {
    width: 32px;
    height: 32px;
    border-radius: 10px;
  }

  .club-hero__feature-icon svg {
    width: 15px;
    height: 15px;
  }

  .club-hero__feature strong {
    font-size: 10px;
    letter-spacing: 0.03em;
  }

  .club-hero__feature p {
    font-size: 11px;
    line-height: 1.35;
  }
}

@media (max-width: 560px) {
  .club-hero__stage {
    grid-template-columns: minmax(0, 0.9fr) minmax(150px, 1.15fr);
    gap: 8px 4px;
  }

  .club-hero__visual {
    margin-right: -6px;
  }

  .club-hero__photo--cut img,
  .club-hero__photo-img {
    transform: scale(1.62);
  }

  .club-hero__features {
    margin-top: 14px;
    gap: 6px;
  }

  .club-hero__bridge {
    margin-top: 8px;
  }

  .club-hero__motto {
    font-size: 10px;
    gap: 5px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .club-hero__scroll,
  .club-hero__btn,
  .club-hero__header-cta,
  .club-hero__photo-img,
  .club-hero__copy > *,
  .club-hero__visual,
  .club-hero__bridge,
  .club-hero__features {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
`;
