import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

/** Зображення карток; тексти — у словнику `pages.industries.recycling.cards`. */
const cardImages = [
  "/images/industriesWeServePage/recycling/imageOne.webp",
  "/images/industriesWeServePage/recycling/imageTwo.webp",
  "/images/industriesWeServePage/recycling/imageThree.webp",
  "/images/industriesWeServePage/recycling/imageFour.webp",
];

export default function RecyclingList({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.industries.recycling");
  const cards = t
    .list<{ title: string; description: string; imageAlt: string }>("cards")
    .map((card, index) => ({
      ...card,
      image: cardImages[index],
      hasDescription: Boolean(card.description),
    }));

  return (
    <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap mt-8 lg:mt-11">
      {cards.map((card, idx) => (
        <li
          key={card.title}
          className=" sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)]"
        >
          <div className="flex items-end relative min-h-[160px] lg:min-h-[224px] xl:min-h-[274px] rounded-[12px] border border-white overflow-hidden">
            <Image quality={100}
              src={card.image}
              alt={card.imageAlt || card.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
            <div
              className={`absolute inset-0  ${idx === 0 ? "-z-10 bg-black" : "bg-[linear-gradient(0deg,_rgba(17,17,17,0.6)_38.81%,_rgba(17,17,17,0)_129.37%)]"}`}
              aria-hidden
            />
            <div className="relative z-10 flex flex-col justify-end h-full min-h-[152px] lg:min-h-[200px] px-6 py-6 lg:py-7">
              {card.hasDescription ? (
                <div>
                  <h3 className="mb-3 text-[18px] font-medium leading-[120%] uppercase text-white">
                    {card.title}
                  </h3>
                  <p className="text-[12px] lg:text-[14px] font-light leading-[120%] text-white">
                    {card.description}
                  </p>
                </div>
              ) : (
                <h3 className="text-[18px] font-medium leading-[120%] uppercase text-white">
                  {card.title}
                </h3>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
