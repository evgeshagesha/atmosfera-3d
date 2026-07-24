import { initTSldsSlider } from "@/lib/site/sliders/t-slds-slider";

type Cleanup = () => void;

function setupT1272Menus(root: ParentNode): Cleanup {
  const cleanups: Cleanup[] = [];

  root.querySelectorAll<HTMLElement>('[data-record-type="1272"]').forEach((block) => {
    const mobile = block.querySelector<HTMLElement>(".tmenu-mobile");
    const burger = block.querySelector<HTMLElement>(".t-menu-burger, .t-menuburger");
    const nav = block.querySelector<HTMLElement>(".t-menu-base");
    if (!mobile || !burger || !nav) return;

    const close = () => {
      mobile.classList.remove("tmenu-mobile_opened");
      burger.classList.remove("t-menuburger-opened", "t-menu-burger_open");
      nav.classList.add("tmenu-mobile__menucontent_hidden");
      nav.classList.remove("t-menu-base__burgermenu_opened");
      document.body.style.overflow = "";
    };

    const open = () => {
      mobile.classList.add("tmenu-mobile_opened");
      burger.classList.add("t-menuburger-opened", "t-menu-burger_open");
      nav.classList.remove("tmenu-mobile__menucontent_hidden");
      nav.classList.add("t-menu-base__burgermenu_opened");
      nav.style.display = "block";
      nav.style.opacity = "1";
      document.body.style.overflow = "hidden";
    };

    close();

    const onBurger = (event: Event) => {
      event.stopPropagation();
      if (mobile.classList.contains("tmenu-mobile_opened")) close();
      else open();
    };

    const onNavClick = (event: Event) => {
      if ((event.target as HTMLElement).closest("a")) close();
    };

    burger.addEventListener("click", onBurger);
    nav.addEventListener("click", onNavClick);
    cleanups.push(() => {
      burger.removeEventListener("click", onBurger);
      nav.removeEventListener("click", onNavClick);
      close();
    });
  });

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

function setupT1073Heights(root: ParentNode): Cleanup {
  const cleanups: Cleanup[] = [];

  root.querySelectorAll<HTMLElement>(".t1073__bgimg").forEach((bgImage) => {
    const width = Number(bgImage.getAttribute("data-image-width"));
    const height = Number(bgImage.getAttribute("data-image-height"));
    if (!width || !height) return;

    bgImage.style.paddingBottom = `${(height / width) * 100}%`;
  });

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

function setupCardSlider(
  root: ParentNode,
  itemSelector: string,
  prevSelector: string,
  nextSelector: string,
  intervalMs: number
): Cleanup {
  const containers = Array.from(root.querySelectorAll<HTMLElement>("[data-record-type]"));
  const cleanups: Cleanup[] = [];

  for (const container of containers) {
    const items = Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
    if (items.length <= 1) continue;

    let index = 0;
    const show = (i: number) => {
      items.forEach((item, idx) => {
        item.style.display = idx === i ? "" : "none";
      });
    };

    show(0);

    const prev = container.querySelector<HTMLElement>(prevSelector);
    const next = container.querySelector<HTMLElement>(nextSelector);

    const onPrev = (event: Event) => {
      event.preventDefault();
      index = (index - 1 + items.length) % items.length;
      show(index);
    };

    const onNext = (event: Event) => {
      event.preventDefault();
      index = (index + 1) % items.length;
      show(index);
    };

    prev?.addEventListener("click", onPrev);
    next?.addEventListener("click", onNext);

    const timer = window.setInterval(() => {
      index = (index + 1) % items.length;
      show(index);
    }, intervalMs);

    cleanups.push(() => {
      prev?.removeEventListener("click", onPrev);
      next?.removeEventListener("click", onNext);
      window.clearInterval(timer);
      items.forEach((item) => {
        item.style.display = "";
      });
    });
  }

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

function setupT940Sliders(root: ParentNode): Cleanup {
  const cleanups: Cleanup[] = [];

  root.querySelectorAll<HTMLElement>('[data-record-type="940"]').forEach((block) => {
    const cards = Array.from(block.querySelectorAll<HTMLElement>(".t940 .t-card"));
    if (cards.length <= 1) return;

    let index = 0;
    const show = (i: number) => {
      cards.forEach((card, idx) => {
        card.style.display = idx === i ? "" : "none";
      });
    };

    show(0);

    const container = block.querySelector<HTMLElement>(".t940");
    if (!container) return;

    container.style.position = "relative";

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

    cleanups.push(() => {
      prev.remove();
      next.remove();
      prev.removeEventListener("click", onPrev);
      next.removeEventListener("click", onNext);
      window.clearInterval(timer);
      cards.forEach((card) => {
        card.style.display = "";
      });
    });
  });

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

function setupT668Accordion(root: ParentNode): Cleanup {
  const cleanups: Cleanup[] = [];

  root.querySelectorAll<HTMLElement>(".t668__accordion").forEach((accordion) => {
    const trigger = accordion.querySelector<HTMLElement>(".t668__trigger-button");
    if (!trigger) return;

    const onClick = () => {
      accordion.classList.toggle("t668__opened");
    };

    trigger.addEventListener("click", onClick);
    cleanups.push(() => trigger.removeEventListener("click", onClick));
  });

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

function setupT450Menus(root: ParentNode): Cleanup {
  const cleanups: Cleanup[] = [];

  root.querySelectorAll<HTMLElement>('[data-record-type="450"]').forEach((block) => {
    const menu = block.querySelector<HTMLElement>(".t450");
    const overlay = block.querySelector<HTMLElement>(".t450__overlay");
    const closeBtn = block.querySelector<HTMLElement>(".t450__close-button");
    if (!menu) return;

    const open = () => {
      menu.classList.add("t450__menu_show");
      document.body.classList.add("t450__body_menushowed");
    };

    const close = () => {
      menu.classList.remove("t450__menu_show");
      document.body.classList.remove("t450__body_menushowed");
    };

    close();

    const onDocClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('a[href="#menuopen"]')) {
        event.preventDefault();
        open();
        return;
      }

      if (
        target.closest(".t450__close-button, .t450__overlay") ||
        (menu.classList.contains("t450__menu_show") && target.closest(".t450__menu a"))
      ) {
        if (target.closest(".t450__close-button, .t450__overlay")) {
          event.preventDefault();
          close();
        } else if (target.closest(".t450__menu a")) {
          close();
        }
      }
    };

    closeBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      close();
    });
    overlay?.addEventListener("click", close);
    document.addEventListener("click", onDocClick);

    cleanups.push(() => {
      closeBtn?.removeEventListener("click", close);
      overlay?.removeEventListener("click", close);
      document.removeEventListener("click", onDocClick);
      close();
    });
  });

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

function setupVideoPopups(root: ParentNode): Cleanup {
  const cleanups: Cleanup[] = [];

  root.querySelectorAll<HTMLElement>('[data-record-type="331"]').forEach((block) => {
    const popup = block.querySelector<HTMLElement>(".t-popup");
    const hook = popup?.getAttribute("data-tooltip-hook");
    if (!popup || !hook) return;

    const lazyHost = block.querySelector<HTMLElement>("[data-videolazy-id]");
    const videoId = lazyHost?.getAttribute("data-videolazy-id");

    const ensureVideo = () => {
      if (!lazyHost || !videoId || lazyHost.querySelector("iframe")) return;
      const iframe = document.createElement("iframe");
      iframe.src = `https://kinescope.io/embed/${videoId}`;
      iframe.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;";
      iframe.allowFullscreen = true;
      iframe.style.cssText = "width:100%;height:100%;border:0;";
      lazyHost.append(iframe);
    };

    const open = () => {
      popup.style.display = "block";
      document.body.style.overflow = "hidden";
      ensureVideo();
    };

    const close = () => {
      popup.style.display = "none";
      document.body.style.overflow = "";
    };

    close();

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest(`a[href="${hook}"]`)) {
        event.preventDefault();
        open();
        return;
      }

      if (target.closest(".t-popup__close-wrapper, .t-popup__block-close")) {
        event.preventDefault();
        close();
      }

      if (target === popup) close();
    };

    document.addEventListener("click", onClick);
    cleanups.push(() => {
      document.removeEventListener("click", onClick);
      close();
    });
  });

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

function setupFixedHeaders(root: ParentNode): Cleanup {
  const cleanups: Cleanup[] = [];

  root.querySelectorAll<HTMLElement>(".t396__artboard").forEach((artboard) => {
    const style = artboard.getAttribute("style") ?? "";
    const computed = getComputedStyle(artboard);
    if (computed.position !== "fixed" && !style.includes("position:fixed")) return;

    const onScroll = () => {
      artboard.style.opacity = window.scrollY > 80 ? "1" : "0";
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));
  });

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

function setupTSldsSliders(root: ParentNode): Cleanup {
  const cleanups: Cleanup[] = [];

  root.querySelectorAll<HTMLElement>('[data-record-type="734"], [data-record-type="604"]').forEach((block) => {
    cleanups.push(initTSldsSlider(block));
  });

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

function setupT604ImageHeights(root: ParentNode): Cleanup {
  root.querySelectorAll<HTMLElement>('[data-record-type="604"] .t604__separator').forEach((separator) => {
    const imgHeight = Number(separator.getAttribute("data-slider-image-height"));
    const imgWidth = Number(separator.getAttribute("data-slider-image-width"));
    if (!imgHeight || !imgWidth) return;
    separator.style.paddingBottom = `${(imgHeight / imgWidth) * 100}%`;
  });

  return () => undefined;
}

function setupT604ArrowWidths(root: ParentNode): Cleanup {
  const update = () => {
    root.querySelectorAll<HTMLElement>('[data-record-type="604"]').forEach((block) => {
      const slide = block.querySelector<HTMLElement>(".t-slds__item_active .t-slds__wrapper");
      const arrows = block.querySelectorAll<HTMLElement>(".t-slds__arrow_wrapper");
      if (!slide || arrows.length === 0) return;

      const slideWidth = slide.getBoundingClientRect().width;
      if (!slideWidth) return;

      const arrowWidth = window.innerWidth > 960 ? `${(window.innerWidth - slideWidth) / 2}px` : "";
      if (arrowWidth && arrowWidth !== "0px") {
        arrows.forEach((arrow) => {
          arrow.style.width = arrowWidth;
        });
      }
    });
  };

  update();
  window.addEventListener("resize", update, { passive: true });

  return () => {
    window.removeEventListener("resize", update);
  };
}

function setupT544Heights(root: ParentNode): Cleanup {
  const update = () => {
    root.querySelectorAll<HTMLElement>('[data-record-type="544"]').forEach((rec) => {
      const sizer = rec.querySelector<HTMLElement>(".t544__sizer");
      const image = rec.querySelector<HTMLElement>(".t544__blockimg");
      if (!sizer || !image) return;

      const sizerStyle = getComputedStyle(sizer);
      const sizerHeight =
        sizer.clientHeight -
        (parseInt(sizerStyle.paddingTop, 10) || 0) -
        (parseInt(sizerStyle.paddingBottom, 10) || 0);
      const sizerWidth =
        sizer.clientWidth -
        (parseInt(sizerStyle.paddingLeft, 10) || 0) -
        (parseInt(sizerStyle.paddingRight, 10) || 0);
      if (!sizerHeight || !sizerWidth) return;

      const imageStyle = getComputedStyle(image);
      const imageWidth =
        image.clientWidth -
        (parseInt(imageStyle.paddingLeft, 10) || 0) -
        (parseInt(imageStyle.paddingRight, 10) || 0);
      const maxHeight = imageWidth / (sizerWidth / sizerHeight);

      if (sizerHeight !== window.innerHeight) {
        rec.querySelectorAll<HTMLElement>(".t544__blockimg, .t544__textwrapper").forEach((el) => {
          el.style.height = `${maxHeight}px`;
        });
      }
    });
  };

  update();
  window.addEventListener("resize", update, { passive: true });

  return () => {
    window.removeEventListener("resize", update);
  };
}

function setupT734CoverButtons(root: ParentNode): Cleanup {
  const cleanups: Cleanup[] = [];

  root.querySelectorAll<HTMLElement>('[data-record-type="734"] .t734__button[type="button"]').forEach((button) => {
    const onClick = (event: Event) => {
      event.preventDefault();
      const target = document.getElementById("rec2039710061");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    button.addEventListener("click", onClick);
    cleanups.push(() => button.removeEventListener("click", onClick));
  });

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

function setupLegacyForms(root: ParentNode): Cleanup {
  const cleanups: Cleanup[] = [];

  root.querySelectorAll<HTMLFormElement>("#allrecords form, .atm3d form").forEach((form) => {
    if (form.id === "bf" || form.id === "form2191126061") return;

    const onSubmit = async (event: Event) => {
      event.preventDefault();
      const data = new FormData(form);
      const payload = Object.fromEntries(data.entries());

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("submit failed");

        const success = form.querySelector<HTMLElement>(".js-successbox, .t-form__successbox");
        if (success) success.style.display = "block";
        form.reset();
      } catch {
        window.alert("Не удалось отправить. Напишите в Telegram: @EGoshev");
      }
    };

    form.addEventListener("submit", onSubmit);
    cleanups.push(() => form.removeEventListener("submit", onSubmit));
  });

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

/** Wire native handlers for legacy Tilda block markup across the site. */
export function initLegacyInteractivity(
  root: ParentNode = document,
  options: { enableSliders?: boolean } = {}
): Cleanup {
  const { enableSliders = true } = options;
  const cleanups = [
    setupT1073Heights(root),
    setupT544Heights(root),
    setupT604ImageHeights(root),
    enableSliders ? setupTSldsSliders(root) : () => undefined,
    enableSliders ? setupT604ArrowWidths(root) : () => undefined,
    setupT734CoverButtons(root),
    enableSliders ? setupT940Sliders(root) : () => undefined,
    setupT668Accordion(root),
    setupT450Menus(root),
    setupT1272Menus(root),
    setupVideoPopups(root),
    setupFixedHeaders(root),
    setupLegacyForms(root),
    enableSliders ? setupCardSlider(root, ".t994__item", ".t994__prev", ".t994__next", 7000) : () => undefined,
    enableSliders ? setupCardSlider(root, ".t1186__item", ".t1186__control_left", ".t1186__control_right", 6000) : () => undefined,
  ];

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}
