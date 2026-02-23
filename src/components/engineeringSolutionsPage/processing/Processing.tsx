import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";

export default function Processing() {
  return (
    <section className="py-12 lg:pt-30 lg:pb-0">
      <Container className="relative flex flex-col sm:flex-row-reverse gap-8 lg:gap-9">
        <Image
          src="/images/engineeringSolutionsPage/processing/bgMobile.svg"
          alt=""
          width={150}
          height={192}
          className="absolute top-[-135px] right-[-20px] -z-10 pointer-events-none md:hidden"
          aria-hidden
        />
        <Image
          src="/images/engineeringSolutionsPage/processing/bgDesktop.svg"
          alt=""
          width={279}
          height={333}
          className="absolute top-[-232px] right-[-25px] -z-10 pointer-events-none hidden md:block"
          aria-hidden
        />
        <div className="flex flex-col sm:justify-center sm:w-[calc(50%-11px)] lg:w-[calc(50%-11px)] xl:px-4">
          <SectionTitle className="mb-3 lg:mb-4.5 lg:text-[44px] xl:text-[48px]">
            <span className="block">High-Purity</span>
            <span className="block pl-[74px] sm:pl-10 lg:pl-19 xl:pl-[137px]">
              CO₂ Processing
            </span>
          </SectionTitle>
          <p>
            Our purification and liquefaction systems ensure that CO₂ reaches
            the highest levels of quality, safety, and stability required for
            industrial and food-grade applications.
          </p>
        </div>
        <div className="relative sm:w-[calc(50%-27px)] lg:w-[calc(50%-27px)] h-[202px] xs:h-70 sm:h-50 lg:h-90 rounded-[18px] overflow-hidden">
          <Image
            src="/images/engineeringSolutionsPage/processing/processing.webp"
            alt="Processing"
            fill
            className="object-cover object-bottom"
          />
        </div>
      </Container>
    </section>
  );
}
