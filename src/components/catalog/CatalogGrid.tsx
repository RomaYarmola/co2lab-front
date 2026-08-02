"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { useTranslations } from "@/i18n/I18nProvider";
import { ROUTES } from "@/constants/routes";
import type { CategoryView, ProductCardView } from "@/lib/sanity/adapters";
import { cn } from "@/utils/cn";
import ProductCard from "./ProductCard";

type SortKey = "newest" | "nameAsc" | "nameDesc";

/**
 * Каталог рендериться на сервері повністю (це клієнтський компонент, але SSR
 * віддає весь список у HTML), тож пошуковики бачать усі товари.
 * Пошук і сортування — суто клієнтські, без зміни URL: так ми не плодимо
 * індексовані дублікати однакового набору товарів.
 */
export default function CatalogGrid({
  locale,
  products,
  categories,
  activeCategorySlug,
}: {
  locale: Locale;
  products: ProductCardView[];
  categories: CategoryView[];
  activeCategorySlug?: string;
}) {
  const t = useTranslations("catalog");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = needle
      ? products.filter((product) =>
          [product.title, product.model, product.sku, product.shortDescription]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(needle)),
        )
      : products;

    const sorted = [...filtered];
    if (sort === "nameAsc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title, locale));
    } else if (sort === "nameDesc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title, locale));
    } else {
      sorted.sort((a, b) => {
        const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
        const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
        return bTime - aTime;
      });
    }
    return sorted;
  }, [products, query, sort, locale]);

  return (
    <div>
      {categories.length > 0 && (
        <nav aria-label={t("categories")} className="mb-6 lg:mb-8">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                href={localizePath(locale, ROUTES.catalog)}
                className={cn(
                  "inline-flex items-center rounded-full border px-4 py-2.5 text-[12px] lg:text-[14px] font-medium leading-[120%] transition duration-300",
                  !activeCategorySlug
                    ? "border-black bg-black text-white"
                    : "border-black/15 bg-white text-black xl:hover:border-black",
                )}
              >
                {t("allCategories")}
              </Link>
            </li>
            {categories.map((category) => {
              const isActive = category.slug === activeCategorySlug;
              return (
                <li key={category.id}>
                  <Link
                    href={localizePath(
                      locale,
                      `${ROUTES.catalog}/category/${category.slug}`,
                    )}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[12px] lg:text-[14px] font-medium leading-[120%] transition duration-300",
                      isActive
                        ? "border-black bg-black text-white"
                        : "border-black/15 bg-white text-black xl:hover:border-black",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {category.title}
                    {category.productCount > 0 && (
                      <span
                        className={cn(
                          "text-[10px] font-light",
                          isActive ? "text-white/60" : "text-black/40",
                        )}
                      >
                        {category.productCount}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:mb-8">
        <div className="relative w-full sm:max-w-[360px]">
          <label htmlFor="catalog-search" className="sr-only">
            {t("search")}
          </label>
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-full border border-black/15 bg-white px-5 py-3 text-[12px] lg:text-[14px] font-light leading-[120%] outline-none transition-colors duration-300 placeholder:text-black/40 focus:border-black"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="shrink-0 text-[12px] font-light leading-[120%] text-black/50">
            {t("resultsCount", { count: visible.length })}
          </span>
          <label htmlFor="catalog-sort" className="sr-only">
            {t("sortBy")}
          </label>
          <select
            id="catalog-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="cursor-pointer rounded-full border border-black/15 bg-white px-4 py-3 text-[12px] lg:text-[14px] font-light leading-[120%] outline-none transition-colors duration-300 focus:border-black"
          >
            <option value="newest">{t("sortNewest")}</option>
            <option value="nameAsc">{t("sortNameAsc")}</option>
            <option value="nameDesc">{t("sortNameDesc")}</option>
          </select>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-[18px] border border-black/10 px-6 py-12 text-center">
          <p className="mb-2 text-[16px] lg:text-[20px] font-medium uppercase leading-[120%]">
            {t("noResults")}
          </p>
          <p className="text-[12px] lg:text-[14px] font-light leading-[140%] text-black/60">
            {t("noResultsHint")}
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {visible.map((product) => (
            <li key={product.id} className="h-full">
              <ProductCard product={product} locale={locale} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
