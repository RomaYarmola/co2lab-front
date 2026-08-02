import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { CACHE_TAGS } from "@/lib/sanity/fetchers";

const TYPE_TO_TAGS: Record<string, string[]> = {
  product: [CACHE_TAGS.product],
  productCategory: [CACHE_TAGS.productCategory, CACHE_TAGS.product],
  blogPost: [CACHE_TAGS.blogPost],
  blogCategory: [CACHE_TAGS.blogCategory, CACHE_TAGS.blogPost],
  author: [CACHE_TAGS.blogPost],
  siteSettings: [CACHE_TAGS.siteSettings],
};

/**
 * Вебхук Sanity: скидає кеш конкретного типу документа після публікації.
 * Налаштовується в sanity.io/manage → API → Webhooks,
 * секрет передається як ?secret= або заголовком x-revalidate-secret.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { revalidated: false, message: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 },
    );
  }

  const provided =
    request.nextUrl.searchParams.get("secret") ??
    request.headers.get("x-revalidate-secret");

  if (provided !== secret) {
    return Response.json(
      { revalidated: false, message: "Invalid secret" },
      { status: 401 },
    );
  }

  let documentType: string | undefined;
  try {
    const body = (await request.json()) as { _type?: string };
    documentType = body?._type;
  } catch {
    // Порожнє або нечитабельне тіло — скинемо всі теги нижче
  }

  const tags = documentType
    ? (TYPE_TO_TAGS[documentType] ?? Object.values(CACHE_TAGS))
    : Object.values(CACHE_TAGS);

  // Next 16 вимагає профіль другим аргументом; "max" — рекомендований
  // для on-demand інвалідації з route handler.
  for (const tag of tags) revalidateTag(tag, "max");

  return Response.json({ revalidated: true, documentType, tags });
}
