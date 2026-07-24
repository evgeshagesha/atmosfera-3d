"use client";

import { useEffect, useRef } from "react";

type TildaBodyProps = {
  html: string;
  scripts: string[];
  inlineScripts: string[];
};

function loadScriptSequentially(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(
      `script[data-tilda-src="${src}"]`
    ) as HTMLScriptElement | null;

    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.tildaSrc = src;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

function isExecutableScript(code: string) {
  const trimmed = code.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("{") && trimmed.includes("@context")) return false;
  return true;
}

function runInlineScript(code: string) {
  const script = document.createElement("script");
  script.text = code;
  document.body.appendChild(script);
  script.remove();
}

export default function TildaBody({
  html,
  scripts,
  inlineScripts,
}: TildaBodyProps) {
  const initKeyRef = useRef("");

  useEffect(() => {
    document.documentElement.classList.add("t-body");

    const key = `${html.length}:${scripts.length}:${inlineScripts.length}`;
    if (initKeyRef.current === key) return;
    initKeyRef.current = key;

    let cancelled = false;

    (async () => {
      for (const src of scripts) {
        if (cancelled) return;
        try {
          await loadScriptSequentially(src);
        } catch (error) {
          console.error(error);
        }
      }

      if (cancelled) return;

      for (const code of inlineScripts) {
        if (cancelled) return;
        if (!isExecutableScript(code)) continue;
        try {
          runInlineScript(code);
        } catch (error) {
          console.error(error);
        }
      }

      const win = window as Window & {
        t_lazyload_update?: () => void;
      };

      if (typeof win.t_lazyload_update === "function") {
        win.t_lazyload_update();
      }

      window.dispatchEvent(new Event("resize"));
    })();

    return () => {
      cancelled = true;
      document.documentElement.classList.remove("t-body");
    };
  }, [html, scripts, inlineScripts]);

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
