import Image from "next/image";

const cards = [
  {
    image: "/images/industriesWeServePage/recycling/imageOne.webp",
    title: "TYPICAL APPLICATIONS:",
    description:
      "CO2Lab technologies support environmental initiatives by turning emissions into usable resources.",
    hasDescription: true,
    alt: "Applications of CO₂ technologies in environmental projects",
  },
  {
    image: "/images/industriesWeServePage/recycling/imageTwo.webp",
    title: "CO₂ UTILIZATION IN RECYCLING PROCESSES",
    hasDescription: false,
    alt: "Use of CO₂ in recycling and waste processing",
  },
  {
    image: "/images/industriesWeServePage/recycling/imageThree.webp",
    title: "ENVIRONMENTAL TREATMENT SYSTEMS",
    hasDescription: false,
    alt: "Systems for treating and cleaning industrial emissions",
  },
  {
    image: "/images/industriesWeServePage/recycling/imageFour.webp",
    title: "NEUTRALIZATION AND RECOVERY SOLUTIONS",
    hasDescription: false,
    alt: "Neutralization and recovery of CO₂ for reuse",
  },
];

export default function RecyclingList() {
  return (
    <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap mt-8 lg:mt-11">
      {cards.map((card, idx) => (
        <li
          key={card.title}
          className=" sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)]"
        >
          <div className="flex items-end relative min-h-[160px] lg:min-h-[224px] xl:min-h-[274px] rounded-[12px] border border-white overflow-hidden">
            <Image quality={90}
              src={card.image}
              alt={card.alt ?? card.title}
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
