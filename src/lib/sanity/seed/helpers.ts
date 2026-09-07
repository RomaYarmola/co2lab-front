/**
 * Хелпери для seed-контенту каталогу.
 *
 * Файл навмисно без імпортів з `@/…`: його читає і Next.js (фолбек, поки
 * Sanity не підключено), і Node-скрипт `scripts/sanity-push.mts`, який
 * заливає той самий контент у Sanity. Тому все тут — чисті дані.
 */

export type L = { en: string; uk: string; ru: string };

export type SeedImage = {
  _type: "image";
  _key?: string;
  /** Шлях у /public — скрипт пушу підвантажує файл як asset */
  asset: { _id: string; url: string };
  alt: L;
};

/** Анотація посилання всередині абзацу. */
export type SeedMarkDef = {
  _key: string;
  _type: "link";
  href: string;
  blank?: boolean;
  rel?: string;
};

export type SeedBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3";
  listItem?: "bullet" | "number";
  level?: number;
  markDefs: SeedMarkDef[];
  children: Array<{
    _type: "span";
    _key: string;
    text: string;
    marks: string[];
  }>;
};

/** Зображення всередині тіла статті (тип `imageWithAlt` у схемі Studio). */
export type SeedBodyImage = {
  _type: "imageWithAlt";
  _key: string;
  asset: { _id: string; url: string };
  alt: L;
  caption?: L;
};

export type SeedTableRow = { _key: string; _type: "row"; cells: string[] };

export type SeedTable = {
  _type: "tableBlock";
  _key: string;
  caption?: L;
  rows: SeedTableRow[];
};

export type SeedCta = {
  _type: "ctaBlock";
  _key: string;
  title: L;
  text: L;
  buttonLabel: L;
  buttonHref: string;
};

/** Будь-який блок тіла статті. */
export type SeedContent = SeedBlock | SeedBodyImage | SeedTable | SeedCta;

export type SeedFaq = { _key: string; question: L; answer: L };
export type SeedSpec = { _key: string; label: L; value: L; group?: L };

export type SeedCategory = {
  _id: string;
  _updatedAt: string;
  title: L;
  slug: {
    en: { current: string };
    uk: { current: string };
    ru: { current: string };
  };
  order: number;
  isVisible: true;
  shortDescription: L;
  description: { en: SeedContent[]; uk: SeedContent[]; ru: SeedContent[] };
  image: SeedImage;
  faq: SeedFaq[];
  seo: { metaTitle: L; metaDescription: L; keywords: L };
  productCount: number;
};

export type SeedProduct = {
  _id: string;
  _updatedAt: string;
  title: L;
  slug: {
    en: { current: string };
    uk: { current: string };
    ru: { current: string };
  };
  model?: string;
  sku: string;
  isPublished: true;
  isFeatured: boolean;
  order: number;
  publishedAt: string;
  category: SeedCategory;
  gallery: SeedImage[];
  shortDescription: L;
  description: { en: SeedContent[]; uk: SeedContent[]; ru: SeedContent[] };
  features: L[];
  applications: L[];
  specs: SeedSpec[];
  faq: SeedFaq[];
  priceOnRequest: true;
  availability: "madeToOrder" | "onRequest";
  currency: "EUR";
  seo: { metaTitle: L; metaDescription: L; keywords: L };
};

export const SEED_UPDATED_AT = "2026-09-06T12:00:00Z";

export function img(path: string, alt: L, key?: string): SeedImage {
  return {
    _type: "image",
    ...(key ? { _key: key } : {}),
    asset: { _id: path, url: path },
    alt,
  };
}

let blockCounter = 0;
function nextKey(prefix: string): string {
  blockCounter += 1;
  return `${prefix}-${blockCounter.toString(36)}`;
}

/**
 * Мінімальна розмітка всередині рядка тексту:
 *   [підпис](/uk/catalog/…) — посилання (зовнішні відкриваються в новій вкладці),
 *   **жирний**             — акцент.
 * Далі це перетворюється на звичайні span-и й markDefs Portable Text,
 * тож у Studio текст лишається редагованим руками, без спецсинтаксису.
 */
const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

