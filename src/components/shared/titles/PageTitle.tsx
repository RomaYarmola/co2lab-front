import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

export default function PageTitle({
  children,
  className = "",
}: PageTitleProps) {
  return (
    <h1
      className={twMerge(
        "text-[32px] lg:text-[48px] xl:text-[66px] font-medium leading-[120%] uppercase",
        className,
      )}
    >
      {children}
    </h1>
  );
}
