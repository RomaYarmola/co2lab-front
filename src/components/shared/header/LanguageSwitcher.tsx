"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  localeLabels,
  localeNames,
  localizePath,
  visibleLocales,
  type Locale,
} from "@/i18n/config";
import { useSlugAliases, type SlugAliases } from "@/i18n/SlugAliases";
import { useTranslations } from "@/i18n/I18nProvider";
import { splitLocalePath } from "@/utils/localePathname";
import ChevronIcon from "@/components/shared/icons/ChevronIcon";
import { cn } from "@/utils/cn";

/**
 * Перемикач мов. Будує URL із поточного шляху, тому користувач лишається
 * на тій самій сторінці.
 *
 * Сутності з локалізованими slug-ами мають різні адреси по мовах. Для
 * категорій підставляємо переклад slug-а з мапи (її віддає серверний
 * лейаут), для товарів і статей ведемо на розділ: раніше перемикач
 * складав /uk/catalog/category/<en-slug> — адресу, якої немає в жодній
 * карті сайту, але яку Google бачив у розмітці кожної сторінки.
 */
const SLUG_LOCALIZED_PREFIXES = ["/catalog/", "/blog/"];
const CATEGORY_SEGMENT = "category/";

function localizedTargetPath(
  path: string,
  target: Locale,
  aliases: SlugAliases,
): string {
  const prefix = SLUG_LOCALIZED_PREFIXES.find((item) => path.startsWith(item));
  if (!prefix) return path;

  const section = prefix.slice(0, -1);
  const rest = path.slice(prefix.length);
  if (!rest.startsWith(CATEGORY_SEGMENT)) return section;

  const slug = rest.slice(CATEGORY_SEGMENT.length).split("/")[0];
  const alias = aliases[slug]?.[target];
  return alias ? `${section}/${CATEGORY_SEGMENT}${alias}` : section;
}

export default function LanguageSwitcher({
  locale,
  variant = "desktop",
  onNavigate,
}: {
  locale: Locale;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const aliases = useSlugAliases();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { path } = splitLocalePath(pathname);
  const hrefFor = (target: Locale) =>
    localizePath(target, localizedTargetPath(path, target, aliases));

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onMouseDown = (event: MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [open]);

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2" aria-label={t("languageSwitcher")}>
        {visibleLocales.map((item) => {
          const isActive = item === locale;
          return (
            <Link
              key={item}
              href={hrefFor(item)}
              hrefLang={item}
              lang={item}
              onClick={onNavigate}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "rounded-full border px-4 py-2 text-[14px] font-medium leading-[120%] transition-colors duration-300",
                isActive
                  ? "border-black bg-black text-white"
                  : "border-black/20 text-black",
              )}
            >
              {localeLabels[item]}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("languageSwitcher")}
        className="flex cursor-pointer items-center gap-1.5 rounded-full border border-transparent px-4 py-3 text-[14px] font-medium leading-[120%] transition-[color,border] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black xl:hover:border-black"
      >
        {localeLabels[locale]}
        <ChevronIcon open={open} className="size-3.5" />
      </button>

      <div
        role="listbox"
        className="absolute right-0 top-full z-50 mt-3 min-w-[140px] overflow-hidden rounded-[14px] bg-[linear-gradient(90.95deg,rgba(231,231,231,0.95)_52.25%,rgba(255,255,255,0.95)_99.18%)] shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px] transition duration-200 ease-out"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: open ? "auto" : "none",
          visibility: open ? "visible" : "hidden",
        }}
      >
        <ul className="py-1.5">
          {visibleLocales.map((item) => {
            const isActive = item === locale;
            return (
              <li key={item}>
                <Link
                  href={hrefFor(item)}
                  hrefLang={item}
                  lang={item}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className={cn(
                    "block px-5 py-2.5 text-[14px] leading-[120%] transition-colors duration-200 xl:hover:bg-black/5",
                    isActive ? "font-medium text-black" : "font-light text-black/70",
                  )}
                >
                  {localeNames[item]}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
