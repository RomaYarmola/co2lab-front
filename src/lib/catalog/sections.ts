import { CATALOG_SECTIONS, productSourceCategory } from "@/constants/catalog";
import { ROUTES } from "@/constants/routes";
import type { Locale } from "@/i18n/config";
import type { CategoryView, ProductCardView } from "@/lib/sanity/adapters";

export type CatalogSectionLink = { title: string; path: string; count: number };

export type CatalogSectionView = {
  id: string;
  title: string;
  description: string;
  products: ProductCardView[];
  /** Сторінки категорій секції (для однієї категорії — одна). */
  links: CatalogSectionLink[];
};

/**
 * Товари кількох категорій — по черзі з кожної: перші картки секції
 * «Ємності для азоту, кисню й аргону» показують три різні гази, а не
 * три однакові ємності для азоту.
 */
function interleave(groups: ProductCardView[][]): ProductCardView[] {
  const result: ProductCardView[] = [];
  const longest = Math.max(0, ...groups.map((group) => group.length));
  for (let i = 0; i < longest; i += 1) {
    for (const group of groups) if (group[i]) result.push(group[i]);
  }
  return result;
}

/** Секції /catalog за конфігом; категорії поза конфігом — окремими секціями в кінці. */
export function buildCatalogSections(
  categories: CategoryView[],
  products: ProductCardView[],
  locale: Locale,
): CatalogSectionView[] {
  const byId = new Map(categories.map((category) => [category.id, category]));
  const productsOf = (categoryId: string) =>
    products.filter((product) => product.category?.id === categoryId);
  const used = new Set<string>();

  const build = (
    id: string,
    title: string,
    items: Array<{ category: CategoryView; label?: string }>,
  ): CatalogSectionView | null => {
    items.forEach(({ category }) => used.add(category.id));
    // Категорія без власних товарів (кисень/аргон у кріоциліндрах) дає лише посилання
    const owners = [...new Set(items.map(({ category }) => productSourceCategory(category.id)))];
    const sectionProducts = interleave(owners.map(productsOf));
    if (sectionProducts.length === 0) return null;
    return {
      id,
      title,
      description: items[0].category.shortDescription,
      products: sectionProducts,
      links: items
        .filter(({ category }) => category.slug)
        .map(({ category, label }) => ({
          title: label ?? category.title,
          path: `${ROUTES.catalog}/category/${category.slug}`,
          count: category.productCount,
        })),
    };
  };

  const sections: CatalogSectionView[] = [];
  for (const config of CATALOG_SECTIONS) {
    const items = config.categories
      .map(({ id, label }) => {
        const category = byId.get(id);
        return category ? { category, label: label?.[locale] } : null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
    if (items.length === 0) continue;
    const section = build(config.id, config.title[locale], items);
    if (section) sections.push(section);
  }

  for (const category of categories) {
    if (used.has(category.id)) continue;
    const section = build(category.slug || category.id, category.title, [{ category }]);
    if (section) sections.push(section);
  }

  return sections;
}
