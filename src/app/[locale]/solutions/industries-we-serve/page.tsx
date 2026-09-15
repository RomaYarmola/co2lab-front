import type { Metadata } from "next";
import { buildStaticPageMetadata, resolveLocale } from "@/utils/pageMetadata";
import { ROUTES } from "@/constants/routes";
import Container from "@/components/shared/container/Container";
import HubLinks from "@/components/shared/hubLinks/HubLinks";
import { getTranslator } from "@/i18n/server";
import { DRY_ICE_LANDING, INDUSTRY_LANDINGS } from "@/content/landings";

type Props = { params: Promise<{ locale: string }> };
import SupportCTA from "@/components/shared/cta/SupportCTA";
import Hero from "@/components/industriesWeServePage/hero/Hero";
import Food from "@/components/industriesWeServePage/food/Food";
import Biogas from "@/components/industriesWeServePage/biogas/Biogas";
import Logistics from "@/components/industriesWeServePage/logistics/Logistics";
import Recycling from "@/components/industriesWeServePage/recycling/Recycling";
import Chemical from "@/components/industriesWeServePage/chemical/Chemical";


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildStaticPageMetadata(params, "industriesWeServe", ROUTES.industriesWeServe);
}

export default async function IndustriesWeServe({ params }: Props) {
  const locale = await resolveLocale(params);
  const tHubs = getTranslator(locale, "hubs");

  return (
    <>
      <Hero locale={locale} />
      <Container>
        <HubLinks
          locale={locale}
          title={tHubs("industriesTitle")}
          text={tHubs("industriesText")}
          items={[...INDUSTRY_LANDINGS, DRY_ICE_LANDING].map((l) => ({ path: l.path, title: l.shortTitle[locale], description: l.seo.description[locale] }))}
          columns={4}
        />
      </Container>
      <Food locale={locale} />
      <Biogas locale={locale} />
      <Chemical locale={locale} />
      <Logistics locale={locale} />
      <Recycling locale={locale} />
      <SupportCTA locale={locale} />
    </>
  );
}
