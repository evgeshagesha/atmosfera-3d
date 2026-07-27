export const FORMATS_SECTION_CSS = `
#online,
#rec2034125511.eg-formats {
  background: var(--eg-bg, #0c0e12);
  color: #fff;
}
.eg-formats,
.eg-formats *,
.eg-formats *::before,
.eg-formats *::after {
  box-sizing: border-box;
}
.eg-formats {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(14px, 2vw, 26px) clamp(16px, 4vw, 32px) clamp(48px, 6vw, 80px);
  font-family: Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.eg-formats__header {
  text-align: center;
  margin: 0 auto clamp(24px, 3.5vw, 40px);
  max-width: 640px;
}
.eg-formats [data-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.55s cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform;
}
.eg-formats [data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}
.eg-formats__eyebrow {
  margin: 0 0 10px;
  font-size: clamp(11px, 1.2vw, 12px);
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.66);
}
.eg-formats__title {
  margin: 0;
  font-size: clamp(26px, 3.8vw, 40px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #fff;
}
.eg-formats__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 280px));
  justify-content: center;
  gap: 20px;
  width: 100%;
}
.eg-formats__card {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 22px;
  background-color: #14181d;
  background-size: cover;
  background-position: center;
  isolation: isolate;
  display: flex;
  align-items: flex-end;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.16),
    0 0 28px rgba(255, 255, 255, 0.08),
    0 18px 36px -22px rgba(0, 0, 0, 0.85);
  transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.28s ease;
}
.eg-formats__card::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background: inherit;
  background-size: cover;
  background-position: center;
  transform: scale(1);
  transition: transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
  pointer-events: none;
}
.eg-formats__card:hover {
  transform: translateY(-3px);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.28),
    0 0 36px rgba(255, 255, 255, 0.14),
    0 22px 44px -20px rgba(0, 0, 0, 0.9);
}
.eg-formats__card:hover::after {
  transform: scale(1.05);
}
.eg-formats__card-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.12) 0%,
    rgba(0, 0, 0, 0.42) 42%,
    rgba(0, 0, 0, 0.9) 100%
  );
  pointer-events: none;
}
.eg-formats__card-body {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 16px 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-end;
  min-height: 58%;
}
.eg-formats__card-title {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.25;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  color: #fffdf8;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.65);
}
.eg-formats__step {
  opacity: 0.9;
}
.eg-formats__card-text {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.4;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.86);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.eg-formats__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  width: 100%;
  padding: 11px 14px;
  border-radius: 999px;
  background: #fff;
  color: #111 !important;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none !important;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 8px 20px -10px rgba(0, 0, 0, 0.7);
}
.eg-formats__cta:hover {
  transform: translateY(-1px);
  color: #000 !important;
}
/* Entry card «Начни отсюда» — brighter gray glow on the CTA */
.eg-formats__card--featured {
  box-shadow:
    0 0 0 1px rgba(220, 224, 230, 0.42),
    0 0 42px rgba(200, 210, 220, 0.22),
    0 18px 36px -22px rgba(0, 0, 0, 0.85);
}
.eg-formats__card--featured:hover {
  box-shadow:
    0 0 0 1px rgba(235, 240, 245, 0.55),
    0 0 56px rgba(210, 220, 230, 0.32),
    0 22px 44px -20px rgba(0, 0, 0, 0.9);
}
.eg-formats__cta--glow {
  background: linear-gradient(180deg, #f4f6f8 0%, #d8dde4 100%);
  color: #0a0c0f !important;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.55),
    0 0 22px rgba(210, 220, 230, 0.75),
    0 0 48px rgba(180, 195, 210, 0.45),
    0 10px 24px -10px rgba(0, 0, 0, 0.75);
  animation: eg-formats-cta-pulse 2.6s ease-in-out infinite;
}
.eg-formats__cta--glow:hover {
  color: #000 !important;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.7),
    0 0 28px rgba(230, 235, 240, 0.9),
    0 0 60px rgba(200, 210, 220, 0.55),
    0 12px 28px -10px rgba(0, 0, 0, 0.8);
}
@keyframes eg-formats-cta-pulse {
  0%,
  100% {
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.5),
      0 0 18px rgba(200, 210, 220, 0.55),
      0 0 40px rgba(170, 185, 200, 0.35),
      0 10px 24px -10px rgba(0, 0, 0, 0.75);
  }
  50% {
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.75),
      0 0 28px rgba(230, 235, 240, 0.85),
      0 0 58px rgba(200, 210, 220, 0.55),
      0 10px 24px -10px rgba(0, 0, 0, 0.75);
  }
}
@media (min-width: 900px) {
  .eg-formats__card-title {
    font-size: 16px;
  }
  .eg-formats__card-text {
    font-size: 13px;
  }
}
@media (min-width: 641px) and (max-width: 899px) {
  .eg-formats__grid {
    grid-template-columns: repeat(2, minmax(0, 280px));
  }
}
@media (max-width: 640px) {
  .eg-formats {
    padding-left: max(12px, env(safe-area-inset-left, 0px));
    padding-right: max(12px, env(safe-area-inset-right, 0px));
  }
  .eg-formats__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }
  .eg-formats__card {
    width: 100%;
    max-width: none;
    aspect-ratio: 1 / 1;
    border-radius: 16px;
  }
  .eg-formats__card-body {
    min-height: 74%;
    padding: 10px;
    gap: 5px;
  }
  .eg-formats__card-title {
    font-size: clamp(10.5px, 3vw, 12.5px);
    line-height: 1.15;
    -webkit-line-clamp: 3;
  }
  .eg-formats__card-text {
    font-size: clamp(9px, 2.5vw, 10.5px);
    line-height: 1.3;
    -webkit-line-clamp: 2;
  }
  .eg-formats__cta {
    min-height: 38px;
    padding: 7px 6px;
    border-radius: 10px;
    font-size: clamp(7.5px, 2.1vw, 9px);
    line-height: 1.15;
    letter-spacing: 0.035em;
    white-space: normal;
  }
}
.eg-formats__cta:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}
@media (max-width: 360px) {
  .eg-formats__title {
    font-size: 24px;
  }
  .eg-formats__grid {
    gap: 8px;
  }
  .eg-formats__card-body {
    padding: 8px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .eg-formats [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
  .eg-formats__card,
  .eg-formats__cta {
    transition: none !important;
  }
  .eg-formats__cta--glow {
    animation: none !important;
  }
  .eg-formats__card:hover,
  .eg-formats__cta:hover {
    transform: none !important;
  }
  .eg-formats__card:hover::after {
    transform: none !important;
  }
}
`;
