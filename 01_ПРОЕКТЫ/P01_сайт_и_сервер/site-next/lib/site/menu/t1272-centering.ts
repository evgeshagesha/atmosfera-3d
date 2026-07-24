export type T1272CenteringSelectors = {
  containerSelector: string;
  centerSelector: string;
  leftSideSelector: string;
};

export const T1272_LOGOCENTER_CONFIG: T1272CenteringSelectors = {
  containerSelector: ".t-menu-base__maincontainer_logocenter",
  centerSelector: ".t-menu-base__logowrapper_center",
  leftSideSelector: ".t-menu-base__list_leftside",
};

export const T1272_LOGOLEFT_CONFIG: T1272CenteringSelectors = {
  containerSelector: ".t-menu-base__maincontainer_logoleft",
  centerSelector: ".t-menu-base__leftwrapper_center",
  leftSideSelector: ".t-menu-base__logowrapper_left",
};

/** Port of Tilda t1272_centerElementInMenu — balances left nav width around centered logo. */
export function centerT1272MenuElement(
  root: HTMLElement,
  selectors: T1272CenteringSelectors
): void {
  const container = root.querySelector<HTMLElement>(selectors.containerSelector);
  if (!container) return;

  const centerBlock = container.querySelector<HTMLElement>(selectors.centerSelector);
  if (!centerBlock) return;

  const leftSideBlock = container.querySelector<HTMLElement>(selectors.leftSideSelector);
  if (!leftSideBlock) return;

  const centerWidth = centerBlock.offsetWidth;
  if (centerWidth === 0) return;

  const gap = 50;
  const containerPadding =
    parseInt(getComputedStyle(container).paddingLeft, 10) || 0;
  const sideWidth =
    (container.offsetWidth - containerPadding * 2 - gap * 2 - centerWidth) / 2;

  leftSideBlock.style.flex = `1 1 ${sideWidth}px`;
  leftSideBlock.style.maxWidth = `${sideWidth}px`;
}

export function resetT1272Logocenter(root: HTMLElement): void {
  const leftList = root.querySelector<HTMLElement>(
    ".t-menu-base__maincontainer_logocenter .t-menu-base__list_leftside"
  );
  if (!leftList) return;
  leftList.style.flex = "";
  leftList.style.maxWidth = "";
}

export function recalcT1272MenuCentering(root: HTMLElement): void {
  if (typeof window !== "undefined" && window.innerWidth <= 960) {
    resetT1272Logocenter(root);
    return;
  }

  centerT1272MenuElement(root, T1272_LOGOCENTER_CONFIG);
  centerT1272MenuElement(root, T1272_LOGOLEFT_CONFIG);
}
