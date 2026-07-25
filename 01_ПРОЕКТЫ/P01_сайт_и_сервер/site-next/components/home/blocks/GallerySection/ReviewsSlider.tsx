"use client";

import { useEffect } from "react";

/** One-at-a-time horizontal snap carousel for review cards. */
export default function ReviewsSlider() {
  useEffect(() => {
    const root = document.getElementById("rec2224175751");
    const track = document.getElementById("eg-reviews-v2-track");
    if (!root || !track) return;

    const items = Array.from(
      track.querySelectorAll<HTMLElement>(".eg-review-card"),
    );
    const prevBtn = root.querySelector<HTMLButtonElement>("[data-reviews-prev]");
    const nextBtn = root.querySelector<HTMLButtonElement>("[data-reviews-next]");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scrollByItem = (direction: -1 | 1) => {
      const first = items[0];
      if (!first) return;
      const styles = getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "12") || 12;
      const step = first.offsetWidth + gap;
      track.scrollBy({
        left: direction * step,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    };

    const onPrev = (event: Event) => {
      event.preventDefault();
      scrollByItem(-1);
    };
    const onNext = (event: Event) => {
      event.preventDefault();
      scrollByItem(1);
    };

    prevBtn?.addEventListener("click", onPrev);
    nextBtn?.addEventListener("click", onNext);

    return () => {
      prevBtn?.removeEventListener("click", onPrev);
      nextBtn?.removeEventListener("click", onNext);
    };
  }, []);

  return null;
}
