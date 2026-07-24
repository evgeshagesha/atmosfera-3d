"use client";

import { useEffect } from "react";

/** Horizontal snap carousel for «для кого» square cards + scroll reveal + drag. */
export default function AudienceSlider() {
  useEffect(() => {
    const root = document.getElementById("rec2040539251");
    const track = document.getElementById("eg-audience-track");
    if (!root || !track) return;

    const items = Array.from(
      track.querySelectorAll<HTMLElement>(".eg-audience__card"),
    );
    const prevBtn = root.querySelector<HTMLButtonElement>("[data-aud-prev]");
    const nextBtn = root.querySelector<HTMLButtonElement>("[data-aud-next]");

    const stepSize = () => {
      const first = items[0];
      if (!first) return 0;
      const s = getComputedStyle(track);
      const gap = Number.parseFloat(s.columnGap || s.gap || "16") || 16;
      return first.offsetWidth + gap;
    };
    const onPrev = (e: Event) => {
      e.preventDefault();
      track.scrollBy({ left: -stepSize(), behavior: "smooth" });
    };
    const onNext = (e: Event) => {
      e.preventDefault();
      track.scrollBy({ left: stepSize(), behavior: "smooth" });
    };
    prevBtn?.addEventListener("click", onPrev);
    nextBtn?.addEventListener("click", onNext);

    // pointer drag-to-scroll (desktop mouse); touch uses native scroll
    let down = false;
    let startX = 0;
    let startScroll = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      down = true;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
      track.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      track.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = (e: PointerEvent) => {
      down = false;
      track.style.cursor = "";
      try {
        track.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    };
    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);

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
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
      observer?.disconnect();
    };
  }, []);

  return null;
}
