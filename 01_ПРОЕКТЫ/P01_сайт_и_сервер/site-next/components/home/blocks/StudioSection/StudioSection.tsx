const BG_IMAGE = "/assets/eg/studio-atmosfera.png";

function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function StudioSection() {
  return (
    <div
      id="rec2038650181"
      className="r t-rec t-rec_pt_0"
      style={{ paddingTop: "0px" }}
      data-record-type="581"
      suppressHydrationWarning
    >
      <div
        className="t-cover"
        id="recorddiv2038650181"
        {...({ bgimgfield: "img" } as Record<string, string>)}
        style={{
          height: "700px",
          backgroundImage: `url('${BG_IMAGE}')`,
        }}
      >
        <div
          className="t-cover__carrier"
          id="coverCarry2038650181"
          data-content-cover-id="2038650181"
          data-content-cover-bg={BG_IMAGE}
          data-display-changed="true"
          data-content-cover-height="700px"
          data-content-cover-parallax="dynamic"
          data-content-use-image-for-mobile-cover=""
          style={{
            height: "700px",
            backgroundAttachment: "scroll",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          itemScope
          itemType="http://schema.org/ImageObject"
        >
          <meta itemProp="image" content={BG_IMAGE} />
        </div>
        <div
          className="t-cover__filter"
          style={{
            height: "700px",
            backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.20) 100%)",
          }}
        />
        <div className="t-container">
          <div className="t-col t-col_12 t-align_left">
            <div
              className="t-cover__wrapper t-valign_middle"
              style={{ height: "700px", position: "relative", zIndex: 1 }}
            >
              <div className="t581">
                <div data-hook-content="covercontent">
                  <div className="t581__wrapper t-align_left">
                    <div className="t581__title t-title t-title_sm" {...({ field: "title" } as Record<string, string>)}>
                      Wellness студия атмосфера
                    </div>
                    <div className="t581__descr t-descr t-descr_xl" {...({ field: "descr" } as Record<string, string>)}>
                      Здесь сочетаются функциональные тренировки, восстановительные практики,
                      <br />
                      телесная работа, правИло, массаж и системный подход к осанке, движению и дыханию. А
                      также чайные церемонии
                      <br />
                      <br />
                      Мы не работаем с телом по частям — мы собираем его в единую, здоровую и
                      функциональную систему
                    </div>
                    <div className="t581__buttons">
                      <div className="t581__buttons-wrapper">
                        <div className="t581__buttons-flex">
                          <a
                            className="t-btn t-btnflex t-btnflex_type_button t-btnflex_xl"
                            href="https://yandex.ru/maps/-/CPDcbJ6~"
                            target="_blank"
                          >
                            <span className="t-btnflex__text">Подробнее</span>
                            <StyleTag css="#rec2038650181 .t-btnflex.t-btnflex_type_button {color:#000000;background-color:#fefefe;--border-width:0px;border-style:none !important;border-radius:14px;box-shadow:none !important;transition-duration:0.2s;transition-property:background-color,color,border-color,box-shadow,opacity,transform,gap;transition-timing-function:ease-in-out;}" />
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
      <StyleTag
        css={`
#rec2038650181 .t581__title{padding-top:50px;font-family:var(--font-display,Oswald,sans-serif);text-transform:uppercase;}
#rec2038650181 .t581__descr{font-size:14px;max-width:600px;font-family:var(--font-body,Manrope,sans-serif);font-weight:400;}
#rec2038650181 .t-btnflex{min-height:0 !important;height:auto !important;padding:12px 24px !important;font-size:13px !important;border-radius:999px !important;}
#rec2038650181 .t-cover__filter{background-image:linear-gradient(to right,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.5) 55%,rgba(0,0,0,0.25) 100%) !important;}
@media screen and (max-width:960px){
  #rec2038650181 .t-cover,
  #rec2038650181 .t-cover__carrier,
  #rec2038650181 .t-cover__filter,
  #rec2038650181 .t-cover__wrapper{height:600px !important;}
  #rec2038650181 .t-cover__carrier{background-position:center !important;background-size:cover !important;background-attachment:scroll !important;}
  #rec2038650181 .t-cover__filter{background-image:linear-gradient(to bottom,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.65) 55%,rgba(0,0,0,0.85) 100%) !important;}
  #rec2038650181 .t581__title{padding-top:0;font-size:26px;}
}
@media screen and (max-width:480px){
  #rec2038650181 .t-cover,
  #rec2038650181 .t-cover__carrier,
  #rec2038650181 .t-cover__filter,
  #rec2038650181 .t-cover__wrapper{height:560px !important;}
  #rec2038650181 .t581__descr{font-size:13.5px;}
}
`}
      />
    </div>
  );
}
