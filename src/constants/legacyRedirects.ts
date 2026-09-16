/**
 * Карта 301 зі старої версії сайту.
 *
 * До серпня 2026 каталог і блог мали інші slug-и (див. `demoData.ts` у коміті
 * e35b35b). Google встиг їх проіндексувати, а наступний реліз змінив адреси —
 * і частина проіндексованих сторінок почала віддавати 404. У Search Console це
 * видно як покази й кліки на неіснуючі URL: наприклад,
 * `/blog/food-grade-co2-isbt-eiga-requirements` мав 13 показів і клік на
 * середній позиції 3,2, а користувач після кліку потрапляв на «сторінку не
 * знайдено».
 *
 * Кожен старий slug веде на найближчий чинний матеріал: стаття — на статтю,
 * товар — на товар, а те, чого більше немає в каталозі (установки уловлювання,
 * пелетайзери), — на профільну сторінку рішень.
 */

type LocalizedSlugs = { en: string; uk: string; ru: string };

/** Старі slug-и → нові, по локалях. Ключ — сегмент шляху перед slug-ом. */
type LegacyEntry = {
  /** Префікс старого шляху без локалі, напр. "/catalog/category". */
  from: string;
  /** Старі slug-и по локалях. */
  slugs: LocalizedSlugs;
  /**
   * Куди вести. Якщо `slugs` — той самий префікс із новим slug-ом;
   * якщо `path` — фіксований шлях (сторінка рішень, постачання тощо).
   */
  to: { slugs: LocalizedSlugs } | { path: string };
};

