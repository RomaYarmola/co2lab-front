import { permanentRedirect } from "next/navigation";
import { localizePath, type Locale } from "@/i18n/config";
import { pickSlug, type LocalizedSlug } from "@/lib/sanity/localized";

/**
 * Документ віддавав 200 під будь-яким зі своїх slug-ів у будь-якому мовному
 * префіксі: /ru/catalog/category/<uk-slug> рендерився російською й ставив
 * канонічний URL сам на себе. На 104 сутності виходило 312 індексованих
 * адрес — Google міг спалити на них і без того малий бюджет сканування.
 *
 * Тепер чужомовний slug відповідає 308 на канонічний URL цієї ж локалі.
 * Викликаємо в тілі сторінки: permanentRedirect кидає виняток, тож код
 * після нього не виконується — і ніколи не загортаємо виклик у try/catch.
 */
export function redirectToLocalizedSlug(
  locale: Locale,
  basePath: string,
  requestedSlug: string,
  slug: LocalizedSlug,
): void {
  const canonical = pickSlug(slug, locale);
  if (!canonical || canonical === requestedSlug) return;
  permanentRedirect(localizePath(locale, `${basePath}/${canonical}`));
}
