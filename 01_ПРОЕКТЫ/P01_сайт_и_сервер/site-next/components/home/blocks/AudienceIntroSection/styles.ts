export const AUDIENCE_SECTION_CSS = `
#rec2040539251.eg-audience {
  background: #000;
  color: #fff;
}
.eg-audience__inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(40px, 5vw, 80px) clamp(16px, 4vw, 40px) clamp(48px, 6vw, 88px);
  font-family: Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.eg-audience__head {
  max-width: 720px;
  margin: 0 0 clamp(28px, 4vw, 48px);
}
.eg-audience__eyebrow {
  margin: 0 0 12px;
  font-size: clamp(11px, 1.2vw, 13px);
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
}
.eg-audience__title {
  margin: 0 0 16px;
  font-size: clamp(30px, 4.4vw, 52px);
  font-weight: 800;
  line-height: 1.1;
  color: #fff;
}
.eg-audience__descr {
  margin: 0;
  font-size: clamp(15px, 1.4vw, 18px);
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.82);
}
.eg-audience__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
.eg-audience__card {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  min-height: 300px;
  background-size: cover;
  background-position: center;
  isolation: isolate;
  display: flex;
  align-items: flex-end;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease;
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
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  pointer-events: none;
}
.eg-audience__card:hover {
  transform: translateY(-4px);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18), 0 26px 60px -30px rgba(0, 0, 0, 0.85);
}
.eg-audience__card:hover::after {
  transform: scale(1.06);
}
.eg-audience__card-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.18) 0%,
    rgba(0, 0, 0, 0.55) 45%,
    rgba(0, 0, 0, 0.9) 100%
  );
  pointer-events: none;
}
.eg-audience__card-body {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: clamp(18px, 2.2vw, 28px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}
.eg-audience__card-title {
  margin: 0;
  font-size: clamp(18px, 1.8vw, 23px);
  font-weight: 800;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #fff;
  overflow-wrap: anywhere;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.6);
}
.eg-audience__card-text {
  margin: 0;
  font-size: clamp(13px, 1.2vw, 15px);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.86);
  max-width: 40ch;
}
.eg-audience__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  padding: 11px 20px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff !important;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none !important;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.32);
  backdrop-filter: blur(6px);
  transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}
.eg-audience__cta:hover {
  background: #fff;
  color: #111 !important;
  border-color: #fff;
  transform: translateY(-1px);
}
.eg-audience [data-reveal] {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-delay: var(--reveal-delay, 0ms);
  will-change: opacity, transform;
}
.eg-audience [data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}
.eg-audience__title,
.eg-audience__descr {
  color: #fff;
}
@media (min-width: 961px) {
  .eg-audience__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  .eg-audience__card {
    min-height: 340px;
  }
}
@media (min-width: 641px) and (max-width: 960px) {
  .eg-audience__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .eg-audience__card {
    min-height: 300px;
  }
}
@media (max-width: 640px) {
  .eg-audience__grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .eg-audience__card {
    min-height: 260px;
    border-radius: 22px;
  }
  .eg-audience__cta {
    width: 100%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .eg-audience [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
  .eg-audience__card,
  .eg-audience__cta {
    transition: none !important;
  }
  .eg-audience__card:hover,
  .eg-audience__cta:hover {
    transform: none !important;
  }
  .eg-audience__card:hover::after {
    transform: none !important;
  }
}
`;
