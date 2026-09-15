import { locales } from "@/i18n/config";
import { STATIC_CONTENT_UPDATED_AT, STATIC_ROUTES } from "@/constants/routes";
import { buildSitemapXml, XML_HEADERS, type SitemapUrl } from "@/lib/seo/sitemapXml";

export const revalidate = 3600;

export function GET() {
  const urls: SitemapUrl[] = STATIC_ROUTES.map((route) => ({
    // Статичні сторінки мають однаковий шлях у всіх локалях
    paths: Object.fromEntries(locales.map((locale) => [locale, route.path])),
    lastModified: STATIC_CONTENT_UPDATED_AT,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return new Response(buildSitemapXml(urls), { headers: XML_HEADERS });
}
