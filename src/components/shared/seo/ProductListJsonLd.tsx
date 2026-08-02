import JsonLd from "./JsonLd";
import { absoluteUrl } from "@/utils/createMetadata";
import type { Locale } from "@/i18n/config";
import { ROUTES } from "@/constants/routes";
import type { ProductCardView } from "@/lib/sanity/adapters";

/**
 * ItemList для сторінок каталогу й категорій — допомагає Google
 * зрозуміти, що це список товарів, і показати carousel-сніпет.
 */
export default function ProductListJsonLd({
  locale,
  products,
  listName,
  path,
}: {
  locale: Locale;
  products: ProductCardView[];
  listName: string;
  path: string;
}) {
  if (products.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    url: absoluteUrl(locale, path),
    numberOfItems: products.length,
    itemListElement: products.slice(0, 50).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(locale, `${ROUTES.catalog}/${product.slug}`),
      name: product.title,
      ...(product.images[0]?.url ? { image: product.images[0].url } : {}),
    })),
  };

  return <JsonLd data={data} />;
}
