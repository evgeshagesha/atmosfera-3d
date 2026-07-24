"use client";

import { useEffect, useRef } from "react";
import { recalcT1272MenuCentering } from "@/lib/site/menu/t1272-centering";

function throttle(fn: () => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastCall = 0;

  return () => {
    const now = Date.now();
    const remaining = delay - (now - lastCall);

    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastCall = now;
      fn();
      return;
    }

    if (!timeout) {
      timeout = setTimeout(() => {
        lastCall = Date.now();
        timeout = null;
        fn();
      }, remaining);
    }
  };
}

export function useT1272MenuCentering() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const recalc = () => recalcT1272MenuCentering(root);
    const throttledRecalc = throttle(recalc, 200);

    recalc();
    window.addEventListener("resize", throttledRecalc);

    const container = root.querySelector(".t-menu-base__maincontainer_logocenter");
    let resizeObserver: ResizeObserver | undefined;
    if (container && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(throttledRecalc);
      resizeObserver.observe(container);
    }

    const logo = root.querySelector("img.t-menu-base__imglogo");
    const onLoad = () => recalc();
    logo?.addEventListener("load", onLoad);
    void document.fonts?.ready.then(recalc);

    return () => {
      window.removeEventListener("resize", throttledRecalc);
      resizeObserver?.disconnect();
      logo?.removeEventListener("load", onLoad);
    };
  }, []);

  return ref;
}
