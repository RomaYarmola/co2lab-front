import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import BreadcrumbJsonLd from "@/components/shared/seo/BreadcrumbJsonLd";
import ArticleJsonLd from "@/components/shared/seo/ArticleJsonLd";
import FaqJsonLd from "@/components/shared/seo/FaqJsonLd";
import FaqSection from "@/components/shared/faq/FaqSection";
import PortableTextRenderer from "@/components/shared/portableText/PortableTextRenderer";
import TableOfContents from "@/components/blog/TableOfContents";
import PostCard from "@/components/blog/PostCard";
import ProductCard from "@/components/catalog/ProductCard";
import ConsultationCTA from "@/components/shared/cta/ConsultationCTA";
import { isLocale, localizePath, locales, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { createPageMetadata } from "@/utils/createMetadata";
import { buildAlternatesFromSlugs } from "@/utils/localizedAlternates";
import { extractHeadings } from "@/utils/slugifyHeading";
import { formatDate } from "@/utils/formatDate";
import { ROUTES } from "@/constants/routes";
import {
  fetchBlogPostBySlug,
  fetchBlogPosts,
  fetchRelatedPosts,
} from "@/lib/sanity/fetchers";
import {
  mapPostCard,
  mapPostDetail,
  mapProductCard,
  resolveDocumentSeo,
} from "@/lib/sanity/adapters";
import { allSlugs } from "@/lib/sanity/localized";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return locales.flatMap((locale) =>
    posts
      .map((doc) => mapPostCard(doc, locale).slug)
      .filter(Boolean)
      .map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const doc = await fetchBlogPostBySlug(slug);
  if (!doc) return {};

  const post = mapPostDetail(doc, locale);
  const seo = resolveDocumentSeo(doc.seo, locale, {
    title: post.title,
    description: post.excerpt,
    imageUrl: post.coverUrl,
  });

  const base = createPageMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: `${ROUTES.blog}/${slug}`,
    image: seo.image,
    imageAlt: post.coverAlt,
    keywords: seo.keywords ?? (post.tags.length > 0 ? post.tags : undefined),
    noIndex: seo.noIndex,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    authors: post.author?.name ? [post.author.name] : undefined,
  });

  return {
    ...base,
    alternates: {
      ...base.alternates,
      languages: buildAlternatesFromSlugs(ROUTES.blog, allSlugs(doc.slug)),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const doc = await fetchBlogPostBySlug(slug);
  if (!doc) notFound();

  const t = getTranslator(locale, "blog");
  const tCommon = getTranslator(locale, "common");
  const tProduct = getTranslator(locale, "product");

  const post = mapPostDetail(doc, locale);
  const headings = extractHeadings(post.bodyBlocks);

  const manualRelated = Array.isArray(doc.relatedPosts)
    ? doc.relatedPosts.map((item) => mapPostCard(item, locale))
    : [];
  const related =
    manualRelated.length > 0
      ? manualRelated
      : (
          await fetchRelatedPosts(
            doc._id,
            (doc.categories ?? []).map((category) => category._id),
            3,
          )
        ).map((item) => mapPostCard(item, locale));

  const relatedProducts = Array.isArray(doc.relatedProducts)
    ? doc.relatedProducts.map((item) => mapProductCard(item, locale))
    : [];

  const crumbs = [
    { name: tCommon("home"), path: ROUTES.home },
    { name: t("breadcrumb"), path: ROUTES.blog },
    { name: post.title },
  ];

  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={crumbs} />
      <ArticleJsonLd locale={locale} post={post} />
      {post.faq.length > 0 && <FaqJsonLd items={post.faq} />}

      <article className="pt-22 pb-12 lg:pt-32 lg:pb-16">
        <Container>
          <Breadcrumbs locale={locale} items={crumbs} className="mb-5 lg:mb-8" />

          <header className="mx-auto max-w-[820px]">
            {post.categories.length > 0 && (
              <p className="mb-3 flex flex-wrap gap-x-4 gap-y-1">
                {post.categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={localizePath(
                      locale,
                      `${ROUTES.blog}/category/${category.slug}`,
                    )}
                    className="text-[12px] font-light uppercase leading-[120%] tracking-[0.08em] text-black/50 transition-opacity duration-300 xl:hover:opacity-70"
                  >
                    {category.title}
                  </Link>
                ))}
              </p>
            )}

            <PageTitle className="mb-4 text-[28px] lg:text-[42px] xl:text-[52px] normal-case">
              {post.title}
            </PageTitle>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] lg:text-[14px] font-light leading-[120%] text-black/55">
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {t("publishedOn")}: {formatDate(post.publishedAt, locale)}
                </time>
              )}
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <time dateTime={post.updatedAt}>
                  {t("updatedOn")}: {formatDate(post.updatedAt, locale)}
                </time>
              )}
              {post.readingTimeMinutes > 0 && (
                <span>
                  {t("readingTime", { minutes: post.readingTimeMinutes })}
                </span>
              )}
            </div>

            {post.author && (
              <div className="mt-5 flex items-center gap-3">
                {post.author.photoUrl && (
                  <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-black/5">
                    <Image
                      src={post.author.photoUrl}
                      alt={post.author.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </span>
                )}
                <span>
                  <span className="block text-[14px] font-medium leading-[120%]">
                    {post.author.name}
                  </span>
                  {post.author.role && (
                    <span className="block text-[12px] font-light leading-[120%] text-black/55">
                      {post.author.role}
                    </span>
                  )}
                </span>
              </div>
            )}
          </header>

          {post.coverUrl && (
            <div className="relative mx-auto mt-8 aspect-[16/9] w-full max-w-[980px] overflow-hidden rounded-[18px] bg-black/5 lg:mt-10">
              <Image
                src={post.coverUrl}
                alt={post.coverAlt}
                fill
                priority
                sizes="(min-width: 1024px) 980px, 100vw"
                className="object-cover object-center"
              />
            </div>
          )}

          <div className="mx-auto mt-8 max-w-[820px] lg:mt-12">
            <TableOfContents
              headings={headings}
              title={t("tableOfContents")}
              className="mb-10"
            />

            {post.excerpt && (
              <p className="mb-8 border-l-2 border-black pl-5 text-[15px] lg:text-[20px] font-light leading-[155%] text-black/85">
                {post.excerpt}
              </p>
            )}

            <PortableTextRenderer blocks={post.bodyBlocks} locale={locale} />

            {post.author?.name && post.authorBio && (
              <aside className="mt-12 rounded-[18px] border border-black/10 p-5 lg:p-6">
                <p className="mb-2 text-[12px] font-medium uppercase leading-[120%] tracking-[0.08em] text-black/50">
                  {t("author")}
                </p>
                <p className="mb-1 text-[16px] font-medium leading-[120%]">
                  {post.author.name}
                </p>
                <p className="text-[12px] lg:text-[14px] font-light leading-[150%] text-black/70">
                  {post.authorBio}
                </p>
              </aside>
            )}

            {post.faq.length > 0 && (
              <FaqSection
                items={post.faq}
                title={tProduct("faq")}
                className="mt-14"
              />
            )}
          </div>

          {relatedProducts.length > 0 && (
            <section className="mt-14 border-t border-black/10 pt-10 lg:mt-20 lg:pt-14">
              <SectionTitle className="mb-6 lg:mb-8">
                {tProduct("relatedProducts")}
              </SectionTitle>
              <ul className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                {relatedProducts.map((product) => (
                  <li key={product.id} className="h-full">
                    <ProductCard product={product} locale={locale} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-14 border-t border-black/10 pt-10 lg:mt-20 lg:pt-14">
              <SectionTitle className="mb-6 lg:mb-8">
                {t("relatedPosts")}
              </SectionTitle>
              <ul className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {related.map((item) => (
                  <li key={item.id} className="h-full">
                    <PostCard post={item} locale={locale} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Container>
      </article>

      <ConsultationCTA locale={locale} />
    </>
  );
}
