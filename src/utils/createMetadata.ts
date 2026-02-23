import type { Metadata } from "next";

const SITE_NAME = "CO₂ Lab";
// OG-зображення: src/app/opengraph-image.jpg (Next.js convention)
const OG_IMAGE_PATH = "/opengraph-image.jpg";
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const LOCALE = "en_US";

function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (url) return url.replace(/\/$/, "");
  return "https://co2lab.com";
}

export type PageMetadataParams = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataParams): Metadata {
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const ogImageUrl = `${baseUrl}${OG_IMAGE_PATH}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
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
          alt: SITE_NAME,
          type: "image/jpeg",
        },
      ],
      locale: LOCALE,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export { getBaseUrl };
