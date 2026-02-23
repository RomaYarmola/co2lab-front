import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";

export default function Standards() {
  return (
    <section className="py-12 lg:pt-30 lg:pb-0 text-white">
      <Container>
        <div className="relative px-3 lg:px-6.5 pt-8 pb-[137px] lg:py-[66px] rounded-[18px] overflow-hidden">
          <Image quality={90}
            src="/images/supplyPage/standards/standards.webp"
            alt="Standards"
            fill
            className="object-cover -z-10"
          />
          <Image quality={90}
            src="/images/supplyPage/standards/smokeMob.webp"
            alt=""
            width={338}
            height={524}
            className="pointer-events-none absolute right-0 -bottom-62 z-0 lg:hidden object-cover"
            aria-hidden
          />
          <Image quality={90}
            src="/images/supplyPage/standards/smokeDesk.webp"
            alt=""
            width={636}
            height={494}
            className="pointer-events-none absolute right-0 bottom-0 z-0 object-contain hidden lg:block"
            aria-hidden
          />
          <div className="relative z-10 md:max-w-[516px] lg:max-w-[720px] xl:max-w-[763px]">
            {" "}
            <p className="mb-3 lg:mb-6 text-[12px] lg:text-[16px] font-light leading-[120%]">
              Certified CO₂ for Food Applications
            </p>
            <SectionTitle className="mb-3 lg:mb-6 lg:text-[64px]">
              Compliance with International Food Standards
            </SectionTitle>
            <p className="text-[12px] lg:text-[16px] font-light leading-[120%]">
              We supply food-grade CO₂ fully compliant with ISBT, EIGA, FDA, and
              FSSC 22000 standards. Our carbon dioxide meets strict quality and
              safety requirements for use in the food and beverage industry.
              Each supply is accompanied by quality certificates, confirming
              purity and regulatory compliance — a critical factor for food
              processing, packaging, cooling, and dry ice production
              applications.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
