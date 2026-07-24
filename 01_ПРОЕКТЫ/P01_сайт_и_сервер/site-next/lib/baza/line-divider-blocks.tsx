import LineDividerSection from "@/components/home/blocks/LineDividerSection";

type DividerConfig = {
  className: string;
  paddingTop: string;
  paddingBottom: string;
  backgroundColor?: string;
};

export function createLineDivider(id: string, config: DividerConfig) {
  return function LineDividerBlock() {
    return (
      <LineDividerSection
        id={id}
        className={config.className}
        paddingTop={config.paddingTop}
        paddingBottom={config.paddingBottom}
        backgroundColor={config.backgroundColor}
      />
    );
  };
}

const DIVIDER_ZERO = {
  className: "r t-rec t-rec_pt_0 t-rec_pt-res-480_0 t-rec_pb_0 t-rec_pb-res-480_0",
  paddingTop: "0px",
  paddingBottom: "0px",
} as const;

const DIVIDER_SPACED = {
  className: "r t-rec t-rec_pt_60 t-rec_pt-res-480_0 t-rec_pb_60 t-rec_pb-res-480_0",
  paddingTop: "60px",
  paddingBottom: "60px",
} as const;

export const BAZA_LINE_DIVIDER_BLOCKS = {
  rec2073587741: createLineDivider("rec2073587741", DIVIDER_ZERO),
  rec2181588291: createLineDivider("rec2181588291", DIVIDER_ZERO),
  rec2073587761: createLineDivider("rec2073587761", DIVIDER_ZERO),
  rec2174398701: createLineDivider("rec2174398701", DIVIDER_ZERO),
  rec2174118901: createLineDivider("rec2174118901", DIVIDER_ZERO),
  rec2174119881: createLineDivider("rec2174119881", DIVIDER_ZERO),
  rec2174487621: createLineDivider("rec2174487621", DIVIDER_ZERO),
  rec2175216811: createLineDivider("rec2175216811", DIVIDER_ZERO),
  rec2177883461: createLineDivider("rec2177883461", {
    ...DIVIDER_ZERO,
    backgroundColor: "#555555",
  }),
  rec2178894311: createLineDivider("rec2178894311", DIVIDER_SPACED),
  rec2073587781: createLineDivider("rec2073587781", DIVIDER_ZERO),
};
