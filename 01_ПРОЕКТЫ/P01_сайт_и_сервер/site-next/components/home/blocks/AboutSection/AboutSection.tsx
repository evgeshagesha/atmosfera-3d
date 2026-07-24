const CHECK_ICON = "/assets/lib/icons/bullets/check3_thin.svg";
const ABOUT_IMAGE = "/assets/tild3762-6638-4261-a261-323734663565/IMG_1147.jpg";

const FEATURES = [
  {
    title: "Спортивный путь",
    descr: "профессиональный спортсмен,<br />более 20 лет опыта",
    titleField: "li_title__1187369133590",
    descrField: "li_descr__1187369133590",
    imgField: "li_img__1187369133590",
  },
  {
    title: "Медицинская база",
    descr: "имею медицинское образование, прохожу постоянные клинические практики",
    titleField: "li_title__1187369133591",
    descrField: "li_descr__1187369133591",
    imgField: "li_img__1187369133591",
  },
  {
    title: "комплексная работа с телом",
    descr:
      "Соединяю телесные практики, восстановление и функциональные тренировки, чтобы не просто снять напряжение, а дать телу опору, движение и устойчивый результат",
    titleField: "li_title__6187369133592",
    descrField: "li_descr__6187369133592",
    imgField: "li_img__6187369133592",
  },
  {
    title: "системный подход",
    descr:
      "Работаю не с симптомом изолированно, а с телом как с единой системой: ткани, дыхание, осанка, движение и постепенный переход к нагрузке",
    titleField: "li_title__1773701793440",
    descrField: "li_descr__1773701793440",
    imgField: "li_img__1773701793440",
  },
] as const;

function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

function FeatureIcon({ imgField }: { imgField: string }) {
  return (
    <img
      className="t1115__feature-img t-img"
      src={CHECK_ICON}
      {...({ imgfield: imgField } as Record<string, string>)}
      data-original={CHECK_ICON}
      data-color="#ffffff"
      style={{ marginTop: "3.5px" }}
      alt=""
    />
  );
}

export default function AboutSection() {
  return (
    <div
      id="rec2034125521"
      className="r t-rec t-rec_pt_60 t-rec_pt-res-480_0 t-rec_pb_60"
      style={{
        paddingTop: "60px",
        paddingBottom: "60px",
        backgroundImage: "linear-gradient(0turn,rgba(69,69,69,1) 0%,rgba(0,0,0,1) 100%)",
      }}
      data-record-type="1115"
      data-bg-color="linear-gradient(0turn,rgba(69,69,69,1) 0%,rgba(0,0,0,1) 100%)"
      suppressHydrationWarning
    >
      <div className="t1115">
        <div className="t-container t-container_flex t1115__container_vmiddle">
          <div className="t-col t-col_6">
            <div className="t1115__content">
              <div className="t1115__textwrapper t-align_left">
                <h2
                  className="t1115__title t-title t-title_xs t-animate"
                  {...({ field: "btitle" } as Record<string, string>)}
                  data-animate-style="zoomin"
                  data-animate-group="yes"
                >
                  обо мне
                </h2>
                <div
                  className="t1115__descr t-descr t-descr_xl"
                  {...({ field: "bdescr" } as Record<string, string>)}
                >
                  <strong>меня зовут евгений гошев,я Профессиональный спортсмен, </strong>
                  <br />
                  физический терапевт, реабилитолог, специалист по биомеханике и комплексной
                  работе с телом
                  <br />
                  <br />
                </div>
              </div>
              <ul role="list" className="t1115__features t1115__features_column-2">
                {FEATURES.map((feature) => (
                  <li
                    key={feature.titleField}
                    className="t1115__feature t1115__feature_icon-left t-item"
                  >
                    <div className="t1115__feature-icon-wrap">
                      <FeatureIcon imgField={feature.imgField} />
                    </div>
                    <div className="t1115__feature-text-wrap">
                      <h3
                        className="t1115__feature-title t-name t-name_md"
                        {...({ field: feature.titleField } as Record<string, string>)}
                      >
                        {feature.title}
                      </h3>
                      <div
                        className="t1115__feature-descr t-descr t-descr_sm"
                        {...({ field: feature.descrField } as Record<string, string>)}
                        dangerouslySetInnerHTML={{ __html: feature.descr }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="t1115__buttons">
                <a
                  className="t-btn t-btnflex t-btnflex_type_button t-btnflex_sm"
                  href="/about"
                >
                  <span className="t-btnflex__text">мой путь и философия</span>
                  <StyleTag css="#rec2034125521 .t-btnflex.t-btnflex_type_button {color:#ffffff;background-color:#898989;--border-width:0px;border-style:none !important;border-radius:12px;box-shadow:none !important;font-size:16px;transition-duration:0.2s;transition-property:background-color,color,border-color,box-shadow,opacity,transform,gap;transition-timing-function:ease-in-out;}" />
                </a>
                <a
                  className="t-btn t-btnflex t-btnflex_type_button2 t-btnflex_smd"
                  href="https://ru.wikipedia.org/wiki/%D0%93%D0%BE%D1%88%D0%B5%D0%B2,_%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B5%D0%B2%D0%B8%D1%87"
                  target="_blank"
                >
                  <span className="t-btnflex__text">википедия</span>
                  <StyleTag css="#rec2034125521 .t-btnflex.t-btnflex_type_button2 {color:#ffffff;--border-width:0px;border-style:none !important;box-shadow:none !important;font-size:20px;transition-duration:0.2s;transition-property:background-color,color,border-color,box-shadow,opacity,transform,gap;transition-timing-function:ease-in-out;}" />
                </a>
              </div>
            </div>
          </div>
          <div className="t-col t-col_6 t1115__col-bottom">
            <img
              className="t1115__image t-img"
              {...({ imgfield: "img5" } as Record<string, string>)}
              alt="Евгений Гошев — физический терапевт, Атмосфера 3D"
              src={ABOUT_IMAGE}
              data-original={ABOUT_IMAGE}
              loading="lazy"
              decoding="async"
              width={900}
              height={600}
            />
          </div>
        </div>
      </div>
      <StyleTag css="#rec2034125521 .t1115__uptitle{color:#f2f0ea;padding-bottom:10px;}#rec2034125521 .t1115__title{color:#f2f0ea;}#rec2034125521 .t1115__descr{color:#f2f0ea;}#rec2034125521 .t1115__feature-title{color:#f2f0ea;}#rec2034125521 .t1115__feature-descr{color:#b8bec4;}" />
      <StyleTag css="#rec2034125521 .t1115__image{border-radius:15px;}" />
    </div>
  );
}
