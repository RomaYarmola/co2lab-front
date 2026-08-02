import SectionTitle from "@/components/shared/titles/SectionTitle";
import type { FaqEntry } from "@/lib/sanity/adapters";
import { cn } from "@/utils/cn";

/**
 * <details>/<summary> замість JS-акордеона: відповіді присутні в HTML
 * і доступні краулеру навіть у згорнутому стані.
 */
export default function FaqSection({
  items,
  title,
  className,
}: {
  items: FaqEntry[];
  title: string;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className={cn("w-full", className)}>
      <SectionTitle className="mb-6 lg:mb-8">{title}</SectionTitle>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <details
            key={index}
            className="group rounded-[18px] border border-black/10 px-5 py-4 transition-colors duration-300 open:border-black/25 lg:px-6 lg:py-5"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] lg:text-[18px] font-medium leading-[130%] [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                className="relative flex size-6 shrink-0 items-center justify-center"
                aria-hidden
              >
                <span className="absolute h-px w-3.5 bg-black" />
                <span className="absolute h-3.5 w-px bg-black transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
              </span>
            </summary>
            <p className="mt-3 whitespace-pre-line text-[12px] lg:text-[16px] font-light leading-[160%] text-black/70">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
