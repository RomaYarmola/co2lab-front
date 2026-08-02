import {
  defaultLocale,
  hreflangs,
  locales,
  localizePath,
  type Locale,
} from "@/i18n/config";
import { getBaseUrl } from "./createMetadata";

/**
 * hreflang для сутностей із різними slug-ами по мовах.
 * `basePath` — незмінна частина ("/catalog", "/blog"),
 * `slugs` — мапа локаль → slug з Sanity.
 *
 * Локалі без власного slug пропускаємо: посилатися на чужий URL
 * як на переклад — гірше, ніж не вказати альтернативу взагалі.
 */
export function buildAlternatesFromSlugs(
  basePath: string,
  slugs: Partial<Record<Locale, string>>,
): Record<string, string> {
  const baseUrl = getBaseUrl();
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    const slug = slugs[locale];
    if (!slug) continue;
    languages[hreflangs[locale]] = `${baseUrl}${localizePath(locale, `${basePath}/${slug}`)}`;
  }

  const defaultSlug = slugs[defaultLocale];
  if (defaultSlug) {
    languages["x-default"] =
      `${baseUrl}${localizePath(defaultLocale, `${basePath}/${defaultSlug}`)}`;
  }

  return languages;
}
