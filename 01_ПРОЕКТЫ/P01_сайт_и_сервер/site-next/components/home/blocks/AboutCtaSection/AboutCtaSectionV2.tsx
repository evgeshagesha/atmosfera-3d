const CTA_CSS = `
.eg-about-cta {
  padding: clamp(54px, 7vw, 88px) 16px;
  background:
    var(--eg-section-wash, radial-gradient(ellipse 80% 55% at 50% 0%, rgba(58, 66, 78, 0.14), transparent 58%)),
    var(--eg-bg, #0c0e12);
  color: #fff;
  text-align: center;
  font-family: var(--font-body, Manrope, sans-serif);
}
.eg-about-cta__inner {
  width: min(760px, 100%);
  margin: 0 auto;
}
.eg-about-cta h2 {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(38px, 5.5vw, 68px);
  line-height: 1;
  text-transform: uppercase;
}
.eg-about-cta p {
  margin: 16px 0 0;
  color: rgba(255, 255, 255, 0.66);
  font-size: 14px;
}
.eg-about-cta a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 46px;
  margin-top: 26px;
  padding: 11px 24px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 999px;
  color: #fff !important;
  background: transparent;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-decoration: none !important;
  text-transform: uppercase;
  transition: background 0.2s ease, color 0.2s ease;
}
.eg-about-cta a:hover {
  background: #fff;
  color: #090b0e !important;
}
.eg-about-cta a:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 4px;
}
`;

export default function AboutCtaSectionV2() {
  return (
    <section id="rec2038979781" className="eg-about-cta">
      <style dangerouslySetInnerHTML={{ __html: CTA_CSS }} />
      <div className="eg-about-cta__inner">
        <h2>Готовы начать системную работу?</h2>
        <p>Вернитесь к форматам работы и выберите подходящий маршрут.</p>
        <a href="#egmain-hero">
          Выбрать формат работы <span aria-hidden="true">↑</span>
        </a>
      </div>
    </section>
  );
}
