import { CLUB_SYSTEM_CSS } from "./styles";

const PILLARS = [
  {
    title: "Движение",
    text: "Выстраиваем биомеханику: снимаем лишнее напряжение, возвращаем мобильность и собираем тело в систему.",
    icon: "movement" as const,
  },
  {
    title: "Дыхание",
    text: "Настраиваем механику грудной клетки и диафрагмы — опору для осанки, состояния и качества тренировки.",
    icon: "breath" as const,
  },
  {
    title: "Дисциплина",
    text: "Короткие ежедневные практики и понятный маршрут. Результат закрепляется ритмом, а не разовым рывком.",
    icon: "discipline" as const,
  },
] as const;

function PillarIcon({ type }: { type: (typeof PILLARS)[number]["icon"] }) {
  if (type === "breath") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 20c-3-1-5-4-4-8 1-3 4-4 6-2" />
        <path d="M15 20c3-1 5-4 4-8-1-3-4-4-6-2" />
        <path d="M12 6v14" />
      </svg>
    );
  }
  if (type === "discipline") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="m15 9 4-4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 18c0-3 2-5 4-7 2 2 4 4 4 7" />
      <path d="M10 8a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
      <path d="M7 12h10" />
    </svg>
  );
}

export default function ClubSystemSection() {
  return (
    <div
      id="rec1142713381"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="396"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <style dangerouslySetInnerHTML={{ __html: CLUB_SYSTEM_CSS }} />
      <section className="club-system" aria-labelledby="club-system-title">
        <div className="club-system__inner">
          <header className="club-system__hero">
            <p className="club-system__eyebrow">Система 3D</p>
            <h2 id="club-system-title" className="club-system__title">
              Всё, что нужно — в системе 3D
            </h2>
            <p className="club-system__lead">
              Не набор разрозненных упражнений, а цельный маршрут: осанка,
              мобильность, дыхание и сила собираются в одну систему — спокойно
              и последовательно.
            </p>
          </header>

          <div className="club-system__pillars">
            {PILLARS.map((item) => (
              <article className="club-system__pillar" key={item.title}>
                <div className="club-system__pillar-head">
                  <div className="club-system__pillar-icon">
                    <PillarIcon type={item.icon} />
                  </div>
                  <strong>{item.title}</strong>
                </div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
