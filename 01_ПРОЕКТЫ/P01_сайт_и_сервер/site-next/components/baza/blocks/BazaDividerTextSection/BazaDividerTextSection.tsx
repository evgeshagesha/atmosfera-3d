function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function BazaDividerTextSection() {
  return (
    <div
      id="rec2173612661"
      className="r t-rec t-rec_pt_0 t-rec_pt-res-480_15 t-rec_pb_0 t-rec_pb-res-480_15"
      style={{ paddingTop: "0px", paddingBottom: "0px", backgroundColor: "#000000" }}
      data-record-type="171"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <div className="t157">
        <div className="t-container">
          <div className="t-col t-col_12">
            <div className="t157__wrapper t-animate" data-animate-style="fadein">
              <div className="t-divider" style={{ backgroundColor: "#ffffff" }} />
              <div {...({ field: "text" } as Record<string, string>)} className="t157__text t-text t-text_sm">
                <div style={{ fontSize: "16px" }} data-customstyle="yes">
                  И главное — вы перестанете гадать,что происходит с вашим телом.
                  <br />
                  Получите систему, в которой всё понятно: с чего начать, что делать, чего ожидать
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StyleTag css="#rec2173612661 .t157__text{font-size:20px;color:#ffffff;font-family:var(--t-headline-font,Arial);font-weight:600;text-shadow:0px 0px 1px rgba(0,0,0,0.3);opacity:1;}" />
    </div>
  );
}
