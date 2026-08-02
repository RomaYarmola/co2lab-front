import { defaultLocale, locales, type Locale } from "@/i18n/config";

export type LocalizedString = Partial<Record<Locale, string>> | null | undefined;
export type LocalizedSlug =
  | Partial<Record<Locale, { current?: string } | null>>
  | null
  | undefined;

/** Порядок фолбеку: спершу потрібна локаль, далі EN, далі будь-яка непорожня. */
function fallbackOrder(locale: Locale): Locale[] {
  return [locale, defaultLocale, ...locales.filter((l) => l !== locale)];
}

export function pickLocalized(
  value: LocalizedString,
  locale: Locale,
): string {
  if (!value) return "";
  for (const key of fallbackOrder(locale)) {
    const text = value[key];
    if (typeof text === "string" && text.trim()) return text.trim();
  }
  return "";
}

/** Slug потрібної локалі; якщо перекладу немає — англійський. */
export function pickSlug(value: LocalizedSlug, locale: Locale): string {
  if (!value) return "";
  for (const key of fallbackOrder(locale)) {
    const current = value[key]?.current;
    if (typeof current === "string" && current.trim()) return current.trim();
  }
  return "";
}

/**
 * Усі slug документа по локалях — потрібно, щоб побудувати hreflang,
 * коли URL різні для кожної мови.
 */
export function allSlugs(value: LocalizedSlug): Record<Locale, string> {
  const result = {} as Record<Locale, string>;
  for (const locale of locales) {
    result[locale] = pickSlug(value, locale);
  }
  return result;
}

/** Portable Text для локалі з фолбеком на EN. */
export function pickBlocks<T>(
  value: Partial<Record<Locale, T[] | null>> | null | undefined,
  locale: Locale,
): T[] {
  if (!value) return [];
  for (const key of fallbackOrder(locale)) {
    const blocks = value[key];
    if (Array.isArray(blocks) && blocks.length > 0) return blocks;
  }
  return [];
}

/** Масив локалізованих рядків → масив рядків, порожні відкидаються. */
export function pickLocalizedList(
  value: LocalizedString[] | null | undefined,
  locale: Locale,
): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => pickLocalized(item, locale)).filter(Boolean);
}
