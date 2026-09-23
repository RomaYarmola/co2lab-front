import { locales } from "@/i18n/config";
import type { SlugAliases } from "@/i18n/SlugAliases";
import { fetchBlogCategories, fetchProductCategories } from "./fetchers";
import { allSlugs, type LocalizedSlug } from "./localized";

function collect(target: SlugAliases, docs: Array<{ slug?: LocalizedSlug }>) {
  for (const doc of docs) {
    const slugs = allSlugs(doc.slug);
    const values = locales.map((locale) => slugs[locale]).filter(Boolean);
    for (const value of new Set(values)) target[value] = slugs;
  }
}

/**
 * Перемикач мов бере з цієї мапи slug тієї самої категорії іншою мовою.
 * Без неї він вів на /uk/catalog/category/<en-slug> — 44 чужомовні адреси
 * у розмітці кожної сторінки категорії.
 *
 * Тільки категорії: їх близько шістнадцяти, у payload це пара кілобайтів.
 * Товари й статті перемикач так само веде на розділ — мапа на 200 позицій
 * коштувала б більше, ніж дає.
 */
export async function fetchCategorySlugAliases(): Promise<SlugAliases> {
  const [productCategories, blogCategories] = await Promise.all([
    fetchProductCategories(),
    fetchBlogCategories(),
  ]);
  const aliases: SlugAliases = {};
  collect(aliases, productCategories);
  collect(aliases, blogCategories);
  return aliases;
}
