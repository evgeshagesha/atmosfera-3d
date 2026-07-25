export const SITE_HEADER_V2_CSS = `
.eg-site-header,
.eg-site-header *,
.eg-site-header *::before,
.eg-site-header *::after {
  box-sizing: border-box;
}
.eg-site-header {
  position: relative;
  z-index: 100;
  width: 100%;
  /* Match hero reference: solid black with menu/logo */
  background: #000;
  color: #f4f4f2;
  font-family: var(--font-body, Manrope, sans-serif);
  border-bottom: 0;
}
.eg-site-header__inner {
  display: grid;
  grid-template-columns: 112px 1fr 112px;
  align-items: center;
  width: min(1440px, 100%);
  min-height: 76px;
  margin: 0 auto;
  padding: 12px clamp(22px, 3.2vw, 48px);
}
.eg-site-header a {
  color: inherit !important;
  text-decoration: none !important;
}
.eg-site-header__logo {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  line-height: 0;
}
.eg-site-header__logo img {
  width: 96px;
  height: auto;
  object-fit: contain;
}
.eg-site-header__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(20px, 2.5vw, 40px);
}
.eg-site-header__nav a {
  position: relative;
  padding: 8px 0;
  color: rgba(255, 255, 255, 0.62) !important;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: color 0.2s ease;
}
.eg-site-header__nav a::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 3px;
  left: 0;
  height: 1px;
  background: #fff;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}
.eg-site-header__nav a:hover {
  color: #fff !important;
}
.eg-site-header__nav a:hover::after {
  transform: scaleX(1);
}
.eg-site-header__menu {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  justify-self: end;
  gap: 12px;
  min-width: 94px;
  min-height: 42px;
  padding: 9px 15px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  background: rgba(10, 12, 15, 0.72);
  color: #fff;
  font: 700 10px/1 var(--font-body, Manrope, sans-serif);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  backdrop-filter: blur(10px);
}
.eg-site-header__menu i {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 14px;
}
.eg-site-header__menu b {
  display: block;
  width: 100%;
  height: 1px;
  background: currentColor;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.eg-site-header__menu:focus-visible,
.eg-site-header a:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 4px;
}
@media (max-width: 960px) {
  .eg-site-header__inner {
    grid-template-columns: 1fr auto;
    min-height: 72px;
    padding: 12px 22px;
  }
  .eg-site-header__logo img {
    width: 78px;
  }
  .eg-site-header__nav {
    position: absolute;
    top: calc(100% - 4px);
    right: 14px;
    left: 14px;
    display: grid;
    gap: 0;
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 18px;
    background: rgba(6, 8, 10, 0.97);
    box-shadow: 0 22px 60px rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(18px);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
  }
  .eg-site-header__nav.is-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .eg-site-header__nav a {
    padding: 13px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 11px;
  }
  .eg-site-header__nav a:last-child {
    border-bottom: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .eg-site-header__nav,
  .eg-site-header__nav a,
  .eg-site-header__nav a::after,
  .eg-site-header__menu b {
    transition: none;
  }
}
`;
