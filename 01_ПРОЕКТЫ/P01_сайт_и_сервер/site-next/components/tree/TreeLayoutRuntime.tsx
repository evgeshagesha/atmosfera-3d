"use client";

import { useEffect } from "react";

const REC_ID = "2252402801";
const ELEM_ID = "1778921161976";

function syncTreeHeights() {
  const root = document.getElementById("egoshev-links-page");
  const rec = document.getElementById(`rec${REC_ID}`);
  if (!root || !rec) return;

  const contentHeight = root.offsetHeight + 48;
  const artboardHeight = Math.max(1200, contentHeight + 24);

  for (const selector of [".t396__artboard", ".t396__filter", ".t396__carrier"]) {
    const node = rec.querySelector(selector) as HTMLElement | null;
    if (!node) continue;
    node.style.setProperty("height", `${artboardHeight}px`, "important");
    node.style.setProperty("overflow", "visible", "important");
  }

  const elem = rec.querySelector(`.tn-elem[data-elem-id="${ELEM_ID}"]`) as HTMLElement | null;
  if (elem) {
    elem.style.setProperty("height", `${contentHeight}px`, "important");
    elem.style.setProperty("overflow", "visible", "important");
  }

  const atom = elem?.querySelector(".tn-atom") as HTMLElement | null;
  if (atom) {
    atom.style.setProperty("height", "auto", "important");
    atom.style.setProperty("overflow", "visible", "important");
  }

  for (const selector of [".egoshev-social", ".egoshev-legal", ".egoshev-footer"]) {
    const node = root.querySelector(selector) as HTMLElement | null;
    if (!node) continue;
    node.style.setProperty("opacity", "1", "important");
    node.style.setProperty("visibility", "visible", "important");
  }
}

/** Keeps /tree tall enough for the social block after artboard init runs. */
export default function TreeLayoutRuntime() {
  useEffect(() => {
    const run = () => syncTreeHeights();

    run();
    const delays = [80, 400, 1200, 2500, 4000].map((ms) => window.setTimeout(run, ms));
    window.addEventListener("resize", run);

    const root = document.getElementById("egoshev-links-page");
    const resizeObserver =
      root && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(run)
        : null;
    if (root && resizeObserver) resizeObserver.observe(root);

    return () => {
      for (const id of delays) window.clearTimeout(id);
      window.removeEventListener("resize", run);
      resizeObserver?.disconnect();
    };
  }, []);

  return null;
}
