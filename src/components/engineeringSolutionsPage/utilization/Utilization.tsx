import Container from "@/components/shared/container/Container";
import ImageCarousel from "@/components/shared/carousel/ImageCarousel";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import imageOne from "../../../../public/images/engineeringSolutionsPage/utilization/imageOne.webp";
import imageTwo from "../../../../public/images/engineeringSolutionsPage/utilization/imageTwo.webp";
import imageThree from "../../../../public/images/engineeringSolutionsPage/utilization/imageThree.webp";
import imageFour from "../../../../public/images/engineeringSolutionsPage/utilization/imageFour.webp";
import imageFive from "../../../../public/images/engineeringSolutionsPage/utilization/imageFive.webp";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

const imageSources = [imageOne, imageTwo, imageThree, imageFour, imageFive];

export default function Utilization({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.engineering.utilization");
  const alts = t.list<string>("imageAlts");
  const utilizationImages = imageSources.map((src, index) => ({ src, alt: alts[index] ?? "" }));

  return (
    <section className="py-12 lg:pt-30 lg:pb-0">
      <Container className="relative flex flex-col sm:flex-row-reverse sm:items-center gap-8">
        <div className="sm:w-[calc(50%-16px)] xl:w-[46%]">
          <SectionTitle className="mb-3 lg:mb-4.5 lg:text-[40px] xl:text-[48px]">
            {t("title")}
          </SectionTitle>
          <p className="lg:max-w-[528px]">{t("text")}</p>
        </div>
        <ImageCarousel images={utilizationImages} variant="left" />
      </Container>
    </section>
  );
}
