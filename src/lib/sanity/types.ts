import type { Locale } from "@/i18n/config";
import type { SanityImageSource } from "./image";
import type { LocalizedSlug, LocalizedString } from "./localized";

export type PortableTextBlock = Record<string, unknown>;

export type LocalizedBlocks = Partial<
  Record<Locale, PortableTextBlock[] | null>
>;

export type SanityImageWithAlt = SanityImageSource & {
  alt?: LocalizedString;
  caption?: LocalizedString;
};

export type SanitySeo = {
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
  keywords?: LocalizedString;
  ogImage?: SanityImageSource | null;
  noIndex?: boolean;
  canonicalUrl?: string | null;
};

export type SanityFaqItem = {
  question?: LocalizedString;
  answer?: LocalizedString;
};

export type SanitySpecRow = {
  label?: LocalizedString;
  value?: LocalizedString;
  group?: LocalizedString;
};

export type SanityProductDocument = {
  title?: LocalizedString;
  file?: { asset?: { url?: string; originalFilename?: string; size?: number } };
};

export type SanityProductCategory = {
  _id: string;
  _updatedAt?: string;
  title?: LocalizedString;
  slug?: LocalizedSlug;
  order?: number;
  isVisible?: boolean;
  shortDescription?: LocalizedString;
  description?: LocalizedBlocks;
  image?: SanityImageWithAlt | null;
  faq?: SanityFaqItem[];
  seo?: SanitySeo;
  productCount?: number;
};

export type SanityProduct = {
  _id: string;
  _updatedAt?: string;
  title?: LocalizedString;
  slug?: LocalizedSlug;
  model?: string;
  sku?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  order?: number;
  publishedAt?: string;
  category?: SanityProductCategory | null;
  gallery?: SanityImageWithAlt[];
  documents?: SanityProductDocument[];
  shortDescription?: LocalizedString;
  description?: LocalizedBlocks;
  features?: LocalizedString[];
  applications?: LocalizedString[];
  faq?: SanityFaqItem[];
  specs?: SanitySpecRow[];
  priceOnRequest?: boolean;
  price?: number;
  currency?: string;
  availability?: "inStock" | "onRequest" | "madeToOrder";
  relatedProducts?: SanityProduct[];
  seo?: SanitySeo;
};

export type SanityAuthor = {
  _id: string;
  name?: string;
  slug?: { current?: string };
  role?: LocalizedString;
  bio?: LocalizedString;
  photo?: SanityImageWithAlt | null;
  linkedin?: string;
};

export type SanityBlogCategory = {
  _id: string;
  _updatedAt?: string;
  title?: LocalizedString;
  slug?: LocalizedSlug;
  description?: LocalizedString;
  order?: number;
  seo?: SanitySeo;
  postCount?: number;
};

export type SanityBlogPost = {
  _id: string;
  _updatedAt?: string;
  title?: LocalizedString;
  slug?: LocalizedSlug;
  isPublished?: boolean;
  isFeatured?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  readingTimeMinutes?: number;
  author?: SanityAuthor | null;
  categories?: SanityBlogCategory[];
  tags?: string[];
  coverImage?: SanityImageWithAlt | null;
  excerpt?: LocalizedString;
  body?: LocalizedBlocks;
  faq?: SanityFaqItem[];
  relatedProducts?: SanityProduct[];
  relatedPosts?: SanityBlogPost[];
  seo?: SanitySeo;
};
