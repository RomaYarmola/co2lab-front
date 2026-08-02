"use client";
import { Dispatch, SetStateAction } from "react";
import BurgerMenuButton from "./BurgerMenuButton";
import BurgerMenuContent from "./BurgerMenuContent";
import type { Locale } from "@/i18n/config";

interface BurgerMenuProps {
  locale: Locale;
  lightOnLg?: boolean;
  isOpenBurgerMenu: boolean;
  setIsOpenBurgerMenu: Dispatch<SetStateAction<boolean>>;
}

export default function BurgerMenu({
  locale,
  lightOnLg = false,
  isOpenBurgerMenu,
  setIsOpenBurgerMenu,
}: BurgerMenuProps) {
  const toggleHeaderMenuOpen = () => setIsOpenBurgerMenu(!isOpenBurgerMenu);
  return (
    <>
      <BurgerMenuButton
        isHeaderMenuOpened={isOpenBurgerMenu}
        toggleHeaderMenuOpen={toggleHeaderMenuOpen}
        lightOnLg={lightOnLg && !isOpenBurgerMenu}
      />
      <BurgerMenuContent
        locale={locale}
        isOpen={isOpenBurgerMenu}
        setIsOpenBurgerMenu={setIsOpenBurgerMenu}
      />
    </>
  );
}
