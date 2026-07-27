/** Club community setup block — visual + 2x2 cards / mobile list. */
export const CLUB_COMMUNITY_SETUP_CSS = `
.club-csetup {
  --cs-bg: var(--eg-bg, #0c0e12);
  --cs-card: #12171f;
  --cs-text: #fff;
  --cs-dim: rgba(220, 228, 238, 0.72);
  --cs-line: rgba(255, 255, 255, 0.1);
  --cs-accent: #3db4ff;
  --cs-accent-soft: rgba(61, 180, 255, 0.16);
  position: relative;
  background: var(--cs-bg);
  color: var(--cs-text);
  font-family: var(--font-body, Manrope, system-ui, sans-serif);
  padding: 40px 0 56px;
  overflow: clip;
}

.club-csetup__shell {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 28px;
}

.club-csetup__layout {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: 28px 36px;
  align-items: center;
}

.club-csetup__left {
  display: grid;
  gap: 22px;
}

.club-csetup__title {
  margin: 0;
  max-width: 14ch;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(32px, 4.4vw, 52px);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.club-csetup__title span {
  background: linear-gradient(120deg, #7ad4ff 0%, #3db4ff 55%, #2a8de0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.club-csetup__visual {
  position: relative;
  width: min(100%, 460px);
  aspect-ratio: 1.05 / 1;
  margin: 0 auto;
  isolation: isolate;
}

.club-csetup__glow {
  position: absolute;
  inset: 12% 8%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(61, 180, 255, 0.28), transparent 68%);
  filter: blur(10px);
  z-index: 0;
  pointer-events: none;
}

.club-csetup__pack {
  position: absolute;
  left: 16%;
  right: 16%;
  top: 20%;
  bottom: 14%;
  z-index: 1;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.03) 45%, rgba(20, 40, 70, 0.22)),
    rgba(18, 24, 34, 0.45);
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    0 0 40px rgba(61, 180, 255, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: grid;
  place-items: center;
  overflow: visible;
}

.club-csetup__pack-shine {
  position: absolute;
  inset: -20% -30% auto;
  height: 55%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.18), transparent);
  transform: rotate(-8deg);
  pointer-events: none;
  border-radius: inherit;
}

.club-csetup__pack-logo {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  width: min(86%, 280px);
}

.club-csetup__sticker {
  width: 100% !important;
  height: auto !important;
  object-fit: contain !important;
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.45));
}

.club-csetup__fly {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

.club-csetup__orb {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow:
    0 8px 22px rgba(0, 0, 0, 0.35),
    0 0 16px rgba(255, 255, 255, 0.12);
  display: grid;
  place-items: center;
  will-change: transform;
}

.club-csetup__orb svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: #fff;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-csetup__orb--rocket {
  top: 8%;
  left: 10%;
  background: radial-gradient(circle at 50% 40%, #9b7bff, #5b35e8 72%);
}

.club-csetup__orb--heart {
  top: 12%;
  right: 8%;
  background: radial-gradient(circle at 50% 40%, #7dffd0, #1fbf8a 70%);
}

.club-csetup__orb--heart svg {
  fill: rgba(255, 255, 255, 0.95);
  stroke: none;
}

.club-csetup__orb--kettle {
  bottom: 22%;
  right: 6%;
  background: radial-gradient(circle at 50% 40%, #ff8f6b, #e14a2a 72%);
}

.club-csetup__orb--people {
  bottom: 28%;
  left: 4%;
  background: radial-gradient(circle at 50% 40%, #6ec8ff, #2f86ff 70%);
}

.club-csetup__orb--dumbbell {
  top: 42%;
  right: -2%;
  background: radial-gradient(circle at 50% 40%, #ffd27a, #f0a020 70%);
}

@keyframes club-csetup-fly-a {
  0%, 100% { transform: translate(0, 0) rotate(-6deg); }
  25% { transform: translate(14px, -18px) rotate(8deg); }
  50% { transform: translate(-8px, -28px) rotate(-4deg); }
  75% { transform: translate(18px, -10px) rotate(10deg); }
}

@keyframes club-csetup-fly-b {
  0%, 100% { transform: translate(0, 0) rotate(4deg); }
  30% { transform: translate(-16px, -14px) rotate(-10deg); }
  55% { transform: translate(-6px, -30px) rotate(6deg); }
  80% { transform: translate(-20px, -8px) rotate(-6deg); }
}

@keyframes club-csetup-fly-c {
  0%, 100% { transform: translate(0, 0) rotate(-2deg); }
  20% { transform: translate(-12px, 16px) rotate(8deg); }
  45% { transform: translate(10px, 24px) rotate(-12deg); }
  70% { transform: translate(-18px, 8px) rotate(4deg); }
}

@keyframes club-csetup-fly-d {
  0%, 100% { transform: translate(0, 0) rotate(3deg); }
  25% { transform: translate(18px, 12px) rotate(-8deg); }
  50% { transform: translate(8px, -16px) rotate(10deg); }
  75% { transform: translate(22px, 4px) rotate(-4deg); }
}

@keyframes club-csetup-fly-e {
  0%, 100% { transform: translate(0, 0) rotate(-8deg); }
  35% { transform: translate(-14px, -20px) rotate(12deg); }
  60% { transform: translate(8px, -12px) rotate(-6deg); }
  85% { transform: translate(-10px, 10px) rotate(8deg); }
}

.club-csetup__orb--fly-a {
  animation: club-csetup-fly-a 7.5s ease-in-out infinite;
}

.club-csetup__orb--fly-b {
  animation: club-csetup-fly-b 8.8s ease-in-out infinite;
}

.club-csetup__orb--fly-c {
  animation: club-csetup-fly-c 6.6s ease-in-out infinite;
}

.club-csetup__orb--fly-d {
  animation: club-csetup-fly-d 9.2s ease-in-out infinite;
}

.club-csetup__orb--fly-e {
  animation: club-csetup-fly-e 7.1s ease-in-out infinite;
}

.club-csetup__bubble {
  position: absolute;
  z-index: 2;
  width: clamp(54px, 12vw, 72px);
  height: clamp(54px, 12vw, 72px);
  border-radius: 50%;
  border: 2px solid rgba(61, 180, 255, 0.55);
  background: #0e141c;
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.45),
    0 0 18px rgba(61, 180, 255, 0.25);
  overflow: hidden;
}

.club-csetup__bubble img {
  object-fit: cover !important;
}

.club-csetup__bubble--1 {
  top: 2%;
  left: 4%;
}

.club-csetup__bubble--2 {
  top: 6%;
  right: 0;
}

.club-csetup__bubble--3 {
  bottom: 14%;
  left: -4%;
}

.club-csetup__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  align-items: stretch;
}

.club-csetup__card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 100%;
  height: 100%;
  padding: 18px 16px 20px;
  border-radius: 18px;
  border: 1px solid var(--cs-line);
  background:
    linear-gradient(180deg, rgba(61, 180, 255, 0.1), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 55%),
    var(--cs-card);
  box-shadow: inset 0 1px 0 rgba(61, 180, 255, 0.35);
  box-sizing: border-box;
}

.club-csetup__meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.club-csetup__num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(61, 180, 255, 0.45);
  background: rgba(61, 180, 255, 0.12);
  color: var(--cs-accent);
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.club-csetup__icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(61, 180, 255, 0.35);
  background: var(--cs-accent-soft);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.club-csetup__icon svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: var(--cs-accent);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-csetup__card h3 {
  margin: 2px 0 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 16px;
  font-weight: 650;
  line-height: 1.25;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.club-csetup__card p {
  margin: 0;
  color: var(--cs-dim);
  font-size: 13.5px;
  line-height: 1.5;
}

.club-csetup__mobile {
  display: none;
}

.club-csetup__list {
  display: grid;
  gap: 0;
  border-top: 1px solid var(--cs-line);
}

.club-csetup__row {
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr) 18px;
  gap: 10px 12px;
  align-items: start;
  padding: 16px 2px;
  border-bottom: 1px solid var(--cs-line);
}

.club-csetup__row .club-csetup__icon {
  margin-top: 0;
}

.club-csetup__row-body h3 {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 15px;
  font-weight: 650;
  line-height: 1.25;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.club-csetup__row-body p {
  margin: 6px 0 0;
  color: var(--cs-dim);
  font-size: 13.5px;
  line-height: 1.45;
}

.club-csetup__chevron {
  color: rgba(255, 255, 255, 0.55);
  font-size: 16px;
  line-height: 1;
  margin-top: 4px;
}

@media (max-width: 980px) {
  .club-csetup {
    padding: 28px 0 40px;
  }

  .club-csetup__shell {
    padding: 0 16px;
  }

  .club-csetup__layout {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .club-csetup__title {
    max-width: 12ch;
    font-size: clamp(28px, 8.5vw, 38px);
  }

  .club-csetup__visual {
    width: min(100%, 360px);
  }

  .club-csetup__grid {
    display: none;
  }

  .club-csetup__mobile {
    display: block;
  }
}

@media (max-width: 420px) {
  .club-csetup__row {
    grid-template-columns: auto auto minmax(0, 1fr) 14px;
    gap: 8px 10px;
  }

  .club-csetup__row-body h3 {
    font-size: 14px;
  }

  .club-csetup__bubble {
    width: 52px;
    height: 52px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .club-csetup__bubble {
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
  }

  .club-csetup__orb--fly-a,
  .club-csetup__orb--fly-b,
  .club-csetup__orb--fly-c,
  .club-csetup__orb--fly-d,
  .club-csetup__orb--fly-e {
    animation: none;
  }
}
`;
