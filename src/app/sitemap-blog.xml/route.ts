import { locales } from "@/i18n/config";
import { ROUTES } from "@/constants/routes";
import { fetchBlogCategories, fetchBlogSitemapEntries } from "@/lib/sanity/fetchers";
import { allSlugs } from "@/lib/sanity/localized";
import { buildSitemapXml, XML_HEADERS, type SitemapUrl } from "@/lib/seo/sitemapXml";

export const revalidate = 3600;

export async function GET() {
  const [posts, categories] = await Promise.all([
    fetchBlogSitemapEntries(),
    fetchBlogCategories(),
  ]);

  const categoryUrls: SitemapUrl[] = categories
    .filter((category) => (category.postCount ?? 0) > 0)
    .map((category) => {
      const slugs = allSlugs(category.slug);
      return {
        paths: Object.fromEntries(
          locales
            .filter((locale) => slugs[locale])
            .map((locale) => [locale, `${ROUTES.blog}/category/${slugs[locale]}`]),
        ),
        lastModified: category._updatedAt,
        changeFrequency: "weekly",
        priority: 0.6,
      };
    });

  const postUrls: SitemapUrl[] = posts.map((entry) => {
    const slugs = allSlugs(entry.slug);
    return {
      paths: Object.fromEntries(
        locales
          .filter((locale) => slugs[locale])
          .map((locale) => [locale, `${ROUTES.blog}/${slugs[locale]}`]),
      ),
      lastModified: entry.updatedAt ?? entry.publishedAt ?? entry._updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return new Response(buildSitemapXml([...categoryUrls, ...postUrls]), {
    headers: XML_HEADERS,
  });
}
