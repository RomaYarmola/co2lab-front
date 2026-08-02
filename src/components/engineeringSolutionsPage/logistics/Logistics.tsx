import Container from "@/components/shared/container/Container";
import ImageCarousel from "@/components/shared/carousel/ImageCarousel";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import imageOne from "../../../../public/images/engineeringSolutionsPage/logistics/imageOne.webp";
import imageTwo from "../../../../public/images/engineeringSolutionsPage/logistics/imageTwo.webp";
import imageThree from "../../../../public/images/engineeringSolutionsPage/logistics/imageThree.webp";
import imageFour from "../../../../public/images/engineeringSolutionsPage/logistics/imageFour.webp";
import imageFive from "../../../../public/images/engineeringSolutionsPage/logistics/imageFive.webp";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

const imageSources = [imageOne, imageTwo, imageThree, imageFour, imageFive];

export default function Logistics({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.engineering.logistics");
  const alts = t.list<string>("imageAlts");
  const logisticsImages = imageSources.map((src, index) => ({ src, alt: alts[index] ?? "" }));

  return (
    <section className="py-12 lg:pt-30 lg:pb-0">
      <Container className="relative flex flex-col sm:flex-row sm:items-center gap-8">
        <Image quality={100}
          src="/images/engineeringSolutionsPage/logistics/bgMob.svg"
          alt=""
          width={158}
          height={188}
          className="absolute -top-16.5 -right-6 -z-10 object-cover object-right pointer-events-none lg:hidden"
          aria-hidden
        />
        <Image quality={100}
          src="/images/engineeringSolutionsPage/logistics/bgDesk.svg"
          alt=""
          width={279}
          height={333}
          className="absolute -top-25 left-[418px] -z-10 object-cover object-right pointer-events-none hidden lg:block"
          aria-hidden
        />
        <div className="sm:w-[calc(50%-16px)] xl:w-[46%]">
          <SectionTitle className="mb-3 lg:mb-4.5">
            <span className="block">{t("titleLine1")}</span>
            <span className="block pl-[113px] lg:pl-[186px]">{t("titleLine2")}</span>
          </SectionTitle>
          <p className="lg:max-w-[440px]">{t("text")}</p>
        </div>
        <ImageCarousel images={logisticsImages} />
      </Container>
    </section>
  );
}
