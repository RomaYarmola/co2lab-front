import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import SecondaryButton from "@/components/shared/buttons/SecondaryButton";
import { localizePath, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { ROUTES } from "@/constants/routes";

export default function About({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.home.about");
  const tCommon = getTranslator(locale, "common");

  return (
    <section className="py-12 lg:pt-[104px] lg:pb-0 text-white">
      <Container>
        <div className="relative rounded-[18px] px-3 lg:px-[46px] pt-8 lg:pt-[62px] pb-[182px] lg:pb-[117px]">
          <div className="absolute -z-10 inset-0 overflow-hidden rounded-[18px] bg-[linear-gradient(353.3deg,rgba(0,0,0,0)_44.74%,rgba(0,0,0,0.6)_67.83%)]">
            <Image quality={100}
              src="/images/homePage/about/about.webp"
              alt={t("imageAlt")}
              fill
              className="object-cover -z-10"
            />
            <div className="absolute z-10 inset-0 overflow-hidden rounded-[18px] bg-[linear-gradient(353.3deg,rgba(0,0,0,0)_44.74%,rgba(0,0,0,0.6)_67.83%)]" />
            <div className="absolute top-[-131px] lg:top-[-537px] right-0 z-20 w-[232px] lg:w-[538px] h-[259px] lg:h-[1068px]">
              <Image quality={100}
                src="/images/homePage/about/smoke.webp"
                alt=""
                fill
                className="object-cover"
                aria-hidden
              />
            </div>
          </div>
          <SectionTitle className="mb-3 lg:mb-2 text-white xl:text-[64px]">
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </SectionTitle>
          <p className="sm:max-w-[431px] mb-8 text-[12px] lg:text-[16px] font-light leading-[120%]">
            {t("text")}
          </p>
          <Link href={localizePath(locale, ROUTES.about)}>
            <SecondaryButton>{tCommon("readMore")}</SecondaryButton>
            <span className="sr-only"> {t("readMoreSr")}</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
