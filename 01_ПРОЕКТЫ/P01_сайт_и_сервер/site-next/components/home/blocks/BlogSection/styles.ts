/** Fixes for SSR-injected blog cards inside the legacy t1004 slider shell. */
export const BLOG_SECTION_STYLES = `
#rec2169195921 .t-slds__nocycle .t-slds__item {
  opacity: 1 !important;
}

#rec2169195921 .t-slds__nocycle .t-slds__item[data-slide-index="0"] {
  display: block !important;
}

#rec2169195921 .t-slds__arrow_wrapper-left,
#rec2169195921 .t-slds__arrow_wrapper-right {
  display: list-item !important;
}

#rec2169195921 .t-slds__items-wrapper::before,
#rec2169195921 .t-slds__items-wrapper::after {
  content: none !important;
  display: none !important;
}

#rec2169195921 .t-slds__container {
  overflow: hidden;
}

#rec2169195921 #carousel_2169195921 {
  display: flex;
  flex-wrap: nowrap;
  margin: 0;
  overflow: visible !important;
  transition: transform 0.35s ease;
  width: 100%;
  will-change: transform;
}

#rec2169195921 .t-feed__slider-grid__post-wrapper {
  box-sizing: border-box;
  flex: 0 0 calc(100% / 3);
  max-width: calc(100% / 3);
  padding: 0 10px;
  width: calc(100% / 3);
}

#rec2169195921 .t-feed__post {
  background-color: #ffffff;
  border-radius: 24px;
  float: none !important;
  height: 100%;
  margin: 0 !important;
  overflow: hidden;
  width: 100% !important;
  box-shadow: 0 12px 32px -20px rgba(0, 0, 0, 0.45);
}

#rec2169195921 .t-feed__post-imgwrapper {
  margin-bottom: 0;
  padding-bottom: 75%;
  position: relative;
  width: 100%;
  border-radius: 24px 24px 0 0;
  overflow: hidden;
}

#rec2169195921 .t-feed__post-link {
  color: inherit;
  display: block;
  text-decoration: none;
}

#rec2169195921 .t-feed__post-bgimg {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

#rec2169195921 .t-feed__post-title,
#rec2169195921 .t-feed__post-descr {
  color: #000000;
}

#rec2169195921 .t-feed__post-title {
  padding: 16px 16px 8px;
}

#rec2169195921 .t-feed__post-descr {
  padding: 0 16px 16px;
}

@media screen and (max-width: 960px) {
  #rec2169195921 .t-slds__arrow_wrapper {
    display: list-item !important;
  }

  #rec2169195921 .t-feed__slider-grid__post-wrapper {
    flex: 0 0 80%;
    max-width: 80%;
    width: 80%;
  }
}
`;
