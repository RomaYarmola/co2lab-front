import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import BreadcrumbJsonLd from "@/components/shared/seo/BreadcrumbJsonLd";
import ProductListJsonLd from "@/components/shared/seo/ProductListJsonLd";
import FaqJsonLd from "@/components/shared/seo/FaqJsonLd";
import FaqSection from "@/components/shared/faq/FaqSection";
import PortableTextRenderer from "@/components/shared/portableText/PortableTextRenderer";
import CatalogGrid from "@/components/catalog/CatalogGrid";
import ConsultationCTA from "@/components/shared/cta/ConsultationCTA";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { createPageMetadata } from "@/utils/createMetadata";
import { ROUTES } from "@/constants/routes";
import {
  fetchProductCategories,
  fetchProductCategoryBySlug,
  fetchProductsByCategory,
} from "@/lib/sanity/fetchers";
import {
  mapCategory,
  mapProductCard,
  resolveDocumentSeo,
  type FaqEntry,
} from "@/lib/sanity/adapters";
import { pickBlocks, pickLocalized, allSlugs } from "@/lib/sanity/localized";
import { buildAlternatesFromSlugs } from "@/utils/localizedAlternates";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const categories = await fetchProductCategories();
  return locales.flatMap((locale) =>
    categories
      .map((doc) => mapCategory(doc, locale).slug)
      .filter(Boolean)
      .map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const doc = await fetchProductCategoryBySlug(slug);
  if (!doc) return {};

  const title = pickLocalized(doc.title, locale);
  const seo = resolveDocumentSeo(doc.seo, locale, {
    title,
    description: pickLocalized(doc.shortDescription, locale),
  });

  const base = createPageMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: `${ROUTES.catalog}/category/${slug}`,
    image: seo.image,
    keywords: seo.keywords,
    noIndex: seo.noIndex,
  });

  // Slug відрізняється по мовах — hreflang має вести на локалізовані URL
  return {
    ...base,
    alternates: {
      ...base.alternates,
      languages: buildAlternatesFromSlugs(
        `${ROUTES.catalog}/category`,
        allSlugs(doc.slug),
      ),
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const doc = await fetchProductCategoryBySlug(slug);
  if (!doc) notFound();

  const t = getTranslator(locale, "catalog");
  const tCommon = getTranslator(locale, "common");
  const tProduct = getTranslator(locale, "product");

  const category = mapCategory(doc, locale);
  const [allCategoryDocs, productDocs] = await Promise.all([
    fetchProductCategories(),
    fetchProductsByCategory(doc._id),
  ]);

  const categories = allCategoryDocs
    .map((item) => mapCategory(item, locale))
    .filter((item) => item.slug);
  const products = productDocs
    .map((item) => mapProductCard(item, locale))
    .filter((item) => item.slug);

  const descriptionBlocks = pickBlocks(doc.description, locale);
  const faq: FaqEntry[] = Array.isArray(doc.faq)
    ? doc.faq
        .map((item) => ({
          question: pickLocalized(item.question, locale),
          answer: pickLocalized(item.answer, locale),
        }))
        .filter((item) => item.question && item.answer)
    : [];

  const crumbs = [
    { name: tCommon("home"), path: ROUTES.home },
    { name: t("breadcrumb"), path: ROUTES.catalog },
    { name: category.title },
  ];

  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={crumbs} />
      <ProductListJsonLd
        locale={locale}
        products={products}
        listName={category.title}
        path={`${ROUTES.catalog}/category/${slug}`}
      />
      {faq.length > 0 && <FaqJsonLd items={faq} />}

      <section className="pt-22 pb-12 lg:pt-32 lg:pb-16">
        <Container>
          <Breadcrumbs locale={locale} items={crumbs} className="mb-5 lg:mb-8" />

          <PageTitle className="mb-3 lg:mb-5 max-w-[880px]">
            {category.title}
          </PageTitle>
          {category.shortDescription && (
            <p className="mb-8 max-w-[720px] text-[12px] lg:text-[16px] font-light leading-[140%] text-black/70 lg:mb-12">
              {category.shortDescription}
            </p>
          )}

          <CatalogGrid
            locale={locale}
            products={products}
            categories={categories}
            activeCategorySlug={category.slug}
          />

          {descriptionBlocks.length > 0 && (
            <div className="mt-14 max-w-[820px] lg:mt-20">
              <PortableTextRenderer blocks={descriptionBlocks} locale={locale} />
            </div>
          )}

          {faq.length > 0 && (
            <FaqSection
              items={faq}
              title={tProduct("faq")}
              className="mt-14 lg:mt-20"
            />
          )}
        </Container>
      </section>

      <ConsultationCTA locale={locale} />
    </>
  );
}
