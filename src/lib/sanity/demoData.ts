import type {
  SanityAuthor,
  SanityBlogCategory,
  SanityBlogPost,
  SanityProduct,
  SanityProductCategory,
} from "./types";

/**
 * Демо-контент на час, поки не підключено Sanity.
 * Використовується тільки коли `isSanityConfigured === false`, тож щойно
 * зʼявиться реальний projectId — фікстури автоматично перестануть віддаватись.
 *
 * Форма обʼєктів навмисно повторює проєкції GROQ-запитів, щоб адаптери
 * (`adapters.ts`) працювали без жодних змін.
 */

/** Локальні файли з /public — `urlForImage` віддає `asset.url` без білдера. */
function img(url: string, alt: { en: string; uk: string; ru: string }) {
  return { _type: "image", asset: { _id: url, url }, alt };
}

/* ─── Категорії продукції ──────────────────────────────────────────────── */

const categoryTanks: SanityProductCategory = {
  _id: "demo-cat-tanks",
  _updatedAt: "2026-07-20T10:00:00Z",
  title: {
    en: "Cryogenic tanks",
    uk: "Кріогенні резервуари",
    ru: "Криогенные резервуары",
  },
  slug: {
    en: { current: "cryogenic-tanks" },
    uk: { current: "kriogenni-rezervuary" },
    ru: { current: "kriogennye-rezervuary" },
  },
  order: 10,
  isVisible: true,
  shortDescription: {
    en: "Vertical and horizontal tanks for liquefied CO₂ and industrial gases.",
    uk: "Вертикальні та горизонтальні резервуари для зрідженого CO₂ і промислових газів.",
    ru: "Вертикальные и горизонтальные резервуары для сжиженного CO₂ и промышленных газов.",
  },
  image: img("/images/equipmentAndSystemsPage/criogenicTanks/imageOne.webp", {
    en: "Cryogenic CO₂ storage tanks",
    uk: "Кріогенні резервуари для зберігання CO₂",
    ru: "Криогенные резервуары для хранения CO₂",
  }),
  productCount: 1,
};

const categoryCapture: SanityProductCategory = {
  _id: "demo-cat-capture",
  _updatedAt: "2026-07-18T10:00:00Z",
  title: {
    en: "CO₂ capture units",
    uk: "Установки уловлювання CO₂",
    ru: "Установки улавливания CO₂",
  },
  slug: {
    en: { current: "co2-capture-units" },
    uk: { current: "ustanovky-ulovlyuvannya-co2" },
    ru: { current: "ustanovki-ulavlivaniya-co2" },
  },
  order: 20,
  isVisible: true,
  shortDescription: {
    en: "Modular and containerized units for capturing CO₂ at the source.",
    uk: "Модульні та контейнерні установки для уловлювання CO₂ у точці викиду.",
    ru: "Модульные и контейнерные установки для улавливания CO₂ в точке выброса.",
  },
  image: img("/images/equipmentAndSystemsPage/modular/imageOne.webp", {
    en: "Modular CO₂ capture unit",
    uk: "Модульна установка уловлювання CO₂",
    ru: "Модульная установка улавливания CO₂",
  }),
  productCount: 1,
};

const categoryDryIce: SanityProductCategory = {
  _id: "demo-cat-dry-ice",
  _updatedAt: "2026-07-15T10:00:00Z",
  title: {
    en: "Dry ice equipment",
    uk: "Обладнання для сухого льоду",
    ru: "Оборудование для сухого льда",
  },
  slug: {
    en: { current: "dry-ice-equipment" },
    uk: { current: "obladnannya-dlya-suhogo-lodu" },
    ru: { current: "oborudovanie-dlya-suhogo-lda" },
  },
  order: 30,
  isVisible: true,
  shortDescription: {
    en: "Pelletizers, storage boxes and packaging for dry ice production.",
    uk: "Пелетайзери, бокси зберігання та пакування для виробництва сухого льоду.",
    ru: "Пеллетайзеры, боксы хранения и упаковка для производства сухого льда.",
  },
  image: img("/images/engineeringSolutionsPage/dryIce/dryIce.webp", {
    en: "Dry ice pelletizer",
    uk: "Пелетайзер сухого льоду",
    ru: "Пеллетайзер сухого льда",
  }),
  productCount: 1,
};

export const demoProductCategories: SanityProductCategory[] = [
  categoryTanks,
  categoryCapture,
  categoryDryIce,
];

/* ─── Товари ───────────────────────────────────────────────────────────── */

function paragraph(text: string) {
  return {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text }],
  };
}

function heading(text: string) {
  return {
    _type: "block",
    style: "h2",
    children: [{ _type: "span", text }],
  };
}

