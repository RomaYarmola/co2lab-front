import Image from "next/image";

const IMAGE_BASE = "/images/industriesWeServePage/food";

const items = [
  {
    title: "Carbonation of soft drinks and beer",
    image: `${IMAGE_BASE}/imageOne.webp`,
    imageAlt: "Carbonation of soft drinks and beer",
  },
  {
    title: "Cooling and freezing processes",
    image: `${IMAGE_BASE}/imageTwo.webp`,
    imageAlt: "Cooling and freezing processes",
  },
  {
    title: "Inerting during production and storage",
    image: `${IMAGE_BASE}/imageThree.webp`,
    imageAlt: "Inerting during production and storage",
  },
  {
    title: "Modified atmosphere packaging (MAP)",
    image: `${IMAGE_BASE}/imageFour.webp`,
    imageAlt: "Modified atmosphere packaging (MAP)",
  },
];

export default function FoodList() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:gap-5">
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="relative h-30 w-full rounded-[20px] overflow-hidden text-white lg:h-[227px] xl:h-[304px] sm:w-[calc(50%-8px)] lg:w-[calc(25%-15px)]"
        >
          <Image quality={90}
            src={item.image}
            alt={item.imageAlt}
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
