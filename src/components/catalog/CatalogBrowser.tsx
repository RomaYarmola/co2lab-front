"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { useTranslations } from "@/i18n/I18nProvider";
import { CATALOG_SECTION_LIMIT } from "@/constants/catalog";
import { ROUTES } from "@/constants/routes";
import type { CatalogSectionView } from "@/lib/catalog/sections";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import { cn } from "@/utils/cn";
import ProductCard from "./ProductCard";

/** Лінія під шапкою, яку має перетнути верх секції, щоб вона стала активною. */
const SPY_OFFSET = 96;

function useHeaderHeight(): number {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const update = () => setHeight(Math.round(header.getBoundingClientRect().height));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);
  return height;
}

/**
 * Каталог секціями з панеллю швидкого доступу (логіка з happy-bar).
 *
 * Десктоп (xl): ліворуч липка панель типів обладнання з кількістю товарів,
 * активний пункт підсвічується за прокруткою. Менші екрани: липка стрічка
 * чипсів під шапкою. У секції — перші картки й кнопка «Дивитись усі» на
 * сторінку категорії. Пошук показує плоский список збігів по всьому каталогу.
 *
 * Увесь список рендериться на сервері: пункти панелі — звичайні якорі, а
 * заголовки секцій і кнопки «Дивитись усі» — посилання на категорії, тож
 * краулер бачить і товари, і хаби.
 */
