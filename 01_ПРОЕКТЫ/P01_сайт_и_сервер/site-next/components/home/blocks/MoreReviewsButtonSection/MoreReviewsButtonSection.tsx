function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

const MORE_REVIEWS_CSS = `
#rec2097875471.eg-more-reviews {
  background: #000;
  padding: 12px max(16px, env(safe-area-inset-right, 0px)) 28px max(16px, env(safe-area-inset-left, 0px));
}
#rec2097875471 .eg-more-reviews__row {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}
#rec2097875471 .eg-more-reviews__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 14px 28px;
  border-radius: 999px;
  background: #fff;
  color: #111 !important;
  font-family: Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none !important;
  border: 1px solid #fff;
  box-shadow: 0 10px 28px -14px rgba(0, 0, 0, 0.65);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
#rec2097875471 .eg-more-reviews__btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 32px -12px rgba(0, 0, 0, 0.75);
  color: #000 !important;
}
@media (max-width: 420px) {
  #rec2097875471 .eg-more-reviews__btn {
    width: 100%;
    max-width: 360px;
  }
}
@media (prefers-reduced-motion: reduce) {
  #rec2097875471 .eg-more-reviews__btn {
    transition: none !important;
  }
}
`;

export default function MoreReviewsButtonSection() {
  return (
    <div
      id="rec2097875471"
      className="r t-rec eg-more-reviews"
      style={{ backgroundColor: "#000000" }}
      data-record-type="1331"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <StyleTag css={MORE_REVIEWS_CSS} />
      <div className="eg-more-reviews__row">
        <a
          className="eg-more-reviews__btn"
          href="https://yandex.ru/maps/org/atmosfera_3d/182422254666?si=pv2az98d3qb5djzz748n8cv1vc"
          target="_blank"
          rel="noopener noreferrer"
        >
          Больше отзывов
        </a>
      </div>
    </div>
  );
}
