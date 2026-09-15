import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { fetchProductCategories } from "@/lib/sanity/fetchers";
import { mapCategory } from "@/lib/sanity/adapters";
import { cn } from "@/utils/cn";

export type HubLinkItem = {
  /** Логічний шлях без префікса локалі. */
  path: string;
  title: string;
  description?: string;
};

/**
 * Блок посилань на хаби: категорії каталогу й посадкові сторінки рішень.
 *
 * Статичні сторінки («Постачання», «Рішення», «Про нас») раніше не мали
 * жодного посилання на каталог — навігаційна вага не доходила до сторінок,
 * які продають. Категорії підтягуються з CMS за `_id`, тож назва й slug
 * завжди збігаються з тим, що редактор виставив у Studio.
 */
export default async function HubLinks({
  locale,
  title,
  text,
  categoryIds = [],
  items = [],
  columns = 3,
  className,
}: {
  locale: Locale;
  title: string;
  text?: string;
  /** `_id` категорій у бажаному порядку; порожній масив — усі видимі категорії. */
  categoryIds?: string[] | "all";
  /** Додаткові пункти (посадкові сторінки) — ідуть після категорій. */
  items?: HubLinkItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const docs = categoryIds.length || categoryIds === "all" ? await fetchProductCategories() : [];
  const byId = new Map(docs.map((doc) => [doc._id, doc]));
  const ordered =
    categoryIds === "all" ? docs : categoryIds.map((id) => byId.get(id)).filter(Boolean);

  const categoryItems: HubLinkItem[] = ordered
    .map((doc) => mapCategory(doc!, locale))
    .filter((category) => category.slug)
    .map((category) => ({
      path: `/catalog/category/${category.slug}`,
      title: category.title,
      description: category.shortDescription,
    }));

  const all = [...categoryItems, ...items];
  if (all.length === 0) return null;

  return (
    <section className={cn("py-12 lg:py-20", className)}>
      <div className="mb-6 flex max-w-[820px] flex-col gap-3 lg:mb-10">
        <h2 className="text-[22px] font-medium uppercase leading-[120%] lg:text-[36px]">
          {title}
        </h2>
        {text && (
          <p className="text-[12px] font-light leading-[150%] text-black/70 lg:text-[16px]">
            {text}
          </p>
        )}
      </div>
      <ul
        className={cn(
          "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4",
          columns === 3 && "lg:grid-cols-3",
          columns === 4 && "lg:grid-cols-4",
        )}
      >
        {all.map((item) => (
          <li key={item.path} className="h-full">
            <Link
              href={localizePath(locale, item.path)}
              className="group flex h-full flex-col justify-between gap-4 rounded-[18px] border border-black/10 bg-white p-5 transition-colors duration-300 xl:hover:border-black/40 lg:p-6"
            >
              <span className="flex flex-col gap-2">
                <span className="text-[15px] font-medium leading-[125%] lg:text-[18px]">
                  {item.title}
                </span>
                {item.description && (
                  <span className="line-clamp-3 text-[12px] font-light leading-[145%] text-black/60 lg:text-[14px]">
                    {item.description}
                  </span>
                )}
              </span>
              <span
                aria-hidden
                className="text-[20px] leading-none transition-transform duration-300 xl:group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
