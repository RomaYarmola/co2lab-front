import RequestQuoteApplication from "./RequestQuote";
import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import Image from "next/image";
import heroImage from "../../../../public/images/equipmentAndSystemsPage/hero/hero.webp";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

export default function Hero({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.equipment.hero");

  return (
    <section className="relative z-10 pt-[72px] pb-4 md:pt-[82px] lg:pt-5 md:pb-0">
      <Container>
        <div className="relative flex flex-col md:flex-row justify-center md:justify-between md:items-end px-3 lg:px-6.5 py-[130px] lg:pt-[416px] md:pb-6.5 rounded-[18px] overflow-hidden">
          <Image quality={100}
            src={heroImage}
            alt={t("imageAlt")}
            fill
            priority
            fetchPriority="high"
            placeholder="blur"
            className="object-cover -z-10"
          />
          <div className="mb-8 md:mb-0 md:max-w-[381px] lg:max-w-[541px]">
            <p className="mb-4 lg:mb-5.5 text-white text-center md:text-left">
              {t("eyebrow")}
            </p>
            <PageTitle className="max-w-[304px] md:max-w-full mx-auto md:mx-0 text-white text-center md:text-left">
              {t("title")}
            </PageTitle>
          </div>
          <div className="md:max-w-[299px]">
            <p className="mb-4 lg:mb-9 text-white text-center md:text-left">
              {t("text")}
            </p>
            <RequestQuoteApplication />
          </div>
        </div>
      </Container>
    </section>
  );
}