export const demoProducts: SanityProduct[] = [
  {
    _id: "demo-product-tank",
    _updatedAt: "2026-07-20T10:00:00Z",
    title: {
      en: "Cryogenic CO₂ tank CT-30",
      uk: "Кріогенний резервуар CO₂ CT-30",
      ru: "Криогенный резервуар CO₂ CT-30",
    },
    slug: {
      en: { current: "cryogenic-co2-tank-ct-30" },
      uk: { current: "kriogennyi-rezervuar-co2-ct-30" },
      ru: { current: "kriogennyi-rezervuar-co2-ct-30" },
    },
    model: "CT-30",
    sku: "CO2L-CT-30",
    isPublished: true,
    isFeatured: true,
    order: 10,
    publishedAt: "2026-07-20T10:00:00Z",
    category: categoryTanks,
    gallery: [
      img("/images/equipmentAndSystemsPage/criogenicTanks/imageOne.webp", {
        en: "Cryogenic CO₂ tank CT-30",
        uk: "Кріогенний резервуар CO₂ CT-30",
        ru: "Криогенный резервуар CO₂ CT-30",
      }),
      img("/images/equipmentAndSystemsPage/criogenicTanks/imageTwo.webp", {
        en: "CT-30 vacuum insulation layer",
        uk: "Шар вакуумної ізоляції CT-30",
        ru: "Слой вакуумной изоляции CT-30",
      }),
      img("/images/equipmentAndSystemsPage/criogenicTanks/imageThree.webp", {
        en: "CT-30 valves and control unit",
        uk: "Арматура та блок керування CT-30",
        ru: "Арматура и блок управления CT-30",
      }),
      img("/images/equipmentAndSystemsPage/criogenicTanks/imageFour.webp", {
        en: "CT-30 installed on site",
        uk: "CT-30 змонтований на обʼєкті",
        ru: "CT-30 смонтирован на объекте",
      }),
    ],
    shortDescription: {
      en: "Vertical vacuum-insulated tank for 30 m³ of liquid CO₂ with working pressure up to 22 bar and minimal boil-off losses.",
      uk: "Вертикальний резервуар з вакуумною ізоляцією на 30 м³ рідкого CO₂, робочий тиск до 22 бар і мінімальні втрати на випаровування.",
      ru: "Вертикальный резервуар с вакуумной изоляцией на 30 м³ жидкого CO₂, рабочее давление до 22 бар и минимальные потери на испарение.",
    },
    description: {
      en: [
        paragraph(
          "CT-30 is a stationary vertical tank for storing liquefied carbon dioxide at industrial sites. The vacuum-perlite insulation keeps daily boil-off below 0.25%, which makes long-term storage economically viable even at low turnover.",
        ),
        heading("Construction"),
        paragraph(
          "The inner vessel is made of low-temperature steel and certified to PED EC 97/23. The outer shell carries the vacuum jacket, level and pressure instrumentation, and a safety valve group with a redundant line.",
        ),
      ],
      uk: [
        paragraph(
          "CT-30 — стаціонарний вертикальний резервуар для зберігання зрідженого вуглекислого газу на промислових майданчиках. Вакуумно-перлітна ізоляція утримує добові втрати на випаровування нижче 0,25%, тож довготривале зберігання лишається економічно виправданим навіть за низької оборотності.",
        ),
        heading("Конструкція"),
        paragraph(
          "Внутрішня посудина виготовлена з низькотемпературної сталі й сертифікована за PED EC 97/23. Зовнішній кожух несе вакуумну сорочку, прилади контролю рівня й тиску, а також групу запобіжних клапанів із резервною лінією.",
        ),
      ],
      ru: [
        paragraph(
          "CT-30 — стационарный вертикальный резервуар для хранения сжиженного углекислого газа на промышленных площадках. Вакуумно-перлитная изоляция удерживает суточные потери на испарение ниже 0,25%, поэтому длительное хранение остаётся экономически оправданным даже при низкой оборачиваемости.",
        ),
        heading("Конструкция"),
        paragraph(
          "Внутренний сосуд изготовлен из низкотемпературной стали и сертифицирован по PED EC 97/23. Наружный кожух несёт вакуумную рубашку, приборы контроля уровня и давления, а также группу предохранительных клапанов с резервной линией.",
        ),
      ],
    },
    features: [
      {
        en: "Vacuum-perlite insulation, boil-off below 0.25% per day",
        uk: "Вакуумно-перлітна ізоляція, втрати менші за 0,25% на добу",
        ru: "Вакуумно-перлитная изоляция, потери менее 0,25% в сутки",
      },
      {
        en: "Certified to PED EC 97/23 and DSTU",
        uk: "Сертифікація за PED EC 97/23 та ДСТУ",
        ru: "Сертификация по PED EC 97/23 и ДСТУ",
      },
      {
        en: "Redundant safety valve group",
        uk: "Дубльована група запобіжних клапанів",
        ru: "Дублированная группа предохранительных клапанов",
      },
      {
        en: "Remote level and pressure telemetry",
        uk: "Дистанційна телеметрія рівня й тиску",
        ru: "Дистанционная телеметрия уровня и давления",
      },
    ],
    applications: [
      { en: "Food and beverage", uk: "Харчова промисловість", ru: "Пищевая промышленность" },
      { en: "Biogas plants", uk: "Біогазові станції", ru: "Биогазовые станции" },
      { en: "Chemical industry", uk: "Хімічна промисловість", ru: "Химическая промышленность" },
      { en: "Dry ice production", uk: "Виробництво сухого льоду", ru: "Производство сухого льда" },
    ],
    specs: [
      {
        label: { en: "Geometric volume", uk: "Геометричний обʼєм", ru: "Геометрический объём" },
        value: { en: "30 m³", uk: "30 м³", ru: "30 м³" },
        group: { en: "Capacity", uk: "Місткість", ru: "Вместимость" },
      },
      {
        label: { en: "Working pressure", uk: "Робочий тиск", ru: "Рабочее давление" },
        value: { en: "up to 22 bar", uk: "до 22 бар", ru: "до 22 бар" },
        group: { en: "Capacity", uk: "Місткість", ru: "Вместимость" },
      },
      {
        label: { en: "Daily boil-off", uk: "Добові втрати", ru: "Суточные потери" },
        value: { en: "≤ 0.25%", uk: "≤ 0,25%", ru: "≤ 0,25%" },
        group: { en: "Capacity", uk: "Місткість", ru: "Вместимость" },
      },
      {
        label: { en: "Height", uk: "Висота", ru: "Высота" },
        value: { en: "9 800 mm", uk: "9 800 мм", ru: "9 800 мм" },
        group: { en: "Dimensions", uk: "Габарити", ru: "Габариты" },
      },
      {
        label: { en: "Diameter", uk: "Діаметр", ru: "Диаметр" },
        value: { en: "2 600 mm", uk: "2 600 мм", ru: "2 600 мм" },
        group: { en: "Dimensions", uk: "Габарити", ru: "Габариты" },
      },
      {
        label: { en: "Empty weight", uk: "Маса порожнього", ru: "Масса пустого" },
        value: { en: "11 400 kg", uk: "11 400 кг", ru: "11 400 кг" },
        group: { en: "Dimensions", uk: "Габарити", ru: "Габариты" },
      },
    ],
    faq: [
      {
        question: {
          en: "What foundation does the tank require?",
          uk: "Який фундамент потрібен для резервуара?",
          ru: "Какой фундамент нужен для резервуара?",
        },
        answer: {
          en: "A reinforced concrete slab sized for the filled weight of roughly 44 tonnes. We supply the load diagram with the project documentation.",
          uk: "Залізобетонна плита, розрахована на масу заповненого резервуара близько 44 тонн. Схему навантажень ми надаємо разом із проєктною документацією.",
          ru: "Железобетонная плита, рассчитанная на массу заполненного резервуара около 44 тонн. Схему нагрузок мы предоставляем вместе с проектной документацией.",
        },
      },
      {
        question: {
          en: "How long does commissioning take?",
          uk: "Скільки триває пусконалагодження?",
          ru: "Сколько длится пусконаладка?",
        },
        answer: {
          en: "Typically 3–5 working days after the foundation and utilities are ready, including leak testing and instrument calibration.",
          uk: "Зазвичай 3–5 робочих днів після готовності фундаменту й комунікацій, включно з випробуванням на герметичність і калібруванням приладів.",
          ru: "Обычно 3–5 рабочих дней после готовности фундамента и коммуникаций, включая испытание на герметичность и калибровку приборов.",
        },
      },
    ],
    priceOnRequest: true,
    availability: "madeToOrder",
    currency: "EUR",
  },
  {
    _id: "demo-product-capture",
    _updatedAt: "2026-07-18T10:00:00Z",
    title: {
      en: "Modular CO₂ capture unit MC-500",
      uk: "Модульна установка уловлювання CO₂ MC-500",
      ru: "Модульная установка улавливания CO₂ MC-500",
    },
    slug: {
      en: { current: "modular-co2-capture-unit-mc-500" },
      uk: { current: "modulna-ustanovka-ulovlyuvannya-co2-mc-500" },
      ru: { current: "modulnaya-ustanovka-ulavlivaniya-co2-mc-500" },
    },
    model: "MC-500",
    sku: "CO2L-MC-500",
    isPublished: true,
    isFeatured: true,
    order: 20,
    publishedAt: "2026-07-18T10:00:00Z",
    category: categoryCapture,
    gallery: [
      img("/images/equipmentAndSystemsPage/modular/imageOne.webp", {
        en: "Modular CO₂ capture unit MC-500",
        uk: "Модульна установка уловлювання CO₂ MC-500",
        ru: "Модульная установка улавливания CO₂ MC-500",
      }),
      img("/images/equipmentAndSystemsPage/modular/imageTwo.webp", {
        en: "MC-500 absorber column",
        uk: "Абсорбційна колона MC-500",
        ru: "Абсорбционная колонна MC-500",
      }),
      img("/images/equipmentAndSystemsPage/modular/imageThree.webp", {
        en: "MC-500 piping and controls",
        uk: "Трубопроводи та автоматика MC-500",
        ru: "Трубопроводы и автоматика MC-500",
      }),
      img("/images/equipmentAndSystemsPage/modular/imageFour.webp", {
        en: "MC-500 container module",
        uk: "Контейнерний модуль MC-500",
        ru: "Контейнерный модуль MC-500",
      }),
      img("/images/equipmentAndSystemsPage/modular/imageFive.webp", {
        en: "MC-500 control cabinet",
        uk: "Шафа керування MC-500",
        ru: "Шкаф управления MC-500",
      }),
      img("/images/engineeringSolutionsPage/processing/processing.webp", {
        en: "MC-500 purification stage",
        uk: "Ступінь очищення MC-500",
        ru: "Ступень очистки MC-500",
      }),
    ],
    shortDescription: {
      en: "Containerized unit capturing up to 500 kg/h of CO₂ from biogas or flue gas, delivered pre-assembled and tested.",
      uk: "Контейнерна установка уловлювання до 500 кг/год CO₂ з біогазу або димових газів, постачається зібраною та випробуваною.",
      ru: "Контейнерная установка улавливания до 500 кг/ч CO₂ из биогаза или дымовых газов, поставляется собранной и испытанной.",
    },
    description: {
      en: [
        paragraph(
          "MC-500 packs amine absorption, drying and liquefaction into a single 40-foot container. The unit arrives pre-commissioned, so a site only needs power, cooling water and a feed gas connection.",
        ),
        heading("Why containerized"),
        paragraph(
          "Because the module is factory-tested, on-site works shrink from months to weeks. If production moves or scales, the container can be relocated instead of written off.",
        ),
      ],
      uk: [
        paragraph(
          "MC-500 вміщує амінову абсорбцію, осушення та зрідження в одному 40-футовому контейнері. Установка приїжджає вже налагодженою, тож майданчику потрібні лише живлення, охолоджувальна вода та підключення сировинного газу.",
        ),
        heading("Чому контейнерне рішення"),
        paragraph(
          "Оскільки модуль випробуваний на заводі, роботи на майданчику скорочуються з місяців до тижнів. Якщо виробництво переїжджає або масштабується, контейнер можна перевезти, а не списати.",
        ),
      ],
      ru: [
        paragraph(
          "MC-500 вмещает аминовую абсорбцию, осушку и сжижение в одном 40-футовом контейнере. Установка приезжает уже налаженной, поэтому площадке нужны только питание, охлаждающая вода и подключение сырьевого газа.",
        ),
        heading("Почему контейнерное решение"),
        paragraph(
          "Поскольку модуль испытан на заводе, работы на площадке сокращаются с месяцев до недель. Если производство переезжает или масштабируется, контейнер можно перевезти, а не списать.",
        ),
      ],
    },
    features: [
      {
        en: "Pre-assembled in a 40 ft container",
        uk: "Зібрана в 40-футовому контейнері",
        ru: "Собрана в 40-футовом контейнере",
      },
      {
        en: "Commissioning in 1–4 weeks",
        uk: "Пусконалагодження за 1–4 тижні",
        ru: "Пусконаладка за 1–4 недели",
      },
      {
        en: "Food-grade purity at the outlet",
        uk: "Харчова чистота на виході",
        ru: "Пищевая чистота на выходе",
      },
      {
        en: "Remote monitoring and diagnostics",
        uk: "Дистанційний моніторинг і діагностика",
        ru: "Дистанционный мониторинг и диагностика",
      },
    ],
    applications: [
      { en: "Biogas plants", uk: "Біогазові станції", ru: "Биогазовые станции" },
      { en: "Bioethanol production", uk: "Виробництво біоетанолу", ru: "Производство биоэтанола" },
      { en: "Breweries", uk: "Пивоварні", ru: "Пивоварни" },
    ],
    specs: [
      {
        label: { en: "Capacity", uk: "Продуктивність", ru: "Производительность" },
        value: { en: "up to 500 kg/h", uk: "до 500 кг/год", ru: "до 500 кг/ч" },
        group: { en: "Performance", uk: "Продуктивність", ru: "Производительность" },
      },
      {
        label: { en: "Outlet purity", uk: "Чистота на виході", ru: "Чистота на выходе" },
        value: { en: "99.95% (food grade)", uk: "99,95% (харчова)", ru: "99,95% (пищевая)" },
        group: { en: "Performance", uk: "Продуктивність", ru: "Производительность" },
      },
      {
        label: { en: "Power consumption", uk: "Споживана потужність", ru: "Потребляемая мощность" },
        value: { en: "165 kW", uk: "165 кВт", ru: "165 кВт" },
        group: { en: "Utilities", uk: "Живлення", ru: "Питание" },
      },
      {
        label: { en: "Footprint", uk: "Займана площа", ru: "Занимаемая площадь" },
        value: { en: "12.2 × 2.4 m", uk: "12,2 × 2,4 м", ru: "12,2 × 2,4 м" },
        group: { en: "Utilities", uk: "Живлення", ru: "Питание" },
      },
    ],
    faq: [
      {
        question: {
          en: "Can the unit run on flue gas?",
          uk: "Чи може установка працювати на димових газах?",
          ru: "Может ли установка работать на дымовых газах?",
        },
        answer: {
          en: "Yes. Flue gas requires an additional pre-treatment stage, which we size after reviewing your gas analysis.",
          uk: "Так. Для димових газів потрібен додатковий ступінь попереднього очищення, який ми підбираємо після аналізу складу вашого газу.",
          ru: "Да. Для дымовых газов нужна дополнительная ступень предварительной очистки, которую мы подбираем после анализа состава вашего газа.",
        },
      },
    ],
    priceOnRequest: true,
    availability: "onRequest",
    currency: "EUR",
  },
  {
    _id: "demo-product-pelletizer",
    _updatedAt: "2026-07-15T10:00:00Z",
    title: {
      en: "Dry ice pelletizer DP-120",
      uk: "Пелетайзер сухого льоду DP-120",
      ru: "Пеллетайзер сухого льда DP-120",
    },
    slug: {
      en: { current: "dry-ice-pelletizer-dp-120" },
      uk: { current: "pelletaizer-suhogo-lodu-dp-120" },
      ru: { current: "pelletaizer-suhogo-lda-dp-120" },
    },
    model: "DP-120",
    sku: "CO2L-DP-120",
    isPublished: true,
    isFeatured: false,
    order: 30,
    publishedAt: "2026-07-15T10:00:00Z",
    category: categoryDryIce,
    gallery: [
      img("/images/engineeringSolutionsPage/dryIce/dryIce.webp", {
        en: "Dry ice pelletizer DP-120",
        uk: "Пелетайзер сухого льоду DP-120",
        ru: "Пеллетайзер сухого льда DP-120",
      }),
      img("/images/industriesWeServePage/logistics/imageOne.webp", {
        en: "DP-120 pellets in transport packaging",
        uk: "Пелети DP-120 у транспортному пакуванні",
        ru: "Пеллеты DP-120 в транспортной упаковке",
      }),
      img("/images/industriesWeServePage/logistics/imageTwo.webp", {
        en: "Dry ice storage boxes",
        uk: "Бокси для зберігання сухого льоду",
        ru: "Боксы для хранения сухого льда",
      }),
    ],
    shortDescription: {
      en: "Pelletizer producing 120 kg/h of 3, 10 or 16 mm dry ice pellets from liquid CO₂.",
      uk: "Пелетайзер продуктивністю 120 кг/год пелет сухого льоду 3, 10 або 16 мм із рідкого CO₂.",
      ru: "Пеллетайзер производительностью 120 кг/ч пеллет сухого льда 3, 10 или 16 мм из жидкого CO₂.",
    },
    description: {
      en: [
        paragraph(
          "DP-120 converts liquid carbon dioxide into dense dry ice pellets. Die plates are swapped without tools, so one machine covers blast cleaning, medical transport and food logistics.",
        ),
      ],
      uk: [
        paragraph(
          "DP-120 перетворює рідкий вуглекислий газ на щільні пелети сухого льоду. Матриці змінюються без інструменту, тож одна машина закриває і бластингове очищення, і медичні перевезення, і харчову логістику.",
        ),
      ],
      ru: [
        paragraph(
          "DP-120 превращает жидкий углекислый газ в плотные пеллеты сухого льда. Матрицы меняются без инструмента, поэтому одна машина закрывает и бластинговую очистку, и медицинские перевозки, и пищевую логистику.",
        ),
      ],
    },
    features: [
      {
        en: "Interchangeable dies: 3, 10, 16 mm",
        uk: "Змінні матриці: 3, 10, 16 мм",
        ru: "Сменные матрицы: 3, 10, 16 мм",
      },
      {
        en: "Pellet density up to 1.55 kg/dm³",
        uk: "Щільність пелет до 1,55 кг/дм³",
        ru: "Плотность пеллет до 1,55 кг/дм³",
      },
      {
        en: "Stainless steel food-safe contact parts",
        uk: "Контактні частини з харчової нержавіючої сталі",
        ru: "Контактные части из пищевой нержавеющей стали",
      },
    ],
    applications: [
      { en: "Dry ice blasting", uk: "Бластингове очищення", ru: "Бластинговая очистка" },
      { en: "Cold chain logistics", uk: "Логістика холодного ланцюга", ru: "Логистика холодовой цепи" },
      { en: "Pharmaceutical transport", uk: "Перевезення фармпродукції", ru: "Перевозка фармпродукции" },
    ],
    specs: [
      {
        label: { en: "Output", uk: "Продуктивність", ru: "Производительность" },
        value: { en: "120 kg/h", uk: "120 кг/год", ru: "120 кг/ч" },
      },
      {
        label: { en: "Pellet sizes", uk: "Розміри пелет", ru: "Размеры пеллет" },
        value: { en: "3 / 10 / 16 mm", uk: "3 / 10 / 16 мм", ru: "3 / 10 / 16 мм" },
      },
      {
        label: { en: "CO₂ consumption", uk: "Витрата CO₂", ru: "Расход CO₂" },
        value: { en: "2.2 kg per 1 kg of pellets", uk: "2,2 кг на 1 кг пелет", ru: "2,2 кг на 1 кг пеллет" },
      },
      {
        label: { en: "Power supply", uk: "Живлення", ru: "Питание" },
        value: { en: "400 V / 50 Hz / 7.5 kW", uk: "400 В / 50 Гц / 7,5 кВт", ru: "400 В / 50 Гц / 7,5 кВт" },
      },
    ],
    faq: [],
    priceOnRequest: false,
    price: 48000,
    currency: "EUR",
    availability: "inStock",
  },
];

