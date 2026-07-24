"use client";

import { useMobileBurgerMenu } from "@/components/site/useMobileBurgerMenu";
import { useT1272MenuCentering } from "@/components/site/useT1272MenuCentering";
import {
  LOGO_SRC,
  NAV_ITEMS,
  SITE_HEADER_STYLES,
  SOCIAL_LINKS,
} from "./styles";
import type { ImgHTMLAttributes } from "react";

function BlockStyle({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

function Logo() {
  return (
    <img
      className="t-menu-base__imglogo t-menu-base__imglogomobile"
      src={LOGO_SRC}
      {...({ imgfield: "img" } as ImgHTMLAttributes<HTMLImageElement>)}
      alt=""
    />
  );
}

function BurgerIcon() {
  return (
    <>
      <span style={{ backgroundColor: "#ffffff" }} />
      <span style={{ backgroundColor: "#ffffff" }} />
      <span style={{ backgroundColor: "#ffffff" }} />
      <span style={{ backgroundColor: "#ffffff" }} />
    </>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "telegram") {
    return (
      <svg
        className="t-sociallinks__svg"
        role="presentation"
        width="30px"
        height="30px"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50Zm21.977-68.056c.386-4.38-4.24-2.576-4.24-2.576-3.415 1.414-6.937 2.85-10.497 4.302-11.04 4.503-22.444 9.155-32.159 13.734-5.268 1.932-2.184 3.864-2.184 3.864l8.351 2.577c3.855 1.16 5.91-.129 5.91-.129l17.988-12.238c6.424-4.38 4.882-.773 3.34.773l-13.49 12.882c-2.056 1.804-1.028 3.35-.129 4.123 2.55 2.249 8.82 6.364 11.557 8.16.712.467 1.185.778 1.292.858.642.515 4.111 2.834 6.424 2.319 2.313-.516 2.57-3.479 2.57-3.479l3.083-20.226c.462-3.511.993-6.886 1.417-9.582.4-2.546.705-4.485.767-5.362Z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  if (label === "vk") {
    return (
      <svg
        className="t-sociallinks__svg"
        role="presentation"
        width="30px"
        height="30px"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50ZM25 34c.406 19.488 10.15 31.2 27.233 31.2h.968V54.05c6.278.625 11.024 5.216 12.93 11.15H75c-2.436-8.87-8.838-13.773-12.836-15.647C66.162 47.242 71.783 41.62 73.126 34h-8.058c-1.749 6.184-6.932 11.805-11.867 12.336V34h-8.057v21.611C40.147 54.362 33.838 48.304 33.556 34H25Z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  return (
    <svg
      className="t-sociallinks__svg"
      role="presentation"
      width="30px"
      height="30px"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50Zm17.9-67.374c3.838.346 6 2.695 6.474 6.438.332 2.612.626 6.352.626 10.375 0 7.064-.626 11.148-.626 11.148-.588 3.728-2.39 5.752-6.18 6.18-4.235.48-13.76.7-17.992.7-4.38 0-13.237-.184-17.66-.552-3.8-.317-6.394-2.44-6.916-6.218-.38-2.752-.626-6.022-.626-11.222 0-5.788.209-8.238.7-10.853.699-3.732 2.48-5.54 6.548-5.96C36.516 32.221 40.55 32 49.577 32c4.413 0 13.927.228 18.322.626Zm-23.216 9.761v14.374L58.37 49.5l-13.686-7.114Z"
        fill="#ffffff"
      />
    </svg>
  );
}

export default function SiteHeader() {
  const { menuOpen, closeMenu, toggleMenu, navClassName } = useMobileBurgerMenu();
  const headerRef = useT1272MenuCentering();

  return (
    <div
      ref={headerRef}
      id="rec2034125441"
      className="r t-rec"
      style={{}}
      data-animationappear="off"
      data-record-type="2084"
      data-parenttplid="1272"
      suppressHydrationWarning
    >
      <div id="nav2034125441marker" />
      <div
        className="t1272"
        data-menu="yes"
        data-full-submenu-mob="y"
        data-menu-widgeticons-hide="yes"
      >
        <div
          className={`t-menu-base__mobile-menu tmenu-mobile${menuOpen ? " tmenu-mobile_opened" : ""}`}
        >
          <div
            className="tmenu-mobile__container tmenu-mobile__container_right tmenu-mobile__container_logoleft"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) return;
              toggleMenu();
            }}
            onKeyDown={() => undefined}
            role="presentation"
          >
            <div className="t-menu-base__logowrapper t-menu-base__logowrapper_center t-menu-base__logowrapper_both t-menu-base__logowrapper_mobile">
              <div className="t-menu-base__logo">
                <Logo />
              </div>
            </div>
            <BlockStyle css={SITE_HEADER_STYLES[0]} />
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label="Навигационное меню"
              className={`t-menu-burger t-menuburger t-menu-base__burger_mlauto${menuOpen ? " t-menuburger-opened t-menu-burger_open" : ""}`}
              onClick={(event) => {
                event.stopPropagation();
                toggleMenu();
              }}
            >
              <div className="t-menu-burger__icon t-menu-burger__icon_first t-menu-burger__icon_small">
                <BurgerIcon />
              </div>
            </button>
            <BlockStyle css={SITE_HEADER_STYLES[1]} />
            <BlockStyle css={SITE_HEADER_STYLES[2]} />
          </div>
        </div>
        <BlockStyle css={SITE_HEADER_STYLES[3]} />
        <BlockStyle css={SITE_HEADER_STYLES[4]} />
        <BlockStyle css={SITE_HEADER_STYLES[5]} />

        <div
          id="nav2034125441"
          className={navClassName(
            "t-menu-base t-menu-base_mobile-center t-menu-base__burgermenu__default"
          )}
          style={menuOpen ? { display: "block", opacity: 1 } : undefined}
          data-navmarker="nav2034125441marker"
          data-appearoffset=""
          data-bgopacity-two="0.5"
          data-menu="yes"
          data-bgcolor-hex="#000000"
          data-bgcolor-rgba="rgba(0,0,0,1)"
          data-bgopacity="1"
          data-bgcolor-rgba-afterscroll="rgba(0,0,0,0.50)"
          data-menushadow=""
          data-menushadow-css="0px 10px 20px rgba(0,11,48,0.25)"
        >
          <div className="t-menu-base__maincontainer t-menu-base__maincontainer_100 t-menu-base__maincontainer_100-40 t-menu-base__maincontainer_logocenter">
            <ul
              role="list"
              className="t-menu-base__list t-menu__list t-menu-base__list_leftside t-menu-base__list_align-center"
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.number} className="t-menu-base__list-item">
                  <div className="t-menu__link-wrapper" data-menu-submenu-hook="">
                    <a
                      className="t-menu__link-item"
                      href={item.href}
                      data-menu-item-number={item.number}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <div className="t-menu-base__logowrapper t-menu-base__logowrapper_center t-menu-base__logowrapper_both">
              <div className="t-menu-base__logo">
                <Logo />
              </div>
            </div>
            <BlockStyle css={SITE_HEADER_STYLES[0]} />

            <div className="t-menu-base__rightwrapper t-menu-base__wrapper">
              <div className="t-menu-base__additionalwrapper">
                <div className="t-sociallinks">
                  <ul
                    role="list"
                    className="t-sociallinks__wrapper"
                    aria-label="Social media links"
                  >
                    {SOCIAL_LINKS.flatMap((link, index) => [
                      index > 0 ? "\u00a0" : null,
                      <li key={link.label} className={link.className}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="nofollow"
                          aria-label={link.label}
                          style={{ width: "30px", height: "30px" }}
                        >
                          <SocialIcon label={link.label} />
                        </a>
                      </li>,
                    ])}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BlockStyle css={SITE_HEADER_STYLES[6]} />
      <BlockStyle css={SITE_HEADER_STYLES[7]} />
      <BlockStyle css={SITE_HEADER_STYLES[8]} />
      <BlockStyle css={SITE_HEADER_STYLES[9]} />
    </div>
  );
}
