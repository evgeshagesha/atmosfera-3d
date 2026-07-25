export const SITE_FOOTER_V2_CSS = `
.eg-footer,
.eg-footer *,
.eg-footer *::before,
.eg-footer *::after {
  box-sizing: border-box;
}
.eg-footer {
  padding: clamp(48px, 6vw, 78px) max(16px, env(safe-area-inset-right, 0px))
    clamp(36px, 5vw, 56px) max(16px, env(safe-area-inset-left, 0px));
  background:
    var(--eg-section-wash, radial-gradient(ellipse 80% 55% at 50% 0%, rgba(58, 66, 78, 0.14), transparent 58%)),
    var(--eg-bg, #0c0e12);
  color: #f4f2ed;
  font-family: var(--font-body, Manrope, sans-serif);
  text-align: center;
}
.eg-footer a {
  color: inherit !important;
  text-decoration: none !important;
}
.eg-footer__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(22px, 3vw, 34px);
  width: min(920px, 100%);
  margin: 0 auto;
}
.eg-footer__nav,
.eg-footer__legal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px 22px;
  margin: 0;
}
.eg-footer__nav a {
  position: relative;
  padding: 6px 0;
  color: rgba(255, 255, 255, 0.72) !important;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color 0.2s ease;
}
.eg-footer__nav a::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 2px;
  left: 0;
  height: 1px;
  background: #fff;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}
.eg-footer__nav a:hover {
  color: #fff !important;
}
.eg-footer__nav a:hover::after {
  transform: scaleX(1);
}
.eg-footer__brand {
  display: inline-flex;
  line-height: 0;
}
.eg-footer__brand img {
  width: clamp(110px, 18vw, 140px);
  height: auto;
  object-fit: contain;
  opacity: 0.94;
}
.eg-footer__legal a {
  color: rgba(255, 255, 255, 0.5) !important;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: color 0.2s ease;
}
.eg-footer__legal a:hover {
  color: #fff !important;
}
.eg-footer__meta {
  display: grid;
  gap: 6px;
  margin-top: 4px;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width: min(520px, 100%);
  color: rgba(255, 255, 255, 0.42);
  font-size: 11px;
  line-height: 1.45;
  letter-spacing: 0.04em;
}
.eg-footer__meta p {
  margin: 0;
}
.eg-footer a:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 4px;
}
@media (max-width: 560px) {
  .eg-footer {
    padding-top: 42px;
  }
  .eg-footer__nav {
    gap: 8px 16px;
  }
  .eg-footer__nav a {
    font-size: 10px;
  }
  .eg-footer__legal {
    flex-direction: column;
    gap: 10px;
  }
  .eg-footer__legal a {
    font-size: 10.5px;
  }
  .eg-footer__meta {
    font-size: 10px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .eg-footer__nav a,
  .eg-footer__nav a::after,
  .eg-footer__legal a {
    transition: none;
  }
}
`;
