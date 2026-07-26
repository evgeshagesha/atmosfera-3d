"use client";

import { useEffect } from "react";

export default function ClubMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".club-page");
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-club-reveal]"),
    );

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    page?.classList.add("is-motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      page?.classList.remove("is-motion-ready");
    };
  }, []);

  return null;
}
