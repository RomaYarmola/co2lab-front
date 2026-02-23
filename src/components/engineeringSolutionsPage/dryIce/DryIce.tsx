import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";

export default function DryIce() {
  return (
    <section className="py-12 lg:pt-30 lg:pb-0 text-white">
      <Container>
        <div className="relative px-3 lg:px-6.5 pt-8 pb-[137px] lg:py-[66px] rounded-[18px] overflow-hidden">
          <Image quality={90}
            src="/images/engineeringSolutionsPage/dryIce/dryIce.webp"
            alt="Dry Ice"
            fill
            className="object-cover -z-10"
          />
          <Image quality={90}
            src="/images/engineeringSolutionsPage/dryIce/smokeMob.webp"
            alt=""
            width={338}
            height={524}
            className="pointer-events-none absolute right-0 -bottom-62 z-0 lg:hidden object-cover"
            aria-hidden
          />
          <Image quality={90}
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
              From Pelletizers to Applications
            </p>
            <SectionTitle className="mb-3 lg:mb-6 lg:text-[64px]">
              Dry Ice Production and Applications
            </SectionTitle>
            <p className="text-[12px] lg:text-[16px] font-light leading-[120%]">
              We provide complete dry ice solutions — from equipment selection
              to full system setup. Our scope includes dry ice pelletizers,
              storage boxes, packaging solutions, and production line
              configuration. We handle installation, CO₂ cylinder integration,
              pelletizer connection, and process tuning to ensure stable and
              efficient dry ice production tailored to your application.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
