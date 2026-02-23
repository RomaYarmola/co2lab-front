import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import RequestSupportApplication from "./RequestSupport";

export default function SupportCTA() {
  return (
    <section className="pt-12 pb-24 lg:pt-[127px] lg:pb-[108px] text-white">
      <Container className="relative">
        <Image quality={100}
          src="/images/cta/bgMob.svg"
          alt=""
          width={200}
          height={240}
          className="absolute -top-12 right-9 -z-20 pointer-events-none lg:hidden w-auto h-auto"
          aria-hidden
        />
        <Image quality={100}
          src="/images/cta/bgDesk.svg"
          alt=""
          width={320}
          height={380}
          className="absolute -top-24 right-12 -z-20 pointer-events-none hidden lg:block w-auto h-auto"
          aria-hidden
        />
        <div className="relative px-3 lg:px-12 pt-8 pb-[178px] sm:pb-8 lg:py-[95px] rounded-[18px] overflow-hidden">
          <Image quality={100}
            src="/images/cta/support.webp"
            alt="Cta"
            fill
            className="object-cover -z-20"
          />

          <div className="relative z-10 lg:max-w-[671px]">
            <SectionTitle className="max-w-[548px] lg:max-w-full mb-3 lg:mb-8">
              Start Your CO₂ Project with Expert Support
            </SectionTitle>
            <p className="max-w-[548px] mb-8 lg:mb-12 text-[12px] lg:text-[18px] font-light leading-[120%]">
              From concept to commissioning, we ensure your CO₂ facility is
              delivered efficiently and reliably.
            </p>
            <RequestSupportApplication />
          </div>
        </div>
      </Container>
    </section>
  );
}
