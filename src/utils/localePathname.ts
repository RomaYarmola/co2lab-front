import { isLocale, type Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";

/**
 * Розбирає URL-шлях на локаль і "логічний" шлях без префікса.
 * `/uk/catalog/x` → { locale: "uk", path: "/catalog/x" }
 * `/catalog/x`    → { locale: "en", path: "/catalog/x" }
 */
export function splitLocalePath(pathname: string): {
  locale: Locale;
  path: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    const locale = segments[0];
    const rest = segments.slice(1).join("/");
    return { locale, path: rest ? `/${rest}` : "/" };
  }
  return { locale: defaultLocale, path: pathname || "/" };
}
