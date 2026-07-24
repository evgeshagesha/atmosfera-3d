import ClubAnchorSection from "@/components/club/blocks/ClubAnchorSection";

function createAnchor(id: string, name: string) {
  return function AnchorBlock() {
    return <ClubAnchorSection id={id} name={name} />;
  };
}

export const BAZA_ANCHOR_BLOCKS = {
  rec2181761871: createAnchor("rec2181761871", "otzyvy"),
  rec2178019161: createAnchor("rec2178019161", "pay"),
};
