import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { createPageMetadata } from "./createMetadata";

/**
 * Метадані статичної сторінки: title/description беруться зі словника
 * за ключем `seo.<seoKey>`, тож переклад робиться в одному місці.
 */
export async function buildStaticPageMetadata(
  params: Promise<{ locale: string }>,
  seoKey: string,
  path: string,
): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const t = getTranslator(locale, `seo.${seoKey}`);
  return createPageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path,
  });
}

/** Валідує локаль із params і повертає її типізовано. */
export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return raw;
}
