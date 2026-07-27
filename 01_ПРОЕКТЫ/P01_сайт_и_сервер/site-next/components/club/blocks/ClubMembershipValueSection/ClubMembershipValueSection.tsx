import Image from "next/image";

import { CLUB_PRICE_FROM, CLUB_TRIBUTE_TG } from "@/lib/club/landing-content";

import { CLUB_MEMBERSHIP_VALUE_CSS } from "./styles";

/** 16 пунктов: по 8 в колонку. Без «Базовая настройка тела» и «Дыхание…». */
const LEFT_ITEMS = [
  {
    title: "Онлайн тренировки и практики",
    oldPrice: "6 990 ₽",
  },
  {
    title: "Закаливание: от новичка до профи под контрастным душем",
    oldPrice: "4 990 ₽",
  },
  {
    title: "Ткани / самомассаж / висцералка / МФР",
    oldPrice: "6 990 ₽",
  },
  {
    title: "Прикладная нутрициология на пальцах",
    oldPrice: "6 990 ₽",
  },
  {
    title: "Двигательные паттерны — присед, наклон, шаг, ротация",
    oldPrice: "3 990 ₽",
  },
  {
    title: "Развитие силы без потери мобильности",
    oldPrice: "6 990 ₽",
  },
  {
    title: "Ягодицы и кор — стабильный таз и спина",
    oldPrice: "4 990 ₽",
  },
  {
    title: "Утренние и вечерние комплексы",
    oldPrice: "3 990 ₽",
  },
] as const;

const RIGHT_ITEMS = [
  {
    title: "Программы тренировок для мужчин",
    oldPrice: "30 990 ₽",
  },
  {
    title: "Программы тренировок для девушек",
    oldPrice: "30 990 ₽",
  },
  {
    title: "Программа тренировок для дома без инвентаря",
    oldPrice: "30 990 ₽",
  },
  {
    title: "Работа с шеей",
    oldPrice: "3 990 ₽",
  },
  {
    title: "Работа со спиной",
    oldPrice: "3 990 ₽",
  },
  {
    title: "Мобильность суставов",
    oldPrice: "4 990 ₽",
  },
  {
    title: "Новые уроки каждый месяц",
    oldPrice: "4 990 ₽",
  },
  {
    title: "Личная поддержка Евгения",
    oldPrice: "9 990 ₽",
  },
] as const;

const FEATURES = [
  { icon: "play" as const, title: "500+ уроков", text: "и практик" },
  { icon: "calendar" as const, title: "Новые материалы", text: "каждый день" },
  { icon: "devices" as const, title: "Доступ с телефона", text: "и компьютера" },
] as const;

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m7.8 12.2 2.8 2.8 5.6-5.8" />
    </svg>
  );
}

function FeatureIcon({ type }: { type: (typeof FEATURES)[number]["icon"] }) {
  if (type === "play") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8.8v6.4L16 12 10 8.8Z" />
      </svg>
    );
  }
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5.5" width="16" height="14" rx="2" />
        <path d="M8 3.5v4M16 3.5v4M4 10h16" />
      </svg>
    );
  }
  if (type === "devices") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="5" width="12" height="10" rx="1.5" />
        <path d="M7 17h5M15.5 9h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z" />
      </svg>
    );
  }
  return null;
}

function BenefitItem({ title, oldPrice }: { title: string; oldPrice: string }) {
  return (
    <li className="club-value__benefit">
      <span className="club-value__check">
        <CheckIcon />
      </span>
      <span className="club-value__benefit-copy">
        <span className="club-value__benefit-title">{title}</span>
        <s className="club-value__old-price">{oldPrice}</s>
      </span>
    </li>
  );
}

export default function ClubMembershipValueSection() {
  return (
    <div
      id="rec1145782611"
      className="r t-rec"
      data-animationappear="off"
      data-record-type="396"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <style dangerouslySetInnerHTML={{ __html: CLUB_MEMBERSHIP_VALUE_CSS }} />

      <section className="club-value" aria-labelledby="club-value-title">
        <div className="club-value__shell">
          <div className="club-value__hero">
            <div className="club-value__copy">
              <h2 id="club-value-title" className="club-value__title">
                Всё, что вы получаете
                <span>в клубе</span>
              </h2>
              <p className="club-value__lead">
                Всё, что раньше покупалось отдельно, теперь доступно в одной подписке.
              </p>
            </div>

            <div className="club-value__portrait" aria-hidden="true">
              <Image
                src="/club/source/value/evgeny-chair.webp"
                alt=""
                fill
                sizes="(max-width: 720px) 240px, 420px"
                className="club-value__portrait-image"
                priority={false}
              />
            </div>
          </div>

          <div className="club-value__catalog">
            <p className="club-value__catalog-label">Что входит в подписку</p>
              <div className="club-value__columns">
              <ul>
                {LEFT_ITEMS.map((item) => (
                  <BenefitItem key={item.title} {...item} />
                ))}
              </ul>
              <ul>
                {RIGHT_ITEMS.map((item) => (
                  <BenefitItem key={item.title} {...item} />
                ))}
              </ul>
            </div>
          </div>

          <div className="club-value__offer">
            <div className="club-value__anchor" aria-hidden="true" />

            <div className="club-value__total">
              <span>Стоимость всего отдельно</span>
              <s>137 900 ₽</s>
            </div>

            <div className="club-value__price">
              <span>Сегодня</span>
              <p>
                <strong>{CLUB_PRICE_FROM} ₽</strong>
                <small>/ месяц</small>
              </p>
              <em>
                или всего <b>58 ₽ в день</b>
              </em>
            </div>

            <a
              href={CLUB_TRIBUTE_TG}
              target="_blank"
              rel="noreferrer"
              className="club-value__cta"
            >
              Вступить в клуб
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h13M14 7l5 5-5 5" />
              </svg>
            </a>
          </div>

          <div className="club-value__features" aria-label="Преимущества клуба">
            {FEATURES.map((feature) => (
              <div className="club-value__feature" key={feature.title}>
                <span>
                  <FeatureIcon type={feature.icon} />
                </span>
                <p>
                  <strong>{feature.title}</strong>
                  <small>{feature.text}</small>
                </p>
              </div>
            ))}
          </div>

          <p className="club-value__safe">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6" y="10" width="12" height="10" rx="2" />
              <path d="M9 10V7a3 3 0 0 1 6 0v3" />
            </svg>
            Без рисков: отмените подписку в любой момент.
          </p>
        </div>
      </section>
    </div>
  );
}
