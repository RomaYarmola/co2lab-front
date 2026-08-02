import Image from "next/image";
import * as motion from "motion/react-client";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

const slideInTransition = {
  duration: 1.5,
  ease: "easeInOut" as const,
};

const viewport = { once: true, margin: "-120px 0px" };

const slideEnd = { opacity: 1, x: 0, scale: 1 };

// Відстань руху: перша картка найбільша, кожна наступна трохи менша
const slideDistances = [80, 60, 40, 20];

// Початковий scale: 0.9 → 0.85 → 0.8 для трьох світлих карток
const initialScales = [0.9, 0.85, 0.8];

// Мобілка: перша 142×142, друга 212×331, третя 99×106. lg — розміри з SVG.
const benefitCards = [
  {
    id: "flexible-pricing-models",
    image: "/images/supplyPage/benefits/imageTwo.svg",
    imageWidth: 106,
    imageHeight: 106,
    imageFirst: true,
    imageMobClass: "mb-6 lg:mb-[62px] w-20 h-20",
    imageLgClass: "lg:w-[106px] lg:h-[106px]",
  },
  {
    id: "long-term-supply-agreements",
    image: "/images/supplyPage/benefits/imageThree.svg",
    imageWidth: 133,
    imageHeight: 127,
    imageFirst: false,
    imageMobClass: "mt-2.5 lg:mt-8 w-[97px] h-auto",
    imageLgClass: "lg:w-[133px] lg:h-[127px]",
  },
  {
    id: "guaranteed-volumes-and-supply-stability",
    image: "/images/supplyPage/benefits/imageFour.svg",
    imageWidth: 106,
    imageHeight: 106,
    imageFirst: true,
    imageMobClass: "mb-3 lg:mb-[46px] w-20 h-20",
    imageLgClass: "lg:w-[106px] lg:h-[106px]",
  },
] as const;

export default function BenefitsList({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.supply.benefits");
  const cards = t.list<{ title: string; description: string }>("cards");

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 xs:mx-auto xs:max-w-[408px] md:mx-0 md:max-w-full md:grid-cols-4 md:gap-5">
      {/* Primary dark card — тільки текст */}
      <motion.div
        initial={{ opacity: 0, x: slideDistances[0], scale: 0.95 }}
        whileInView={slideEnd}
        viewport={viewport}
        transition={{ ...slideInTransition, delay: 0 }}
        className="relative flex min-h-[340px] flex-col justify-center overflow-hidden rounded-full bg-black px-5 py-6 text-white sm:min-h-[304px] lg:min-h-[490px] lg:px-5"
      >
        <Image quality={100}
          src="/images/homePage/benefits/imageOneTop.svg"
          alt=""
          width={260}
          height={116}
          className="pointer-events-none absolute left-0 top-0 opacity-40"
          aria-hidden
        />
        <Image quality={100}
          src="/images/homePage/benefits/imageOneBottom.svg"
          alt=""
          width={289}
          height={120}
          className="pointer-events-none absolute bottom-0 left-0 opacity-40"
          aria-hidden
        />
        <h2 className="relative mb-3 text-[16px] font-medium uppercase leading-[120%] lg:max-w-[204px] lg:mb-4.5 lg:text-[36px]">
          {t("title")}
        </h2>
        <p className="relative text-[10px] font-light leading-[120%] lg:max-w-[210px] lg:text-[16px]">
          {t("text")}
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
          className="flex min-h-[340px] flex-col items-center justify-center rounded-full border-3 border-black bg-white px-5 text-center text-black sm:min-h-[304px] lg:min-h-[490px]"
        >
          {item.imageFirst ? (
            <>
              <Image quality={100}
                src={item.image}
                alt={cards[index]?.title ?? ""}
                width={item.imageWidth}
                height={item.imageHeight}
                className={`shrink-0 object-contain ${item.imageMobClass} ${item.imageLgClass}`}
              />
              <p className="mb-2 text-[14px] font-medium uppercase leading-[130%] text-center lg:mb-4 lg:max-w-[180px] lg:text-[20px] xl:max-w-[227px] xl:text-[24px]">
                {cards[index]?.title}
              </p>
              <p className="text-[10px] font-light leading-[120%] lg:max-w-[180px] lg:text-[14px] xl:max-w-[227px]">
                {cards[index]?.description}
              </p>
            </>
          ) : (
            <>
              <p className="mb-2 text-[14px] font-medium uppercase leading-[130%] text-center lg:mb-4 lg:max-w-[180px] lg:text-[20px] xl:max-w-[227px] xl:text-[24px]">
                {cards[index]?.title}
              </p>
              <p className="text-[10px] font-light leading-[120%] lg:max-w-[180px] lg:text-[14px] xl:max-w-[227px]">
                {cards[index]?.description}
              </p>
              <Image quality={100}
                src={item.image}
                alt={cards[index]?.title ?? ""}
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
