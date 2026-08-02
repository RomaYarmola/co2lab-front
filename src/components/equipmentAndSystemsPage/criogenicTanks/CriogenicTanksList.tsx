import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

const IMAGE_BASE = "/images/equipmentAndSystemsPage/criogenicTanks";

/** Оформлення карток; тексти — у словнику `pages.equipment.cryogenic.items`. */
const cardStyles = [
  {
    image: `${IMAGE_BASE}/imageOne.webp`,
    overlay: "bg-[linear-gradient(180deg,rgba(22,20,20,0)_73.32%,#161414_100%)]",
    imageClass: "object-top",
    hasDescription: true,
  },
  {
    image: `${IMAGE_BASE}/imageTwo.webp`,
    overlay: "bg-[linear-gradient(0deg,rgba(17,17,17,0.6)_38.81%,rgba(17,17,17,0)_129.37%)]",
    imageClass: "object-top lg:object-[75%_50%]",
    hasDescription: true,
  },
  {
    image: `${IMAGE_BASE}/imageThree.webp`,
    overlay: "bg-[linear-gradient(0deg,rgba(17,17,17,0.6)_38.81%,rgba(17,17,17,0)_129.37%)]",
    imageClass: "object-[75%_30%]",
    hasDescription: true,
  },
  {
    image: `${IMAGE_BASE}/imageFour.webp`,
    overlay: "bg-[linear-gradient(0deg,rgba(17,17,17,0.6)_38.81%,rgba(17,17,17,0)_129.37%)]",
    imageClass: "object-center",
    hasDescription: true,
  },
];

export default function CriogenicTanksList({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.equipment.cryogenic");
  const items = t
    .list<{ title: string; description: string; imageAlt: string }>("items")
    .map((item, index) => ({ ...item, ...cardStyles[index] }));

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="relative sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)] h-[180px] lg:h-[274px] rounded-[12px]  border border-white overflow-hidden text-white"
        >
          <Image quality={100}
            src={item.image}
            alt={item.imageAlt}
            fill
            className={`object-cover -z-20 bg-black ${item.imageClass}`}
          />
          <div className={`absolute inset-0 -z-10 ${item.overlay}`} />
          <div className="relative flex flex-col justify-end h-full p-6 lg:p-7 flex flex-col justify-center">
            <h3 className="mb-3 text-[18px] font-medium leading-[120%] uppercase">
              {item.title}
            </h3>
            <p className="text-[12px] lg:text-[14px] font-light leading-[120%] max-w-[540px]">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
