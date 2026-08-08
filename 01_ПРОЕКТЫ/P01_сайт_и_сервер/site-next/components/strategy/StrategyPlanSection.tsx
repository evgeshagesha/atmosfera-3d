"use client";

import Image from "next/image";

import StrategyIcon from "@/components/strategy/StrategyIcon";
import { STRATEGY_CONTENT, STRATEGY_PRODUCT } from "@/lib/strategy/content";

type Props = {
  onCta: (source: string) => void;
};

export default function StrategyPlanSection({ onCta }: Props) {
  const plan = STRATEGY_CONTENT.plan;
  const dayIndex = plan.highlightDayIndex;

  return (
    <section id={plan.id} className="st-plan" aria-labelledby="st-plan-title">
      <div className="st-container">
        <div className="st-plan__intro">
          <div className="st-plan__copy">
            <h2 id="st-plan-title" className="st-plan__title">
              {plan.title}
            </h2>
            <p className="st-plan__subtitle">{plan.subtitle}</p>
            <p className="st-plan__body">{plan.body}</p>
          </div>

          <div className="st-plan__visual" aria-hidden="false">
            <div className="st-notebook">
              <Image
                className="st-notebook__img"
                src={STRATEGY_PRODUCT.notebookImage}
                alt={plan.notebookAlt}
                width={720}
                height={900}
                sizes="(max-width: 900px) 42vw, 300px"
              />
            </div>
          </div>
        </div>

        <ul className="st-plan-features" aria-label="Что даёт план">
          {plan.features.map((item) => (
            <li key={item.title} className="st-plan-features__item">
              <StrategyIcon name={item.icon} />
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>

        <div className="st-week st-week--desktop">
          <div className="st-week__head">
            <h3 className="st-week__title">{plan.weekTitle}</h3>
            <p className="st-week__hint">{plan.weekHint}</p>
          </div>

          <div className="st-week__scroll" role="region" aria-label={plan.weekTitle}>
            <table className="st-week__table">
              <thead>
                <tr>
                  <th scope="col" className="st-week__corner">
                    <span className="st-sr">Категория</span>
                  </th>
                  {plan.days.map((day, i) => (
                    <th
                      key={day}
                      scope="col"
                      className={i === dayIndex ? "is-highlight" : undefined}
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plan.rows.map((row) => (
                  <tr key={row.key}>
                    <th scope="row" className="st-week__row-label">
                      <StrategyIcon name={row.icon} />
                      <span>{row.label}</span>
                    </th>
                    {row.cells.map((cell, i) => {
                      const hi =
                        i === dayIndex || row.highlightCells.includes(i);
                      return (
                        <td key={`${row.key}-${i}`} className={hi ? "is-highlight" : undefined}>
                          <span>{cell}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="st-day st-day--mobile">
          <div className="st-week__head">
            <h3 className="st-week__title">{plan.dayTitle}</h3>
            <p className="st-week__hint">
              День: <span className="st-day__badge">{plan.days[dayIndex]}</span>
            </p>
          </div>
          <ul className="st-day__list">
            {plan.rows.map((row) => (
              <li key={row.key} className="st-day__item">
                <div className="st-day__label">
                  <StrategyIcon name={row.icon} />
                  <span>{row.label}</span>
                </div>
                <p>{row.cells[dayIndex]}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="st-plan__footer">
          <StrategyIcon name="star" className="st-plan__star" />
          <div>
            <p className="st-plan__footer-lead">{plan.footerLead}</p>
            <p className="st-plan__footer-accent">{plan.footerAccent}</p>
          </div>
        </div>

        <div className="st-plan__cta">
          <button
            type="button"
            className="st-btn st-btn--primary"
            onClick={() => onCta("strategy_plan_cta")}
          >
            {plan.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