/* ─── Блог ─────────────────────────────────────────────────────────────── */

const demoAuthor: SanityAuthor = {
  _id: "demo-author",
  name: "Andrii Kovalenko",
  slug: { current: "andrii-kovalenko" },
  role: {
    en: "Lead process engineer, CO₂ Lab",
    uk: "Провідний інженер-технолог, CO₂ Lab",
    ru: "Ведущий инженер-технолог, CO₂ Lab",
  },
  bio: {
    en: "Twelve years designing CO₂ capture and liquefaction plants for biogas and food industry clients across Europe.",
    uk: "Дванадцять років проєктує установки уловлювання та зрідження CO₂ для біогазових і харчових виробництв у Європі.",
    ru: "Двенадцать лет проектирует установки улавливания и сжижения CO₂ для биогазовых и пищевых производств в Европе.",
  },
  photo: null,
};

const blogCategoryTech: SanityBlogCategory = {
  _id: "demo-blog-cat-tech",
  _updatedAt: "2026-07-22T10:00:00Z",
  title: { en: "Technology", uk: "Технології", ru: "Технологии" },
  slug: {
    en: { current: "technology" },
    uk: { current: "tehnologii" },
    ru: { current: "tehnologii-ru" },
  },
  description: {
    en: "How CO₂ capture, purification and liquefaction actually work.",
    uk: "Як насправді працюють уловлювання, очищення та зрідження CO₂.",
    ru: "Как на самом деле работают улавливание, очистка и сжижение CO₂.",
  },
  order: 10,
  postCount: 2,
};

