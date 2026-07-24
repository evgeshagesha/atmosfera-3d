"use client";

import { useEffect } from "react";

function reveal(el: Element, delayMs = 0) {
  window.setTimeout(() => {
    el.classList.add("t-animate_started");
  }, delayMs);
}

function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

function revealGroup(el: HTMLElement, handled: Set<Element>) {
  const groupRoot = el.closest(".js-block-header, .t-section__container");
  if (el.getAttribute("data-animate-group") === "yes" && groupRoot) {
    const grouped = Array.from(
      groupRoot.querySelectorAll<HTMLElement>(".t-animate[data-animate-group='yes']")
    );
    grouped.forEach((node, index) => {
      handled.add(node);
      reveal(node, index * 100);
    });
    return true;
  }

  const chainRoot = el.closest(".t940__features-wrap, .t940__row, .t-container, .t940");
  if (el.getAttribute("data-animate-chain") === "yes" && chainRoot) {
    const chain = Array.from(
      chainRoot.querySelectorAll<HTMLElement>(".t-animate[data-animate-chain='yes']")
    );
    chain.forEach((node, index) => {
      handled.add(node);
      reveal(node, index * 120);
    });
    return true;
  }

  handled.add(el);
  reveal(el);
  return true;
}

/** Replaces Tilda t_animate__init — reveals .t-animate elements on scroll. */
export default function TAnimateRuntime() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".t-animate:not(.t-animate_started)")
    );
    if (elements.length === 0) return;

    const handled = new Set<Element>();

    const process = (el: HTMLElement) => {
      if (handled.has(el) || el.classList.contains("t-animate_started")) return;
      revealGroup(el, handled);
    };

    const scanViewport = () => {
      for (const el of elements) {
        if (handled.has(el)) continue;
        if (isInViewport(el)) process(el);
      }
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("t-animate_started"));
      return;
    }

    if (window.innerWidth < 980) {
      elements.forEach((el) => el.classList.add("t-animate_started"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          process(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );

    for (const el of elements) {
      if (!handled.has(el)) observer.observe(el);
    }

    scanViewport();
    window.addEventListener("load", scanViewport);
    window.addEventListener("resize", scanViewport);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", scanViewport);
      window.removeEventListener("resize", scanViewport);
    };
  }, []);

  return null;
}
