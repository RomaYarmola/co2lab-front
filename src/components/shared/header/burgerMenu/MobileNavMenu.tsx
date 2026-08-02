"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChevronIcon from "@/components/shared/icons/ChevronIcon";
import { navMenuList, SOLUTIONS_INDEX } from "@/constants/navMenu";
import { localizePath, type Locale } from "@/i18n/config";
import { useTranslations } from "@/i18n/I18nProvider";

interface MobileNavMenuProps {
  locale: Locale;
  setIsOpenBurgerMenu: Dispatch<SetStateAction<boolean>>;
}

export default function MobileNavMenu({
  locale,
  setIsOpenBurgerMenu,
}: MobileNavMenuProps) {
  const t = useTranslations("nav");
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsItem = navMenuList[SOLUTIONS_INDEX];

  const closeBurger = () => setIsOpenBurgerMenu(false);

  return (
    <nav aria-label={t("mobileMenu")}>
      <ul className="flex flex-col gap-6">
        {navMenuList.map((item) =>
          item.slug ? (
            <li key={item.titleKey}>
              <Link
                href={localizePath(locale, item.slug)}
                onClick={closeBurger}
                className="block text-[22px] font-medium uppercase leading-[120%] transition-opacity hover:opacity-80"
              >
                {t(item.titleKey)}
              </Link>
            </li>
          ) : (
            <li key={item.titleKey} className="flex flex-col">
              <button
                type="button"
                onClick={() => setSolutionsOpen((prev) => !prev)}
                className="flex w-full items-center gap-3 text-[22px] font-medium uppercase leading-[120%] transition-opacity hover:opacity-80"
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
              >
                {t(item.titleKey)}
                <ChevronIcon open={solutionsOpen} className="size-6 shrink-0" />
              </button>
              <AnimatePresence initial={false}>
                {solutionsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
                        opacity: { duration: 0.2, delay: 0.05 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.2, ease: [0.42, 0, 1, 1] },
                        opacity: { duration: 0.15 },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <ul className="flex flex-col gap-5 pl-6 pt-5">
                      {solutionsItem.submenu?.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            href={localizePath(locale, sub.slug)}
                            onClick={closeBurger}
                            className="block text-[18px] font-medium uppercase leading-[120%] transition-opacity hover:opacity-80"
                          >
                            {t(sub.titleKey)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
