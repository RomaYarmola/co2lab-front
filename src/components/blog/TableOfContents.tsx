import { cn } from "@/utils/cn";

export type Heading = { id: string; text: string; level: 2 | 3 };

/**
 * Зміст статті. Це справжні якірні посилання в HTML —
 * Google використовує їх для jump-links у сніпеті.
 */
export default function TableOfContents({
  headings,
  title,
  className,
}: {
  headings: Heading[];
  title: string;
  className?: string;
}) {
  if (headings.length < 3) return null;

  return (
    <nav
      aria-label={title}
      className={cn("rounded-[18px] border border-black/10 p-5 lg:p-6", className)}
    >
      <p className="mb-4 text-[12px] font-medium uppercase leading-[120%] tracking-[0.08em] text-black/50">
        {title}
      </p>
      <ol className="flex flex-col gap-2.5">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : undefined}>
            <a
              href={`#${heading.id}`}
              className="text-[12px] lg:text-[14px] font-light leading-[140%] text-black/70 transition-colors duration-300 xl:hover:text-black"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
