import {
  LABELS,
  SEED_UPDATED_AT,
  blocks,
  categoryPath,
  faq,
  h2,
  img,
  li,
  localePath,
  p,
  slugs,
  spec,
  type L,
  type SeedCategory,
  type SeedProduct,
  table,
} from "./helpers.ts";
import { GASES, type GasKey } from "./gases.ts";
import {
  CO2_TANK_CATEGORY_SLUG,
  CO2_VAPORIZERS,
  CRYO_CYLINDERS,
  formatEur,
  num,
  priceFrom,
  type Co2VaporizerModel,
  type CryoCylinderModel,
  type CylinderBase,
} from "./models.ts";

const IMG = {
  // Фото клієнта з каталогу «Кріогенне обладнання» (витягнуті з docx)
  tankWithVaporizer: "/images/catalog/cryogenic-tank-with-ambient-vaporizer.webp",
  ambientRange: "/images/catalog/ambient-air-vaporizers-range.webp",
  cylinderNitrogen: "/images/catalog/cryogenic-cylinder-nitrogen.webp",
  cylinderFrame: "/images/catalog/cryogenic-cylinder-stainless-frame.webp",
  microbulk: "/images/catalog/microbulk-tank-with-piping.webp",
  lab: "/images/catalog/co2-quality-control-laboratory.webp",
  co2Fans: "/images/catalog/forced-draft-vaporizer-fans.webp",
  co2Greenhouse: "/images/catalog/co2-vaporizer-in-greenhouse.webp",
  crane: "/images/catalog/cryogenic-tank-installation-crane.webp",
  // Знімки з маркетингових сторінок сайту
  tanks: "/images/equipmentAndSystemsPage/criogenicTanks/image.webp",
  valves: "/images/equipmentAndSystemsPage/criogenicTanks/imageThree.webp",
  engineer: "/images/equipmentAndSystemsPage/engineering/imageThree.webp",
};

/** Головне й додаткове фото кріоциліндра під кожен газ. */
const CYLINDER_PHOTOS: Record<GasKey, [string, string]> = {
  n2: [IMG.cylinderNitrogen, IMG.cylinderFrame],
  o2: [IMG.cylinderFrame, IMG.microbulk],
  ar: [IMG.microbulk, IMG.cylinderFrame],
  co2: [IMG.cylinderFrame, IMG.microbulk],
};

const SCOPE_HEADING: L = {
  en: "Scope of supply",
  uk: "Комплектація",
  ru: "Комплектация",
};
const SELECTION_HEADING: L = {
  en: "How we select the equipment",
  uk: "Як ми підбираємо обладнання",
  ru: "Как мы подбираем оборудование",
};

/* ═══════════════════════════════════════════════════════════════════════
   Кріоциліндри Euro-Cyl
   ═══════════════════════════════════════════════════════════════════════

   Одна лінійка працює з рідким азотом, киснем і аргоном. Товари живуть у
   категорії азоту, а категорії кисню й аргону показують ті самі моделі
   (див. SHARED_CATEGORY_PRODUCTS у constants/catalog.ts) з таблицею мас і
   втрат саме для свого газу — так три посадкові сторінки не дублюють одна
   одну, а товарів не стає втричі більше.
*/

type CylinderDef = {
  gas: GasKey;
  order: number;
  en: string;
  uk: string;
  ru: string;
};

const CYLINDER_DEFS: CylinderDef[] = [
  {
    gas: "n2",
    order: 50,
    en: "liquid-nitrogen-cryogenic-cylinders",
    uk: "kriotsylindry-dlya-ridkogo-azotu",
    ru: "kriotsilindry-dlya-zhidkogo-azota",
  },
  {
    gas: "o2",
    order: 60,
    en: "liquid-oxygen-cryogenic-cylinders",
    uk: "kriotsylindry-dlya-ridkogo-kysnyu",
    ru: "kriotsilindry-dlya-zhidkogo-kisloroda",
  },
  {
    gas: "ar",
    order: 70,
    en: "liquid-argon-cryogenic-cylinders",
    uk: "kriotsylindry-dlya-ridkogo-argonu",
    ru: "kriotsilindry-dlya-zhidkogo-argona",
  },
];

const cylinderCategoryPath = (def: CylinderDef, lang: keyof L) =>
  localePath(lang, `/catalog/category/${def[lang]}`);

/** «з рідким азотом» — для підписів колонок і посилань між категоріями. */
type AirGas = "n2" | "o2" | "ar";

const WITH_LIQUID: Record<AirGas, L> = {
  n2: { en: "liquid nitrogen", uk: "рідким азотом", ru: "жидким азотом" },
  o2: { en: "liquid oxygen", uk: "рідким киснем", ru: "жидким кислородом" },
  ar: { en: "liquid argon", uk: "рідким аргоном", ru: "жидким аргоном" },
};

const BASE_LABEL: Record<CylinderBase, L> = {
  squareWheels: { en: "square wheeled base", uk: "квадратна колісна база", ru: "квадратная колёсная база" },
  roundRing: { en: "round base with support ring", uk: "кругла основа з опорним кільцем", ru: "круглое основание с опорным кольцом" },
  roundWheels: { en: "round wheeled base", uk: "кругла колісна база", ru: "круглая колёсная база" },
  pallet: { en: "pallet frame", uk: "палетна рама", ru: "паллетная рама" },
};

const maxKg = (m: CryoCylinderModel, gas: GasKey) =>
  gas === "o2" ? m.maxLoxKg : gas === "ar" ? m.maxLarKg : m.maxLinKg;
const nerOf = (m: CryoCylinderModel, gas: GasKey) =>
  gas === "n2" ? m.nerLin : m.nerLoxAr;
const litres = (value: number, lang: keyof L) =>
  `${num(value, lang)} ${lang === "en" ? "L" : "л"}`;
const bar = (value: number, lang: keyof L) =>
  `${num(value, lang)} ${lang === "en" ? "bar" : "бар"}`;
const perDay = (value: number, lang: keyof L) =>
  `${num(value, lang, 1)} %/${{ en: "day", uk: "добу", ru: "сутки" }[lang]}`;
const cap = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const CYL_MIN_PRICE = Math.min(...CRYO_CYLINDERS.map((m) => m.priceEur));
const CYL_VOLUMES = (lang: keyof L) =>
  `${num(Math.min(...CRYO_CYLINDERS.map((m) => m.volume)), lang)}–${num(Math.max(...CRYO_CYLINDERS.map((m) => m.volume)), lang)} ${lang === "en" ? "L" : "л"}`;

const CYL_WHAT: L = {
  en: "A cryogenic cylinder (liquid cylinder) is a portable vacuum-insulated vessel that stores liquefied gas and delivers it as gas or liquid under pressure. It replaces a whole rack of high-pressure cylinders, is refilled on site or exchanged, and needs no foundation or permit for a stationary tank.",
  uk: "Кріоциліндр — це переносна вакуумно-ізольована посудина, яка зберігає зріджений газ і видає його в газоподібному або рідкому стані під тиском. Він замінює цілу рампу балонів високого тиску, заправляється на місці або обмінюється і не потребує фундаменту чи дозволів, як стаціонарна ємність.",
  ru: "Криоцилиндр — это переносной вакуумно-изолированный сосуд, который хранит сжиженный газ и выдаёт его в газообразном или жидком состоянии под давлением. Он заменяет целую рампу баллонов высокого давления, заправляется на месте или обменивается и не требует фундамента или разрешений, как стационарная ёмкость.",
};

const CYL_WHEN: L = {
  en: "Cryogenic cylinders are the right choice when consumption is too high for cylinders but too low or too irregular for a stationary tank, when the point of use changes, or when a mobile reserve is needed next to a stationary system.",
  uk: "Кріоциліндри — правильний вибір, коли споживання завелике для балонів, але замале або нерегулярне для стаціонарної ємності, коли точка споживання змінюється, або коли потрібен мобільний резерв поруч зі стаціонарною системою.",
  ru: "Криоцилиндры — правильный выбор, когда потребление слишком велико для баллонов, но мало или нерегулярно для стационарной ёмкости, когда точка потребления меняется, или когда нужен мобильный резерв рядом со стационарной системой.",
};

const CYL_SELECTION: L = {
  en: "We select the volume, working pressure and configuration (gas or liquid withdrawal, built-in vaporizer, pressure regulator, level gauge) for the customer's actual process, and supply small vacuum-insulated tanks where a cylinder is no longer enough.",
  uk: "Ми підбираємо обʼєм, робочий тиск та комплектацію (газовий або рідинний відбір, вбудований випарник, регулятор тиску, покажчик рівня) під реальний технологічний процес замовника, а там, де кріоциліндра вже недостатньо, постачаємо малі вакуумно-ізольовані ємності.",
  ru: "Мы подбираем объём, рабочее давление и комплектацию (газовый или жидкостный отбор, встроенный испаритель, регулятор давления, указатель уровня) под реальный технологический процесс заказчика, а там, где криоцилиндра уже недостаточно, поставляем малые вакуумно-изолированные ёмкости.",
};

const CYL_SAFETY_NOTE: L = {
  en: "Models 120/4 to 230/4 have a 4 bar safety valve (1.5 bar optional) and a 6 bar burst disc; the 600/8 and 1000/8 are set to 8 bar. Every model carries the TPED conformity code.",
  uk: "Моделі від 120/4 до 230/4 мають запобіжний клапан на 4 бар (опціонально 1,5 бар) і розривну мембрану на 6 бар, 600/8 і 1000/8 — клапан на 8 бар. Усі моделі мають код відповідності TPED.",
  ru: "Модели от 120/4 до 230/4 имеют предохранительный клапан на 4 бар (опционально 1,5 бар) и разрывную мембрану на 6 бар, 600/8 и 1000/8 — клапан на 8 бар. Все модели имеют код соответствия TPED.",
};

const CYL_FAQ: Array<{ q: L; a: L }> = [
  {
    q: {
      en: "Cryogenic cylinder or stationary tank — which is cheaper?",
      uk: "Кріоциліндр чи стаціонарна ємність — що вигідніше?",
      ru: "Криоцилиндр или стационарная ёмкость — что выгоднее?",
    },
    a: {
      en: "For steady consumption of several tonnes per month a stationary tank gives the lowest cost per cubic metre. For lower or seasonal consumption, cryogenic cylinders win on zero capital cost for foundations and piping. Send us your monthly figures and we will compare both options.",
      uk: "За стабільного споживання від кількох тонн на місяць стаціонарна ємність дає найнижчу собівартість кубометра. За меншого або сезонного споживання виграють кріоциліндри — нуль капітальних витрат на фундамент і трубопроводи. Надішліть місячні обсяги — порівняємо обидва варіанти.",
      ru: "При стабильном потреблении от нескольких тонн в месяц стационарная ёмкость даёт самую низкую себестоимость кубометра. При меньшем или сезонном потреблении выигрывают криоцилиндры — ноль капитальных затрат на фундамент и трубопроводы. Пришлите месячные объёмы — сравним оба варианта.",
    },
  },
  {
    q: {
      en: "What does NER in the specifications mean?",
      uk: "Що означає NER у характеристиках?",
      ru: "Что означает NER в характеристиках?",
    },
    a: {
      en: "Normal Evaporation Rate — the share of the contents that boils off per day. For Euro-Cyl it is 1.5–2.0% a day with liquid nitrogen and 1.0–1.4% with oxygen and argon; the smaller the cylinder, the higher the relative loss.",
      uk: "Normal Evaporation Rate — частка вмісту, яка випаровується за добу. Для Euro-Cyl це 1,5–2,0% на добу з рідким азотом і 1,0–1,4% з киснем та аргоном; що менший кріоциліндр, то більші відносні втрати.",
      ru: "Normal Evaporation Rate — доля содержимого, которая испаряется за сутки. Для Euro-Cyl это 1,5–2,0% в сутки с жидким азотом и 1,0–1,4% с кислородом и аргоном; чем меньше криоцилиндр, тем выше относительные потери.",
    },
  },
  {
    q: {
      en: "What does the TPED code mean?",
      uk: "Що означає код TPED?",
      ru: "Что означает код TPED?",
    },
    a: {
      en: "TPED is the European Transportable Pressure Equipment Directive 2010/35/EU. The code means the cylinder is certified as transportable pressure equipment, not only for stationary use.",
      uk: "TPED — європейська директива 2010/35/EU про транспортне обладнання під тиском. Код означає, що кріоциліндр сертифікований як обладнання під тиском для перевезення, а не лише для стаціонарного використання.",
      ru: "TPED — европейская директива 2010/35/EU о транспортируемом оборудовании под давлением. Код означает, что криоцилиндр сертифицирован как оборудование под давлением для перевозки, а не только для стационарного использования.",
    },
  },
  {
    q: {
      en: "Do you supply the gas as well?",
      uk: "Чи постачаєте ви й сам газ?",
      ru: "Поставляете ли вы и сам газ?",
    },
    a: {
      en: "We supply the equipment and can recommend gas suppliers in your region; for CO₂ we offer our own supply. Cylinders are compatible with standard filling stations of Ukrainian gas producers.",
      uk: "Ми постачаємо обладнання та можемо порекомендувати постачальників газу у вашому регіоні; для CO₂ пропонуємо власне постачання. Кріоциліндри сумісні зі стандартними наповнювальними станціями українських виробників газів.",
      ru: "Мы поставляем оборудование и можем порекомендовать поставщиков газа в вашем регионе; для CO₂ предлагаем собственные поставки. Криоцилиндры совместимы со стандартными наполнительными станциями украинских производителей газов.",
    },
  },
];

