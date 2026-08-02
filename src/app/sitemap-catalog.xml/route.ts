import { locales } from "@/i18n/config";
import { ROUTES } from "@/constants/routes";
import {
  fetchProductCategorySitemapEntries,
  fetchProductSitemapEntries,
} from "@/lib/sanity/fetchers";
import { allSlugs } from "@/lib/sanity/localized";
import { buildSitemapXml, XML_HEADERS, type SitemapUrl } from "@/lib/seo/sitemapXml";

export const revalidate = 3600;

export async function GET() {
  const [categories, products] = await Promise.all([
    fetchProductCategorySitemapEntries(),
    fetchProductSitemapEntries(),
  ]);

  const categoryUrls: SitemapUrl[] = categories.map((entry) => {
    const slugs = allSlugs(entry.slug);
    return {
      paths: Object.fromEntries(
        locales
          .filter((locale) => slugs[locale])
          .map((locale) => [
            locale,
            `${ROUTES.catalog}/category/${slugs[locale]}`,
          ]),
      ),
      lastModified: entry._updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });

  const productUrls: SitemapUrl[] = products.map((entry) => {
    const slugs = allSlugs(entry.slug);
    return {
      paths: Object.fromEntries(
        locales
          .filter((locale) => slugs[locale])
          .map((locale) => [locale, `${ROUTES.catalog}/${slugs[locale]}`]),
      ),
      lastModified: entry._updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return new Response(buildSitemapXml([...categoryUrls, ...productUrls]), {
    headers: XML_HEADERS,
  });
}
