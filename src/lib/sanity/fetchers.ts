import { isSanityConfigured, sanityFetch } from "./client";
import {
  demoBlogCategories,
  demoBlogPosts,
  demoProductCategories,
  demoProducts,
} from "./demoData";
import * as Q from "./queries";
import type {
  SanityBlogCategory,
  SanityBlogPost,
  SanityProduct,
  SanityProductCategory,
} from "./types";
import type { LocalizedSlug } from "./localized";

/** Теги кешу — під них бʼє вебхук /api/revalidate/sanity. */
export const CACHE_TAGS = {
  product: "product",
  productCategory: "productCategory",
  blogPost: "blogPost",
  blogCategory: "blogCategory",
  siteSettings: "siteSettings",
} as const;

/**
 * Поки Sanity не підключено, віддаємо демо-контент — щоб каталог і блог
 * можна було відкрити й протестувати верстку. Щойно зʼявиться projectId,
 * фікстури перестають використовуватись автоматично.
 */
function demo<T>(value: T): T | null {
  return isSanityConfigured ? null : value;
}

/* ─── Каталог ──────────────────────────────────────────────────────────── */

export function fetchProductCategories(): Promise<SanityProductCategory[]> {
  const fixture = demo(demoProductCategories);
  if (fixture) return Promise.resolve(fixture);
  return sanityFetch<SanityProductCategory[]>(
    Q.PRODUCT_CATEGORIES_QUERY,
    {},
    { tags: [CACHE_TAGS.productCategory, CACHE_TAGS.product] },
    [],
  );
}

export function fetchProductCategoryBySlug(
  slug: string,
): Promise<SanityProductCategory | null> {
  if (!isSanityConfigured) {
    return Promise.resolve(
      demoProductCategories.find((c) =>
        Object.values(c.slug ?? {}).some((s) => s?.current === slug),
      ) ?? null,
    );
  }
  return sanityFetch<SanityProductCategory | null>(
    Q.PRODUCT_CATEGORY_BY_SLUG_QUERY,
    { slug },
    { tags: [CACHE_TAGS.productCategory] },
    null,
  );
}

export function fetchProducts(): Promise<SanityProduct[]> {
  const fixture = demo(demoProducts);
  if (fixture) return Promise.resolve(fixture);
  return sanityFetch<SanityProduct[]>(
    Q.PRODUCTS_QUERY,
    {},
    { tags: [CACHE_TAGS.product] },
    [],
  );
}

export function fetchProductsByCategory(
  categoryId: string,
): Promise<SanityProduct[]> {
  if (!isSanityConfigured) {
    return Promise.resolve(
      demoProducts.filter((p) => p.category?._id === categoryId),
    );
  }
  return sanityFetch<SanityProduct[]>(
    Q.PRODUCTS_BY_CATEGORY_QUERY,
    { categoryId },
    { tags: [CACHE_TAGS.product] },
    [],
  );
}

export function fetchFeaturedProducts(limit = 4): Promise<SanityProduct[]> {
  if (!isSanityConfigured) {
    return Promise.resolve(demoProducts.filter((p) => p.isFeatured).slice(0, limit));
  }
  return sanityFetch<SanityProduct[]>(
    Q.FEATURED_PRODUCTS_QUERY,
    { limit },
    { tags: [CACHE_TAGS.product] },
    [],
  );
}

export function fetchProductBySlug(slug: string): Promise<SanityProduct | null> {
  if (!isSanityConfigured) {
    return Promise.resolve(
      demoProducts.find((p) =>
        Object.values(p.slug ?? {}).some((s) => s?.current === slug),
      ) ?? null,
    );
  }
  return sanityFetch<SanityProduct | null>(
    Q.PRODUCT_BY_SLUG_QUERY,
    { slug },
    { tags: [CACHE_TAGS.product] },
    null,
  );
}

export function fetchSimilarProducts(
  productId: string,
  categoryId: string,
  limit = 4,
): Promise<SanityProduct[]> {
  if (!categoryId) return Promise.resolve([]);
  if (!isSanityConfigured) {
    return Promise.resolve(
      demoProducts
        .filter((p) => p._id !== productId && p.category?._id === categoryId)
        .slice(0, limit),
    );
  }
  return sanityFetch<SanityProduct[]>(
    Q.SIMILAR_PRODUCTS_QUERY,
    { productId, categoryId, limit },
    { tags: [CACHE_TAGS.product] },
    [],
  );
}

/* ─── Блог ─────────────────────────────────────────────────────────────── */

export function fetchBlogCategories(): Promise<SanityBlogCategory[]> {
  const fixture = demo(demoBlogCategories);
  if (fixture) return Promise.resolve(fixture);
  return sanityFetch<SanityBlogCategory[]>(
    Q.BLOG_CATEGORIES_QUERY,
    {},
    { tags: [CACHE_TAGS.blogCategory, CACHE_TAGS.blogPost] },
    [],
  );
}

