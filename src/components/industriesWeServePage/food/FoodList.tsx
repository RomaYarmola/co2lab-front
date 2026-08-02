import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

const IMAGE_BASE = "/images/industriesWeServePage/food";

/** Зображення карток; заголовки — у словнику `pages.industries.food.items`. */
const cardImages = [
  `${IMAGE_BASE}/imageOne.webp`,
  `${IMAGE_BASE}/imageTwo.webp`,
  `${IMAGE_BASE}/imageThree.webp`,
  `${IMAGE_BASE}/imageFour.webp`,
];

export default function FoodList({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.industries.food");
  const items = t
    .list<{ title: string }>("items")
    .map((item, index) => ({ ...item, image: cardImages[index] }));

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:gap-5">
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="relative h-30 w-full rounded-[20px] overflow-hidden text-white lg:h-[227px] xl:h-[304px] sm:w-[calc(50%-8px)] lg:w-[calc(25%-15px)]"
        >
          <Image quality={100}
            src={item.image}
            alt={item.title}
            fill
            className="object-cover -z-20"
          />

          <div
            className={`absolute inset-0 flex flex-col p-6 ${idx === 0 ? "justify-end" : idx === 1 ? "justify-start" : idx === 2 ? "justify-end text-right items-end" : "justify-end"}`}
          >
            <h3 className="max-w-[237px] text-[16px] font-semibold leading-[120%] uppercase">
              {item.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
