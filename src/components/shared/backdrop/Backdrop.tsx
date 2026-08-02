"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BackdropProps {
  isVisible: boolean;
  onClick: () => void;
  className?: string;
  transparent?: boolean;
}

export default function Backdrop({
  isVisible = false,
  onClick,
  className = "",
  transparent = false,
}: BackdropProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVisible) {
        onClick();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mounted, isVisible, onClick]);

  if (!mounted) {
    return null;
  }

  // inset-0 уже розтягує бекдроп на весь екран; w-dvw враховував ширину
  // скролбара й давав зайвий горизонтальний скрол
  return createPortal(
    <div
      className={`fixed z-[90] inset-0 transition duration-[1000ms] ease-in-out ${
        isVisible
          ? "opacity-100 no-doc-scroll"
          : "opacity-0 pointer-events-none"
      } ${transparent ? "bg-transparent" : "bg-black/60"} ${className}`}
      onClick={onClick}
    />,
    document.body,
  );
}