function buildCylinderCategory(def: CylinderDef): SeedCategory {
  const g = GASES[def.gas];
  const gas = def.gas as AirGas;
  const gasShort: L = {
    en: g.nom.en,
    uk: g.gen.uk.split(" (")[0],
    ru: g.gen.ru.split(" (")[0],
  };
  const ners = CRYO_CYLINDERS.map((m) => nerOf(m, gas));
  const nerRange = (lang: keyof L) =>
    `${num(Math.min(...ners), lang, 1)}–${num(Math.max(...ners), lang, 1)}`;
  const others = CYLINDER_DEFS.filter((item) => item.gas !== def.gas);
  const k = `cc-${def.gas}`;

  return {
    _id: `cat-cylinders-${def.gas}`,
    _updatedAt: SEED_UPDATED_AT,
    title: {
      en: `Cryogenic cylinders for ${g.gen.en} — Euro-Cyl ${CYL_VOLUMES("en")}`,
      uk: `Кріоциліндри для ${g.gen.uk} — Euro-Cyl ${CYL_VOLUMES("uk")}`,
      ru: `Криоцилиндры для ${g.gen.ru} — Euro-Cyl ${CYL_VOLUMES("ru")}`,
    },
    slug: slugs(def.en, def.uk, def.ru),
    order: def.order,
    isVisible: true,
    shortDescription: {
      en: `Euro-Cyl cryogenic cylinders for storing, transporting and dispensing ${gasShort.en}: six models from ${CYL_VOLUMES("en")}, boil-off ${nerRange("en")}% a day, TPED conformity. Prices ${priceFrom(CYL_MIN_PRICE, "en")}. Volume and configuration selected for your process.`,
      uk: `Кріоциліндри Euro-Cyl для зберігання, транспортування та видачі ${gasShort.uk}: шість моделей обʼємом ${CYL_VOLUMES("uk")}, втрати на випаровування ${nerRange("uk")}% на добу, код відповідності TPED. Ціни ${priceFrom(CYL_MIN_PRICE, "uk")}. Підбір обʼєму й комплектації під ваш процес.`,
      ru: `Криоцилиндры Euro-Cyl для хранения, транспортировки и выдачи ${gasShort.ru}: шесть моделей объёмом ${CYL_VOLUMES("ru")}, потери на испарение ${nerRange("ru")}% в сутки, код соответствия TPED. Цены ${priceFrom(CYL_MIN_PRICE, "ru")}. Подбор объёма и комплектации под ваш процесс.`,
    },
    description: blocks((lang) => [
      p(CYL_WHAT[lang], k),
      p(g.storageNote[lang], k),
      h2({ en: "Euro-Cyl models and prices", uk: "Моделі Euro-Cyl і ціни", ru: "Модели Euro-Cyl и цены" }[lang], k),
      table(
        [
          {
            en: `Model | Volume / usable, L | Max. weight with ${WITH_LIQUID[gas].en}, kg | Boil-off, %/day | Base | Price from, € excl. VAT`,
            uk: `Модель | Обʼєм / корисний, л | Макс. маса з ${WITH_LIQUID[gas].uk}, кг | Втрати, %/добу | Основа | Ціна від, € без ПДВ`,
            ru: `Модель | Объём / полезный, л | Макс. масса с ${WITH_LIQUID[gas].ru}, кг | Потери, %/сутки | Основание | Цена от, € без НДС`,
          }[lang],
          ...CRYO_CYLINDERS.map(
            (m) =>
              `${m.model} | ${num(m.volume, lang)} / ${num(m.usable, lang)} | ${num(maxKg(m, gas), lang)} | ${num(nerOf(m, gas), lang, 1)} | ${BASE_LABEL[m.base][lang]} | ${num(m.priceEur, lang)}`,
          ),
        ],
        {
          en: "Boil-off (NER) is the share of contents that evaporates per day; max. weight is the filled cylinder",
          uk: "Втрати (NER) — частка вмісту, що випаровується за добу; макс. маса — заповненого кріоциліндра",
          ru: "Потери (NER) — доля содержимого, испаряющаяся за сутки; макс. масса — заполненного криоцилиндра",
        },
        k,
      ),
      p(CYL_SAFETY_NOTE[lang], k),
      p(
        {
          en: `The same cylinders work with [${WITH_LIQUID[others[0].gas as AirGas].en}](${cylinderCategoryPath(others[0], "en")}) and [${WITH_LIQUID[others[1].gas as AirGas].en}](${cylinderCategoryPath(others[1], "en")}): the volume is the same, the filled weight and boil-off differ.`,
          uk: `Ті самі кріоциліндри працюють із [${WITH_LIQUID[others[0].gas as AirGas].uk}](${cylinderCategoryPath(others[0], "uk")}) та [${WITH_LIQUID[others[1].gas as AirGas].uk}](${cylinderCategoryPath(others[1], "uk")}): обʼєм той самий, відрізняються маса заповненого циліндра й втрати на випаровування.`,
          ru: `Те же криоцилиндры работают с [${WITH_LIQUID[others[0].gas as AirGas].ru}](${cylinderCategoryPath(others[0], "ru")}) и [${WITH_LIQUID[others[1].gas as AirGas].ru}](${cylinderCategoryPath(others[1], "ru")}): объём тот же, отличаются масса заполненного цилиндра и потери на испарение.`,
        }[lang],
        k,
      ),
      p(CYL_WHEN[lang], k),
      h2(SELECTION_HEADING[lang], k),
      p(CYL_SELECTION[lang], k),
    ]),
    image: img(CYLINDER_PHOTOS[def.gas][0], {
      en: `Cryogenic cylinder for ${g.nom.en} in a transport frame with valves and pressure regulator`,
      uk: `Кріоциліндр для ${gasShort.uk} у транспортній рамі з арматурою та регулятором тиску`,
      ru: `Криоцилиндр для ${gasShort.ru} в транспортной раме с арматурой и регулятором давления`,
    }),
    faq: CYL_FAQ.map((item, index) =>
      faq(`faq-cyl-${def.gas}-${index}`, item.q, item.a),
    ),
    seo: {
      metaTitle: {
        en: `Cryogenic cylinders for ${g.nom.en} from ${formatEur(CYL_MIN_PRICE, "en")}`,
        uk: `Кріоциліндри для ${gasShort.uk} від ${formatEur(CYL_MIN_PRICE, "uk")}`,
        ru: `Криоцилиндры для ${gasShort.ru} от ${formatEur(CYL_MIN_PRICE, "ru")}`,
      },
      metaDescription: {
        en: `Six Euro-Cyl models for ${g.gen.en}: ${CYL_VOLUMES("en")}, boil-off ${nerRange("en")}%/day, TPED. Prices ${priceFrom(CYL_MIN_PRICE, "en")}, supply in Ukraine.`,
        uk: `Шість моделей Euro-Cyl для ${gasShort.uk}: ${CYL_VOLUMES("uk")}, втрати ${nerRange("uk")}%/добу, TPED. Ціни ${priceFrom(CYL_MIN_PRICE, "uk")}, постачання по Україні.`,
        ru: `Шесть моделей Euro-Cyl для ${gasShort.ru}: ${CYL_VOLUMES("ru")}, потери ${nerRange("ru")}%/сутки, TPED. Цены ${priceFrom(CYL_MIN_PRICE, "ru")}, поставка по Украине.`,
      },
      keywords: {
        en: `cryogenic cylinder ${g.nom.en}, Euro-Cyl, liquid cylinder price, dewar`,
        uk: `кріоциліндр ${gasShort.uk}, кріоциліндр Euro-Cyl, дьюар для ${gasShort.uk}, кріоциліндр ціна`,
        ru: `криоцилиндр ${gasShort.ru}, криоцилиндр Euro-Cyl, дьюар для ${gasShort.ru}, криоцилиндр цена`,
      },
    },
    productCount: CRYO_CYLINDERS.length,
  };
}

const CYL_APPLICATIONS: L[] = [
  ...GASES.n2.applications.slice(0, 3),
  ...GASES.o2.applications.slice(0, 2),
  ...GASES.ar.applications.slice(0, 1),
].filter((item, index, all) => all.findIndex((other) => other.uk === item.uk) === index);

