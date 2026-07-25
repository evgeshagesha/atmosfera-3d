import LineDividerSection from "@/components/home/blocks/LineDividerSection";

const DIVIDER_A = {
  className: "r t-rec t-rec_pt_0 t-rec_pt-res-480_0 t-rec_pb_0 t-rec_pb-res-480_0",
  paddingTop: "0px",
  paddingBottom: "0px",
} as const;

const DIVIDER_B = {
  className: "r t-rec t-rec_pt_0 t-rec_pb_0",
  paddingTop: "0px",
  paddingBottom: "0px",
} as const;

const DIVIDER_D = {
  className: "r t-rec t-rec_pt_0 t-rec_pt-res-480_15 t-rec_pb_0 t-rec_pb-res-480_0",
  paddingTop: "0px",
  paddingBottom: "0px",
} as const;

function createLineDivider(
  id: string,
  config: { className: string; paddingTop: string; paddingBottom: string }
) {
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

export const LINE_DIVIDER_BLOCKS = {
  rec2195114021: createLineDivider("rec2195114021", DIVIDER_A),
  rec2192006421: createLineDivider("rec2192006421", DIVIDER_B),
  rec2315696391: createLineDivider("rec2315696391", DIVIDER_B),
  rec2191970671: createLineDivider("rec2191970671", DIVIDER_A),
  rec2197350981: createLineDivider("rec2197350981", DIVIDER_A),
  rec2039098741: createLineDivider("rec2039098741", DIVIDER_A),
  rec2039338091: createLineDivider("rec2039338091", DIVIDER_B),
  rec2039587311: createLineDivider("rec2039587311", DIVIDER_D),
};