function parseText(
  text: string,
  key: string,
): { children: SeedBlock["children"]; markDefs: SeedMarkDef[] } {
  const children: SeedBlock["children"] = [];
  const markDefs: SeedMarkDef[] = [];
  let last = 0;
  let index = 0;

  const push = (value: string, marks: string[]) => {
    if (!value) return;
    children.push({
      _type: "span",
      _key: `${key}-s${index++}`,
      text: value,
      marks,
    });
  };

  for (const match of text.matchAll(TOKEN)) {
    push(text.slice(last, match.index), []);
    if (match[3] !== undefined) {
      push(match[3], ["strong"]);
    } else {
      const href = match[2];
      const external = /^https?:/i.test(href);
      const defKey = `${key}-m${markDefs.length}`;
      markDefs.push({
        _key: defKey,
        _type: "link",
        href,
        ...(external ? { blank: true } : {}),
      });
      push(match[1], [defKey]);
    }
    last = (match.index ?? 0) + match[0].length;
  }
  push(text.slice(last), []);

  return { children, markDefs };
}

export function p(text: string, prefix = "b"): SeedBlock {
  const key = nextKey(prefix);
  const { children, markDefs } = parseText(text, key);
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs,
    children,
  };
}

export function h2(text: string, prefix = "h"): SeedBlock {
  return { ...p(text, prefix), style: "h2" };
}

export function li(text: string, prefix = "l"): SeedBlock {
  return { ...p(text, prefix), listItem: "bullet", level: 1 };
}

export function no(text: string, prefix = "n"): SeedBlock {
  return { ...p(text, prefix), listItem: "number", level: 1 };
}

/** Фото всередині статті. `path` — файл у /public, який пуш завантажить як asset. */
export function bodyImage(
  path: string,
  alt: L,
  caption?: L,
  prefix = "i",
): SeedBodyImage {
  return {
    _type: "imageWithAlt",
    _key: nextKey(prefix),
    asset: { _id: path, url: path },
    alt,
    ...(caption ? { caption } : {}),
  };
}

/**
 * Таблиця. Перший рядок — заголовок.
 * Комірки задаються одним рядком через `|`, щоб дані читались як таблиця
 * прямо в коді й їх було видно очима під час вичитки.
 */
export function table(rows: string[], caption?: L, prefix = "t"): SeedTable {
  const key = nextKey(prefix);
  return {
    _type: "tableBlock",
    _key: key,
    ...(caption ? { caption } : {}),
    rows: rows.map((row, index) => ({
      _key: `${key}-r${index}`,
      _type: "row" as const,
      cells: row.split("|").map((cell) => cell.trim()),
    })),
  };
}

export function cta(
  title: L,
  text: L,
  buttonLabel: L,
  buttonHref: string,
  prefix = "c",
): SeedCta {
  return {
    _type: "ctaBlock",
    _key: nextKey(prefix),
    title,
    text,
    buttonLabel,
    buttonHref,
  };
}

/* ─── Побудова внутрішніх посилань ─────────────────────────────────────── */

type HasLocalizedSlug = { slug: ReturnType<typeof slugs> };

/** EN живе в корені, UK і RU — з префіксом. Те саме правило, що в i18n/config. */
export function localePath(lang: keyof L, path: string): string {
  return lang === "en" ? path : `/${lang}${path}`;
}

export function productPath(item: HasLocalizedSlug, lang: keyof L): string {
  return localePath(lang, `/catalog/${item.slug[lang].current}`);
}

export function categoryPath(item: HasLocalizedSlug, lang: keyof L): string {
  return localePath(lang, `/catalog/category/${item.slug[lang].current}`);
}

export function postPath(item: HasLocalizedSlug, lang: keyof L): string {
  return localePath(lang, `/blog/${item.slug[lang].current}`);
}

/** Три локалізовані масиви блоків із однакової структури. */
export function blocks(build: (lang: keyof L) => SeedContent[]): {
  en: SeedContent[];
  uk: SeedContent[];
  ru: SeedContent[];
} {
  return { en: build("en"), uk: build("uk"), ru: build("ru") };
}

export function faq(key: string, question: L, answer: L): SeedFaq {
  return { _key: key, question, answer };
}

