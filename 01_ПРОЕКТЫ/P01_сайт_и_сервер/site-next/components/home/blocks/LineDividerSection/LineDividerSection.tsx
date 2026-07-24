export type LineDividerSectionProps = {
  id: string;
  className: string;
  paddingTop: string;
  paddingBottom: string;
  backgroundColor?: string;
};

function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function LineDividerSection({
  id,
  className,
  paddingTop,
  paddingBottom,
  backgroundColor = "#000000",
}: LineDividerSectionProps) {
  return (
    <div
      id={id}
      className={className}
      style={{
        paddingTop,
        paddingBottom,
        backgroundColor,
      }}
      data-record-type="363"
      data-bg-color={backgroundColor}
      suppressHydrationWarning
    >
      <div className="t029">
        <div className="t029__container t-container">
          <div className="t029__col t-col t-col_8">
            <div className="t029__linewrapper" style={{ opacity: 0.2 }}>
              <div
                className="t029__opacity t029__opacity_left"
                style={{
                  backgroundImage: "linear-gradient(to left, #ffffff, rgba(255,255,255,0))",
                }}
              />
              <div className="t-divider t029__line" style={{ background: "#ffffff" }} />
              <div
                className="t029__opacity t029__opacity_right"
                style={{
                  backgroundImage: "linear-gradient(to right, #ffffff, rgba(255,255,255,0))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <StyleTag css="" />
    </div>
  );
}
