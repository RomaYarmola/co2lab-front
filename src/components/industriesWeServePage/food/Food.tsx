import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import FoodList from "./FoodList";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

export default function Food({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.industries.food");

  return (
    <section className="py-12 lg:pt-[132px] lg:pb-0">
      <Container>
        <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4 lg:mb-6">
          <Image quality={100}
            src="/images/industriesWeServePage/food/bgMob.svg"
            alt=""
            width={200}
            height={160}
            className="pointer-events-none absolute top-[-72px] right-[-26px] z-10 w-auto h-auto lg:hidden"
            aria-hidden
          />
          <Image quality={100}
            src="/images/industriesWeServePage/food/bgDesk.svg"
            alt=""
            width={320}
            height={200}
            className="pointer-events-none absolute top-[-104px] right-[72px] -z-20 hidden w-auto h-auto lg:block"
            aria-hidden
          />
          <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-center gap-3 w-full">
            <SectionTitle>{t("title")}</SectionTitle>
            <p className="md:max-w-[295px]">{t("subtitle")}</p>
          </div>
        </div>
        <p className="md:max-w-[589px] mb-8 lg:mb-6">{t("text")}</p>
        <FoodList locale={locale} />
      </Container>
    </section>
  );
}
