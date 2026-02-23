"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChevronIcon from "@/components/shared/icons/ChevronIcon";
import { navMenuList } from "@/constants/navMenu";

interface MobileNavMenuProps {
  setIsOpenBurgerMenu: Dispatch<SetStateAction<boolean>>;
}

export default function MobileNavMenu({
  setIsOpenBurgerMenu,
}: MobileNavMenuProps) {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsItem = navMenuList[2];

  const closeBurger = () => setIsOpenBurgerMenu(false);

  return (
    <nav aria-label="Mobile menu">
      <ul className="flex flex-col gap-8">
        {navMenuList.map((item) =>
          item.slug ? (
            <li key={item.title}>
              <Link
                href={item.slug}
                onClick={closeBurger}
                className="block text-[24px] font-medium leading-[120%] uppercase hover:opacity-80 transition-opacity"
              >
                {item.title}
              </Link>
            </li>
          ) : (
            <li key={item.title} className="flex flex-col">
              <button
                type="button"
                onClick={() => setSolutionsOpen((prev) => !prev)}
                className="flex items-center gap-3 w-full text-[24px] font-medium leading-[120%] uppercase hover:opacity-80 transition-opacity"
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
              >
                {item.title}
                <ChevronIcon open={solutionsOpen} className="shrink-0 size-6" />
              </button>
              <AnimatePresence initial={false}>
                {solutionsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: {
                          duration: 0.25,
                          ease: [0.25, 0.1, 0.25, 1],
                        },
                        opacity: {
                          duration: 0.2,
                          delay: 0.05,
                        },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: {
                          duration: 0.2,
                          ease: [0.42, 0, 1, 1],
                        },
                        opacity: { duration: 0.15 },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <ul className="flex flex-col gap-6 pl-6 pt-6">
                      {solutionsItem.submenu?.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            href={sub.slug}
                            onClick={closeBurger}
                            className="block text-[20px] font-medium leading-[120%] uppercase hover:opacity-80 transition-opacity"
                          >
                            {sub.title}
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
