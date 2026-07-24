export const ECOSYSTEM_HUB_STYLES = `
.eco-hub {
  min-height: 100vh;
  background: #000;
  color: #fff;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.eco-hub__inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 48px 20px 72px;
}

.eco-hub__brand {
  font-family: "Bebas Neue", "BebasNeue", Arial, sans-serif;
  font-size: clamp(34px, 6vw, 52px);
  letter-spacing: 0.08em;
  line-height: 1;
  margin: 0 0 8px;
  text-transform: uppercase;
}

.eco-hub__tagline,
.eco-hub__result {
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.55;
  margin: 0;
}

.eco-hub__tagline {
  font-size: 15px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.eco-hub__result {
  font-size: 18px;
  margin-top: 14px;
  max-width: 720px;
}

.eco-ladder {
  display: grid;
  gap: 14px;
  margin: 36px 0 40px;
}

.eco-ladder__item {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  display: grid;
  gap: 12px;
  padding: 18px 18px 20px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.eco-ladder__item:hover {
  border-color: rgba(255, 255, 255, 0.28);
  transform: translateY(-1px);
}

.eco-ladder__item.is-live {
  border-color: rgba(255, 255, 255, 0.2);
}

.eco-ladder__item.is-building,
.eco-ladder__item.is-planned {
  opacity: 0.82;
}

.eco-ladder__head {
  align-items: start;
  display: grid;
  gap: 10px;
  grid-template-columns: auto 1fr auto;
}

.eco-ladder__step {
  align-items: center;
  background: #fff;
  border-radius: 999px;
  color: #000;
  display: inline-flex;
  font-size: 13px;
  font-weight: 800;
  height: 34px;
  justify-content: center;
  min-width: 34px;
  padding: 0 10px;
}

.eco-ladder__title {
  font-family: "Bebas Neue", "BebasNeue", Arial, sans-serif;
  font-size: clamp(24px, 4vw, 30px);
  letter-spacing: 0.04em;
  line-height: 1.05;
  margin: 0;
  text-transform: uppercase;
}

.eco-ladder__price {
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-align: right;
  white-space: nowrap;
}

.eco-ladder__subtitle,
.eco-ladder__note {
  color: rgba(255, 255, 255, 0.68);
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}

.eco-ladder__note {
  font-size: 12px;
}

.eco-ladder__footer {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
}

.eco-ladder__status {
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
}

.eco-ladder__status.is-live {
  border-color: rgba(120, 255, 170, 0.28);
  color: #d7ffe8;
}

.eco-ladder__status.is-building {
  border-color: rgba(255, 210, 120, 0.28);
  color: #ffe8c2;
}

.eco-btn {
  align-items: center;
  background: linear-gradient(180deg, #f5f7fa 0%, #c8cdd4 100%);
  border: 0;
  border-radius: 999px;
  color: #060709;
  display: inline-flex;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  justify-content: center;
  min-height: 42px;
  padding: 0 18px;
  text-decoration: none;
}

.eco-btn--ghost {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #fff;
}

.eco-btn:disabled,
.eco-btn.is-disabled {
  cursor: not-allowed;
  opacity: 0.45;
  pointer-events: none;
}

.eco-section-title {
  font-family: "Bebas Neue", "BebasNeue", Arial, sans-serif;
  font-size: 28px;
  letter-spacing: 0.06em;
  margin: 0 0 16px;
  text-transform: uppercase;
}

.eco-links {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  margin-bottom: 36px;
}

.eco-link-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  color: inherit;
  display: block;
  padding: 16px;
  text-decoration: none;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.eco-link-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.24);
}

.eco-link-card.is-accent {
  border-color: rgba(255, 255, 255, 0.34);
}

.eco-link-card__label {
  display: block;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
}

.eco-link-card__descr {
  color: rgba(255, 255, 255, 0.66);
  display: block;
  font-size: 13px;
  line-height: 1.45;
}

.eco-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.eco-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  line-height: 1.6;
  margin-top: 40px;
  padding-top: 20px;
}

.eco-footer a {
  color: rgba(255, 255, 255, 0.72);
}

@media (min-width: 900px) {
  .eco-ladder {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
`;
