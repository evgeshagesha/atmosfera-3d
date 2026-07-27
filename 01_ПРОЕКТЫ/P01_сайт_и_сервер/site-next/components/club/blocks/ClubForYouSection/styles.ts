/** Club "for you if" block — desktop mosaic + mobile square carousel. */
export const CLUB_FOR_YOU_CSS = `
.club-foryou {
  --fy-bg: #000000;
  --fy-surface: #151a22;
  --fy-text: #fff;
  --fy-dim: rgba(220, 228, 238, 0.72);
  --fy-line: rgba(255, 255, 255, 0.1);
  --fy-accent: #3db4ff;
  --fy-accent-soft: rgba(61, 180, 255, 0.16);
  position: relative;
  background: var(--fy-bg);
  color: var(--fy-text);
  font-family: var(--font-body, Manrope, system-ui, sans-serif);
  padding: 36px 0 48px;
  overflow: clip;
}

.club-foryou__shell {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 28px;
}

.club-foryou__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
}

.club-foryou__title {
  margin: 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: clamp(30px, 4.2vw, 48px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.club-foryou__title span {
  background: linear-gradient(120deg, #7ad4ff 0%, #3db4ff 55%, #2a8de0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.club-foryou__nav {
  display: inline-flex;
  gap: 10px;
  flex-shrink: 0;
}

.club-foryou__nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(61, 180, 255, 0.45);
  background: rgba(61, 180, 255, 0.08);
  color: var(--fy-accent);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.club-foryou__nav-btn:hover {
  background: rgba(61, 180, 255, 0.16);
  border-color: var(--fy-accent);
  transform: translateY(-1px);
}

.club-foryou__nav-btn svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-foryou__num {
  display: block;
  color: var(--fy-accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.club-foryou__icon {
  width: 42px;
  height: 42px;
  margin-top: 12px;
  border-radius: 50%;
  border: 1px solid rgba(61, 180, 255, 0.45);
  background: var(--fy-accent-soft);
  box-shadow: 0 0 18px rgba(61, 180, 255, 0.18);
  display: grid;
  place-items: center;
}

.club-foryou__icon svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: var(--fy-accent);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-foryou__card h3,
.club-foryou__square h3 {
  margin: 14px 0 0;
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 16px;
  font-weight: 650;
  line-height: 1.2;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.club-foryou__card p,
.club-foryou__square p {
  margin: 10px 0 0;
  color: var(--fy-dim);
  font-size: 13.5px;
  line-height: 1.45;
}

.club-foryou__desktop {
  display: block;
}

.club-foryou__mobile {
  display: none;
}

.club-foryou__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-areas:
    "c01 c02 c03 c03"
    "c04 vis vis c05"
    "c06 c06 cta cta";
  gap: 14px;
  align-items: stretch;
}

.club-foryou__card,
.club-foryou__cta,
.club-foryou__visual {
  border-radius: 18px;
  border: 1px solid var(--fy-line);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 55%),
    var(--fy-surface);
}

.club-foryou__card {
  padding: 18px 16px 20px;
  min-height: 210px;
}

.club-foryou__card[data-n="01"] { grid-area: c01; }
.club-foryou__card[data-n="02"] { grid-area: c02; }
.club-foryou__card[data-n="03"] { grid-area: c03; }
.club-foryou__card[data-n="04"] { grid-area: c04; }
.club-foryou__card[data-n="05"] { grid-area: c05; }
.club-foryou__card[data-n="06"] { grid-area: c06; }

.club-foryou__visual {
  grid-area: vis;
  position: relative;
  min-height: 280px;
  overflow: hidden;
  background: radial-gradient(circle at 50% 45%, rgba(40, 110, 190, 0.2), transparent 62%), #0d1218;
}

.club-foryou__visual-glow {
  position: absolute;
  inset: 12% 18%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(61, 180, 255, 0.22), transparent 70%);
  filter: blur(8px);
  pointer-events: none;
}

.club-foryou__visual img {
  object-fit: contain !important;
  object-position: center bottom !important;
  padding: 12px 18px 8px;
}

.club-foryou__cta {
  grid-area: cta;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  min-height: 210px;
  padding: 18px 16px 20px;
  text-decoration: none;
  color: #fff !important;
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
}

.club-foryou__cta:hover {
  border-color: rgba(61, 180, 255, 0.45);
  transform: translateY(-2px);
  background:
    linear-gradient(180deg, rgba(61, 180, 255, 0.08), transparent 55%),
    var(--fy-surface);
}

.club-foryou__cta strong {
  font-family: var(--font-display, Oswald, sans-serif);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.club-foryou__cta-arrow {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 1px solid rgba(61, 180, 255, 0.55);
  background: rgba(61, 180, 255, 0.14);
  box-shadow: 0 0 22px rgba(61, 180, 255, 0.28);
  display: grid;
  place-items: center;
  margin-top: auto;
}

.club-foryou__cta-arrow svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: var(--fy-accent);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.club-foryou__foot {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 22px 0 0;
  color: var(--fy-dim);
  font-size: 13.5px;
  line-height: 1.45;
}

.club-foryou__spark {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--fy-accent);
  box-shadow: 0 0 12px rgba(61, 180, 255, 0.7);
}

@media (max-width: 1100px) {
  .club-foryou__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas:
      "c01 c02"
      "c03 c04"
      "vis vis"
      "c05 c06"
      "cta cta";
  }
}

@media (max-width: 980px) {
  .club-foryou {
    padding: 24px 0 36px;
  }

  .club-foryou__shell {
    padding: 0 0 0 16px;
  }

  .club-foryou__head {
    padding-right: 16px;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 16px;
  }

  .club-foryou__title {
    font-size: clamp(28px, 9vw, 36px);
    max-width: 10ch;
  }

  .club-foryou__desktop {
    display: none;
  }

  .club-foryou__mobile {
    display: block;
  }

  .club-foryou__track {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(320px, 92%);
    grid-auto-rows: 1fr;
    gap: 14px;
    overflow-x: auto;
    overflow-y: visible;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    padding: 4px 16px 18px 0;
    scrollbar-width: none;
    align-items: stretch;
  }

  .club-foryou__track::-webkit-scrollbar {
    display: none;
  }

  .club-foryou__square {
    scroll-snap-align: start;
    aspect-ratio: unset;
    width: 100%;
    height: 100%;
    min-height: 360px;
    padding: 22px 20px 24px;
    border-radius: 22px;
    border: 1px solid var(--fy-line);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 55%),
      var(--fy-surface);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: visible;
    box-sizing: border-box;
  }

  .club-foryou__square .club-foryou__icon {
    margin-top: 14px;
    width: 46px;
    height: 46px;
    flex-shrink: 0;
  }

  .club-foryou__square h3 {
    margin: 16px 0 0;
    padding: 0;
    font-size: 17px;
    line-height: 1.3;
    letter-spacing: 0.01em;
    display: block;
    width: 100%;
    max-width: 100%;
    flex: none;
    height: auto;
    max-height: none;
    overflow: visible;
    text-overflow: unset;
    white-space: normal;
    overflow-wrap: break-word;
    word-break: normal;
    -webkit-line-clamp: unset;
    line-clamp: unset;
  }

  .club-foryou__square p {
    margin: 12px 0 0;
    padding: 0;
    font-size: 14.5px;
    line-height: 1.55;
    display: block;
    width: 100%;
    max-width: 100%;
    flex: none;
    height: auto;
    max-height: none;
    overflow: visible;
    text-overflow: unset;
    white-space: normal;
    overflow-wrap: break-word;
    -webkit-line-clamp: unset;
    line-clamp: unset;
  }

  .club-foryou__square--cta {
    text-decoration: none;
    color: #fff !important;
    justify-content: space-between;
  }

  .club-foryou__square--cta strong {
    margin-top: 18px;
    font-family: var(--font-display, Oswald, sans-serif);
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    flex: 0 0 auto;
  }

  .club-foryou__square--cta .club-foryou__cta-arrow {
    margin-top: auto;
    flex-shrink: 0;
  }

  .club-foryou__foot {
    padding-right: 16px;
    margin-top: 14px;
    font-size: 13px;
  }
}

@media (max-width: 420px) {
  .club-foryou__track {
    grid-auto-columns: minmax(300px, 94%);
  }

  .club-foryou__square {
    min-height: 380px;
    padding: 20px 18px 22px;
  }

  .club-foryou__square h3 {
    font-size: 16px;
  }

  .club-foryou__square p {
    font-size: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .club-foryou__track {
    scroll-behavior: auto;
  }
  .club-foryou__nav-btn,
  .club-foryou__cta {
    transition: none;
  }
}
`;
