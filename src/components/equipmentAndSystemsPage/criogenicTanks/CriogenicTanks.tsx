import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import CriogenicTanksList from "./CriogenicTanksList";

export default function CriogenicTanks() {
  return (
    <section className="py-12 lg:pt-[142px] lg:pb-0">
      <Container>
        <div className="flex flex-col sm:flex-row-reverse sm:items-center gap-8 mb-8 lg:mb-12">
          <div className="sm:w-[calc(50%-16px)]">
            <SectionTitle className="mb-3 lg:mb-4.5 lg:text-[44px] xl:text-[48px]">
              Cryogenic Tanks and Equipment from CO2Lab
            </SectionTitle>
            <p className="mb-3 lg:mb-4.5">
              CO2Lab Engineering Bureau offers a wide range of cryogenic
              equipment for the storage and transportation of liquefied gases
              such as CO₂, oxygen (LOX), nitrogen (LIN), argon (LAR), natural
              gas (LNG), and other industrial gases.
            </p>
            <p>
              Our cryogenic tanks meet modern safety and efficiency standards.
            </p>
          </div>
          <div className="relative sm:w-[calc(50%-16px)] h-60 xs:h-80 sm:h-70 lg:h-[435px] rounded-[18px] overflow-hidden">
            <Image quality={100}
              src="/images/equipmentAndSystemsPage/criogenicTanks/image.webp"
              alt="Processing"
              fill
              className="object-cover object-[75%_20%]"
            />
          </div>
        </div>

        <CriogenicTanksList />
      </Container>
    </section>
  );
}
