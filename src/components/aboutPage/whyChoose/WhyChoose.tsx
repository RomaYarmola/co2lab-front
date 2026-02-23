import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";

export default function WhyChoose() {
  return (
    <section className="py-12 lg:pt-30 lg:pb-0">
      <Container className="relative flex flex-col md:flex-row-reverse md:items-center gap-8 md:gap-5 lg:gap-15 xl:gap-[98px]">
        <Image quality={100}
          src="/images/aboutPage/whyChoose/bgMob.svg"
          alt=""
          aria-hidden
          className="absolute -z-10 -top-29 -right-6 pointer-events-none lg:hidden"
          width="208"
          height="213"
        />
        <Image quality={100}
          src="/images/aboutPage/whyChoose/bgDesk.svg"
          alt=""
          aria-hidden
          className="absolute -z-10 -top-25 -right-3 pointer-events-none hidden lg:block"
          width="283"
          height="274"
        />
        <div className="md:w-[calc(50%-10px)]">
          <SectionTitle className="mb-3 lg:mb-4.5">
            <span className="block">Why Choose</span>
            <span className="block pl-[150px] lg:pl-[250px]">CO2Lab</span>
          </SectionTitle>
          <p>
            CO2Lab stands out by combining deep technological knowledge with
            practical, reliable delivery across industries. Whether it’s
            production, logistics, or tailored CO₂ applications, our team
            ensures performance and partnership.
          </p>
        </div>
        <div className="relative rounded-[18px] md:w-[calc(50%-10px)] h-[158px] xs:h-[248px] md:h-auto md:min-h-[208px] lg:min-h-[281px] overflow-hidden">
          <Image quality={100}
            src="/images/aboutPage/whyChoose/whyChoose.webp"
            alt="Why Choose CO2Lab"
            fill
            className="object-cover object-[50%_70%]"
          />
        </div>
      </Container>
    </section>
  );
}
