function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

const VSL_CSS = `.vsl-block,.vsl-block * { box-sizing: border-box; }
.vsl-block input,.vsl-block textarea,.vsl-block select { font: inherit; }
.vsl-block { position: relative; background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 10%); padding: 80px 2px 60px; overflow: hidden; display: flex; align-items: center; }
.vsl-block__container { max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center; color: #1a2b4c; font-family: var(--t-headline-font); }
.vsl-block__title { font-size: clamp(32px, 5vw, 56px); font-weight: 700; line-height: 1.15; margin: 0 0 24px; color: #1a2b4c; }
.vsl-block__subtitle { font-family: var(--t-text-font); font-size: 18px; color: #4a5a7a; max-width: 680px; margin: 0 auto 48px; line-height: 1.6; }
.vsl-block__video-wrapper { position: relative; width: 100%; max-width: 960px; margin: 0 auto; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(26, 43, 76, 0.15), 0 4px 12px rgba(26, 43, 76, 0.1); background: #ffffff; }
@media (max-width: 768px) { .vsl-block { padding: 60px 15px 40px; } }
@media (max-width: 48px) { .vsl-block { padding: 50px 15px 30px; } .vsl-block__title { font-size: 28px; } .vsl-block__subtitle { font-size: 16px; } }`;

export default function ClubVslSection() {
  return (
    <div id="rec2280559881" className="r t-rec" style={{}} data-record-type="1370" suppressHydrationWarning>
      <div className="t1370">
        <div className="vsl-block">
          <StyleTag css={VSL_CSS} />
          <div className="vsl-block__container">
            <h1 className="vsl-block__title">Как построить идеальное тело?</h1>
            <p className="vsl-block__subtitle">
              Узнайте проверенную систему, которая помогла тысячам людей достичь своих целей без голодовок
              и изнурительных тренировок
            </p>
            <div className="vsl-block__video-wrapper">
              <div style={{ position: "relative", paddingTop: "56.25%", width: "100%" }}>
                <iframe
                  src="https://kinescope.io/embed/gp6KPeZiLXJtSBo4NMBR1u"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                  frameBorder="0"
                  allowFullScreen
                  style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
                  title="Как построить идеальное тело?"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
