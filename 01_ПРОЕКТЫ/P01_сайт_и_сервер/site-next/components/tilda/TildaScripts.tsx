"use client";

import { useEffect, useRef } from "react";

type TildaScriptsProps = {
  css: string[];
  js: string[];
  inlineScripts?: string[];
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
      existing.addEventListener(
        "error",
        () => reject(new Error(`Failed to load ${src}`)),
        { once: true }
      );
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

function runInlineScript(code: string) {
  const script = document.createElement("script");
  script.text = code;
  document.body.appendChild(script);
  script.remove();
}

function isExecutableScript(code: string) {
  const trimmed = code.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("{") && trimmed.includes("@context")) return false;
  return true;
}

export default function TildaScripts({ css, js, inlineScripts = [] }: TildaScriptsProps) {
  const initKeyRef = useRef("");

  useEffect(() => {
    document.documentElement.classList.add("t-body");

    const key = `${js.join("|")}:${inlineScripts.join("|||")}`;
    if (initKeyRef.current === key) return;
    initKeyRef.current = key;

    let cancelled = false;

    (async () => {
      for (const src of js) {
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

      const win = window as Window & { t_lazyload_update?: () => void };
      if (typeof win.t_lazyload_update === "function") {
        win.t_lazyload_update();
      }

      window.dispatchEvent(new Event("resize"));
    })();

    return () => {
      cancelled = true;
      document.documentElement.classList.remove("t-body");
    };
  }, [js, inlineScripts]);

  return (
    <>
      {css.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </>
  );
}
