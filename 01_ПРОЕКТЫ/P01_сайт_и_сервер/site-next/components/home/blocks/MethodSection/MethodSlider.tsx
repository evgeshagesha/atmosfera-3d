"use client";

import { useEffect } from "react";

type MethodSliderProps = {
  targetId: string;
};

/** Native slider for T940 cards inside a legacy HTML block. */
export default function MethodSlider({ targetId }: MethodSliderProps) {
  useEffect(() => {
    const root = document.getElementById(targetId);
    if (!root) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>(".t940 .t-card"));
    if (cards.length <= 1) return;

    let index = 0;
    const show = (i: number) => {
      cards.forEach((card, idx) => {
        card.style.display = idx === i ? "" : "none";
      });
    };

    show(0);

    const prev = document.createElement("button");
    prev.type = "button";
    prev.textContent = "‹";
    prev.setAttribute("aria-label", "Предыдущий шаг");
    prev.style.cssText =
      "position:absolute;left:10px;top:50%;transform:translateY(-50%);z-index:5;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.3);background:rgba(0,0,0,.5);color:#fff;cursor:pointer;";

    const next = document.createElement("button");
    next.type = "button";
    next.textContent = "›";
    next.setAttribute("aria-label", "Следующий шаг");
    next.style.cssText = prev.style.cssText.replace("left:10px", "right:10px;left:auto");

    const container = root.querySelector<HTMLElement>(".t940");
    if (!container) return;
    container.style.position = "relative";
    container.append(prev, next);

    const onPrev = () => {
      index = (index - 1 + cards.length) % cards.length;
      show(index);
    };
    const onNext = () => {
      index = (index + 1) % cards.length;
      show(index);
    };

    prev.addEventListener("click", onPrev);
    next.addEventListener("click", onNext);

    const timer = window.setInterval(onNext, 6000);

    return () => {
      prev.remove();
      next.remove();
      window.clearInterval(timer);
      cards.forEach((card) => {
        card.style.display = "";
      });
    };
  }, [targetId]);

  return null;
}
