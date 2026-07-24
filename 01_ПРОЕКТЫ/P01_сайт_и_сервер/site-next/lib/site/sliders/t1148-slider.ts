type Cleanup = () => void;

/** Native port of Tilda t_slider__init for t1148 gallery. */
export function initT1148Slider(root: HTMLElement): Cleanup {
  const slider = root.querySelector<HTMLElement>(".t1148__slider");
  if (!slider) return () => undefined;

  const items = Array.from(slider.querySelectorAll<HTMLElement>(".t1148__item"));
  if (items.length <= 1) return () => undefined;

  const prevBtn = root.querySelector<HTMLElement>(".t1148__control_left");
  const nextBtn = root.querySelector<HTMLElement>(".t1148__control_right");

  const gap = Number.parseInt(getComputedStyle(slider).gap || "10", 10) || 10;

  const scrollByItem = (direction: "backwards" | "forwards") => {
    const itemWidth = items[0].offsetWidth + gap;
    slider.scrollBy({
      left: direction === "forwards" ? itemWidth : -itemWidth,
      behavior: "smooth",
    });
  };

  const onPrev = (event: Event) => {
    event.preventDefault();
    scrollByItem("backwards");
  };

  const onNext = (event: Event) => {
    event.preventDefault();
    scrollByItem("forwards");
  };

  slider.style.overflowX = "auto";
  slider.style.scrollSnapType = "x mandatory";
  items.forEach((item) => {
    item.style.scrollSnapAlign = "start";
  });

  prevBtn?.addEventListener("click", onPrev);
  nextBtn?.addEventListener("click", onNext);

  return () => {
    prevBtn?.removeEventListener("click", onPrev);
    nextBtn?.removeEventListener("click", onNext);
    slider.style.overflowX = "";
    slider.style.scrollSnapType = "";
    items.forEach((item) => {
      item.style.scrollSnapAlign = "";
    });
  };
}
