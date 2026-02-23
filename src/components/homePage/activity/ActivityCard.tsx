import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";

export type ActivityItem = {
  title: string;
  description: string;
  href: string;
  theme: "dark" | "light";
  backgroundImage?: string;
};

type ActivityCardProps = {
  item: ActivityItem;
};

export default function ActivityCard({ item }: ActivityCardProps) {
  const isDark = item.theme === "dark";

  return (
    <Link
      href={item.href}
      className={`group relative flex min-h-30 flex-col justify-between overflow-hidden rounded-[12px] px-6 py-6 transition-opacity lg:min-h-[227px] xl:min-h-[217px] lg:py-7 xl:hover:opacity-95 ${
        isDark ? "border border-white text-white" : "bg-white text-black"
      }`}
    >
      {isDark && (
        <>
          {item.backgroundImage ? (
            <>
              <Image
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

      <div className="relative z-10 flex max-w-[248px] flex-col gap-2">
        <h3 className="text-[20px] font-medium uppercase leading-[120%] lg:text-[24px]">
          {item.title}
        </h3>
        <p className="text-[12px] font-light leading-[120%] lg:text-[14px]">
          {item.description}
        </p>
      </div>

      <div className="absolute bottom-3 right-3 z-10 flex justify-end lg:bottom-5 lg:right-5">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 lg:h-[54px] lg:w-[54px] ${
            isDark
              ? "bg-white text-[var(--color-black)]"
              : "bg-[var(--color-black)] text-white"
          }`}
          aria-hidden
        >
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-in-out will-change-transform xl:group-hover:translate-x-[2px] xl:group-hover:-translate-y-[2px] sm:h-5 sm:w-5" />
        </span>
      </div>
    </Link>
  );
}
