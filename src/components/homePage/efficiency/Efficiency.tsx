import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import * as motion from "motion/react-client";

const slideInTransition = {
  duration: 1.5,
  ease: [0.33, 0, 0.2, 1] as const, // дуже м’який ease-out
};

const viewport = { once: true, margin: "-60px 0px" };

const slideFromLeft = { opacity: 0, x: -36 };
const slideFromRight = { opacity: 0, x: 36 };
const slideEnd = { opacity: 1, x: 0 };

export default function Efficiency() {
  return (
    <section className="overflow-x-hidden py-12 lg:pt-[103px] lg:pb-[108px] overflow-hidden">
      <div className="flex flex-col items-center gap-4 lg:gap-6">
        <div className="flex w-full justify-center items-center">
          <div className="flex min-w-[120vw] flex-nowrap items-center justify-center gap-4 lg:gap-[41px] mr-22 lg:mr-80">
            <motion.div
              initial={slideFromLeft}
              whileInView={slideEnd}
              viewport={viewport}
              transition={{ ...slideInTransition, delay: 0 }}
              className="shrink-0"
            >
              <Image quality={100}
                src="/images/homePage/efficiency/leftTop.webp"
                alt="Low Emissions"
                width={553}
                height={134}
                className="opacity-0 sm:opacity-100 w-auto h-[104px] lg:h-[134px] lg:-mb-3"
              />
            </motion.div>
            <div className="w-60 lg:w-[411px] shrink-0 lg:mr-[41px]">
              <p className="mb-3 lg:mb-2">Built for today and tomorrow.</p>
              <SectionTitle>Low Emissions</SectionTitle>
            </div>
            <motion.div
              initial={slideFromRight}
              whileInView={slideEnd}
              viewport={viewport}
              transition={{ ...slideInTransition, delay: 0.2 }}
              className="shrink-0"
            >
              <Image quality={100}
                src="/images/homePage/efficiency/rightTop.webp"
                alt="Low Emissions"
                width={580}
                height={94}
                className="w-auto h-[73px] lg:h-[94px] lg:mb-2.5"
              />
            </motion.div>
          </div>
        </div>
        <div className="flex w-full justify-center items-center lg:items-end">
          <div className="flex min-w-[120vw] flex-nowrap items-center justify-center gap-4 lg:gap-[45px] ml-16 lg:ml-60">
            <motion.div
              initial={slideFromLeft}
              whileInView={slideEnd}
              viewport={viewport}
              transition={{ ...slideInTransition, delay: 0.4 }}
              className="shrink-0"
            >
              <Image quality={100}
                src="/images/homePage/efficiency/leftBottom.webp"
                alt="Low Emissions"
                width={614}
                height={142}
                className="w-auto h-[114px] lg:h-[142px]"
              />
            </motion.div>
            <div className="w-[260px] lg:w-[446px] shrink-0 lg:mr-3 lg:-mt-12">
              <SectionTitle className="mb-3 lg:mb-3.5">
                High Efficiency
              </SectionTitle>
              <p>
                Lower emissions, higher efficiency, reduced costs — sustainable
                technology that delivers now and in the future.
              </p>
            </div>
            <motion.div
              initial={slideFromRight}
              whileInView={slideEnd}
              viewport={viewport}
              transition={{ ...slideInTransition, delay: 0.6 }}
              className="shrink-0"
            >
              <Image quality={100}
                src="/images/homePage/efficiency/rightBottom.webp"
                alt="Low Emissions"
                width={569}
                height={160}
                className="opacity-0 sm:opacity-100 w-auto h-[128px] lg:h-[160px]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
