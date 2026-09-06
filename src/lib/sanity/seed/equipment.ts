import {
  LABELS,
  SEED_UPDATED_AT,
  blocks,
  faq,
  h2,
  img,
  li,
  p,
  slugs,
  spec,
  type L,
  type SeedCategory,
  type SeedProduct,
} from "./helpers.ts";
import { GASES, type GasKey } from "./gases.ts";

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
   Кріоциліндри
   ═══════════════════════════════════════════════════════════════════════ */

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
  const gasShort = {
    en: g.nom.en,
    uk: g.gen.uk.split(" (")[0],
    ru: g.gen.ru.split(" (")[0],
  };
  const title: L = {
    en: `Cryogenic cylinders for ${g.gen.en}`,
    uk: `Кріоциліндри для ${g.gen.uk}`,
    ru: `Криоцилиндры для ${g.gen.ru}`,
  };
  const short: Record<GasKey, L> = {
    n2: {
      en: "Supply of cryogenic cylinders and small vacuum-insulated cryogenic tanks for storing and using liquid nitrogen. Selection of the required volume, working pressure and configuration for the customer's process needs.",
      uk: "Постачання кріоциліндрів і малих вакуумно-ізольованих кріогенних ємностей для зберігання та використання рідкого азоту. Підбір необхідного обʼєму, робочого тиску та комплектації під технологічні потреби замовника.",
      ru: "Поставка криоцилиндров и малых вакуумно-изолированных криогенных ёмкостей для хранения и использования жидкого азота. Подбор необходимого объёма, рабочего давления и комплектации под технологические потребности заказчика.",
    },
    o2: {
      en: "Supply of cryogenic cylinders and vacuum-insulated tanks for storing and gasifying liquid oxygen. Selection of equipment, valves and pressure control systems.",
      uk: "Постачання кріоциліндрів і вакуумно-ізольованих ємностей для зберігання та газифікації рідкого кисню. Підбір обладнання, арматури та систем регулювання тиску.",
      ru: "Поставка криоцилиндров и вакуумно-изолированных ёмкостей для хранения и газификации жидкого кислорода. Подбор оборудования, арматуры и систем регулирования давления.",
    },
    ar: {
      en: "Supply of cryogenic cylinders and vacuum-insulated tanks for storing liquid argon. Selection of configuration for industrial and process gas supply.",
      uk: "Постачання кріоциліндрів і вакуумно-ізольованих ємностей для зберігання рідкого аргону. Підбір комплектації для промислового та технологічного газопостачання.",
      ru: "Поставка криоцилиндров и вакуумно-изолированных ёмкостей для хранения жидкого аргона. Подбор комплектации для промышленного и технологического газоснабжения.",
    },
    co2: { en: "", uk: "", ru: "" },
  };

  return {
    _id: `cat-cylinders-${def.gas}`,
    _updatedAt: SEED_UPDATED_AT,
    title,
    slug: slugs(def.en, def.uk, def.ru),
    order: def.order,
    isVisible: true,
    shortDescription: short[def.gas],
    description: blocks((lang) => [
      p(CYL_WHAT[lang], `cc-${def.gas}`),
      p(g.storageNote[lang], `cc-${def.gas}`),
      p(CYL_WHEN[lang], `cc-${def.gas}`),
      h2(SELECTION_HEADING[lang], `cc-${def.gas}`),
      p(CYL_SELECTION[lang], `cc-${def.gas}`),
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
        en: `Cryogenic cylinders for ${g.nom.en} — supply and selection`,
        uk: `Кріоциліндри для ${gasShort.uk} — постачання та підбір`,
        ru: `Криоцилиндры для ${gasShort.ru} — поставка и подбор`,
      },
      metaDescription: {
        en: `Cryogenic cylinders and small vacuum-insulated tanks for ${g.gen.en}: volume, pressure and configuration selected for your process. Supply across Ukraine.`,
        uk: `Кріоциліндри та малі вакуумно-ізольовані ємності для ${g.gen.uk}: обʼєм, тиск і комплектація під ваш процес. Постачання по Україні.`,
        ru: `Криоцилиндры и малые вакуумно-изолированные ёмкости для ${g.gen.ru}: объём, давление и комплектация под ваш процесс. Поставка по Украине.`,
      },
      keywords: {
        en: `cryogenic cylinder ${g.nom.en}, liquid cylinder, dewar`,
        uk: `кріоциліндр ${gasShort.uk}, кріогенний циліндр, посудина Дьюара`,
        ru: `криоцилиндр ${gasShort.ru}, криогенный цилиндр, сосуд Дьюара`,
      },
    },
    productCount: 1,
  };
}

