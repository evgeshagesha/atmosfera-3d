import LineDividerSection from "@/components/home/blocks/LineDividerSection";

type DividerConfig = {
  className: string;
  paddingTop: string;
  paddingBottom: string;
};

export function createLineDivider(id: string, config: DividerConfig) {
  return function LineDividerBlock() {
    return (
      <LineDividerSection
        id={id}
        className={config.className}
        paddingTop={config.paddingTop}
        paddingBottom={config.paddingBottom}
      />
    );
  };
}

const DIVIDER_ZERO = {
  className: "r t-rec t-rec_pt_0 t-rec_pt-res-480_0 t-rec_pb_0 t-rec_pb-res-480_0",
  paddingTop: "0px",
  paddingBottom: "0px",
} as const;

const DIVIDER_SIMPLE = {
  className: "r t-rec t-rec_pt_0 t-rec_pb_0",
  paddingTop: "0px",
  paddingBottom: "0px",
} as const;

const DIVIDER_TOP_15 = {
  className: "r t-rec t-rec_pt_0 t-rec_pt-res-480_15 t-rec_pb_0 t-rec_pb-res-480_0",
  paddingTop: "0px",
  paddingBottom: "0px",
} as const;

const DIVIDER_SPACED = {
  className: "r t-rec t-rec_pt_60 t-rec_pt-res-480_0 t-rec_pb_60 t-rec_pb-res-480_0",
  paddingTop: "60px",
  paddingBottom: "60px",
} as const;

export const ABOUT_LINE_DIVIDER_BLOCKS = {
  rec2040452621: createLineDivider("rec2040452621", {
    className: "r t-rec t-rec_pt_15 t-rec_pb_0",
    paddingTop: "15px",
    paddingBottom: "0px",
  }),
  rec2040463581: createLineDivider("rec2040463581", DIVIDER_TOP_15),
  rec2040528391: createLineDivider("rec2040528391", DIVIDER_SIMPLE),
  rec2042622411: createLineDivider("rec2042622411", DIVIDER_SPACED),
  rec2040552631: createLineDivider("rec2040552631", DIVIDER_SIMPLE),
  rec2040558301: createLineDivider("rec2040558301", DIVIDER_SPACED),
  rec2049012061: createLineDivider("rec2049012061", DIVIDER_SPACED),
  rec2050148451: createLineDivider("rec2050148451", DIVIDER_ZERO),
  rec2050150741: createLineDivider("rec2050150741", DIVIDER_ZERO),
  rec2050191101: createLineDivider("rec2050191101", DIVIDER_ZERO),
  rec2051657661: createLineDivider("rec2051657661", DIVIDER_SIMPLE),
};
