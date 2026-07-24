type Cleanup = () => void;

/** Native port of Tilda t994 desktop/mobile story slider. */
export function initT994Slider(root: HTMLElement): Cleanup {
  const container = root.querySelector<HTMLElement>(".t994__slidecontainer");
  const items = Array.from(
    root.querySelectorAll<HTMLElement>(".t994__slidecontainer > .t994__item")
  );
  if (!container || items.length <= 1) return () => undefined;

  const prevBtn = root.querySelector<HTMLElement>(".t994__prev, .t-slds__arrow_wrapper-left button");
  const nextBtn = root.querySelector<HTMLElement>(".t994__next, .t-slds__arrow_wrapper-right button");
  const timeoutMs = Number(container.getAttribute("data-slider-timeout") ?? "5000") || 5000;

  let index = Math.max(
    0,
    items.findIndex((item) => item.classList.contains("t-slds__item_active"))
  );
  let timer: ReturnType<typeof setInterval> | undefined;
  let isDesktop = window.innerWidth > 960;

  const setActive = (nextIndex: number) => {
    index = (nextIndex + items.length) % items.length;
    items.forEach((item, idx) => {
      item.classList.toggle("t-slds__item_active", idx === index);
      item.setAttribute("aria-hidden", idx === index ? "false" : "true");
    });

    if (isDesktop) {
      const itemWidth = items[0].offsetWidth || items[0].getBoundingClientRect().width;
      container.style.transform = `translateX(${-index * itemWidth}px)`;
      container.setAttribute("data-slide-offset", String(-index * itemWidth));
    } else {
      const itemHeight = items[0].offsetHeight || items[0].getBoundingClientRect().height;
      container.style.transform = `translateY(${-index * itemHeight}px)`;
      container.setAttribute("data-slide-offset", String(-index * itemHeight));
    }
  };

  const go = (delta: number) => {
    setActive(index + delta);
    restartAutoplay();
  };

  const restartAutoplay = () => {
    if (timer) clearInterval(timer);
    if (timeoutMs > 0) {
      timer = setInterval(() => go(1), timeoutMs);
    }
  };

  const onResize = () => {
    const wasDesktop = isDesktop;
    isDesktop = window.innerWidth > 960;
    if (wasDesktop !== isDesktop) {
      container.style.transform = "";
    }
    setActive(index);
  };

  const onPrev = (event: Event) => {
    event.preventDefault();
    go(-1);
  };

  const onNext = (event: Event) => {
    event.preventDefault();
    go(1);
  };

  container.style.transition = "transform 0.3s ease-in-out";
  setActive(index);
  restartAutoplay();

  prevBtn?.addEventListener("click", onPrev);
  nextBtn?.addEventListener("click", onNext);
  window.addEventListener("resize", onResize);

  return () => {
    if (timer) clearInterval(timer);
    prevBtn?.removeEventListener("click", onPrev);
    nextBtn?.removeEventListener("click", onNext);
    window.removeEventListener("resize", onResize);
    container.style.transform = "";
    items.forEach((item) => {
      item.classList.remove("t-slds__item_active");
      item.removeAttribute("aria-hidden");
    });
  };
}