function buildCylinderProduct(
  def: CylinderDef,
  category: SeedCategory,
): SeedProduct {
  const g = GASES[def.gas];
  const gasShort = {
    en: g.nom.en,
    uk: g.gen.uk.split(" (")[0],
    ru: g.gen.ru.split(" (")[0],
  };
  const title: L = {
    en: `Cryogenic cylinder for ${g.nom.en}`,
    uk: `Кріоциліндр для ${gasShort.uk}`,
    ru: `Криоцилиндр для ${gasShort.ru}`,
  };
  const sku = `CC-${def.gas.toUpperCase()}`;
  return {
    _id: `product-cylinder-${def.gas}`,
    _updatedAt: SEED_UPDATED_AT,
    title,
    slug: slugs(
      `${g.slug.en}-cryogenic-cylinder`,
      `kriotsylindr-dlya-ridkogo-${def.uk.split("-").pop()}`,
      `kriotsilindr-dlya-zhidkogo-${def.ru.split("-").pop()}`,
    ),
    model: sku,
    sku,
    isPublished: true,
    isFeatured: false,
    order: def.order * 10,
    publishedAt: SEED_UPDATED_AT,
    category,
    gallery: [
      img(
        CYLINDER_PHOTOS[def.gas][0],
        {
          en: `${title.en} — vacuum-insulated vessel in a transport frame`,
          uk: `${title.uk} — вакуумно-ізольована посудина в транспортній рамі`,
          ru: `${title.ru} — вакуумно-изолированный сосуд в транспортной раме`,
        },
        `cyl-${def.gas}-1`,
      ),
      img(
        CYLINDER_PHOTOS[def.gas][1],
        {
          en: `${title.en} — valve group, pressure regulator and level gauge`,
          uk: `${title.uk} — група арматури, регулятор тиску та покажчик рівня`,
          ru: `${title.ru} — группа арматуры, регулятор давления и указатель уровня`,
        },
        `cyl-${def.gas}-2`,
      ),
    ],
    shortDescription: {
      en: `Portable vacuum-insulated cylinder for storing ${g.gen.en} with gas or liquid withdrawal. Volume, working pressure and configuration are selected for your process.`,
      uk: `Переносна вакуумно-ізольована посудина для зберігання ${g.gen.uk} з газовим або рідинним відбором. Обʼєм, робочий тиск і комплектація підбираються під ваш процес.`,
      ru: `Переносной вакуумно-изолированный сосуд для хранения ${g.gen.ru} с газовым или жидкостным отбором. Объём, рабочее давление и комплектация подбираются под ваш процесс.`,
    },
    description: blocks((lang) => [
      p(CYL_WHAT[lang], `pc-${def.gas}`),
      p(CYL_WHEN[lang], `pc-${def.gas}`),
      h2(SCOPE_HEADING[lang], `pc-${def.gas}`),
      li(
        {
          en: "Vacuum-insulated inner vessel",
          uk: "Вакуумно-ізольована внутрішня посудина",
          ru: "Вакуумно-изолированный внутренний сосуд",
        }[lang],
        `pc-${def.gas}`,
      ),
      li(
        {
          en: "Built-in pressure-build vaporizer and regulator",
          uk: "Вбудований випарник підйому тиску та регулятор",
          ru: "Встроенный испаритель подъёма давления и регулятор",
        }[lang],
        `pc-${def.gas}`,
      ),
      li(
        {
          en: "Gas and liquid withdrawal valves, safety valves",
          uk: "Клапани газового та рідинного відбору, запобіжні клапани",
          ru: "Клапаны газового и жидкостного отбора, предохранительные клапаны",
        }[lang],
        `pc-${def.gas}`,
      ),
      li(
        {
          en: "Level gauge and pressure gauge",
          uk: "Покажчик рівня та манометр",
          ru: "Указатель уровня и манометр",
        }[lang],
        `pc-${def.gas}`,
      ),
      h2(SELECTION_HEADING[lang], `pc-${def.gas}`),
      p(CYL_SELECTION[lang], `pc-${def.gas}`),
    ]),
    features: [
      {
        en: "Replaces a rack of high-pressure cylinders",
        uk: "Замінює рампу балонів високого тиску",
        ru: "Заменяет рампу баллонов высокого давления",
      },
      {
        en: "No foundation or stationary-tank permits required",
        uk: "Не потребує фундаменту та дозволів на стаціонарну ємність",
        ru: "Не требует фундамента и разрешений на стационарную ёмкость",
      },
      {
        en: "Gas or liquid withdrawal",
        uk: "Газовий або рідинний відбір",
        ru: "Газовый или жидкостный отбор",
      },
      {
        en: "Compatible with standard filling stations",
        uk: "Сумісний зі стандартними наповнювальними станціями",
        ru: "Совместим со стандартными наполнительными станциями",
      },
    ],
    applications: g.applications,
    specs: [
      spec("s-prod", LABELS.product, g.gen, LABELS.groupMain),
      spec(
        "s-type",
        LABELS.type,
        {
          en: "Portable, vacuum-insulated",
          uk: "Переносна, вакуумно-ізольована",
          ru: "Переносная, вакуумно-изолированная",
        },
        LABELS.groupMain,
      ),
      spec(
        "s-vol",
        {
          en: "Volume and working pressure",
          uk: "Обʼєм та робочий тиск",
          ru: "Объём и рабочее давление",
        },
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
        en: `${title.en} — supply in Ukraine`,
        uk: `${title.uk} — постачання по Україні`,
        ru: `${title.ru} — поставка по Украине`,
      },
      metaDescription: {
        en: `Cryogenic cylinder for ${g.gen.en} with gas or liquid withdrawal, vaporizer and regulator. Volume and pressure selected for your consumption.`,
        uk: `Кріоциліндр для ${g.gen.uk} з газовим або рідинним відбором, випарником і регулятором. Обʼєм і тиск підбираємо під ваше споживання.`,
        ru: `Криоцилиндр для ${g.gen.ru} с газовым или жидкостным отбором, испарителем и регулятором. Объём и давление подбираем под ваше потребление.`,
      },
      keywords: {
        en: `cryogenic cylinder ${g.nom.en}, liquid cylinder`,
        uk: `кріоциліндр ${gasShort.uk}, кріоциліндр купити`,
        ru: `криоцилиндр ${gasShort.ru}, криоцилиндр купить`,
      },
    },
  };
}

