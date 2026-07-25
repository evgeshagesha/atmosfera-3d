export const HERO_V2_CSS = `
#egmain-hero,
#egmain-hero *,
#egmain-hero *::before,
#egmain-hero *::after {
  box-sizing: border-box;
}
#egmain-hero {
  width: 100%;
  padding: 0;
  /* Reference: pure black canvas */
  background: #000;
  color: #fff;
  font-family: var(--font-body, Manrope, sans-serif);
}
#egmain-hero a {
  color: inherit !important;
  text-decoration: none !important;
}
.egmain-frame {
  position: relative;
  width: min(1440px, 100%);
  min-height: min(760px, 88vh);
  margin: 0 auto;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background: #000;
  isolation: isolate;
  opacity: 0;
  transform: translateY(18px);
  animation: egHeroIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
.egmain-portrait {
  position: absolute;
  /* Reference: photo locked to the right */
  inset: 0 -2% 0 42%;
  z-index: 0;
}
.egmain-portrait img {
  object-fit: contain;
  object-position: right center;
  filter: none;
}
.egmain-image-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  /* No gray wash — only a whisper of left shade so white text stays readable */
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.35) 0%,
    transparent 38%
  );
}
.egmain-container {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: min(760px, 88vh);
  padding: clamp(46px, 6vw, 80px) clamp(28px, 4vw, 58px);
}
.egmain-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: min(680px, 58%);
  text-align: left;
}
.egmain-identity {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  margin-bottom: 20px;
  padding: 0;
  border: 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.45;
  text-transform: uppercase;
  text-shadow: 0 6px 24px rgba(0, 0, 0, 0.55);
}
.egmain-identity strong {
  margin-bottom: 3px;
  color: #fff;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.045em;
}
#egmain-hero .egmain-identity a {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 32px;
  margin-top: 8px;
  padding: 7px 13px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.88) !important;
  background: rgba(255, 255, 255, 0.06);
  font-size: 9px;
  letter-spacing: 0.09em;
  transition: background 0.2s ease, color 0.2s ease;
}
#egmain-hero .egmain-identity a:hover {
  background: #fff;
  color: #090b0e !important;
}
.egmain-title {
  max-width: none;
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(50px, 5.2vw, 78px);
  font-weight: 700;
  line-height: 0.96;
  letter-spacing: -0.025em;
  text-transform: uppercase;
  text-wrap: balance;
  color: #fff;
  text-shadow: 0 8px 42px rgba(0, 0, 0, 0.72);
}
.egmain-title span {
  display: block;
  white-space: nowrap;
}
.egmain-lead {
  max-width: 600px;
  margin: 18px 0 0;
  color: rgba(255, 255, 255, 0.86);
  font-size: clamp(14px, 1.25vw, 17px);
  font-weight: 500;
  line-height: 1.45;
}
.egmain-subtitle {
  max-width: 570px;
  margin: 12px 0 0;
  color: rgba(255, 255, 255, 0.76);
  font-size: clamp(12px, 1vw, 14px);
  font-weight: 400;
  line-height: 1.52;
}
.egmain-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}
.egmain-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 11px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.72);
  background: rgba(12, 15, 19, 0.48);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
}
.egmain-tag::before {
  content: "";
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #fff;
}
.egmain-cta-wrap {
  position: relative;
  width: 100%;
  margin-top: 18px;
  padding-top: 27px;
}
.egmain-start-here {
  position: absolute;
  top: 0;
  left: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-shadow: 0 0 18px rgba(255, 255, 255, 0.24);
}
.egmain-start-here::before {
  content: "";
  width: 18px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.75));
}
.egmain-start-here svg {
  width: 38px;
  height: 24px;
  overflow: visible;
  fill: none;
  stroke: rgba(255, 255, 255, 0.82);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 0 7px rgba(255, 255, 255, 0.25));
}
.egmain-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  margin-top: 0;
}
.egmain-btn,
#egmain-hero a.egmain-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  min-width: min(270px, 100%) !important;
  min-height: 44px !important;
  padding: 11px 20px !important;
  border: 1px solid rgba(255, 255, 255, 0.22) !important;
  border-radius: 999px !important;
  background: rgba(8, 10, 13, 0.7) !important;
  color: #fff !important;
  font-size: 10px !important;
  font-weight: 800 !important;
  line-height: 1.3 !important;
  letter-spacing: 0.12em !important;
  text-align: center !important;
  text-transform: uppercase !important;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.egmain-pillars {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}
.egmain-pillar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 92px;
  padding: 12px 10px;
  border: 1px solid rgba(218, 224, 232, 0.2);
  border-radius: 14px;
  background:
    radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.06), transparent 48%),
    linear-gradient(145deg, #161616, #0a0a0a);
  backdrop-filter: blur(10px);
}
.egmain-pillar svg {
  width: 40px;
  height: 40px;
  fill: none;
  stroke: rgba(255, 255, 255, 0.78);
  stroke-width: 1.1;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.egmain-pillar strong {
  color: #fff;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}
.egmain-btn-primary,
#egmain-hero a.egmain-btn-primary {
  border-color: #fff !important;
  background: #fff !important;
  color: #090b0e !important;
}
.egmain-btn:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.5) !important;
}
.egmain-btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}
.egmain-btn-arrow {
  font-size: 14px;
}
@keyframes egHeroIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 760px) {
  #egmain-hero {
    padding: 0;
  }
  .egmain-frame {
    min-height: 1030px;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
  }
  .egmain-portrait {
    /* Reference mobile: sharp portrait on the right, upper half */
    inset: 0 -6% 40% 32%;
    -webkit-mask-image: none;
    mask-image: none;
  }
  .egmain-portrait img {
    object-fit: cover;
    object-position: 72% 12%;
    filter: none;
  }
  .egmain-image-overlay {
    background: none;
  }
  .egmain-cta-wrap {
    padding-top: 30px;
  }
  .egmain-start-here {
    left: 8px;
  }
  .egmain-container {
    align-items: stretch;
    min-height: 1030px;
    padding: 28px 20px 26px;
  }
  .egmain-content {
    width: 100%;
    min-height: 100%;
    justify-content: flex-start;
  }
  .egmain-identity {
    margin: 8px 0 0;
    padding: 0;
    font-size: 11.5px;
    gap: 5px;
  }
  .egmain-identity strong {
    font-size: 22px;
    letter-spacing: 0.035em;
  }
  #egmain-hero .egmain-identity a {
    min-height: 34px;
    margin-top: 10px;
    padding: 8px 14px;
    font-size: 9.5px;
  }
  .egmain-title {
    max-width: 100%;
    margin-top: auto;
    padding-top: 28px;
    font-size: clamp(48px, 14vw, 64px);
    line-height: 0.98;
  }
  .egmain-title span {
    white-space: normal;
  }
  .egmain-title span:first-child {
    max-width: 6.5ch;
  }
  .egmain-title span:last-child {
    max-width: 8.5ch;
  }
  .egmain-lead {
    max-width: 31ch;
    margin-top: 14px;
    font-size: 13px;
  }
  .egmain-subtitle {
    max-width: 38ch;
    margin-top: 10px;
    font-size: 11.5px;
    line-height: 1.5;
  }
  .egmain-tags {
    gap: 6px;
    margin-top: 16px;
  }
  .egmain-tag {
    padding: 6px 8px;
    font-size: 8px;
  }
  .egmain-cta-row {
    flex-direction: column;
    margin-top: 18px;
  }
  #egmain-hero a.egmain-btn {
    width: 100% !important;
    min-height: 44px !important;
    padding: 10px 14px !important;
    font-size: 9px !important;
  }
  .egmain-pillars {
    gap: 6px;
    margin-top: 16px;
  }
  .egmain-pillar {
    min-height: 106px;
    padding: 10px 6px;
    text-align: center;
  }
  .egmain-pillar svg {
    width: 32px;
    height: 32px;
    margin: 0 auto 2px;
  }
  .egmain-pillar strong {
    font-size: 9px;
  }
}
@media (max-width: 380px) {
  .egmain-frame,
  .egmain-container {
    min-height: 1010px;
  }
  .egmain-portrait {
    inset: 0 -8% 42% 28%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .egmain-frame {
    opacity: 1;
    transform: none;
    animation: none;
  }
  .egmain-btn {
    transition: none !important;
  }
}
`;
