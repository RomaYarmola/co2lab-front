import Image from "next/image";
import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

export default function Redefining({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.home.redefining");

  return (
    <section className="py-12 lg:pt-[106px] lg:pb-0">
      <Container className="relative">
        <div className="absolute inset-0 -z-10">
          <Image
            quality={100}
            src="/images/homePage/redefining/bgTopMob.svg"
            alt=""
            width={175}
            height={167}
            className="absolute top-[126px] xs:top-0 right-[-39px] z-0 pointer-events-none lg:hidden"
            aria-hidden
          />
          <Image
            quality={100}
            src="/images/homePage/redefining/bgTopDesk.svg"
            alt=""
            width={310}
            height={295}
            className="absolute top-[-24px] right-[-60px] xl:right-[14px] z-0 pointer-events-none hidden lg:block"
            aria-hidden
          />
          <Image
            quality={100}
            src="/images/homePage/redefining/bgBottomMob.svg"
            alt=""
            width={145}
            height={191}
            className="absolute -bottom-9 xs:-bottom-20 left-2.5 z-0 pointer-events-none lg:hidden"
            aria-hidden
          />
          <Image
            quality={100}
            src="/images/homePage/redefining/bgBottomDesk.svg"
            alt=""
            width={257}
            height={340}
            className="absolute bottom-[-179px] xl:bottom-[-169px] left-[66px] xl:left-[106px] z-0 pointer-events-none hidden lg:block"
            aria-hidden
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-[116px] mb-8 lg:mb-16">
          <div>
            <SectionTitle className="mb-3 lg:mb-4.5">
              {t("title")}
            </SectionTitle>
            <p>{t("subtitle")}</p>
          </div>
          <p className="lg:max-w-[365px]">{t("text")}</p>
        </div>
        <Image
          quality={100}
          src="/images/homePage/redefining/infographicMob.png"
          alt={t("imageAlt")}
          width={328}
          height={601}
          className="w-full h-auto xs:hidden"
          aria-hidden
        />
        <Image
          quality={100}
          src="/images/homePage/redefining/infographicDesk.png"
          alt={t("imageAlt")}
          width={1216}
          height={428}
          className="hidden w-full h-auto xs:block"
          aria-hidden
        />
      </Container>
    </section>
  );
}
