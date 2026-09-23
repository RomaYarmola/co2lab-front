import type { Metadata } from "next";
import { buildStaticPageMetadata, resolveLocale } from "@/utils/pageMetadata";
import { ROUTES } from "@/constants/routes";
import Container from "@/components/shared/container/Container";
import CategoryGroups from "@/components/shared/hubLinks/CategoryGroups";
import { getTranslator } from "@/i18n/server";

type Props = { params: Promise<{ locale: string }> };
import Hero from "@/components/equipmentAndSystemsPage/hero/Hero";
import Comparison from "@/components/equipmentAndSystemsPage/comparison/Comparison";
import CriogenicTanks from "@/components/equipmentAndSystemsPage/criogenicTanks/CriogenicTanks";
import SupportCTA from "@/components/shared/cta/SupportCTA";
import Modular from "@/components/equipmentAndSystemsPage/modular/Modular";
import Engineering from "@/components/equipmentAndSystemsPage/engineering/Engineering";


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildStaticPageMetadata(params, "equipmentAndSystems", ROUTES.equipmentAndSystems);
}

export default async function EquipmentAndSystems({ params }: Props) {
  const locale = await resolveLocale(params);
  const tHubs = getTranslator(locale, "hubs");

  return (
    <>
      <Hero locale={locale} />
      <Modular locale={locale} />
      <Comparison locale={locale} />
      <Engineering locale={locale} />
      <CriogenicTanks locale={locale} />
      <Container>
        <CategoryGroups locale={locale} title={tHubs("catalogTitle")} />
      </Container>
      <SupportCTA locale={locale} />
    </>
  );
}
