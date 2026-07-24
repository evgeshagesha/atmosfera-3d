"use client";

import { useEffect } from "react";

const REC_ID = "2191858991";

function throttle<T extends (...args: never[]) => void>(fn: T, wait: number): T {
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  return ((...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = wait - (now - last);

    if (remaining <= 0) {
      if (timer) clearTimeout(timer);
      last = now;
      fn(...args);
      return;
    }

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      last = Date.now();
      fn(...args);
    }, remaining);
  }) as T;
}

/** Native port of Tilda t1003_init / t1003_calc / t1003_anim. */
function initMarquee(rec: HTMLElement): () => void {
  const wrapper = rec.querySelector<HTMLElement>(".t1003__wrapper");
  const contentWrapper = rec.querySelector<HTMLElement>(".t1003__content-wrapper");
  const content = rec.querySelector<HTMLElement>(".t1003__content");
  if (!wrapper || !contentWrapper || !content) return () => undefined;

  const animationId = `t1003__anim-scrolling_${REC_ID}`;

  const calc = () => {
    let items = Array.from(content.querySelectorAll<HTMLElement>(".t1003__item"));
    if (items.length === 0) return;

    const template = items[0];
    items.slice(1).forEach((item) => item.remove());

    const itemWidth = template.offsetWidth || template.scrollWidth;
    if (itemWidth <= 0) return;

    const itemsToDisplay = Math.floor(window.innerWidth / itemWidth) + 3;
    for (let i = 0; i < itemsToDisplay; i++) {
      const clone = template.cloneNode(true) as HTMLElement;
      clone.querySelector(".t1003__bgimg")?.classList.add("loaded");
      content.insertBefore(clone, template.nextSibling);
    }

    const speedAttr = wrapper.getAttribute("data-marquee-speed") ?? "4";
    const seconds = parseFloat(speedAttr.replace("s", ""));
    const duration = (itemWidth / 100) * seconds;

    rec.querySelector(`#${animationId}`)?.remove();

    const style = document.createElement("style");
    style.id = animationId;
    style.textContent = `
      @keyframes ${animationId} {
        0% { transform: translateX(0); }
        100% { transform: translateX(${-itemWidth}px); }
      }
    `;
    rec.appendChild(style);

    content.style.animationName = animationId;
    content.style.animationDuration = `${duration}s`;
    content.style.animationTimingFunction = "linear";
    content.style.animationIterationCount = "infinite";
    contentWrapper.style.opacity = "1";
  };

  const run = () => {
    requestAnimationFrame(calc);
  };

  run();
  const onResize = throttle(run, 300);
  window.addEventListener("resize", onResize);
  window.addEventListener("load", run);

  if (document.fonts?.ready) {
    void document.fonts.ready.then(run);
  }

  return () => {
    window.removeEventListener("resize", onResize);
    window.removeEventListener("load", run);
    rec.querySelector(`#${animationId}`)?.remove();
    content.style.animationName = "";
    contentWrapper.style.opacity = "";
    Array.from(content.querySelectorAll<HTMLElement>(".t1003__item"))
      .slice(1)
      .forEach((item) => item.remove());
  };
}

export default function MarqueeAnimation() {
  useEffect(() => {
    const rec = document.getElementById(`rec${REC_ID}`);
    if (!rec) return;
    return initMarquee(rec);
  }, []);

  return null;
}
