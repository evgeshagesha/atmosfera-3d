import Image from "next/image";
import Link from "next/link";

import { HERO_V2_CSS } from "./hero-v2-styles";
import { HERO_ARTBOARD_CSS } from "./styles";

function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

const HERO_PILLARS = [
  {
    title: "Движение",
    icon: "movement",
  },
  {
    title: "Дыхание",
    icon: "breath",
  },
  {
    title: "Дисциплина",
    icon: "discipline",
  },
] as const;

function PillarIcon({ type }: { type: (typeof HERO_PILLARS)[number]["icon"] }) {
  if (type === "breath") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M15 7v18M17 7v18M15 14c-2-5-7-6-9-1-2 4-1 10 4 12 2 1 4 0 5-2M17 14c2-5 7-6 9-1 2 4 1 10-4 12-2 1-4 0-5-2" />
      </svg>
    );
  }
  if (type === "discipline") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="11" />
        <circle cx="16" cy="16" r="6" />
        <path d="m12.5 16 2.3 2.4 5-5.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M12 5a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm3 5-4 5-5 2m9-7 5 4 5-1m-11 2-2 6-5 6m7-7 5 2 2 6" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <div
      id="rec2315596141"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="396"
      suppressHydrationWarning
    >
      <StyleTag css={HERO_ARTBOARD_CSS} />
      <div className="t396">
        <div
          className="t396__artboard"
          data-artboard-recid="2315596141"
          data-artboard-screens="320,480,640,960,1200"
          data-artboard-height="720"
          data-artboard-valign="center"
          data-artboard-upscale="grid"
          data-artboard-height-res-320="650"
        >
          <div className="t396__carrier" data-artboard-recid="2315596141" />
          <div className="t396__filter" data-artboard-recid="2315596141" />
          <div
            className="t396__elem tn-elem tn-elem__23155961411779867368841"
            data-elem-id="1779867368841"
            data-elem-type="html"
            data-field-top-value="20"
            data-field-left-value="-50"
            data-field-height-value="676"
            data-field-width-value="1308"
            data-field-axisy-value="top"
            data-field-axisx-value="left"
            data-field-container-value="grid"
            data-field-topunits-value="px"
            data-field-leftunits-value="px"
            data-field-heightunits-value="px"
            data-field-widthunits-value="px"
            data-field-top-res-320-value="0"
            data-field-left-res-320-value="-55"
            data-field-height-res-320-value="716"
            data-field-width-res-320-value="431"
          >
            <div className="tn-atom tn-atom__html">
              <StyleTag css={HERO_V2_CSS} />
              <section
                id="egmain-hero"
                aria-label="Евгений Гошев — терапия движением, Атмосфера 3D"
              >
                <div className="egmain-frame">
                  <div className="egmain-portrait" aria-hidden="true">
                    <Image
                      src="/assets/eg/hero-evgeny-black.png"
                      alt=""
                      fill
                      preload
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 62vw, 54vw"
                    />
                  </div>
                  <div className="egmain-image-overlay" />
                  <div className="egmain-container">
                    <div className="egmain-content">
                      <div className="egmain-identity">
                        <strong>Евгений Гошев</strong>
                        <span>Физический терапевт</span>
                        <span>Профессиональный спортсмен</span>
                        <span>15 лет практического опыта</span>
                        <a href="#rec2034125521">
                          Подробнее обо мне <i aria-hidden="true">↓</i>
                        </a>
                        <a
                          href="https://yandex.ru/maps/-/CTu240~o"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Моя wellness-студия <i aria-hidden="true">↗</i>
                        </a>
                      </div>
                      <h1 className="egmain-title">
                        <span>Создаю здоровое и красивое</span>
                        <span>тело под ключ</span>
                      </h1>
                      <p className="egmain-lead">
                        Сила и долголетие начинаются с качественного движения и
                        природы!
                      </p>
                      <p className="egmain-subtitle">
                        Диагностика, дыхание, функциональные тренировки и
                        естественные практики помогают убрать боль, улучшить
                        осанку, убрать выпирающий живот, вернуть подвижность и
                        мобильность и сделать тело здоровым на долгие годы!
                      </p>
                      <div className="egmain-cta-wrap">
                        <div className="egmain-cta-row">
                          <Link href="/anketa" className="egmain-btn egmain-btn-primary egmain-btn-neon">
                            Заполнить анкету для личного приёма в Москве или онлайн{" "}
                            <span className="egmain-btn-arrow">→</span>
                          </Link>
                          <a href="#online" className="egmain-btn egmain-btn-neon">
                            Пройти тест и получить персональный план · 684 ₽{" "}
                            <span className="egmain-btn-arrow">→</span>
                          </a>
                        </div>
                      </div>
                      <div className="egmain-tags">
                        <span className="egmain-tag">Личный приём в Москве</span>
                        <span className="egmain-tag egmain-tag-accent">Более 1000 клиентов</span>
                        <span className="egmain-tag">Москва и онлайн</span>
                      </div>
                      <div className="egmain-pillars">
                        {HERO_PILLARS.map((pillar) => (
                          <div key={pillar.title} className="egmain-pillar">
                            <PillarIcon type={pillar.icon} />
                            <strong>{pillar.title}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