export default function CatalogBrowser({
  locale,
  sections,
}: {
  locale: Locale;
  sections: CatalogSectionView[];
}) {
  const t = useTranslations("catalog");
  const headerHeight = useHeaderHeight();
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const seeking = useRef(false);
  const chipsRef = useRef<HTMLUListElement>(null);
  const chipsBarRef = useRef<HTMLElement>(null);

  const allProducts = useMemo(() => sections.flatMap((section) => section.products), [sections]);
  const needle = query.trim().toLowerCase();
  const results = useMemo(
    () =>
      needle
        ? allProducts.filter((product) =>
            [product.title, product.model, product.sku, product.shortDescription]
              .filter(Boolean)
              .some((field) => field.toLowerCase().includes(needle)),
          )
        : [],
    [allProducts, needle],
  );

  // Підсвічування активної секції за прокруткою. Рахуємо прямо в обробнику:
  // секцій кілька, а setState з тим самим id React пропускає без ререндеру
  useEffect(() => {
    if (needle) return;
    const onScroll = () => {
      if (seeking.current) return;
      const line = headerHeight + SPY_OFFSET;
      let current = sections[0]?.id ?? "";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= line) current = section.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections, headerHeight, needle]);

  // Активний чипс на мобільному — завжди в полі зору стрічки
  useEffect(() => {
    const scroller = chipsRef.current;
    const chip = scroller?.querySelector<HTMLElement>(`[data-section="${activeId}"]`);
    if (!scroller || !chip) return;
    scroller.scrollTo({ left: Math.max(0, chip.offsetLeft - 16), behavior: "smooth" });
  }, [activeId]);

  const scrollToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const chipsVisible = chipsBarRef.current?.offsetParent !== null;
      const chipsHeight = chipsVisible ? (chipsBarRef.current?.offsetHeight ?? 0) : 0;
      const top = window.scrollY + el.getBoundingClientRect().top - headerHeight - chipsHeight - 24;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      seeking.current = true;
      setActiveId(id);
      window.history.replaceState(null, "", `#${id}`);
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
      // Поки їде плавна прокрутка, підсвічування не перескакує по проміжних секціях
      const release = () => {
        seeking.current = false;
        window.removeEventListener("scrollend", release);
      };
      window.addEventListener("scrollend", release);
      window.setTimeout(release, 1200);
    },
    [headerHeight],
  );

  const navItem = (section: CatalogSectionView, variant: "side" | "chip") => {
    const active = !needle && section.id === activeId;
    return (
      <a
        href={`#${section.id}`}
        onClick={(event) => {
          event.preventDefault();
          setQuery("");
          scrollToSection(section.id);
        }}
        aria-current={active ? "true" : undefined}
        className={cn(
          "flex items-center justify-between gap-3 rounded-full border font-medium leading-[120%] transition-colors duration-300",
          variant === "side"
            ? "px-5 py-3 text-[14px]"
            : "whitespace-nowrap px-4 py-2.5 text-[12px]",
          active
            ? "border-black bg-black text-white"
            : "border-black/15 bg-white text-black xl:hover:border-black",
        )}
      >
        <span>{section.title}</span>
        <span className={cn("text-[11px] font-light", active ? "text-white/60" : "text-black/40")}>
          {section.products.length}
        </span>
      </a>
    );
  };

  // Поле двічі в розмітці (над стрічкою чипсів і в боковій панелі) — різні id
  const searchField = (id: string) => (
    <div className="relative w-full">
      <label htmlFor={id} className="sr-only">
        {t("search")}
      </label>
      <input
        id={id}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("searchPlaceholder")}
        className="w-full rounded-full border border-black/15 bg-white px-5 py-3 text-[12px] font-light leading-[120%] outline-none transition-colors duration-300 placeholder:text-black/40 focus:border-black lg:text-[14px]"
      />
    </div>
  );

  return (
    // Обгортка на всю висоту каталогу: липкі елементи тримаються лише в межах батька
    <div className="relative">
      <div className="mb-4 xl:hidden">{searchField("catalog-search")}</div>

      <nav
        ref={chipsBarRef}
        aria-label={t("sectionsNav")}
        className="sticky z-30 -mx-4 bg-white px-4 pb-3 pt-2 xl:hidden"
        style={{ top: headerHeight }}
      >
        <ul
          ref={chipsRef}
          className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((section) => (
            <li key={section.id} data-section={section.id} className="shrink-0">
              {navItem(section, "chip")}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:gap-10">
        <aside
          className="hidden w-72 shrink-0 self-start xl:sticky xl:block"
          style={{ top: headerHeight + 24 }}
        >
          {searchField("catalog-search-side")}
          <p className="mb-3 mt-6 text-[12px] font-medium uppercase leading-[120%] tracking-[0.08em] text-black/50">
            {t("sectionsNav")}
          </p>
          <nav aria-label={t("sectionsNav")}>
            <ul className="flex flex-col gap-2">
              {sections.map((section) => (
                <li key={section.id}>{navItem(section, "side")}</li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 rounded-[18px] border border-black/10 p-5">
            <p className="mb-2 text-[14px] font-medium uppercase leading-[120%]">{t("helpTitle")}</p>
            <p className="mb-4 text-[12px] font-light leading-[150%] text-black/70">{t("helpText")}</p>
            <Link
              href={localizePath(locale, ROUTES.contacts)}
              className="inline-flex items-center gap-2 text-[12px] font-medium uppercase leading-[120%] transition-opacity duration-300 xl:hover:opacity-70"
            >
              {t("helpCta")}
              <ArrowIcon className="h-3 w-3.5" />
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {needle ? (
            <section aria-live="polite">
              <p className="mb-5 text-[12px] font-light leading-[120%] text-black/50">
                {t("resultsCount", { count: results.length })}
              </p>
              {results.length === 0 ? (
                <div className="rounded-[18px] border border-black/10 px-6 py-12 text-center">
                  <p className="mb-2 text-[16px] font-medium uppercase leading-[120%] lg:text-[20px]">
                    {t("noResults")}
                  </p>
                  <p className="text-[12px] font-light leading-[140%] text-black/60 lg:text-[14px]">
                    {t("noResultsHint")}
                  </p>
                </div>
              ) : (
                <ul className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                  {results.map((product) => (
                    <li key={product.id} className="h-full">
                      <ProductCard product={product} locale={locale} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ) : (
            <div className="flex flex-col gap-14 lg:gap-20">
              {sections.map((section) => {
                const truncated = section.products.length > CATALOG_SECTION_LIMIT;
                const single = section.links.length === 1 ? section.links[0] : null;
                return (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`${section.id}-title`}
                    style={{ scrollMarginTop: headerHeight + 72 }}
                  >
                    <div className="mb-5 flex flex-col gap-3 lg:mb-6">
                      <h2
                        id={`${section.id}-title`}
                        className="text-[22px] font-medium uppercase leading-[120%] lg:text-[30px]"
                      >
                        {single ? (
                          <Link
                            href={localizePath(locale, single.path)}
                            className="transition-opacity duration-300 xl:hover:opacity-70"
                          >
                            {section.title}
                          </Link>
                        ) : (
                          section.title
                        )}
                      </h2>
                      {section.description && (
                        <p className="line-clamp-2 max-w-[760px] text-[12px] font-light leading-[150%] text-black/70 lg:text-[14px]">
                          {section.description}
                        </p>
                      )}
                    </div>

                    <ul className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                      {section.products.slice(0, CATALOG_SECTION_LIMIT).map((product, index) => (
                        <li
                          key={product.id}
                          // На двох колонках третя картка висіла б сама — ховаємо, решта за кнопкою
                          className={cn("h-full", truncated && index === 2 && "xs:max-lg:hidden")}
                        >
                          <ProductCard product={product} locale={locale} showCategory={false} />
                        </li>
                      ))}
                    </ul>

                    {single ? (
                      truncated && (
                        <Link
                          href={localizePath(locale, single.path)}
                          className="mt-5 inline-flex items-center gap-2 rounded-full border border-black px-5 py-3 text-[12px] font-medium uppercase leading-[120%] transition-colors duration-300 xl:hover:bg-black xl:hover:text-white lg:text-[14px]"
                        >
                          {t("seeAll", { count: section.products.length })}
                          <ArrowIcon className="h-3 w-3.5" />
                        </Link>
                      )
                    ) : (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {section.links.map((link) => (
                          <li key={link.path}>
                            <Link
                              href={localizePath(locale, link.path)}
                              className="inline-flex items-center gap-2 rounded-full border border-black px-5 py-3 text-[12px] font-medium uppercase leading-[120%] transition-colors duration-300 xl:hover:bg-black xl:hover:text-white lg:text-[14px]"
                            >
                              {link.title}
                              <span className="text-[11px] font-light opacity-60">{link.count}</span>
                              <ArrowIcon className="h-3 w-3.5" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
