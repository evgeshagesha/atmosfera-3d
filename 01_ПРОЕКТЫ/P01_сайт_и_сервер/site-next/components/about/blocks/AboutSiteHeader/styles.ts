export const LOGO_SRC =
  "/assets/tild6639-3332-4337-b133-303863303235/EG_atmosfera3D_stick.png";

export const LEFT_NAV = [
  { href: "#rec2039710061", label: "Обо мне", number: "1" },
  { href: "#rec2042403101", label: "мой путь", number: "2" },
  { href: "#rec2046841831", label: "во что я верю", number: "3" },
] as const;

export const RIGHT_NAV = [
  { href: "#rec2048796451", label: "опыт и практика", number: "4" },
  { href: "#rec2039710141", label: "мой подход", number: "5" },
  { href: "#rec2039710181", label: "контакты", number: "6" },
] as const;

export const SOCIAL_LINKS = [
  {
    href: "https://t.me/EvgeniiGoshev",
    label: "telegram",
    className: "t-sociallinks__item t-sociallinks__item_telegram",
  },
  {
    href: "https://vk.ru/egoshevclub",
    label: "vk",
    className: "t-sociallinks__item t-sociallinks__item_vk",
  },
  {
    href: "https://youtube.com/@egoshev?si=XyIchjHxLCV-vUrs",
    label: "youtube",
    className: "t-sociallinks__item t-sociallinks__item_youtube",
  },
] as const;

export const ABOUT_HEADER_STYLES = [
  "#rec2039710001 .t-menu-base__imglogo{max-width:80px;width:80px;}",
  "#rec2039710001 .t-menu-burger__text{color:#ffffff;}",
  `.tmenu-mobile{background-color:#111;display:none;width:100%;top:0;z-index:990;}
.tmenu-mobile_positionfixed{position:fixed;}
.tmenu-mobile__text{color:#000;}
.tmenu-mobile__container{min-height:64px;padding:20px;position:relative;box-sizing:border-box;display:flex;justify-content:space-between;align-items:center;}
.tmenu-mobile__list{display:block;}
.tmenu-mobile__container_logocenter > .t-menu-base__logowrapper,.tmenu-mobile__container_logocenter > .tmenu-mobile__text{position:absolute;left:50%;transform:translateX(-50%);}
.tmenu-mobile__burgerlogo{display:inline-block;font-size:24px;font-weight:400;white-space:nowrap;vertical-align:middle;}
@media screen and (max-width:960px){.tmenu-mobile__menucontent_hidden{display:none;height:auto;}.tmenu-mobile{display:block;}}
@media screen and (max-width:960px){#rec2039710001 .tmenu-mobile{background-color:#000000;}}`,
  "#rec2039710001 .tmenu-mobile__burgerlogo a{font-size:18px;color:#FFFFFF;}",
  "#rec2039710001 .tmenu-mobile__burgerlogo__title{font-size:18px;color:#FFFFFF;}",
  "#rec2039710001 .t-menu__link-item{}@supports (overflow:-webkit-marquee) and (justify-content:inherit){#rec2039710001 .t-menu__link-item,#rec2039710001 .t-menu__link-item.t-active{opacity:1 !important;}}",
  "#rec2039710001 .t-menu-base__textlogo{font-size:18px;color:#FFFFFF;}#allrecords #rec2039710001 .t-menu-base__list-item a.t-menu__link-item{color:#FFFFFF;}#rec2039710001 .t-menu-base__langs_flex .t-menu-base__langs-item a{text-transform:uppercase;}#rec2039710001 .t-menu-base__langs-button{text-transform:uppercase;}",
  `#rec2039710001 .t-menu-base__maincontainer{}#rec2039710001 .t-menuwidgeticons__icon{background-color:;}#rec2039710001 .t-menu-base{}#rec2039710001 .t-menu-base__list{gap:30px;}#rec2039710001 .t-menu-base,#rec2039710001 .t-menu-base__mobile-menu{border-bottom:1px solid rgba(255,255,255,0.20);}#rec2039710001 .t-menu-base{background-color:rgba();}#rec2039710001 .t-menusub__menu--fullscreen{background-color:rgba(0,0,0,1) !important;}@media screen and (max-width:960px){#rec2039710001 .t-menu-base{position:static;}#rec2039710001 .t-menu-base__maincontainer{background-color:#000000 !important;}#rec2039710001 .t-menu-base__burgermenu__fullscreen .t-menu-base__maincontainer{padding-top:calc(64px + 1px + 40px);}.t1272__body_menushowed #rec2039710001 .t-menu-base__overlay{background-color:rgba(0,0,0,0.6) !important;}#rec2039710001 .t-menu-base.t-menu-base__burgermenu__fullwidth{background-color:rgba(0,0,0,0.6) !important;}#rec2039710001 .t-menu-base__burgermenu__sidebar{}#rec2039710001 .t-menu-base__maincontainer.t-menu-base__burgermenu__fullscreen,#rec2039710001 .t-menu-base__maincontainer.t-menu-base__burgermenu__sidebar{}#rec2039710001 .t-menu-base{right:0;}#rec2039710001 .t-menu-base__burgermenu,#rec2039710001 .t-menu-base__burgermenu__close-button{background-color:#000000 !important;}}`,
] as const;
