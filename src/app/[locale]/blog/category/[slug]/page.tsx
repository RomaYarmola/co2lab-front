import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import BreadcrumbJsonLd from "@/components/shared/seo/BreadcrumbJsonLd";
import PostCard from "@/components/blog/PostCard";
import ConsultationCTA from "@/components/shared/cta/ConsultationCTA";
import { isLocale, localizePath, locales, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { createPageMetadata } from "@/utils/createMetadata";
import { buildAlternatesFromSlugs } from "@/utils/localizedAlternates";
import { ROUTES } from "@/constants/routes";
import {
  fetchBlogCategories,
  fetchBlogCategoryBySlug,
  fetchBlogPostsByCategory,
} from "@/lib/sanity/fetchers";
import { mapBlogCategory, mapPostCard, resolveDocumentSeo } from "@/lib/sanity/adapters";
import { allSlugs, pickLocalized } from "@/lib/sanity/localized";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const categories = await fetchBlogCategories();
  return locales.flatMap((locale) =>
    categories
      .map((doc) => mapBlogCategory(doc, locale).slug)
      .filter(Boolean)
      .map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const doc = await fetchBlogCategoryBySlug(slug);
  if (!doc) return {};

  const title = pickLocalized(doc.title, locale);
  const seo = resolveDocumentSeo(doc.seo, locale, {
    title,
    description: pickLocalized(doc.description, locale),
  });

  const base = createPageMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: `${ROUTES.blog}/category/${slug}`,
    image: seo.image,
    keywords: seo.keywords,
    noIndex: seo.noIndex,
  });

  return {
    ...base,
    alternates: {
      ...base.alternates,
      languages: buildAlternatesFromSlugs(
        `${ROUTES.blog}/category`,
        allSlugs(doc.slug),
      ),
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const doc = await fetchBlogCategoryBySlug(slug);
  if (!doc) notFound();

  const t = getTranslator(locale, "blog");
  const tCommon = getTranslator(locale, "common");

  const category = mapBlogCategory(doc, locale);
  const [allCategoryDocs, postDocs] = await Promise.all([
    fetchBlogCategories(),
    fetchBlogPostsByCategory(doc._id),
  ]);

  const categories = allCategoryDocs
    .map((item) => mapBlogCategory(item, locale))
    .filter((item) => item.slug && item.postCount > 0);
  const posts = postDocs
    .map((item) => mapPostCard(item, locale))
    .filter((item) => item.slug);

  const crumbs = [
    { name: tCommon("home"), path: ROUTES.home },
    { name: t("breadcrumb"), path: ROUTES.blog },
    { name: category.title },
  ];

  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={crumbs} />

      <section className="pt-22 pb-12 lg:pt-32 lg:pb-16">
        <Container>
          <Breadcrumbs locale={locale} items={crumbs} className="mb-5 lg:mb-8" />

          <PageTitle className="mb-3 lg:mb-5 max-w-[880px]">
            {category.title}
          </PageTitle>
          {category.description && (
            <p className="mb-8 max-w-[720px] text-[12px] lg:text-[16px] font-light leading-[140%] text-black/70 lg:mb-12">
              {category.description}
            </p>
          )}

          <nav aria-label={t("categories")} className="mb-8 lg:mb-10">
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link
                  href={localizePath(locale, ROUTES.blog)}
                  className="inline-flex items-center rounded-full border border-black/15 bg-white px-4 py-2.5 text-[12px] lg:text-[14px] font-medium leading-[120%] transition-colors duration-300 xl:hover:border-black"
                >
                  {t("allPosts")}
                </Link>
              </li>
              {categories.map((item) => {
                const isActive = item.slug === category.slug;
                return (
                  <li key={item.id}>
                    <Link
                      href={localizePath(
                        locale,
                        `${ROUTES.blog}/category/${item.slug}`,
                      )}
                      aria-current={isActive ? "page" : undefined}
                      className={
                        isActive
                          ? "inline-flex items-center rounded-full border border-black bg-black px-4 py-2.5 text-[12px] lg:text-[14px] font-medium leading-[120%] text-white"
                          : "inline-flex items-center rounded-full border border-black/15 bg-white px-4 py-2.5 text-[12px] lg:text-[14px] font-medium leading-[120%] transition-colors duration-300 xl:hover:border-black"
                      }
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {posts.length === 0 ? (
            <div className="rounded-[18px] border border-black/10 px-6 py-14 text-center">
              <p className="mb-2 text-[16px] lg:text-[20px] font-medium uppercase leading-[120%]">
                {t("noPosts")}
              </p>
              <p className="text-[12px] lg:text-[14px] font-light leading-[140%] text-black/60">
                {t("noPostsHint")}
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {posts.map((post) => (
                <li key={post.id} className="h-full">
                  <PostCard post={post} locale={locale} />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <ConsultationCTA locale={locale} />
    </>
  );
}