function buildCryoCylinderProduct(
  m: CryoCylinderModel,
  category: SeedCategory,
  index: number,
): SeedProduct {
  const k = `pc-${m.id}`;
  const title: L = {
    en: `Cryogenic cylinder ${m.model} — ${litres(m.volume, "en")}`,
    uk: `Кріоциліндр ${m.model} — ${litres(m.volume, "uk")}`,
    ru: `Криоцилиндр ${m.model} — ${litres(m.volume, "ru")}`,
  };
  const photos =
    m.base === "pallet"
      ? [IMG.microbulk, IMG.cylinderFrame]
      : [IMG.cylinderNitrogen, IMG.cylinderFrame];
  const relief = (lang: keyof L) =>
    `${bar(m.relief, lang)}${m.reliefOption ? { en: `, optionally ${bar(m.reliefOption, lang)}`, uk: `, опціонально — ${bar(m.reliefOption, lang)}`, ru: `, опционально — ${bar(m.reliefOption, lang)}` }[lang] : ""}`;
  const gasLinks = (lang: keyof L) =>
    CYLINDER_DEFS.map(
      (def) => `[${WITH_LIQUID[def.gas as AirGas][lang]}](${cylinderCategoryPath(def, lang)})`,
    ).join(", ");
  const sizeLabel: L =
    m.base === "roundRing" || m.base === "roundWheels"
      ? { en: "Base diameter", uk: "Діаметр основи", ru: "Диаметр основания" }
      : { en: "Base dimensions", uk: "Габарити основи", ru: "Габариты основания" };

  return {
    _id: `product-cryocylinder-${m.id}`,
    _updatedAt: SEED_UPDATED_AT,
    title,
    slug: slugs(
      `cryogenic-cylinder-euro-cyl-${m.id}`,
      `kriotsylindr-euro-cyl-${m.id}`,
      `kriotsilindr-euro-cyl-${m.id}`,
    ),
    model: m.model,
    sku: m.model.replace(/[\s/]+/g, "-"),
    isPublished: true,
    isFeatured: Boolean(m.isFeatured),
    order: 500 + index,
    publishedAt: SEED_UPDATED_AT,
    category,
    gallery: [
      img(
        photos[0],
        {
          en: `${title.en} — vacuum-insulated vessel for liquid nitrogen, oxygen and argon`,
          uk: `${title.uk} — вакуумно-ізольована посудина для рідкого азоту, кисню та аргону`,
          ru: `${title.ru} — вакуумно-изолированный сосуд для жидкого азота, кислорода и аргона`,
        },
        `${k}-1`,
      ),
      img(
        photos[1],
        {
          en: "Cryogenic cylinder valve group with pressure gauge and regulator",
          uk: "Група арматури кріоциліндра з манометром і регулятором тиску",
          ru: "Группа арматуры криоцилиндра с манометром и регулятором давления",
        },
        `${k}-2`,
      ),
    ],
    shortDescription: {
      en: `Vacuum-insulated cryogenic cylinder of ${litres(m.volume, "en")} (usable ${litres(m.usable, "en")}) for liquid nitrogen, oxygen and argon: ${bar(m.relief, "en")} safety valve, boil-off ${num(m.nerLin, "en", 1)}% a day with nitrogen, ${BASE_LABEL[m.base].en}. Price ${priceFrom(m.priceEur, "en")}.`,
      uk: `Вакуумно-ізольований кріоциліндр на ${litres(m.volume, "uk")} (корисний обʼєм ${litres(m.usable, "uk")}) для рідкого азоту, кисню та аргону: запобіжний клапан ${bar(m.relief, "uk")}, втрати ${num(m.nerLin, "uk", 1)}% на добу з азотом, ${BASE_LABEL[m.base].uk}. Ціна ${priceFrom(m.priceEur, "uk")}.`,
      ru: `Вакуумно-изолированный криоцилиндр на ${litres(m.volume, "ru")} (полезный объём ${litres(m.usable, "ru")}) для жидкого азота, кислорода и аргона: предохранительный клапан ${bar(m.relief, "ru")}, потери ${num(m.nerLin, "ru", 1)}% в сутки с азотом, ${BASE_LABEL[m.base].ru}. Цена ${priceFrom(m.priceEur, "ru")}.`,
    },
    description: blocks((lang) => [
      p(m.note[lang], k),
      p(CYL_WHEN[lang], k),
      h2({ en: "How much it holds", uk: "Скільки вміщує", ru: "Сколько вмещает" }[lang], k),
      table(
        [
          {
            en: "Product | Max. filled weight, kg | Boil-off, %/day",
            uk: "Продукт | Макс. маса заповненого, кг | Втрати, %/добу",
            ru: "Продукт | Макс. масса заполненного, кг | Потери, %/сутки",
          }[lang],
          `${{ en: "Liquid nitrogen (LIN)", uk: "Рідкий азот (LIN)", ru: "Жидкий азот (LIN)" }[lang]} | ${num(m.maxLinKg, lang)} | ${num(m.nerLin, lang, 1)}`,
          `${{ en: "Liquid oxygen (LOX)", uk: "Рідкий кисень (LOX)", ru: "Жидкий кислород (LOX)" }[lang]} | ${num(m.maxLoxKg, lang)} | ${num(m.nerLoxAr, lang, 1)}`,
          `${{ en: "Liquid argon (LAr)", uk: "Рідкий аргон (LAr)", ru: "Жидкий аргон (LAr)" }[lang]} | ${num(m.maxLarKg, lang)} | ${num(m.nerLoxAr, lang, 1)}`,
        ],
        {
          en: `Empty weight ${num(m.emptyKg, "en")} kg; usable volume ${litres(m.usable, "en")}`,
          uk: `Маса порожнього кріоциліндра — ${num(m.emptyKg, "uk")} кг; корисний обʼєм — ${litres(m.usable, "uk")}`,
          ru: `Масса пустого криоцилиндра — ${num(m.emptyKg, "ru")} кг; полезный объём — ${litres(m.usable, "ru")}`,
        },
        k,
      ),
      p(
        {
          en: `Compare with the other models on the pages for ${gasLinks("en")}.`,
          uk: `Порівняти з іншими моделями — на сторінках кріоциліндрів для роботи з ${gasLinks("uk")}.`,
          ru: `Сравнить с другими моделями — на страницах криоцилиндров для работы с ${gasLinks("ru")}.`,
        }[lang],
        k,
      ),
      h2(
        { en: "Safety devices and certification", uk: "Запобіжні пристрої й сертифікація", ru: "Предохранительные устройства и сертификация" }[lang],
        k,
      ),
      p(
        {
          en: `The safety valve is set to ${relief("en")}${m.burstDisc ? `; the burst disc is rated at ${bar(m.burstDisc, "en")}` : ""}. The TPED conformity code means the cylinder is certified as transportable pressure equipment under Directive 2010/35/EU.`,
          uk: `Запобіжний клапан налаштований на ${relief("uk")}${m.burstDisc ? `; розривна мембрана — ${bar(m.burstDisc, "uk")}` : ""}. Код відповідності TPED означає, що кріоциліндр сертифікований як транспортне обладнання під тиском за директивою 2010/35/EU.`,
          ru: `Предохранительный клапан настроен на ${relief("ru")}${m.burstDisc ? `; разрывная мембрана — ${bar(m.burstDisc, "ru")}` : ""}. Код соответствия TPED означает, что криоцилиндр сертифицирован как транспортируемое оборудование под давлением по директиве 2010/35/EU.`,
        }[lang],
        k,
      ),
      h2({ en: "Price", uk: "Ціна", ru: "Цена" }[lang], k),
      p(
        {
          en: `From ${formatEur(m.priceEur, "en")} excl. VAT. Delivery is quoted separately.`,
          uk: `Від ${formatEur(m.priceEur, "uk")} без ПДВ. Доставка розраховується окремо.`,
          ru: `От ${formatEur(m.priceEur, "ru")} без НДС. Доставка рассчитывается отдельно.`,
        }[lang],
        k,
      ),
    ]),
    features: [
      {
        en: `Volume ${litres(m.volume, "en")}, usable ${litres(m.usable, "en")}`,
        uk: `Обʼєм ${litres(m.volume, "uk")}, корисний ${litres(m.usable, "uk")}`,
        ru: `Объём ${litres(m.volume, "ru")}, полезный ${litres(m.usable, "ru")}`,
      },
      {
        en: "For liquid nitrogen, oxygen and argon",
        uk: "Для рідкого азоту, кисню та аргону",
        ru: "Для жидкого азота, кислорода и аргона",
      },
      {
        en: cap(BASE_LABEL[m.base].en),
        uk: cap(BASE_LABEL[m.base].uk),
        ru: cap(BASE_LABEL[m.base].ru),
      },
      {
        en: "TPED conformity code",
        uk: "Код відповідності TPED",
        ru: "Код соответствия TPED",
      },
    ],
    applications: CYL_APPLICATIONS,
    specs: [
      spec("s-model", LABELS.model, { en: m.model, uk: m.model, ru: m.model }, LABELS.groupMain),
      spec("s-vol", LABELS.volume, { en: litres(m.volume, "en"), uk: litres(m.volume, "uk"), ru: litres(m.volume, "ru") }, LABELS.groupMain),
      spec("s-usable", LABELS.usable, { en: litres(m.usable, "en"), uk: litres(m.usable, "uk"), ru: litres(m.usable, "ru") }, LABELS.groupMain),
      spec(
        "s-medium",
        LABELS.medium,
        {
          en: "Liquid nitrogen (LIN), oxygen (LOX), argon (LAr)",
          uk: "Рідкий азот (LIN), кисень (LOX), аргон (LAr)",
          ru: "Жидкий азот (LIN), кислород (LOX), аргон (LAr)",
        },
        LABELS.groupMain,
      ),
      spec(
        "s-base",
        { en: "Base type", uk: "Тип основи", ru: "Тип основания" },
        { en: cap(BASE_LABEL[m.base].en), uk: cap(BASE_LABEL[m.base].uk), ru: cap(BASE_LABEL[m.base].ru) },
        LABELS.groupMain,
      ),
      spec(
        "s-code",
        { en: "Conformity code", uk: "Код відповідності", ru: "Код соответствия" },
        { en: "TPED", uk: "TPED", ru: "TPED" },
        LABELS.groupMain,
      ),
      spec(
        "s-relief",
        { en: "Safety valve setting", uk: "Налаштування запобіжного клапана", ru: "Настройка предохранительного клапана" },
        { en: bar(m.relief, "en"), uk: bar(m.relief, "uk"), ru: bar(m.relief, "ru") },
        LABELS.groupSafety,
      ),
      ...(m.reliefOption
        ? [
            spec(
              "s-relief-opt",
              { en: "Optional setting", uk: "Опціональне налаштування", ru: "Опциональная настройка" },
              { en: bar(m.reliefOption, "en"), uk: bar(m.reliefOption, "uk"), ru: bar(m.reliefOption, "ru") },
              LABELS.groupSafety,
            ),
          ]
        : []),
      ...(m.burstDisc
        ? [
            spec(
              "s-burst",
              { en: "Burst disc", uk: "Розривна мембрана", ru: "Разрывная мембрана" },
              { en: bar(m.burstDisc, "en"), uk: bar(m.burstDisc, "uk"), ru: bar(m.burstDisc, "ru") },
              LABELS.groupSafety,
            ),
          ]
        : []),
      spec(
        "s-ner-lin",
        { en: "NER, liquid nitrogen", uk: "NER, рідкий азот", ru: "NER, жидкий азот" },
        { en: perDay(m.nerLin, "en"), uk: perDay(m.nerLin, "uk"), ru: perDay(m.nerLin, "ru") },
        LABELS.groupLosses,
      ),
      spec(
        "s-ner-lox",
        { en: "NER, liquid oxygen / argon", uk: "NER, рідкий кисень / аргон", ru: "NER, жидкий кислород / аргон" },
        { en: perDay(m.nerLoxAr, "en"), uk: perDay(m.nerLoxAr, "uk"), ru: perDay(m.nerLoxAr, "ru") },
        LABELS.groupLosses,
      ),
      spec(
        "s-d",
        LABELS.diameter,
        { en: `${num(m.diameter, "en")} mm`, uk: `${num(m.diameter, "uk")} мм`, ru: `${num(m.diameter, "ru")} мм` },
        LABELS.groupSize,
      ),
      spec("s-base-size", sizeLabel, { en: `${m.baseSize.replace(/(\d) (\d)/g, "$1,$2")} mm`, uk: `${m.baseSize} мм`, ru: `${m.baseSize} мм` }, LABELS.groupSize),
      spec(
        "s-h",
        LABELS.height,
        { en: `${num(m.height, "en")} mm`, uk: `${num(m.height, "uk")} мм`, ru: `${num(m.height, "ru")} мм` },
        LABELS.groupSize,
      ),
      spec(
        "s-empty",
        { en: "Empty weight", uk: "Маса порожнього кріоциліндра", ru: "Масса пустого криоцилиндра" },
        { en: `${num(m.emptyKg, "en")} kg`, uk: `${num(m.emptyKg, "uk")} кг`, ru: `${num(m.emptyKg, "ru")} кг` },
        LABELS.groupSize,
      ),
      spec(
        "s-max-lin",
        { en: "Max. weight with liquid nitrogen", uk: "Макс. маса з рідким азотом", ru: "Макс. масса с жидким азотом" },
        { en: `${num(m.maxLinKg, "en")} kg`, uk: `${num(m.maxLinKg, "uk")} кг`, ru: `${num(m.maxLinKg, "ru")} кг` },
        LABELS.groupSize,
      ),
      spec(
        "s-max-lox",
        { en: "Max. weight with liquid oxygen", uk: "Макс. маса з рідким киснем", ru: "Макс. масса с жидким кислородом" },
        { en: `${num(m.maxLoxKg, "en")} kg`, uk: `${num(m.maxLoxKg, "uk")} кг`, ru: `${num(m.maxLoxKg, "ru")} кг` },
        LABELS.groupSize,
      ),
      spec(
        "s-max-lar",
        { en: "Max. weight with liquid argon", uk: "Макс. маса з рідким аргоном", ru: "Макс. масса с жидким аргоном" },
        { en: `${num(m.maxLarKg, "en")} kg`, uk: `${num(m.maxLarKg, "uk")} кг`, ru: `${num(m.maxLarKg, "ru")} кг` },
        LABELS.groupSize,
      ),
    ],
    faq: [],
    price: m.priceEur,
    priceOnRequest: false,
    availability: "onRequest",
    currency: "EUR",
    seo: {
      metaTitle: {
        en: `${m.model}, ${litres(m.volume, "en")} liquid cylinder from ${formatEur(m.priceEur, "en")}`,
        uk: `Кріоциліндр ${m.model}, ${litres(m.volume, "uk")} — від ${formatEur(m.priceEur, "uk")}`,
        ru: `Криоцилиндр ${m.model}, ${litres(m.volume, "ru")} — от ${formatEur(m.priceEur, "ru")}`,
      },
      metaDescription: {
        en: `Cryogenic cylinder of ${litres(m.volume, "en")} for liquid nitrogen, oxygen and argon: ${bar(m.relief, "en")} valve, ${num(m.nerLin, "en", 1)}%/day boil-off, TPED. From ${formatEur(m.priceEur, "en")} excl. VAT.`,
        uk: `Кріоциліндр на ${litres(m.volume, "uk")} для рідкого азоту, кисню й аргону: клапан ${bar(m.relief, "uk")}, втрати ${num(m.nerLin, "uk", 1)}%/добу, TPED. Від ${formatEur(m.priceEur, "uk")} без ПДВ.`,
        ru: `Криоцилиндр на ${litres(m.volume, "ru")} для жидкого азота, кислорода и аргона: клапан ${bar(m.relief, "ru")}, потери ${num(m.nerLin, "ru", 1)}%/сутки, TPED. От ${formatEur(m.priceEur, "ru")} без НДС.`,
      },
      keywords: {
        en: `${m.model}, cryogenic cylinder ${m.volume} L, liquid nitrogen dewar ${m.volume} L`,
        uk: `${m.model}, кріоциліндр ${m.volume} л, дьюар для азоту ${m.volume} л, кріоциліндр ціна`,
        ru: `${m.model}, криоцилиндр ${m.volume} л, дьюар для азота ${m.volume} л, криоцилиндр цена`,
      },
    },
  };
}

export const cylinderCategories = CYLINDER_DEFS.map(buildCylinderCategory);
export const cylinderProducts = CRYO_CYLINDERS.map((model, index) =>
  buildCryoCylinderProduct(model, cylinderCategories[0], index),
);

/* ═══════════════════════════════════════════════════════════════════════
   Лабораторне обладнання для контролю якості CO₂
   ═══════════════════════════════════════════════════════════════════════ */

const LAB_TITLE: L = {
  en: "Laboratory and analytical equipment for CO₂ quality control (DSTU, ISBT, EIGA)",
  uk: "Лабораторне та аналітичне обладнання для контролю якості CO₂ за ДСТУ, ISBT та EIGA",
  ru: "Лабораторное и аналитическое оборудование для контроля качества CO₂ по ДСТУ, ISBT и EIGA",
};

const LAB_TEXT = {
  what: {
    en: "Carbon dioxide for beverages and food must meet the purity requirements of ISBT (International Society of Beverage Technologists), EIGA (European Industrial Gases Association) and the Ukrainian DSTU standards. That means controlling not only CO₂ purity but also moisture, dew point, oxygen, hydrocarbons, sulphur compounds, benzene and other trace impurities.",
    uk: "Діоксид вуглецю для напоїв і харчових продуктів має відповідати вимогам чистоти ISBT (International Society of Beverage Technologists), EIGA (European Industrial Gases Association) та українських ДСТУ. Це означає контроль не лише чистоти CO₂, а й вологи, точки роси, кисню, вуглеводнів, сірчистих сполук, бензолу та інших контрольованих домішок.",
    ru: "Диоксид углерода для напитков и пищевых продуктов должен соответствовать требованиям чистоты ISBT (International Society of Beverage Technologists), EIGA (European Industrial Gases Association) и украинских ДСТУ. Это означает контроль не только чистоты CO₂, но и влаги, точки росы, кислорода, углеводородов, сернистых соединений, бензола и других контролируемых примесей.",
  },
  who: {
    en: "We equip laboratories for CO₂ producers (including biogenic CO₂ recovery plants), breweries and soft-drink bottlers, food processors and dry ice manufacturers — from a basic incoming-inspection kit to a full analytical laboratory.",
    uk: "Ми комплектуємо лабораторії для виробників CO₂ (зокрема установок уловлювання біогенного CO₂), пивоварень і заводів безалкогольних напоїв, харчових підприємств та виробників сухого льоду — від базового комплекту вхідного контролю до повноцінної аналітичної лабораторії.",
    ru: "Мы комплектуем лаборатории для производителей CO₂ (в том числе установок улавливания биогенного CO₂), пивоварен и заводов безалкогольных напитков, пищевых предприятий и производителей сухого льда — от базового комплекта входного контроля до полноценной аналитической лаборатории.",
  },
  scope: [
    {
      en: "CO₂ purity analysers",
      uk: "Аналізатори чистоти CO₂",
      ru: "Анализаторы чистоты CO₂",
    },
    {
      en: "Dew point and moisture analysers",
      uk: "Аналізатори точки роси та вмісту вологи",
      ru: "Анализаторы точки росы и содержания влаги",
    },
    {
      en: "Oxygen, hydrocarbon and sulphur compound detectors",
      uk: "Детектори кисню, вуглеводнів та сірчистих сполук",
      ru: "Детекторы кислорода, углеводородов и сернистых соединений",
    },
    {
      en: "Sampling systems for liquid and gaseous CO₂",
      uk: "Системи відбору проб рідкого та газоподібного CO₂",
      ru: "Системы отбора проб жидкого и газообразного CO₂",
    },
    {
      en: "Calibration gases and consumables",
      uk: "Калібрувальні гази та витратні матеріали",
      ru: "Калибровочные газы и расходные материалы",
    },
  ] as L[],
};

const LAB_FAQ: Array<{ q: L; a: L }> = [
  {
    q: {
      en: "Which parameters must be checked for beverage-grade CO₂?",
      uk: "Які параметри треба контролювати для харчового CO₂?",
      ru: "Какие параметры нужно контролировать для пищевого CO₂?",
    },
    a: {
      en: "The ISBT and EIGA specifications set limits for purity (min. 99.9%), moisture, oxygen, carbon monoxide, total hydrocarbons, benzene, sulphur compounds, acetaldehyde and other trace impurities. We help define the mandatory set for your process and supply the corresponding analysers.",
      uk: "Специфікації ISBT та EIGA встановлюють межі для чистоти (мін. 99,9%), вологи, кисню, оксиду вуглецю, загальних вуглеводнів, бензолу, сірчистих сполук, ацетальдегіду та інших домішок. Ми допомагаємо визначити обовʼязковий набір для вашого процесу та постачаємо відповідні аналізатори.",
      ru: "Спецификации ISBT и EIGA устанавливают пределы для чистоты (мин. 99,9%), влаги, кислорода, оксида углерода, общих углеводородов, бензола, сернистых соединений, ацетальдегида и других примесей. Мы помогаем определить обязательный набор для вашего процесса и поставляем соответствующие анализаторы.",
    },
  },
  {
    q: {
      en: "Can you audit our existing CO₂ laboratory?",
      uk: "Чи можете ви провести аудит нашої лабораторії CO₂?",
      ru: "Можете ли вы провести аудит нашей лаборатории CO₂?",
    },
    a: {
      en: "Yes. Our engineers review the sampling points, the analyser set and the procedures against ISBT/EIGA requirements and propose what to add or replace.",
      uk: "Так. Наші інженери перевіряють точки відбору проб, набір аналізаторів і процедури на відповідність вимогам ISBT/EIGA та пропонують, що додати або замінити.",
      ru: "Да. Наши инженеры проверяют точки отбора проб, набор анализаторов и процедуры на соответствие требованиям ISBT/EIGA и предлагают, что добавить или заменить.",
    },
  },
];

