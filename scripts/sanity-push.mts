/**
 * Пуш каталогу (категорії + товари) з `src/lib/sanity/seed` у Sanity.
 *
 * Запуск (Node ≥ 22.6, type stripping вбудований):
 *   node --env-file=.env.local scripts/sanity-push.mts            # заливка
 *   node --env-file=.env.local scripts/sanity-push.mts --dry-run  # лише показати, що буде
 *   node --env-file=.env.local scripts/sanity-push.mts --ndjson   # експорт у seed.ndjson для `sanity dataset import`
 *
 * Потрібні змінні:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID (або SANITY_PROJECT_ID)
 *   NEXT_PUBLIC_SANITY_DATASET    (за замовчуванням production)
 *   SANITY_WRITE_TOKEN            — токен з правами Editor
 *
 * Ідемпотентно: документи мають фіксовані `_id`, повторний запуск оновлює,
 * а не дублює. Зображення з /public завантажуються як assets один раз —
 * повторний запуск знаходить їх за `originalFilename`.
 */
import { createClient } from "@sanity/client";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import {
  seedAuthor,
  seedBlogCategories,
  seedCategories,
  seedPosts,
  seedProducts,
} from "../src/lib/sanity/seed/index.ts";
import type {
  SeedBlogCategory,
  SeedCategory,
  SeedImage,
  SeedPost,
  SeedProduct,
} from "../src/lib/sanity/seed/index.ts";

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has("--dry-run");
const NDJSON = args.has("--ndjson");

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  "production";
const token = process.env.SANITY_WRITE_TOKEN;

const PUBLIC_DIR = join(process.cwd(), "public");

/* ─── Перетворення seed → документи Sanity ────────────────────────────── */

type ImageRef = {
  _type: "image";
  _key?: string;
  asset: { _type: "reference"; _ref: string };
  alt: SeedImage["alt"];
};

function localizedSlug(slug: SeedCategory["slug"]) {
  return {
    _type: "localizedSlug",
    en: { _type: "slug", current: slug.en.current },
    uk: { _type: "slug", current: slug.uk.current },
    ru: { _type: "slug", current: slug.ru.current },
  };
}

function categoryDoc(category: SeedCategory, image: ImageRef) {
  return {
    _id: category._id,
    _type: "productCategory",
    title: category.title,
    slug: localizedSlug(category.slug),
    order: category.order,
    isVisible: true,
    shortDescription: category.shortDescription,
    description: category.description,
    image,
    faq: category.faq.map((item) => ({ _type: "faqItem", ...item })),
    seo: { _type: "seoFields", ...category.seo, noIndex: false },
  };
}

function productDoc(product: SeedProduct, gallery: ImageRef[]) {
  return {
    _id: product._id,
    _type: "product",
    title: product.title,
    slug: localizedSlug(product.slug),
    category: { _type: "reference", _ref: product.category._id },
    model: product.model,
    sku: product.sku,
    isPublished: true,
    isFeatured: product.isFeatured,
    order: product.order,
    publishedAt: product.publishedAt,
    gallery,
    shortDescription: product.shortDescription,
    description: product.description,
    features: product.features.map((item, index) => ({
      _key: `f${index}`,
      ...item,
    })),
    applications: product.applications.map((item, index) => ({
      _key: `a${index}`,
      ...item,
    })),
    faq: product.faq.map((item) => ({ _type: "faqItem", ...item })),
    specs: product.specs.map((item) => ({ _type: "specRow", ...item })),
    priceOnRequest: true,
    currency: product.currency,
    availability: product.availability,
    seo: { _type: "seoFields", ...product.seo, noIndex: false },
  };
}

function ref(id: string, key?: string) {
  return {
    _type: "reference" as const,
    _ref: id,
    ...(key ? { _key: key } : {}),
  };
}

function authorDoc() {
  return {
    _id: seedAuthor._id,
    _type: "author",
    name: seedAuthor.name,
    slug: { _type: "slug", current: seedAuthor.slug.current },
    role: seedAuthor.role,
    bio: seedAuthor.bio,
  };
}

function blogCategoryDoc(category: SeedBlogCategory) {
  return {
    _id: category._id,
    _type: "blogCategory",
    title: category.title,
    slug: localizedSlug(category.slug),
    description: category.description,
    order: category.order,
    seo: { _type: "seoFields", ...category.seo, noIndex: false },
  };
}

function blogPostDoc(post: SeedPost, coverImage: ImageRef) {
  return {
    _id: post._id,
    _type: "blogPost",
    title: post.title,
    slug: localizedSlug(post.slug),
    isPublished: true,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: ref(post.author._id),
    categories: post.categories.map((item, i) => ref(item._id, `c${i}`)),
    tags: post.tags,
    readingTimeMinutes: post.readingTimeMinutes,
    isFeatured: post.isFeatured,
    coverImage,
    excerpt: post.excerpt,
    body: post.body,
    faq: post.faq.map((item) => ({ _type: "faqItem", ...item })),
    relatedProducts: post.relatedProducts.map((item, i) => ref(item._id, `p${i}`)),
    relatedPosts: post.relatedPosts.map((item, i) => ref(item._id, `r${i}`)),
    seo: { _type: "seoFields", ...post.seo, noIndex: false },
  };
}

/* ─── Зображення ──────────────────────────────────────────────────────── */

/** Детермінований id asset-а для NDJSON-режиму (без завантаження файлів). */
function assetIdFor(path: string): string {
  return `image-seed-${createHash("sha1").update(path).digest("hex").slice(0, 16)}`;
}

