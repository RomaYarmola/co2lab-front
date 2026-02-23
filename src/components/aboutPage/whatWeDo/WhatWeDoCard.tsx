import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";

export type WhatWeDoItem = {
  title: string;
  description: string;
  theme: "dark" | "light";
  backgroundImage?: string;
};

type WhatWeDoCardProps = {
  item: WhatWeDoItem;
};

export default function WhatWeDoCard({ item }: WhatWeDoCardProps) {
  const isDark = item.theme === "dark";

  return (
    <div
      className={`relative flex min-h-30 flex-col justify-between overflow-hidden rounded-[12px] px-6 py-6 lg:py-7 lg:min-h-[167px] xl:min-h-[217px] ${
        isDark ? "border border-white text-white" : "bg-white text-black"
      }`}
    >
      {isDark && (
        <>
          {item.backgroundImage ? (
            <>
              <Image quality={90}
                src={item.backgroundImage}
                alt=""
                fill
                className="object-cover xl:group-hover:scale-105 transition-transform duration-1500 ease-in-out will-change-transform"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </>
          ) : null}
        </>
      )}

      <div className="relative z-10 flex max-w-[180px] xs:max-w-full lg:max-w-50 flex-col gap-2">
        <h3 className="text-[20px] font-medium uppercase leading-[120%] lg:text-[24px]">
          {item.title}
        </h3>
        <p className="text-[12px] font-light leading-[120%] lg:text-[14px]">
          {item.description}
        </p>
      </div>
    </div>
  );
}
