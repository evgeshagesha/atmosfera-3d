type Cleanup = () => void;

function getSlideWidth(items: HTMLElement[], carousel: HTMLElement): number {
  const container = carousel.parentElement;
  const containerWidth = container?.getBoundingClientRect().width ?? 0;
  if (containerWidth > 0) return containerWidth;

  const itemWidth = items[0]?.getBoundingClientRect().width ?? 0;
  return itemWidth > 0 ? itemWidth : carousel.clientWidth;
}

/** Native port of Tilda t_sldsInit for cover (t734) and gallery (t604) blocks. */
export function initTSldsSlider(root: HTMLElement): Cleanup {
  const slider = root.querySelector<HTMLElement>(".t-slds");
  const carousel = root.querySelector<HTMLElement>(".t-slds__items-wrapper");
  if (!slider || !carousel) return () => undefined;

  slider.style.visibility = "visible";

  const items = Array.from(carousel.querySelectorAll<HTMLElement>(":scope > .t-slds__item"));
  if (items.length === 0) return () => undefined;

  const prevBtn = root.querySelector<HTMLElement>(".t-slds__arrow-left");
  const nextBtn = root.querySelector<HTMLElement>(".t-slds__arrow-right");
  const bullets = Array.from(root.querySelectorAll<HTMLElement>(".t-slds__bullet"));
  const captions = Array.from(root.querySelectorAll<HTMLElement>(".t-slds__caption"));

  const transitionMs = Number(carousel.getAttribute("data-slider-transition") ?? "300") || 300;
  const withCycle = carousel.getAttribute("data-slider-with-cycle") !== "false";
  const autoplayMs = 5000;

  let index = Math.max(
    0,
    items.findIndex((item) => item.classList.contains("t-slds__item_active"))
  );
  let timer: ReturnType<typeof setInterval> | undefined;

  const setActive = (nextIndex: number) => {
    if (items.length <= 1) {
      items.forEach((item, idx) => {
        item.classList.toggle("t-slds__item_active", idx === 0);
        item.setAttribute("aria-hidden", idx === 0 ? "false" : "true");
      });
      return;
    }

    index = ((nextIndex % items.length) + items.length) % items.length;

    items.forEach((item, idx) => {
      const active = idx === index;
      item.classList.toggle("t-slds__item_active", active);
      item.setAttribute("aria-hidden", active ? "false" : "true");
    });

    bullets.forEach((bullet) => {
      const forSlide = bullet.getAttribute("data-slide-bullet-for");
      const active = forSlide === String(index + 1);
      bullet.classList.toggle("t-slds__bullet_active", active);
      const btn = bullet.querySelector("button");
      if (btn) btn.setAttribute("aria-current", active ? "true" : "false");
    });

    captions.forEach((caption) => {
      const forSlide = caption.getAttribute("data-slide-caption");
      caption.classList.toggle("t-slds__caption-active", forSlide === String(index + 1));
    });

    const slideWidth = getSlideWidth(items, carousel);
    carousel.style.display = "flex";
    carousel.style.width = `${items.length * slideWidth}px`;
    items.forEach((item) => {
      item.style.flex = `0 0 ${slideWidth}px`;
      item.style.width = `${slideWidth}px`;
    });
    carousel.style.transition = `transform ${transitionMs}ms ease`;
    carousel.style.transform = `translateX(${-index * slideWidth}px)`;

    root.dispatchEvent(new CustomEvent("updateSlider"));
  };

  const restartAutoplay = () => {
    if (timer) clearInterval(timer);
    if (items.length <= 1 || !withCycle) return;
    timer = setInterval(() => setActive(index + 1), autoplayMs);
  };

  const go = (delta: number) => {
    setActive(index + delta);
    restartAutoplay();
  };

  const onPrev = (event: Event) => {
    event.preventDefault();
    go(-1);
  };

  const onNext = (event: Event) => {
    event.preventDefault();
    go(1);
  };

  const onBullet = (event: Event) => {
    const bullet = (event.target as HTMLElement).closest<HTMLElement>(".t-slds__bullet");
    if (!bullet) return;
    event.preventDefault();
    const forSlide = Number(bullet.getAttribute("data-slide-bullet-for"));
    if (!forSlide) return;
    setActive(forSlide - 1);
    restartAutoplay();
  };

  const onResize = () => setActive(index);

  setActive(index);
  restartAutoplay();

  prevBtn?.addEventListener("click", onPrev);
  nextBtn?.addEventListener("click", onNext);
  bullets.forEach((bullet) => bullet.addEventListener("click", onBullet));
  window.addEventListener("resize", onResize);

  return () => {
    if (timer) clearInterval(timer);
    prevBtn?.removeEventListener("click", onPrev);
    nextBtn?.removeEventListener("click", onNext);
    bullets.forEach((bullet) => bullet.removeEventListener("click", onBullet));
    window.removeEventListener("resize", onResize);
    carousel.style.transform = "";
    carousel.style.display = "";
    carousel.style.width = "";
    items.forEach((item) => {
      item.style.flex = "";
      item.style.width = "";
      item.classList.remove("t-slds__item_active");
      item.removeAttribute("aria-hidden");
    });
    slider.style.visibility = "";
  };
}
