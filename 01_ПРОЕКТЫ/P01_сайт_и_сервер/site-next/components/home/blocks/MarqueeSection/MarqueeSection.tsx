import MarqueeAnimation from "./MarqueeAnimation";
import { MARQUEE_BG_IMAGE, MARQUEE_STYLES, MARQUEE_TEXT } from "./styles";

function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function MarqueeSection() {
  return (
    <div
      id="rec2191858991"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="1003"
      suppressHydrationWarning
    >
      <div className="t1003" data-display-changed="true" style={{ minHeight: "35px" }}>
        <div className="t1003__outer">
          <div
            className="t1003__wrapper"
            style={{}}
            data-marquee-speed="4"
            data-auto-correct-mobile-width="false"
          >
            <div
              className="t1003__content-wrapper"
              style={{ backgroundColor: "var(--eg-bg, #0c0e12)", height: "35px" }}
              data-auto-correct-mobile-width="false"
            >
              <div className="t1003__content" data-auto-correct-mobile-width="false">
                <div className="t1003__item" data-auto-correct-mobile-width="false">
                  <div className="t-text t-text_md t1003__item-txt">{MARQUEE_TEXT}</div>
                  <div
                    className="t1003__bgimg t-bgimg loaded"
                    {...({ bgimgfield: "img" } as Record<string, string>)}
                    data-original={MARQUEE_BG_IMAGE}
                    style={{
                      backgroundImage: `url('${MARQUEE_BG_IMAGE}')`,
                      width: "0px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StyleTag css={MARQUEE_STYLES} />
      <MarqueeAnimation />
    </div>
  );
}
