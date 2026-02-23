import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import MonitoringBadges from "./MonitoringBadges";

export default function Monitoring() {
  return (
    <section className="py-12 lg:pt-30 lg:pb-0">
      <Container>
        <div className="relative px-3 lg:px-6.5 py-8 lg:py-16 rounded-[18px] overflow-hidden">
          <div className="lg:hidden absolute -z-10 inset-0 bg-[linear-gradient(0deg,rgba(38,38,38,0.4),rgba(38,38,38,0.4)),linear-gradient(270deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_59.13%)]"></div>
          <Image quality={100}
            src="/images/engineeringSolutionsPage/monitoring/monitoring.webp"
            alt="monitoring"
            fill
            className="object-cover -z-20"
          />
          <div className="lg:max-w-[771px]">
            <SectionTitle className="mb-3 text-white">
              Quality Control & Monitoring Systems
            </SectionTitle>
            <p className="mb-11.5 lg:mb-8 text-[12px] lg:text-[16px] font-light leading-[120%] text-white">
              We integrate advanced gas analyzers, chromatographic instruments,
              and real-time monitoring solutions that verify purity, moisture
              content, oxygen levels, contaminants, and compliance with food-
              and industrial-grade standards.
            </p>
            <p className="mb-3 lg:mb-4 text-[12px] lg:text-[16px] font-light leading-[120%] text-white">
              These monitoring systems help ensure compliance with European and
              international quality and safety requirements for liquid CO₂.
            </p>
            <p className="mb-3 lg:mb-4 text-[12px] lg:text-[16px] font-light leading-[120%] text-white">
              Standards and regulations:
            </p>
            <MonitoringBadges />
          </div>
        </div>
      </Container>
    </section>
  );
}
