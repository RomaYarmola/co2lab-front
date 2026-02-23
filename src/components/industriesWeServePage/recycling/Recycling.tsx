import Container from "@/components/shared/container/Container";
import RecyclingList from "./RecyclingList";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import * as motion from "motion/react-client";

const slideInTransition = {
  duration: 1.5,
  ease: [0.33, 0, 0.2, 1] as const,
};

const viewport = { once: true, margin: "-60px 0px" };

const slideFromLeft = { opacity: 0, x: -36 };
const slideFromRight = { opacity: 0, x: 36 };
const slideEnd = { opacity: 1, x: 0 };

export default function Recycling() {
  return (
    <section className="py-12 lg:pt-30 lg:pb-0">
      <div className="flex flex-col gap-1">
        {/* Ряд 1: текст завжди видимий, права картинка повна у видимій частині, уходить за екран, скруглення видно */}
        <Container className="relative flex w-full justify-start items-center overflow-x-visible">
          <Image
            src="/images/industriesWeServePage/recycling/bgTopMob.svg"
            alt=""
            aria-hidden
            className="absolute top-[-92px] -left-4 pointer-events-none lg:hidden"
            width="161"
            height="147"
          />
          <Image
            src="/images/industriesWeServePage/recycling/bgTopDesk.svg"
            alt=""
            aria-hidden
            className="absolute -z-10 top-[-157px] -left-2 pointer-events-none hidden lg:block"
            width="287"
            height="261"
          />
          <div className="flex min-w-max flex-nowrap items-center gap-4 lg:gap-[43px]">
            <div className="shrink-0">
              <SectionTitle>Environmental</SectionTitle>
            </div>
            <motion.div
              initial={slideFromRight}
              whileInView={slideEnd}
              viewport={viewport}
              transition={{ ...slideInTransition, delay: 0 }}
              className="shrink-0 min-w-[min(80vw,800px)] overflow-hidden rounded-l-[12px]"
            >
              <Image
                src="/images/industriesWeServePage/recycling/bgRight.webp"
                alt=""
                aria-hidden
                width={871}
                height={66}
                className="h-[36px] lg:h-[66px] w-auto object-left"
              />
            </motion.div>
          </div>
        </Container>
        {/* Ряд 2: ліва картинка повна у видимій частині, уходить за екран, текст завжди видимий, скруглення видно */}
        <Container className="flex flex-col w-full justify-center items-end overflow-x-visible">
          <div className="flex min-w-max flex-nowrap items-end gap-4 lg:gap-[9px]">
            <motion.div
              initial={slideFromLeft}
              whileInView={slideEnd}
              viewport={viewport}
              transition={{ ...slideInTransition, delay: 0.2 }}
              className="shrink-0 overflow-hidden"
            >
              <Image
                src="/images/industriesWeServePage/recycling/bgLeft.webp"
                alt=""
                aria-hidden
                width={890}
                height={66}
                className="h-[36px] lg:h-[66px] w-auto object-right"
              />
            </motion.div>
            <div className="shrink-0 lg:flex lg:justify-between lg:items-center lg:gap-20 xl:gap-[186px]">
              <SectionTitle>& Recycling</SectionTitle>
              <p className="hidden lg:block lg:max-w-[290px] text-[14px] font-light leading-[120%]">
                CO₂ utilization and recycling solutions for environmental
                applications.
              </p>
            </div>
          </div>
        </Container>
        <Container className="w-full">
          <p className="lg:hidden mt-3 text-[14px] font-light leading-[120%] text-left">
            CO₂ utilization and recycling solutions for environmental
            applications.
          </p>
        </Container>
      </div>
      <Container className="mt-8 lg:mt-10">
        <RecyclingList />
      </Container>
    </section>
  );
}
