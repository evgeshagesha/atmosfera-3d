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
  min-height: min(720px, 86vh);
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
  /* Slight lift so silhouette/arms stay readable on black */
  filter: brightness(1.08) contrast(1.02);
}
.egmain-image-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  /* Soft left shade only — keep portrait body visible */
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.22) 0%,
    transparent 42%
  );
}
.egmain-container {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-height: min(720px, 86vh);
  padding: clamp(28px, 4.5vw, 56px) clamp(28px, 4vw, 58px) clamp(36px, 5vw, 64px);
}
.egmain-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: min(720px, 62%);
  text-align: left;
}
.egmain-identity {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  margin-bottom: 14px;
  padding: 0;
  border: 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.4;
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
.egmain-title-nowrap {
  white-space: nowrap;
}
.egmain-lead {
  max-width: 640px;
  margin: 14px 0 0;
  color: rgba(255, 255, 255, 0.94);
  font-size: clamp(15px, 1.35vw, 18px);
  font-weight: 600;
  line-height: 1.42;
  letter-spacing: 0.01em;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.55);
}
.egmain-subtitle {
  max-width: 620px;
  margin: 12px 0 0;
  color: rgba(255, 255, 255, 0.88);
  font-size: clamp(13px, 1.05vw, 15px);
  font-weight: 500;
  line-height: 1.55;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.5);
}
.egmain-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
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
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  width: 100%;
  max-width: min(720px, 100%);
  margin-top: 16px;
  padding-top: 0;
}
.egmain-cta-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  gap: 12px;
  width: 100%;
  margin-top: 0;
}
.egmain-btn,
#egmain-hero a.egmain-btn {
  display: inline-flex !important;
  flex: 1 1 0 !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  min-width: 0 !important;
  width: auto !important;
  min-height: 48px !important;
  padding: 10px 14px !important;
  border: 1px solid rgba(210, 218, 228, 0.42) !important;
  border-radius: 999px !important;
  background: rgba(18, 20, 24, 0.82) !important;
  color: #fff !important;
  font-size: 10px !important;
  font-weight: 800 !important;
  line-height: 1.2 !important;
  letter-spacing: 0.06em !important;
  text-align: center !important;
  text-transform: uppercase !important;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.egmain-btn-stack,
