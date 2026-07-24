import type { AnchorHTMLAttributes } from "react";

type ClubAnchorSectionProps = {
  id: string;
  name: string;
};

export default function ClubAnchorSection({ id, name }: ClubAnchorSectionProps) {
  return (
    <div id={id} className="r t-rec" style={{}} data-record-type="215" suppressHydrationWarning>
      <a
        {...({ name } as AnchorHTMLAttributes<HTMLAnchorElement>)}
        style={{ fontSize: 0 }}
      />
    </div>
  );
}
