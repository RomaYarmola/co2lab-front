/**
 * Посадкові сторінки під комерційний попит: «цех сухого льоду», галузеві
 * рішення. Контент — дані, а не JSX: так три мовні версії лежать поруч,
 * а тіло рендериться тим самим Portable Text, що й статті блогу
 * (таблиці, CTA, посилання всередині абзацу).
 */
import type { L, Line } from "@/lib/sanity/seed/helpers";

export type LandingFaq = { question: L; answer: L };

export type Landing = {
  /** Службовий ключ. */
  id: string;
  /** Логічний шлях без префікса локалі — однаковий для всіх мов. */
  path: string;
  seo: { title: L; description: L };
  /** Назва в хлібних крихтах і в блоках посилань. */
  shortTitle: L;
  eyebrow: L;
  title: L;
  lead: L;
  /** Фото з /public — рендериться next/image, не через Sanity. */
  image: { src: string; alt: L };
  body: { en: Line[]; uk: Line[]; ru: Line[] };
  /** `_id` категорій каталогу, на які сторінка передає вагу. */
  hubs: string[];
  /** `_id` статей-опор. */
  posts: string[];
  faq: LandingFaq[];
};
