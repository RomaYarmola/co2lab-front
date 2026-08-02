import { createClient, type SanityClient } from "@sanity/client";

export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const SANITY_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const SANITY_API_VERSION =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

/**
 * Поки проєкт Sanity не підключено, клієнт відсутній, а всі фетчери
 * повертають порожні списки. Це дозволяє білдити й деплоїти сайт
 * до того, як контент-команда заведе дані.
 */
export const isSanityConfigured = SANITY_PROJECT_ID.length > 0;

let cachedClient: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured) return null;
  if (cachedClient) return cachedClient;

  cachedClient = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: SANITY_API_VERSION,
    useCdn: true,
    perspective: "published",
  });

  return cachedClient;
}

export type SanityFetchOptions = {
  /** Теги для revalidateTag() з вебхука Sanity */
  tags?: string[];
  /** Секунди ISR. 0 — без кешу. */
  revalidate?: number;
};

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: SanityFetchOptions = {},
  fallback: T,
): Promise<T> {
  const client = getSanityClient();
  if (!client) return fallback;

  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: options.revalidate ?? 300,
        tags: options.tags,
      },
    });
  } catch (error) {
    // Падіння CMS не має ронити сторінку — логуємо і віддаємо fallback.
    console.error("[sanity] fetch failed:", error);
    return fallback;
  }
}
