"use client";
import { motion } from "framer-motion";

interface BurgerMenuButtonProps {
  isHeaderMenuOpened?: boolean;
  toggleHeaderMenuOpen?: () => void;
  /** Білі лінії на lg-екранах: там бургер лягає на темний hero */
  lightOnLg?: boolean;
}

export default function BurgerMenuButton({
  isHeaderMenuOpened = false,
  toggleHeaderMenuOpen,
  lightOnLg = false,
}: BurgerMenuButtonProps) {
  const lineClass = `absolute w-full rounded-md bg-black${
    lightOnLg ? " lg:bg-white" : ""
  }`;

  return (
    <button
      aria-label="open menu button"
      type="button"
      onClick={toggleHeaderMenuOpen}
      className="xl:hidden group relative z-60 size-10 px-[6.6px] py-2.5 ml-6 outline-none"
    >
      <div className="w-full h-full relative">
        {/* Верхня лінія */}
        <motion.span
          className={`${lineClass} h-[1.8px]`}
          initial={{
            top: "0px",
            left: "0",
            opacity: 1,
          }}
          animate={
            isHeaderMenuOpened
              ? {
                  top: "10px", // Переміщаємо в центр
                  left: "0",
                  opacity: 0,
                }
              : {
                  top: "0px", // Повертаємо на початкове місце
                  left: "0",
                  opacity: 1,
                }
          }
          transition={{ duration: 0.7, ease: "easeOut" }} // Плавний перехід
        />

        {/* Середня лінія */}
        <motion.span
          className={`${lineClass} h-[1.8px]`}
          initial={{
            top: "10px",
            left: "0",
          }}
          animate={
            isHeaderMenuOpened ? { rotate: "45deg" } : { rotate: "0deg" }
          }
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        {/* Нижня лінія */}
        <motion.span
          className={`${lineClass} h-[1.9px]`}
          initial={{
            top: "19px",
            left: "0",
          }}
          animate={
            isHeaderMenuOpened
              ? {
                  rotate: "-45deg",
                  top: "10px",
                }
              : {
                  rotate: "0deg",
                  top: "19px",
                }
          }
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </button>
  );
}
