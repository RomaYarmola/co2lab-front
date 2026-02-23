import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  return (
    <h2
      className={twMerge(
        "text-[28px] lg:text-[48px] font-medium leading-[120%] uppercase",
        className,
      )}
    >
      {children}
    </h2>
  );
}
