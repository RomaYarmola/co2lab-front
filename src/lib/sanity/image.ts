import imageUrlBuilder from "@sanity/image-url";
import {
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  isSanityConfigured,
} from "./client";

const builder = isSanityConfigured
  ? imageUrlBuilder({ projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET })
  : null;

/** Форма зображення, яку віддають наші GROQ-проєкції. */
export type SanityImageSource = {
  _key?: string;
  _type?: string;
  asset?: {
    _id?: string;
    _ref?: string;
    url?: string;
    metadata?: {
      dimensions?: { width?: number; height?: number; aspectRatio?: number };
      lqip?: string;
    };
  };
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

/**
 * URL зображення з Sanity CDN. `width`/`height` йдуть у трансформацію,
 * тож віддається вже стиснений файл потрібного розміру — це напряму
 * впливає на LCP і Core Web Vitals.
 */
export function urlForImage(
  source: SanityImageSource | null | undefined,
  options: { width?: number; height?: number; quality?: number } = {},
): string | null {
  if (!source) return null;
  if (!builder) return source.asset?.url ?? null;

  try {
    let image = builder.image(source).auto("format").fit("max");
    if (options.width) image = image.width(options.width);
    if (options.height) image = image.height(options.height);
    image = image.quality(options.quality ?? 80);
    return image.url();
  } catch {
    return source.asset?.url ?? null;
  }
}

/** Розмір оригіналу — потрібен для width/height у <Image> без layout shift. */
export function getImageDimensions(
  source: SanityImageSource | null | undefined,
): { width: number; height: number } | null {
  const dimensions = source?.asset?.metadata?.dimensions;
  if (dimensions?.width && dimensions?.height) {
    return { width: dimensions.width, height: dimensions.height };
  }

  const ref = source?.asset?._ref ?? source?.asset?._id;
  if (!ref) return null;
  // формат: image-<hash>-<width>x<height>-<ext>
  const match = ref.match(/-(\d+)x(\d+)-/);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}

/** base64-плейсхолдер із Sanity — прибирає «стрибок» під час завантаження. */
export function getBlurDataUrl(
  source: SanityImageSource | null | undefined,
): string | undefined {
  return source?.asset?.metadata?.lqip;
}
