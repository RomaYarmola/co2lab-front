/**
 * Каталог із файлу клієнта «Кріогенне обладнання — каталог (SEO)».
 *
 * Єдине джерело контенту для:
 *  - фолбеку фронта, поки Sanity не підключено (`demoData.ts`);
 *  - пушу в Sanity (`scripts/sanity-push.mts`).
 *
 * Порядок категорій = порядок у файлі клієнта.
 */
import { tankCategories, tankProducts } from "./tanks.ts";
import {
  ambientVaporizerCategory,
  ambientVaporizerProducts,
  co2VaporizerCategory,
  co2VaporizerProducts,
  cylinderCategories,
  cylinderProducts,
  installationCategory,
  installationProduct,
  labCategory,
  labProduct,
} from "./equipment.ts";
import {
  postCylinderVsTank,
  postFoundation,
  postGreenhouseVaporizer,
  postIsbt,
  postTankVolume,
  seedPosts as corePosts,
  type SeedPost,
} from "./blog.ts";
import { postCylinderCapacity, postCylinderMarking } from "./blogCylinders.ts";
import { postPriceUnits, postRentOrBuy } from "./blogEconomics.ts";
import { postBeverages, postDryIce, postWelding } from "./blogApplications.ts";
import { postFoodVsTechnical, postSafety } from "./blogSafety.ts";
import type { SeedCategory, SeedProduct } from "./helpers.ts";

export type {
  SeedCategory,
  SeedProduct,
  SeedImage,
  SeedBlock,
  SeedContent,
  L,
} from "./helpers.ts";

export const seedCategories: SeedCategory[] = [
  ...tankCategories,
  ...cylinderCategories,
  labCategory,
  ambientVaporizerCategory,
  co2VaporizerCategory,
  installationCategory,
];

export const seedProducts: SeedProduct[] = [
  ...tankProducts,
  ...cylinderProducts,
  labProduct,
  ...ambientVaporizerProducts,
  ...co2VaporizerProducts,
  installationProduct,
];

/** Товар за id — для звʼязків із блогу. */
export function seedProduct(id: string): SeedProduct {
  const found = seedProducts.find((product) => product._id === id);
  if (!found) throw new Error(`Seed product not found: ${id}`);
  return found;
}

export const seedPosts: SeedPost[] = [
  ...corePosts,
  postCylinderCapacity,
  postCylinderMarking,
  postPriceUnits,
  postRentOrBuy,
  postWelding,
  postBeverages,
  postDryIce,
  postSafety,
  postFoodVsTechnical,
];

/**
 * Перелінковка блогу.
 *
 * Звʼязки задаються тут, а не в самих файлах статей: інакше два матеріали,
 * які посилаються один на одного, утворили б цикл імпортів. Кожна стаття
 * отримує 2–3 сусідні за темою — блок «Схожі статті» під текстом і, головне,
 * додаткові внутрішні посилання між сторінками блогу.
 */
const RELATED: Array<[SeedPost, SeedPost[]]> = [
  [postTankVolume, [postPriceUnits, postCylinderCapacity, postRentOrBuy]],
  [postCylinderVsTank, [postCylinderCapacity, postPriceUnits, postRentOrBuy]],
  [postGreenhouseVaporizer, [postBeverages, postSafety, postTankVolume]],
  [postFoundation, [postSafety, postRentOrBuy, postTankVolume]],
  [postIsbt, [postFoodVsTechnical, postBeverages, postDryIce]],
  [postCylinderCapacity, [postPriceUnits, postCylinderVsTank, postCylinderMarking]],
  [postCylinderMarking, [postCylinderCapacity, postSafety, postFoodVsTechnical]],
  [postPriceUnits, [postCylinderCapacity, postRentOrBuy, postTankVolume]],
  [postRentOrBuy, [postPriceUnits, postFoundation, postTankVolume]],
  [postWelding, [postCylinderCapacity, postPriceUnits, postCylinderMarking]],
  [postBeverages, [postIsbt, postFoodVsTechnical, postTankVolume]],
  [postDryIce, [postFoodVsTechnical, postTankVolume, postIsbt]],
  [postSafety, [postFoundation, postCylinderMarking, postDryIce]],
  [postFoodVsTechnical, [postIsbt, postBeverages, postDryIce]],
];

for (const [post, related] of RELATED) {
  post.relatedPosts = related;
}

export {
  seedAuthor,
  seedBlogCategories,
  type SeedAuthor,
  type SeedBlogCategory,
  type SeedPost,
} from "./blog.ts";
