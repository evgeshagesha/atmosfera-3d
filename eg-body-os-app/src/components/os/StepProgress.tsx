export function StepProgress({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-1 w-28 gap-1 overflow-hidden rounded-full">
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={`h-full flex-1 rounded-full ${
              index < step ? "bg-fg" : "bg-muted/35"
            }`}
          />
        ))}
      </div>
      <p className="text-[11px] tracking-wide text-muted">
        Шаг {step} из {total}
      </p>
    </div>
  );
}
