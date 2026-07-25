export const GALLERY_V2_CSS = `
.eg-reviews-v2,
.eg-reviews-v2 *,
.eg-reviews-v2 *::before,
.eg-reviews-v2 *::after {
  box-sizing: border-box;
}
.eg-reviews-v2 {
  overflow: hidden;
  padding: clamp(54px, 7vw, 92px) 0 clamp(40px, 5vw, 64px);
  background:
    var(--eg-section-wash, radial-gradient(ellipse 80% 55% at 50% 0%, rgba(58, 66, 78, 0.14), transparent 58%)),
    var(--eg-bg, #0c0e12);
  color: #f4f2ed;
  font-family: var(--font-body, Manrope, sans-serif);
}
.eg-reviews-v2__inner {
  width: min(1280px, 100%);
  margin: 0 auto;
  padding-left: max(14px, env(safe-area-inset-left, 0px));
  padding-right: max(14px, env(safe-area-inset-right, 0px));
}
.eg-reviews-v2__head {
  max-width: 720px;
  margin: 0 auto clamp(30px, 4vw, 48px);
  text-align: center;
}
.eg-reviews-v2__head > p {
  margin: 0 0 8px;
  color: rgba(255, 255, 255, 0.56);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}
.eg-reviews-v2__head h2 {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(52px, 6.4vw, 90px);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
.eg-reviews-v2__head > span {
  display: block;
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.55);
  font-size: clamp(12px, 1.15vw, 15px);
}
.eg-reviews-v2__slider {
  position: relative;
}
.eg-reviews-v2__track {
  display: flex;
  align-items: stretch;
  gap: 12px;
  margin: 0;
  padding: 4px 2px 18px;
  list-style: none;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  touch-action: pan-x;
  scrollbar-width: none;
}
.eg-reviews-v2__track::-webkit-scrollbar {
  display: none;
}
.eg-review-card {
  position: relative;
  display: flex;
  flex: 0 0 calc(100% - 8px);
  flex-direction: column;
  min-width: 0;
  min-height: 280px;
  padding: 22px 20px;
  overflow: hidden;
  border: 1px solid rgba(221, 226, 234, 0.18);
  border-radius: 20px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.015));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  scroll-snap-align: center;
}
.eg-review-card::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(circle at 0 0, rgba(255, 255, 255, 0.045), transparent 35%);
  pointer-events: none;
}
.eg-review-card > * {
  position: relative;
  z-index: 1;
}
.eg-review-card__head {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
}
.eg-review-card__avatar {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(238, 218, 163, 0.42);
  border-radius: 999px;
  background: linear-gradient(145deg, #343a44, #14181e);
  color: #f4f2ed;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
}
.eg-review-card__head h3 {
  overflow: hidden;
  margin: 0;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.eg-review-card__head p {
  overflow: hidden;
  margin: 4px 0 0;
  color: rgba(255, 255, 255, 0.42);
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.eg-review-card__quote {
  align-self: start;
  color: rgba(255, 255, 255, 0.12);
  font-family: Georgia, serif;
  font-size: 44px;
  line-height: 0.8;
}
.eg-review-card__stars {
  display: flex;
  gap: 3px;
  margin-top: 16px;
}
.eg-review-card__stars svg {
  width: 16px;
  height: 16px;
  fill: #e8c86b;
}
.eg-review-card__text {
  flex: 1;
  margin-top: 16px;
  color: rgba(255, 255, 255, 0.78);
  font-size: clamp(13px, 1.2vw, 15px);
  line-height: 1.55;
}
.eg-review-card__text p {
  margin: 0 0 10px;
}
.eg-review-card__text p:last-child {
  margin-bottom: 0;
}
.eg-reviews-v2__nav {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 8px;
}
.eg-reviews-v2__btn {
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}
.eg-reviews-v2__btn:hover {
  background: #fff;
  border-color: #fff;
  color: #111;
}
.eg-reviews-v2__btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}
@media (min-width: 761px) {
  .eg-review-card {
    flex-basis: min(560px, calc(100% - 48px));
    max-width: 560px;
    min-height: 320px;
    padding: 28px 26px;
  }
  .eg-reviews-v2__track {
    gap: 16px;
    padding-left: max(0px, calc((100% - 560px) / 2));
    padding-right: max(0px, calc((100% - 560px) / 2));
  }
}
@media (max-width: 560px) {
  .eg-reviews-v2 {
    padding-top: 50px;
  }
  .eg-reviews-v2__head {
    margin-bottom: 26px;
  }
  .eg-reviews-v2__head h2 {
    font-size: 62px;
  }
  .eg-review-card {
    flex-basis: calc(100% - 4px);
    min-height: 260px;
    padding: 18px 16px;
    border-radius: 18px;
  }
  .eg-review-card__head {
    grid-template-columns: 40px minmax(0, 1fr) auto;
    gap: 10px;
  }
  .eg-review-card__avatar {
    width: 40px;
    height: 40px;
    font-size: 11px;
  }
  .eg-review-card__head h3 {
    font-size: 14px;
  }
  .eg-review-card__head p {
    font-size: 9px;
  }
  .eg-review-card__text {
    font-size: 13px;
    line-height: 1.48;
  }
}
@media (prefers-reduced-motion: reduce) {
  .eg-reviews-v2__btn {
    transition: none;
  }
}
`;
