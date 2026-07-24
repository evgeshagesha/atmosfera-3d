"use client";

import { useEffect } from "react";

/** Horizontal snap carousel for review screenshots + scroll reveal. */
export default function GallerySlider() {
  useEffect(() => {
    const root = document.getElementById("rec2224175751");
    const track = document.getElementById("eg-reviews-gallery-track");
    if (!root || !track) return;

    const items = Array.from(
      track.querySelectorAll<HTMLElement>(".eg-reviews-gallery__item"),
    );
    const prevBtn = root.querySelector<HTMLButtonElement>("[data-gallery-prev]");
    const nextBtn = root.querySelector<HTMLButtonElement>("[data-gallery-next]");

    const scrollByItem = (direction: -1 | 1) => {
      const first = items[0];
      if (!first) return;
      const styles = getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "14") || 14;
      const step = first.offsetWidth + gap;
      track.scrollBy({ left: direction * step, behavior: "smooth" });
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

    const revealTargets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let observer: IntersectionObserver | null = null;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach((el) => el.classList.add("is-visible"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      revealTargets.forEach((el) => observer?.observe(el));
    }

    return () => {
      prevBtn?.removeEventListener("click", onPrev);
      nextBtn?.removeEventListener("click", onNext);
      observer?.disconnect();
    };
  }, []);

  return null;
}
