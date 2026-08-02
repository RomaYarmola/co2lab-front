import JsonLd from "./JsonLd";
import { getBaseUrl } from "@/utils/createMetadata";
import { getTranslator } from "@/i18n/server";
import { localizePath, type Locale } from "@/i18n/config";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SOCIAL_LINK_INSTAGRAM_CO2LAB,
  SOCIAL_LINK_LINKEDIN,
  SOCIAL_LINK_YOUTUBE,
} from "@/constants/contact";
import { ROUTES } from "@/constants/routes";

/**
 * Organization + WebSite. Виводиться один раз у layout,
 * @id дозволяє решті схем (Product, Article) посилатися на видавця.
 */
export default function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  const baseUrl = getBaseUrl();
  const orgId = `${baseUrl}/#organization`;
  const siteId = `${baseUrl}/#website`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "CO₂ Lab",
        alternateName: "CO2Lab",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/opengraph-image.jpg`,
          width: 1200,
          height: 630,
        },
        description: t("seo.home.description"),
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kyiv",
          postalCode: "04213",
          addressCountry: "UA",
        },
        sameAs: [
          SOCIAL_LINK_INSTAGRAM_CO2LAB,
          SOCIAL_LINK_LINKEDIN,
          SOCIAL_LINK_YOUTUBE,
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: CONTACT_PHONE,
            email: CONTACT_EMAIL,
            contactType: "sales",
            availableLanguage: ["en", "uk", "ru"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: baseUrl,
        name: "CO₂ Lab",
        description: t("seo.home.description"),
        publisher: { "@id": orgId },
        inLanguage: locale,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}${localizePath(locale, ROUTES.catalog)}?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return <JsonLd data={data} />;
}
