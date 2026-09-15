import type { Metadata } from "next";
import { buildStaticPageMetadata, resolveLocale } from "@/utils/pageMetadata";
import { ROUTES } from "@/constants/routes";
import Container from "@/components/shared/container/Container";
import HubLinks from "@/components/shared/hubLinks/HubLinks";
import { getTranslator } from "@/i18n/server";
import { DRY_ICE_LANDING, INDUSTRY_LANDINGS } from "@/content/landings";

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
  const tHubs = getTranslator(locale, "hubs");

  return (
    <>
      <Hero locale={locale} />
      <Biogenic locale={locale} />
      <Benefits locale={locale} />
      <Standards locale={locale} />
      <Distribution locale={locale} />
      <Container>
        <HubLinks
          locale={locale}
          title={tHubs("equipmentForSupply")}
          categoryIds={["cat-tanks-co2", "cat-co2-vaporizers", "cat-co2-lab", "cat-installation"]}
          items={[DRY_ICE_LANDING].map((l) => ({ path: l.path, title: l.shortTitle[locale], description: l.seo.description[locale] }))}
          columns={3}
        />
      </Container>
      <ConsultationCTA locale={locale} />
    </>
  );
}
