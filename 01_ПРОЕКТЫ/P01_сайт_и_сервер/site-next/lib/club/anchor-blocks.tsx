import ClubAnchorSection from "@/components/club/blocks/ClubAnchorSection";

function createAnchor(id: string, name: string) {
  return function AnchorBlock() {
    return <ClubAnchorSection id={id} name={name} />;
  };
}

export const CLUB_ANCHOR_BLOCKS = {
  rec1147865031: createAnchor("rec1147865031", "about"),
  rec1147865746: createAnchor("rec1147865746", "for"),
  rec1147866741: createAnchor("rec1147866741", "program"),
  rec1147868156: createAnchor("rec1147868156", "tariff"),
  rec1147868781: createAnchor("rec1147868781", "results"),
  rec1148278101: createAnchor("rec1148278101", "faq"),
  rec1147869746: createAnchor("rec1147869746", "contacts"),
};
