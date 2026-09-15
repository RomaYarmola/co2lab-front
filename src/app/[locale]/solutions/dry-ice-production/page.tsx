import type { Metadata } from "next";
import SolutionLanding from "@/components/landing/SolutionLanding";
import { DRY_ICE_LANDING } from "@/content/landings";
import { createPageMetadata } from "@/utils/createMetadata";
import { resolveLocale } from "@/utils/pageMetadata";

type Props = { params: Promise<{ locale: string }> };

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return createPageMetadata({
    locale,
    title: DRY_ICE_LANDING.seo.title[locale],
    description: DRY_ICE_LANDING.seo.description[locale],
    path: DRY_ICE_LANDING.path,
    image: DRY_ICE_LANDING.image.src,
    imageAlt: DRY_ICE_LANDING.image.alt[locale],
  });
}

export default async function DryIceProductionPage({ params }: Props) {
  const locale = await resolveLocale(params);
  return <SolutionLanding landing={DRY_ICE_LANDING} locale={locale} />;
}
