import JsonLd from "./JsonLd";
import { absoluteUrl, getBaseUrl } from "@/utils/createMetadata";
import { ROUTES } from "@/constants/routes";
import type { Locale } from "@/i18n/config";
import type { ProductDetailView } from "@/lib/sanity/adapters";

/**
 * Product + Offer. Для товарів «ціна за запитом» вказуємо
 * PriceSpecification без значення — Google приймає таку розмітку
 * і не рахує це помилкою відсутньої ціни.
 */
export default function ProductJsonLd({
  locale,
  product,
}: {
  locale: Locale;
  product: ProductDetailView;
}) {
  const url = absoluteUrl(locale, `${ROUTES.catalog}/${product.slug}`);
  const baseUrl = getBaseUrl();

  const availability =
    product.availability === "inStock"
      ? "https://schema.org/InStock"
      : product.availability === "madeToOrder"
        ? "https://schema.org/PreOrder"
        : "https://schema.org/LimitedAvailability";

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.title,
    description: product.shortDescription || product.title,
    url,
    image: product.images.map((image) => image.url).slice(0, 8),
    brand: { "@type": "Brand", name: "CO₂ Lab" },
    manufacturer: { "@id": `${baseUrl}/#organization` },
    ...(product.sku ? { sku: product.sku } : {}),
    ...(product.model ? { model: product.model } : {}),
    ...(product.category
      ? { category: product.category.title }
      : {}),
    ...(product.specs.length > 0
      ? {
          additionalProperty: product.specs.map((spec) => ({
            "@type": "PropertyValue",
            name: spec.label,
            value: spec.value,
          })),
        }
      : {}),
    offers: {
      "@type": "Offer",
      url,
      availability,
      seller: { "@id": `${baseUrl}/#organization` },
      ...(product.priceOnRequest || product.price === null
        ? {
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: product.currency,
            },
          }
        : {
            price: product.price,
            priceCurrency: product.currency,
          }),
    },
  };

  return <JsonLd data={data} />;
}
