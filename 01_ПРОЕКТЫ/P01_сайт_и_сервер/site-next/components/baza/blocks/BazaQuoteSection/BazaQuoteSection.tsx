function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function BazaQuoteSection() {
  return (
    <div
      id="rec2174108951"
      className="r t-rec t-rec_pt_0 t-rec_pt-res-480_15 t-rec_pb_0 t-rec_pb-res-480_15"
      style={{ paddingTop: "0px", paddingBottom: "0px", backgroundColor: "#000000" }}
      data-record-type="795"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <div className="t795">
        <div className="t-container t-align_left">
          <div className="t-col t-col_11">
            <div className="t795__title t-title t-title_xs" {...({ field: "title" } as Record<string, string>)}>
              <p style={{ textAlign: "left" }}>
                <span
                  style={{
                    color: "inherit",
                    backgroundImage: "linear-gradient(0turn, rgb(126, 126, 126) 0%, rgb(255, 255, 255) 100%)",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  И каждый раз внутри
                </span>
              </p>
              <p style={{ textAlign: "left" }}>
                <span
                  style={{
                    color: "inherit",
                    backgroundImage: "linear-gradient(0turn, rgb(126, 126, 126) 0%, rgb(255, 255, 255) 100%)",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  звучало одно:
                </span>
              </p>
            </div>
            <div className="t795__descr t-descr t-descr_xl" {...({ field: "descr" } as Record<string, string>)}>
              <p style={{ textAlign: "left" }}>«Может быть, я просто старею?»</p>
              <p style={{ textAlign: "left" }}>«может быть, со мной что-то не так?»</p>
              <p style={{ textAlign: "left" }}>«может быть, мне просто не повезло с телом»?</p>
            </div>
          </div>
        </div>
      </div>
      <StyleTag css="#rec2174108951 .t795__title{color:#ffffff;}#rec2174108951 .t795__descr{font-size:18px;color:#ffffff;}" />
    </div>
  );
}
