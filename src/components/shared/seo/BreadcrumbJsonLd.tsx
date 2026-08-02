import JsonLd from "./JsonLd";
import { absoluteUrl } from "@/utils/createMetadata";
import type { Locale } from "@/i18n/config";

export type BreadcrumbItem = {
  name: string;
  /** Логічний шлях без префікса локалі. Останній елемент може бути без href. */
  path?: string;
};

export default function BreadcrumbJsonLd({
  locale,
  items,
}: {
  locale: Locale;
  items: BreadcrumbItem[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(locale, item.path) } : {}),
    })),
  };

  return <JsonLd data={data} />;
}
