import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/utils/createMetadata";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /api — службові ендпоінти; ?q= — клієнтський пошук каталогу,
        // індексувати його немає сенсу (нескінченні комбінації параметрів).
        disallow: ["/api/", "/*?q=", "/*&q="],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
