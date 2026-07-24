function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function AboutPrefaceSection() {
  return (
    <div
      id="rec2046766271"
      className="r t-rec t-rec_pt_45 t-rec_pb_45"
      style={{ paddingTop: "45px", paddingBottom: "45px", backgroundColor: "#000000" }}
      data-record-type="127"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <div className="t119">
        <div className="t-container">
          <div className="t-col t-col_8 t-prefix_2">
            <div className="t119__preface t-descr" {...({ field: "text" } as Record<string, string>)}>
              Этот опыт стал для меня очень важным. Он дал мне не теоретическое, а личное понимание того,
              насколько сильным может быть тело, если не работать с ним хаотично, а понимать его механику,
              восстанавливать движение, дыхание, контроль и опору
              <br />
              <br />
              Именно через этот опыт я окончательно убедился: тело можно собрать заново, если работать с
              ним глубоко и последовательно
            </div>
          </div>
        </div>
      </div>
      <StyleTag css="#rec2046766271 .t119__preface{opacity:1;color:#ffffff;}" />
    </div>
  );
}
