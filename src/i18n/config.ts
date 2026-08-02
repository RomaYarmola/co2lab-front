export const locales = ["en", "uk", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * Локалі, які показуємо у перемикачі мов.
 * RU навмисно прихована: сторінки доступні лише за прямим URL і залишаються
 * у sitemap/hreflang для SEO.
 */
export const visibleLocales: Locale[] = ["en", "uk"];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  uk: "UA",
  ru: "RU",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  uk: "Українська",
  ru: "Русский",
};

/** Значення для og:locale та html[lang] */
export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  uk: "uk_UA",
  ru: "ru_RU",
};

export const htmlLangs: Record<Locale, string> = {
  en: "en",
  uk: "uk",
  ru: "ru",
};

/** hreflang-значення (x-default вішаємо на дефолтну локаль) */
export const hreflangs: Record<Locale, string> = {
  en: "en",
  uk: "uk-UA",
  ru: "ru-RU",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Префікс локалі в URL. Дефолтна локаль живе в корені (`/about`),
 * решта — з префіксом (`/uk/about`, `/ru/about`).
 */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/** Будує повний шлях для локалі: ("uk", "/about") → "/uk/about" */
export function localizePath(locale: Locale, path: string): string {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const prefixed = `${localePrefix(locale)}${normalized}`;
  return prefixed === "" ? "/" : prefixed;
}
