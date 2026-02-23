import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";

export default function Logistics() {
  return (
    <section className="py-12 lg:pt-30 lg:pb-0 text-white">
      <div className="relative rounded-[28px] bg-black overflow-hidden">
        <Container>
          <div className="relative py-8 lg:py-10.5">
            <Image quality={100}
              src="/images/industriesWeServePage/logistics/bgLeftDesk.svg"
              alt="background"
              aria-hidden
              className="absolute right-[410px] top-12 object-cover pointer-events-none hidden lg:block"
              width="328"
              height="285"
            />
            <Image quality={100}
              src="/images/industriesWeServePage/logistics/bgRightDesk.svg"
              alt="background"
              aria-hidden
              className="absolute right-[-110px] top-14 object-cover pointer-events-none hidden lg:block"
              width="290"
              height="322"
            />
            <Image quality={100}
              src="/images/industriesWeServePage/logistics/bgMob.svg"
              alt="background"
              aria-hidden
              className="absolute top-7 -right-6 object-cover pointer-events-none lg:hidden"
              width={188}
              height={158}
            />
            <SectionTitle className="mb-3 lg:mb-6">
              Logistics & Cold Chain
            </SectionTitle>
            <p className="mb-8 lg:mb-7 text-[12px] lg:text-[18px] font-light leading-[120%]">
              CO₂ utilization and recycling solutions for environmental
              applications.
            </p>
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex flex-col sm:flex-row gap-3 lg:w-[calc(50%-6px)]">
                  <div className="sm:w-[calc(50%-6px)] min-h-[152px] px-6 py-7 bg-white rounded-[12px]">
                    <h3 className="mb-3 text-[20px] xl:text-[24px] font-medium leading-[120%] uppercase text-black">
                      Dry ice for frozen transport
                    </h3>
                    <p className="text-[10px] lg:text-[14px] font-light leading-[120%] text-black">
                      Dry ice ensures reliable ultra-low temperature conditions
                      during transportation of frozen and temperature-sensitive
                      goods.
                    </p>
                  </div>
                  <div className="relative sm:w-[calc(50%-6px)] h-[152px] sm:h-auto border border-white rounded-[12px] overflow-hidden">
                    <Image quality={100}
                      src="/images/industriesWeServePage/logistics/imageOne.webp"
                      alt="Dry ice"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row-reverse lg:flex-row gap-3  lg:w-[calc(50%-6px)]">
                  <div className="sm:w-[calc(50%-6px)] min-h-[152px] lg:min-h-[146px] px-6 py-7 bg-white rounded-[12px]">
                    <h3 className="mb-3 text-[20px] xl:text-[24px] font-medium leading-[120%] uppercase text-black">
                      Temperature stabilization
                    </h3>
                    <p className="text-[10px] lg:text-[14px] font-light leading-[120%] text-black">
                      Controlled temperature stabilization protects products
                      from fluctuations throughout the entire logistics process.
                    </p>
                  </div>
                  <div className="relative sm:w-[calc(50%-6px)] h-[152px] sm:h-auto rounded-[12px] border border-white  overflow-hidden">
                    <Image quality={100}
                      src="/images/industriesWeServePage/logistics/imageTwo.webp"
                      alt="Temperature stabilization"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="sm:w-[calc(50%-6px)] min-h-[152px] px-6 py-7 bg-white rounded-[12px]">
                  <h3 className="mb-3 text-[20px] xl:text-[24px] font-medium leading-[120%] uppercase text-black">
                    Cold storage and distribution
                  </h3>
                  <p className="text-[10px] lg:text-[14px] font-light leading-[120%] text-black">
                    Cold storage and distribution solutions maintain product
                    quality from storage to final delivery.
                  </p>
                </div>
                <div className="relative sm:w-[calc(50%-6px)] h-[152px] sm:h-auto rounded-[12px] border border-white overflow-hidden">
                  <Image quality={100}
                    src="/images/industriesWeServePage/logistics/imageThree.webp"
                    alt="Cold storage and distribution"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
