import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { cn } from "@/utils/cn";

export type Crumb = {
  name: string;
  /** Логічний шлях без префікса локалі. Останній елемент лишають без href. */
  path?: string;
};

/**
 * Візуальні хлібні крихти. JSON-LD рендериться окремо
 * через <BreadcrumbJsonLd> — щоб розмітка не залежала від верстки.
 */
export default function Breadcrumbs({
  locale,
  items,
  className,
  variant = "dark",
}: {
  locale: Locale;
  items: Crumb[];
  className?: string;
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";

  return (
    <nav aria-label="Breadcrumb" className={cn("w-full", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] lg:text-[14px] font-light leading-[120%]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {item.path && !isLast ? (
                <Link
                  href={localizePath(locale, item.path)}
                  className={cn(
                    "transition-opacity duration-300 xl:hover:opacity-70",
                    isLight ? "text-white/70" : "text-black/60",
                  )}
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className={cn(
                    "font-medium",
                    isLight ? "text-white" : "text-black",
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.name}
                </span>
              )}
              {!isLast && (
                <span
                  className={isLight ? "text-white/40" : "text-black/30"}
                  aria-hidden
                >
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
