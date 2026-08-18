type SilverWavesProps = {
  placement?: "welcome" | "page";
};

export function SilverWaves({ placement = "page" }: SilverWavesProps) {
  const welcome = placement === "welcome";

  return (
    <>
      <svg
        className={`pointer-events-none absolute left-0 right-0 ${welcome ? "-top-8 h-44" : "-top-6 h-28"} w-full`}
        viewBox="0 0 390 180"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="egWaveStroke" x1="0" y1="0" x2="390" y2="80">
            <stop offset="0%" stopColor="#7a7874" />
            <stop offset="35%" stopColor="#f4f1ea" />
            <stop offset="55%" stopColor="#9a9893" />
            <stop offset="100%" stopColor="#d8d6d0" />
          </linearGradient>
          <filter id="egWaveGlow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M-20 92 C 40 18, 110 150, 190 70 S 320 10, 420 86"
          stroke="url(#egWaveStroke)"
          strokeWidth="1.4"
          filter="url(#egWaveGlow)"
        />
        <path
          d="M-30 118 C 70 40, 140 168, 230 88 S 340 28, 430 110"
          stroke="url(#egWaveStroke)"
          strokeWidth="0.8"
          opacity="0.55"
        />
      </svg>
      <svg
        className={`pointer-events-none absolute bottom-0 left-0 right-0 ${welcome ? "h-40" : "h-24"} w-full`}
        viewBox="0 0 390 160"
        fill="none"
        aria-hidden
      >
        <path
          d="M-20 48 C 80 130, 150 10, 240 86 S 340 150, 430 60"
          stroke="url(#egWaveStroke)"
          strokeWidth="1.3"
          filter="url(#egWaveGlow)"
        />
        <path
          d="M-10 78 C 90 150, 180 30, 270 102 S 360 140, 430 90"
          stroke="url(#egWaveStroke)"
          strokeWidth="0.7"
          opacity="0.45"
        />
      </svg>
    </>
  );
}