const blogCategoryStandards: SanityBlogCategory = {
  _id: "demo-blog-cat-standards",
  _updatedAt: "2026-07-10T10:00:00Z",
  title: { en: "Standards", uk: "Стандарти", ru: "Стандарты" },
  slug: {
    en: { current: "standards" },
    uk: { current: "standarty" },
    ru: { current: "standarty-ru" },
  },
  description: {
    en: "Certification, food-grade requirements and regulatory compliance.",
    uk: "Сертифікація, вимоги харчової якості та регуляторна відповідність.",
    ru: "Сертификация, требования пищевого качества и регуляторное соответствие.",
  },
  order: 20,
  postCount: 1,
};

export const demoBlogCategories: SanityBlogCategory[] = [
  blogCategoryTech,
  blogCategoryStandards,
];

export const demoBlogPosts: SanityBlogPost[] = [
  {
    _id: "demo-post-biogenic",
    _updatedAt: "2026-07-22T10:00:00Z",
    title: {
      en: "How biogenic CO₂ capture works at a biogas plant",
      uk: "Як працює уловлювання біогенного CO₂ на біогазовій станції",
      ru: "Как работает улавливание биогенного CO₂ на биогазовой станции",
    },
    slug: {
      en: { current: "how-biogenic-co2-capture-works" },
      uk: { current: "yak-pratsyuye-ulovlyuvannya-biogennogo-co2" },
      ru: { current: "kak-rabotaet-ulavlivanie-biogennogo-co2" },
    },
    isPublished: true,
    isFeatured: true,
    publishedAt: "2026-07-22T10:00:00Z",
    updatedAt: "2026-07-28T10:00:00Z",
    readingTimeMinutes: 7,
    author: demoAuthor,
    categories: [blogCategoryTech],
    tags: ["biogas", "capture", "liquefaction"],
    coverImage: img("/images/supplyPage/biogenic/imageOne.webp", {
      en: "Biogenic CO₂ capture at a biogas plant",
      uk: "Уловлювання біогенного CO₂ на біогазовій станції",
      ru: "Улавливание биогенного CO₂ на биогазовой станции",
    }),
    excerpt: {
      en: "Upgrading raw biogas leaves a CO₂ stream that most plants vent. Here is what it takes to turn that stream into a certified product.",
      uk: "Після збагачення біогазу лишається потік CO₂, який більшість станцій просто випускає в атмосферу. Розбираємо, що потрібно, аби перетворити його на сертифікований продукт.",
      ru: "После обогащения биогаза остаётся поток CO₂, который большинство станций просто выпускает в атмосферу. Разбираем, что нужно, чтобы превратить его в сертифицированный продукт.",
    },
    body: {
      en: [
        paragraph(
          "A biogas upgrading plant separates methane from raw biogas. What remains is a CO₂-rich off-gas — typically 96–99% pure — that is usually vented. Capturing it costs far less than capturing CO₂ from flue gas, because the concentration is already high.",
        ),
        heading("Step 1: pre-treatment"),
        paragraph(
          "Trace hydrogen sulphide, siloxanes and volatile organics have to go first. Activated carbon beds handle most of it; the sizing depends on your feedstock, so a gas analysis is the starting point of any project.",
        ),
        heading("Step 2: drying and liquefaction"),
        paragraph(
          "The gas is dried to a dew point below −60 °C, then compressed and cooled until it condenses at roughly −25 °C and 18 bar. Boil-off from the storage tank is routed back to the compressor rather than lost.",
        ),
        heading("Step 3: quality control"),
        paragraph(
          "Before the product goes to a food customer, an online analyser checks oxygen, moisture and total hydrocarbons against ISBT limits. Any batch outside spec is recirculated instead of shipped.",
        ),
      ],
      uk: [
        paragraph(
          "Установка збагачення біогазу відділяє метан від сирого біогазу. Лишається багатий на CO₂ відхідний газ — зазвичай 96–99% чистоти — який здебільшого випускають в атмосферу. Уловити його коштує значно дешевше, ніж CO₂ з димових газів, бо концентрація вже висока.",
        ),
        heading("Крок 1: попереднє очищення"),
        paragraph(
          "Спершу треба прибрати слідові сірководень, силоксани й леткі органічні сполуки. Більшість із цього забирають шари активованого вугілля; підбір залежить від вашої сировини, тому будь-який проєкт починається з аналізу газу.",
        ),
        heading("Крок 2: осушення та зрідження"),
        paragraph(
          "Газ осушують до точки роси нижче −60 °C, далі стискають і охолоджують, доки він не конденсується приблизно за −25 °C і 18 бар. Пари википання з резервуара повертають на компресор, а не втрачають.",
        ),
        heading("Крок 3: контроль якості"),
        paragraph(
          "Перш ніж продукт піде харчовому замовнику, потоковий аналізатор перевіряє кисень, вологу й сумарні вуглеводні за межами ISBT. Партію поза специфікацією повертають у цикл, а не відвантажують.",
        ),
      ],
      ru: [
        paragraph(
          "Установка обогащения биогаза отделяет метан от сырого биогаза. Остаётся богатый CO₂ отходящий газ — обычно 96–99% чистоты — который в основном выпускают в атмосферу. Уловить его стоит значительно дешевле, чем CO₂ из дымовых газов, потому что концентрация уже высокая.",
        ),
        heading("Шаг 1: предварительная очистка"),
        paragraph(
          "Сначала нужно убрать следовые сероводород, силоксаны и летучие органические соединения. Большую часть забирают слои активированного угля; подбор зависит от вашего сырья, поэтому любой проект начинается с анализа газа.",
        ),
        heading("Шаг 2: осушка и сжижение"),
        paragraph(
          "Газ осушают до точки росы ниже −60 °C, затем сжимают и охлаждают, пока он не сконденсируется примерно при −25 °C и 18 бар. Пары испарения из резервуара возвращают на компрессор, а не теряют.",
        ),
        heading("Шаг 3: контроль качества"),
        paragraph(
          "Прежде чем продукт уйдёт пищевому заказчику, поточный анализатор проверяет кислород, влагу и суммарные углеводороды по пределам ISBT. Партию вне спецификации возвращают в цикл, а не отгружают.",
        ),
      ],
    },
    faq: [
      {
        question: {
          en: "How much CO₂ does a typical biogas plant lose?",
          uk: "Скільки CO₂ втрачає типова біогазова станція?",
          ru: "Сколько CO₂ теряет типичная биогазовая станция?",
        },
        answer: {
          en: "A 500 Nm³/h upgrading plant vents roughly 4 000 tonnes of biogenic CO₂ per year — enough to justify a capture unit at current market prices.",
          uk: "Станція збагачення на 500 нм³/год випускає близько 4 000 тонн біогенного CO₂ на рік — цього достатньо, щоб установка уловлювання окупалась за поточних ринкових цін.",
          ru: "Станция обогащения на 500 нм³/ч выпускает около 4 000 тонн биогенного CO₂ в год — этого достаточно, чтобы установка улавливания окупалась при текущих рыночных ценах.",
        },
      },
    ],
    relatedProducts: [],
  },
  {
    _id: "demo-post-modular",
    _updatedAt: "2026-07-16T10:00:00Z",
    title: {
      en: "Modular or containerized: choosing a CO₂ plant format",
      uk: "Модульний чи контейнерний: як обрати формат CO₂-заводу",
      ru: "Модульный или контейнерный: как выбрать формат CO₂-завода",
    },
    slug: {
      en: { current: "modular-or-containerized-co2-plant" },
      uk: { current: "modulnyi-chy-konteinernyi-co2-zavod" },
      ru: { current: "modulnyi-ili-konteinernyi-co2-zavod" },
    },
    isPublished: true,
    isFeatured: false,
    publishedAt: "2026-07-16T10:00:00Z",
    readingTimeMinutes: 5,
    author: demoAuthor,
    categories: [blogCategoryTech],
    tags: ["modular", "capex", "planning"],
    coverImage: img("/images/equipmentAndSystemsPage/modular/imageTwo.webp", {
      en: "Modular CO₂ plant under assembly",
      uk: "Модульний CO₂-завод у процесі складання",
      ru: "Модульный CO₂-завод в процессе сборки",
    }),
    excerpt: {
      en: "The decision is rarely about capacity alone. Site constraints, project timeline and how certain you are about future volumes matter more.",
      uk: "Рішення рідко зводиться лише до продуктивності. Обмеження майданчика, строки проєкту та впевненість у майбутніх обсягах важать більше.",
      ru: "Решение редко сводится только к производительности. Ограничения площадки, сроки проекта и уверенность в будущих объёмах значат больше.",
    },
    body: {
      en: [
        paragraph(
          "Both formats produce the same product. The difference is how much of the engineering happens in a factory versus on your site — and that single variable drives cost, schedule and flexibility.",
        ),
        heading("When containerized wins"),
        paragraph(
          "If you need production within a quarter, if the site has no room for construction works, or if you may relocate within five years, take the container. Commissioning is measured in weeks.",
        ),
        heading("When modular wins"),
        paragraph(
          "Above roughly 1 000 kg/h, or when the process needs integration with existing utilities and heat recovery, a stationary modular plant is cheaper per tonne and easier to expand in blocks.",
        ),
      ],
      uk: [
        paragraph(
          "Обидва формати дають однаковий продукт. Різниця в тому, яка частка інженерії відбувається на заводі, а яка — на вашому майданчику; саме ця змінна визначає вартість, строки та гнучкість.",
        ),
        heading("Коли виграє контейнер"),
        paragraph(
          "Якщо виробництво потрібне протягом кварталу, якщо на майданчику немає місця для будівельних робіт або якщо протягом пʼяти років можливий переїзд — беріть контейнер. Пусконалагодження вимірюється тижнями.",
        ),
        heading("Коли виграє модульний завод"),
        paragraph(
          "Понад приблизно 1 000 кг/год, або коли процес потребує інтеграції з наявними комунікаціями та рекуперацією тепла, стаціонарний модульний завод дешевший у перерахунку на тонну й простіше розширюється блоками.",
        ),
      ],
      ru: [
        paragraph(
          "Оба формата дают одинаковый продукт. Разница в том, какая доля инженерии происходит на заводе, а какая — на вашей площадке; именно эта переменная определяет стоимость, сроки и гибкость.",
        ),
        heading("Когда выигрывает контейнер"),
        paragraph(
          "Если производство нужно в течение квартала, если на площадке нет места для строительных работ или если в течение пяти лет возможен переезд — берите контейнер. Пусконаладка измеряется неделями.",
        ),
        heading("Когда выигрывает модульный завод"),
        paragraph(
          "Свыше примерно 1 000 кг/ч, или когда процесс требует интеграции с существующими коммуникациями и рекуперацией тепла, стационарный модульный завод дешевле в пересчёте на тонну и проще расширяется блоками.",
        ),
      ],
    },
    faq: [],
    relatedProducts: [],
  },
  {
    _id: "demo-post-standards",
    _updatedAt: "2026-07-10T10:00:00Z",
    title: {
      en: "Food-grade CO₂: what ISBT and EIGA actually require",
      uk: "CO₂ харчової якості: чого насправді вимагають ISBT і EIGA",
      ru: "CO₂ пищевого качества: чего на самом деле требуют ISBT и EIGA",
    },
    slug: {
      en: { current: "food-grade-co2-isbt-eiga-requirements" },
      uk: { current: "co2-harchovoi-yakosti-isbt-eiga" },
      ru: { current: "co2-pishchevogo-kachestva-isbt-eiga" },
    },
    isPublished: true,
    isFeatured: false,
    publishedAt: "2026-07-10T10:00:00Z",
    readingTimeMinutes: 6,
    author: demoAuthor,
    categories: [blogCategoryStandards],
    tags: ["ISBT", "EIGA", "food grade", "certification"],
    coverImage: img("/images/engineeringSolutionsPage/monitoring/monitoring.webp", {
      en: "CO₂ quality analysis instruments",
      uk: "Прилади аналізу якості CO₂",
      ru: "Приборы анализа качества CO₂",
    }),
    excerpt: {
      en: "Purity percentage tells you almost nothing on its own. What matters is the list of trace contaminants and the limit set against each one.",
      uk: "Відсоток чистоти сам по собі майже нічого не каже. Важливий перелік слідових домішок і межа, встановлена для кожної з них.",
      ru: "Процент чистоты сам по себе почти ничего не говорит. Важен перечень следовых примесей и предел, установленный для каждой из них.",
    },
    body: {
      en: [
        paragraph(
          "A supplier quoting 99.9% purity has told you nothing useful. The remaining 0.1% is exactly where the risk lives, and both ISBT and EIGA define limits per contaminant rather than a single headline number.",
        ),
        heading("The parameters that matter"),
        paragraph(
          "Oxygen, moisture, total hydrocarbons, acetaldehyde, benzene, sulphur compounds and ammonia. For beverage carbonation, benzene and acetaldehyde are the ones that get suppliers disqualified.",
        ),
        heading("What to ask a supplier for"),
        paragraph(
          "A certificate of analysis for the actual batch, not a type-test from three years ago. Ask which parameters are measured online and which are sent to a lab — the difference tells you how quickly a deviation would be caught.",
        ),
      ],
      uk: [
        paragraph(
          "Постачальник, що заявляє 99,9% чистоти, не сказав нічого корисного. Саме в решті 0,1% і живе ризик, а ISBT та EIGA задають межі по кожній домішці окремо, а не одним показником.",
        ),
        heading("Параметри, що мають значення"),
        paragraph(
          "Кисень, волога, сумарні вуглеводні, ацетальдегід, бензол, сполуки сірки та аміак. Для карбонізації напоїв саме бензол і ацетальдегід найчастіше дискваліфікують постачальника.",
        ),
        heading("Що вимагати від постачальника"),
        paragraph(
          "Сертифікат аналізу на конкретну партію, а не типове випробування трирічної давності. Запитайте, які параметри міряються потоково, а які відправляють у лабораторію — різниця показує, як швидко виявлять відхилення.",
        ),
      ],
      ru: [
        paragraph(
          "Поставщик, заявляющий 99,9% чистоты, не сказал ничего полезного. Именно в оставшихся 0,1% и живёт риск, а ISBT и EIGA задают пределы по каждой примеси отдельно, а не одним показателем.",
        ),
        heading("Параметры, которые имеют значение"),
        paragraph(
          "Кислород, влага, суммарные углеводороды, ацетальдегид, бензол, соединения серы и аммиак. Для карбонизации напитков именно бензол и ацетальдегид чаще всего дисквалифицируют поставщика.",
        ),
        heading("Что требовать от поставщика"),
        paragraph(
          "Сертификат анализа на конкретную партию, а не типовое испытание трёхлетней давности. Спросите, какие параметры меряются поточно, а какие отправляют в лабораторию — разница показывает, как быстро обнаружат отклонение.",
        ),
      ],
    },
    faq: [
      {
        question: {
          en: "Is ISBT or EIGA stricter?",
          uk: "Що суворіше — ISBT чи EIGA?",
          ru: "Что строже — ISBT или EIGA?",
        },
        answer: {
          en: "They overlap heavily. ISBT is written for the beverage industry and is tighter on flavour-affecting traces; EIGA covers a broader industrial scope.",
          uk: "Вони значною мірою перетинаються. ISBT написаний для індустрії напоїв і суворіший до домішок, що впливають на смак; EIGA охоплює ширший промисловий діапазон.",
          ru: "Они во многом пересекаются. ISBT написан для индустрии напитков и строже к примесям, влияющим на вкус; EIGA охватывает более широкий промышленный диапазон.",
        },
      },
    ],
    relatedProducts: [],
  },
];

// Перехресні звʼязки проставляємо після оголошення, щоб уникнути циклів
demoBlogPosts[0].relatedProducts = [demoProducts[1]];
demoBlogPosts[1].relatedProducts = [demoProducts[1], demoProducts[0]];
