import { twMerge } from "tailwind-merge";

type ClassValue = string | number | null | undefined | false;

/** Обʼєднує класи й прибирає конфлікти Tailwind. */
export function cn(...classes: ClassValue[]): string {
  return twMerge(classes.filter(Boolean).join(" "));
}
