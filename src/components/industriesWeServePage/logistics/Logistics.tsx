import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

export default function Logistics({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.industries.logistics");
  const items = t.list<{ title: string; description: string; imageAlt: string }>("items");

  return (
    <section className="py-12 lg:pt-30 lg:pb-0 text-white">
      <div className="relative rounded-[28px] bg-black overflow-hidden">
        <Container>
          <div className="relative py-8 lg:py-10.5">
            <Image quality={100}
              src="/images/industriesWeServePage/logistics/bgLeftDesk.svg"
              alt=""
              aria-hidden
              className="absolute right-[410px] top-12 object-cover pointer-events-none hidden lg:block"
              width="328"
              height="285"
            />
            <Image quality={100}
              src="/images/industriesWeServePage/logistics/bgRightDesk.svg"
              alt=""
              aria-hidden
              className="absolute right-[-110px] top-14 object-cover pointer-events-none hidden lg:block"
              width="290"
              height="322"
            />
            <Image quality={100}
              src="/images/industriesWeServePage/logistics/bgMob.svg"
              alt=""
              aria-hidden
              className="absolute top-7 -right-6 object-cover pointer-events-none lg:hidden"
              width={188}
              height={158}
            />
            <SectionTitle className="mb-3 lg:mb-6">
              {t("title")}
            </SectionTitle>
            <p className="mb-8 lg:mb-7 text-[12px] lg:text-[18px] font-light leading-[120%]">
              {t("text")}
            </p>
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex flex-col sm:flex-row gap-3 lg:w-[calc(50%-6px)]">
                  <div className="sm:w-[calc(50%-6px)] min-h-[152px] px-6 py-7 bg-white rounded-[12px]">
                    <h3 className="mb-3 text-[20px] xl:text-[24px] font-medium leading-[120%] uppercase text-black">
                      {items[0]?.title}
                    </h3>
                    <p className="text-[10px] lg:text-[14px] font-light leading-[120%] text-black">
                      {items[0]?.description}
                    </p>
                  </div>
                  <div className="relative sm:w-[calc(50%-6px)] h-[152px] sm:h-auto border border-white rounded-[12px] overflow-hidden">
                    <Image quality={100}
                      src="/images/industriesWeServePage/logistics/imageOne.webp"
                      alt={items[0]?.imageAlt ?? ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row-reverse lg:flex-row gap-3  lg:w-[calc(50%-6px)]">
                  <div className="sm:w-[calc(50%-6px)] min-h-[152px] lg:min-h-[146px] px-6 py-7 bg-white rounded-[12px]">
                    <h3 className="mb-3 text-[20px] xl:text-[24px] font-medium leading-[120%] uppercase text-black">
                      {items[1]?.title}
                    </h3>
                    <p className="text-[10px] lg:text-[14px] font-light leading-[120%] text-black">
                      {items[1]?.description}
                    </p>
                  </div>
                  <div className="relative sm:w-[calc(50%-6px)] h-[152px] sm:h-auto rounded-[12px] border border-white  overflow-hidden">
                    <Image quality={100}
                      src="/images/industriesWeServePage/logistics/imageTwo.webp"
                      alt={items[1]?.imageAlt ?? ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="sm:w-[calc(50%-6px)] min-h-[152px] px-6 py-7 bg-white rounded-[12px]">
                  <h3 className="mb-3 text-[20px] xl:text-[24px] font-medium leading-[120%] uppercase text-black">
                    {items[2]?.title}
                  </h3>
                  <p className="text-[10px] lg:text-[14px] font-light leading-[120%] text-black">
                    {items[2]?.description}
                  </p>
                </div>
                <div className="relative sm:w-[calc(50%-6px)] h-[152px] sm:h-auto rounded-[12px] border border-white overflow-hidden">
                  <Image quality={100}
                    src="/images/industriesWeServePage/logistics/imageThree.webp"
                    alt={items[2]?.imageAlt ?? ""}
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
