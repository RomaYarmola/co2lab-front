"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "motion/react";
import Container from "../container/Container";
import LogoLink from "../logoLink/LogoLink";
import NavMenu from "./NavMenu";
import BurgerMenu from "./burgerMenu/BurgerMenu";
import { ROUTES } from "@/constants/routes";
import type { Locale } from "@/i18n/config";
import { splitLocalePath } from "@/utils/localePathname";

const WHITE_LOGO_PATHS: string[] = [
  ROUTES.engineeringSolutions,
  ROUTES.equipmentAndSystems,
  ROUTES.supply,
  ROUTES.industriesWeServe,
];

export default function Header({ locale }: { locale: Locale }) {
  const rawPathname = usePathname();
  const { path: pathname } = splitLocalePath(rawPathname);
  const whiteLogoOnLg = WHITE_LOGO_PATHS.includes(pathname);
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPosition(latest);
  });

  return (
    <header className="fixed left-0 right-0 top-0 z-50 py-2 lg:py-9">
      <Container className="relative z-10 flex items-center justify-between rounded-full xl:gap-16">
        {scrollPosition > 20 && (
          <>
            <div
              className="xl:hidden absolute w-[calc(100%-8px)] h-full top-0 left-1 px-4 -z-10 rounded-full bg-[linear-gradient(90.95deg,rgba(231,231,231,0.8)_52.25%,rgba(255,255,255,0.8)_99.18%)] shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]"
              aria-hidden
            />
            <div
              className="xl:hidden absolute w-[calc(100%-8px)] h-full top-0 left-1 -z-10 rounded-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
                padding: "1px",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
              aria-hidden
            />
          </>
        )}
        <div className={`relative py-2 lg:ml-7`}>
          <LogoLink
            locale={locale}
            onNavigate={() => setIsOpenBurgerMenu(false)}
            className={
              whiteLogoOnLg && scrollPosition <= 20
                ? "lg:[--logo-fill:var(--color-white)]"
                : undefined
            }
          />
          {scrollPosition > 20 && (
            <>
              <div
                className="hidden xl:block absolute w-[calc(100%+16px)] h-full top-0 -left-2 px-4 -z-10 rounded-full bg-[linear-gradient(90.95deg,rgba(231,231,231,0.8)_52.25%,rgba(255,255,255,0.8)_99.18%)] shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]"
                aria-hidden
              />
              <div
                className="hidden xl:block absolute w-[calc(100%+16px)] h-full top-0 -left-2 -z-10 rounded-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
                  padding: "1px",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
                aria-hidden
              />
            </>
          )}
        </div>

        <NavMenu locale={locale} />
        <BurgerMenu
          locale={locale}
          lightOnLg={whiteLogoOnLg && scrollPosition <= 20}
          isOpenBurgerMenu={isOpenBurgerMenu}
          setIsOpenBurgerMenu={setIsOpenBurgerMenu}
        />
      </Container>
    </header>
  );
}
