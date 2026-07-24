function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

const SCROLLBAR_CSS =
  "::-webkit-scrollbar {width:15px;height:15px;background-color:#ffffff;}::-webkit-scrollbar-track {background-color:#ffffff;}::-webkit-scrollbar-thumb {background-color:#3757f9;border-radius:50px;border:0px solid #ffffff;background-clip:padding-box;}::-webkit-scrollbar-thumb:hover {background-color:#3757f9;}@supports (-moz-appearance:none) {:root,body,.allrecords * {scrollbar-width:auto;scrollbar-color:#3757f9 #ffffff;}}:root,body,.allrecords * {-ms-scrollbar-track-color:#ffffff;-ms-scrollbar-highlight-color:#ffffff;-ms-scrollbar-shadow-color:#ffffff;-ms-scrollbar-3dlight-color:#ffffff;-ms-scrollbar-darkshadow-color:#ffffff;-ms-scrollbar-face-color:#3757f9;}";

export default function ClubScrollbarStyles() {
  return (
    <div
      id="rec1147894846"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="1084"
      suppressHydrationWarning
    >
      <StyleTag css={SCROLLBAR_CSS} />
    </div>
  );
}
