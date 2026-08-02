import JsonLd from "./JsonLd";
import type { FaqEntry } from "@/lib/sanity/adapters";

/** FAQPage — може дати розширений сніпет із розкривними питаннями. */
export default function FaqJsonLd({ items }: { items: FaqEntry[] }) {
  if (items.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}
