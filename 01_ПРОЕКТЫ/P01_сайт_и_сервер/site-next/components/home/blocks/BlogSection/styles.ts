export const BLOG_SECTION_STYLES = `
.eg-blog,
.eg-blog *,
.eg-blog *::before,
.eg-blog *::after {
  box-sizing: border-box;
}
.eg-blog {
  overflow: hidden;
  padding: clamp(52px, 7vw, 88px) 0 clamp(54px, 7vw, 88px);
  background: var(--eg-bg, #0c0e12);
  color: #fff;
  font-family: var(--font-body, Manrope, sans-serif);
}
.eg-blog__inner {
  width: min(1240px, 100%);
  margin: 0 auto;
  padding: 0 max(16px, env(safe-area-inset-right, 0px))
    0 max(16px, env(safe-area-inset-left, 0px));
}
.eg-blog__head {
  max-width: 720px;
  margin: 0 auto clamp(26px, 4vw, 42px);
  text-align: center;
}
.eg-blog__head > p {
  margin: 0 0 10px;
  color: rgba(255, 255, 255, 0.52);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.eg-blog__head h2 {
  margin: 0;
  color: #fff;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(38px, 6vw, 68px);
  line-height: 1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}
.eg-blog__head > span {
  display: block;
  margin-top: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(13px, 1.4vw, 16px);
  line-height: 1.5;
}
.eg-blog__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
.eg-blog-card {
  position: relative;
  aspect-ratio: 1 / 1;
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 22px;
  background: #14181d;
  box-shadow:
    0 0 24px rgba(255, 255, 255, 0.06),
    0 18px 36px -22px rgba(0, 0, 0, 0.88);
  isolation: isolate;
  transition: border-color 0.24s ease, box-shadow 0.24s ease, transform 0.24s ease;
}
.eg-blog-card:hover {
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow:
    0 0 34px rgba(255, 255, 255, 0.1),
    0 22px 44px -20px rgba(0, 0, 0, 0.92);
  transform: translateY(-3px);
}
.eg-blog-card__link {
  position: absolute;
  inset: 0;
  display: block;
  overflow: hidden;
  color: inherit !important;
  text-decoration: none !important;
}
.eg-blog-card__link img {
  object-fit: cover;
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.eg-blog-card:hover img {
  transform: scale(1.035);
}
.eg-blog-card__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.06) 0%,
    rgba(0, 0, 0, 0.42) 42%,
    rgba(0, 0, 0, 0.94) 100%
  );
  pointer-events: none;
}
.eg-blog-card__body {
  position: absolute;
  inset: auto 0 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
}
.eg-blog-card__meta {
  color: rgba(255, 255, 255, 0.64);
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}
.eg-blog-card h3 {
  display: -webkit-box;
  margin: 7px 0 0;
  overflow: hidden;
  color: #fff;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(18px, 2.1vw, 25px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.eg-blog-card p {
  display: -webkit-box;
  margin: 8px 0 0;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.78);
  font-size: 11px;
  line-height: 1.38;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.eg-blog-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 11px;
  color: #fff;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}
.eg-blog-card__cta i {
  font-size: 13px;
  font-style: normal;
}
.eg-blog-all__link {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 14px !important;
  width: fit-content;
  min-height: 44px;
  margin: 28px auto 0;
  padding: 11px 22px !important;
  border: 1px solid rgba(255, 255, 255, 0.28) !important;
  border-radius: 999px !important;
  background: transparent !important;
  color: #fff !important;
  font-size: 10px !important;
  font-weight: 800 !important;
  letter-spacing: 0.1em !important;
  text-decoration: none !important;
  text-transform: uppercase !important;
  transition: background 0.2s ease, color 0.2s ease;
}
.eg-blog-all__link:hover {
  background: #fff !important;
  color: #111 !important;
}
.eg-blog-card__link:focus-visible,
.eg-blog-all__link:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}
@media (max-width: 960px) {
  .eg-blog__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .eg-blog__inner {
    padding-right: 0;
  }
  .eg-blog__head {
    padding-right: 16px;
  }
  .eg-blog__grid {
    display: flex;
    gap: 12px;
    padding: 2px 16px 18px 1px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
  }
  .eg-blog__grid::-webkit-scrollbar {
    display: none;
  }
  .eg-blog-card {
    flex: 0 0 248px;
    width: 248px;
    scroll-snap-align: start;
    border-radius: 20px;
  }
  .eg-blog-card__body {
    padding: 14px;
  }
  .eg-blog-card h3 {
    font-size: 21px;
  }
  .eg-blog-card p {
    font-size: 10.5px;
  }
  .eg-blog-all__link {
    margin-right: 16px;
  }
}
@media (hover: none) {
  .eg-blog-card:hover {
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .eg-blog-card,
  .eg-blog-card__link img,
  .eg-blog-all__link {
    transition: none !important;
  }
}
`;
