import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import BreadcrumbJsonLd from "@/components/shared/seo/BreadcrumbJsonLd";
import ProductJsonLd from "@/components/shared/seo/ProductJsonLd";
import FaqJsonLd from "@/components/shared/seo/FaqJsonLd";
import FaqSection from "@/components/shared/faq/FaqSection";
import PortableTextRenderer from "@/components/shared/portableText/PortableTextRenderer";
import ProductGallery from "@/components/catalog/ProductGallery";
import ProductCard from "@/components/catalog/ProductCard";
import ProductQuoteApplication from "@/components/catalog/ProductQuoteApplication";
import ConsultationCTA from "@/components/shared/cta/ConsultationCTA";
import { isLocale, localizePath, locales, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { createPageMetadata } from "@/utils/createMetadata";
import { buildAlternatesFromSlugs } from "@/utils/localizedAlternates";
import { ROUTES } from "@/constants/routes";
import {
  fetchProductBySlug,
  fetchProducts,
  fetchSimilarProducts,
} from "@/lib/sanity/fetchers";
import {
  mapProductCard,
  mapProductDetail,
  resolveDocumentSeo,
} from "@/lib/sanity/adapters";
import { allSlugs } from "@/lib/sanity/localized";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const products = await fetchProducts();
  return locales.flatMap((locale) =>
    products
      .map((doc) => mapProductCard(doc, locale).slug)
      .filter(Boolean)
      .map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const doc = await fetchProductBySlug(slug);
  if (!doc) return {};

  const product = mapProductDetail(doc, locale);
  const seo = resolveDocumentSeo(doc.seo, locale, {
    title: product.title,
    description: product.shortDescription,
    imageUrl: product.images[0]?.url ?? null,
  });

  const base = createPageMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: `${ROUTES.catalog}/${slug}`,
    image: seo.image,
    imageAlt: product.images[0]?.alt,
    keywords: seo.keywords,
    noIndex: seo.noIndex,
  });

  return {
    ...base,
    alternates: {
      ...base.alternates,
      languages: buildAlternatesFromSlugs(ROUTES.catalog, allSlugs(doc.slug)),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const doc = await fetchProductBySlug(slug);
  if (!doc) notFound();

  const t = getTranslator(locale, "product");
  const tCatalog = getTranslator(locale, "catalog");
  const tCommon = getTranslator(locale, "common");

  const product = mapProductDetail(doc, locale);

  const manualRelated = Array.isArray(doc.relatedProducts)
    ? doc.relatedProducts.map((item) => mapProductCard(item, locale))
    : [];
  const similar =
    manualRelated.length > 0
      ? manualRelated
      : (
          await fetchSimilarProducts(doc._id, doc.category?._id ?? "", 4)
        ).map((item) => mapProductCard(item, locale));

  const crumbs = [
    { name: tCommon("home"), path: ROUTES.home },
    { name: tCatalog("breadcrumb"), path: ROUTES.catalog },
    ...(product.category
      ? [
          {
            name: product.category.title,
            path: `${ROUTES.catalog}/category/${product.category.slug}`,
          },
        ]
      : []),
    { name: product.title },
  ];

  const availabilityLabel =
    product.availability === "inStock"
      ? t("inStock")
      : product.availability === "madeToOrder"
        ? t("madeToOrder")
        : t("onRequest");

  const priceLabel = product.priceOnRequest
    ? t("priceOnRequest")
    : new Intl.NumberFormat(locale, {
        style: "currency",
        currency: product.currency,
        maximumFractionDigits: 0,
      }).format(product.price ?? 0);

  const specGroups = groupSpecs(product.specs);

  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={crumbs} />
      <ProductJsonLd locale={locale} product={product} />
      {product.faq.length > 0 && <FaqJsonLd items={product.faq} />}

      <section className="pt-22 pb-12 lg:pt-32 lg:pb-16">
        <Container>
          <Breadcrumbs locale={locale} items={crumbs} className="mb-5 lg:mb-8" />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="lg:max-w-[760px]">
              {product.category && (
                <Link
                  href={localizePath(
                    locale,
                    `${ROUTES.catalog}/category/${product.category.slug}`,
                  )}
                  className="mb-3 inline-block text-[12px] font-light uppercase leading-[120%] tracking-[0.08em] text-black/50 transition-opacity duration-300 xl:hover:opacity-70"
                >
                  {product.category.title}
                </Link>
              )}
              <PageTitle>{product.title}</PageTitle>
              {(product.model || product.sku) && (
                <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[12px] lg:text-[14px] font-light leading-[120%] text-black/60">
                  {product.model && (
                    <span>
                      {t("model")}: <span className="text-black">{product.model}</span>
                    </span>
                  )}
                  {product.sku && (
                    <span>
                      {t("sku")}: <span className="text-black">{product.sku}</span>
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>

          <ProductGallery images={product.images} />

          <div className="mt-8 grid grid-cols-12 items-start gap-6 lg:mt-12 lg:gap-10">
            <div className="col-span-12 lg:col-span-8">
              {product.shortDescription && (
                <p className="mb-8 text-[14px] lg:text-[18px] font-light leading-[160%] text-black/80">
                  {product.shortDescription}
                </p>
              )}

              {product.descriptionBlocks.length > 0 && (
                <div className="mb-10">
                  <PortableTextRenderer
                    blocks={product.descriptionBlocks}
                    locale={locale}
                  />
                </div>
              )}

              {product.features.length > 0 && (
                <div className="mb-10 border-t border-black/10 pt-8">
                  <SectionTitle className="mb-5 text-[22px] lg:text-[28px]">
                    {t("features")}
                  </SectionTitle>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-[12px] lg:text-[16px] font-light leading-[150%] text-black/80"
                      >
                        <span
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-black"
                          aria-hidden
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {specGroups.length > 0 && (
                <div className="mb-10 border-t border-black/10 pt-8">
                  <SectionTitle className="mb-5 text-[22px] lg:text-[28px]">
                    {t("specifications")}
                  </SectionTitle>
                  {specGroups.map((group) => (
                    <div key={group.name || "default"} className="mb-6 last:mb-0">
                      {group.name && (
                        <h3 className="mb-3 text-[14px] lg:text-[18px] font-medium uppercase leading-[120%]">
                          {group.name}
                        </h3>
                      )}
                      <dl className="overflow-hidden rounded-[12px] border border-black/10">
                        {group.rows.map((row, index) => (
                          <div
                            key={index}
                            className="flex flex-col gap-1 border-b border-black/10 px-4 py-3 last:border-b-0 even:bg-black/[0.02] sm:flex-row sm:gap-6 lg:px-5"
                          >
                            <dt className="text-[12px] lg:text-[14px] font-light leading-[140%] text-black/55 sm:w-1/2">
                              {row.label}
                            </dt>
                            <dd className="text-[12px] lg:text-[14px] font-medium leading-[140%] sm:w-1/2">
                              {row.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>
              )}

              {product.applications.length > 0 && (
                <div className="mb-10 border-t border-black/10 pt-8">
                  <SectionTitle className="mb-5 text-[22px] lg:text-[28px]">
                    {t("applications")}
                  </SectionTitle>
                  <ul className="flex flex-wrap gap-2">
                    {product.applications.map((application, index) => (
                      <li
                        key={index}
                        className="rounded-full border border-black/15 px-4 py-2 text-[12px] lg:text-[14px] font-light leading-[120%]"
                      >
                        {application}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.documents.length > 0 && (
                <div className="border-t border-black/10 pt-8">
                  <SectionTitle className="mb-5 text-[22px] lg:text-[28px]">
                    {t("documents")}
                  </SectionTitle>
                  <ul className="flex flex-col gap-2">
                    {product.documents.map((document, index) => (
                      <li key={index}>
                        <a
                          href={document.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-4 rounded-[12px] border border-black/10 px-4 py-3.5 text-[12px] lg:text-[14px] font-medium leading-[120%] transition-colors duration-300 xl:hover:border-black lg:px-5"
                        >
                          {document.title}
                          <span className="text-[10px] font-light uppercase tracking-[0.08em] text-black/50">
                            PDF
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sticky-панель із ціною та CTA */}
            <aside className="col-span-12 lg:col-span-4 lg:sticky lg:top-32">
              <div className="rounded-[18px] bg-black px-5 py-6 text-white lg:px-7 lg:py-8">
                <p className="text-[20px] lg:text-[28px] font-medium leading-[120%]">
                  {priceLabel}
                </p>
                <p className="mt-1.5 text-[12px] font-light leading-[120%] text-white/60">
                  {availabilityLabel}
                </p>
                <p className="mt-5 text-[12px] lg:text-[14px] font-light leading-[150%] text-white/75">
                  {t("ctaText")}
                </p>
                <div className="mt-6">
                  <ProductQuoteApplication productTitle={product.title} />
                </div>
              </div>
            </aside>
          </div>

          {product.faq.length > 0 && (
            <FaqSection
              items={product.faq}
              title={t("faq")}
              className="mt-14 lg:mt-20"
            />
          )}

          {similar.length > 0 && (
            <section className="mt-14 border-t border-black/10 pt-10 lg:mt-20 lg:pt-14">
              <SectionTitle className="mb-6 lg:mb-8">
                {t("similarProducts")}
              </SectionTitle>
              <ul className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                {similar.map((item) => (
                  <li key={item.id} className="h-full">
                    <ProductCard product={item} locale={locale} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Container>
      </section>

      <ConsultationCTA locale={locale} />
    </>
  );
}

/** Групує характеристики за полем `group`, зберігаючи порядок з CMS. */
function groupSpecs(
  specs: Array<{ label: string; value: string; group?: string }>,
) {
  const groups: Array<{ name: string; rows: typeof specs }> = [];
  for (const spec of specs) {
    const name = spec.group ?? "";
    const existing = groups.find((group) => group.name === name);
    if (existing) existing.rows.push(spec);
    else groups.push({ name, rows: [spec] });
  }
  return groups;
}
