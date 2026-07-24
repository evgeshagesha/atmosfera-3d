"use client";

import { useEffect } from "react";

import { initT994Slider } from "@/lib/site/sliders/t994-slider";

type ReviewsSliderProps = {
  targetId: string;
};

export default function ReviewsSlider({ targetId }: ReviewsSliderProps) {
  useEffect(() => {
    const root = document.getElementById(targetId);
    if (!root) return;
    return initT994Slider(root);
  }, [targetId]);

  return null;
}
