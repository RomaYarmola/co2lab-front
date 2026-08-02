import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import CriogenicTanksList from "./CriogenicTanksList";

export default function CriogenicTanks({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.equipment.cryogenic");

  return (
    <section className="py-12 lg:pt-[142px] lg:pb-0">
      <Container>
        <div className="flex flex-col sm:flex-row-reverse sm:items-center gap-8 mb-8 lg:mb-12">
          <div className="sm:w-[calc(50%-16px)]">
            <SectionTitle className="mb-3 lg:mb-4.5 lg:text-[44px] xl:text-[48px]">
              {t("title")}
            </SectionTitle>
            <p className="mb-3 lg:mb-4.5">{t("text1")}</p>
            <p>{t("text2")}</p>
          </div>
          <div className="relative sm:w-[calc(50%-16px)] h-60 xs:h-80 sm:h-70 lg:h-[435px] rounded-[18px] overflow-hidden">
            <Image quality={100}
              src="/images/equipmentAndSystemsPage/criogenicTanks/image.webp"
              alt={t("imageAlt")}
              fill
              className="object-cover object-[75%_20%]"
            />
          </div>
        </div>

        <CriogenicTanksList locale={locale} />
      </Container>
    </section>
  );
}
