type BrandLockupProps = {
  size?: "hero" | "compact";
};

export function BrandLockup({ size = "compact" }: BrandLockupProps) {
  const hero = size === "hero";

  return (
    <div className="relative z-10 flex flex-col items-center text-center">
      <p
        className={`chrome-text font-display italic leading-none tracking-tight ${
          hero ? "text-[72px]" : "text-[40px]"
        }`}
      >
        EG
      </p>
      <p
        className={`mt-2 font-medium uppercase tracking-[0.28em] text-fg ${
          hero ? "text-[15px]" : "text-[11px]"
        }`}
      >
        Атмосфера 3D
      </p>
      <p
        className={`mt-2 uppercase tracking-[0.22em] text-fg/90 ${
          hero ? "text-[10px]" : "text-[8px]"
        }`}
      >
        Движение • Дыхание • Дисциплина
      </p>
    </div>
  );
}
