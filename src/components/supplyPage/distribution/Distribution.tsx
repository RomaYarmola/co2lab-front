import Container from "@/components/shared/container/Container";
import Image from "next/image";
import SectionTitle from "@/components/shared/titles/SectionTitle";

const distribution = [
  {
    title: "Own logistics infrastructure",
    description:
      "Pricing adapted to market conditions, contract duration, and customer-specific supply needs.",
    image: "/images/supplyPage/distribution/imageOne.webp",
    imageAlt: "Own logistics infrastructure",
    dark: true,
  },
  {
    title: "Cold chain compliance",
    description: "Stable temperature from production to destination.",
    image: "/images/supplyPage/distribution/imageTwo.webp",
    imageAlt: "Cold chain compliance",
    dark: false,
  },
  {
    title: "Reliable delivery",
    description: "Planned routes and predictable lead times.",
    image: "/images/supplyPage/distribution/imageThree.webp",
    imageAlt: "Reliable delivery",
    dark: true,
  },
];

export default function Distribution() {
  return (
    <section className="py-12 lg:pt-[136px] lg:pb-0 relative">
      <Container className="relative">
        <Image quality={90}
          src="/images/engineeringSolutionsPage/technologies/bgMobile.svg"
          alt=""
          width={150}
          height={192}
          className="absolute top-[-80px] left-[-22px] -z-10 pointer-events-none md:hidden"
          aria-hidden
        />
        <Image quality={90}
          src="/images/engineeringSolutionsPage/technologies/bgDesktop.svg"
          alt=""
          width={279}
          height={333}
          className="absolute top-[-112px] left-[-40px] -z-10 pointer-events-none hidden md:block"
          aria-hidden
        />
        <ul className="flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-5 list-none p-0 m-0">
          <li
            key="title"
            className="pb-4 md:w-[calc(50%-10px)] md:order-1 md:my-auto"
          >
            <SectionTitle className="mb-3 lg:mb-6 lg:text-[44px] xl:text-[48px]">
              <span className="block">Distribution</span>
              <span className="block pl-[114px]">& Transport</span>
            </SectionTitle>
            <p className="lg:max-w-[460px]">
              We manage our own logistics infrastructure to ensure safe,
              reliable, and on-time delivery of CO₂ and dry ice across regions.
            </p>
          </li>

          {distribution.map((item, idx) => (
            <li
              key={idx}
              className={`md:w-[calc(50%-10px)] md:h-auto ${
                idx === 0
                  ? "md:order-2"
                  : idx === 1
                    ? "md:order-4"
                    : "md:order-3"
              }`}
            >
              <div
                className={`group flex gap-4 lg:gap-11 items-center md:h-full p-4 lg:py-3 pl-4 pr-3 justify-between rounded-[20px] overflow-hidden ${
                  item.dark
                    ? "bg-black text-white"
                    : "bg-white text-black border border-black"
                }`}
              >
                <div>
                  <h3 className="lg:max-w-[219px] text-[16px] lg:text-[24px] font-semibold leading-[120%] uppercase mb-4 lg:mb-6">
                    {item.title}
                  </h3>
                  <p className="text-[10px] lg:text-[14px] font-light leading-[120%]">
                    {item.description}
                  </p>
                </div>
                <div className="relative rounded-[12px] shrink-0 lg:h-full w-[129px] lg:w-[187px] xl:w-[280px] min-h-[124px] lg:min-h-[228px] overflow-hidden">
                  <Image quality={90}
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1023px) 100vw, 38vw"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
