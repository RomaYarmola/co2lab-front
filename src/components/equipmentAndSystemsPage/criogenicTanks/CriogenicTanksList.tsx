import Image from "next/image";

const IMAGE_BASE = "/images/equipmentAndSystemsPage/criogenicTanks";

const items = [
  {
    title: "We offer:",
    description:
      "With CO₂Lab, you gain access to innovative cryogenic technologies that help reduce operating costs and improve business efficiency.",
    image: `${IMAGE_BASE}/imageOne.webp`,
    imageAlt: "Cryogenic technologies",
    overlay:
      "bg-[linear-gradient(180deg,rgba(22,20,20,0)_73.32%,#161414_100%)]",
    imageClass: "object-top",
  },
  {
    title: "Cryogenic tank configurations",
    description:
      "Vertical and horizontal tanks with vacuum or dual-component insulation, working pressure from 18.5 to 37 bar, ensuring minimal cold losses.",
    image: `${IMAGE_BASE}/imageTwo.webp`,
    imageAlt: "Cryogenic tank configurations",
    overlay:
      "bg-[linear-gradient(0deg,rgba(17,17,17,0.6)_38.81%,rgba(17,17,17,0)_129.37%)]",
    imageClass: "object-top lg:object-[75%_50%]",
  },
  {
    title: "Storage capacities & standards",
    description:
      "Stationary reservoirs with capacities ranging from 3,000 to 500,000 liters, compliant with European PED EC 97/23 standards and Ukrainian DSTU regulations.",
    image: `${IMAGE_BASE}/imageThree.webp`,
    imageAlt: "Storage capacities and standards",
    overlay:
      "bg-[linear-gradient(0deg,rgba(17,17,17,0.6)_38.81%,rgba(17,17,17,0)_129.37%)]",
    imageClass: "object-[75%_30%]",
  },
  {
    title: "Engineering & custom solutions",
    description:
      "Consultation and equipment calculations, as well as tailored solutions for industries including manufacturing, food processing, healthcare, and more.",
    image: `${IMAGE_BASE}/imageFour.webp`,
    imageAlt: "Engineering and custom solutions",
    overlay:
      "bg-[linear-gradient(0deg,rgba(17,17,17,0.6)_38.81%,rgba(17,17,17,0)_129.37%)]",
    imageClass: "object-center",
  },
];

export default function CriogenicTanksList() {
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
