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

export type SeedBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3";
  listItem?: "bullet";
  level?: number;
  markDefs: never[];
  children: Array<{
    _type: "span";
    _key: string;
    text: string;
    marks: never[];
  }>;
};

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
  description: { en: SeedBlock[]; uk: SeedBlock[]; ru: SeedBlock[] };
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
  description: { en: SeedBlock[]; uk: SeedBlock[]; ru: SeedBlock[] };
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

export function p(text: string, prefix = "b"): SeedBlock {
  const key = nextKey(prefix);
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-s`, text, marks: [] }],
  };
}

export function h2(text: string, prefix = "h"): SeedBlock {
  return { ...p(text, prefix), style: "h2" };
}

export function li(text: string, prefix = "l"): SeedBlock {
  return { ...p(text, prefix), listItem: "bullet", level: 1 };
}

/** Три локалізовані масиви блоків із однакової структури. */
export function blocks(build: (lang: keyof L) => SeedBlock[]): {
  en: SeedBlock[];
  uk: SeedBlock[];
  ru: SeedBlock[];
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
