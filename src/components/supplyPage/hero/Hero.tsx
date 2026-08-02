import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import Image from "next/image";
import RequestDetailsApplication from "./RequestDetailsApplication";
import heroImage from "../../../../public/images/supplyPage/hero/hero.webp";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

export default function Hero({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.supply.hero");

  return (
    <section className="relative z-10 pt-[72px] pb-4 md:pt-[82px] lg:pt-5 md:pb-0">
      <Container>
        <div className="relative px-3 lg:px-6.5 py-[142px] lg:pt-[194pxpx] lg:pb-[113px] rounded-[18px] overflow-hidden">
          <Image quality={100}
            src={heroImage}
            alt={t("imageAlt")}
            fill
            priority
            fetchPriority="high"
            placeholder="blur"
            className="object-cover -z-10"
          />
          <PageTitle className="max-w-[304px] lg:max-w-[598px] mb-4 lg:mb-5.5 mx-auto lg:mx-0 text-white text-center lg:text-left">
            {t("title")}
          </PageTitle>
          <p className="max-w-[598px] mb-6 lg:mb-10 mx-auto lg:mx-0 text-white text-center lg:text-left">
            {t("text")}
          </p>
          <RequestDetailsApplication />
        </div>
      </Container>
    </section>
  );
}
