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
import type { SeedCategory, SeedProduct } from "./helpers.ts";

export type {
  SeedCategory,
  SeedProduct,
  SeedImage,
  SeedBlock,
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
