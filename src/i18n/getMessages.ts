import { cache } from "react";
import type { Locale } from "./config";
import { defaultLocale } from "./config";
import en, { type Messages } from "./messages/en";
import uk from "./messages/uk";
import ru from "./messages/ru";

const dictionaries: Record<Locale, Messages> = { en, uk, ru };

export const getMessages = cache((locale: Locale): Messages => {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
});

export type { Messages };
