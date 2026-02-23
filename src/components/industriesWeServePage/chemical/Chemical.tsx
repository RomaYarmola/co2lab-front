import Container from "@/components/shared/container/Container";
import ImageCarousel from "@/components/shared/carousel/ImageCarousel";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import Badges from "./Badges";
import imageOne from "../../../../public/images/industriesWeServePage/chemical/imageOne.webp";
import imageTwo from "../../../../public/images/industriesWeServePage/chemical/imageTwo.webp";
import imageThree from "../../../../public/images/industriesWeServePage/chemical/imageThree.webp";
import * as motion from "motion/react-client";

const slideInTransition = {
  duration: 1.5,
  ease: [0.33, 0, 0.2, 1] as const, // дуже м’який ease-out
};

const viewport = { once: true, margin: "-60px 0px" };

const slideFromLeft = { opacity: 0, x: -36 };
const slideFromRight = { opacity: 0, x: 36 };
const slideEnd = { opacity: 1, x: 0 };

const applicationsImages = [
  { src: imageOne, alt: "High-purity CO₂ for chemical processes" },
  { src: imageTwo, alt: "Pharmaceutical-grade CO₂ applications" },
  { src: imageThree, alt: "Industrial chemical CO₂ process control" },
];

export default function Chemical() {
  return (
    <section className="py-12 lg:pt-30 lg:pb-0">
      <Container className="relative flex flex-col gap-8 lg:gap-12">
        <Image
          src="/images/engineeringSolutionsPage/logistics/bgMob.svg"
          alt="bg mobile"
          width={158}
          height={188}
          className="absolute top-34 -right-16 -z-10 object-cover object-right pointer-events-none lg:hidden"
          aria-hidden
        />
        <Image
          src="/images/engineeringSolutionsPage/logistics/bgDesk.svg"
          alt="bg desktop"
          width={279}
          height={333}
          className="absolute top-55 left-[428px] -z-10 object-cover object-right pointer-events-none hidden lg:block"
          aria-hidden
        />
        <div className="flex w-full justify-center items-center">
          <div className="flex min-w-[120vw] flex-nowrap items-center justify-center gap-4 lg:gap-8">
            <motion.div
              initial={slideFromLeft}
              whileInView={slideEnd}
              viewport={viewport}
              transition={{ ...slideInTransition, delay: 0 }}
              className="shrink-0"
            >
              <Image
                src="/images/industriesWeServePage/chemical/chemicalLeft.png"
                alt="Low Emissions"
                width={860}
                height={176}
                className="w-auto h-[112px] lg:h-[176px]"
              />
            </motion.div>
            <div className="w-[181px] lg:w-[355px] shrink-0">
              <SectionTitle className="mb-2 lg:mb-3.5">
                Chemical & Pharma
              </SectionTitle>
              <p className="text-[10px] lg:text-[18px] font-light leading-[120%]">
                High-purity CO₂ for controlled industrial and pharmaceutical
                processes.
              </p>
            </div>
            <motion.div
              initial={slideFromRight}
              whileInView={slideEnd}
              viewport={viewport}
              transition={{ ...slideInTransition, delay: 0.2 }}
              className="shrink-0 mr-9 sm:mr-40 lg:mr-130"
            >
              <Image
                src="/images/industriesWeServePage/chemical/chemicalRight.webp"
                alt="Low Emissions"
                width={903}
                height={176}
                className="w-auto h-[112px] lg:h-[176px]"
              />
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h3 className="lg:max-w-[220px] xl:max-w-full text-[16px] lg:text-[24px] font-semibold leading-[120%] uppercase">
            Value for the industry:
          </h3>
          <Badges />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-8">
          <div className="sm:w-[calc(50%-16px)] xl:w-[46%]">
            <SectionTitle className="mb-3 lg:mb-4.5">
              <span className="block">Typical</span>
              <span className="block pl-[68px] xl:pl-[126px]">
                applications:
              </span>
            </SectionTitle>
            <p className="lg:max-w-[513px]">
              Chemical and pharmaceutical industries require precise gas quality
              and process stability.
            </p>
          </div>
          <ImageCarousel images={applicationsImages} />
        </div>
      </Container>
    </section>
  );
}
