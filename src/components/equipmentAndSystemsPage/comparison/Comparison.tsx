import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";

const comparisonRows = [
  {
    parameter: "Purpose",
    modular: "Full-scale plant with complete production cycle",
    containerized: "Quick deployment of individual modules",
  },
  {
    parameter: "Productivity",
    modular: "High, industrial-level output",
    containerized: "Optimized for local-scale needs",
  },
  {
    parameter: "Scalability",
    modular: "Easily expandable in blocks to grow production",
    containerized: "Easily added or relocated as needed",
  },
  {
    parameter: "Installation",
    modular: "Stationary, requires engineering and construction works",
    containerized: "Minimal construction, plug-and-play ready",
  },
  {
    parameter: "Time to Commissioning",
    modular: "3–12 months",
    containerized: "1–4 weeks",
  },
  {
    parameter: "Engineering Customization",
    modular: "Fully tailored to client requirements",
    containerized: "Standardized solutions for fast implementation",
  },
  {
    parameter: "Implementation Cost",
    modular: "Higher due to scale and custom solutions",
    containerized: "Lower thanks to modularity and ready-made units",
  },
  {
    parameter: "Ideal For",
    modular: "Large factories and industrial enterprises",
    containerized: "Farms, small-scale production, startups",
  },
];

export default function Comparison() {
  return (
    <section className="py-12 lg:pt-30 lg:pb-0 relative">
      <Container>
        <div className="flex flex-col lg:items-center mb-8">
          <SectionTitle className="mb-3 lg:mb-4.5 lg:text-[44px] xl:text-[48px]">
            <span className="block">Modular vs</span>
            <span className="block pl-[24px] lg:pl-[276px]">
              Containerized CO₂
            </span>
          </SectionTitle>
          <p className="lg:max-w-[522px] lg:ml-[286px]">
            Quickly compare key features and choose the best solution for your
            project.
          </p>
        </div>

        <div className="relative px-4 lg:px-[79px] pt-8 lg:pt-[53px] pb-5 lg:pb-[62px] overflow-hidden rounded-[20px] bg-black text-white">
          <Image
            src="/images/equipmentAndSystemsPage/comparison/bgTopMob.svg"
            alt=""
            width={200}
            height={120}
            className="pointer-events-none absolute top-0 left-9 z-0 w-auto h-auto lg:hidden"
            aria-hidden
          />
          <Image
            src="/images/equipmentAndSystemsPage/comparison/bgTopDesk.svg"
            alt=""
            width={320}
            height={180}
            className="pointer-events-none absolute top-0 left-[108px] z-0 hidden w-auto h-auto lg:block"
            aria-hidden
          />
          <Image
            src="/images/equipmentAndSystemsPage/comparison/bgBottomMob.svg"
            alt=""
            width={200}
            height={120}
            className="pointer-events-none absolute bottom-0 right-[51px] z-0 w-auto h-auto lg:hidden"
            aria-hidden
          />
          <Image
            src="/images/equipmentAndSystemsPage/comparison/bgBottomDesk.svg"
            alt=""
            width={320}
            height={180}
            className="pointer-events-none absolute bottom-0 right-[218px] z-0 hidden w-auto h-auto lg:block"
            aria-hidden
          />
          <div className="relative z-10 overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-1/3 px-2 lg:px-5 pb-3 min-w-0 break-words text-[12px] lg:text-[18px] font-light leading-[120%] text-white/60">
                    Parameter
                  </th>
                  <th className="w-1/3 px-2 lg:px-5 pb-3 min-w-0 break-words text-[12px] lg:text-[18px] font-light leading-[120%] text-center text-white/60">
                    Modular CO₂ Plant
                  </th>
                  <th className="w-1/3 px-2 lg:px-5 pb-3 min-w-0 break-words text-[12px] lg:text-[18px] font-light leading-[120%] text-center text-white/60">
                    Containerized Unit
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
