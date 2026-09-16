/**
 * Категорії, які показують товари іншої категорії.
 *
 * Кріоциліндри Euro-Cyl працюють з рідким азотом, киснем і аргоном — одна
 * лінійка на три гази. Товари прикріплені до категорії азоту, а сторінки
 * кисню й аргону виводять ті самі моделі зі своєю таблицею мас і втрат.
 * Так пошук «кріоциліндр для кисню» потрапляє на профільну сторінку, а в
 * каталозі не зʼявляється три копії кожного товару.
 */
export const SHARED_CATEGORY_PRODUCTS: Record<string, string> = {
  "cat-cylinders-o2": "cat-cylinders-n2",
  "cat-cylinders-ar": "cat-cylinders-n2",
};

/** `_id` категорії, чиї товари виводити на сторінці `categoryId`. */
export function productSourceCategory(categoryId: string): string {
  return SHARED_CATEGORY_PRODUCTS[categoryId] ?? categoryId;
}
