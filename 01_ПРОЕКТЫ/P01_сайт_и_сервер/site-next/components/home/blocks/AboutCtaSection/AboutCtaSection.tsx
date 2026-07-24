const BG_IMAGE =
  "/assets/tild6532-3134-4232-b861-366363656430/IMG_1547_2.PNG";

function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function AboutCtaSection() {
  return (
    <div id="rec2038979781" className="r t-rec" style={{}} data-record-type="581" suppressHydrationWarning>
      <div
        className="t-cover"
        id="recorddiv2038979781"
        {...({ bgimgfield: "img" } as Record<string, string>)}
        style={{
          height: "560px",
          backgroundImage: `url('${BG_IMAGE}')`,
        }}
      >
        <div
          className="t-cover__carrier"
          id="coverCarry2038979781"
          data-content-cover-id="2038979781"
          data-content-cover-bg={BG_IMAGE}
          data-display-changed="true"
          data-content-cover-height="560px"
          data-content-cover-parallax=""
          data-content-use-image-for-mobile-cover=""
          style={{ height: "560px", backgroundAttachment: "scroll" }}
          itemScope
          itemType="http://schema.org/ImageObject"
        >
          <meta itemProp="image" content={BG_IMAGE} />
        </div>
        <div
          className="t-cover__filter"
          style={{
            height: "560px",
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.90), rgba(0,0,0,0.80))",
          }}
        />
        <div className="t-container">
          <div className="t-col t-col_10 t-prefix_1 t-align_center">
            <div
              className="t-cover__wrapper t-valign_middle"
              style={{ height: "560px", position: "relative", zIndex: 1 }}
            >
              <div className="t581">
                <div data-hook-content="covercontent">
                  <div className="t581__wrapper t-align_center">
                    <div
                      className="t581__title t-title t-title_sm t-margin_auto"
                      {...({ field: "title" } as Record<string, string>)}
                    >
                      готовы начать <br />
                      системную работу?
                    </div>
                    <div
                      className="t581__descr t-descr t-descr_xl t-margin_auto"
                      {...({ field: "descr" } as Record<string, string>)}
                    >
                      выберите удобный формат
                    </div>
                    <div className="t581__buttons">
                      <div className="t581__buttons-wrapper t-margin_auto">
                        <div className="t581__buttons-flex">
                          <a
                            className="t-btn t-btnflex t-btnflex_type_button t-btnflex_md"
                            href="/anketa"
                          >
                            <span className="t-btnflex__text">Заполнить анкету</span>
                            <StyleTag css="#rec2038979781 .t-btnflex.t-btnflex_type_button {color:#000;background-color:#ffffff;border-style:solid !important;border-color:#000000 !important;--border-width:1px;border-radius:100px;box-shadow:none !important;transition-duration:0.2s;transition-property:background-color,color,border-color,box-shadow,opacity,transform,gap;transition-timing-function:ease-in-out;}#rec2038979781 .t-btnflex.t-btnflex_type_button .t-btnflex__text,#rec2038979781 .t-btnflex.t-btnflex_type_button .t-btntext__text {-webkit-text-fill-color:transparent;background-image:linear-gradient(0turn,rgba(0,0,0,1) 12%,rgba(11,13,15,1) 100%);-webkit-background-clip:text;background-clip:text;transition:inherit;}" />
                          </a>
                          <a
                            className="t-btn t-btnflex t-btnflex_type_button2 t-btnflex_md"
                            href="#online"
                          >
                            <span className="t-btnflex__text">выбрать формат работы</span>
                            <StyleTag css="#rec2038979781 .t-btnflex.t-btnflex_type_button2 {color:#ffffff;border-style:solid !important;border-color:#ffffff !important;--border-width:3px;border-radius:100px;box-shadow:none !important;transition-duration:0.2s;transition-property:background-color,color,border-color,box-shadow,opacity,transform,gap;transition-timing-function:ease-in-out;}" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StyleTag css="#rec2038979781 .t581__descr{max-width:600px;}" />
    </div>
  );
}
