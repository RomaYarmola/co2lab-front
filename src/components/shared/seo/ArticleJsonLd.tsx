import JsonLd from "./JsonLd";
import { absoluteUrl, getBaseUrl } from "@/utils/createMetadata";
import { ROUTES } from "@/constants/routes";
import type { Locale } from "@/i18n/config";
import type { PostDetailView } from "@/lib/sanity/adapters";

export default function ArticleJsonLd({
  locale,
  post,
}: {
  locale: Locale;
  post: PostDetailView;
}) {
  const url = absoluteUrl(locale, `${ROUTES.blog}/${post.slug}`);
  const baseUrl = getBaseUrl();

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title.slice(0, 110),
    description: post.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: locale,
    ...(post.coverUrl ? { image: [post.coverUrl] } : {}),
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.updatedAt ?? post.publishedAt
      ? { dateModified: post.updatedAt ?? post.publishedAt }
      : {}),
    ...(post.author?.name
      ? {
          author: {
            "@type": "Person",
            name: post.author.name,
            ...(post.author.role ? { jobTitle: post.author.role } : {}),
          },
        }
      : { author: { "@id": `${baseUrl}/#organization` } }),
    publisher: { "@id": `${baseUrl}/#organization` },
    ...(post.categories.length > 0
      ? { articleSection: post.categories.map((category) => category.title) }
      : {}),
    ...(post.tags.length > 0 ? { keywords: post.tags.join(", ") } : {}),
    ...(post.readingTimeMinutes > 0
      ? { timeRequired: `PT${post.readingTimeMinutes}M` }
      : {}),
  };

  return <JsonLd data={data} />;
}