#egmain-hero a.egmain-btn-stack {
  min-height: 54px !important;
  padding: 9px 14px !important;
  white-space: normal !important;
}
.egmain-btn-copy {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  min-width: 0;
  flex: 1 1 auto;
  max-width: 100%;
}
.egmain-btn-label {
  display: block;
  max-width: 100%;
  font-size: inherit;
  font-weight: inherit;
  line-height: 1.2;
  letter-spacing: inherit;
  text-wrap: balance;
}
.egmain-btn-sub {
  display: block;
  color: rgba(9, 11, 14, 0.72);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.15;
  text-transform: none;
}
#egmain-hero a.egmain-btn:not(.egmain-btn-primary) .egmain-btn-sub {
  color: rgba(236, 242, 248, 0.72);
}
.egmain-btn-gift-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
  padding: 3px 9px;
  border: 1px solid rgba(190, 210, 225, 0.28);
  border-radius: 999px;
  background: rgba(210, 222, 236, 0.12);
  color: rgba(230, 238, 246, 0.92);
  font-size: 8.5px;
  font-weight: 800;
  letter-spacing: 0.12em;
  line-height: 1;
  text-transform: uppercase;
}
.egmain-btn-neon,
#egmain-hero a.egmain-btn-neon {
  border-color: rgba(220, 228, 238, 0.55) !important;
  box-shadow:
    0 0 0 1px rgba(200, 210, 222, 0.22),
    0 0 16px rgba(186, 198, 214, 0.38),
    0 0 36px rgba(160, 174, 194, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  animation: egNeonPulse 2.8s ease-in-out infinite;
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
  border-color: rgba(236, 240, 246, 0.95) !important;
  background: linear-gradient(180deg, #f4f6f9 0%, #d9dee6 100%) !important;
  color: #090b0e !important;
}
.egmain-btn-primary.egmain-btn-neon,
#egmain-hero a.egmain-btn-primary.egmain-btn-neon {
  box-shadow:
    0 0 0 1px rgba(230, 236, 244, 0.35),
    0 0 20px rgba(200, 210, 224, 0.55),
    0 0 42px rgba(170, 184, 204, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.75);
}
.egmain-btn:hover {
  transform: translateY(-2px);
  border-color: rgba(230, 236, 244, 0.75) !important;
  box-shadow:
    0 0 0 1px rgba(220, 228, 238, 0.4),
    0 0 24px rgba(196, 208, 224, 0.55),
    0 0 48px rgba(170, 184, 204, 0.32);
}
@keyframes egNeonPulse {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.06);
  }
}
.egmain-btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}
.egmain-btn-arrow {
  flex-shrink: 0;
  font-size: 13px;
  line-height: 1;
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
    min-height: auto;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
  }
  .egmain-portrait {
    /* More of the figure visible; soft fade only at the very bottom */
    inset: 0 -4% 42% 28%;
    opacity: 1;
    -webkit-mask-image: linear-gradient(180deg, #000 68%, transparent 100%);
    mask-image: linear-gradient(180deg, #000 68%, transparent 100%);
  }
  .egmain-portrait img {
    object-fit: cover;
    object-position: 70% 8%;
    filter: brightness(1.12) contrast(1.03);
  }
  .egmain-image-overlay {
    /* Keep text readable without crushing arms/torso */
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.05) 0%,
      rgba(0, 0, 0, 0.18) 48%,
      rgba(0, 0, 0, 0.72) 82%,
      #000 100%
    );
  }
  .egmain-cta-wrap {
    gap: 9px;
    max-width: 100%;
    margin-top: 14px;
    padding-top: 0;
  }
  .egmain-container {
    align-items: stretch;
    min-height: auto;
    padding: 16px 18px 22px;
  }
  .egmain-content {
    width: 100%;
    min-height: auto;
    justify-content: flex-start;
  }
  .egmain-identity {
    margin: 0;
    padding: 0;
    font-size: 10px;
    gap: 3px;
  }
  .egmain-identity strong {
    font-size: 18px;
    letter-spacing: 0.035em;
  }
  #egmain-hero .egmain-identity a {
    min-height: 30px;
    margin-top: 6px;
    padding: 6px 12px;
    font-size: 8.5px;
  }
  .egmain-title {
    max-width: 100%;
    margin-top: 10px;
    padding-top: 0;
    /* Slightly tighter so «ТЕЛО ПОД КЛЮЧ» fits on one line at 375+ */
    font-size: clamp(34px, 9.2vw, 46px);
    line-height: 0.98;
  }
  .egmain-title span {
    white-space: normal;
  }
  .egmain-title span:first-child {
    max-width: 14ch;
  }
  .egmain-title-nowrap {
    white-space: nowrap;
    max-width: none;
  }
  .egmain-lead {
    max-width: 36ch;
    margin-top: 12px;
    font-size: 14.5px;
    line-height: 1.4;
  }
  .egmain-subtitle {
    max-width: 42ch;
    margin-top: 10px;
    font-size: 12.5px;
    line-height: 1.5;
  }
  .egmain-tags {
    gap: 6px;
    margin-top: 12px;
  }
  .egmain-tag {
    padding: 5px 8px;
    font-size: 7.5px;
  }
  .egmain-cta-row {
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 0;
  }
  #egmain-hero a.egmain-btn {
    flex: none !important;
    width: 100% !important;
    min-height: 54px !important;
    padding: 12px 14px !important;
    font-size: 10.5px !important;
    letter-spacing: 0.06em !important;
    white-space: normal !important;
  }
  #egmain-hero a.egmain-btn-stack {
    min-height: 62px !important;
    align-items: center !important;
  }
  .egmain-btn-label {
    max-width: 28ch;
  }
  .egmain-btn-sub {
    font-size: 9px;
  }
  .egmain-btn-gift-badge {
    font-size: 8px;
    padding: 3px 8px;
  }
  .egmain-pillars {
    gap: 6px;
    margin-top: 14px;
  }
  .egmain-pillar {
    min-height: 84px;
    padding: 8px 6px;
    text-align: center;
  }
  .egmain-pillar svg {
    width: 28px;
    height: 28px;
    margin: 0 auto 2px;
  }
  .egmain-pillar strong {
    font-size: 9px;
  }
}
@media (max-width: 380px) {
  .egmain-portrait {
    inset: 0 -6% 44% 26%;
  }
  .egmain-title {
    font-size: clamp(30px, 8.8vw, 40px);
  }
  #egmain-hero a.egmain-btn {
    font-size: 10px !important;
    letter-spacing: 0.05em !important;
  }
}
@media (prefers-reduced-motion: reduce) {
  .egmain-frame {
    opacity: 1;
    transform: none;
    animation: none;
  }
  .egmain-btn,
  .egmain-btn-neon {
    transition: none !important;
    animation: none !important;
  }
}
`;
