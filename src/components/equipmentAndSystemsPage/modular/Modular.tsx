import Container from "@/components/shared/container/Container";
import ImageCarousel from "@/components/shared/carousel/ImageCarousel";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import imageOne from "../../../../public/images/equipmentAndSystemsPage/modular/imageOne.webp";
import imageTwo from "../../../../public/images/equipmentAndSystemsPage/modular/imageTwo.webp";
import imageThree from "../../../../public/images/equipmentAndSystemsPage/modular/imageThree.webp";
import imageFour from "../../../../public/images/equipmentAndSystemsPage/modular/imageFour.webp";
import imageFive from "../../../../public/images/equipmentAndSystemsPage/modular/imageFive.webp";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

const imageSources = [imageOne, imageTwo, imageThree, imageFour, imageFive];

export default function Modular({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.equipment.modular");
  const alts = t.list<string>("imageAlts");
  const modularImages = imageSources.map((src, index) => ({ src, alt: alts[index] ?? "" }));

  return (
    <section className="py-12 lg:pt-[134px] lg:pb-0">
      <Container className="relative flex flex-col sm:flex-row sm:items-center gap-8">
        <Image quality={100}
          src="/images/supplyPage/biogenic/bgMob.svg"
          alt=""
          width={158}
          height={188}
          className="absolute -top-23 -left-12 -z-10 object-cover object-right pointer-events-none lg:hidden"
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
            <span className="block pl-[119px] xl:pl-[216px]">{t("titleLine2")}</span>
          </SectionTitle>
          <p className="lg:max-w-[413px]">{t("text")}</p>
        </div>
        <ImageCarousel images={modularImages} />
      </Container>
    </section>
  );
}
