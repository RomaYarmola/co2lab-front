"use client";

import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { useTranslations } from "@/i18n/I18nProvider";
import { ROUTES } from "@/constants/routes";
import type { ProductCardView } from "@/lib/sanity/adapters";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import ProductCardGallery from "./ProductCardGallery";

export default function ProductCard({
  product,
  locale,
}: {
  product: ProductCardView;
  locale: Locale;
}) {
  const t = useTranslations("product");
  const href = localizePath(locale, `${ROUTES.catalog}/${product.slug}`);

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

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-black/10 bg-white transition-shadow duration-300 xl:hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
      <ProductCardGallery
        images={product.images}
        name={product.title}
        className="h-[200px] lg:h-[240px]"
      />

      <div className="flex flex-1 flex-col p-4 lg:p-5">
        {product.category && (
          <p className="mb-2 text-[10px] lg:text-[12px] font-light uppercase leading-[120%] tracking-[0.06em] text-black/50">
            {product.category.title}
          </p>
        )}

        <h3 className="mb-2 text-[16px] lg:text-[20px] font-medium uppercase leading-[120%]">
          <Link
            href={href}
            className="transition-opacity duration-300 xl:hover:opacity-70 focus:outline-none focus-visible:underline"
          >
            {/* Клікабельна вся картка; стрілки галереї лежать вище по z-index */}
            <span className="absolute inset-0 z-10" aria-hidden />
            {product.title}
          </Link>
        </h3>

        {product.model && (
          <p className="mb-2 text-[12px] font-light leading-[120%] text-black/60">
            {t("model")}: {product.model}
          </p>
        )}

        {product.shortDescription && (
          <p className="mb-4 line-clamp-3 text-[12px] lg:text-[14px] font-light leading-[140%] text-black/70">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div>
            <p className="text-[14px] lg:text-[16px] font-medium leading-[120%]">
              {priceLabel}
            </p>
            <p className="mt-1 text-[10px] lg:text-[12px] font-light leading-[120%] text-black/50">
              {availabilityLabel}
            </p>
          </div>
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black text-white lg:size-11"
            aria-hidden
          >
            <ArrowIcon className="h-3.5 w-4 transition-transform duration-300 ease-in-out xl:group-hover:translate-x-[2px] xl:group-hover:-translate-y-[2px]" />
          </span>
        </div>
      </div>
    </article>
  );
}
