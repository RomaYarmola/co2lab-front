import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import ApproachList from "@/components/aboutPage/approach/ApproachList";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

export default function Approach({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.about.approach");

  return (
    <section className="py-12 lg:pt-30 lg:pb-0">
      <Container className="relative">
        <Image quality={100}
          src="/images/aboutPage/approach/bgMob.svg"
          alt=""
          aria-hidden
          width={171}
          height={216}
          className="absolute -z-10 -top-20 -left-2 pointer-events-none lg:hidden"
        />
        <Image quality={100}
          src="/images/aboutPage/approach/bgDesk.svg"
          alt=""
          aria-hidden
          width={285}
          height={328}
          className="absolute -z-10 -top-26 left-74 pointer-events-none hidden lg:block"
        />
        <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-8 lg:mb-14">
          <SectionTitle>{t("title")}</SectionTitle>
          <p className="md:w-[calc(50%-10px)]">{t("text")}</p>
        </div>
        <ApproachList locale={locale} />
      </Container>
    </section>
  );
}
