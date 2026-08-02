import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";


type ComparisonRow = {
  parameter: string;
  modular: string;
  containerized: string;
};

export default function Comparison({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.equipment.comparison");
  const comparisonRows = t.list<ComparisonRow>("rows");

  return (
    <section className="py-12 lg:pt-30 lg:pb-0 relative">
      <Container>
        <div className="flex flex-col lg:items-center mb-8">
          <SectionTitle className="mb-3 lg:mb-4.5 lg:text-[44px] xl:text-[48px]">
            <span className="block">{t("titleLine1")}</span>
            <span className="block pl-[24px] lg:pl-[276px]">
              {t("titleLine2")}
            </span>
          </SectionTitle>
          <p className="lg:max-w-[522px] lg:ml-[286px]">{t("text")}</p>
        </div>

        <div className="relative px-4 lg:px-[79px] pt-8 lg:pt-[53px] pb-5 lg:pb-[62px] overflow-hidden rounded-[20px] bg-black text-white">
          <Image quality={100}
            src="/images/equipmentAndSystemsPage/comparison/bgTopMob.svg"
            alt=""
            width={200}
            height={120}
            className="pointer-events-none absolute top-0 left-9 z-0 w-auto h-auto lg:hidden"
            aria-hidden
          />
          <Image quality={100}
            src="/images/equipmentAndSystemsPage/comparison/bgTopDesk.svg"
            alt=""
            width={320}
            height={180}
            className="pointer-events-none absolute top-0 left-[108px] z-0 hidden w-auto h-auto lg:block"
            aria-hidden
          />
          <Image quality={100}
            src="/images/equipmentAndSystemsPage/comparison/bgBottomMob.svg"
            alt=""
            width={200}
            height={120}
            className="pointer-events-none absolute bottom-0 right-[51px] z-0 w-auto h-auto lg:hidden"
            aria-hidden
          />
          <Image quality={100}
            src="/images/equipmentAndSystemsPage/comparison/bgBottomDesk.svg"
            alt=""
            width={320}
            height={180}
            className="pointer-events-none absolute bottom-0 right-[218px] z-0 hidden w-auto h-auto lg:block"
            aria-hidden
          />
          <div className="relative z-10 overflow-x-auto">
            <table className="w-full min-w-[520px] table-fixed border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-1/3 px-2 lg:px-5 pb-3 min-w-0 break-words text-[12px] lg:text-[18px] font-light leading-[120%] text-white/60">
                    {t("headers.parameter")}
                  </th>
                  <th className="w-1/3 px-2 lg:px-5 pb-3 min-w-0 break-words text-[12px] lg:text-[18px] font-light leading-[120%] text-center text-white/60">
                    {t("headers.modular")}
                  </th>
                  <th className="w-1/3 px-2 lg:px-5 pb-3 min-w-0 break-words text-[12px] lg:text-[18px] font-light leading-[120%] text-center text-white/60">
                    {t("headers.containerized")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.parameter}>
                    <td className="w-1/3 min-w-0 px-2 lg:px-5 py-3 lg:py-[23px] break-words text-[10px] md:text-[14px] lg:text-[18px] font-medium leading-[120%] align-center">
                      {row.parameter}
                    </td>
                    <td className="w-1/3 min-w-0 px-2 lg:px-5 py-3 lg:py-[23px] break-words text-[10px] md:text-[14px] lg:text-[18px] font-light leading-[120%] text-center align-center">
                      {row.modular}
                    </td>
                    <td className="w-1/3 min-w-0 px-2 lg:px-5 py-3 lg:py-[23px] break-words text-[10px] md:text-[14px] lg:text-[18px] font-light leading-[120%] text-center align-center">
                      {row.containerized}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
