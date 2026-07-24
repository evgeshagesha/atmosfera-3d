const IMAGE = "/assets/tild3266-6135-4235-a166-393334646261/LW7_5560.jpg";

function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function AboutIntroSection() {
  return (
    <div
      id="rec2039710061"
      className="r t-rec t-rec_pt_15 t-rec_pt-res-480_15 t-rec_pb_15 t-rec_pb-res-480_45"
      style={{ paddingTop: "15px", paddingBottom: "15px", backgroundColor: "#020202" }}
      data-record-type="544"
      data-bg-color="#020202"
      suppressHydrationWarning
    >
      <div style={{ width: 0, height: 0, overflow: "hidden" }}>
        <div
          className="t544__sizer t-col t-col_5"
          data-auto-correct-mobile-width="false"
          style={{ height: "560px" }}
        />
      </div>
      <div className="t544">
        <div className="t-container">
          <div className="t544__top t544__col t-col t-col_7">
            <div className="t544__textwrapper t-align_left" style={{ height: "560px" }}>
              <div className="t544__content t-valign_middle">
                <div className="t544__title t-heading t-heading_xs" {...({ field: "title" } as Record<string, string>)}>
                  обо мне
                </div>
                <div className="t544__descr t-descr t-descr_xs" {...({ field: "descr" } as Record<string, string>)}>
                  меня зовут евгений гошев
                </div>
                <div className="t-divider t544__line" style={{ backgroundColor: "#ffffff" }} />
                <div className="t544__text t-text t-text_sm" {...({ field: "text" } as Record<string, string>)}>
                  Я — профессиональный спортсмен, физический терапевт и специалист по комплексной работе с
                  телом. Мой подход вырос из спорта, личного опыта травм и восстановления, медицинского
                  образования, клинической практики и постоянного глубокого изучения того, как на самом деле
                  устроено тело человека
                  <br />
                  <br />
                  Сегодня я работаю на стыке движения, дыхания, телесных практик и функциональной силы,
                  помогая человеку не просто снять симптом, а вернуть телу опору, свободу, устойчивость и
                  живую связь с собой
                </div>
              </div>
            </div>
          </div>
          <div className="t544__col t-col t-col_5">
            <div
              className="t544__blockimg t-bgimg"
              {...({ bgimgfield: "img" } as Record<string, string>)}
              data-original={IMAGE}
              style={{ backgroundImage: `url('${IMAGE}')`, height: "560px" }}
              itemScope
              itemType="http://schema.org/ImageObject"
            >
              <meta itemProp="image" content={IMAGE} />
            </div>
          </div>
        </div>
      </div>
      <StyleTag css="#rec2039710061 .t544__title{color:#FFFFFF;}@media screen and (min-width:900px){#rec2039710061 .t544__title{font-size:36px;}}#rec2039710061 .t544__descr{color:#FFFFFF;}#rec2039710061 .t544__text{color:#FFFFFF;}" />
      <StyleTag css="#rec2039710061 .t544__blockimg{border-radius:15px;}" />
    </div>
  );
}
