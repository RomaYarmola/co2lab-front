import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import BiogasList from "./BiogasList";

export default function Biogas() {
  return (
    <section className="py-12 lg:pt-30 lg:pb-0 text-white">
      <div className="rounded-[28px] bg-black">
        <Container>
          <div className="py-8 lg:py-10.5">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-10 mb-8 lg:mb-12">
              <SectionTitle>Biogas / Biomethane / Bioethanol</SectionTitle>
              <div className="md:max-w-[324px] lg:max-w-[424px] xl:max-w-[427px]">
                <p className="mb-2 text-[12px] lg:text-[18px] font-light leading-[120%]">
                  CO₂ capture, purification, liquefaction, and reuse from
                  renewable sources.
                </p>
                <p>
                  CO2Lab supports renewable energy facilities by capturing and
                  upgrading biogenic CO₂ into valuable products.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <div className="relative h-[180px] sm:h-auto sm:w-[260px] md:w-[400px] lg:w-[520px] xl:w-[773px] rounded-[20px] overflow-hidden shrink-0">
                <Image
                  src="/images/industriesWeServePage/biogas/biogas.webp"
                  alt="Biogas"
                  fill
                  className="object-cover"
                />
              </div>
              <BiogasList />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
