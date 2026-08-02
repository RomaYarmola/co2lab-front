import Image from "next/image";
import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { ROUTES } from "@/constants/routes";
import type { PostCardView } from "@/lib/sanity/adapters";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/utils/cn";

export default function PostCard({
  post,
  locale,
  featured = false,
}: {
  post: PostCardView;
  locale: Locale;
  featured?: boolean;
}) {
  const t = getTranslator(locale, "blog");
  const href = localizePath(locale, `${ROUTES.blog}/${post.slug}`);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-black/10 bg-white transition-shadow duration-300 xl:hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]",
        featured && "lg:flex-row",
      )}
    >
      {post.coverUrl && (
        <div
          className={cn(
            "relative w-full shrink-0 overflow-hidden bg-black/5",
            featured ? "h-[220px] lg:h-auto lg:w-[46%]" : "h-[200px] lg:h-[220px]",
          )}
        >
          <Image
            src={post.coverUrl}
            alt={post.coverAlt}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 46vw, 100vw"
                : "(min-width: 1280px) 380px, (min-width: 640px) 45vw, 90vw"
            }
            className="object-cover object-center transition-transform duration-700 ease-out xl:group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className={cn("flex flex-1 flex-col p-4 lg:p-5", featured && "lg:p-8")}>
        {post.categories.length > 0 && (
          <p className="mb-2 flex flex-wrap gap-x-3 text-[10px] lg:text-[12px] font-light uppercase leading-[120%] tracking-[0.06em] text-black/50">
            {post.categories.map((category) => (
              <span key={category.slug}>{category.title}</span>
            ))}
          </p>
        )}

        <h3
          className={cn(
            "mb-2 font-medium uppercase leading-[120%]",
            featured
              ? "text-[20px] lg:text-[28px]"
              : "text-[16px] lg:text-[20px]",
          )}
        >
          <Link
            href={href}
            className="transition-opacity duration-300 xl:hover:opacity-70 focus:outline-none focus-visible:underline"
          >
            <span className="absolute inset-0 z-10" aria-hidden />
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p
            className={cn(
              "mb-4 font-light leading-[150%] text-black/70",
              featured
                ? "line-clamp-4 text-[13px] lg:text-[16px]"
                : "line-clamp-3 text-[12px] lg:text-[14px]",
            )}
          >
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-[10px] lg:text-[12px] font-light leading-[120%] text-black/50">
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt, locale)}
            </time>
          )}
          {post.readingTimeMinutes > 0 && (
            <span>{t("readingTime", { minutes: post.readingTimeMinutes })}</span>
          )}
        </div>
      </div>
    </article>
  );
}
