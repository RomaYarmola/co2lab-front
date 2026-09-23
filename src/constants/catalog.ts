/**
 * Категорії, які показують товари іншої категорії.
 *
 * Кріоциліндри Euro-Cyl працюють з рідким азотом, киснем і аргоном — одна
 * лінійка на три гази. Товари прикріплені до категорії азоту, а сторінки
 * кисню й аргону виводять ті самі моделі зі своєю таблицею мас і втрат.
 * Так пошук «кріоциліндр для кисню» потрапляє на профільну сторінку, а в
 * каталозі не зʼявляється три копії кожного товару.
 */
export const SHARED_CATEGORY_PRODUCTS: Record<string, string> = {
  "cat-cylinders-o2": "cat-cylinders-n2",
  "cat-cylinders-ar": "cat-cylinders-n2",
};

/** `_id` категорії, чиї товари виводити на сторінці `categoryId`. */
export function productSourceCategory(categoryId: string): string {
  return SHARED_CATEGORY_PRODUCTS[categoryId] ?? categoryId;
}

type Label = { en: string; uk: string; ru: string };

export type CatalogSectionConfig = {
  /** Якір секції на сторінці /catalog. */
  id: string;
  /** Коротка назва для панелі швидкого доступу й заголовка секції. */
  title: Label;
  /** Категорії секції в порядку показу; для кількох — підписи кнопок. */
  categories: Array<{ id: string; label?: Label }>;
};

/**
 * Секції сторінки /catalog і панель швидкого доступу.
 *
 * Логіка з happy-bar: один довгий список, розбитий на секції, і липка панель,
 * що підсвічує поточну. Відмінність — у секції видно лише перші товари, а
 * решта за кнопкою «Дивитись усі» веде на сторінку категорії: однотипні
 * ємності й кріоциліндри не йдуть стіною однакових карток, а вага посилань
 * дістається хабам.
 *
 * Схожі сімейства зведені в одну секцію (ємності для азоту, кисню й аргону;
 * кріоциліндри для трьох газів). Категорія з CMS, якої тут немає, стане
 * окремою секцією в кінці — нічого не зникне з каталогу.
 */
export const CATALOG_SECTIONS: CatalogSectionConfig[] = [
  {
    id: "co2-tanks",
    title: { en: "CO₂ tanks", uk: "Ємності для CO₂", ru: "Ёмкости для CO₂" },
    categories: [{ id: "cat-tanks-co2" }],
  },
  {
    id: "co2-vaporizers",
    title: { en: "CO₂ vaporizers", uk: "Випарники CO₂", ru: "Испарители CO₂" },
    categories: [{ id: "cat-co2-vaporizers" }],
  },
  {
    id: "cryogenic-cylinders",
    title: { en: "Cryogenic cylinders", uk: "Кріоциліндри", ru: "Криоцилиндры" },
    categories: [
      { id: "cat-cylinders-n2", label: { en: "For nitrogen", uk: "Для азоту", ru: "Для азота" } },
      { id: "cat-cylinders-o2", label: { en: "For oxygen", uk: "Для кисню", ru: "Для кислорода" } },
      { id: "cat-cylinders-ar", label: { en: "For argon", uk: "Для аргону", ru: "Для аргона" } },
    ],
  },
  {
    id: "air-gas-tanks",
    title: {
      en: "Nitrogen, oxygen and argon tanks",
      uk: "Ємності для азоту, кисню й аргону",
      ru: "Ёмкости для азота, кислорода и аргона",
    },
    categories: [
      { id: "cat-tanks-n2", label: { en: "Nitrogen", uk: "Азот", ru: "Азот" } },
      { id: "cat-tanks-o2", label: { en: "Oxygen", uk: "Кисень", ru: "Кислород" } },
      { id: "cat-tanks-ar", label: { en: "Argon", uk: "Аргон", ru: "Аргон" } },
    ],
  },
  {
    id: "ambient-vaporizers",
    title: { en: "Ambient vaporizers", uk: "Атмосферні випарники", ru: "Атмосферные испарители" },
    categories: [{ id: "cat-ambient-vaporizers" }],
  },
  {
    id: "co2-quality-control",
    title: { en: "CO₂ quality control", uk: "Контроль якості CO₂", ru: "Контроль качества CO₂" },
    categories: [{ id: "cat-co2-lab" }],
  },
  {
    id: "installation",
    title: { en: "Turnkey installation", uk: "Монтаж під ключ", ru: "Монтаж под ключ" },
    categories: [{ id: "cat-installation" }],
  },
];

export type EquipmentGroupConfig = {
  id: string;
  title: Label;
  /** `_id` категорій у порядку показу. */
  categoryIds: string[];
};

/**
 * Групи обладнання для головної та сторінки «Обладнання й системи».
 *
 * На /catalog секції дрібніші — кожна показує товари й веде на свою
 * категорію. Тут інший розріз: одинадцять карток поспіль читалися як
 * таблиця, де пʼять назв починаються з «Кріогенні ємності для…». Тип
 * обладнання несе заголовок групи, картка — газ і фотографію.
 *
 * Категорія з CMS, якої тут немає, потрапляє в кінець окремою групою.
 */
export const EQUIPMENT_GROUPS: EquipmentGroupConfig[] = [
  {
    id: "tanks",
    title: {
      en: "Cryogenic tanks",
      uk: "Кріогенні ємності",
      ru: "Криогенные ёмкости",
    },
    categoryIds: ["cat-tanks-co2", "cat-tanks-n2", "cat-tanks-o2", "cat-tanks-ar"],
  },
  {
    id: "cylinders",
    title: {
      en: "Cryogenic cylinders",
      uk: "Кріоциліндри",
      ru: "Криоцилиндры",
    },
    categoryIds: ["cat-cylinders-n2", "cat-cylinders-o2", "cat-cylinders-ar"],
  },
  {
    id: "vaporizers",
    title: {
      en: "Vaporizers",
      uk: "Випарники (газифікатори)",
      ru: "Испарители (газификаторы)",
    },
    categoryIds: ["cat-co2-vaporizers", "cat-ambient-vaporizers"],
  },
  {
    id: "services",
    title: {
      en: "Quality control and installation",
      uk: "Контроль якості та монтаж",
      ru: "Контроль качества и монтаж",
    },
    categoryIds: ["cat-co2-lab", "cat-installation"],
  },
];

/** Скільки карток показувати в секції до кнопки «Дивитись усі». */
export const CATALOG_SECTION_LIMIT = 3;
