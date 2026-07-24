export const FORMATS_SECTION_CSS = `
#online,
#rec2034125511.eg-formats {
  background: #000;
  color: #fff;
}
.eg-formats {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(40px, 5vw, 72px) clamp(16px, 4vw, 32px) clamp(48px, 6vw, 80px);
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 16px;
  width: 100%;
}
.eg-formats__card {
  position: relative;
  flex: 0 1 280px;
  width: min(280px, 100%);
  aspect-ratio: 1 / 1;
  max-width: 300px;
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
@media (min-width: 900px) {
  .eg-formats__grid {
    gap: 20px;
  }
  .eg-formats__card {
    flex-basis: 260px;
    width: 260px;
    max-width: 260px;
  }
}
@media (min-width: 1100px) {
  .eg-formats__card {
    flex-basis: 280px;
    width: 280px;
    max-width: 280px;
  }
  .eg-formats__card-title {
    font-size: 16px;
  }
  .eg-formats__card-text {
    font-size: 13px;
  }
}
@media (max-width: 640px) {
  .eg-formats {
    padding-left: max(14px, env(safe-area-inset-left, 0px));
    padding-right: max(14px, env(safe-area-inset-right, 0px));
  }
  .eg-formats__grid {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    gap: 16px;
  }
  .eg-formats__card {
    flex: 0 0 auto;
    width: min(430px, calc(100vw - 28px));
    max-width: min(430px, calc(100vw - 28px));
    aspect-ratio: 1 / 1;
    border-radius: 22px;
    margin: 0 auto;
  }
  .eg-formats__card-body {
    padding: 16px 16px 18px;
    gap: 8px;
  }
  .eg-formats__card-title {
    font-size: 16px;
  }
  .eg-formats__card-text {
    font-size: 13px;
    -webkit-line-clamp: 2;
  }
  .eg-formats__cta {
    font-size: 11px;
    padding: 10px 14px;
  }
}
@media (max-width: 360px) {
  .eg-formats__title {
    font-size: 24px;
  }
  .eg-formats__card {
    width: calc(100vw - 24px);
    max-width: calc(100vw - 24px);
  }
  .eg-formats__card-title {
    font-size: 15px;
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
  .eg-formats__card:hover,
  .eg-formats__cta:hover {
    transform: none !important;
  }
  .eg-formats__card:hover::after {
    transform: none !important;
  }
}
`;
