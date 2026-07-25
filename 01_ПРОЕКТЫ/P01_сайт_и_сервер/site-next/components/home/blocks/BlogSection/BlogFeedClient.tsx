"use client";

import { useEffect } from "react";

function getItemsInRow(carousel: HTMLElement): number {
  if (window.matchMedia("(max-width: 960px)").matches) return 1;
  const fromAttr = Number(carousel.getAttribute("data-slider-items-in-row"));
  if (fromAttr > 0) return fromAttr;
  return 3;
}

function getSlideStep(
  viewport: HTMLElement,
  items: HTMLElement[],
  itemsInRow: number
): number {
  const itemWidth = items[0]?.getBoundingClientRect().width ?? 0;
  if (itemWidth > 0) return itemWidth;
  return viewport.getBoundingClientRect().width / itemsInRow;
}

/** Native slider for SSR-injected blog cards inside the legacy t1004 shell. */
export default function BlogFeedClient() {
  useEffect(() => {
    const root = document.getElementById("rec2169195921");
    if (!root) return;

    const carousel = root.querySelector<HTMLElement>("#carousel_2169195921");
    const viewport = carousel?.parentElement;
    const slider = root.querySelector<HTMLElement>(".t-slds");
    if (!carousel || !viewport || !slider) return;

    slider.style.visibility = "visible";

    const items = Array.from(
      carousel.querySelectorAll<HTMLElement>(".t-feed__slider-grid__post-wrapper")
    );
    if (items.length === 0) return;

    const prevBtn = root.querySelector<HTMLButtonElement>(".t-slds__arrow-left");
    const nextBtn = root.querySelector<HTMLButtonElement>(".t-slds__arrow-right");
    let index = 0;

    const updateControls = (itemsInRow: number) => {
      const maxIndex = Math.max(0, items.length - itemsInRow);

      if (prevBtn) {
        prevBtn.disabled = index <= 0;
        prevBtn.setAttribute("aria-disabled", index <= 0 ? "true" : "false");
        prevBtn.style.opacity = index <= 0 ? "0.35" : "1";
        prevBtn.style.pointerEvents = index <= 0 ? "none" : "";
      }

      if (nextBtn) {
        nextBtn.disabled = index >= maxIndex;
        nextBtn.setAttribute("aria-disabled", index >= maxIndex ? "true" : "false");
        nextBtn.style.opacity = index >= maxIndex ? "0.35" : "1";
        nextBtn.style.pointerEvents = index >= maxIndex ? "none" : "";
      }
    };

    const setActive = (nextIndex: number) => {
      const itemsInRow = getItemsInRow(carousel);
      const maxIndex = Math.max(0, items.length - itemsInRow);
      index = Math.max(0, Math.min(nextIndex, maxIndex));

      const step = getSlideStep(viewport, items, itemsInRow);
      carousel.style.transform = step > 0 ? `translate3d(${-index * step}px, 0, 0)` : "";

      updateControls(itemsInRow);
    };

    const onPrev = (event: Event) => {
      event.preventDefault();
      setActive(index - 1);
    };

    const onNext = (event: Event) => {
      event.preventDefault();
      setActive(index + 1);
    };

    const onResize = () => setActive(index);

    setActive(0);
    prevBtn?.addEventListener("click", onPrev);
    nextBtn?.addEventListener("click", onNext);
    window.addEventListener("resize", onResize);

    // Swipe / drag to navigate
    let startX = 0;
    let dragging = false;
    let swiped = false;
    const SWIPE = 45;
    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      swiped = false;
      startX = event.clientX;
    };
    const onPointerUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      const dx = event.clientX - startX;
      if (Math.abs(dx) < SWIPE) return;
      swiped = true;
      setActive(dx < 0 ? index + 1 : index - 1);
    };
    const onPointerCancel = () => {
      dragging = false;
    };
    const onClickCapture = (event: Event) => {
      if (!swiped) return;
      event.preventDefault();
      event.stopPropagation();
      swiped = false;
    };
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointercancel", onPointerCancel);
    viewport.addEventListener("click", onClickCapture, true);

    const observer = new ResizeObserver(() => setActive(index));
    observer.observe(viewport);

    return () => {
      prevBtn?.removeEventListener("click", onPrev);
      nextBtn?.removeEventListener("click", onNext);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointerup", onPointerUp);
      viewport.removeEventListener("pointercancel", onPointerCancel);
      viewport.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      carousel.style.transform = "";
      if (prevBtn) {
        prevBtn.style.opacity = "";
        prevBtn.style.pointerEvents = "";
      }
      if (nextBtn) {
        nextBtn.style.opacity = "";
        nextBtn.style.pointerEvents = "";
      }
    };
  }, []);

  return null;
}
