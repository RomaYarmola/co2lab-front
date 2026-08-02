import type { Locale } from "@/i18n/config";

const LOCALE_TAGS: Record<Locale, string> = {
  en: "en-GB",
  uk: "uk-UA",
  ru: "ru-RU",
};

export function formatDate(value: string | undefined, locale: Locale): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
