import JsonLd from "./JsonLd";
import { absoluteUrl, getBaseUrl } from "@/utils/createMetadata";
import { ROUTES } from "@/constants/routes";
import type { Locale } from "@/i18n/config";
import type { ProductDetailView } from "@/lib/sanity/adapters";

/**
 * Product + Offer — лише для товарів з ціною. Для «ціна за запитом»
 * розмітку не виводимо зовсім: Offer без price Google рахує помилкою
 * («Missing field price»), а Product без offers/review/aggregateRating —
 * невалідним елементом звіту «Фрагменти товарів». Хлібні крихти
 * на таких сторінках лишаються.
 *
 * Бренд і виробника не вказуємо: CO₂ Lab — постачальник, а не завод
 * (ємності ZVT, кріоциліндри Euro-Cyl виготовляють інші компанії).
 * Компанія фігурує як продавець в Offer.
 */
export default function ProductJsonLd({
  locale,
  product,
}: {
  locale: Locale;
  product: ProductDetailView;
}) {
  if (product.priceOnRequest || product.price === null) return null;

  const url = absoluteUrl(locale, `${ROUTES.catalog}/${product.slug}`);
  const baseUrl = getBaseUrl();

  // «Виготовлення на замовлення» — MadeToOrder, не PreOrder:
  // PreOrder означає товар, який ще не вийшов у продаж
  const availability =
    product.availability === "inStock"
      ? "https://schema.org/InStock"
      : product.availability === "madeToOrder"
        ? "https://schema.org/MadeToOrder"
        : "https://schema.org/LimitedAvailability";

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.title,
    description: product.shortDescription || product.title,
    url,
    image: product.images.map((image) => image.url).slice(0, 8),
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
      price: product.price,
      priceCurrency: product.currency,
      // Ціни в прайсі — «від … без ПДВ»
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: product.price,
        priceCurrency: product.currency,
        valueAddedTaxIncluded: false,
      },
    },
  };

  return <JsonLd data={data} />;
}
