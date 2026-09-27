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
        // /thanks — службова сторінка подяки: користі в індексі немає,
        // а в аналітиці її перегляд рахується як конверсія.
        // ?_rsc= — RSC-префетчі next/link. Коли Google рендерить сторінку,
        // кожне посилання у видимій області тягне свій payload: у вересні це
        // було 45% усіх запитів Googlebot проти 10% на HTML. Для рендеру
        // поточної сторінки вони не потрібні — payload уже вбудований у HTML.
        disallow: [
          "/api/",
          "/thanks",
          "/uk/thanks",
          "/ru/thanks",
          "/*?q=",
          "/*&q=",
          "/*?_rsc=",
          "/*&_rsc=",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
