import ClubSalesLink from "@/components/club/ClubSalesLink";
import { CLUB_PRICE_FROM } from "@/lib/club/landing-content";

import { CLUB_TARIFFS_CSS } from "./styles";

const FEATURES = [
  "Весь контент клуба",
  "Закрытый чат",
  "Новые уроки",
  "Поддержка",
  "Скидка 20% на очную практику в студии",
] as const;

const PLANS = [
  {
    id: "1m",
    period: "1 месяц",
    subtitle: "Старт и знакомство",
    oldPrice: "5 997 ₽",
    price: CLUB_PRICE_FROM,
    priceNote: "/ месяц",
    meta: "≈ 58 ₽ в день",
    discount: null,
    featured: false,
  },
  {
    id: "3m",
    period: "3 месяца",
    subtitle: "Стабильный прогресс",
    oldPrice: "11 991 ₽",
    price: "4 646",
    priceNote: "за 3 месяца",
    meta: "≈ 1 549 ₽ / мес.",
    discount: "-22%",
    featured: true,
  },
  {
    id: "6m",
    period: "6 месяцев",
    subtitle: "Максимальный результат",
    oldPrice: "19 994 ₽",
    price: "9 151",
    priceNote: "за 6 месяцев",
    meta: "≈ 1 525 ₽ / мес.",
    discount: "-30%",
    featured: false,
  },
] as const;

const TRUST = [
  { icon: "shield" as const, label: "Без рисков" },
  { icon: "calendar" as const, label: "Отмена в любое время" },
  { icon: "lock" as const, label: "Безопасная оплата" },
] as const;

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m7.8 12.2 2.8 2.8 5.6-5.8" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3.2 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.6 7.2 18.1l.9-5.4-3.9-3.8 5.4-.8L12 3.2Z" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
      <path d="M2 7h20v5H2z" />
      <path d="M12 22V7" />
      <path d="M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7Z" />
      <path d="M12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7Z" />
    </svg>
  );
}

function TrustIcon({ type }: { type: (typeof TRUST)[number]["icon"] }) {
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </svg>
    );
  }
  if (type === "lock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6" y="10" width="12" height="10" rx="2" />
        <path d="M9 10V7a3 3 0 0 1 6 0v3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 5.5 5.5v5.2c0 4.2 2.8 7.7 6.5 8.8 3.7-1.1 6.5-4.6 6.5-8.8V5.5L12 3Z" />
      <path d="m9.2 12.2 1.9 1.9 3.8-3.9" />
    </svg>
  );
}

export default function ClubTariffsSection() {
  return (
    <div
      id="rec1145818246"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="396"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <style dangerouslySetInnerHTML={{ __html: CLUB_TARIFFS_CSS }} />

      <section
        id="tariff"
        className="club-tariffs"
        aria-labelledby="club-tariffs-title"
      >
        <div className="club-tariffs__shell">
          <header className="club-tariffs__head">
            <h2 id="club-tariffs-title" className="club-tariffs__title">
              Начинай прямо сейчас
              <span>остался последний шаг</span>
            </h2>
            <p className="club-tariffs__lead">
              Выбери тариф и получи доступ ко всем возможностям клуба
            </p>
          </header>

          <div className="club-tariffs__grid">
            {PLANS.map((plan) => (
              <article
                key={plan.id}
                className={
                  plan.featured
                    ? "club-tariffs__card club-tariffs__card--featured"
                    : "club-tariffs__card"
                }
              >
                {plan.featured ? (
                  <div className="club-tariffs__badge">
                    <StarIcon />
                    Выгодно
                  </div>
                ) : null}

                <div className="club-tariffs__card-top">
                  <h3 className="club-tariffs__period">{plan.period}</h3>
                  <p className="club-tariffs__subtitle">{plan.subtitle}</p>
                </div>

                <div className="club-tariffs__price-block">
                  <s className="club-tariffs__old">{plan.oldPrice}</s>
                  <div className="club-tariffs__price-row">
                    <p className="club-tariffs__price">{plan.price} ₽</p>
                    {plan.discount ? (
                      <span className="club-tariffs__discount">{plan.discount}</span>
                    ) : null}
                  </div>
                  <div className="club-tariffs__price-meta">
                    <span>{plan.priceNote}</span>
                    <small>{plan.meta}</small>
                  </div>
                </div>

                <ul className="club-tariffs__features">
                  {FEATURES.map((feature) => (
                    <li className="club-tariffs__feature" key={feature}>
                      <span className="club-tariffs__check">
                        <CheckIcon />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <ClubSalesLink
                  className={
                    plan.featured
                      ? "club-tariffs__cta club-tariffs__cta--primary"
                      : "club-tariffs__cta"
                  }
                >
                  Выбрать
                </ClubSalesLink>
              </article>
            ))}
          </div>

          <div className="club-tariffs__bonus">
            <span className="club-tariffs__bonus-icon" aria-hidden="true">
              <GiftIcon />
            </span>
            <p>
              При любой подписке —{" "}
              <strong>скидка 20%</strong> на очную практику со мной в моей
              wellness-студии в Москве
            </p>
          </div>

          <div className="club-tariffs__trust" aria-label="Гарантии оплаты">
            {TRUST.map((item) => (
              <div className="club-tariffs__trust-item" key={item.label}>
                <span>
                  <TrustIcon type={item.icon} />
                </span>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
