import JsonLd from "./JsonLd";
import { absoluteUrl, getBaseUrl } from "@/utils/createMetadata";
import { ROUTES } from "@/constants/routes";
import type { Locale } from "@/i18n/config";
import type { PostCardView } from "@/lib/sanity/adapters";

/** Blog + перелік постів — допомагає Google згрупувати статті в один розділ. */
export default function BlogListJsonLd({
  locale,
  posts,
  listName,
}: {
  locale: Locale;
  posts: PostCardView[];
  listName: string;
}) {
  if (posts.length === 0) return null;

  const url = absoluteUrl(locale, ROUTES.blog);

  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url}#blog`,
    name: listName,
    url,
    inLanguage: locale,
    publisher: { "@id": `${getBaseUrl()}/#organization` },
    blogPost: posts.slice(0, 30).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(locale, `${ROUTES.blog}/${post.slug}`),
      ...(post.coverUrl ? { image: post.coverUrl } : {}),
      ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
      ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
      ...(post.author?.name
        ? { author: { "@type": "Person", name: post.author.name } }
        : {}),
    })),
  };

  return <JsonLd data={data} />;
}