export const labCategory: SeedCategory = {
  _id: "cat-co2-lab",
  _updatedAt: SEED_UPDATED_AT,
  title: LAB_TITLE,
  slug: slugs(
    "co2-quality-control-laboratory-equipment",
    "laboratorne-obladnannya-kontrolyu-yakosti-co2",
    "laboratornoe-oborudovanie-kontrolya-kachestva-co2",
  ),
  order: 80,
  isVisible: true,
  shortDescription: {
    en: "Supply of equipment for laboratory quality control of carbon dioxide (CO₂): CO₂ purity, dew point, moisture content and other controlled impurities. Laboratory setups for CO₂ producers, food plants and beverage manufacturers.",
    uk: "Постачання обладнання для лабораторного контролю якості діоксиду вуглецю (CO₂): визначення чистоти CO₂, точки роси, вмісту вологи та інших контрольованих домішок. Комплектація лабораторій для виробників CO₂, харчових підприємств і виробників напоїв.",
    ru: "Поставка оборудования для лабораторного контроля качества диоксида углерода (CO₂): определение чистоты CO₂, точки росы, содержания влаги и других контролируемых примесей. Комплектация лабораторий для производителей CO₂, пищевых предприятий и производителей напитков.",
  },
  description: blocks((lang) => [
    p(LAB_TEXT.what[lang], "cl"),
    p(LAB_TEXT.who[lang], "cl"),
    h2(SCOPE_HEADING[lang], "cl"),
    ...LAB_TEXT.scope.map((item) => li(item[lang], "cl")),
  ]),
  image: img(IMG.lab, {
    en: "Container laboratory for CO₂ quality control: analysers, sampling panel and workstation",
    uk: "Контейнерна лабораторія контролю якості CO₂: аналізатори, панель відбору проб і робоче місце",
    ru: "Контейнерная лаборатория контроля качества CO₂: анализаторы, панель отбора проб и рабочее место",
  }),
  faq: LAB_FAQ.map((item, index) => faq(`faq-lab-${index}`, item.q, item.a)),
  seo: {
    metaTitle: {
      en: "CO₂ quality control lab equipment — ISBT, EIGA",
      uk: "Обладнання контролю якості CO₂ — ISBT, EIGA",
      ru: "Оборудование контроля качества CO₂ — ISBT, EIGA",
    },
    metaDescription: {
            en: "Analysers for CO₂ purity, dew point, moisture and trace impurities to ISBT, EIGA and DSTU. Laboratory setups for breweries and bottling plants.",
      uk: "Аналізатори чистоти CO₂, точки роси, вологи та домішок за ISBT, EIGA і ДСТУ. Комплектація лабораторій для пивоварень і заводів напоїв.",
      ru: "Анализаторы чистоты CO₂, точки росы, влаги и примесей по ISBT, EIGA и ДСТУ. Комплектация лабораторий для пивоварен и заводов напитков.",
    },
    keywords: {
      en: "CO2 quality testing, CO2 purity analyser, ISBT CO2, EIGA CO2, beverage grade CO2",
      uk: "контроль якості CO2, аналізатор чистоти CO2, ISBT, EIGA, ДСТУ вуглекислота",
      ru: "контроль качества CO2, анализатор чистоты CO2, ISBT, EIGA, ДСТУ углекислота",
    },
  },
  productCount: 1,
};

export const labProduct: SeedProduct = {
  _id: "product-co2-lab-kit",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "CO₂ quality control laboratory kit (ISBT / EIGA / DSTU)",
    uk: "Комплект лабораторного контролю якості CO₂ (ISBT / EIGA / ДСТУ)",
    ru: "Комплект лабораторного контроля качества CO₂ (ISBT / EIGA / ДСТУ)",
  },
  slug: slugs(
    "co2-quality-control-laboratory-kit",
    "komplekt-laboratornogo-kontrolyu-yakosti-co2",
    "komplekt-laboratornogo-kontrolya-kachestva-co2",
  ),
  model: "LAB-CO2",
  sku: "LAB-CO2",
  isPublished: true,
  isFeatured: true,
  order: 800,
  publishedAt: SEED_UPDATED_AT,
  category: labCategory,
  gallery: [
    img(
      IMG.lab,
      {
        en: "CO₂ analysers, sampling panel and laboratory workstation inside a container laboratory",
        uk: "Аналізатори CO₂, панель відбору проб і робоче місце всередині контейнерної лабораторії",
        ru: "Анализаторы CO₂, панель отбора проб и рабочее место внутри контейнерной лаборатории",
      },
      "lab-1",
    ),
    img(
      IMG.engineer,
      {
        en: "Engineer taking a CO₂ sample at a storage tank",
        uk: "Інженер відбирає пробу CO₂ біля ємності зберігання",
        ru: "Инженер отбирает пробу CO₂ у ёмкости хранения",
      },
      "lab-2",
    ),
  ],
  shortDescription: {
    en: "A set of analysers and sampling equipment for controlling CO₂ purity, dew point, moisture and trace impurities to ISBT, EIGA and DSTU. Configured for the customer's product range and required parameters.",
    uk: "Набір аналізаторів та обладнання для відбору проб для контролю чистоти CO₂, точки роси, вологи та контрольованих домішок за ISBT, EIGA і ДСТУ. Комплектується під асортимент і потрібні параметри замовника.",
    ru: "Набор анализаторов и оборудования для отбора проб для контроля чистоты CO₂, точки росы, влаги и контролируемых примесей по ISBT, EIGA и ДСТУ. Комплектуется под ассортимент и нужные параметры заказчика.",
  },
  description: blocks((lang) => [
    p(LAB_TEXT.what[lang], "pl"),
    p(LAB_TEXT.who[lang], "pl"),
    h2(SCOPE_HEADING[lang], "pl"),
    ...LAB_TEXT.scope.map((item) => li(item[lang], "pl")),
  ]),
  features: [
    {
      en: "Parameter set matched to ISBT / EIGA / DSTU",
      uk: "Набір параметрів за ISBT / EIGA / ДСТУ",
      ru: "Набор параметров по ISBT / EIGA / ДСТУ",
    },
    {
      en: "Sampling from liquid and gaseous CO₂",
      uk: "Відбір проб рідкого та газоподібного CO₂",
      ru: "Отбор проб жидкого и газообразного CO₂",
    },
    {
      en: "Training of laboratory staff",
      uk: "Навчання персоналу лабораторії",
      ru: "Обучение персонала лаборатории",
    },
    {
      en: "Calibration gases and consumables supply",
      uk: "Постачання калібрувальних газів і витратних матеріалів",
      ru: "Поставка калибровочных газов и расходных материалов",
    },
  ],
  applications: [
    {
      en: "CO₂ producers and recovery plants",
      uk: "Виробники CO₂ та установки уловлювання",
      ru: "Производители CO₂ и установки улавливания",
    },
    {
      en: "Breweries and soft-drink bottlers",
      uk: "Пивоварні та заводи безалкогольних напоїв",
      ru: "Пивоварни и заводы безалкогольных напитков",
    },
    {
      en: "Food processing plants",
      uk: "Харчові підприємства",
      ru: "Пищевые предприятия",
    },
    {
      en: "Dry ice manufacturers",
      uk: "Виробники сухого льоду",
      ru: "Производители сухого льда",
    },
  ],
  specs: [
    spec(
      "s-std",
      { en: "Standards", uk: "Стандарти", ru: "Стандарты" },
      {
        en: "ISBT, EIGA, DSTU",
        uk: "ISBT, EIGA, ДСТУ",
        ru: "ISBT, EIGA, ДСТУ",
      },
      LABELS.groupMain,
    ),
    spec(
      "s-par",
      {
        en: "Controlled parameters",
        uk: "Контрольовані параметри",
        ru: "Контролируемые параметры",
      },
      {
        en: "CO₂ purity, dew point, moisture, O₂, hydrocarbons, sulphur compounds and other impurities",
        uk: "Чистота CO₂, точка роси, волога, O₂, вуглеводні, сірчисті сполуки та інші домішки",
        ru: "Чистота CO₂, точка росы, влага, O₂, углеводороды, сернистые соединения и другие примеси",
      },
      LABELS.groupMain,
    ),
    spec("s-cfg", LABELS.scope, LABELS.onRequest, LABELS.groupScope),
  ],
  faq: [],
  priceOnRequest: true,
  availability: "onRequest",
  currency: "EUR",
  seo: {
    // Варіант у сімействі однотипних товарів: хабом для пошуку є категорія.
    noIndex: true,
    metaTitle: {
      en: "CO₂ quality control laboratory kit",
      uk: "Комплект контролю якості CO₂ — ISBT / EIGA",
      ru: "Комплект контроля качества CO₂ — ISBT / EIGA",
    },
    metaDescription: {
            en: "Analysers and sampling equipment for CO₂ purity, dew point, moisture and impurities. Laboratory kits for CO₂ producers and beverage plants.",
      uk: "Аналізатори та обладнання для відбору проб: чистота CO₂, точка роси, волога, домішки. Комплекти лабораторій під ISBT і EIGA.",
      ru: "Анализаторы и оборудование для отбора проб: чистота CO₂, точка росы, влага, примеси. Комплекты лабораторий под ISBT и EIGA.",
    },
    keywords: {
      en: "CO2 analyser, CO2 dew point analyser, ISBT CO2 testing kit",
      uk: "аналізатор CO2, аналізатор точки роси CO2, лабораторія контролю CO2",
      ru: "анализатор CO2, анализатор точки росы CO2, лаборатория контроля CO2",
    },
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   Атмосферні випарники (газифікатори) LIN / LOX / LAR
   ═══════════════════════════════════════════════════════════════════════ */

const AMB_TEXT = {
  what: {
    en: "An ambient air vaporizer (gasifier) converts liquefied gas from a cryogenic tank into gas at the required pressure using only the heat of the surrounding air — no electricity or steam. Finned aluminium heat-exchange tubes absorb heat from the atmosphere, and the gas leaves at close to ambient temperature.",
    uk: "Атмосферний випарник (газифікатор) перетворює зріджений газ із кріогенної ємності на газ потрібного тиску, використовуючи лише тепло навколишнього повітря — без електроенергії чи пари. Оребрені алюмінієві теплообмінні труби забирають тепло з атмосфери, і газ виходить із температурою, близькою до температури повітря.",
    ru: "Атмосферный испаритель (газификатор) превращает сжиженный газ из криогенной ёмкости в газ нужного давления, используя только тепло окружающего воздуха — без электроэнергии или пара. Оребрённые алюминиевые теплообменные трубы забирают тепло из атмосферы, и газ выходит с температурой, близкой к температуре воздуха.",
  },
  selection: {
    en: "We select the vaporizer by gas type, required capacity (50–2000 kg/h), working pressure and operating conditions: continuous or peak consumption, winter temperatures, humidity and icing. For round-the-clock operation we design a duty/standby pair with automatic switch-over so the unit can defrost.",
    uk: "Ми підбираємо випарник за видом газу, необхідною продуктивністю (50–2000 кг/год), робочим тиском та умовами експлуатації: безперервне чи пікове споживання, зимові температури, вологість та обмерзання. Для цілодобової роботи проєктуємо пару робочий/резервний з автоматичним перемиканням, щоб апарат встигав відтанути.",
    ru: "Мы подбираем испаритель по виду газа, необходимой производительности (50–2000 кг/ч), рабочему давлению и условиям эксплуатации: непрерывное или пиковое потребление, зимние температуры, влажность и обмерзание. Для круглосуточной работы проектируем пару рабочий/резервный с автоматическим переключением, чтобы аппарат успевал оттаять.",
  },
};

const AMB_FAQ: Array<{ q: L; a: L }> = [
  {
    q: {
      en: "Why does the vaporizer ice up and what to do about it?",
      uk: "Чому випарник обмерзає і що з цим робити?",
      ru: "Почему испаритель обмерзает и что с этим делать?",
    },
    a: {
      en: "Frost is normal: moisture from the air freezes on the cold fins. Once the ice layer gets thick, heat transfer drops and the outlet gas gets too cold. The standard solution is two vaporizers working in turn (e.g. 8–12 hours each) or a unit sized with a reserve for continuous duty.",
      uk: "Іній — це норма: волога з повітря замерзає на холодних ребрах. Коли шар льоду стає товстим, теплообмін падає, а газ на виході стає надто холодним. Стандартне рішення — два випарники, що працюють по черзі (наприклад, по 8–12 годин), або апарат із запасом продуктивності для безперервної роботи.",
      ru: "Иней — это норма: влага из воздуха замерзает на холодных рёбрах. Когда слой льда становится толстым, теплообмен падает, а газ на выходе становится слишком холодным. Стандартное решение — два испарителя, работающих по очереди (например, по 8–12 часов), или аппарат с запасом производительности для непрерывной работы.",
    },
  },
  {
    q: {
      en: "Can one vaporizer be used for different gases?",
      uk: "Чи можна один випарник використовувати для різних газів?",
      ru: "Можно ли один испаритель использовать для разных газов?",
    },
    a: {
      en: "Nitrogen and argon vaporizers are interchangeable. Oxygen service requires a degreased, oxygen-clean unit, so an LOX vaporizer must be specified as such from the start.",
      uk: "Випарники для азоту й аргону взаємозамінні. Кисневий сервіс потребує знежиреного, чистого «під кисень» апарата, тому випарник для LOX треба замовляти саме як кисневий від початку.",
      ru: "Испарители для азота и аргона взаимозаменяемы. Кислородный сервис требует обезжиренного, чистого «под кислород» аппарата, поэтому испаритель для LOX нужно заказывать именно как кислородный с самого начала.",
    },
  },
];

export const ambientVaporizerCategory: SeedCategory = {
  _id: "cat-ambient-vaporizers",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Ambient air vaporizers (gasifiers) for liquid nitrogen, oxygen and argon 50–2000 kg/h",
    uk: "Атмосферні випарники (газифікатори) для рідкого азоту, кисню та аргону 50–2000 кг/год",
    ru: "Атмосферные испарители (газификаторы) для жидкого азота, кислорода и аргона 50–2000 кг/ч",
  },
  slug: slugs(
    "ambient-air-vaporizers",
    "atmosferni-vyparnyky-gazyfikatory",
    "atmosfernye-ispariteli-gazifikatory",
  ),
  order: 90,
  isVisible: true,
  shortDescription: {
    en: "Supply of ambient air vaporizers for gasifying LIN, LOX and LAR with capacities from 50 to 2000 kg/h. Vaporizer selection by gas type, required capacity, working pressure and operating conditions.",
    uk: "Постачання атмосферних випарників для газифікації LIN, LOX та LAR продуктивністю від 50 до 2000 кг/год. Підбір випарника за видом газу, необхідною продуктивністю, робочим тиском та умовами експлуатації.",
    ru: "Поставка атмосферных испарителей для газификации LIN, LOX и LAR производительностью от 50 до 2000 кг/ч. Подбор испарителя по виду газа, необходимой производительности, рабочему давлению и условиям эксплуатации.",
  },
  description: blocks((lang) => [
    p(AMB_TEXT.what[lang], "ca"),
    h2(SELECTION_HEADING[lang], "ca"),
    p(AMB_TEXT.selection[lang], "ca"),
    h2(SCOPE_HEADING[lang], "ca"),
    li(
      {
        en: "Ambient vaporizer 50–2000 kg/h for LIN, LOX or LAR",
        uk: "Атмосферний випарник 50–2000 кг/год для LIN, LOX або LAR",
        ru: "Атмосферный испаритель 50–2000 кг/ч для LIN, LOX или LAR",
      }[lang],
      "ca",
    ),
    li(
      {
        en: "Pressure regulator and safety valves at the outlet",
        uk: "Регулятор тиску та запобіжні клапани на виході",
        ru: "Регулятор давления и предохранительные клапаны на выходе",
      }[lang],
      "ca",
    ),
    li(
      {
        en: "Automatic duty/standby switch-over (optional)",
        uk: "Автоматичне перемикання робочий/резервний (опція)",
        ru: "Автоматическое переключение рабочий/резервный (опция)",
      }[lang],
      "ca",
    ),
    li(
      {
        en: "Installation and tie-in to the tank and pipeline",
        uk: "Монтаж та підключення до ємності й трубопроводу",
        ru: "Монтаж и подключение к ёмкости и трубопроводу",
      }[lang],
      "ca",
    ),
  ]),
  image: img(IMG.ambientRange, {
    en: "Ambient air vaporizers of different capacities for liquid nitrogen, oxygen and argon",
    uk: "Атмосферні випарники різної продуктивності для рідкого азоту, кисню та аргону",
    ru: "Атмосферные испарители разной производительности для жидкого азота, кислорода и аргона",
  }),
  faq: AMB_FAQ.map((item, index) => faq(`faq-amb-${index}`, item.q, item.a)),
  seo: {
    metaTitle: {
      en: "Ambient air vaporizers 50–2000 kg/h",
      uk: "Атмосферні випарники азоту, кисню, аргону",
      ru: "Атмосферные испарители азота, кислорода, аргона",
    },
    metaDescription: {
            en: "Ambient air vaporizers for liquid nitrogen, oxygen and argon, 50–2000 kg/h. Selection by gas, capacity, pressure and climate; supply in Ukraine.",
      uk: "Атмосферні випарники для рідкого азоту, кисню та аргону, 50–2000 кг/год. Підбір за газом, продуктивністю, тиском і кліматом.",
      ru: "Атмосферные испарители для жидкого азота, кислорода и аргона, 50–2000 кг/ч. Подбор по газу, производительности, давлению и климату.",
    },
    keywords: {
      en: "ambient air vaporizer, LIN vaporizer, LOX vaporizer, cryogenic gasifier",
      uk: "атмосферний випарник, газифікатор рідкого азоту, випарник кисню, випарник аргону",
      ru: "атмосферный испаритель, газификатор жидкого азота, испаритель кислорода, испаритель аргона",
    },
  },
  productCount: 3,
};

