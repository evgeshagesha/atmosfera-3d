function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function AboutTrustSection() {
  return (
    <div
      id="rec2049333161"
      className="r t-rec t-rec_pt_90 t-rec_pt-res-480_0 t-rec_pb_90 t-rec_pb-res-480_0"
      style={{ paddingTop: "90px", paddingBottom: "90px", backgroundColor: "#000000" }}
      data-record-type="248"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <div className="t220">
        <div className="t-container">
          <div className="t-col t-col_8 t-prefix_2">
            <div
              className="t220__textwrapper"
              style={{ backgroundColor: "#000000", border: "0px solid #ffffff" }}
            >
              <div style={{ marginLeft: "-0px" }}>
                <div className="t220__title t-heading t-heading_sm" {...({ field: "title" } as Record<string, string>)}>
                  почему мне доверяют
                </div>
                <div {...({ field: "text" } as Record<string, string>)} className="t220__text t-text t-text_md">
                  <strong>Потому что мой подход вырос не из теории, а из реального пути</strong>
                  <br />
                  <br />
                  Из профессионального спорта
                  <br />
                  Из тяжёлых травм
                  <br />
                  Из собственного восстановления
                  <br />
                  Из медицинской базы
                  <br />
                  Из клинической практики
                  <br />
                  Из постоянного обучения
                  <br />
                  Из глубокой работы с движением, дыханием и телом человека
                  <br />
                  <br />
                  Я не говорю о теле со стороны. Я прошёл через опыт, в котором приходилось собирать себя
                  заново — <br />и именно поэтому смотрю на человека не по частям, а как на единую систему
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StyleTag css="#rec2049333161 .t220__title{color:#ffffff;}#rec2049333161 .t220__text{color:#ffffff;}" />
    </div>
  );
}