const ENTRIES: LegacyEntry[] = [
  /* ── Категорії каталогу ─────────────────────────────────────────────── */
  {
    from: "/catalog/category",
    slugs: {
      en: "cryogenic-tanks",
      uk: "kriogenni-rezervuary",
      ru: "kriogennye-rezervuary",
    },
    to: {
      slugs: {
        en: "cryogenic-co2-storage-tanks",
        uk: "kriogenni-yemnosti-dlya-ridkogo-co2",
        ru: "kriogennye-emkosti-dlya-zhidkogo-co2",
      },
    },
  },
  {
    from: "/catalog/category",
    slugs: {
      en: "co2-capture-units",
      uk: "ustanovky-ulovlyuvannya-co2",
      ru: "ustanovki-ulavlivaniya-co2",
    },
    to: { path: "/solutions/engineering-solutions" },
  },
  {
    from: "/catalog/category",
    slugs: {
      en: "dry-ice-equipment",
      uk: "obladnannya-dlya-suhogo-lodu",
      ru: "oborudovanie-dlya-suhogo-lda",
    },
    to: { path: "/solutions/dry-ice-production" },
  },

  /* ── Товари ─────────────────────────────────────────────────────────── */
  {
    from: "/catalog",
    slugs: {
      en: "cryogenic-co2-tank-ct-30",
      uk: "kriogennyi-rezervuar-co2-ct-30",
      ru: "kriogennyi-rezervuar-co2-ct-30",
    },
    to: {
      slugs: {
        en: "cryogenic-co2-tank-30-m3",
        uk: "kriogenna-yemnist-co2-30-m3",
        ru: "kriogennaya-emkost-co2-30-m3",
      },
    },
  },
  {
    from: "/catalog",
    slugs: {
      en: "modular-co2-capture-unit-mc-500",
      uk: "modulna-ustanovka-ulovlyuvannya-co2-mc-500",
      ru: "modulnaya-ustanovka-ulavlivaniya-co2-mc-500",
    },
    to: { path: "/solutions/equipment-and-systems" },
  },
  {
    from: "/catalog",
    slugs: {
      en: "dry-ice-pelletizer-dp-120",
      uk: "pelletaizer-suhogo-lodu-dp-120",
      ru: "pelletaizer-suhogo-lda-dp-120",
    },
    to: { path: "/solutions/dry-ice-production" },
  },

  /* ── Категорії блогу ────────────────────────────────────────────────── */
  {
    from: "/blog/category",
    slugs: { en: "technology", uk: "tehnologii", ru: "tehnologii-ru" },
    to: {
      slugs: {
        en: "equipment-selection",
        uk: "pidbir-obladnannya",
        ru: "podbor-oborudovaniya",
      },
    },
  },
  {
    from: "/blog/category",
    slugs: { en: "standards", uk: "standarty", ru: "standarty-ru" },
    to: {
      slugs: {
        en: "gas-quality-and-standards",
        uk: "yakist-gaziv-ta-standarty",
        ru: "kachestvo-gazov-i-standarty",
      },
    },
  },

  /* ── Статті ─────────────────────────────────────────────────────────── */
  {
    from: "/blog",
    slugs: {
      en: "how-biogenic-co2-capture-works",
      uk: "yak-pratsyuye-ulovlyuvannya-biogennogo-co2",
      ru: "kak-rabotaet-ulavlivanie-biogennogo-co2",
    },
    // Теми біогенного CO₂ тепер немає окремою статтею — вона розкрита
    // на сторінці постачання.
    to: { path: "/supply" },
  },
  {
    from: "/blog",
    slugs: {
      en: "modular-or-containerized-co2-plant",
      uk: "modulnyi-chy-konteinernyi-co2-zavod",
      ru: "modulnyi-ili-konteinernyi-co2-zavod",
    },
    to: { path: "/solutions/equipment-and-systems" },
  },
  {
    from: "/blog",
    slugs: {
      en: "food-grade-co2-isbt-eiga-requirements",
      uk: "co2-harchovoi-yakosti-isbt-eiga",
      ru: "co2-pishchevogo-kachestva-isbt-eiga",
    },
    to: {
      slugs: {
        en: "isbt-eiga-co2-quality-requirements",
        uk: "vymogy-isbt-ta-eiga-do-yakosti-co2",
        ru: "trebovaniya-isbt-i-eiga-k-kachestvu-co2",
      },
    },
  },

  /* ── Вересень 2026: модельний ряд із прайсу клієнта ─────────────────────
     Умовні обʼєми замінено реальними моделями. Ємностей на 80 і 100 м³ у
     лінійці немає — ведемо на категорію; випарник — на найближчу модель, що
     покриває ту саму витрату; кріоциліндр «для азоту/кисню/аргону» — на
     категорію свого газу з моделями Euro-Cyl. */
  {
    from: "/catalog",
    slugs: {
      en: "cryogenic-co2-tank-80-m3",
      uk: "kriogenna-yemnist-co2-80-m3",
      ru: "kriogennaya-emkost-co2-80-m3",
    },
    to: {
      slugs: {
        en: "category/cryogenic-co2-storage-tanks",
        uk: "category/kriogenni-yemnosti-dlya-ridkogo-co2",
        ru: "category/kriogennye-emkosti-dlya-zhidkogo-co2",
      },
    },
  },
  {
    from: "/catalog",
    slugs: {
      en: "cryogenic-co2-tank-100-m3",
      uk: "kriogenna-yemnist-co2-100-m3",
      ru: "kriogennaya-emkost-co2-100-m3",
    },
    to: {
      slugs: {
        en: "category/cryogenic-co2-storage-tanks",
        uk: "category/kriogenni-yemnosti-dlya-ridkogo-co2",
        ru: "category/kriogennye-emkosti-dlya-zhidkogo-co2",
      },
    },
  },
  {
    from: "/catalog",
    slugs: {
      en: "co2-vaporizer-100-kg-h",
      uk: "vyparnyk-co2-100-kg-god",
      ru: "isparitel-co2-100-kg-ch",
    },
    to: {
      slugs: {
        en: "co2-vaporizer-130-kg-h",
        uk: "vyparnyk-co2-130-kg-god",
        ru: "isparitel-co2-130-kg-ch",
      },
    },
  },
  {
    from: "/catalog",
    slugs: {
      en: "co2-vaporizer-200-kg-h",
      uk: "vyparnyk-co2-200-kg-god",
      ru: "isparitel-co2-200-kg-ch",
    },
    to: {
      slugs: {
        en: "co2-vaporizer-270-kg-h",
        uk: "vyparnyk-co2-270-kg-god",
        ru: "isparitel-co2-270-kg-ch",
      },
    },
  },
  {
    from: "/catalog",
    slugs: {
      en: "co2-vaporizer-300-kg-h",
      uk: "vyparnyk-co2-300-kg-god",
      ru: "isparitel-co2-300-kg-ch",
    },
    to: {
      slugs: {
        en: "co2-vaporizer-400-kg-h",
        uk: "vyparnyk-co2-400-kg-god",
        ru: "isparitel-co2-400-kg-ch",
      },
    },
  },
  {
    from: "/catalog",
    slugs: {
      en: "co2-vaporizer-500-kg-h",
      uk: "vyparnyk-co2-500-kg-god",
      ru: "isparitel-co2-500-kg-ch",
    },
    to: {
      slugs: {
        en: "co2-vaporizer-650-kg-h",
        uk: "vyparnyk-co2-650-kg-god",
        ru: "isparitel-co2-650-kg-ch",
      },
    },
  },
  {
    from: "/catalog",
    slugs: {
      en: "co2-vaporizer-800-kg-h",
      uk: "vyparnyk-co2-800-kg-god",
      ru: "isparitel-co2-800-kg-ch",
    },
    to: {
      slugs: {
        en: "co2-vaporizer-1000-kg-h",
        uk: "vyparnyk-co2-1000-kg-god",
        ru: "isparitel-co2-1000-kg-ch",
      },
    },
  },
  {
    from: "/catalog",
    slugs: {
      en: "liquid-nitrogen-cryogenic-cylinder",
      uk: "kriotsylindr-dlya-ridkogo-azotu",
      ru: "kriotsilindr-dlya-zhidkogo-azota",
    },
    to: {
      slugs: {
        en: "category/liquid-nitrogen-cryogenic-cylinders",
        uk: "category/kriotsylindry-dlya-ridkogo-azotu",
        ru: "category/kriotsilindry-dlya-zhidkogo-azota",
      },
    },
  },
  {
    from: "/catalog",
    slugs: {
      en: "liquid-oxygen-cryogenic-cylinder",
      uk: "kriotsylindr-dlya-ridkogo-kysnyu",
      ru: "kriotsilindr-dlya-zhidkogo-kisloroda",
    },
    to: {
      slugs: {
        en: "category/liquid-oxygen-cryogenic-cylinders",
        uk: "category/kriotsylindry-dlya-ridkogo-kysnyu",
        ru: "category/kriotsilindry-dlya-zhidkogo-kisloroda",
      },
    },
  },
  {
    from: "/catalog",
    slugs: {
      en: "liquid-argon-cryogenic-cylinder",
      uk: "kriotsylindr-dlya-ridkogo-argonu",
      ru: "kriotsilindr-dlya-zhidkogo-argona",
    },
    to: {
      slugs: {
        en: "category/liquid-argon-cryogenic-cylinders",
        uk: "category/kriotsylindry-dlya-ridkogo-argonu",
        ru: "category/kriotsilindry-dlya-zhidkogo-argona",
      },
    },
  },
];

export type Redirect = {
  source: string;
  destination: string;
  permanent: true;
};

/** EN живе в корені, UK і RU — з префіксом; те саме правило, що в i18n/config. */
function withLocale(locale: "en" | "uk" | "ru", path: string): string {
  return locale === "en" ? path : `/${locale}${path}`;
}

/** Розгортає карту в плоский список 301 для next.config. */
export function buildLegacyRedirects(): Redirect[] {
  const out: Redirect[] = [];

  for (const entry of ENTRIES) {
    for (const locale of ["en", "uk", "ru"] as const) {
      const source = withLocale(locale, `${entry.from}/${entry.slugs[locale]}`);
      const destination =
        "slugs" in entry.to
          ? withLocale(locale, `${entry.from}/${entry.to.slugs[locale]}`)
          : withLocale(locale, entry.to.path);

      // Один і той самий slug у uk і ru (напр. kriogennyi-rezervuar-co2-ct-30)
      // дав би два однакові правила — Next на це лається.
      if (out.some((rule) => rule.source === source)) continue;
      out.push({ source, destination, permanent: true });
    }
  }

  return out;
}