function buildAmbientVaporizerProduct(gas: GasKey, index: number): SeedProduct {
  const g = GASES[gas];
  const gasShort = {
    en: g.nom.en,
    uk: g.gen.uk.split(" (")[0],
    ru: g.gen.ru.split(" (")[0],
  };
  const title: L = {
    en: `Ambient air vaporizer for ${g.nom.en} 50–2000 kg/h`,
    uk: `Атмосферний випарник для ${gasShort.uk} 50–2000 кг/год`,
    ru: `Атмосферный испаритель для ${gasShort.ru} 50–2000 кг/ч`,
  };
  const sku = `AV-${gas.toUpperCase()}`;
  const slugTail = {
    n2: ["liquid-nitrogen", "azotu", "azota"],
    o2: ["liquid-oxygen", "kysnyu", "kisloroda"],
    ar: ["liquid-argon", "argonu", "argona"],
    co2: ["co2", "co2", "co2"],
  }[gas];
  return {
    _id: `product-ambient-vaporizer-${gas}`,
    _updatedAt: SEED_UPDATED_AT,
    title,
    slug: slugs(
      `ambient-air-vaporizer-${slugTail[0]}`,
      `atmosfernyi-vyparnyk-ridkogo-${slugTail[1]}`,
      `atmosfernyi-isparitel-zhidkogo-${slugTail[2]}`,
    ),
    model: sku,
    sku,
    isPublished: true,
    isFeatured: false,
    order: 900 + index,
    publishedAt: SEED_UPDATED_AT,
    category: ambientVaporizerCategory,
    gallery: [
      img(
        IMG.ambientRange,
        {
          en: `Ambient air vaporizers for ${g.nom.en} — finned heat-exchange tubes, capacities from 50 to 2000 kg/h`,
          uk: `Атмосферні випарники для ${gasShort.uk} — оребрені теплообмінні труби, продуктивність від 50 до 2000 кг/год`,
          ru: `Атмосферные испарители для ${gasShort.ru} — оребрённые теплообменные трубы, производительность от 50 до 2000 кг/ч`,
        },
        `av-${gas}-1`,
      ),
      img(
        IMG.tankWithVaporizer,
        {
          en: `Ambient vaporizer connected to a cryogenic tank for ${g.nom.en} on site`,
          uk: `Атмосферний випарник, підключений до кріогенної ємності для ${gasShort.uk} на обʼєкті`,
          ru: `Атмосферный испаритель, подключённый к криогенной ёмкости для ${gasShort.ru} на объекте`,
        },
        `av-${gas}-2`,
      ),
    ],
    shortDescription: {
      en: `Ambient air vaporizer for gasifying ${g.gen.en} with a capacity of 50 to 2000 kg/h, selected for the working pressure and operating conditions of your site.${gas === "o2" ? " Supplied oxygen-clean." : ""}`,
      uk: `Атмосферний випарник для газифікації ${g.gen.uk} продуктивністю від 50 до 2000 кг/год, підібраний під робочий тиск та умови експлуатації вашого майданчика.${gas === "o2" ? " Постачається знежиреним для кисневого сервісу." : ""}`,
      ru: `Атмосферный испаритель для газификации ${g.gen.ru} производительностью от 50 до 2000 кг/ч, подобранный под рабочее давление и условия эксплуатации вашей площадки.${gas === "o2" ? " Поставляется обезжиренным для кислородного сервиса." : ""}`,
    },
    description: blocks((lang) => [
      p(AMB_TEXT.what[lang], `pa-${gas}`),
      p(g.storageNote[lang], `pa-${gas}`),
      h2(SELECTION_HEADING[lang], `pa-${gas}`),
      p(AMB_TEXT.selection[lang], `pa-${gas}`),
    ]),
    features: [
      {
        en: "No electricity or steam required",
        uk: "Не потребує електроенергії чи пари",
        ru: "Не требует электроэнергии или пара",
      },
      {
        en: "Capacity range 50–2000 kg/h",
        uk: "Діапазон продуктивності 50–2000 кг/год",
        ru: "Диапазон производительности 50–2000 кг/ч",
      },
      {
        en: "Duty/standby configuration for 24/7 operation",
        uk: "Схема робочий/резервний для роботи 24/7",
        ru: "Схема рабочий/резервный для работы 24/7",
      },
      {
        en: "Finned aluminium heat-exchange tubes",
        uk: "Оребрені алюмінієві теплообмінні труби",
        ru: "Оребрённые алюминиевые теплообменные трубы",
      },
    ],
    applications: g.applications,
    specs: [
      spec("s-gas", LABELS.gases, g.gen, LABELS.groupMain),
      spec(
        "s-cap",
        LABELS.capacity,
        { en: "50–2000 kg/h", uk: "50–2000 кг/год", ru: "50–2000 кг/ч" },
        LABELS.groupMain,
      ),
      spec(
        "s-heat",
        { en: "Heat source", uk: "Джерело тепла", ru: "Источник тепла" },
        {
          en: "Ambient air",
          uk: "Навколишнє повітря",
          ru: "Окружающий воздух",
        },
        LABELS.groupMain,
      ),
      spec(
        "s-press",
        { en: "Working pressure", uk: "Робочий тиск", ru: "Рабочее давление" },
        LABELS.onRequest,
        LABELS.groupMain,
      ),
    ],
    faq: [],
    priceOnRequest: true,
    availability: "onRequest",
    currency: "EUR",
    seo: {
      metaTitle: {
        en: `Ambient air vaporizer for ${g.nom.en}`,
        uk: `Атмосферний випарник для ${gasShort.uk}`,
        ru: `Атмосферный испаритель для ${gasShort.ru}`,
      },
      metaDescription: {
        en: `Ambient air vaporizer for ${g.gen.en}, 50–2000 kg/h, selected for pressure and climate. Supply, installation and tie-in to the tank.`,
        uk: `Атмосферний випарник для ${g.gen.uk}, 50–2000 кг/год, підбір під тиск і клімат. Постачання, монтаж і підключення до кріогенної ємності по Україні.`,
        ru: `Атмосферный испаритель для ${g.gen.ru}, 50–2000 кг/ч, подбор под давление и климат. Поставка, монтаж и подключение к криогенной ёмкости по Украине.`,
      },
      keywords: {
        en: `ambient vaporizer ${g.nom.en}, ${g.nom.en} gasifier`,
        uk: `атмосферний випарник ${gasShort.uk}, газифікатор ${gasShort.uk}`,
        ru: `атмосферный испаритель ${gasShort.ru}, газификатор ${gasShort.ru}`,
      },
    },
  };
}

export const ambientVaporizerProducts = (["n2", "o2", "ar"] as GasKey[]).map(
  buildAmbientVaporizerProduct,
);

/* ═══════════════════════════════════════════════════════════════════════
   Випарники CO₂ P…E, 130–1000 кг/год
   ═══════════════════════════════════════════════════════════════════════ */

const CO2V_TEXT = {
  what: {
    en: "A CO₂ vaporizer converts liquid carbon dioxide from a storage tank into gas at the pressure and temperature the process needs. Unlike air gases, CO₂ is stored at around −20 °C and would freeze into dry ice if depressurised without heat, so CO₂ vaporizers are usually electric or water/steam-heated with temperature control at the outlet.",
    uk: "Випарник CO₂ перетворює рідкий діоксид вуглецю з ємності зберігання на газ із тиском і температурою, потрібними для процесу. На відміну від газів повітря, CO₂ зберігається за температури близько −20 °C і без підведення тепла при скиданні тиску перетворився б на сухий лід, тому випарники CO₂ зазвичай електричні або з водяним/паровим обігрівом та контролем температури на виході.",
    ru: "Испаритель CO₂ превращает жидкий диоксид углерода из ёмкости хранения в газ с давлением и температурой, нужными для процесса. В отличие от газов воздуха, CO₂ хранится при температуре около −20 °C и без подвода тепла при сбросе давления превратился бы в сухой лёд, поэтому испарители CO₂ обычно электрические или с водяным/паровым обогревом и контролем температуры на выходе.",
  },
  who: {
    en: "Typical customers are greenhouse complexes that enrich the air with CO₂, beverage plants and bottling lines, food processors using CO₂ for packaging and chilling, and industrial sites with CO₂ in water treatment or welding. We size the vaporizer for peak consumption and integrate it into the CO₂ supply system together with the tank, pressure-reducing unit and piping.",
    uk: "Типові замовники — тепличні господарства, які підживлюють повітря CO₂, заводи напоїв і лінії розливу, харчові підприємства, що використовують CO₂ для пакування та охолодження, а також промислові майданчики з CO₂ у водопідготовці чи зварюванні. Ми розраховуємо випарник на пікове споживання та інтегруємо його в систему газопостачання CO₂ разом із ємністю, редукційним вузлом і трубопроводами.",
    ru: "Типичные заказчики — тепличные хозяйства, которые подкармливают воздух CO₂, заводы напитков и линии розлива, пищевые предприятия, использующие CO₂ для упаковки и охлаждения, а также промышленные площадки с CO₂ в водоподготовке или сварке. Мы рассчитываем испаритель на пиковое потребление и интегрируем его в систему газоснабжения CO₂ вместе с ёмкостью, редукционным узлом и трубопроводами.",
  },
  standard: {
    en: "Every model is the Standard P version: stainless steel housing, PLC control, protection against liquid carry-over and against dry ice formation. CE marking, notified body — TÜV NORD, 24-month warranty.",
    uk: "Усі моделі — виконання Standard P: корпус із нержавіючої сталі, керування PLC-контролером, захист від переливу рідкої фази та від утворення сухого льоду. Маркування CE, нотифікований орган — TÜV NORD, гарантія 24 місяці.",
    ru: "Все модели — исполнение Standard P: корпус из нержавеющей стали, управление PLC-контроллером, защита от перелива жидкой фазы и от образования сухого льда. Маркировка CE, нотифицированный орган — TÜV NORD, гарантия 24 месяца.",
  },
};

