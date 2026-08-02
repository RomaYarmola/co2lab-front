import type { Metadata } from "next";
import { buildStaticPageMetadata, resolveLocale } from "@/utils/pageMetadata";
import { ROUTES } from "@/constants/routes";

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

  return (
    <>
      <Hero locale={locale} />
      <Technologies locale={locale} />
      <Processing locale={locale} />
      <Monitoring locale={locale} />
      <Logistics locale={locale} />
      <DryIce locale={locale} />
      <Utilization locale={locale} />
      <ConsultationCTA locale={locale} />
    </>
  );
}
