import JsonLd from "./JsonLd";
import { getBaseUrl } from "@/utils/createMetadata";
import { getTranslator } from "@/i18n/server";
import type { Locale } from "@/i18n/config";
import {
  CONTACT_EMAIL_REQUEST,
  CONTACT_PHONE,
  SOCIAL_LINK_INSTAGRAM_CO2LAB,
  SOCIAL_LINK_LINKEDIN,
  SOCIAL_LINK_YOUTUBE,
} from "@/constants/contact";

/** Профіль без трекінгових параметрів (?igsh, utm_*) — sameAs має бути канонічною адресою. */
function cleanProfileUrl(url: string) {
  return url.split("?")[0].replace(/\/+$/, "");
}

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
        // Квадратний логотип, а не OG-банер: Google бере logo для
        // панелі знань і видачі, банер з текстом там не читається
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
          width: 512,
          height: 512,
        },
        image: `${baseUrl}/opengraph-image.jpg`,
        description: t("seo.home.description"),
        // Та сама адреса, що видно на сторінках
        email: CONTACT_EMAIL_REQUEST,
        telephone: CONTACT_PHONE,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kyiv",
          postalCode: "04213",
          addressCountry: "UA",
        },
        // Лише реальні профілі: заглушки на кшталт linkedin.com без шляху
        // Google трактує як помилку розмітки
        sameAs: [
          SOCIAL_LINK_INSTAGRAM_CO2LAB,
          SOCIAL_LINK_LINKEDIN,
          SOCIAL_LINK_YOUTUBE,
        ]
          .map(cleanProfileUrl)
          .filter((url) => /^https?:\/\/[^/]+\/.+/.test(url)),
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: CONTACT_PHONE,
            email: CONTACT_EMAIL_REQUEST,
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
        // SearchAction прибрано: пошук каталогу клієнтський, ?q= закрито в
        // robots.txt, а сам sitelinks searchbox Google вимкнув у 2024 році.
      },
    ],
  };

  return <JsonLd data={data} />;
}
