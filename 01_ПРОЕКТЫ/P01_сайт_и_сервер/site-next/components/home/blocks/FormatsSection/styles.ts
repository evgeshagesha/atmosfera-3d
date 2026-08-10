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
  /* Club cyan system (aligned with /club + ClubHero) */
  --fmt-cyan: #59c3ff;
  --fmt-cyan-mid: #3db4ff;
  --fmt-blue: #2f6bff;
  --fmt-blue-strong: #1a56ff;
  --fmt-cyan-soft: rgba(89, 195, 255, 0.14);
  --fmt-cyan-glow: rgba(89, 195, 255, 0.35);
  --fmt-blue-glow: rgba(47, 107, 255, 0.4);
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
  color: rgba(89, 195, 255, 0.72);
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
  grid-template-columns: repeat(2, minmax(0, 420px));
  justify-content: center;
  gap: 22px;
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
    0 0 0 1px rgba(89, 195, 255, 0.22),
    0 0 28px rgba(47, 107, 255, 0.12),
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
    0 0 0 1px rgba(89, 195, 255, 0.4),
    0 0 36px rgba(61, 180, 255, 0.22),
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
.eg-formats__card-title--nowrap {
  display: block;
  -webkit-line-clamp: unset;
  -webkit-box-orient: unset;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: clamp(12px, 1.35vw, 15px);
  letter-spacing: 0.005em;
  max-width: 100%;
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
  background: linear-gradient(135deg, var(--fmt-blue-strong), var(--fmt-blue));
  color: #fff !important;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none !important;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  box-shadow:
    0 0 0 1px rgba(89, 195, 255, 0.35),
    0 0 18px rgba(47, 107, 255, 0.28),
    0 8px 20px -10px rgba(0, 0, 0, 0.7);
}
.eg-formats__cta:hover {
  transform: translateY(-1px);
  filter: brightness(1.08);
  color: #fff !important;
  box-shadow:
    0 0 0 1px rgba(89, 195, 255, 0.55),
    0 0 26px rgba(61, 180, 255, 0.4),
    0 10px 24px -10px rgba(0, 0, 0, 0.75);
}
/* Featured strategy card — cyan premium frame (club blue system) */
.eg-formats__card--featured {
  transform: scale(1.015);
  z-index: 1;
  background-position: 42% 12%;
  box-shadow:
    0 0 0 1.5px rgba(89, 195, 255, 0.55),
    0 0 36px rgba(61, 180, 255, 0.28),
    0 0 64px rgba(47, 107, 255, 0.16),
    0 20px 40px -22px rgba(0, 0, 0, 0.9);
}
.eg-formats__card--featured::after {
  background-position: 42% 12%;
}
.eg-formats__card--featured:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow:
    0 0 0 1.5px rgba(122, 212, 255, 0.7),
    0 0 48px rgba(89, 195, 255, 0.36),
    0 0 72px rgba(47, 107, 255, 0.22),
    0 24px 48px -20px rgba(0, 0, 0, 0.92);
}
.eg-formats__badges {
  position: absolute;
  top: 10px;
  right: 10px;
  left: auto;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-wrap: nowrap;
  gap: 4px;
  max-width: 42%;
  pointer-events: none;
}
.eg-formats__badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 7px;
  border-radius: 999px;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.05em;
  line-height: 1.2;
  text-transform: uppercase;
  white-space: nowrap;
  color: #041018;
  background: linear-gradient(
    135deg,
    rgba(122, 212, 255, 0.95) 0%,
    rgba(89, 195, 255, 0.95) 45%,
    rgba(61, 180, 255, 0.92) 100%
  );
  box-shadow:
    0 0 0 1px rgba(89, 195, 255, 0.35),
    0 3px 10px -6px rgba(0, 0, 0, 0.65);
}
.eg-formats__cta--glow {
  background: linear-gradient(135deg, var(--fmt-blue-strong) 0%, var(--fmt-blue) 45%, var(--fmt-cyan-mid) 100%);
  color: #fff !important;
  box-shadow:
    0 0 0 1px rgba(122, 212, 255, 0.55),
    0 0 22px rgba(89, 195, 255, 0.45),
    0 0 40px rgba(47, 107, 255, 0.3),
    0 10px 24px -10px rgba(0, 0, 0, 0.75);
  animation: eg-formats-cta-pulse 2.8s ease-in-out infinite;
}
.eg-formats__cta--glow:hover {
  color: #fff !important;
  filter: brightness(1.1);
  box-shadow:
    0 0 0 1px rgba(168, 230, 255, 0.7),
    0 0 28px rgba(89, 195, 255, 0.6),
    0 0 52px rgba(47, 107, 255, 0.4),
    0 12px 28px -10px rgba(0, 0, 0, 0.8);
}
@keyframes eg-formats-cta-pulse {
  0%,
  100% {
    box-shadow:
      0 0 0 1px rgba(89, 195, 255, 0.45),
      0 0 18px rgba(61, 180, 255, 0.35),
      0 0 36px rgba(47, 107, 255, 0.2),
      0 10px 24px -10px rgba(0, 0, 0, 0.75);
  }
  50% {
    box-shadow:
      0 0 0 1px rgba(122, 212, 255, 0.7),
      0 0 26px rgba(89, 195, 255, 0.55),
      0 0 48px rgba(47, 107, 255, 0.35),
      0 10px 24px -10px rgba(0, 0, 0, 0.75);
  }
}
@media (min-width: 900px) {
  .eg-formats__card-title {
    font-size: 16px;
  }
  .eg-formats__card-title--nowrap {
    font-size: 15px;
  }
  .eg-formats__card-text {
    font-size: 13px;
  }
}
@media (min-width: 641px) and (max-width: 899px) {
  .eg-formats__grid {
    grid-template-columns: repeat(2, minmax(0, 320px));
  }
  .eg-formats__card-title--nowrap {
    font-size: clamp(11px, 1.6vw, 13.5px);
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
  .eg-formats__card--featured,
  .eg-formats__card--featured::after {
    background-position: 40% 10%;
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
  .eg-formats__card-title--nowrap {
    font-size: clamp(9px, 2.6vw, 11px);
    letter-spacing: 0;
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
  .eg-formats__badges {
    top: 8px;
    right: 8px;
    max-width: 46%;
  }
  .eg-formats__badge {
    font-size: 7px;
    padding: 2px 6px;
  }
}
.eg-formats__cta:focus-visible {
  outline: 2px solid var(--fmt-cyan);
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
  .eg-formats__card-title--nowrap {
    font-size: 8.5px;
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
  .eg-formats__card--featured:hover,
  .eg-formats__cta:hover {
    transform: none !important;
  }
  .eg-formats__card--featured {
    transform: none !important;
  }
  .eg-formats__card:hover::after {
    transform: none !important;
  }
}
`;
