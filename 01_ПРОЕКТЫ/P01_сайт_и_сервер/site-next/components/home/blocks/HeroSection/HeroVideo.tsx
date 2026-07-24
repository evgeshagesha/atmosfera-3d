"use client";

import { useEffect } from "react";

/** Plays a single hero video when visible; respects reduced motion. */
export default function HeroVideo() {
  useEffect(() => {
    const stage = document.getElementById("egmainVideoStage");
    if (!stage) return;

    const video = stage.querySelector<HTMLVideoElement>("video");
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    const tryPlay = () => {
      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return null;
}
