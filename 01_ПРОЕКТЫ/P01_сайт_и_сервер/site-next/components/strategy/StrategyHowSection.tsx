"use client";

import Image from "next/image";

import StrategyIcon from "@/components/strategy/StrategyIcon";
import { STRATEGY_CONTENT, STRATEGY_PRODUCT } from "@/lib/strategy/content";

export default function StrategyHowSection() {
  const how = STRATEGY_CONTENT.how;
  const images = STRATEGY_PRODUCT.howImages;

  return (
    <section id={how.id} className="st-how" aria-labelledby="st-how-title">
      <div className="st-container">
        <header className="st-how__head">
          <p className="st-how__eyebrow">{how.eyebrow}</p>
          <h2 id="st-how-title" className="st-how__title">
            {how.title}
          </h2>
          <p className="st-how__subtitle">{how.subtitle}</p>
        </header>

        <ol className="st-how-steps">
          {how.steps.map((step) => (
            <li key={step.num} className="st-how-step">
              <div className="st-how-step__card">
                <span className="st-how-step__num" aria-hidden="true">
                  {step.num}
                </span>
                <div className="st-how-step__icon" aria-hidden="true">
                  <StrategyIcon name={step.icon} />
                </div>
                <h3 className="st-how-step__title">{step.title}</h3>
                <p className="st-how-step__text">{step.text}</p>
                <p className="st-how-step__check">
                  <StrategyIcon name="check" />
                  <span>{step.check}</span>
                </p>
              </div>
              <div className="st-how-step__media">
                <Image
                  src={images[step.imageKey]}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 900px) 88vw, 28vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            </li>
          ))}
        </ol>

        <div className="st-how-banner">
          <StrategyIcon name="eye" className="st-how-banner__icon" />
          <div className="st-how-banner__copy">
            <p className="st-how-banner__lead">
              <span>{how.bannerLead}</span>{" "}
              <strong>{how.bannerAccent}</strong>
            </p>
            <p className="st-how-banner__sub">{how.bannerSub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
