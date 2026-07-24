import HeroVideo from "./HeroVideo";
import { HERO_ARTBOARD_CSS, HERO_INNER_CSS } from "./styles";

function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function HeroSection() {
  return (
    <div
      id="rec2315596141"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="396"
      suppressHydrationWarning
    >
      <StyleTag css={HERO_ARTBOARD_CSS} />
      <div className="t396">
        <div
          className="t396__artboard"
          data-artboard-recid="2315596141"
          data-artboard-screens="320,480,640,960,1200"
          data-artboard-height="720"
          data-artboard-valign="center"
          data-artboard-upscale="grid"
          data-artboard-height-res-320="650"
        >
          <div className="t396__carrier" data-artboard-recid="2315596141" />
          <div className="t396__filter" data-artboard-recid="2315596141" />
          <div
            className="t396__elem tn-elem tn-elem__23155961411779867368841"
            data-elem-id="1779867368841"
            data-elem-type="html"
            data-field-top-value="20"
            data-field-left-value="-50"
            data-field-height-value="676"
            data-field-width-value="1308"
            data-field-axisy-value="top"
            data-field-axisx-value="left"
            data-field-container-value="grid"
            data-field-topunits-value="px"
            data-field-leftunits-value="px"
            data-field-heightunits-value="px"
            data-field-widthunits-value="px"
            data-field-top-res-320-value="0"
            data-field-left-res-320-value="-55"
            data-field-height-res-320-value="716"
            data-field-width-res-320-value="431"
          >
            <div className="tn-atom tn-atom__html">
              <StyleTag css={HERO_INNER_CSS} />
              <section
                id="egmain-hero"
                aria-label="Евгений Гошев — терапия движением, Атмосфера 3D"
              >
                <div className="egmain-frame">
                  <div className="egmain-video-bg" id="egmainVideoStage">
                    <video
                      muted
                      playsInline
                      preload="none"
                      autoPlay
                      loop
                      poster="/assets/tild6532-3134-4232-b861-366363656430/IMG_1547_2.PNG"
                      className="is-active"
                    >
                      <source
                        src="/assets/vide3263-3562-4936-b736-613836383361/video_1_vertical.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                  <div className="egmain-video-overlay" />
                  <div className="egmain-container">
                    <div className="egmain-content">
                      <span className="egmain-brandmark">
                        · Евгений Гошев · Физический терапевт ·
                      </span>
                      <h1 className="egmain-title">
                        Терапия движением —{" "}
                        <span className="egmain-title-accent">
                          меньше боли и скованности, больше свободы и силы
                        </span>
                      </h1>
                      <p className="egmain-subtitle">
                        Помогаю определить, что мешает телу двигаться свободно, восстановить
                        подвижность и постепенно сделать его сильнее через диагностику, дыхание,
                        телесные практики и функциональные тренировки.
                      </p>
                      <div className="egmain-tags">
                        <span className="egmain-tag">Личный приём в Москве</span>
                        <span className="egmain-tag egmain-tag-accent">Более 1000 клиентов</span>
                        <span className="egmain-tag">Москва и онлайн</span>
                      </div>
                      <div className="egmain-cta-row">
                        <a href="/anketa" className="egmain-btn egmain-btn-primary">
                          Записаться на личный приём{" "}
                          <span className="egmain-btn-arrow">→</span>
                        </a>
                        <a href="#online" className="egmain-btn">
                          Выбрать онлайн-формат от 684 ₽{" "}
                          <span className="egmain-btn-arrow">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <HeroVideo />
    </div>
  );
}
