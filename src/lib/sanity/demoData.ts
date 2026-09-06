import type {
  SanityBlogCategory,
  SanityBlogPost,
  SanityProduct,
  SanityProductCategory,
} from "./types";
import { seedBlogCategories, seedCategories, seedPosts, seedProducts } from "./seed";

/**
 * Фолбек на випадок, коли Sanity не налаштовано (порожній projectId):
 * той самий контент, що лежить у CMS, береться напряму з `./seed`.
 *
 * Це дозволяє піднімати проєкт локально без доступів до CMS і бачити
 * реальний каталог, а не заглушки.
 */
export const demoProductCategories: SanityProductCategory[] = seedCategories;
export const demoProducts: SanityProduct[] = seedProducts;
export const demoBlogCategories: SanityBlogCategory[] = seedBlogCategories;
export const demoBlogPosts: SanityBlogPost[] = seedPosts;
