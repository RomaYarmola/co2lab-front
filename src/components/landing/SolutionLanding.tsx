import Image from "next/image";
import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import BreadcrumbJsonLd from "@/components/shared/seo/BreadcrumbJsonLd";
import FaqJsonLd from "@/components/shared/seo/FaqJsonLd";
import FaqSection from "@/components/shared/faq/FaqSection";
import PortableTextRenderer from "@/components/shared/portableText/PortableTextRenderer";
import ConsultationCTA from "@/components/shared/cta/ConsultationCTA";
import PostCard from "@/components/blog/PostCard";
import HubLinks from "@/components/shared/hubLinks/HubLinks";
import ProjectsStrip from "@/components/projects/ProjectsStrip";
import { localizePath, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { ROUTES } from "@/constants/routes";
import { fetchBlogPosts, fetchProductCategories } from "@/lib/sanity/fetchers";
import { mapCategory, mapPostCard } from "@/lib/sanity/adapters";
import { body, type Line } from "@/lib/sanity/seed/helpers";
import type { Landing } from "@/content/landings";
import { projectsForLanding } from "@/content/projects";

/**
 * Токени посилань у тексті посадкових сторінок:
 *   cat:<_id категорії>  → сторінка категорії з актуальним slug із CMS
 *   post:<_id статті>    → стаття блогу
 *   page:/contacts       → статична сторінка з префіксом локалі
 * Так текст не ламається, якщо редактор змінить slug у Studio.
 */
function resolveLines(
  lines: Line[],
  locale: Locale,
  categorySlugs: Map<string, string>,
  postSlugs: Map<string, string>,
): Line[] {
  const resolve = (href: string): string => {
    if (href.startsWith("cat:")) {
      const slug = categorySlugs.get(href.slice(4));
      return slug ? localizePath(locale, `${ROUTES.catalog}/category/${slug}`) : localizePath(locale, ROUTES.catalog);
    }
    if (href.startsWith("post:")) {
      const slug = postSlugs.get(href.slice(5));
      return slug ? localizePath(locale, `${ROUTES.blog}/${slug}`) : localizePath(locale, ROUTES.blog);
    }
    if (href.startsWith("page:")) return localizePath(locale, href.slice(5));
    return href;
  };
  const inText = (text: string) =>
    text.replace(/\]\(((?:cat|post|page):[^)]+)\)/g, (_, href: string) => `](${resolve(href)})`);

  return lines.map((line) => {
    if (line[0] === "cta") {
      const [, title, text, label, href] = line;
      return ["cta", title, text, label, resolve(href)] as Line;
    }
    if (line[0] === "tbl" || line[0] === "img") return line;
    return [line[0], inText(line[1])] as Line;
  });
}

export default async function SolutionLanding({
  landing,
  locale,
}: {
  landing: Landing;
  locale: Locale;
}) {
  const tCommon = getTranslator(locale, "common");
  const tNav = getTranslator(locale, "nav");
  const tHubs = getTranslator(locale, "hubs");
  const tProduct = getTranslator(locale, "product");
  const tProjects = getTranslator(locale, "projects");

  const [categoryDocs, postDocs] = await Promise.all([
    fetchProductCategories(),
    fetchBlogPosts(),
  ]);

  const categorySlugs = new Map(
    categoryDocs.map((doc) => [doc._id, mapCategory(doc, locale).slug]),
  );
  const postCards = postDocs.map((doc) => mapPostCard(doc, locale));
  const postSlugs = new Map(postCards.map((post) => [post.id, post.slug]));
  const supportingPosts = landing.posts
    .map((id) => postCards.find((post) => post.id === id))
    .filter((post): post is NonNullable<typeof post> => Boolean(post?.slug));

  const lines = resolveLines(landing.body[locale], locale, categorySlugs, postSlugs);
  const blocks = body({ en: lines, uk: lines, ru: lines }, `lp-${landing.id}`)[locale];

  const isIndustry = landing.path.startsWith("/solutions/industries/");
  const crumbs = [
    { name: tCommon("home"), path: ROUTES.home },
    isIndustry
      ? { name: tNav("industriesWeServe"), path: ROUTES.industriesWeServe }
      : { name: tNav("engineeringSolutions"), path: ROUTES.engineeringSolutions },
    { name: landing.shortTitle[locale] },
  ];

  const faq = landing.faq.map((item) => ({
    question: item.question[locale],
    answer: item.answer[locale],
  }));

  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={crumbs} />
      <FaqJsonLd items={faq} />

      <article className="pt-22 pb-4 lg:pt-32">
        <Container>
          <Breadcrumbs locale={locale} items={crumbs} className="mb-5 lg:mb-8" />

          <header className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-12">
            <div className="flex flex-col gap-3 lg:gap-5">
              <p className="text-[12px] font-light uppercase leading-[120%] tracking-[0.08em] text-black/50">
                {landing.eyebrow[locale]}
              </p>
              <PageTitle className="normal-case text-[28px] lg:text-[42px] xl:text-[52px]">
                {landing.title[locale]}
              </PageTitle>
              <p className="text-[14px] font-light leading-[155%] text-black/75 lg:text-[18px]">
                {landing.lead[locale]}
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-black/5">
              <Image
                src={landing.image.src}
                alt={landing.image.alt[locale]}
                fill
                priority
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          </header>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
            <div className="min-w-0">
              <PortableTextRenderer blocks={blocks} locale={locale} />
              <ProjectsStrip
                locale={locale}
                projects={projectsForLanding(landing.path)}
                text={tProjects("landingText")}
                columns={2}
                className="mt-14"
              />
              {faq.length > 0 && (
                <FaqSection items={faq} title={tProduct("faq")} className="mt-14" />
              )}
            </div>

            {supportingPosts.length > 0 && (
              <div>
                <aside className="lg:sticky lg:top-28">
                  <h2 className="mb-5 text-[16px] font-medium uppercase leading-[120%] lg:text-[20px]">
                    {tHubs("relatedArticles")}
                  </h2>
                  <div className="flex flex-col gap-5">
                    {supportingPosts.slice(0, 3).map((post) => (
                      <PostCard key={post.id} post={post} locale={locale} />
                    ))}
                  </div>
                </aside>
              </div>
            )}
          </div>

          <HubLinks
            locale={locale}
            title={tHubs("equipmentForSolution")}
            categoryIds={landing.hubs}
            className="border-t border-black/10 mt-14 lg:mt-20"
          />
        </Container>
      </article>

      <ConsultationCTA locale={locale} />
    </>
  );
}
