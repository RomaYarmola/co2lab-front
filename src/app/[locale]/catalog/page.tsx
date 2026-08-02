import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import BreadcrumbJsonLd from "@/components/shared/seo/BreadcrumbJsonLd";
import ProductListJsonLd from "@/components/shared/seo/ProductListJsonLd";
import CatalogGrid from "@/components/catalog/CatalogGrid";
import ConsultationCTA from "@/components/shared/cta/ConsultationCTA";
import { isLocale, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { createPageMetadata } from "@/utils/createMetadata";
import { ROUTES } from "@/constants/routes";
import { fetchProductCategories, fetchProducts } from "@/lib/sanity/fetchers";
import { mapCategory, mapProductCard } from "@/lib/sanity/adapters";

type Props = { params: Promise<{ locale: string }> };

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getTranslator(locale, "seo.catalog");

  return createPageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: ROUTES.catalog,
  });
}

export default async function CatalogPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const t = getTranslator(locale, "catalog");
  const tCommon = getTranslator(locale, "common");

  const [categoryDocs, productDocs] = await Promise.all([
    fetchProductCategories(),
    fetchProducts(),
  ]);

  const categories = categoryDocs
    .map((doc) => mapCategory(doc, locale))
    .filter((category) => category.slug);
  const products = productDocs
    .map((doc) => mapProductCard(doc, locale))
    .filter((product) => product.slug);

  const crumbs = [
    { name: tCommon("home"), path: ROUTES.home },
    { name: t("breadcrumb") },
  ];

  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={crumbs} />
      <ProductListJsonLd
        locale={locale}
        products={products}
        listName={t("heading")}
        path={ROUTES.catalog}
      />

      <section className="pt-22 pb-12 lg:pt-32 lg:pb-16">
        <Container>
          <Breadcrumbs locale={locale} items={crumbs} className="mb-5 lg:mb-8" />

          <PageTitle className="mb-3 lg:mb-5 max-w-[880px]">
            {t("heading")}
          </PageTitle>
          <p className="mb-8 max-w-[720px] text-[12px] lg:text-[16px] font-light leading-[140%] text-black/70 lg:mb-12">
            {t("intro")}
          </p>

          <CatalogGrid
            locale={locale}
            products={products}
            categories={categories}
          />
        </Container>
      </section>

      <ConsultationCTA locale={locale} />
    </>
  );
}
