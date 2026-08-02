/** GROQ-фрагменти. Тримаємо в одному місці, щоб проєкції не розʼїжджалися. */

const LOCALIZED_STRING = `{ en, uk, ru }`;
const LOCALIZED_SLUG = `{ "en": en, "uk": uk, "ru": ru }`;
const SEO = `{
  metaTitle ${LOCALIZED_STRING},
  metaDescription ${LOCALIZED_STRING},
  keywords ${LOCALIZED_STRING},
  ogImage { asset->{ _id, url } },
  noIndex,
  canonicalUrl
}`;
const IMAGE = `{
  _key,
  asset->{ _id, url, metadata { dimensions, lqip } },
  hotspot,
  crop,
  alt ${LOCALIZED_STRING},
  caption ${LOCALIZED_STRING}
}`;
const FAQ = `{ question ${LOCALIZED_STRING}, answer ${LOCALIZED_STRING} }`;

const CATEGORY_BASE = `{
  _id,
  _updatedAt,
  title ${LOCALIZED_STRING},
  slug ${LOCALIZED_SLUG},
  order,
  isVisible,
  shortDescription ${LOCALIZED_STRING},
  image ${IMAGE},
  seo ${SEO}
}`;

const PRODUCT_CARD = `{
  _id,
  _updatedAt,
  title ${LOCALIZED_STRING},
  slug ${LOCALIZED_SLUG},
  model,
  sku,
  order,
  isFeatured,
  publishedAt,
  priceOnRequest,
  price,
  currency,
  availability,
  shortDescription ${LOCALIZED_STRING},
  gallery[] ${IMAGE},
  category-> ${CATEGORY_BASE}
}`;

/* ─── Категорії продукції ──────────────────────────────────────────────── */

export const PRODUCT_CATEGORIES_QUERY = `
*[_type == "productCategory" && isVisible != false] | order(order asc, title.en asc) {
  ...${CATEGORY_BASE},
  "productCount": count(*[_type == "product" && references(^._id) && isPublished != false])
}`;

export const PRODUCT_CATEGORY_BY_SLUG_QUERY = `
*[_type == "productCategory" && (
  slug.en.current == $slug || slug.uk.current == $slug || slug.ru.current == $slug
)][0] {
  ...${CATEGORY_BASE},
  description { en, uk, ru },
  faq[] ${FAQ},
  "productCount": count(*[_type == "product" && references(^._id) && isPublished != false])
}`;

/* ─── Товари ───────────────────────────────────────────────────────────── */

export const PRODUCTS_QUERY = `
*[_type == "product" && isPublished != false] | order(order asc, publishedAt desc) ${PRODUCT_CARD}`;

export const PRODUCTS_BY_CATEGORY_QUERY = `
*[_type == "product" && isPublished != false && category._ref == $categoryId]
  | order(order asc, publishedAt desc) ${PRODUCT_CARD}`;

export const FEATURED_PRODUCTS_QUERY = `
*[_type == "product" && isPublished != false && isFeatured == true]
  | order(order asc)[0...$limit] ${PRODUCT_CARD}`;

export const PRODUCT_BY_SLUG_QUERY = `
*[_type == "product" && isPublished != false && (
  slug.en.current == $slug || slug.uk.current == $slug || slug.ru.current == $slug
)][0] {
  ...${PRODUCT_CARD},
  description { en, uk, ru },
  features[] ${LOCALIZED_STRING},
  applications[] ${LOCALIZED_STRING},
  specs[] { label ${LOCALIZED_STRING}, value ${LOCALIZED_STRING}, group ${LOCALIZED_STRING} },
  faq[] ${FAQ},
  documents[] {
    title ${LOCALIZED_STRING},
    file { asset->{ url, originalFilename, size } }
  },
  seo ${SEO},
  relatedProducts[]-> ${PRODUCT_CARD}
}`;

/** Схожі товари з тієї ж категорії — коли relatedProducts не заповнені вручну. */
export const SIMILAR_PRODUCTS_QUERY = `
*[_type == "product" && isPublished != false && _id != $productId && category._ref == $categoryId]
  | order(order asc)[0...$limit] ${PRODUCT_CARD}`;

