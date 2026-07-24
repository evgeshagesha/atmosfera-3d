"use client";

import { useCallback, useEffect, useState } from "react";

type CarouselProps = {
  children: React.ReactNode[];
  className?: string;
  autoplayMs?: number;
};

export default function Carousel({
  children,
  className = "",
  autoplayMs = 5000,
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const count = children.length;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (count <= 1 || autoplayMs <= 0) return;
    const timer = window.setInterval(next, autoplayMs);
    return () => window.clearInterval(timer);
  }, [autoplayMs, count, next]);

  if (count === 0) return null;

  return (
    <div className={`site-carousel ${className}`.trim()}>
      <div className="site-carousel__viewport">{children[index]}</div>
      {count > 1 ? (
        <div className="site-carousel__controls">
          <button type="button" className="site-carousel__btn" onClick={prev} aria-label="Назад">
            ‹
          </button>
          <button type="button" className="site-carousel__btn" onClick={next} aria-label="Вперёд">
            ›
          </button>
        </div>
      ) : null}
      <style jsx>{`
        .site-carousel {
          position: relative;
        }
        .site-carousel__controls {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
        }
        .site-carousel__btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.35);
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
