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
import {
  postGasGrades,
  postGasProperties,
  postNitrogenStorage,
  postNitrogenVsDryIce,
} from "./blogGases.ts";
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

/**
 * Товари, які були в каталозі до прайсу клієнта (вересень 2026) і яких у
 * модельному ряді немає. Скрипт пушу знімає їх із публікації; адреси
 * перенаправлені в constants/legacyRedirects.ts.
 */
export const RETIRED_PRODUCT_IDS = [
  "product-tank-co2-80",
  "product-tank-co2-100",
  "product-co2-vaporizer-100",
  "product-co2-vaporizer-200",
  "product-co2-vaporizer-300",
  "product-co2-vaporizer-500",
  "product-co2-vaporizer-800",
  "product-cylinder-n2",
  "product-cylinder-o2",
  "product-cylinder-ar",
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
  postNitrogenStorage,
  postNitrogenVsDryIce,
  postGasGrades,
  postGasProperties,
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
  [postCylinderVsTank, [postCylinderCapacity, postNitrogenStorage, postRentOrBuy]],
  [postGreenhouseVaporizer, [postBeverages, postSafety, postTankVolume]],
  [postFoundation, [postSafety, postRentOrBuy, postTankVolume]],
  [postIsbt, [postFoodVsTechnical, postGasGrades, postBeverages]],
  [postCylinderCapacity, [postPriceUnits, postCylinderVsTank, postCylinderMarking]],
  [postCylinderMarking, [postCylinderCapacity, postSafety, postFoodVsTechnical]],
  [postPriceUnits, [postGasProperties, postCylinderCapacity, postRentOrBuy]],
  [postRentOrBuy, [postPriceUnits, postFoundation, postTankVolume]],
  [postWelding, [postCylinderCapacity, postPriceUnits, postCylinderMarking]],
  [postBeverages, [postIsbt, postFoodVsTechnical, postTankVolume]],
  [postDryIce, [postNitrogenVsDryIce, postFoodVsTechnical, postTankVolume]],
  [postSafety, [postFoundation, postCylinderMarking, postDryIce]],
  [postFoodVsTechnical, [postIsbt, postGasGrades, postDryIce]],
  [postNitrogenStorage, [postNitrogenVsDryIce, postGasProperties, postCylinderVsTank]],
  [postNitrogenVsDryIce, [postNitrogenStorage, postDryIce, postGasProperties]],
  [postGasGrades, [postIsbt, postFoodVsTechnical, postGasProperties]],
  [postGasProperties, [postPriceUnits, postGasGrades, postNitrogenStorage]],
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