async function main() {
  const uniquePaths = new Set<string>();
  for (const category of seedCategories)
    uniquePaths.add(category.image.asset.url);
  for (const product of seedProducts)
    for (const image of product.gallery) uniquePaths.add(image.asset.url);
  for (const post of seedPosts) uniquePaths.add(post.coverImage.asset.url);

  console.log(
    `Категорій: ${seedCategories.length}, товарів: ${seedProducts.length}, ` +
      `категорій блогу: ${seedBlogCategories.length}, статей: ${seedPosts.length}, ` +
      `унікальних зображень: ${uniquePaths.size}`,
  );

  if (NDJSON) {
    const assetRef = new Map<string, string>();
    for (const path of uniquePaths) assetRef.set(path, assetIdFor(path));
    const toRef = (image: SeedImage): ImageRef => ({
      _type: "image",
      ...(image._key ? { _key: image._key } : {}),
      asset: { _type: "reference", _ref: assetRef.get(image.asset.url)! },
      alt: image.alt,
    });
    const lines = [
      ...seedCategories.map((category) =>
        categoryDoc(category, toRef(category.image)),
      ),
      ...seedProducts.map((product) =>
        productDoc(product, product.gallery.map(toRef)),
      ),
      authorDoc(),
      ...seedBlogCategories.map(blogCategoryDoc),
      ...seedPosts.map((post) => blogPostDoc(post, toRef(post.coverImage))),
    ].map((doc) => JSON.stringify(doc));
    await writeFile("seed.ndjson", lines.join("\n") + "\n");
    console.log(
      "Записано seed.ndjson. Зображення в NDJSON-режимі треба завантажити окремо або скористатись пушем через API.",
    );
    return;
  }

  if (!projectId) throw new Error("Не задано NEXT_PUBLIC_SANITY_PROJECT_ID");
  if (!token && !DRY_RUN) throw new Error("Не задано SANITY_WRITE_TOKEN");

  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2024-10-01",
    useCdn: false,
  });

  // 1. Зображення: шукаємо вже завантажені за originalFilename, решту вантажимо
  const assetRef = new Map<string, string>();
  for (const path of uniquePaths) {
    // Хеш шляху в імені — інакше imageThree.webp з різних папок склеюються в один asset
    const filename = `seed-${createHash("sha1").update(path).digest("hex").slice(0, 8)}-${basename(path)}`;
    if (DRY_RUN) {
      assetRef.set(path, `<asset ${filename}>`);
      continue;
    }
    const existing = await client.fetch<string | null>(
      `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
      { filename },
    );
    if (existing) {
      assetRef.set(path, existing);
      continue;
    }
    const buffer = await readFile(join(PUBLIC_DIR, path));
    const asset = await client.assets.upload("image", buffer, { filename });
    assetRef.set(path, asset._id);
    console.log(`  ↑ ${filename} → ${asset._id}`);
  }

  const toRef = (image: SeedImage): ImageRef => ({
    _type: "image",
    ...(image._key ? { _key: image._key } : {}),
    asset: { _type: "reference", _ref: assetRef.get(image.asset.url)! },
    alt: image.alt,
  });

  // 2. Спочатку категорії (на них посилаються товари), потім товари
  const categoryDocs = seedCategories.map((category) =>
    categoryDoc(category, toRef(category.image)),
  );
  const productDocs = seedProducts.map((product) =>
    productDoc(product, product.gallery.map(toRef)),
  );

  const blogCategoryDocs = seedBlogCategories.map(blogCategoryDoc);
  const blogPostDocs = seedPosts.map((post) =>
    blogPostDoc(post, toRef(post.coverImage)),
  );

  if (DRY_RUN) {
    for (const doc of [
      ...categoryDocs,
      ...productDocs,
      ...blogCategoryDocs,
      ...blogPostDocs,
    ])
      console.log(`  ${doc._type}  ${doc._id}  /${doc.slug.uk.current}`);
    console.log(`  author  ${seedAuthor._id}  ${seedAuthor.name}`);
    console.log("Dry run — нічого не записано.");
    return;
  }

  let tx = client.transaction();
  for (const doc of categoryDocs) tx = tx.createOrReplace(doc);
  await tx.commit();
  console.log(`Категорії записано: ${categoryDocs.length}`);

  // Товари партіями по 20, щоб не впертись у ліміт розміру транзакції
  for (let i = 0; i < productDocs.length; i += 20) {
    let batch = client.transaction();
    for (const doc of productDocs.slice(i, i + 20))
      batch = batch.createOrReplace(doc);
    await batch.commit();
    console.log(
      `Товари записано: ${Math.min(i + 20, productDocs.length)}/${productDocs.length}`,
    );
  }

  // 3. Блог: автор і категорії мають існувати до статей, які на них посилаються
  let blogTx = client.transaction().createOrReplace(authorDoc());
  for (const doc of blogCategoryDocs) blogTx = blogTx.createOrReplace(doc);
  await blogTx.commit();
  console.log(`Автор і категорії блогу записано: ${seedBlogCategories.length + 1}`);

  // Статті посилаються одна на одну — пишемо однією транзакцією
  let postsTx = client.transaction();
  for (const doc of blogPostDocs) postsTx = postsTx.createOrReplace(doc);
  await postsTx.commit();
  console.log(`Статті записано: ${seedPosts.length}`);

  console.log(
    "Готово. Перевір у Studio та задай NEXT_PUBLIC_SANITY_PROJECT_ID на Vercel, щоб фронт перейшов із фолбеку на CMS.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
