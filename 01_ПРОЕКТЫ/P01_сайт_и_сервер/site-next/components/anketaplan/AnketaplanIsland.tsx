"use client";

import { useEffect, useRef } from "react";

import { ANKETAPLAN_FORM_HTML } from "@/components/anketaplan/formHtml";
import { mountAnketaplan } from "@/components/anketaplan/runtime";

/**
 * One heavy client island: neon 12-chapter intake.
 * Markup is SoT-extracted HTML (mounted client-only to avoid SSR mismatch);
 * behaviour lives in runtime.ts.
 */
export default function AnketaplanIsland() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.innerHTML = ANKETAPLAN_FORM_HTML;
    const api = mountAnketaplan(root);
    return () => {
      api.destroy();
      root.innerHTML = "";
    };
  }, []);

  return <div className="anketaplan-root" ref={rootRef} />;
}
