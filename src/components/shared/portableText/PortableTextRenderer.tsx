import Image from "next/image";
import Link from "next/link";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import { urlForImage } from "@/lib/sanity/image";
import { pickLocalized } from "@/lib/sanity/localized";
import type { Locale } from "@/i18n/config";
import { slugifyHeading } from "@/utils/slugifyHeading";

/**
 * Рендер Portable Text у дизайні CO₂Lab.
 * Заголовки отримують id — це дає якірні посилання й живить зміст статті.
 */
export function createPortableComponents(
  locale: Locale,
): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => (
        <p className="mb-5 text-[14px] lg:text-[18px] font-light leading-[160%] text-black/80">
          {children}
        </p>
      ),
      h2: ({ children, value }) => (
        <h2
          id={slugifyHeading(value)}
          className="mb-4 mt-10 scroll-mt-28 text-[22px] lg:text-[32px] font-medium uppercase leading-[120%]"
        >
          {children}
        </h2>
      ),
      h3: ({ children, value }) => (
        <h3
          id={slugifyHeading(value)}
          className="mb-3 mt-8 scroll-mt-28 text-[18px] lg:text-[24px] font-medium uppercase leading-[120%]"
        >
          {children}
        </h3>
      ),
      h4: ({ children, value }) => (
        <h4
          id={slugifyHeading(value)}
          className="mb-3 mt-6 scroll-mt-28 text-[16px] lg:text-[20px] font-medium leading-[120%]"
        >
          {children}
        </h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-6 border-l-2 border-black pl-5 text-[14px] lg:text-[18px] font-light italic leading-[160%] text-black/70">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mb-6 flex list-disc flex-col gap-2 pl-5 text-[14px] lg:text-[18px] font-light leading-[160%] text-black/80 [&>li]:list-disc">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="mb-6 flex list-decimal flex-col gap-2 pl-5 text-[14px] lg:text-[18px] font-light leading-[160%] text-black/80">
          {children}
        </ol>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-medium text-black">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => (
        <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.9em]">
          {children}
        </code>
      ),
      link: ({ children, value }) => {
        const href = (value as { href?: string })?.href ?? "#";
        const blank = (value as { blank?: boolean })?.blank;
        const rel = (value as { rel?: string })?.rel;
        const relParts = [
          blank ? "noopener noreferrer" : null,
          rel || null,
        ].filter(Boolean);

        const isInternal = href.startsWith("/");
        if (isInternal && !blank) {
          return (
            <Link href={href} className="underline underline-offset-4 transition-opacity xl:hover:opacity-70">
              {children}
            </Link>
          );
        }
        return (
          <a
            href={href}
            target={blank ? "_blank" : undefined}
            rel={relParts.length ? relParts.join(" ") : undefined}
            className="underline underline-offset-4 transition-opacity xl:hover:opacity-70"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      imageWithAlt: ({ value }) => {
        const url = urlForImage(value as never, { width: 1400 });
        if (!url) return null;
        const alt = pickLocalized(
          (value as { alt?: never })?.alt,
          locale,
        );
        const caption = pickLocalized(
          (value as { caption?: never })?.caption,
          locale,
        );
        return (
          <figure className="my-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-black/5">
              <Image
                src={url}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 760px, 100vw"
                className="object-cover"
              />
            </div>
            {caption && (
              <figcaption className="mt-3 text-[12px] font-light leading-[140%] text-black/50">
                {caption}
              </figcaption>
            )}
          </figure>
        );
      },
      ctaBlock: ({ value }) => {
        const v = value as {
          title?: never;
          text?: never;
          buttonLabel?: never;
          buttonHref?: string;
        };
        const title = pickLocalized(v.title, locale);
        const text = pickLocalized(v.text, locale);
        const label = pickLocalized(v.buttonLabel, locale);
        return (
          <aside className="my-8 rounded-[18px] bg-black px-5 py-6 text-white lg:px-8 lg:py-8">
            {title && (
              <p className="mb-2 text-[18px] lg:text-[24px] font-medium uppercase leading-[120%]">
                {title}
              </p>
            )}
            {text && (
              <p className="mb-5 text-[12px] lg:text-[16px] font-light leading-[150%] text-white/80">
                {text}
              </p>
            )}
            {label && v.buttonHref && (
              <Link
                href={v.buttonHref}
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-[12px] lg:text-[14px] font-medium leading-[120%] text-black transition duration-300 xl:hover:brightness-90"
              >
                {label}
              </Link>
            )}
          </aside>
        );
      },
      tableBlock: ({ value }) => {
        const v = value as {
          caption?: never;
          rows?: Array<{ cells?: string[] }>;
        };
        const rows = Array.isArray(v.rows) ? v.rows : [];
        if (rows.length === 0) return null;
        const [head, ...body] = rows;
        const caption = pickLocalized(v.caption, locale);

        return (
          <figure className="my-8">
            <div className="overflow-x-auto rounded-[18px] border border-black/10">
              <table className="w-full min-w-[520px] border-collapse text-left">
                <thead>
                  <tr className="bg-black text-white">
                    {(head?.cells ?? []).map((cell, i) => (
                      <th
                        key={i}
                        className="px-4 py-3 text-[12px] lg:text-[14px] font-medium uppercase leading-[120%]"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {body.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-t border-black/10 even:bg-black/[0.02]"
                    >
                      {(row.cells ?? []).map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-4 py-3 text-[12px] lg:text-[14px] font-light leading-[140%] text-black/80"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {caption && (
              <figcaption className="mt-3 text-[12px] font-light leading-[140%] text-black/50">
                {caption}
              </figcaption>
            )}
          </figure>
        );
      },
    },
  };
}

export default function PortableTextRenderer({
  blocks,
  locale,
}: {
  blocks: unknown[];
  locale: Locale;
}) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;
  return (
    <PortableText
      value={blocks as PortableTextBlock[]}
      components={createPortableComponents(locale)}
    />
  );
}