export function fetchBlogPosts(): Promise<SanityBlogPost[]> {
  const fixture = demo(demoBlogPosts);
  if (fixture) return Promise.resolve(fixture);
  return sanityFetch<SanityBlogPost[]>(
    Q.BLOG_POSTS_QUERY,
    {},
    { tags: [CACHE_TAGS.blogPost] },
    [],
  );
}

export function fetchBlogPostsByCategory(
  categoryId: string,
): Promise<SanityBlogPost[]> {
  if (!isSanityConfigured) {
    return Promise.resolve(
      demoBlogPosts.filter((p) =>
        (p.categories ?? []).some((c) => c._id === categoryId),
      ),
    );
  }
  return sanityFetch<SanityBlogPost[]>(
    Q.BLOG_POSTS_BY_CATEGORY_QUERY,
    { categoryId },
    { tags: [CACHE_TAGS.blogPost] },
    [],
  );
}

export function fetchBlogCategoryBySlug(
  slug: string,
): Promise<SanityBlogCategory | null> {
  if (!isSanityConfigured) {
    return Promise.resolve(
      demoBlogCategories.find((c) =>
        Object.values(c.slug ?? {}).some((s) => s?.current === slug),
      ) ?? null,
    );
  }
  return sanityFetch<SanityBlogCategory | null>(
    Q.BLOG_CATEGORY_BY_SLUG_QUERY,
    { slug },
    { tags: [CACHE_TAGS.blogCategory] },
    null,
  );
}

export function fetchBlogPostBySlug(
  slug: string,
): Promise<SanityBlogPost | null> {
  if (!isSanityConfigured) {
    return Promise.resolve(
      demoBlogPosts.find((p) =>
        Object.values(p.slug ?? {}).some((s) => s?.current === slug),
      ) ?? null,
    );
  }
  return sanityFetch<SanityBlogPost | null>(
    Q.BLOG_POST_BY_SLUG_QUERY,
    { slug },
    { tags: [CACHE_TAGS.blogPost] },
    null,
  );
}

export function fetchRelatedPosts(
  postId: string,
  categoryIds: string[],
  limit = 3,
): Promise<SanityBlogPost[]> {
  if (!isSanityConfigured) {
    return Promise.resolve(
      demoBlogPosts.filter((p) => p._id !== postId).slice(0, limit),
    );
  }
  if (categoryIds.length === 0) {
    return sanityFetch<SanityBlogPost[]>(
      Q.LATEST_POSTS_QUERY,
      { limit },
      { tags: [CACHE_TAGS.blogPost] },
      [],
    );
  }
  return sanityFetch<SanityBlogPost[]>(
    Q.RELATED_POSTS_QUERY,
    { postId, categoryIds, limit },
    { tags: [CACHE_TAGS.blogPost] },
    [],
  );
}

export function fetchLatestPosts(limit = 3): Promise<SanityBlogPost[]> {
  if (!isSanityConfigured) return Promise.resolve(demoBlogPosts.slice(0, limit));
  return sanityFetch<SanityBlogPost[]>(
    Q.LATEST_POSTS_QUERY,
    { limit },
    { tags: [CACHE_TAGS.blogPost] },
    [],
  );
}

/* ─── Sitemap ──────────────────────────────────────────────────────────── */

export type SitemapEntry = {
  _updatedAt?: string;
  publishedAt?: string;
  updatedAt?: string;
  slug?: LocalizedSlug;
  categorySlug?: LocalizedSlug;
};

export function fetchProductSitemapEntries(): Promise<SitemapEntry[]> {
  if (!isSanityConfigured) return Promise.resolve(demoProducts as SitemapEntry[]);
  return sanityFetch<SitemapEntry[]>(
    Q.PRODUCT_SITEMAP_QUERY,
    {},
    { tags: [CACHE_TAGS.product] },
    [],
  );
}

export function fetchProductCategorySitemapEntries(): Promise<SitemapEntry[]> {
  if (!isSanityConfigured) return Promise.resolve(demoProductCategories as SitemapEntry[]);
  return sanityFetch<SitemapEntry[]>(
    Q.PRODUCT_CATEGORY_SITEMAP_QUERY,
    {},
    { tags: [CACHE_TAGS.productCategory] },
    [],
  );
}

export function fetchBlogSitemapEntries(): Promise<SitemapEntry[]> {
  if (!isSanityConfigured) return Promise.resolve(demoBlogPosts as SitemapEntry[]);
  return sanityFetch<SitemapEntry[]>(
    Q.BLOG_SITEMAP_QUERY,
    {},
    { tags: [CACHE_TAGS.blogPost] },
    [],
  );
}
