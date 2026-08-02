import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

/** Оформлення карток; тексти — у словнику `pages.about.approach.items`. */
const themes: Array<"dark" | "light"> = ["dark", "light", "light", "dark"];

export default function ApproachList({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "pages.about.approach");
  const items = t.list<{ title: string; description: string }>("items");

  return (
    <ul className="flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-x-5 md:gap-y-6">
      {items.map((item, index) => {
        const isDark = themes[index] === "dark";
        return (
          <li key={item.title} className="md:w-[calc(50%-10px)] md:h-auto">
            <article
              className={`rounded-[20px] px-8 py-6 h-full ${
                isDark
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black"
              }`}
            >
              <h3 className="mb-4 lg:mb-6 text-[20px] lg:text-[24px] font-semibold leading-[120%] uppercase">
                {item.title}
              </h3>
              <p
                className={`text-[12px] lg:text-[14px] font-light leading-[120%] ${
                  isDark ? "text-white/80" : "text-neutral-500"
                }`}
              >
                {item.description}
              </p>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
