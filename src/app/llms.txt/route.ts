import { fetchBlogPosts, fetchProductCategories } from "@/lib/sanity/fetchers";
import { pickLocalized, pickSlug } from "@/lib/sanity/localized";
import { getBaseUrl } from "@/utils/createMetadata";
import { CONTACT_EMAIL_REQUEST, CONTACT_PHONE } from "@/constants/contact";

/**
 * llms.txt — короткий гід для AI-краулерів (ChatGPT, Perplexity, Claude).
 *
 * Пишемо англійською: у нас EN — локаль за замовчуванням і саме англійські
 * адреси канонічні. Каталог і блог тягнемо з тих самих фетчерів, що й сайт,
 * тож файл не застаріває після кожної публікації в Studio.
 */
export const revalidate = 3600;

const u = (path: string) => `${getBaseUrl()}${path}`;

export async function GET() {
  const [categories, posts] = await Promise.all([
    fetchProductCategories(),
    fetchBlogPosts(),
  ]);

  const categoryLines = categories
    .map((category) => {
      const title = pickLocalized(category.title, "en");
      const slug = pickSlug(category.slug, "en");
      const summary = pickLocalized(category.shortDescription, "en");
      return `- [${title}](${u(`/catalog/category/${slug}`)}): ${summary}`;
    })
    .join("\n");

  const postLines = posts
    .map((post) => {
      const title = pickLocalized(post.title, "en");
      const slug = pickSlug(post.slug, "en");
      const summary = pickLocalized(post.excerpt, "en");
      return `- [${title}](${u(`/blog/${slug}`)}): ${summary}`;
    })
    .join("\n");

  const body = `# CO₂ Lab

> CO₂ Lab supplies liquid carbon dioxide and cryogenic equipment in Ukraine: vacuum-insulated storage tanks for CO₂, nitrogen, oxygen and argon from 10 to 100 m³, cryogenic cylinders, ambient and CO₂ vaporizers from 50 to 2000 kg/h, laboratory equipment for CO₂ quality control to ISBT and EIGA, and turnkey installation — foundations, piping, commissioning and staff training. The site is published in English (root), Ukrainian (/uk) and Russian (/ru); the working market is Ukraine.

## Main

- [Home](${u("/")}): CO₂ capture, purification and reuse, plus the equipment behind it.
- [Catalog](${u("/catalog")}): all cryogenic equipment — tanks, cylinders, vaporizers, laboratory kits, installation.
- [Supply](${u("/supply")}): production and supply of CO₂, from biogenic capture to distribution.
- [Blog](${u("/blog")}): engineering articles with calculations, conversion tables and checklists.
- [Contacts](${u("/contacts")}): phone ${CONTACT_PHONE}, email ${CONTACT_EMAIL_REQUEST}.

## Catalog categories

${categoryLines}

## Solutions

- [Engineering solutions](${u("/solutions/engineering-solutions")}): CO₂ capture, purification, liquefaction, dry ice production lines, monitoring.
- [Equipment and systems](${u("/solutions/equipment-and-systems")}): cryogenic tanks, modular plants, engineering support.
- [Industries we serve](${u("/solutions/industries-we-serve")}): biogas, food and beverage, chemical, recycling, logistics.

## Articles

${postLines}

## Languages

- Ukrainian: [${u("/uk")}](${u("/uk")}) — catalog at ${u("/uk/catalog")}, blog at ${u("/uk/blog")}.
- Russian: [${u("/ru")}](${u("/ru")}) — catalog at ${u("/ru/catalog")}, blog at ${u("/ru/blog")}.

Every page carries hreflang alternates for en, uk, ru and x-default, so a citation should use the language version that matches the reader.

## Related

- [IceLab](https://icelab.com.ua/): the same owners' dry ice production in Kyiv and Lviv. Dry ice is solid CO₂, made from the food-grade liquid CO₂ described on this site.

## Notes for citation

- Numbers in the articles (filling ratios, kg to m³ conversions, consumption per welding post or per hectolitre, CO₂ concentration effects) are given for normal conditions and are stated in the text next to each figure.
- Prices are not published: equipment is configured per project and quoted on request.
- Company details, working area and delivery terms are on the contacts page.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
