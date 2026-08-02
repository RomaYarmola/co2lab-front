import "server-only";
import type { Locale } from "./config";
import { getMessages } from "./getMessages";
import { createTranslator, type Translator } from "./translate";

/**
 * Перекладач для серверних компонентів.
 * `namespace` скорочує шлях: getTranslator(locale, "catalog") → t("noResults").
 */
export function getTranslator(locale: Locale, namespace?: string): Translator {
  return createTranslator(getMessages(locale), namespace);
}

export type { Translator };
