import type { Metadata } from "next";
import {
  defaultLocale,
  hreflangs,
  locales,
  localizePath,
  ogLocales,
  type Locale,
} from "@/i18n/config";

const SITE_NAME = "CO₂ Lab";
// OG-зображення за замовчуванням: src/app/opengraph-image.jpg (Next.js convention)
const OG_IMAGE_PATH = "/opengraph-image.jpg";
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (url) return url.replace(/\/$/, "");
  return "https://www.co2lab.pro";
}

/** Абсолютний URL сторінки для конкретної локалі. */
export function absoluteUrl(locale: Locale, path: string): string {
  return `${getBaseUrl()}${localizePath(locale, path)}`;
}

/**
 * Мапа hreflang для одного логічного маршруту.
 * x-default вказує на дефолтну локаль — рекомендація Google для мультимовних сайтів.
 */
export function buildLanguageAlternates(
  path: string,
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[hreflangs[locale]] = absoluteUrl(locale, path);
  }
  languages["x-default"] = absoluteUrl(defaultLocale, path);
  return languages;
}

export type PageMetadataParams = {
  locale: Locale;
  title: string;
  description: string;
  /** Логічний шлях без префікса локалі, напр. "/catalog" */
  path: string;
  /** Абсолютний або відносний URL кастомного OG-зображення */
  image?: string;
  imageAlt?: string;
  /** "article" для блогу, "website" для решти */
  type?: "website" | "article";
  keywords?: string[];
  /** Заборонити індексацію (напр. сторінки пошуку/фільтрів) */
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function createPageMetadata({
  locale,
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  keywords,
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors,
}: PageMetadataParams): Metadata {
  const baseUrl = getBaseUrl();
  const canonicalUrl = absoluteUrl(locale, path);
  const ogImageUrl = image
    ? image.startsWith("http")
      ? image
      : `${baseUrl}${image}`
    : `${baseUrl}${OG_IMAGE_PATH}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: buildLanguageAlternates(path),
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: imageAlt ?? title,
          type: "image/jpeg",
        },
      ],
      locale: ogLocales[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocales[l]),
      type,
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export { getBaseUrl, SITE_NAME };
