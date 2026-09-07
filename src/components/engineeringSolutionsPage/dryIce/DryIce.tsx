import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

/** Розрахунок витрати рідкого CO₂ на тонну гранули — стаття в блозі. */
const ARTICLE_SLUG: Record<Locale, string> = {
  en: "liquid-co2-per-tonne-of-dry-ice",
  uk: "skilky-ridkogo-co2-na-tonnu-suhogo-lodu",
  ru: "skolko-zhidkogo-co2-na-tonnu-suhogo-lda",
};

/**
 * Діючий український виробник сухого льоду — суміжний проєкт того самого
 * власника. Посилання показує читачеві готовий приклад того, у що
 * перетворюється рідкий CO₂ з наших ємностей.
 */
const ICELAB: Record<Locale, string> = {
  en: "https://icelab.com.ua/production",
  uk: "https://icelab.com.ua/production",
  ru: "https://icelab.com.ua/ru/production",
};

export default function DryIce({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.engineering.dryIce");
  const linkClass =
    "text-[12px] lg:text-[16px] font-light leading-[120%] underline underline-offset-4 transition-opacity xl:hover:opacity-70";

  return (
    <section className="py-12 lg:pt-30 lg:pb-0 text-white">
      <Container>
        <div className="relative px-3 lg:px-6.5 pt-8 pb-[137px] lg:py-[66px] rounded-[18px] overflow-hidden">
          <Image quality={100}
            src="/images/engineeringSolutionsPage/dryIce/dryIce.webp"
            alt={t("imageAlt")}
            fill
            className="object-cover -z-10"
          />
          <Image quality={100}
            src="/images/engineeringSolutionsPage/dryIce/smokeMob.webp"
            alt=""
            width={338}
            height={524}
            className="pointer-events-none absolute right-0 -bottom-62 z-0 lg:hidden object-cover"
            aria-hidden
          />
          <Image quality={100}
            src="/images/engineeringSolutionsPage/dryIce/smokeDesk.webp"
            alt=""
            width={636}
            height={436}
            className="pointer-events-none absolute right-0 bottom-0 z-0 object-contain hidden lg:block"
            aria-hidden
          />
          <div className="relative z-10 md:max-w-[516px] lg:max-w-[720px] xl:max-w-[813px]">
            {" "}
            <p className="mb-3 lg:mb-6 text-[12px] lg:text-[16px] font-light leading-[120%]">
              {t("eyebrow")}
            </p>
            <SectionTitle className="mb-3 lg:mb-6 lg:text-[64px]">
              {t("title")}
            </SectionTitle>
            <p className="text-[12px] lg:text-[16px] font-light leading-[120%]">
              {t("text")}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 lg:mt-6">
              <Link
                href={localizePath(locale, `/blog/${ARTICLE_SLUG[locale]}`)}
                className={linkClass}
              >
                {t("articleLink")}
              </Link>
              <a
                href={ICELAB[locale]}
                target="_blank"
                rel="noopener"
                className={linkClass}
              >
                {t("producerLink")}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
