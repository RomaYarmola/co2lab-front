import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionLanding from "@/components/landing/SolutionLanding";
import { INDUSTRY_LANDINGS, industryLandingBySlug } from "@/content/landings";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { createPageMetadata } from "@/utils/createMetadata";

type Props = { params: Promise<{ locale: string; industry: string }> };

export const revalidate = 300;
/** Лише три відомі галузі — будь-який інший slug віддає 404, а не порожню сторінку. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    INDUSTRY_LANDINGS.map((landing) => ({
      locale,
      industry: landing.path.split("/").pop()!,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, industry } = await params;
  const landing = industryLandingBySlug(industry);
  if (!isLocale(raw) || !landing) notFound();
  const locale: Locale = raw;
  return createPageMetadata({
    locale,
    title: landing.seo.title[locale],
    description: landing.seo.description[locale],
    path: landing.path,
    image: landing.image.src,
    imageAlt: landing.image.alt[locale],
  });
}

export default async function IndustryPage({ params }: Props) {
  const { locale: raw, industry } = await params;
  const landing = industryLandingBySlug(industry);
  if (!isLocale(raw) || !landing) notFound();
  return <SolutionLanding landing={landing} locale={raw} />;
}
