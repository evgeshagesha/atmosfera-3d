export const SITE_HEADER_STYLES = [
  "#rec2034125441 .t-menu-base__imglogo{max-width:60px;width:60px;}",
  "#rec2034125441 .t-menu-burger__text{color:#ffffff;}",
  "#rec2034125441 .t-menu-burger{border-radius:31px;}",
  `.tmenu-mobile{background-color:#111;display:none;width:100%;top:0;z-index:990;}
.tmenu-mobile_positionfixed{position:fixed;}
.tmenu-mobile__text{color:#000;}
.tmenu-mobile__container{min-height:64px;padding:20px;position:relative;box-sizing:border-box;display:flex;justify-content:space-between;align-items:center;}
.tmenu-mobile__list{display:block;}
.tmenu-mobile__container_logocenter > .t-menu-base__logowrapper,.tmenu-mobile__container_logocenter > .tmenu-mobile__text{position:absolute;left:50%;transform:translateX(-50%);}
.tmenu-mobile__burgerlogo{display:inline-block;font-size:24px;font-weight:400;white-space:nowrap;vertical-align:middle;}
@media screen and (max-width:960px){.tmenu-mobile__menucontent_hidden{display:none;height:auto;}.tmenu-mobile{display:block;}}
@media screen and (max-width:960px){#rec2034125441 .tmenu-mobile{background-color:#000000;}}`,
  "#rec2034125441 .tmenu-mobile__burgerlogo a{font-size:20px;line-height:1;color:#ffffff;font-weight:600;}",
  "#rec2034125441 .tmenu-mobile__burgerlogo__title{font-size:20px;line-height:1;color:#ffffff;font-weight:600;}",
  "#rec2034125441 .t-menu__link-item{}@supports (overflow:-webkit-marquee) and (justify-content:inherit){#rec2034125441 .t-menu__link-item,#rec2034125441 .t-menu__link-item.t-active{opacity:1 !important;}}",
  `#rec2034125441 .t-menu-base__textlogo{font-size:20px;line-height:1;color:#ffffff;font-weight:600;}
#allrecords #rec2034125441 .t-menu-base__list-item a.t-menu__link-item{font-size:16px;font-weight:600;color:#ffffff;}
#rec2034125441 .t-menu-base__right_descr{font-size:14px;}
@media screen and (max-width:480px),(orientation:landscape) and (max-height:480px){#rec2034125441 .t-menu-base__right_descr{font-size:16px;}}
#rec2034125441 .t-menu-base__langs_flex .t-menu-base__langs-item a{text-transform:uppercase;color:#000000;font-family:'TildaSans';font-weight:600;}
@media screen and (max-width:480px),(orientation:landscape) and (max-height:480px){#rec2034125441 .t-menu-base__langs_flex .t-menu-base__langs-item a{font-size:16px;}}
#rec2034125441 .t-menu-base__langs-button{text-transform:uppercase;color:#000000;font-family:'TildaSans';font-weight:600;}
@media screen and (max-width:480px),(orientation:landscape) and (max-height:480px){#rec2034125441 .t-menu-base__langs-button{font-size:16px;}}`,
  "#rec2034125441 .t-menu-base,#rec2034125441.t-menu-base__mobile-menu {box-shadow:0px 10px 20px rgba(0,11,48,0.25);}",
  `#rec2034125441 .t-menu-base__maincontainer{min-height:0px;}
#rec2034125441 .t-menuwidgeticons__icon{background-color:;}
#rec2034125441 .t-menu-base,#rec2034125441 .t-menu-base__maincontainer{border-radius:25px;}
#rec2034125441 .t-menu-base{min-height:0px;}
#rec2034125441 .t-menu-base__list{gap:30px;}
#rec2034125441 .t-menu-base,#rec2034125441 .t-menu-base__mobile-menu{border-bottom:1px solid rgba(255,255,255,0.70);}
#rec2034125441 .t-menu-base{background-color:rgba(0,0,0,1);}
#rec2034125441 .t-menusub__menu--fullscreen{background-color:rgba(0,0,0,1) !important;}
@media screen and (max-width:960px){#rec2034125441 .t-menu-base{position:static;}
#rec2034125441 .t-menu-base__maincontainer{background-color:#000000 !important;}
#rec2034125441 .t-menu-base__burgermenu__fullscreen .t-menu-base__maincontainer{padding-top:calc(64px + 0px + 40px);}
.t1272__body_menushowed #rec2034125441 .t-menu-base__overlay{background-color:rgba(0,0,0,0.6) !important;}
#rec2034125441 .t-menu-base.t-menu-base__burgermenu__fullwidth{background-color:rgba(0,0,0,0.6) !important;}
#rec2034125441 .t-menu-base__burgermenu__sidebar{}
#rec2034125441 .t-menu-base__maincontainer.t-menu-base__burgermenu__fullscreen,#rec2034125441 .t-menu-base__maincontainer.t-menu-base__burgermenu__sidebar{min-height:calc(100vh - 0px);}
#rec2034125441 .t-menu-base{right:0;}
#rec2034125441 .t-menu-base__burgermenu,#rec2034125441 .t-menu-base__burgermenu__close-button{background-color:#000000 !important;}}`,
] as const;

export const LOGO_SRC =
  "/assets/tild6639-3332-4337-b133-303863303235/EG_atmosfera3D_stick.png";

export const NAV_ITEMS = [
  { href: "#online", label: "С ЧЕГО НАЧАТЬ", number: "1" },
  { href: "#rec2224175751", label: "ОТЗЫВЫ", number: "2" },
  { href: "#online", label: "Форматы работы", number: "3" },
  { href: "#rec2169195921", label: "Блог и статьи", number: "4" },
  { href: "#rec2038650181", label: "студия", number: "5" },
] as const;

export const SOCIAL_LINKS = [
  {
    href: "https://t.me/EGoshev",
    label: "telegram",
    className: "t-sociallinks__item t-sociallinks__item_telegram",
  },
  {
    href: "https://vk.ru/egoshevclub",
    label: "vk",
    className: "t-sociallinks__item t-sociallinks__item_vk",
  },
  {
    href: "https://youtube.com/@egoshev?si=nKraEz_q_nKTEeKM",
    label: "youtube",
    className: "t-sociallinks__item t-sociallinks__item_youtube",
  },
] as const;
