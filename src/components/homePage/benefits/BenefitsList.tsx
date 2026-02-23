import Image from "next/image";
import * as motion from "motion/react-client";

const slideInTransition = {
  duration: 1.5,
  ease: "easeInOut" as const,
};

const viewport = { once: true, margin: "-60px 0px" };

const slideEnd = { opacity: 1, x: 0, scale: 1 };

// Відстань руху: перша картка найбільша, кожна наступна трохи менша
const slideDistances = [80, 60, 40, 20];

// Початковий scale: 0.9 → 0.85 → 0.8 для трьох світлих карток
const initialScales = [0.9, 0.85, 0.8];

// Мобілка: перша 142×142, друга 212×331, третя 99×106. lg — розміри з SVG.
const benefitCards = [
  {
    id: "sustainable-tech",
    title: "Sustainable tech adoption",
    image: "/images/homePage/benefits/imageTwo.svg",
    imageWidth: 291,
    imageHeight: 291,
    imageFirst: true,
    imageMobClass: "lg:-mt-14 w-[142px] h-[142px]",
    imageLgClass: "lg:w-[291px] lg:h-[291px]",
  },
  {
    id: "certified-quality",
    title: "Certified quality",
    image: "/images/homePage/benefits/imageThree.svg",
    imageWidth: 194,
    imageHeight: 194,
    imageFirst: false,
    imageMobClass: "mt-7.5 w-[116px] h-auto",
    imageLgClass: "lg:w-[194px] lg:h-[194px]",
  },
  {
    id: "co2-monetization",
    title: "CO₂ monetization",
    image: "/images/homePage/benefits/ImageFour.svg",
    imageWidth: 159,
    imageHeight: 171,
    imageFirst: true,
    imageMobClass: "mb-7.5 w-[99px] h-[106px]",
    imageLgClass: "lg:w-[150px] xl:w-[159px] lg:h-auto",
  },
] as const;

export default function BenefitsList() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-8 md:gap-5 xs:mx-auto xs:max-w-[408px] md:mx-0 md:max-w-full">
      {/* Primary dark card — тільки текст */}
      <motion.div
        initial={{ opacity: 0, x: slideDistances[0], scale: 0.95 }}
        whileInView={slideEnd}
        viewport={viewport}
        transition={{ ...slideInTransition, delay: 0 }}
        className="relative flex min-h-[304px] flex-[0_0_calc(50%-8px)] flex-col justify-center overflow-hidden rounded-full bg-black p-3.5 text-white lg:min-h-[490px] lg:p-5 md:flex-[0_0_calc(25%-15px)]"
      >
        <Image
          src="/images/homePage/benefits/imageOneTop.svg"
          alt=""
          width={260}
          height={116}
          className="pointer-events-none absolute left-0 top-0 opacity-40"
          aria-hidden
        />
        <Image
          src="/images/homePage/benefits/imageOneBottom.svg"
          alt=""
          width={289}
          height={120}
          className="pointer-events-none absolute bottom-0 left-0 opacity-40"
          aria-hidden
        />
        <h2 className="relative mb-3 text-[16px] font-medium uppercase leading-[120%] lg:max-w-[204px] lg:mb-4.5 lg:text-[36px]">
          How it helps your business
        </h2>
        <p className="relative max-w-[210px] text-[10px] font-light leading-[120%] lg:text-[16px]">
          Optimize production and reduce costs with smart CO₂ solutions tailored
          to your needs.
        </p>
      </motion.div>

      {/* Картки з чергуванням: картинка → текст або текст → картинка */}
      {benefitCards.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{
            opacity: 0,
            x: slideDistances[index + 1],
            scale: initialScales[index],
          }}
          whileInView={slideEnd}
          viewport={viewport}
          transition={{ ...slideInTransition, delay: 0.2 * (index + 1) }}
          className="flex min-h-[304px] flex-[0_0_calc(50%-8px)] flex-col items-center justify-center rounded-full border-3 border-black bg-white text-center text-black md:flex-[0_0_calc(25%-15px)] lg:min-h-[490px]"
        >
          {item.imageFirst ? (
            <>
              <Image
                src={item.image}
                alt={item.title}
                width={item.imageWidth}
                height={item.imageHeight}
                className={`shrink-0 object-contain ${item.imageMobClass} ${item.imageLgClass}`}
              />
              <p className="max-w-[130px] text-[16px] font-medium uppercase leading-[130%] lg:max-w-[246px] lg:text-[20px] xl:text-[24px] text-center">
                {item.title}
              </p>
            </>
          ) : (
            <>
              <p className="max-w-[130px] text-[16px] font-medium uppercase leading-[130%] lg:max-w-[246px] lg:text-[20px] xl:text-[24px] text-center">
                {item.title}
              </p>
              <Image
                src={item.image}
                alt={item.title}
                width={item.imageWidth}
                height={item.imageHeight}
                className={`shrink-0 object-contain ${item.imageMobClass} ${item.imageLgClass}`}
              />
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
}