export const cylinderCategories = CYLINDER_DEFS.map(buildCylinderCategory);
export const cylinderProducts = CYLINDER_DEFS.map((def, index) =>
  buildCylinderProduct(def, cylinderCategories[index]),
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
      en: "CO₂ quality control laboratory equipment — ISBT, EIGA, DSTU",
      uk: "Лабораторне обладнання для контролю якості CO₂ — ISBT, EIGA, ДСТУ",
      ru: "Лабораторное оборудование для контроля качества CO₂ — ISBT, EIGA, ДСТУ",
    },
    metaDescription: {
      en: "Analysers for CO₂ purity, dew point, moisture and trace impurities to ISBT, EIGA and DSTU. Laboratory setups for CO₂ producers, breweries, bottlers and food plants.",
      uk: "Аналізатори чистоти CO₂, точки роси, вологи та домішок за ISBT, EIGA і ДСТУ. Комплектація лабораторій для виробників CO₂, пивоварень, заводів напоїв і харчових підприємств.",
      ru: "Анализаторы чистоты CO₂, точки росы, влаги и примесей по ISBT, EIGA и ДСТУ. Комплектация лабораторий для производителей CO₂, пивоварен, заводов напитков и пищевых предприятий.",
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
    metaTitle: {
      en: "CO₂ quality control laboratory kit — ISBT / EIGA / DSTU",
      uk: "Комплект лабораторного контролю якості CO₂ — ISBT / EIGA / ДСТУ",
      ru: "Комплект лабораторного контроля качества CO₂ — ISBT / EIGA / ДСТУ",
    },
    metaDescription: {
      en: "Analysers and sampling equipment for CO₂ purity, dew point, moisture and impurities. Laboratory kits for CO₂ producers and beverage plants, configured to ISBT, EIGA and DSTU.",
      uk: "Аналізатори та обладнання для відбору проб: чистота CO₂, точка роси, волога, домішки. Комплекти лабораторій для виробників CO₂ і заводів напоїв за ISBT, EIGA та ДСТУ.",
      ru: "Анализаторы и оборудование для отбора проб: чистота CO₂, точка росы, влага, примеси. Комплекты лабораторий для производителей CO₂ и заводов напитков по ISBT, EIGA и ДСТУ.",
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
      en: "Ambient air vaporizers for LIN, LOX, LAR 50–2000 kg/h — supply",
      uk: "Атмосферні випарники (газифікатори) азоту, кисню, аргону 50–2000 кг/год",
      ru: "Атмосферные испарители (газификаторы) азота, кислорода, аргона 50–2000 кг/ч",
    },
    metaDescription: {
      en: "Ambient air vaporizers for liquid nitrogen, oxygen and argon with capacities of 50–2000 kg/h. Selection by gas, capacity, pressure and climate; supply and installation in Ukraine.",
      uk: "Атмосферні випарники для рідкого азоту, кисню та аргону продуктивністю 50–2000 кг/год. Підбір за газом, продуктивністю, тиском і кліматом; постачання та монтаж по Україні.",
      ru: "Атмосферные испарители для жидкого азота, кислорода и аргона производительностью 50–2000 кг/ч. Подбор по газу, производительности, давлению и климату; поставка и монтаж по Украине.",
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
        en: `${title.en} — supply`,
        uk: `${title.uk} — постачання`,
        ru: `${title.ru} — поставка`,
      },
      metaDescription: {
        en: `Ambient air vaporizer for ${g.gen.en}, 50–2000 kg/h, selected for pressure and climate. Supply, installation and tie-in to the cryogenic tank in Ukraine.`,
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
   Випарники CO₂ 100–1000 кг/год
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
};

const CO2V_FAQ: Array<{ q: L; a: L }> = [
  {
    q: {
      en: "How to choose the vaporizer capacity?",
      uk: "Як обрати продуктивність випарника?",
      ru: "Как выбрать производительность испарителя?",
    },
    a: {
      en: "Take the peak hourly CO₂ consumption of all consumers running at once and add a 20–30% reserve. For greenhouses the peak is during daytime enrichment; for bottling lines it is the sum of carbonation and packaging demand. We calculate it from your process data.",
      uk: "Візьміть пікове годинне споживання CO₂ всіма споживачами одночасно і додайте 20–30% запасу. Для теплиць пік припадає на денне підживлення; для ліній розливу — це сума потреб карбонізації та пакування. Ми розраховуємо це за даними вашого процесу.",
      ru: "Возьмите пиковое часовое потребление CO₂ всеми потребителями одновременно и добавьте 20–30% запаса. Для теплиц пик приходится на дневную подкормку; для линий розлива — это сумма потребностей карбонизации и упаковки. Мы рассчитываем это по данным вашего процесса.",
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
];

export const co2VaporizerCategory: SeedCategory = {
  _id: "cat-co2-vaporizers",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Vaporizers (gasifiers) for liquid CO₂ — 100–1000 kg/h",
    uk: "Випарники (газифікатори) для рідкого CO₂ — 100–1000 кг/год",
    ru: "Испарители (газификаторы) для жидкого CO₂ — 100–1000 кг/ч",
  },
  slug: slugs("co2-vaporizers", "vyparnyky-co2", "ispariteli-co2"),
  order: 100,
  isVisible: true,
  shortDescription: {
    en: "Supply of vaporizers for gasifying liquid carbon dioxide (CO₂) with capacities of 100, 200, 300, 500, 800 and 1000 kg/h. Solutions for greenhouses, beverage production and bottling, food and industrial plants. Selection, supply, installation and integration into the CO₂ supply system.",
    uk: "Постачання випарників для газифікації рідкого діоксиду вуглецю (CO₂, вуглекислоти) продуктивністю 100, 200, 300, 500, 800 та 1000 кг/год. Рішення для тепличних господарств, виробництва та розливу напоїв, харчових і промислових підприємств. Підбір, постачання, монтаж та інтеграція в систему газопостачання CO₂.",
    ru: "Поставка испарителей для газификации жидкого диоксида углерода (CO₂, углекислоты) производительностью 100, 200, 300, 500, 800 и 1000 кг/ч. Решения для тепличных хозяйств, производства и розлива напитков, пищевых и промышленных предприятий. Подбор, поставка, монтаж и интеграция в систему газоснабжения CO₂.",
  },
  description: blocks((lang) => [
    p(CO2V_TEXT.what[lang], "cv"),
    p(CO2V_TEXT.who[lang], "cv"),
    h2(
      {
        en: "Available capacities",
        uk: "Доступні продуктивності",
        ru: "Доступные производительности",
      }[lang],
      "cv",
    ),
    p(
      {
        en: "100, 200, 300, 500, 800 and 1000 kg/h. Units of 100–300 kg/h cover greenhouses up to several hectares and small bottling lines; 500–1000 kg/h serve large beverage plants, CO₂ distributors and industrial consumers.",
        uk: "100, 200, 300, 500, 800 та 1000 кг/год. Апарати на 100–300 кг/год закривають теплиці до кількох гектарів і невеликі лінії розливу; 500–1000 кг/год — великі заводи напоїв, дистрибʼюторів CO₂ та промислових споживачів.",
        ru: "100, 200, 300, 500, 800 и 1000 кг/ч. Аппараты на 100–300 кг/ч закрывают теплицы до нескольких гектаров и небольшие линии розлива; 500–1000 кг/ч — крупные заводы напитков, дистрибьюторов CO₂ и промышленных потребителей.",
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
      en: "CO₂ vaporizers (gasifiers) 100–1000 kg/h — supply and installation",
      uk: "Випарники CO₂ (газифікатори вуглекислоти) 100–1000 кг/год — постачання",
      ru: "Испарители CO₂ (газификаторы углекислоты) 100–1000 кг/ч — поставка",
    },
    metaDescription: {
      en: "Vaporizers for liquid CO₂ with capacities of 100, 200, 300, 500, 800 and 1000 kg/h for greenhouses, beverage plants and industry. Selection, supply, installation and integration in Ukraine.",
      uk: "Випарники для рідкого CO₂ продуктивністю 100, 200, 300, 500, 800 та 1000 кг/год для теплиць, заводів напоїв і промисловості. Підбір, постачання, монтаж та інтеграція по Україні.",
      ru: "Испарители для жидкого CO₂ производительностью 100, 200, 300, 500, 800 и 1000 кг/ч для теплиц, заводов напитков и промышленности. Подбор, поставка, монтаж и интеграция по Украине.",
    },
    keywords: {
      en: "CO2 vaporizer, electric CO2 vaporizer, CO2 gasifier greenhouse",
      uk: "випарник CO2, газифікатор вуглекислоти, електричний випарник CO2 для теплиць",
      ru: "испаритель CO2, газификатор углекислоты, электрический испаритель CO2 для теплиц",
    },
  },
  productCount: 6,
};

function co2VaporizerHint(capacity: number): L {
  if (capacity <= 200)
    return {
      en: `The ${capacity} kg/h vaporizer is sized for greenhouses up to a few hectares, breweries and small bottling lines with a 10–20 m³ CO₂ tank.`,
      uk: `Випарник на ${capacity} кг/год розрахований на теплиці до кількох гектарів, пивоварні та невеликі лінії розливу з ємністю CO₂ на 10–20 м³.`,
      ru: `Испаритель на ${capacity} кг/ч рассчитан на теплицы до нескольких гектаров, пивоварни и небольшие линии розлива с ёмкостью CO₂ на 10–20 м³.`,
    };
  if (capacity <= 500)
    return {
      en: `The ${capacity} kg/h vaporizer is the workhorse for medium and large beverage plants, food processors and greenhouse complexes with 30–50 m³ storage.`,
      uk: `Випарник на ${capacity} кг/год — робоча конячка середніх і великих заводів напоїв, харчових виробництв і тепличних комплексів зі сховищем 30–50 м³.`,
      ru: `Испаритель на ${capacity} кг/ч — рабочая лошадка средних и крупных заводов напитков, пищевых производств и тепличных комплексов с хранилищем 30–50 м³.`,
    };
  return {
    en: `The ${capacity} kg/h vaporizer serves large industrial consumers, CO₂ distributors and multi-line plants, typically paired with 80–100 m³ storage tanks.`,
    uk: `Випарник на ${capacity} кг/год обслуговує великих промислових споживачів, дистрибʼюторів CO₂ та багатолінійні заводи, зазвичай у парі з ємностями на 80–100 м³.`,
    ru: `Испаритель на ${capacity} кг/ч обслуживает крупных промышленных потребителей, дистрибьюторов CO₂ и многолинейные заводы, обычно в паре с ёмкостями на 80–100 м³.`,
  };
}

function buildCo2VaporizerProduct(
  capacity: number,
  index: number,
): SeedProduct {
  const title: L = {
    en: `CO₂ vaporizer ${capacity} kg/h`,
    uk: `Випарник CO₂ ${capacity} кг/год`,
    ru: `Испаритель CO₂ ${capacity} кг/ч`,
  };
  const sku = `CV-CO2-${capacity}`;
  const hint = co2VaporizerHint(capacity);
  return {
    _id: `product-co2-vaporizer-${capacity}`,
    _updatedAt: SEED_UPDATED_AT,
    title,
    slug: slugs(
      `co2-vaporizer-${capacity}-kg-h`,
      `vyparnyk-co2-${capacity}-kg-god`,
      `isparitel-co2-${capacity}-kg-ch`,
    ),
    model: sku,
    sku,
    isPublished: true,
    isFeatured: capacity === 300,
    order: 1000 + index,
    publishedAt: SEED_UPDATED_AT,
    category: co2VaporizerCategory,
    gallery: [
      img(
        IMG.co2Fans,
        {
          en: `${title.en} — forced-draft vaporizer with fans and outlet temperature control`,
          uk: `${title.uk} — випарник примусового обдуву з вентиляторами та контролем температури на виході`,
          ru: `${title.ru} — испаритель принудительного обдува с вентиляторами и контролем температуры на выходе`,
        },
        `cv-${capacity}-1`,
      ),
      img(
        IMG.co2Greenhouse,
        {
          en: "CO₂ vaporizer mounted in a greenhouse for carbon dioxide enrichment",
          uk: "Випарник CO₂, змонтований у теплиці для вуглекислотного підживлення",
          ru: "Испаритель CO₂, смонтированный в теплице для углекислотной подкормки",
        },
        `cv-${capacity}-2`,
      ),
    ],
    shortDescription: {
      en: `Vaporizer for gasifying liquid carbon dioxide with a capacity of ${capacity} kg/h, with outlet temperature control and a pressure-reducing unit. Supplied, installed and integrated into the CO₂ supply system.`,
      uk: `Випарник для газифікації рідкої вуглекислоти продуктивністю ${capacity} кг/год із контролем температури на виході та редукційним вузлом. Постачання, монтаж та інтеграція в систему газопостачання CO₂.`,
      ru: `Испаритель для газификации жидкой углекислоты производительностью ${capacity} кг/ч с контролем температуры на выходе и редукционным узлом. Поставка, монтаж и интеграция в систему газоснабжения CO₂.`,
    },
    description: blocks((lang) => [
      p(hint[lang], `pv-${capacity}`),
      p(CO2V_TEXT.what[lang], `pv-${capacity}`),
      h2(SCOPE_HEADING[lang], `pv-${capacity}`),
      li(
        {
          en: `Vaporizer ${capacity} kg/h with heating and outlet temperature control`,
          uk: `Випарник ${capacity} кг/год з обігрівом і контролем температури на виході`,
          ru: `Испаритель ${capacity} кг/ч с обогревом и контролем температуры на выходе`,
        }[lang],
        `pv-${capacity}`,
      ),
      li(
        {
          en: "Pressure-reducing unit and safety valves",
          uk: "Редукційний вузол та запобіжні клапани",
          ru: "Редукционный узел и предохранительные клапаны",
        }[lang],
        `pv-${capacity}`,
      ),
      li(
        {
          en: "Piping from the storage tank to the consumer",
          uk: "Трубопроводи від ємності зберігання до споживача",
          ru: "Трубопроводы от ёмкости хранения до потребителя",
        }[lang],
        `pv-${capacity}`,
      ),
      li(
        {
          en: "Installation, commissioning and integration with the CO₂ system",
          uk: "Монтаж, пусконалагодження та інтеграція із системою CO₂",
          ru: "Монтаж, пусконаладка и интеграция с системой CO₂",
        }[lang],
        `pv-${capacity}`,
      ),
    ]),
    features: [
      {
        en: `Capacity ${capacity} kg/h`,
        uk: `Продуктивність ${capacity} кг/год`,
        ru: `Производительность ${capacity} кг/ч`,
      },
      {
        en: "Outlet temperature control — no dry ice formation",
        uk: "Контроль температури на виході — без утворення сухого льоду",
        ru: "Контроль температуры на выходе — без образования сухого льда",
      },
      {
        en: "Stable operation all year round",
        uk: "Стабільна робота цілий рік",
        ru: "Стабильная работа круглый год",
      },
      {
        en: "Integration with tank, reducer and piping",
        uk: "Інтеграція з ємністю, редуктором і трубопроводами",
        ru: "Интеграция с ёмкостью, редуктором и трубопроводами",
      },
    ],
    applications: GASES.co2.applications,
    specs: [
      spec(
        "s-cap",
        LABELS.capacity,
        {
          en: `${capacity} kg/h`,
          uk: `${capacity} кг/год`,
          ru: `${capacity} кг/ч`,
        },
        LABELS.groupMain,
      ),
      spec("s-prod", LABELS.product, GASES.co2.gen, LABELS.groupMain),
      spec(
        "s-heat",
        { en: "Heating", uk: "Обігрів", ru: "Обогрев" },
        {
          en: "Electric or water/steam, selected per project",
          uk: "Електричний або водяний/паровий, підбирається під проєкт",
          ru: "Электрический или водяной/паровой, подбирается под проект",
        },
        LABELS.groupMain,
      ),
      spec(
        "s-press",
        {
          en: "Outlet pressure",
          uk: "Тиск на виході",
          ru: "Давление на выходе",
        },
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
        en: `${title.en} — supply and installation`,
        uk: `${title.uk} — постачання та монтаж`,
        ru: `${title.ru} — поставка и монтаж`,
      },
      metaDescription: {
        en: `Vaporizer for liquid CO₂ with a capacity of ${capacity} kg/h for greenhouses, beverage and food plants. Selection, supply, installation and integration into the CO₂ system in Ukraine.`,
        uk: `Випарник для рідкого CO₂ продуктивністю ${capacity} кг/год для теплиць, заводів напоїв і харчових підприємств. Підбір, постачання, монтаж та інтеграція в систему CO₂ по Україні.`,
        ru: `Испаритель для жидкого CO₂ производительностью ${capacity} кг/ч для теплиц, заводов напитков и пищевых предприятий. Подбор, поставка, монтаж и интеграция в систему CO₂ по Украине.`,
      },
      keywords: {
        en: `CO2 vaporizer ${capacity} kg/h, CO2 gasifier`,
        uk: `випарник CO2 ${capacity} кг/год, газифікатор вуглекислоти`,
        ru: `испаритель CO2 ${capacity} кг/ч, газификатор углекислоты`,
      },
    },
  };
}

export const co2VaporizerProducts = [100, 200, 300, 500, 800, 1000].map(
  buildCo2VaporizerProduct,
);

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
      en: "Do you install equipment supplied by others?",
      uk: "Чи монтуєте ви обладнання інших постачальників?",
      ru: "Монтируете ли вы оборудование других поставщиков?",
    },
    a: {
      en: "Yes — after reviewing the documentation and the condition of the equipment. We also relocate existing tanks and rebuild piping on operating sites.",
      uk: "Так — після перевірки документації та стану обладнання. Також переносимо існуючі ємності та переробляємо обвʼязку на діючих майданчиках.",
      ru: "Да — после проверки документации и состояния оборудования. Также переносим существующие ёмкости и переделываем обвязку на действующих площадках.",
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
      en: "Installation of cryogenic tanks and gas supply systems — turnkey",
      uk: "Монтаж кріогенних ємностей і систем газопостачання під ключ",
      ru: "Монтаж криогенных ёмкостей и систем газоснабжения под ключ",
    },
    metaDescription: {
      en: "Installation of cryogenic tanks, vaporizers, pipelines and valves for CO₂, N₂, O₂ and Ar: supply, foundations tie-in, process piping, commissioning and start-up across Ukraine.",
      uk: "Монтаж кріогенних ємностей, випарників, трубопроводів та арматури для CO₂, N₂, O₂ та Ar: постачання, встановлення на фундаменти, обвʼязка, пусконалагодження та запуск по Україні.",
      ru: "Монтаж криогенных ёмкостей, испарителей, трубопроводов и арматуры для CO₂, N₂, O₂ и Ar: поставка, установка на фундаменты, обвязка, пусконаладка и запуск по Украине.",
    },
    keywords: {
      en: "cryogenic tank installation, gas supply system installation, cryogenic piping",
      uk: "монтаж кріогенних ємностей, монтаж систем газопостачання, обвʼязка кріогенної ємності",
      ru: "монтаж криогенных емкостей, монтаж систем газоснабжения, обвязка криогенной емкости",
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
    metaTitle: {
      en: "Turnkey installation of cryogenic gas supply systems — CO₂, N₂, O₂, Ar",
      uk: "Монтаж кріогенної системи газопостачання під ключ — CO₂, N₂, O₂, Ar",
      ru: "Монтаж криогенной системы газоснабжения под ключ — CO₂, N₂, O₂, Ar",
    },
    metaDescription: {
      en: "Installation of cryogenic tanks, vaporizers, pipelines, reducers and valves with commissioning and start-up. One contractor for equipment and installation across Ukraine.",
      uk: "Монтаж кріогенних ємностей, випарників, трубопроводів, редукторів та арматури з пусконалагодженням і запуском. Один підрядник на обладнання і монтаж по Україні.",
      ru: "Монтаж криогенных ёмкостей, испарителей, трубопроводов, редукторов и арматуры с пусконаладкой и запуском. Один подрядчик на оборудование и монтаж по Украине.",
    },
    keywords: {
      en: "cryogenic system installation, gas supply installation turnkey",
      uk: "монтаж кріогенної системи, монтаж газопостачання під ключ",
      ru: "монтаж криогенной системы, монтаж газоснабжения под ключ",
    },
  },
};
