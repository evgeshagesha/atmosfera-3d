function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

const YANDEX_RATING_CSS = `
#rec2191985091.eg-yandex-rating {
  background: #000;
  padding: 8px 16px 4px;
}
#rec2191985091 .eg-yandex-rating__wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}
#rec2191985091 .eg-yandex-rating__wrap iframe {
  display: block;
  max-width: 100%;
  border: 0;
}
@media (max-width: 420px) {
  #rec2191985091.eg-yandex-rating {
    padding-left: max(12px, env(safe-area-inset-left, 0px));
    padding-right: max(12px, env(safe-area-inset-right, 0px));
  }
}
`;

export default function YandexRatingSection() {
  return (
    <div
      id="rec2191985091"
      className="r t-rec t-rec_pb_0 eg-yandex-rating"
      style={{ paddingBottom: "0px", backgroundColor: "#000000" }}
      data-animationappear="off"
      data-record-type="131"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <StyleTag css={YANDEX_RATING_CSS} />
      <div className="eg-yandex-rating__wrap">
        <iframe
          src="https://yandex.ru/sprav/widget/rating-badge/182422254666?type=rating&theme=dark"
          width="150"
          height="50"
          title="Рейтинг на Яндекс Картах — Атмосфера 3D"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
