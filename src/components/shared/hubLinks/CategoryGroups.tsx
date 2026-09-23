import Image from "next/image";
import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { EQUIPMENT_GROUPS } from "@/constants/catalog";
import { ROUTES } from "@/constants/routes";
import { fetchProductCategories } from "@/lib/sanity/fetchers";
import { mapCategory, type CategoryView } from "@/lib/sanity/adapters";
import { cn } from "@/utils/cn";

/** Скільки колонок під групу: два пункти не мають розтягуватись на чотири. */
const COLUMNS: Record<number, string> = {
  1: "lg:grid-cols-2",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/**
 * Каталог на головній: усі категорії, але зведені за типом обладнання
 * й з фотографією на картці.
 *
 * Плаский список з одинадцяти текстових карток читався як таблиця —
 * «кріогенні ємності для…» пʼять разів поспіль, і нічим не відрізнити
 * ємність від кріоциліндра. Тип несе заголовок групи, картка — газ і фото.
 *
 * Посилання ведуть на всі категорії, як і раніше: головна лишається
 * джерелом ваги для хабів каталогу.
 */
export default async function CategoryGroups({
  locale,
  title,
  text,
  className,
}: {
  locale: Locale;
  title: string;
  text?: string;
  className?: string;
}) {
  const docs = await fetchProductCategories();
  const byId = new Map(
    docs.map((doc) => [doc._id, mapCategory(doc, locale)] as const),
  );
  const used = new Set<string>();

  const groups = EQUIPMENT_GROUPS.map((group) => {
    const categories = group.categoryIds
      .map((id) => {
        used.add(id);
        return byId.get(id);
      })
      .filter((category): category is CategoryView => Boolean(category?.slug));
    return { id: group.id, title: group.title[locale], categories };
  }).filter((group) => group.categories.length > 0);

  // Категорія, якої немає в конфігу, не має зникати з головної
  const rest = [...byId.entries()]
    .filter(([id, category]) => !used.has(id) && category.slug)
    .map(([, category]) => category);
  if (rest.length > 0) {
    groups.push({ id: "rest", title: "", categories: rest });
  }

  if (groups.length === 0) return null;

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

      <div className="flex flex-col gap-8 lg:gap-12">
        {groups.map((group) => (
          <div key={group.id}>
            {group.title && (
              <h3 className="mb-3 flex items-center gap-4 text-[14px] font-medium uppercase leading-[120%] tracking-[0.04em] text-black/60 lg:mb-5 lg:text-[16px]">
                {group.title}
                <span className="h-px flex-1 bg-black/10" aria-hidden />
              </h3>
            )}
            <ul
              className={cn(
                "grid grid-cols-1 gap-3 xs:grid-cols-2 lg:gap-4",
                COLUMNS[Math.min(group.categories.length, 4)],
              )}
            >
              {group.categories.map((category) => (
                <li key={category.id} className="h-full">
                  <Link
                    href={localizePath(
                      locale,
                      `${ROUTES.catalog}/category/${category.slug}`,
                    )}
                    className="group relative flex h-full min-h-[190px] flex-col justify-end overflow-hidden rounded-[18px] bg-black p-4 text-white lg:min-h-[240px] lg:p-5"
                  >
                    {category.imageUrl && (
                      <Image
                        src={category.imageUrl}
                        alt={category.imageAlt}
                        fill
                        sizes="(min-width: 1280px) 320px, (min-width: 640px) 45vw, 90vw"
                        className="object-cover object-center transition-transform duration-700 ease-out xl:group-hover:scale-[1.04]"
                      />
                    )}
                    {/* Знімки світлі — без підкладки білий заголовок на них не читається */}
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_30%,rgba(0,0,0,0.82)_100%)]"
                    />
                    <span className="relative flex items-end justify-between gap-3">
                      <span className="line-clamp-4 text-[14px] font-medium leading-[125%] lg:text-[16px]">
                        {category.title}
                      </span>
                      <span
                        aria-hidden
                        className="shrink-0 text-[18px] leading-none transition-transform duration-300 xl:group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
