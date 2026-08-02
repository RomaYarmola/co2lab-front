import { defaultLocale, hreflangs, locales, localizePath, type Locale } from "@/i18n/config";
import { getBaseUrl } from "@/utils/createMetadata";

export type SitemapUrl = {
  /** Логічний шлях без префікса локалі, або мапа локаль → шлях для різних slug. */
  paths: Partial<Record<Locale, string>>;
  lastModified?: string;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

/**
 * Прибирає кінцевий слеш, щоб URL у sitemap збігався з canonical
 * (у next.config увімкнено trailingSlash: false).
 */
function absolute(baseUrl: string, locale: Locale, path: string): string {
  const url = `${baseUrl}${localizePath(locale, path)}`;
  return url.length > baseUrl.length && url.endsWith("/")
    ? url.slice(0, -1)
    : url === `${baseUrl}/`
      ? baseUrl
      : url;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Будує sitemap із xhtml:link alternate для кожної локалі.
 * Вбудований MetadataRoute.Sitemap у Next не дає повного контролю над
 * hreflang для випадку різних slug-ів, тому генеруємо XML вручну.
 */
export function buildSitemapXml(urls: SitemapUrl[]): string {
  const baseUrl = getBaseUrl();

  const entries = urls.flatMap((url) => {
    const available = locales.filter((locale) => Boolean(url.paths[locale]));
    if (available.length === 0) return [];

    const alternates = available
      .map((locale) => {
        const href = absolute(baseUrl, locale, url.paths[locale] as string);
        return `    <xhtml:link rel="alternate" hreflang="${hreflangs[locale]}" href="${escapeXml(href)}"/>`;
      })
      .join("\n");

    const xDefaultPath = url.paths[defaultLocale];
    const xDefault = xDefaultPath
      ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(
          absolute(baseUrl, defaultLocale, xDefaultPath),
        )}"/>`
      : "";

    return available.map((locale) => {
      const loc = absolute(baseUrl, locale, url.paths[locale] as string);
      return [
        "  <url>",
        `    <loc>${escapeXml(loc)}</loc>`,
        url.lastModified
          ? `    <lastmod>${new Date(url.lastModified).toISOString()}</lastmod>`
          : null,
        url.changeFrequency ? `    <changefreq>${url.changeFrequency}</changefreq>` : null,
        url.priority !== undefined ? `    <priority>${url.priority.toFixed(1)}</priority>` : null,
        alternates + xDefault,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    });
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>`;
}

export function buildSitemapIndexXml(paths: string[]): string {
  const baseUrl = getBaseUrl();
  const now = new Date().toISOString();
  const entries = paths
    .map(
      (path) =>
        `  <sitemap>\n    <loc>${escapeXml(`${baseUrl}${path}`)}</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
}

export const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
} as const;
