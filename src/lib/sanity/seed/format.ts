/**
 * Формати чисел і цін для каталогу. Окремий крихітний модуль без даних:
 * його імпортують і seed (Node-скрипт пушу), і клієнтська картка товару —
 * тож у браузерний бандл не потрапляє модельний ряд із models.ts.
 */
type Lang = "en" | "uk" | "ru";

const INTL_LOCALE: Record<Lang, string> = { en: "en", uk: "uk", ru: "ru" };

const isLang = (value: string): value is Lang => value in INTL_LOCALE;

/** 30 965 / 30,965 — розділювач тисяч за мовою, нерозривний пробіл у uk/ru. */
export function num(value: number, lang: Lang, digits?: number): string {
  return new Intl.NumberFormat(INTL_LOCALE[lang], {
    minimumFractionDigits: digits ?? 0,
    maximumFractionDigits: digits ?? 3,
  }).format(value);
}

/**
 * Ціна в євро: «94 500 €» (uk/ru) і «€94,500» (en). `narrowSymbol`, бо
 * українська локаль без нього пише «94 500 EUR».
 */
export function formatEur(value: number, lang: string): string {
  return new Intl.NumberFormat(isLang(lang) ? INTL_LOCALE[lang] : "uk", {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(value);
}

/** «від 94 500 € без ПДВ» — так клієнт формулює всі ціни в прайсі. */
export function priceFrom(value: number, lang: Lang): string {
  const price = formatEur(value, lang);
  return {
    en: `from ${price} excl. VAT`,
    uk: `від ${price} без ПДВ`,
    ru: `от ${price} без НДС`,
  }[lang];
}
