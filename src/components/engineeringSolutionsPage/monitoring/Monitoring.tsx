import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import MonitoringBadges from "./MonitoringBadges";

export default function Monitoring({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.engineering.monitoring");

  return (
    <section className="py-12 lg:pt-30 lg:pb-0">
      <Container>
        <div className="relative px-3 lg:px-6.5 py-8 lg:py-16 rounded-[18px] overflow-hidden">
          <div className="lg:hidden absolute -z-10 inset-0 bg-[linear-gradient(0deg,rgba(38,38,38,0.4),rgba(38,38,38,0.4)),linear-gradient(270deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_59.13%)]"></div>
          <Image quality={100}
            src="/images/engineeringSolutionsPage/monitoring/monitoring.webp"
            alt={t("imageAlt")}
            fill
            className="object-cover -z-20"
          />
          <div className="lg:max-w-[771px]">
            <SectionTitle className="mb-3 text-white">
              {t("title")}
            </SectionTitle>
            <p className="mb-11.5 lg:mb-8 text-[12px] lg:text-[16px] font-light leading-[120%] text-white">
              {t("text1")}
            </p>
            <p className="mb-3 lg:mb-4 text-[12px] lg:text-[16px] font-light leading-[120%] text-white">
              {t("text2")}
            </p>
            <p className="mb-3 lg:mb-4 text-[12px] lg:text-[16px] font-light leading-[120%] text-white">
              {t("standardsLabel")}
            </p>
            <MonitoringBadges locale={locale} />
          </div>
        </div>
      </Container>
    </section>
  );
}