/** Підбір за піком із запасом 20–25%: межі піку = продуктивність / 1,25. */
const CO2V_TIERS: Record<number, { peak: L; site: L }> = {
  130: {
    peak: { en: "up to 100 kg/h", uk: "до 100 кг/год", ru: "до 100 кг/ч" },
    site: {
      en: "greenhouse up to 2 ha, brewery, small bottling line, welding shop with dozens of posts",
      uk: "теплиця до 2 га, пивоварня, невелика лінія розливу, зварювальний цех на десятки постів",
      ru: "теплица до 2 га, пивоварня, небольшая линия розлива, сварочный цех на десятки постов",
    },
  },
  270: {
    peak: { en: "100–215 kg/h", uk: "100–215 кг/год", ru: "100–215 кг/ч" },
    site: {
      en: "greenhouse up to 3.5 ha, mid-size beverage plant",
      uk: "теплиця до 3,5 га, середній завод напоїв",
      ru: "теплица до 3,5 га, средний завод напитков",
    },
  },
  400: {
    peak: { en: "215–320 kg/h", uk: "215–320 кг/год", ru: "215–320 кг/ч" },
    site: {
      en: "greenhouse up to 5 ha, plant with several filling lines, food production",
      uk: "теплиця до 5 га, завод із кількома лініями розливу, харчове виробництво",
      ru: "теплица до 5 га, завод с несколькими линиями розлива, пищевое производство",
    },
  },
  650: {
    peak: { en: "320–520 kg/h", uk: "320–520 кг/год", ru: "320–520 кг/ч" },
    site: {
      en: "greenhouse complex up to 8 ha, large food plant",
      uk: "тепличний комплекс до 8 га, велике харчове виробництво",
      ru: "тепличный комплекс до 8 га, крупное пищевое производство",
    },
  },
  1000: {
    peak: { en: "520–800 kg/h", uk: "520–800 кг/год", ru: "520–800 кг/ч" },
    site: {
      en: "large greenhouse complex, multi-line beverage plant",
      uk: "великий тепличний комплекс, багатолінійний завод напоїв",
      ru: "крупный тепличный комплекс, многолинейный завод напитков",
    },
  },
};

const kgh = (value: number, lang: keyof L) =>
  `${num(value, lang)} ${{ en: "kg/h", uk: "кг/год", ru: "кг/ч" }[lang]}`;

const MOUNTING: Record<Co2VaporizerModel["mounting"], { label: L; value: L }> = {
  wallOrFloor: {
    label: { en: "Mounting", uk: "Монтаж", ru: "Монтаж" },
    value: { en: "wall or floor", uk: "підвісний / підлоговий", ru: "подвесной / напольный" },
  },
  legs: {
    label: { en: "Legs", uk: "Ніжки", ru: "Ножки" },
    value: { en: "removable", uk: "знімні", ru: "съёмные" },
  },
};

const CO2V_MIN_PRICE = Math.min(...CO2_VAPORIZERS.map((m) => m.priceEur));
const co2TanksPath = (lang: keyof L) =>
  localePath(lang, `/catalog/category/${CO2_TANK_CATEGORY_SLUG[lang]}`);

const CO2V_FAQ: Array<{ q: L; a: L }> = [
  {
    q: {
      en: "How to choose the vaporizer capacity?",
      uk: "Як обрати продуктивність випарника?",
      ru: "Как выбрать производительность испарителя?",
    },
    a: {
      en: "Take the peak hourly CO₂ consumption of all consumers running at once and add a 20–25% reserve. For greenhouses the peak is during daytime enrichment; for bottling lines it is the sum of carbonation and packaging demand. We calculate it from your process data.",
      uk: "Візьміть пікове годинне споживання CO₂ всіма споживачами одночасно і додайте 20–25% запасу. Для теплиць пік припадає на денне підживлення; для ліній розливу — це сума потреб карбонізації та пакування. Ми розраховуємо це за даними вашого процесу.",
      ru: "Возьмите пиковое часовое потребление CO₂ всеми потребителями одновременно и добавьте 20–25% запаса. Для теплиц пик приходится на дневную подкормку; для линий розлива — это сумма потребностей карбонизации и упаковки. Мы рассчитываем это по данным вашего процесса.",
    },
  },
  {
    q: {
      en: "Electric or ambient vaporizer for CO₂?",
      uk: "Електричний чи атмосферний випарник для CO₂?",
      ru: "Электрический или атмосферный испаритель для CO₂?",
    },
    a: {
      en: "Ambient vaporizers work for CO₂ only in warm climates and at low take-off rates. For stable operation all year round in Ukraine, especially at 300 kg/h and above, an electric or water-heated vaporizer with outlet temperature control is the standard choice.",
      uk: "Атмосферні випарники працюють для CO₂ лише в теплому кліматі та за малого відбору. Для стабільної роботи цілий рік в Україні, особливо від 300 кг/год, стандартний вибір — електричний або водяний випарник із контролем температури на виході.",
      ru: "Атмосферные испарители работают для CO₂ только в тёплом климате и при малом отборе. Для стабильной работы круглый год в Украине, особенно от 300 кг/ч, стандартный выбор — электрический или водяной испаритель с контролем температуры на выходе.",
    },
  },
  {
    q: {
      en: "Can I buy a vaporizer without a tank?",
      uk: "Чи можна купити випарник без ємності?",
      ru: "Можно ли купить испаритель без ёмкости?",
    },
    a: {
      en: "Yes, any model can be ordered on its own. Turnkey installation is done for systems we supply ourselves: tank, vaporizer and pipelines.",
      uk: "Так, будь-яку модель можна замовити окремо. Монтаж під ключ робимо для системи, яку постачаємо самі: ємність, випарник і трубопроводи.",
      ru: "Да, любую модель можно заказать отдельно. Монтаж под ключ делаем для системы, которую поставляем сами: ёмкость, испаритель и трубопроводы.",
    },
  },
];

export const co2VaporizerCategory: SeedCategory = {
  _id: "cat-co2-vaporizers",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Vaporizers (gasifiers) for liquid CO₂ — 130–1000 kg/h",
    uk: "Випарники (газифікатори) для рідкого CO₂ — 130–1000 кг/год",
    ru: "Испарители (газификаторы) для жидкого CO₂ — 130–1000 кг/ч",
  },
  slug: slugs("co2-vaporizers", "vyparnyky-co2", "ispariteli-co2"),
  order: 100,
  isVisible: true,
  shortDescription: {
    en: `Industrial vaporizers for gasifying liquid carbon dioxide: five models from 130 to 1,000 kg/h, stainless steel housing, PLC control, protection against liquid carry-over and dry ice formation, CE, TÜV NORD. Prices ${priceFrom(CO2V_MIN_PRICE, "en")}. Selection, supply, installation and integration into the CO₂ system.`,
    uk: `Промислові випарники для газифікації рідкого діоксиду вуглецю (вуглекислоти): пʼять моделей від 130 до 1 000 кг/год, корпус із нержавіючої сталі, PLC-керування, захист від переливу рідкої фази й утворення сухого льоду, CE, TÜV NORD. Ціни ${priceFrom(CO2V_MIN_PRICE, "uk")}. Підбір, постачання, монтаж та інтеграція в систему CO₂.`,
    ru: `Промышленные испарители для газификации жидкого диоксида углерода (углекислоты): пять моделей от 130 до 1 000 кг/ч, корпус из нержавеющей стали, PLC-управление, защита от перелива жидкой фазы и образования сухого льда, CE, TÜV NORD. Цены ${priceFrom(CO2V_MIN_PRICE, "ru")}. Подбор, поставка, монтаж и интеграция в систему CO₂.`,
  },
  description: blocks((lang) => [
    p(CO2V_TEXT.what[lang], "cv"),
    p(CO2V_TEXT.who[lang], "cv"),
    h2({ en: "Models and prices", uk: "Моделі та ціни", ru: "Модели и цены" }[lang], "cv"),
    table(
      [
        {
          en: "Model | Capacity, kg/h | Mounting | Price from, € excl. VAT",
          uk: "Модель | Продуктивність, кг/год | Монтаж | Ціна від, € без ПДВ",
          ru: "Модель | Производительность, кг/ч | Монтаж | Цена от, € без НДС",
        }[lang],
        ...CO2_VAPORIZERS.map(
          (m) =>
            `${m.model} | ${num(m.capacity, lang)} | ${m.mounting === "legs" ? { en: "removable legs", uk: "знімні ніжки", ru: "съёмные ножки" }[lang] : MOUNTING.wallOrFloor.value[lang]} | ${num(m.priceEur, lang)}`,
        ),
      ],
      {
        en: "Standard P version, stainless steel housing, 24-month warranty",
        uk: "Виконання Standard P, корпус із нержавіючої сталі, гарантія 24 місяці",
        ru: "Исполнение Standard P, корпус из нержавеющей стали, гарантия 24 месяца",
      },
      "cv",
    ),
    p(CO2V_TEXT.standard[lang], "cv"),
    p(
      {
        en: "The standard package of the P130E/1W includes solenoid and safety valves, a mounting kit with an inlet filter and counter-flanges, temperature sensors and a pressure transmitter.",
        uk: "У стандартну комплектацію P130E/1W входять електромагнітні та запобіжні клапани, монтажний комплект із вхідним фільтром і контрфланцями, датчики температури та перетворювач тиску.",
        ru: "В стандартную комплектацию P130E/1W входят электромагнитные и предохранительные клапаны, монтажный комплект с входным фильтром и контрфланцами, датчики температуры и преобразователь давления.",
      }[lang],
      "cv",
    ),
    h2(
      {
        en: "How to choose the capacity",
        uk: "Як підібрати продуктивність",
        ru: "Как подобрать производительность",
      }[lang],
      "cv",
    ),
    p(
      {
        en: "A vaporizer — often called a gasifier — is sized to the peak draw, not the monthly average: a filling line start-up, morning dosing across a whole greenhouse or every welding post striking an arc at once. Allow 20–25% over the measured peak.",
        uk: "Випарник — його часто називають газифікатором — підбирають під піковий, а не середньомісячний відбір: запуск лінії розливу, ранкове дозування на всій площі теплиці чи всі зварювальні пости одночасно. Закладайте 20–25% понад виміряний пік.",
        ru: "Испаритель — его часто называют газификатором — подбирают под пиковый, а не среднемесячный отбор: запуск линии розлива, утреннее дозирование на всей площади теплицы или все сварочные посты одновременно. Закладывайте 20–25% сверх измеренного пика.",
      }[lang],
      "cv",
    ),
    table(
      [
        {
          en: "Peak draw | Model | Typical site",
          uk: "Пікова витрата | Модель | Типовий обʼєкт",
          ru: "Пиковый расход | Модель | Типовой объект",
        }[lang],
        ...CO2_VAPORIZERS.map(
          (m) =>
            `${CO2V_TIERS[m.capacity].peak[lang]} | ${m.model}, ${kgh(m.capacity, lang)} | ${CO2V_TIERS[m.capacity].site[lang]}`,
        ),
      ],
      {
        en: "Selection by peak, with a 20–25% margin",
        uk: "Підбір за піком із запасом 20–25%",
        ru: "Подбор по пику с запасом 20–25%",
      },
      "cv",
    ),
    p(
      {
        en: `A vaporizer can be bought on its own or as part of a system with a [liquid CO₂ tank](${co2TanksPath("en")}). We have installed gasifiers of 1,000 and 250 kg/h at a beverage plant and a greenhouse business — see [our projects](${localePath("en", "/projects")}).`,
        uk: `Випарник можна купити окремо або в системі з [ємністю для рідкого CO₂](${co2TanksPath("uk")}). Газифікатори на 1 000 і 250 кг/год ми монтували на заводі напоїв і в тепличному господарстві — див. [реалізовані проєкти](${localePath("uk", "/projects")}).`,
        ru: `Испаритель можно купить отдельно или в системе с [ёмкостью для жидкого CO₂](${co2TanksPath("ru")}). Газификаторы на 1 000 и 250 кг/ч мы монтировали на заводе напитков и в тепличном хозяйстве — см. [реализованные проекты](${localePath("ru", "/projects")}).`,
      }[lang],
      "cv",
    ),
    h2(
      {
        en: "Winter operation",
        uk: "Робота взимку",
        ru: "Работа зимой",
      }[lang],
      "cv",
    ),
    p(
      {
        en: "An ambient vaporizer takes heat from the air: in frost it ices over and loses capacity just when greenhouses and heated plants consume the most. The P…E models are controlled by a PLC with temperature sensors and a pressure transmitter, and their protection against liquid carry-over and dry ice formation keeps liquid and dry ice out of the pipeline.",
        uk: "Атмосферний випарник бере тепло з повітря: у мороз він обмерзає й втрачає продуктивність саме тоді, коли теплиці й опалювані виробництва споживають найбільше. Моделі P…E керуються PLC-контролером із датчиками температури й тиску, а захист від переливу рідкої фази та утворення сухого льоду не пускає рідину й сухий лід далі в трубопровід.",
        ru: "Атмосферный испаритель берёт тепло из воздуха: в мороз он обмерзает и теряет производительность именно тогда, когда теплицы и отапливаемые производства потребляют больше всего. Модели P…E управляются PLC-контроллером с датчиками температуры и давления, а защита от перелива жидкой фазы и образования сухого льда не пускает жидкость и сухой лёд дальше в трубопровод.",
      }[lang],
      "cv",
    ),
  ]),
  image: img(IMG.co2Greenhouse, {
    en: "CO₂ vaporizer installed in a greenhouse for carbon dioxide enrichment",
    uk: "Випарник CO₂, встановлений у теплиці для вуглекислотного підживлення",
    ru: "Испаритель CO₂, установленный в теплице для углекислотной подкормки",
  }),
  faq: CO2V_FAQ.map((item, index) => faq(`faq-co2v-${index}`, item.q, item.a)),
  seo: {
    metaTitle: {
      en: `CO₂ vaporizers 130–1000 kg/h — from ${formatEur(CO2V_MIN_PRICE, "en")}`,
      uk: `Випарники CO₂ 130–1000 кг/год — ціни від ${formatEur(CO2V_MIN_PRICE, "uk")}`,
      ru: `Испарители CO₂ 130–1000 кг/ч — цены от ${formatEur(CO2V_MIN_PRICE, "ru")}`,
    },
    metaDescription: {
      en: `Five liquid CO₂ gasifier models, 130–1,000 kg/h: PLC, dry ice protection, TÜV NORD, 24-month warranty. ${cap(priceFrom(CO2V_MIN_PRICE, "en"))}.`,
      uk: `Пʼять моделей газифікаторів рідкої вуглекислоти на 130–1 000 кг/год: PLC, захист від сухого льоду, TÜV NORD, гарантія 24 міс. ${cap(priceFrom(CO2V_MIN_PRICE, "uk"))}.`,
      ru: `Пять моделей газификаторов жидкой углекислоты на 130–1 000 кг/ч: PLC, защита от сухого льда, TÜV NORD, гарантия 24 мес. ${cap(priceFrom(CO2V_MIN_PRICE, "ru"))}.`,
    },
    keywords: {
      en: "CO2 vaporizer, CO2 gasifier price, electric CO2 vaporizer, CO2 vaporizer 1000 kg/h",
      uk: "випарник CO2, газифікатор вуглекислоти, газифікатор CO2 ціна, випарник вуглекислоти для теплиць",
      ru: "испаритель CO2, газификатор углекислоты, газификатор CO2 цена, испаритель углекислоты для теплиц",
    },
  },
  productCount: CO2_VAPORIZERS.length,
};

