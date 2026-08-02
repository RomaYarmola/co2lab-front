const CYRILLIC_MAP: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "h", ґ: "g", д: "d", е: "e", є: "ie", ж: "zh",
  з: "z", и: "y", і: "i", ї: "i", й: "i", к: "k", л: "l", м: "m", н: "n",
  о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
  ч: "ch", ш: "sh", щ: "shch", ь: "", ю: "iu", я: "ia", ы: "y", э: "e",
  ъ: "", ё: "e",
};

function transliterate(text: string): string {
  return text
    .split("")
    .map((char) => CYRILLIC_MAP[char] ?? char)
    .join("");
}

/** Стабільний id для заголовка — використовується для якорів і змісту статті. */
export function slugifyText(text: string): string {
  return transliterate(text.toLowerCase())
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

type BlockLike = { children?: Array<{ text?: string }>; _key?: string };

/** id для Portable Text блока-заголовка. */
export function slugifyHeading(block: unknown): string {
  const value = block as BlockLike | undefined;
  const text = Array.isArray(value?.children)
    ? value.children.map((child) => child.text ?? "").join(" ")
    : "";
  return slugifyText(text) || value?._key || "";
}

/** Витягує H2/H3 для змісту статті. */
export function extractHeadings(
  blocks: unknown[],
): Array<{ id: string; text: string; level: 2 | 3 }> {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .filter((block) => {
      const style = (block as { style?: string })?.style;
      return style === "h2" || style === "h3";
    })
    .map((block) => {
      const style = (block as { style?: string }).style;
      const children = (block as BlockLike).children ?? [];
      return {
        id: slugifyHeading(block),
        text: children.map((child) => child.text ?? "").join(" ").trim(),
        level: style === "h2" ? (2 as const) : (3 as const),
      };
    })
    .filter((heading) => heading.id && heading.text);
}
