import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { urlForImage } from "./image";
import {
  allSlugs,
  pickBlocks,
  pickLocalized,
  pickLocalizedList,
  pickSlug,
} from "./localized";
import type {
  PortableTextBlock,
  SanityBlogCategory,
  SanityBlogPost,
  SanityFaqItem,
  SanityImageWithAlt,
  SanityProduct,
  SanityProductCategory,
} from "./types";

export type GalleryImage = {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type FaqEntry = { question: string; answer: string };

export type SpecEntry = { label: string; value: string; group?: string };

export type CategoryView = {
  id: string;
  title: string;
  slug: string;
  slugs: Record<Locale, string>;
  shortDescription: string;
  imageUrl: string | null;
  imageAlt: string;
  productCount: number;
  updatedAt?: string;
};

export type ProductCardView = {
  id: string;
  title: string;
  slug: string;
  slugs: Record<Locale, string>;
  model: string;
  sku: string;
  shortDescription: string;
  images: GalleryImage[];
  category: { title: string; slug: string } | null;
  price: number | null;
  currency: string;
  priceOnRequest: boolean;
  availability: "inStock" | "onRequest" | "madeToOrder";
  isFeatured: boolean;
  publishedAt?: string;
};

export type ProductDetailView = ProductCardView & {
  descriptionBlocks: PortableTextBlock[];
  features: string[];
  applications: string[];
  specs: SpecEntry[];
  faq: FaqEntry[];
  documents: Array<{ title: string; url: string; filename: string; size?: number }>;
  updatedAt?: string;
};

export type BlogCategoryView = {
  id: string;
  title: string;
  slug: string;
  slugs: Record<Locale, string>;
  description: string;
  postCount: number;
};

export type PostCardView = {
  id: string;
  title: string;
  slug: string;
  slugs: Record<Locale, string>;
  excerpt: string;
  coverUrl: string | null;
  coverAlt: string;
  publishedAt?: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  categories: Array<{ title: string; slug: string }>;
  tags: string[];
  author: { name: string; role: string; photoUrl: string | null } | null;
  isFeatured: boolean;
};

export type PostDetailView = PostCardView & {
  bodyBlocks: PortableTextBlock[];
  faq: FaqEntry[];
  authorBio: string;
};

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function mapImage(
  image: SanityImageWithAlt | null | undefined,
  locale: Locale,
  width = 1600,
): GalleryImage | null {
  const url = urlForImage(image, { width });
  if (!url) return null;
  return {
    url,
    alt: pickLocalized(image?.alt, locale),
    caption: pickLocalized(image?.caption, locale) || undefined,
  };
}

function mapGallery(
  gallery: SanityImageWithAlt[] | undefined,
  locale: Locale,
  fallbackAlt: string,
): GalleryImage[] {
  if (!Array.isArray(gallery)) return [];
  return gallery
    .map((image) => mapImage(image, locale))
    .filter((image): image is GalleryImage => image !== null)
    .map((image) => ({ ...image, alt: image.alt || fallbackAlt }));
}

function mapFaq(
  faq: SanityFaqItem[] | undefined,
  locale: Locale,
): FaqEntry[] {
  if (!Array.isArray(faq)) return [];
  return faq
    .map((item) => ({
      question: pickLocalized(item.question, locale),
      answer: pickLocalized(item.answer, locale),
    }))
    .filter((item) => item.question && item.answer);
}

function emptySlugs(): Record<Locale, string> {
  return locales.reduce(
    (acc, locale) => ({ ...acc, [locale]: "" }),
    {} as Record<Locale, string>,
  );
}

/* ─── Каталог ──────────────────────────────────────────────────────────── */

export function mapCategory(
  doc: SanityProductCategory,
  locale: Locale,
): CategoryView {
  const title = pickLocalized(doc.title, locale);
  return {
    id: doc._id,
    title,
    slug: pickSlug(doc.slug, locale),
    slugs: doc.slug ? allSlugs(doc.slug) : emptySlugs(),
    shortDescription: pickLocalized(doc.shortDescription, locale),
    imageUrl: urlForImage(doc.image, { width: 800 }),
    imageAlt: pickLocalized(doc.image?.alt, locale) || title,
    productCount: doc.productCount ?? 0,
    updatedAt: doc._updatedAt,
  };
}

export function mapProductCard(
  doc: SanityProduct,
  locale: Locale,
): ProductCardView {
  const title = pickLocalized(doc.title, locale);
  const category = doc.category
    ? {
        title: pickLocalized(doc.category.title, locale),
        slug: pickSlug(doc.category.slug, locale),
      }
    : null;

  return {
    id: doc._id,
    title,
    slug: pickSlug(doc.slug, locale),
    slugs: doc.slug ? allSlugs(doc.slug) : emptySlugs(),
    model: doc.model ?? "",
    sku: doc.sku ?? "",
    shortDescription: pickLocalized(doc.shortDescription, locale),
    images: mapGallery(doc.gallery, locale, title),
    category,
    price: typeof doc.price === "number" ? doc.price : null,
    currency: doc.currency ?? "EUR",
    priceOnRequest: doc.priceOnRequest !== false,
    availability: doc.availability ?? "onRequest",
    isFeatured: Boolean(doc.isFeatured),
    publishedAt: doc.publishedAt,
  };
}

export function mapProductDetail(
  doc: SanityProduct,
  locale: Locale,
): ProductDetailView {
  const card = mapProductCard(doc, locale);

  const specs: SpecEntry[] = Array.isArray(doc.specs)
    ? doc.specs
        .map((row) => ({
          label: pickLocalized(row.label, locale),
          value: pickLocalized(row.value, locale),
          group: pickLocalized(row.group, locale) || undefined,
        }))
        .filter((row) => row.label && row.value)
    : [];

  const documents = Array.isArray(doc.documents)
    ? doc.documents
        .map((item) => {
          const url = item.file?.asset?.url;
          if (!url) return null;
          return {
            title: pickLocalized(item.title, locale) || "Datasheet",
            url,
            filename: item.file?.asset?.originalFilename ?? "document.pdf",
            size: item.file?.asset?.size,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null)
    : [];

  return {
    ...card,
    descriptionBlocks: pickBlocks<PortableTextBlock>(doc.description, locale),
    features: pickLocalizedList(doc.features, locale),
    applications: pickLocalizedList(doc.applications, locale),
    specs,
    faq: mapFaq(doc.faq, locale),
    documents,
    updatedAt: doc._updatedAt,
  };
}

/* ─── Блог ─────────────────────────────────────────────────────────────── */

export function mapBlogCategory(
  doc: SanityBlogCategory,
  locale: Locale,
): BlogCategoryView {
  return {
    id: doc._id,
    title: pickLocalized(doc.title, locale),
    slug: pickSlug(doc.slug, locale),
    slugs: doc.slug ? allSlugs(doc.slug) : emptySlugs(),
    description: pickLocalized(doc.description, locale),
    postCount: doc.postCount ?? 0,
  };
}

/** ~200 слів/хв — типова швидкість для технічного тексту. */
function estimateReadingTime(blocks: PortableTextBlock[]): number {
  const words = blocks.reduce((total, block) => {
    const children = (block as { children?: Array<{ text?: string }> }).children;
    if (!Array.isArray(children)) return total;
    const text = children.map((child) => child.text ?? "").join(" ");
    return total + text.split(/\s+/).filter(Boolean).length;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}

export function mapPostCard(doc: SanityBlogPost, locale: Locale): PostCardView {
  const title = pickLocalized(doc.title, locale);
  return {
    id: doc._id,
    title,
    slug: pickSlug(doc.slug, locale),
    slugs: doc.slug ? allSlugs(doc.slug) : emptySlugs(),
    excerpt: pickLocalized(doc.excerpt, locale),
    coverUrl: urlForImage(doc.coverImage, { width: 1200 }),
    coverAlt: pickLocalized(doc.coverImage?.alt, locale) || title,
    publishedAt: doc.publishedAt,
    updatedAt: doc.updatedAt ?? doc._updatedAt,
    readingTimeMinutes: doc.readingTimeMinutes ?? 0,
    categories: Array.isArray(doc.categories)
      ? doc.categories.map((category) => ({
          title: pickLocalized(category.title, locale),
          slug: pickSlug(category.slug, locale),
        }))
      : [],
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    author: doc.author
      ? {
          name: doc.author.name ?? "",
          role: pickLocalized(doc.author.role, locale),
          photoUrl: urlForImage(doc.author.photo, { width: 96 }),
        }
      : null,
    isFeatured: Boolean(doc.isFeatured),
  };
}

export function mapPostDetail(
  doc: SanityBlogPost,
  locale: Locale,
): PostDetailView {
  const card = mapPostCard(doc, locale);
  const bodyBlocks = pickBlocks<PortableTextBlock>(doc.body, locale);

  return {
    ...card,
    readingTimeMinutes: card.readingTimeMinutes || estimateReadingTime(bodyBlocks),
    bodyBlocks,
    faq: mapFaq(doc.faq, locale),
    authorBio: pickLocalized(doc.author?.bio, locale),
  };
}

/* ─── SEO ──────────────────────────────────────────────────────────────── */

/** Витягує meta-теги з документа з фолбеком на назву/короткий опис. */
export function resolveDocumentSeo(
  seo: { metaTitle?: unknown; metaDescription?: unknown; keywords?: unknown; ogImage?: unknown; noIndex?: boolean } | undefined,
  locale: Locale,
  fallback: { title: string; description: string; imageUrl?: string | null },
) {
  const metaTitle =
    pickLocalized(seo?.metaTitle as never, locale) || fallback.title;
  const metaDescription =
    pickLocalized(seo?.metaDescription as never, locale) ||
    fallback.description;
  const keywordsRaw = pickLocalized(seo?.keywords as never, locale);
  const ogImage =
    urlForImage(seo?.ogImage as never, { width: 1200, height: 630 }) ??
    fallback.imageUrl ??
    undefined;

  return {
    title: metaTitle,
    description: metaDescription.slice(0, 300),
    keywords: keywordsRaw
      ? keywordsRaw.split(",").map((k) => k.trim()).filter(Boolean)
      : undefined,
    image: ogImage ?? undefined,
    noIndex: Boolean(seo?.noIndex),
  };
}
