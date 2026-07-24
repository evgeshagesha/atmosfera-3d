"use client";

import { useCallback, useEffect, useState } from "react";

export function useMobileBurgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navClassName = (base: string) =>
    [
      base,
      menuOpen ? "t-menu-base__burgermenu_opened" : "tmenu-mobile__menucontent_hidden",
    ].join(" ");

  return { menuOpen, closeMenu, toggleMenu, navClassName };
}
