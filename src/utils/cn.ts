import { extendTailwindMerge } from "tailwind-merge";

type ClassValue = string | number | null | undefined | false;

/**
 * За замовчуванням tailwind-merge вважає, що `text-*` конфліктує з
 * `leading-*` (у Tailwind v4 іменований розмір шрифту задає й висоту рядка),
 * і викидає `leading-*`, якщо `text-[…]` стоїть після нього. У картках блогу
 * через це заголовок і опис втрачали `leading-[120%]` / `leading-[150%]` і
 * рядки налазили один на одного. Явний `leading-*` у нас завжди свідомий, а
 * в CSS Tailwind v4 він і так перекриває висоту рядка від `text-*`, тож
 * конфлікт прибираємо.
 */
const twMerge = extendTailwindMerge({
  override: {
    conflictingClassGroups: {
      "font-size": [],
    },
  },
});

/** Обʼєднує класи й прибирає конфлікти Tailwind. */
export function cn(...classes: ClassValue[]): string {
  return twMerge(classes.filter(Boolean).join(" "));
}
