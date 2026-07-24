"use client";

import { useEffect } from "react";

type T1073HeightsProps = {
  blockId: string;
};

/** Sets responsive aspect ratio padding on t1073 background images. */
export default function T1073Heights({ blockId }: T1073HeightsProps) {
  useEffect(() => {
    const root = document.getElementById(blockId);
    if (!root) return;

    root.querySelectorAll<HTMLElement>(".t1073__bgimg").forEach((bgImage) => {
      const width = Number(bgImage.getAttribute("data-image-width"));
      const height = Number(bgImage.getAttribute("data-image-height"));
      if (!width || !height) return;
      bgImage.style.paddingBottom = `${(height / width) * 100}%`;
    });
  }, [blockId]);

  return null;
}
