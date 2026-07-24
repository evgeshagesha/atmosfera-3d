"use client";

import { useEffect } from "react";

type ArtboardRuntimeProps = {
  /** Inline init snippets from the original page, filtered to artboard layout only. */
  initScripts: string[];
};

function installLegacyShims() {
  const win = window as Window & {
    t_onReady?: (fn: () => void) => void;
    t_onFuncLoad?: (name: string, fn: () => void) => void;
    t_throttle?: <T extends (...args: unknown[]) => void>(fn: T, delay: number) => T;
  };

  if (!win.t_onReady) {
    win.t_onReady = (fn) => {
      if (document.readyState !== "loading") {
        fn();
      } else {
        document.addEventListener("DOMContentLoaded", fn, { once: true });
      }
    };
  }

  if (!win.t_onFuncLoad) {
    win.t_onFuncLoad = (name, fn) => {
      const globalFn = (window as unknown as Record<string, unknown>)[name];
      if (typeof globalFn === "function") {
        fn();
        return;
      }
      const timer = window.setInterval(() => {
        const loaded = (window as unknown as Record<string, unknown>)[name];
        if (typeof loaded === "function") {
          window.clearInterval(timer);
          fn();
        }
      }, 40);
    };
  }

  if (!win.t_throttle) {
    win.t_throttle = (fn, delay) => {
      let last = 0;
      return ((...args: unknown[]) => {
        const now = Date.now();
        if (now - last >= delay) {
          last = now;
          fn(...args);
        }
      }) as typeof fn;
    };
  }
}

function runScript(code: string) {
  const script = document.createElement("script");
  script.text = code;
  document.body.appendChild(script);
  script.remove();
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-site-src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.siteSrc = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

/** Initializes responsive artboard layout for legacy HTML blocks (T396). */
export default function ArtboardRuntime({ initScripts }: ArtboardRuntimeProps) {
  useEffect(() => {
    if (initScripts.length === 0) return;

    let cancelled = false;

    (async () => {
      try {
        installLegacyShims();
        await loadScript("/scripts/site-artboard.js");
        await loadScript("/scripts/site-artboard-scale.js");
        if (cancelled) return;

        for (const code of initScripts) {
          runScript(code);
        }

        window.dispatchEvent(new Event("resize"));
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [initScripts]);

  return null;
}
