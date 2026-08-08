"use client";

import Image from "next/image";

import StrategyIcon from "@/components/strategy/StrategyIcon";
import { STRATEGY_CONTENT, STRATEGY_PRODUCT } from "@/lib/strategy/content";

export default function StrategyPlanSection() {
  const plan = STRATEGY_CONTENT.plan;
  const dayIndex = plan.highlightDayIndex;

  return (
    <section id={plan.id} className="st-plan" aria-labelledby="st-plan-title">
      <div className="st-container">
        <div className="st-plan__intro">
          <div className="st-plan__copy">
            <p className="st-plan__eyebrow">
              <span>{plan.eyebrow}</span>
              <span className="st-plan__eyebrow-line" aria-hidden="true" />
            </p>
            <h2 id="st-plan-title" className="st-plan__title">
              {plan.title}
            </h2>
            <p className="st-plan__subtitle">{plan.subtitle}</p>
            <div className="st-plan__body">
              {plan.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="st-plan__visual">
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

        <ul className="st-plan-pillars" aria-label="Принципы системы">
          {plan.pillars.map((item) => (
            <li key={item.title} className="st-plan-pillars__item">
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
                      const hi = row.highlightCells.includes(i);
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

        <ul className="st-plan-stats" aria-label="Итоги системы">
          {plan.stats.map((item) => (
            <li key={item.title} className="st-plan-stats__item">
              <StrategyIcon name={item.icon} />
              <div>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
