"use client";

import Image from "next/image";

import StrategyIcon from "@/components/strategy/StrategyIcon";
import { STRATEGY_CONTENT, STRATEGY_PRODUCT } from "@/lib/strategy/content";

type Props = {
  onCta: (source: string) => void;
};

export default function StrategyOfferSection({ onCta }: Props) {
  const offer = STRATEGY_CONTENT.offer;
  const p = STRATEGY_PRODUCT;

  return (
    <section id={offer.id} className="st-offer" aria-labelledby="st-offer-title">
      <div className="st-offer__shell">
        <div className="st-offer__top">
          <div className="st-offer__intro">
            <p className="st-offer__eyebrow">{offer.eyebrow}</p>
            <h2 id="st-offer-title" className="st-offer__title">
              {offer.title}
            </h2>
            <p className="st-offer__body">{offer.body}</p>

            <ul className="st-offer-benefits" aria-label="Преимущества">
              {offer.benefits.map((item) => (
                <li key={item.title} className="st-offer-benefits__item">
                  <StrategyIcon name={item.icon} />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="st-offer-card" aria-label={offer.cardTitle}>
            <p className="st-offer-card__eyebrow">{offer.cardTitle}</p>
            <p className="st-offer-card__price">{p.priceLabel}</p>
            <div className="st-offer-card__day">
              <strong>{offer.perDayBox}</strong>
              <span>{offer.perDayNote}</span>
            </div>

            <ul className="st-offer-card__list">
              {offer.checklist.map((item) => (
                <li key={item.title}>
                  <StrategyIcon name="check" />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="st-btn st-btn--primary st-btn--hero"
              onClick={() => onCta("strategy_offer_cta")}
            >
              {offer.cta}
            </button>

            <p className="st-trust st-offer-card__trust">
              <StrategyIcon name="lock" />
              <span>{offer.trust}</span>
            </p>
          </aside>
        </div>

        <div className="st-offer-bio">
          <div className="st-offer-bio__photo">
            <Image
              src={p.offerPortrait}
              alt={offer.portraitAlt}
              width={819}
              height={1024}
              sizes="(max-width: 900px) 72vw, 280px"
            />
          </div>
          <div className="st-offer-bio__copy">
            <blockquote className="st-offer-bio__quote">
              <p>{offer.quote}</p>
            </blockquote>
            <p className="st-offer-bio__sub">{offer.quoteSub}</p>

            <ul className="st-offer-bio__stats st-offer-bio__stats--desktop" aria-label="Опыт">
              {offer.bio.map((item) => (
                <li key={item.text}>
                  <StrategyIcon name={item.icon} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            <ul className="st-offer-bio__stats st-offer-bio__stats--mobile" aria-label="Опыт">
              {offer.bioMobile.map((item) => (
                <li key={item.text}>
                  <StrategyIcon name={item.icon} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="st-offer__footer">{offer.footerLine}</p>
      </div>
    </section>
  );
}