export function spec(key: string, label: L, value: L, group?: L): SeedSpec {
  return { _key: key, label, value, ...(group ? { group } : {}) };
}

export function slugs(en: string, uk: string, ru: string) {
  return { en: { current: en }, uk: { current: uk }, ru: { current: ru } };
}

/** Спільні мітки для характеристик */
export const LABELS = {
  volume: {
    en: "Geometric volume",
    uk: "Геометричний обʼєм",
    ru: "Геометрический объём",
  },
  product: {
    en: "Stored product",
    uk: "Продукт зберігання",
    ru: "Продукт хранения",
  },
  type: { en: "Tank type", uk: "Тип ємності", ru: "Тип ёмкости" },
  insulation: { en: "Insulation", uk: "Ізоляція", ru: "Изоляция" },
  scope: { en: "Scope of supply", uk: "Комплектація", ru: "Комплектация" },
  capacity: {
    en: "Vaporization capacity",
    uk: "Продуктивність",
    ru: "Производительность",
  },
  gases: { en: "Gases", uk: "Гази", ru: "Газы" },
  groupMain: {
    en: "Main parameters",
    uk: "Основні параметри",
    ru: "Основные параметры",
  },
  groupScope: { en: "Configuration", uk: "Комплектація", ru: "Комплектация" },
  onRequest: {
    en: "Selected per project",
    uk: "Підбирається під проєкт",
    ru: "Подбирается под проект",
  },
} satisfies Record<string, L>;

/* ─── Тіло статті ───────────────────────────────────────────────────────── */

/**
 * Рядок тіла статті. Компактний кортеж замість повного обʼєкта Portable Text:
 * так три мовні версії лежать поруч і видно, що жодна не відстала від інших.
 *
 *   ["p" | "h2" | "h3" | "li" | "no", текст]
 *   ["img", шлях, alt, підпис?]
 *   ["tbl", підпис, "комірка | комірка", …]      перший рядок — заголовок
 *   ["cta", заголовок, текст, кнопка, посилання]
 */
export type Line =
  | ["p" | "h2" | "h3" | "li" | "no", string]
  | ["img", string, string]
  | ["img", string, string, string]
  | ["tbl", string, ...string[]]
  | ["cta", string, string, string, string];

function line(entry: Line, prefix: string): SeedContent {
  switch (entry[0]) {
    case "h2":
      return h2(entry[1], prefix);
    case "h3":
      return { ...p(entry[1], prefix), style: "h3" };
    case "li":
      return li(entry[1], prefix);
    case "no":
      return no(entry[1], prefix);
    case "img":
      return bodyImage(
        entry[1],
        { en: entry[2], uk: entry[2], ru: entry[2] },
        entry[3] ? { en: entry[3], uk: entry[3], ru: entry[3] } : undefined,
        prefix,
      );
    case "tbl": {
      const [, caption, ...rows] = entry;
      return table(
        rows,
        caption ? { en: caption, uk: caption, ru: caption } : undefined,
        prefix,
      );
    }
    case "cta": {
      const [, title, text, label, href] = entry;
      return cta(
        { en: title, uk: title, ru: title },
        { en: text, uk: text, ru: text },
        { en: label, uk: label, ru: label },
        href,
        prefix,
      );
    }
    default:
      return p(entry[1], prefix);
  }
}

/**
 * Три мовні версії тіла з однакової структури.
 *
 * Кожна мова описується власним масивом, тож alt, підписи й комірки таблиць
 * пишуться окремо. Локалізовані під-поля (`alt`, `caption`) заповнюються тим
 * самим текстом у всіх трьох ключах: масив уже мовний, а дублювання страхує
 * від порожнього значення, якщо рендер піде у фолбек на іншу мову.
 */
export function body(
  src: { en: Line[]; uk: Line[]; ru: Line[] },
  prefix: string,
): { en: SeedContent[]; uk: SeedContent[]; ru: SeedContent[] } {
  return {
    en: src.en.map((entry) => line(entry, prefix)),
    uk: src.uk.map((entry) => line(entry, prefix)),
    ru: src.ru.map((entry) => line(entry, prefix)),
  };
}
