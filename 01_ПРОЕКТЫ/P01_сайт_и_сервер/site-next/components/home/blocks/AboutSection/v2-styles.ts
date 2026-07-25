export const ABOUT_V2_CSS = `
.eg-about,
.eg-about *,
.eg-about *::before,
.eg-about *::after {
  box-sizing: border-box;
}
.eg-about {
  padding: clamp(58px, 8vw, 112px) max(16px, env(safe-area-inset-right, 0px))
    clamp(64px, 8vw, 112px) max(16px, env(safe-area-inset-left, 0px));
  background:
    var(--eg-section-wash, radial-gradient(ellipse 80% 55% at 50% 0%, rgba(58, 66, 78, 0.14), transparent 58%)),
    var(--eg-bg, #0c0e12);
  color: #f3f1ec;
  font-family: var(--font-body, Manrope, sans-serif);
}
.eg-about__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(420px, 0.94fr);
  grid-template-areas:
    "copy photo"
    "features photo"
    "button photo";
  align-items: start;
  gap: 18px clamp(38px, 5vw, 74px);
  width: min(1180px, 100%);
  margin: 0 auto;
}
.eg-about__copy {
  grid-area: copy;
  align-self: start;
}
.eg-about__eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 18px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.eg-about__eyebrow::before {
  content: "";
  width: 28px;
  height: 1px;
  background: rgba(255, 255, 255, 0.48);
}
.eg-about h2 {
  max-width: 12ch;
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(48px, 5vw, 72px);
  font-weight: 700;
  line-height: 0.96;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}
.eg-about__text {
  max-width: 610px;
  margin: 20px 0 0;
  color: rgba(243, 241, 236, 0.78);
  font-size: clamp(14px, 1.15vw, 16px);
  line-height: 1.55;
}
.eg-about__photo {
  position: relative;
  grid-area: photo;
  width: 100%;
  min-height: 760px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 28px;
  background: #10141a;
  box-shadow: 0 36px 80px -44px rgba(0, 0, 0, 0.95);
}
.eg-about__photo img {
  object-fit: cover;
  object-position: 50% 24%;
  filter: saturate(0.82) contrast(1.04) brightness(0.86);
}
.eg-about__features {
  display: grid;
  grid-area: features;
  gap: 10px;
}
.eg-about__feature {
  display: grid;
  grid-template-columns: 58px 1fr;
  align-items: center;
  gap: 16px;
  min-height: 92px;
  padding: 15px 18px;
  border: 1px solid rgba(220, 225, 232, 0.18);
  border-radius: 16px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.015));
}
.eg-about__feature-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.065);
}
.eg-about__feature-icon svg {
  width: 30px;
  height: 30px;
  fill: none;
  stroke: rgba(255, 255, 255, 0.86);
  stroke-width: 1.35;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.eg-about__feature h3 {
  margin: 0;
  color: #f3f1ec;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(18px, 1.65vw, 24px);
  font-weight: 600;
  letter-spacing: 0.015em;
  line-height: 1.1;
  text-transform: uppercase;
}
.eg-about__feature p {
  margin: 6px 0 0;
  color: rgba(243, 241, 236, 0.62);
  font-size: 12px;
  line-height: 1.45;
}
.eg-about__photo::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 62%, rgba(5, 7, 9, 0.28));
  pointer-events: none;
}
.eg-about__wiki {
  grid-area: button;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  justify-self: start;
  gap: 12px;
  min-width: 190px;
  min-height: 46px;
  padding: 11px 24px;
  border: 1px solid rgba(224, 228, 234, 0.48);
  border-radius: 999px;
  color: #f3f1ec !important;
  background: transparent;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none !important;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.eg-about__wiki:hover {
  border-color: #fff;
  background: #fff;
  color: #090b0e !important;
}
.eg-about__wiki:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 4px;
}
@media (max-width: 760px) {
  .eg-about {
    padding-top: 58px;
  }
  .eg-about__inner {
    grid-template-columns: minmax(0, 1.12fr) minmax(128px, 0.88fr);
    grid-template-areas:
      "copy photo"
      "features features"
      "button button";
    gap: 20px 14px;
  }
  .eg-about h2 {
    max-width: 8ch;
    font-size: clamp(34px, 10.5vw, 48px);
    line-height: 1.02;
  }
  .eg-about__text {
    margin-top: 14px;
    font-size: 11.5px;
    line-height: 1.5;
  }
  .eg-about__eyebrow {
    margin-bottom: 13px;
    font-size: 8px;
  }
  .eg-about__photo {
    min-height: 330px;
    height: 100%;
    border-radius: 18px;
  }
  .eg-about__photo img {
    object-position: 50% 22%;
  }
  .eg-about__features {
    margin-top: 6px;
  }
  .eg-about__feature {
    grid-template-columns: 52px 1fr;
    min-height: 96px;
    padding: 14px;
  }
  .eg-about__feature-icon {
    width: 48px;
    height: 48px;
  }
  .eg-about__feature h3 {
    font-size: 19px;
  }
  .eg-about__feature p {
    font-size: 11px;
  }
  .eg-about__wiki {
    justify-self: stretch;
    width: 100%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .eg-about__wiki {
    transition: none;
  }
}
`;
