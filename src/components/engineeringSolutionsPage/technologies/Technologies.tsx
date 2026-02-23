import Container from "@/components/shared/container/Container";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import SecondaryButton from "@/components/shared/buttons/SecondaryButton";

const technologies = [
  {
    title: "Equipment & modular CO₂ systems",
    href: "/solutions/equipment-and-systems",
    image: "/images/engineeringSolutionsPage/technologies/second.webp",
    imageAlt: "Equipment and modular CO₂ systems",
    dark: true,
  },
  {
    title: "Full-cycle CO₂ production and supply",
    href: "/supply",
    image: "/images/engineeringSolutionsPage/technologies/first.webp",
    imageAlt: "Full-cycle CO₂ production and supply",
    dark: false,
  },
  {
    title: "Helping businesses optimize processes",
    href: "/solutions/industries-we-serve",
    image: "/images/engineeringSolutionsPage/technologies/third.webp",
    imageAlt: "Helping businesses optimize processes",
    dark: true,
  },
];

export default function Technologies() {
  return (
    <section className="py-12 lg:pt-[136px] lg:pb-24 relative">
      <Container className="relative">
        <Image
          src="/images/engineeringSolutionsPage/technologies/bgMobile.svg"
          alt=""
          width={150}
          height={192}
          className="absolute top-[-80px] left-[-22px] -z-10 pointer-events-none md:hidden"
          aria-hidden
        />
        <Image
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
              <span className="block">CO₂ Capture</span>
              <span className="block pl-[114px]">& upgrading</span>
            </SectionTitle>
            <p className="lg:max-w-[460px]">
              Advanced technologies for efficient and sustainable CO₂ recovery
              from any source.
            </p>
          </li>

          {technologies.map((item, idx) => (
            <li
              key={item.href}
              className={`md:w-[calc(50%-10px)] md:h-auto ${
                idx === 0
                  ? "md:order-2"
                  : idx === 1
                    ? "md:order-4"
                    : "md:order-3"
              }`}
            >
              <Link
                href={item.href}
                className={`group flex gap-3 md:items-center md:h-full p-4 lg:p-3 justify-between transition-opacity xl:hover:opacity-95 focus-visible:opacity-95 outline-none rounded-[20px] overflow-hidden ${
                  item.dark
                    ? "bg-black text-white"
                    : "bg-white text-black border border-black"
                }`}
              >
                <div>
                  <h3 className="lg:max-w-[219px] text-[20px] lg:text-[24px] font-semibold leading-[120%] uppercase mb-4 lg:mb-6">
                    {item.title}
                  </h3>
                  <SecondaryButton
                    variant={item.dark ? "white" : "black"}
                    className="h-10 lg:h-10"
                  >
                    Read more
                  </SecondaryButton>
                </div>
                <div className="relative rounded-[12px] shrink-0 lg:h-full w-[117px] lg:w-[187px] xl:w-[280px] md:min-h-[117px] lg:min-h-[228px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover xl:group-hover:scale-105 transition-transform duration-1500 ease-in-out will-change-transform"
                    sizes="(max-width: 1023px) 100vw, 38vw"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
