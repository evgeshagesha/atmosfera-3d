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
  backgroundColor = "transparent",
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
      data-bg-color="transparent"
      suppressHydrationWarning
    >
      <div className="t029">
        <div className="t029__container t-container">
          <div className="t029__col t-col t-col_8">
            <div className="t029__linewrapper" style={{ opacity: 0.14 }}>
              <div
                className="t029__opacity t029__opacity_left"
                style={{
                  backgroundImage:
                    "linear-gradient(to left, rgba(255,255,255,0.55), rgba(255,255,255,0))",
                }}
              />
              <div
                className="t-divider t029__line"
                style={{ background: "rgba(255,255,255,0.55)" }}
              />
              <div
                className="t029__opacity t029__opacity_right"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.55), rgba(255,255,255,0))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <StyleTag
        css={`
          #${id} {
            background: transparent !important;
          }
        `}
      />
    </div>
  );
}
