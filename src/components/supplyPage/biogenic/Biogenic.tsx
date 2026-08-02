import Container from "@/components/shared/container/Container";
import ImageCarousel from "@/components/shared/carousel/ImageCarousel";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import imageOne from "../../../../public/images/supplyPage/biogenic/imageOne.webp";
import imageTwo from "../../../../public/images/supplyPage/biogenic/imageTwo.webp";
import imageThree from "../../../../public/images/supplyPage/biogenic/imageThree.webp";
import imageFour from "../../../../public/images/supplyPage/biogenic/ImageFour.webp";
import imageFive from "../../../../public/images/supplyPage/biogenic/imageFive.webp";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

const biogenicSources = [imageOne, imageTwo, imageThree, imageFour, imageFive];

export default function Biogenic({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.supply.biogenic");
  const alts = t.list<string>("imageAlts");
  const biogenicImages = biogenicSources.map((src, index) => ({
    src,
    alt: alts[index] ?? "",
  }));

  return (
    <section className="py-12 lg:pt-[132px] lg:pb-0">
      <Container className="relative flex flex-col sm:flex-row sm:items-center gap-8">
        <Image quality={100}
          src="/images/supplyPage/biogenic/bgMob.svg"
          alt=""
          width={158}
          height={188}
          className="absolute -top-23.5 left-0 -z-10 object-cover object-right pointer-events-none lg:hidden"
          aria-hidden
        />
        <Image quality={100}
          src="/images/supplyPage/biogenic/bgDesk.svg"
          alt=""
          width={279}
          height={333}
          className="absolute -top-31 -left-21 -z-10 object-cover object-right pointer-events-none hidden lg:block"
          aria-hidden
        />
        <div className="sm:w-[calc(50%-16px)] xl:w-[46%]">
          <SectionTitle className="mb-3 lg:mb-4.5">
            <span className="block">{t("titleLine1")}</span>
            <span className="block pl-[127px] sm:pl-[80px] xl:pl-[166px]">
              {t("titleLine2")}
            </span>
          </SectionTitle>
          <p className="lg:max-w-[513px]">{t("text")}</p>
        </div>
        <ImageCarousel images={biogenicImages} />
      </Container>
    </section>
  );
}