/** Мінімальна проєкція для sitemap: всі slug-и + дата оновлення. */
export const PRODUCT_SITEMAP_QUERY = `
*[_type == "product" && isPublished != false] {
  _updatedAt,
  slug ${LOCALIZED_SLUG},
  "categorySlug": category-> ${LOCALIZED_SLUG}
}`;

export const PRODUCT_CATEGORY_SITEMAP_QUERY = `
*[_type == "productCategory" && isVisible != false] {
  _updatedAt,
  slug ${LOCALIZED_SLUG}
}`;

/* ─── Блог ─────────────────────────────────────────────────────────────── */

const AUTHOR = `{
  _id,
  name,
  slug,
  role ${LOCALIZED_STRING},
  bio ${LOCALIZED_STRING},
  photo ${IMAGE},
  linkedin
}`;

const BLOG_CATEGORY_BASE = `{
  _id,
  _updatedAt,
  title ${LOCALIZED_STRING},
  slug ${LOCALIZED_SLUG},
  description ${LOCALIZED_STRING},
  order,
  seo ${SEO}
}`;

const POST_CARD = `{
  _id,
  _updatedAt,
  title ${LOCALIZED_STRING},
  slug ${LOCALIZED_SLUG},
  publishedAt,
  updatedAt,
  readingTimeMinutes,
  isFeatured,
  excerpt ${LOCALIZED_STRING},
  coverImage ${IMAGE},
  tags,
  author-> ${AUTHOR},
  categories[]-> ${BLOG_CATEGORY_BASE}
}`;

export const BLOG_CATEGORIES_QUERY = `
*[_type == "blogCategory"] | order(order asc, title.en asc) {
  ...${BLOG_CATEGORY_BASE},
  "postCount": count(*[_type == "blogPost" && isPublished == true && references(^._id)])
}`;

export const BLOG_POSTS_QUERY = `
*[_type == "blogPost" && isPublished == true]
  | order(isFeatured desc, publishedAt desc) ${POST_CARD}`;

export const BLOG_POSTS_BY_CATEGORY_QUERY = `
*[_type == "blogPost" && isPublished == true && $categoryId in categories[]._ref]
  | order(publishedAt desc) ${POST_CARD}`;

export const BLOG_CATEGORY_BY_SLUG_QUERY = `
*[_type == "blogCategory" && (
  slug.en.current == $slug || slug.uk.current == $slug || slug.ru.current == $slug
)][0] ${BLOG_CATEGORY_BASE}`;

export const BLOG_POST_BY_SLUG_QUERY = `
*[_type == "blogPost" && isPublished == true && (
  slug.en.current == $slug || slug.uk.current == $slug || slug.ru.current == $slug
)][0] {
  ...${POST_CARD},
  body { en, uk, ru },
  faq[] ${FAQ},
  seo ${SEO},
  relatedProducts[]-> ${PRODUCT_CARD},
  relatedPosts[]-> ${POST_CARD}
}`;

export const RELATED_POSTS_QUERY = `
*[_type == "blogPost" && isPublished == true && _id != $postId
  && count(categories[@._ref in $categoryIds]) > 0]
  | order(publishedAt desc)[0...$limit] ${POST_CARD}`;

export const LATEST_POSTS_QUERY = `
*[_type == "blogPost" && isPublished == true]
  | order(publishedAt desc)[0...$limit] ${POST_CARD}`;

export const BLOG_SITEMAP_QUERY = `
*[_type == "blogPost" && isPublished == true] {
  _updatedAt,
  publishedAt,
  updatedAt,
  slug ${LOCALIZED_SLUG}
}`;

/* ─── Налаштування ─────────────────────────────────────────────────────── */

export const SITE_SETTINGS_QUERY = `
*[_type == "siteSettings"][0] {
  defaultSeo ${SEO},
  organizationName,
  catalogIntro ${LOCALIZED_STRING},
  blogIntro ${LOCALIZED_STRING},
  email,
  phone,
  address ${LOCALIZED_STRING},
  instagram,
  linkedin,
  youtube
}`;