function buildCo2VaporizerProduct(
  m: Co2VaporizerModel,
  index: number,
): SeedProduct {
  const k = `pv-${m.capacity}`;
  const title: L = {
    en: `CO₂ vaporizer ${m.model} — ${kgh(m.capacity, "en")}`,
    uk: `Випарник CO₂ ${m.model} — ${kgh(m.capacity, "uk")}`,
    ru: `Испаритель CO₂ ${m.model} — ${kgh(m.capacity, "ru")}`,
  };
  const tier = CO2V_TIERS[m.capacity];
  const projectPhoto =
    m.capacity >= 650
      ? img(
          "/images/projects/beverages-co2-vaporizers-1000-kg-h.webp",
          {
            en: "1,000 kg/h CO₂ gasifier on the process platform of a beverage plant",
            uk: "Газифікатор CO₂ на 1 000 кг/год на технологічному майданчику заводу напоїв",
            ru: "Газификатор CO₂ на 1 000 кг/ч на технологической площадке завода напитков",
          },
          `${k}-3`,
        )
      : img(
          "/images/projects/flower-greenhouse-co2-vaporizer-250-kg-h.webp",
          {
            en: "250 kg/h CO₂ vaporizer installed for a flower greenhouse",
            uk: "Випарник CO₂ на 250 кг/год, змонтований для квіткової теплиці",
            ru: "Испаритель CO₂ на 250 кг/ч, смонтированный для цветочной теплицы",
          },
          `${k}-3`,
        );

  return {
    _id: `product-co2-vaporizer-${m.capacity}`,
    _updatedAt: SEED_UPDATED_AT,
    title,
    // Для 1000 кг/год slug не змінився; старі 100…800 ведуть сюди через legacyRedirects
    slug: slugs(
      `co2-vaporizer-${m.capacity}-kg-h`,
      `vyparnyk-co2-${m.capacity}-kg-god`,
      `isparitel-co2-${m.capacity}-kg-ch`,
    ),
    model: m.model,
    sku: m.model.replace("/", "-"),
    isPublished: true,
    isFeatured: Boolean(m.isFeatured),
    order: 1000 + index,
    publishedAt: SEED_UPDATED_AT,
    category: co2VaporizerCategory,
    gallery: [
      img(
        IMG.co2Fans,
        {
          en: `${title.en} — industrial vaporizer with fans and a control cabinet`,
          uk: `${title.uk} — промисловий випарник із вентиляторами та шафою керування`,
          ru: `${title.ru} — промышленный испаритель с вентиляторами и шкафом управления`,
        },
        `${k}-1`,
      ),
      img(
        IMG.co2Greenhouse,
        {
          en: "CO₂ vaporizer mounted in a greenhouse for carbon dioxide enrichment",
          uk: "Випарник CO₂, змонтований у теплиці для вуглекислотного підживлення",
          ru: "Испаритель CO₂, смонтированный в теплице для углекислотной подкормки",
        },
        `${k}-2`,
      ),
      projectPhoto,
    ],
    shortDescription: {
      en: `Industrial liquid CO₂ vaporizer ${m.model}: ${kgh(m.capacity, "en")}, stainless steel housing, PLC, protection against liquid carry-over and dry ice formation, TÜV NORD. Price ${priceFrom(m.priceEur, "en")}.`,
      uk: `Промисловий випарник рідкої вуглекислоти ${m.model}: ${kgh(m.capacity, "uk")}, корпус із нержавіючої сталі, PLC, захист від переливу рідкої фази й утворення сухого льоду, TÜV NORD. Ціна ${priceFrom(m.priceEur, "uk")}.`,
      ru: `Промышленный испаритель жидкой углекислоты ${m.model}: ${kgh(m.capacity, "ru")}, корпус из нержавеющей стали, PLC, защита от перелива жидкой фазы и образования сухого льда, TÜV NORD. Цена ${priceFrom(m.priceEur, "ru")}.`,
    },
    description: blocks((lang) => [
      p(m.note[lang], k),
      p(
        {
          en: `Sized for a peak draw of ${tier.peak.en}: ${tier.site.en}.`,
          uk: `Розрахований на пікову витрату ${tier.peak.uk}: ${tier.site.uk}.`,
          ru: `Рассчитан на пиковый расход ${tier.peak.ru}: ${tier.site.ru}.`,
        }[lang],
        k,
      ),
      h2({ en: "Design and protection", uk: "Виконання й захист", ru: "Исполнение и защита" }[lang], k),
      li({ en: "Standard P version, stainless steel housing", uk: "Виконання Standard P, корпус із нержавіючої сталі", ru: "Исполнение Standard P, корпус из нержавеющей стали" }[lang], k),
      li({ en: "PLC controller", uk: "PLC-контролер", ru: "PLC-контроллер" }[lang], k),
      li({ en: "Protection against liquid carry-over", uk: "Захист від переливу рідкої фази", ru: "Защита от перелива жидкой фазы" }[lang], k),
      li({ en: "Protection against dry ice formation", uk: "Захист від утворення сухого льоду", ru: "Защита от образования сухого льда" }[lang], k),
      li(`${cap(MOUNTING[m.mounting].label[lang])}: ${MOUNTING[m.mounting].value[lang]}`, k),
      li({ en: "CE marking, notified body TÜV NORD, 24-month warranty", uk: "Маркування CE, нотифікований орган TÜV NORD, гарантія 24 місяці", ru: "Маркировка CE, нотифицированный орган TÜV NORD, гарантия 24 месяца" }[lang], k),
      p(
        {
          en: `The vaporizer can be ordered on its own or together with a [liquid CO₂ tank](${co2TanksPath("en")}) and [turnkey installation](${categoryPath(installationCategory, "en")}).`,
          uk: `Випарник можна замовити окремо або разом з [ємністю для рідкого CO₂](${co2TanksPath("uk")}) і [монтажем під ключ](${categoryPath(installationCategory, "uk")}).`,
          ru: `Испаритель можно заказать отдельно или вместе с [ёмкостью для жидкого CO₂](${co2TanksPath("ru")}) и [монтажом под ключ](${categoryPath(installationCategory, "ru")}).`,
        }[lang],
        k,
      ),
      h2({ en: "Price", uk: "Ціна", ru: "Цена" }[lang], k),
      p(
        {
          en: `From ${formatEur(m.priceEur, "en")} excl. VAT. Delivery and tie-in to the system are quoted separately or as a turnkey package.`,
          uk: `Від ${formatEur(m.priceEur, "uk")} без ПДВ. Доставка й підключення до системи — окремо або в комплексі під ключ.`,
          ru: `От ${formatEur(m.priceEur, "ru")} без НДС. Доставка и подключение к системе — отдельно или в комплексе под ключ.`,
        }[lang],
        k,
      ),
    ]),
    features: [
      {
        en: `Capacity ${kgh(m.capacity, "en")}`,
        uk: `Продуктивність ${kgh(m.capacity, "uk")}`,
        ru: `Производительность ${kgh(m.capacity, "ru")}`,
      },
      {
        en: "Protection against dry ice formation and liquid carry-over",
        uk: "Захист від утворення сухого льоду й переливу рідкої фази",
        ru: "Защита от образования сухого льда и перелива жидкой фазы",
      },
      {
        en: "PLC control, stainless steel housing",
        uk: "PLC-керування, корпус із нержавіючої сталі",
        ru: "PLC-управление, корпус из нержавеющей стали",
      },
      {
        en: "CE, TÜV NORD, 24-month warranty",
        uk: "CE, TÜV NORD, гарантія 24 місяці",
        ru: "CE, TÜV NORD, гарантия 24 месяца",
      },
    ],
    applications: GASES.co2.applications,
    specs: [
      spec("s-model", LABELS.model, { en: m.model, uk: m.model, ru: m.model }, LABELS.groupMain),
      spec("s-cap", LABELS.capacity, { en: kgh(m.capacity, "en"), uk: kgh(m.capacity, "uk"), ru: kgh(m.capacity, "ru") }, LABELS.groupMain),
      spec("s-medium", LABELS.medium, { en: "Liquid CO₂ (LCO₂)", uk: "Рідкий CO₂ (LCO₂)", ru: "Жидкий CO₂ (LCO₂)" }, LABELS.groupMain),
      spec("s-version", { en: "Version", uk: "Виконання", ru: "Исполнение" }, { en: "Standard P", uk: "Standard P", ru: "Standard P" }, LABELS.groupMain),
      spec("s-body", { en: "Housing", uk: "Корпус", ru: "Корпус" }, { en: "Stainless steel", uk: "Нержавіюча сталь", ru: "Нержавеющая сталь" }, LABELS.groupMain),
      spec("s-control", { en: "Control", uk: "Керування", ru: "Управление" }, { en: "PLC controller", uk: "PLC-контролер", ru: "PLC-контроллер" }, LABELS.groupMain),
      spec(
        "s-mount",
        MOUNTING[m.mounting].label,
        {
          en: cap(MOUNTING[m.mounting].value.en),
          uk: cap(MOUNTING[m.mounting].value.uk),
          ru: cap(MOUNTING[m.mounting].value.ru),
        },
        LABELS.groupMain,
      ),
      spec(
        "s-overfill",
        { en: "Liquid carry-over protection", uk: "Захист від переливу рідкої фази", ru: "Защита от перелива жидкой фазы" },
        { en: "Yes", uk: "Так", ru: "Да" },
        LABELS.groupProtection,
      ),
      spec(
        "s-dryice",
        { en: "Dry ice formation protection", uk: "Захист від утворення сухого льоду", ru: "Защита от образования сухого льда" },
        { en: "Yes", uk: "Так", ru: "Да" },
        LABELS.groupProtection,
      ),
      spec("s-ce", { en: "Marking", uk: "Маркування", ru: "Маркировка" }, { en: "CE", uk: "CE", ru: "CE" }, LABELS.groupProtection),
      spec("s-nb", { en: "Notified Body", uk: "Notified Body", ru: "Notified Body" }, { en: "TÜV NORD", uk: "TÜV NORD", ru: "TÜV NORD" }, LABELS.groupProtection),
      spec("s-warranty", { en: "Warranty", uk: "Гарантія", ru: "Гарантия" }, { en: "24 months", uk: "24 місяці", ru: "24 месяца" }, LABELS.groupProtection),
      ...(m.capacity === 130
        ? [
            spec(
              "s-kit",
              { en: "Standard package", uk: "Стандартна комплектація", ru: "Стандартная комплектация" },
              {
                en: "Solenoid and safety valves; mounting kit with inlet filter and counter-flanges; temperature sensors; pressure transmitter",
                uk: "Електромагнітні та запобіжні клапани; монтажний комплект із вхідним фільтром і контрфланцями; датчики температури; перетворювач тиску",
                ru: "Электромагнитные и предохранительные клапаны; монтажный комплект с входным фильтром и контрфланцами; датчики температуры; преобразователь давления",
              },
              LABELS.groupScope,
            ),
          ]
        : []),
    ],
    faq: [],
    price: m.priceEur,
    priceOnRequest: false,
    availability: "onRequest",
    currency: "EUR",
    seo: {
      metaTitle: {
        en: `CO₂ vaporizer ${m.model}, ${kgh(m.capacity, "en")} — from ${formatEur(m.priceEur, "en")}`,
        uk: `Випарник CO₂ ${m.model}, ${kgh(m.capacity, "uk")} — від ${formatEur(m.priceEur, "uk")}`,
        ru: `Испаритель CO₂ ${m.model}, ${kgh(m.capacity, "ru")} — от ${formatEur(m.priceEur, "ru")}`,
      },
      metaDescription: {
        en: `Liquid CO₂ gasifier for ${kgh(m.capacity, "en")}: stainless steel, PLC, dry ice protection, TÜV NORD, 24-month warranty. From ${formatEur(m.priceEur, "en")} excl. VAT.`,
        uk: `Газифікатор рідкої вуглекислоти на ${kgh(m.capacity, "uk")}: нержавіюча сталь, PLC, захист від сухого льоду, TÜV NORD, гарантія 24 міс. Від ${formatEur(m.priceEur, "uk")} без ПДВ.`,
        ru: `Газификатор жидкой углекислоты на ${kgh(m.capacity, "ru")}: нержавеющая сталь, PLC, защита от сухого льда, TÜV NORD, гарантия 24 мес. От ${formatEur(m.priceEur, "ru")} без НДС.`,
      },
      keywords: {
        en: `${m.model}, CO2 vaporizer ${m.capacity} kg/h, CO2 gasifier ${m.capacity} kg/h price`,
        uk: `${m.model}, випарник CO2 ${m.capacity} кг/год, газифікатор вуглекислоти ${m.capacity} кг/год ціна`,
        ru: `${m.model}, испаритель CO2 ${m.capacity} кг/ч, газификатор углекислоты ${m.capacity} кг/ч цена`,
      },
    },
  };
}


