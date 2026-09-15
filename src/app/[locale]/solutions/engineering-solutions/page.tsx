import type { Metadata } from "next";
import { buildStaticPageMetadata, resolveLocale } from "@/utils/pageMetadata";
import { ROUTES } from "@/constants/routes";
import Container from "@/components/shared/container/Container";
import HubLinks from "@/components/shared/hubLinks/HubLinks";
import { getTranslator } from "@/i18n/server";
import { DRY_ICE_LANDING, INDUSTRY_LANDINGS } from "@/content/landings";

type Props = { params: Promise<{ locale: string }> };
import Hero from "@/components/engineeringSolutionsPage/hero/Hero";
import Processing from "@/components/engineeringSolutionsPage/processing/Processing";
import Technologies from "@/components/engineeringSolutionsPage/technologies/Technologies";
import Monitoring from "@/components/engineeringSolutionsPage/monitoring/Monitoring";
import DryIce from "@/components/engineeringSolutionsPage/dryIce/DryIce";
import ConsultationCTA from "@/components/shared/cta/ConsultationCTA";
import Logistics from "@/components/engineeringSolutionsPage/logistics/Logistics";
import Utilization from "@/components/engineeringSolutionsPage/utilization/Utilization";


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildStaticPageMetadata(params, "engineeringSolutions", ROUTES.engineeringSolutions);
}

export default async function EngineeringSolutions({ params }: Props) {
  const locale = await resolveLocale(params);
  const tHubs = getTranslator(locale, "hubs");

  return (
    <>
      <Hero locale={locale} />
      <Technologies locale={locale} />
      <Processing locale={locale} />
      <Monitoring locale={locale} />
      <Logistics locale={locale} />
      <DryIce locale={locale} />
      <Utilization locale={locale} />
      <Container>
        <HubLinks
          locale={locale}
          title={tHubs("equipmentForSolution")}
          categoryIds={["cat-tanks-co2", "cat-co2-vaporizers", "cat-co2-lab", "cat-installation"]}
          items={[DRY_ICE_LANDING, ...INDUSTRY_LANDINGS].map((l) => ({ path: l.path, title: l.shortTitle[locale], description: l.seo.description[locale] }))}
          columns={4}
        />
      </Container>
      <ConsultationCTA locale={locale} />
    </>
  );
}
