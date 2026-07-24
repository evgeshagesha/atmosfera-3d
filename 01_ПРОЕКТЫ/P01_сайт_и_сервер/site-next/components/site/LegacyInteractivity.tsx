"use client";

import { useEffect } from "react";

import { initLegacyInteractivity } from "@/lib/site/legacy-interactivity";

type LegacyInteractivityProps = {
  route: string;
};

export default function LegacyInteractivity({ route }: LegacyInteractivityProps) {
  useEffect(() => {
    return initLegacyInteractivity(document, { enableSliders: route !== "" });
  }, [route]);

  return null;
}
