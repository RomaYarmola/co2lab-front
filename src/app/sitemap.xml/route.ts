import { buildSitemapIndexXml, XML_HEADERS } from "@/lib/seo/sitemapXml";

export const revalidate = 3600;

/**
 * Індекс сайтмапів. Розбиття по типах контенту дає точнішу статистику
 * індексації в Search Console: видно окремо сторінки, товари та статті.
 */
export function GET() {
  const body = buildSitemapIndexXml([
    "/sitemap-static.xml",
    "/sitemap-catalog.xml",
    "/sitemap-blog.xml",
  ]);

  return new Response(body, { headers: XML_HEADERS });
}
