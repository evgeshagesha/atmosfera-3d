export const GALLERY_SECTION_CSS = `
#rec2224175751.eg-reviews-gallery {
  background: #000;
  color: #fff;
  overflow: hidden;
}
.eg-reviews-gallery__inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding:
    clamp(36px, 5vw, 72px)
    max(16px, env(safe-area-inset-right, 0px))
    clamp(28px, 4vw, 48px)
    max(16px, env(safe-area-inset-left, 0px));
  font-family: Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.eg-reviews-gallery__head {
  text-align: center;
  margin: 0 auto clamp(22px, 3.5vw, 36px);
  max-width: 640px;
}
.eg-reviews-gallery__eyebrow {
  margin: 0 0 10px;
  font-size: clamp(11px, 1.2vw, 13px);
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.68);
}
.eg-reviews-gallery__title {
  margin: 0 0 10px;
  font-size: clamp(28px, 4.2vw, 44px);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: #fff;
}
.eg-reviews-gallery__descr {
  margin: 0;
  font-size: clamp(14px, 1.35vw, 17px);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.78);
}
.eg-reviews-gallery__track-wrap {
  position: relative;
}
.eg-reviews-gallery__track {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  touch-action: pan-x;
  scrollbar-width: none;
  padding: 4px 2px 18px;
  margin: 0;
  list-style: none;
}
.eg-reviews-gallery__track::-webkit-scrollbar {
  display: none;
}
.eg-reviews-gallery__item {
  flex: 0 0 min(520px, calc(100vw - 48px));
  scroll-snap-align: start;
  max-width: 560px;
}
.eg-reviews-gallery__card {
  position: relative;
  display: block;
  width: 100%;
  border-radius: 22px;
  overflow: hidden;
  background: #14181d;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    0 18px 40px -28px rgba(0, 0, 0, 0.85);
  transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.28s ease;
}
.eg-reviews-gallery__card:hover {
  transform: translateY(-3px);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.16),
    0 26px 50px -24px rgba(0, 0, 0, 0.9);
}
.eg-reviews-gallery__img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1320 / 799;
  object-fit: cover;
  object-position: center top;
  background: #1a1f25;
}
.eg-reviews-gallery__nav {
  display: none;
  gap: 10px;
  justify-content: center;
  margin-top: 4px;
}
.eg-reviews-gallery__btn {
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
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.eg-reviews-gallery__btn:hover {
  background: #fff;
  color: #111;
  border-color: #fff;
}
.eg-reviews-gallery__btn:active {
  transform: scale(0.96);
}
.eg-reviews-gallery [data-reveal] {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.55s cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-delay: var(--reveal-delay, 0ms);
}
.eg-reviews-gallery [data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}
@media (min-width: 961px) {
  .eg-reviews-gallery__item {
    flex-basis: min(480px, 42vw);
  }
  .eg-reviews-gallery__nav {
    display: flex;
  }
}
@media (max-width: 420px) {
  .eg-reviews-gallery__inner {
    padding-left: max(12px, env(safe-area-inset-left, 0px));
    padding-right: max(12px, env(safe-area-inset-right, 0px));
  }
  .eg-reviews-gallery__item {
    flex-basis: calc(100vw - 36px);
  }
  .eg-reviews-gallery__card {
    border-radius: 18px;
  }
  .eg-reviews-gallery__title {
    font-size: 26px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .eg-reviews-gallery [data-reveal],
  .eg-reviews-gallery__card,
  .eg-reviews-gallery__btn {
    transition: none !important;
  }
  .eg-reviews-gallery [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
  }
  .eg-reviews-gallery__card:hover {
    transform: none !important;
  }
}
`;
