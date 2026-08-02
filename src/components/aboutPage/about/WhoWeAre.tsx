import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

export default function WhoWeAre({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.about.whoWeAre");

  return (
    <section className="py-12 lg:pt-30 lg:pb-0">
      <Container className="relative flex flex-col md:flex-row-reverse md:items-center gap-8 md:gap-5">
        <Image quality={100}
          src="/images/aboutPage/whoWeAre/bgMob.svg"
          alt=""
          aria-hidden
          className="absolute -z-10 -top-65 xs:-top-52 sm:-top-39 -right-6 pointer-events-none lg:hidden"
          width="208"
          height="213"
        />
        <Image quality={100}
          src="/images/aboutPage/whoWeAre/bgDesk.svg"
          alt=""
          aria-hidden
          className="absolute -z-10 -top-30 -right-10 pointer-events-none hidden lg:block"
          width="312"
          height="319"
        />
        <div className="md:w-[calc(50%-10px)]">
          <SectionTitle className="mb-3 lg:mb-4.5">{t("title")}</SectionTitle>
          <p>{t("text")}</p>
        </div>
        <div className="relative rounded-[18px] md:w-[calc(50%-10px)] h-[158px] md:h-auto md:min-h-[208px] lg:min-h-[288px] overflow-hidden">
          <Image quality={100}
            src="/images/aboutPage/whoWeAre/whoWeAre.webp"
            alt={t("imageAlt")}
            fill
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
