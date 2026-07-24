"use client";
import { useEffect } from "react";

/**
 * Reveals any [data-reveal] element on scroll (formats, audience, headers).
 * Respects prefers-reduced-motion. Rendered once from FormatsSection.
 */
export default function FormatsReveal() {
  useEffect(() => {
    const collect = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      collect().forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    collect().forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
