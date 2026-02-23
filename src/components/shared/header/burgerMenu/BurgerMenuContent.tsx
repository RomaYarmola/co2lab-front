"use client";

import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  burgerMenuVariants,
  burgerListVariants,
} from "@/utils/animationVariants";
import MobileNavMenu from "./MobileNavMenu";
import Container from "../../container/Container";
import Image from "next/image";

interface BurgerMenuContentProps {
  isOpen: boolean;
  setIsOpenBurgerMenu: Dispatch<SetStateAction<boolean>>;
}

export default function BurgerMenuContent({
  isOpen,
  setIsOpenBurgerMenu,
}: BurgerMenuContentProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="md:hidden fixed right-0 top-0 z-40 pt-[71px] w-full h-dvh max-h-dvh bg-white overflow-hidden no-doc-scroll"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={burgerMenuVariants}
        >
          <Image quality={90}
            src="/images/header/imageTop.svg"
            alt=""
            width={186}
            height={328}
            className="absolute top-24 right-0 pointer-events-none"
            aria-hidden
          />
          <Image quality={90}
            src="/images/header/imageBottom.svg"
            alt=""
            width={239}
            height={280}
            className="absolute bottom-0 left-0 pointer-events-none"
            aria-hidden
          />
          <Container
            className="flex flex-col justify-between h-full pt-24 pb-[93px] overflow-y-auto scrollbar scrollbar-w-[3px] scrollbar-thumb-rounded-full 
          scrollbar-track-rounded-full scrollbar-thumb-black/50 scrollbar-track-transparent"
          >
            {/* Меню */}
            <motion.div
              variants={burgerListVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <MobileNavMenu setIsOpenBurgerMenu={setIsOpenBurgerMenu} />
            </motion.div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
