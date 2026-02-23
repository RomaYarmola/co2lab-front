import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";

export default function WhoWeAre() {
  return (
    <section className="py-12 lg:pt-30 lg:pb-0">
      <Container className="relative flex flex-col md:flex-row-reverse md:items-center gap-8 md:gap-5">
        <Image quality={100}
          src="/images/aboutPage/whoWeAre/bgMob.svg"
          alt=""
          aria-hidden
          className="absolute -z-10 -top-65 xs:-top-52 sm:-top-39 -right-6 pointer-events-none lg:hidden"
          width="208"
          height="213"
        />
        <Image quality={100}
          src="/images/aboutPage/whoWeAre/bgDesk.svg"
          alt=""
          aria-hidden
          className="absolute -z-10 -top-30 -right-10 pointer-events-none hidden lg:block"
          width="312"
          height="319"
        />
        <div className="md:w-[calc(50%-10px)]">
          <SectionTitle className="mb-3 lg:mb-4.5">Who We Are?</SectionTitle>
          <p>
            CO2Lab is a technology-driven company focused on developing and
            delivering comprehensive CO₂ solutions for a range of industries. We
            combine engineering expertise with operational reliability to
            support businesses in optimizing gas usage, maintaining quality, and
            achieving sustainable outcomes.
          </p>
        </div>
        <div className="relative rounded-[18px] md:w-[calc(50%-10px)] h-[158px] md:h-auto md:min-h-[208px] lg:min-h-[288px] overflow-hidden">
          <Image quality={100}
            src="/images/aboutPage/whoWeAre/whoWeAre.webp"
            alt="Who We Are?"
            fill
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
