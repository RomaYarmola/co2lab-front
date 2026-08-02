import type { Metadata } from "next";
import { buildStaticPageMetadata, resolveLocale } from "@/utils/pageMetadata";
import { ROUTES } from "@/constants/routes";

type Props = { params: Promise<{ locale: string }> };
import ConsultationCTA from "@/components/shared/cta/ConsultationCTA";
import Hero from "@/components/supplyPage/hero/Hero";
import Standards from "@/components/supplyPage/standards/Standards";
import Distribution from "@/components/supplyPage/distribution/Distribution";
import Benefits from "@/components/supplyPage/benefits/Benefits";
import Biogenic from "@/components/supplyPage/biogenic/Biogenic";


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildStaticPageMetadata(params, "supply", ROUTES.supply);
}

export default async function SupplyPage({ params }: Props) {
  const locale = await resolveLocale(params);

  return (
    <>
      <Hero locale={locale} />
      <Biogenic locale={locale} />
      <Benefits locale={locale} />
      <Standards locale={locale} />
      <Distribution locale={locale} />
      <ConsultationCTA locale={locale} />
    </>
  );
}
