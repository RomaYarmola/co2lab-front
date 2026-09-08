import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

/**
 * tailwind-merge вважає, що `text-*` конфліктує з `leading-*`: у Tailwind v4
 * утиліта розміру шрифту заразом задає й висоту рядка. Тому будь-який
 * `text-[28px]` у className викидав наш `leading-[120%]` з базового набору,
 * і заголовок успадковував висоту рядка від батька — рядки налазили один на
 * одного. Тримаємо власний leading останнім і додаємо його лише тоді, коли
 * викликач не задав свій.
 */
const hasOwnLeading = (className: string) => /(?:^|\s)leading-/.test(className);

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  return (
    <h2
      className={twMerge(
        "text-[28px] lg:text-[48px] font-medium uppercase",
        className,
        hasOwnLeading(className) ? "" : "leading-[120%]",
      )}
    >
      {children}
    </h2>
  );
}
