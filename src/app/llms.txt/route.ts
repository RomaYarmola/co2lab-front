import { fetchBlogPosts, fetchProductCategories } from "@/lib/sanity/fetchers";
import { pickLocalized, pickSlug } from "@/lib/sanity/localized";
import { getBaseUrl } from "@/utils/createMetadata";
import { CONTACT_EMAIL_REQUEST, CONTACT_PHONE } from "@/constants/contact";
import { LANDINGS } from "@/content/landings";

/**
 * llms.txt — короткий гід для AI-краулерів (ChatGPT, Perplexity, Claude).
 *
 * Пишемо англійською: у нас EN — локаль за замовчуванням і саме англійські
 * адреси канонічні. Каталог, блог і посадкові сторінки тягнемо з тих самих
 * джерел, що й сайт, тож файл не застаріває після кожної публікації в Studio.
 * Українські адреси каталогу дублюємо окремим списком: робочий ринок — Україна.
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

  const categoryLinesUk = categories
    .map((category) => {
      const title = pickLocalized(category.title, "uk");
      const slug = pickSlug(category.slug, "uk");
      return `- [${title}](${u(`/uk/catalog/category/${slug}`)})`;
    })
    .join("\n");

  const landingLines = LANDINGS.map(
    (landing) =>
      `- [${landing.seo.title.en}](${u(landing.path)}): ${landing.seo.description.en} Ukrainian: ${u(`/uk${landing.path}`)}`,
  ).join("\n");

  const postLines = posts
    .map((post) => {
      const title = pickLocalized(post.title, "en");
      const slug = pickSlug(post.slug, "en");
      const summary = pickLocalized(post.excerpt, "en");
      return `- [${title}](${u(`/blog/${slug}`)}): ${summary}`;
    })
    .join("\n");

  const body = `# CO₂ Lab

> CO₂ Lab supplies liquid carbon dioxide and cryogenic equipment in Ukraine. Bulk food-grade liquid CO₂ ships in batches of 1 to 100 tonnes per delivery anywhere in Ukraine, with a quality certificate for every batch (ISBT, EIGA, FDA, FSSC 22000). Equipment: vacuum-insulated storage tanks for CO₂ (nine ZVT models, 3–60 m³, from €17,000 excl. VAT), nitrogen, oxygen and argon, Euro-Cyl cryogenic cylinders of 120–993 L, CO₂ vaporizers of 130–1000 kg/h and ambient vaporizers for air gases, laboratory equipment for CO₂ quality control to ISBT and EIGA, and turnkey installation — foundations, piping, commissioning and staff training. The site is published in Ukrainian (/uk, the main market), English (root) and Russian (/ru).

## Main

- [Home](${u("/")}): cryogenic equipment for CO₂ and air gases, and bulk liquid CO₂ supply in Ukraine.
- [Catalog](${u("/catalog")}): all cryogenic equipment — tanks, cylinders, vaporizers, laboratory kits, installation. Most items show a starting price in euros excluding VAT.
- [Supply](${u("/supply")}): bulk liquid CO₂, 1 to 100 tonnes per delivery anywhere in Ukraine; food grade that also covers technical use (beverages, welding, greenhouses, dry ice).
- [Completed projects](${u("/projects")}): a beverage plant (50 m³ tank, 1,000 kg/h gasifier), two greenhouse businesses (four 60 m³ tanks; a 20 m³ tank with a 250 kg/h gasifier) and a dry ice facility (60 m³ tank, 300 kg/h machine), with photos.
- [Blog](${u("/blog")}): engineering articles with calculations, conversion tables and checklists.
- [Contacts](${u("/contacts")}): phone ${CONTACT_PHONE}, email ${CONTACT_EMAIL_REQUEST}.

## Catalog categories

${categoryLines}

## Catalog in Ukrainian

${categoryLinesUk}

## Solutions by use case

${landingLines}

## Other solution pages

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
- Equipment prices on the site are starting prices in euros excluding VAT ("from €…"); the final price depends on configuration, delivery and installation. Items without a price are quoted on request.
- Liquid CO₂ delivery terms (1–100 t per delivery, anywhere in Ukraine, certificate per batch) are on the supply page; phone and email are on the contacts page.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
