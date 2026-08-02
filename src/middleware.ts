import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

/**
 * Локаль дефолту живе в корені (`/about`), інші — під префіксом (`/uk/about`).
 * Middleware лише прибирає надлишковий `/en` префікс (301 на канонічний URL),
 * щоб не плодити дублі для пошукових систем. Автоматичного редіректу за
 * Accept-Language немає навмисно: він шкодить індексації.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // /en, /en/... → канонічний URL без префікса
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const stripped = pathname.slice(defaultLocale.length + 1) || "/";
    const url = request.nextUrl.clone();
    url.pathname = stripped;
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  const segments = pathname.split("/").filter(Boolean);
  const hasLocalePrefix =
    segments.length > 0 && (locales as readonly string[]).includes(segments[0]);

  // Без префікса — переписуємо на дефолтну локаль, URL лишається чистим
  if (!hasLocalePrefix) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
