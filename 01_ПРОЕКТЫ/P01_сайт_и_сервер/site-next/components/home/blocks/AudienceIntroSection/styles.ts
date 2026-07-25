export const AUDIENCE_SECTION_CSS = `
#rec2040539251.eg-audience {
  background: var(--eg-bg, #0c0e12);
  color: #fff;
  overflow: hidden;
}
.eg-audience__inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding:
    clamp(40px, 5vw, 76px)
    max(14px, env(safe-area-inset-right, 0px))
    clamp(44px, 5vw, 76px)
    max(14px, env(safe-area-inset-left, 0px));
  font-family: var(--font-body, Manrope, sans-serif);
  -webkit-font-smoothing: antialiased;
}
.eg-audience__head {
  max-width: 720px;
  margin: 0 0 clamp(22px, 3.5vw, 36px);
}
.eg-audience__eyebrow {
  margin: 0 0 10px;
  font-size: clamp(11px, 1.2vw, 13px);
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.66);
}
.eg-audience__title {
  margin: 0 0 14px;
  font-size: clamp(30px, 4.4vw, 48px);
  font-weight: 700;
  line-height: 1.05;
  text-transform: uppercase;
  color: #fff;
}
.eg-audience__descr {
  margin: 0;
  font-size: clamp(14px, 1.4vw, 17px);
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.8);
}
.eg-audience__track-wrap {
  position: relative;
}
.eg-audience__grid {
  display: flex;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 4px 2px 16px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  touch-action: pan-x;
  scrollbar-width: none;
}
.eg-audience__grid::-webkit-scrollbar {
  display: none;
}
.eg-audience__card {
  position: relative;
  flex: 0 0 auto;
  width: min(300px, calc(100vw - 40px));
  aspect-ratio: 1 / 1;
  scroll-snap-align: center;
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
    0 0 26px rgba(255, 255, 255, 0.07),
    0 18px 36px -22px rgba(0, 0, 0, 0.85);
  transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.28s ease;
}
.eg-audience__card::after {
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
.eg-audience__card:hover {
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.28),
    0 0 34px rgba(255, 255, 255, 0.13),
    0 22px 44px -20px rgba(0, 0, 0, 0.9);
}
.eg-audience__card:hover::after {
  transform: scale(1.05);
}
.eg-audience__card-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.12) 0%,
    rgba(0, 0, 0, 0.45) 42%,
    rgba(0, 0, 0, 0.9) 100%
  );
  pointer-events: none;
}
.eg-audience__card-body {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 16px 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-end;
}
.eg-audience__card-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  color: #fff;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.65);
}
.eg-audience__card-text {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.42;
  color: rgba(255, 255, 255, 0.86);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.eg-audience__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  padding: 9px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff !important;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none !important;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.34);
  backdrop-filter: blur(6px);
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.eg-audience__cta:hover {
  background: #fff;
  color: #111 !important;
  border-color: #fff;
}
.eg-audience__nav {
  display: none;
  gap: 10px;
  justify-content: center;
  margin-top: 6px;
}
.eg-audience__btn {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.eg-audience__btn:hover {
  background: #fff;
  color: #111;
  border-color: #fff;
}
.eg-audience__btn:active {
  transform: scale(0.96);
}
.eg-audience [data-reveal] {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.55s cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform;
}
.eg-audience [data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}
@media (min-width: 961px) {
  .eg-audience__card {
    width: 300px;
  }
  .eg-audience__nav {
    display: flex;
  }
}
@media (max-width: 640px) {
  .eg-audience__card {
    width: min(360px, calc(100vw - 40px));
  }
}
@media (prefers-reduced-motion: reduce) {
  .eg-audience [data-reveal],
  .eg-audience__card,
  .eg-audience__cta,
  .eg-audience__btn {
    transition: none !important;
  }
  .eg-audience [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
  }
  .eg-audience__card:hover::after {
    transform: none !important;
  }
}
`;