/* ═══════════════════════════════════════════════════════════════════════
   Монтаж кріогенних систем під ключ
   ═══════════════════════════════════════════════════════════════════════ */

const INSTALL_STEPS: L[] = [
  {
    en: "Equipment selection and supply",
    uk: "Підбір і постачання обладнання",
    ru: "Подбор и поставка оборудования",
  },
  {
    en: "Installation on prepared foundations",
    uk: "Встановлення на підготовлені фундаменти",
    ru: "Установка на подготовленные фундаменты",
  },
  {
    en: "Process piping: pipelines, reducers, regulators, shut-off and safety valves",
    uk: "Технологічна обвʼязка: трубопроводи, редуктори, регулятори тиску, запірна та запобіжна арматура",
    ru: "Технологическая обвязка: трубопроводы, редукторы, регуляторы давления, запорная и предохранительная арматура",
  },
  {
    en: "Connection of vaporizers and gasifiers",
    uk: "Підключення випарників і газифікаторів",
    ru: "Подключение испарителей и газификаторов",
  },
  {
    en: "Leak testing, commissioning and start-up",
    uk: "Випробування на герметичність, пусконалагодження та запуск",
    ru: "Испытания на герметичность, пусконаладка и запуск",
  },
  {
    en: "Operator training and handover documentation",
    uk: "Навчання операторів та передача документації",
    ru: "Обучение операторов и передача документации",
  },
];

const INSTALL_TEXT = {
  intro: {
    en: "We install cryogenic tanks, vaporizers, gasifiers, pipelines, reducers, pressure regulators and shut-off and safety valves for CO₂, N₂, O₂ and Ar. The scope covers equipment selection and supply, installation on prepared foundations, process piping, connection and start-up of the gas supply system.",
    uk: "Виконуємо монтаж кріогенних ємностей, випарників, газифікаторів, трубопроводів, редукторів, регуляторів тиску, запірної та запобіжної арматури для CO₂, N₂, O₂ та Ar. Комплекс робіт включає підбір і постачання обладнання, встановлення на підготовлені фундаменти, технологічну обвʼязку, підключення та запуск систем газопостачання.",
    ru: "Выполняем монтаж криогенных ёмкостей, испарителей, газификаторов, трубопроводов, редукторов, регуляторов давления, запорной и предохранительной арматуры для CO₂, N₂, O₂ и Ar. Комплекс работ включает подбор и поставку оборудования, установку на подготовленные фундаменты, технологическую обвязку, подключение и запуск систем газоснабжения.",
  },
  why: {
    en: "One contractor for equipment and installation means one responsible party for the result: the tank, vaporizer and piping are matched to each other from the start, and commissioning does not turn into a search for who is to blame. Our engineers have hands-on experience with CO₂ recovery and liquefaction systems, so they understand the process on the consumer side, not just the pipework.",
    uk: "Один підрядник на обладнання і монтаж — це одна відповідальна сторона за результат: ємність, випарник і обвʼязка від початку узгоджені між собою, а пусконалагодження не перетворюється на пошук винних. Наші інженери мають практичний досвід із системами уловлювання та зрідження CO₂, тому розуміють процес на стороні споживача, а не лише трубопроводи.",
    ru: "Один подрядчик на оборудование и монтаж — это одна ответственная сторона за результат: ёмкость, испаритель и обвязка с самого начала согласованы между собой, а пусконаладка не превращается в поиск виноватых. Наши инженеры имеют практический опыт с системами улавливания и сжижения CO₂, поэтому понимают процесс на стороне потребителя, а не только трубопроводы.",
  },
};

const INSTALL_FAQ: Array<{ q: L; a: L }> = [
  {
    q: {
      en: "How long does the installation take?",
      uk: "Скільки триває монтаж?",
      ru: "Сколько длится монтаж?",
    },
    a: {
      en: "For a single tank with a vaporizer and piping to one consumer — typically one to two weeks on site after the foundation is ready, plus commissioning. Multi-tank systems and long pipelines are scheduled individually.",
      uk: "Для однієї ємності з випарником та обвʼязкою до одного споживача — зазвичай один-два тижні на майданчику після готовності фундаменту, плюс пусконалагодження. Системи з кількома ємностями та довгими трубопроводами плануються індивідуально.",
      ru: "Для одной ёмкости с испарителем и обвязкой до одного потребителя — обычно одна-две недели на площадке после готовности фундамента, плюс пусконаладка. Системы с несколькими ёмкостями и длинными трубопроводами планируются индивидуально.",
    },
  },
  {
    q: {
      en: "Do you install tanks supplied by others?",
      uk: "Чи монтуєте й обвʼязуєте ємності інших постачальників?",
      ru: "Монтируете и обвязываете ли ёмкости других поставщиков?",
    },
    a: {
      en: "No. We install and pipe only the systems we have selected and supplied ourselves — tank, vaporizer and pipelines — so one party is responsible for the result. If you already have an installer, we can supply just the tank or the vaporizer.",
      uk: "Ні. Монтуємо й обвʼязуємо лише системи, які самі підібрали й постачили, — ємність, випарник і трубопроводи, — щоб за результат відповідала одна сторона. Якщо монтажник у вас уже є, можемо постачити лише ємність або випарник.",
      ru: "Нет. Монтируем и обвязываем только системы, которые сами подобрали и поставили, — ёмкость, испаритель и трубопроводы, — чтобы за результат отвечала одна сторона. Если монтажник у вас уже есть, можем поставить только ёмкость или испаритель.",
    },
  },
];

export const installationCategory: SeedCategory = {
  _id: "cat-installation",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Turnkey installation of cryogenic and gas supply systems",
    uk: "Монтаж кріогенних систем і систем газопостачання під ключ",
    ru: "Монтаж криогенных систем и систем газоснабжения под ключ",
  },
  slug: slugs(
    "cryogenic-systems-installation",
    "montazh-kriogennykh-system",
    "montazh-kriogennyh-sistem",
  ),
  order: 110,
  isVisible: true,
  shortDescription: INSTALL_TEXT.intro,
  description: blocks((lang) => [
    p(INSTALL_TEXT.intro[lang], "ci"),
    p(INSTALL_TEXT.why[lang], "ci"),
    h2(
      {
        en: "What the turnkey package includes",
        uk: "Що входить у комплекс під ключ",
        ru: "Что входит в комплекс под ключ",
      }[lang],
      "ci",
    ),
    ...INSTALL_STEPS.map((item) => li(item[lang], "ci")),
  ]),
  image: img(IMG.crane, {
    en: "Cryogenic tank delivered on a low-loader and lifted by two cranes during installation",
    uk: "Кріогенна ємність, доставлена тралом і піднята двома кранами під час монтажу",
    ru: "Криогенная ёмкость, доставленная тралом и поднятая двумя кранами во время монтажа",
  }),
  faq: INSTALL_FAQ.map((item, index) =>
    faq(`faq-inst-${index}`, item.q, item.a),
  ),
  seo: {
    metaTitle: {
      en: "Installation of cryogenic gas supply systems",
      uk: "Монтаж кріогенних систем газопостачання",
      ru: "Монтаж криогенных систем газоснабжения",
    },
    metaDescription: {
            en: "Installation of cryogenic tanks, vaporizers, pipelines and valves for CO₂, N₂, O₂ and Ar: foundations, piping, commissioning and start-up.",
      uk: "Монтаж кріогенних ємностей, випарників, трубопроводів та арматури для CO₂, N₂, O₂ і Ar: фундаменти, обвʼязка, пусконалагодження.",
      ru: "Монтаж криогенных ёмкостей, испарителей, трубопроводов и арматуры для CO₂, N₂, O₂ и Ar: фундаменты, обвязка, пусконаладка.",
    },
    keywords: {
      en: "cryogenic tank installation, cryogenic system installation for oxygen nitrogen CO2, cryogenic tank piping",
      uk: "монтаж кріогенних ємностей, встановлення кріогенної системи для кисню, азоту, вуглекислоти, обвʼязка кріогенної ємності",
      ru: "монтаж криогенных емкостей, установка криогенной системы для кислорода, азота, углекислоты, обвязка криогенной емкости",
    },
  },
  productCount: 1,
};

export const installationProduct: SeedProduct = {
  _id: "product-installation-turnkey",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Turnkey installation and commissioning of a cryogenic gas supply system",
    uk: "Монтаж і пусконалагодження кріогенної системи газопостачання під ключ",
    ru: "Монтаж и пусконаладка криогенной системы газоснабжения под ключ",
  },
  slug: slugs(
    "turnkey-cryogenic-system-installation",
    "montazh-kriogennoyi-systemy-pid-klyuch",
    "montazh-kriogennoy-sistemy-pod-klyuch",
  ),
  model: "SRV-INSTALL",
  sku: "SRV-INSTALL",
  isPublished: true,
  isFeatured: false,
  order: 1100,
  publishedAt: SEED_UPDATED_AT,
  category: installationCategory,
  gallery: [
    img(
      IMG.crane,
      {
        en: "Lifting a cryogenic tank from a low-loader onto its foundation with two cranes",
        uk: "Підйом кріогенної ємності з трала на фундамент двома кранами",
        ru: "Подъём криогенной ёмкости с трала на фундамент двумя кранами",
      },
      "inst-1",
    ),
    img(
      IMG.engineer,
      {
        en: "Commissioning of a CO₂ storage system",
        uk: "Пусконалагодження системи зберігання CO₂",
        ru: "Пусконаладка системы хранения CO₂",
      },
      "inst-2",
    ),
    img(
      IMG.tankWithVaporizer,
      {
        en: "Completed installation: cryogenic tank with an ambient vaporizer and process piping",
        uk: "Завершений монтаж: кріогенна ємність з атмосферним випарником і технологічною обвʼязкою",
        ru: "Завершённый монтаж: криогенная ёмкость с атмосферным испарителем и технологической обвязкой",
      },
      "inst-3",
    ),
  ],
  shortDescription: {
    en: "Complete installation package for CO₂, N₂, O₂ and Ar systems: tanks, vaporizers, gasifiers, pipelines, reducers, regulators and valves — from foundations tie-in to start-up and operator training.",
    uk: "Повний комплекс монтажу систем CO₂, N₂, O₂ та Ar: ємності, випарники, газифікатори, трубопроводи, редуктори, регулятори й арматура — від встановлення на фундаменти до запуску та навчання операторів.",
    ru: "Полный комплекс монтажа систем CO₂, N₂, O₂ и Ar: ёмкости, испарители, газификаторы, трубопроводы, редукторы, регуляторы и арматура — от установки на фундаменты до запуска и обучения операторов.",
  },
  description: blocks((lang) => [
    p(INSTALL_TEXT.intro[lang], "pi"),
    p(INSTALL_TEXT.why[lang], "pi"),
    h2(
      { en: "Stages of work", uk: "Етапи робіт", ru: "Этапы работ" }[lang],
      "pi",
    ),
    ...INSTALL_STEPS.map((item) => li(item[lang], "pi")),
  ]),
  features: [
    {
      en: "Single contractor for equipment and installation",
      uk: "Один підрядник на обладнання і монтаж",
      ru: "Один подрядчик на оборудование и монтаж",
    },
    {
      en: "CO₂, N₂, O₂ and Ar systems",
      uk: "Системи CO₂, N₂, O₂ та Ar",
      ru: "Системы CO₂, N₂, O₂ и Ar",
    },
    {
      en: "Leak testing and commissioning protocols",
      uk: "Випробування на герметичність і протоколи пусконалагодження",
      ru: "Испытания на герметичность и протоколы пусконаладки",
    },
    {
      en: "Operator training and documentation",
      uk: "Навчання операторів і документація",
      ru: "Обучение операторов и документация",
    },
  ],
  applications: [
    {
      en: "Beverage and food plants",
      uk: "Заводи напоїв та харчові підприємства",
      ru: "Заводы напитков и пищевые предприятия",
    },
    {
      en: "Greenhouse complexes",
      uk: "Тепличні комплекси",
      ru: "Тепличные комплексы",
    },
    {
      en: "Hospitals and medical oxygen stations",
      uk: "Лікарні та кисневі станції",
      ru: "Больницы и кислородные станции",
    },
    {
      en: "Metallurgy, chemical and machine-building plants",
      uk: "Металургійні, хімічні та машинобудівні заводи",
      ru: "Металлургические, химические и машиностроительные заводы",
    },
  ],
  specs: [
    spec(
      "s-gas",
      LABELS.gases,
      { en: "CO₂, N₂, O₂, Ar", uk: "CO₂, N₂, O₂, Ar", ru: "CO₂, N₂, O₂, Ar" },
      LABELS.groupMain,
    ),
    spec(
      "s-scope",
      LABELS.scope,
      {
        en: INSTALL_STEPS.map((item) => item.en).join("; "),
        uk: INSTALL_STEPS.map((item) => item.uk).join("; "),
        ru: INSTALL_STEPS.map((item) => item.ru).join("; "),
      },
      LABELS.groupScope,
    ),
  ],
  faq: [],
  priceOnRequest: true,
  availability: "onRequest",
  currency: "EUR",
  seo: {
    // Варіант у сімействі однотипних товарів: хабом для пошуку є категорія.
    noIndex: true,
    metaTitle: {
      en: "Turnkey cryogenic gas supply installation",
      uk: "Монтаж кріогенної системи під ключ",
      ru: "Монтаж криогенной системы под ключ",
    },
    metaDescription: {
            en: "Installation of cryogenic tanks, vaporizers, pipelines and valves with commissioning. One contractor for both equipment and installation.",
      uk: "Монтаж кріогенних ємностей, випарників, трубопроводів та арматури з пусконалагодженням. Один підрядник на обладнання і монтаж.",
      ru: "Монтаж криогенных ёмкостей, испарителей, трубопроводов и арматуры с пусконаладкой. Один подрядчик на оборудование и монтаж.",
    },
    keywords: {
      en: "cryogenic system installation, gas supply installation turnkey",
      uk: "монтаж кріогенної системи, монтаж газопостачання під ключ",
      ru: "монтаж криогенной системы, монтаж газоснабжения под ключ",
    },
  },
};

// Після installationCategory: опис товарів посилається на неї, а const до
// оголошення в модулі — це TDZ-помилка під час імпорту.
export const co2VaporizerProducts = CO2_VAPORIZERS.map(buildCo2VaporizerProduct);
