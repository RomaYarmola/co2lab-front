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
  type SeedImage,
  type SeedProduct,
} from "./helpers.ts";
import { GASES, type GasKey } from "./gases.ts";

/* ─── Фото (з /public; замінити на реальні фото клієнта) ──────────────── */

const TANK_IMAGES = {
  yard: "/images/equipmentAndSystemsPage/criogenicTanks/image.webp",
  one: "/images/equipmentAndSystemsPage/criogenicTanks/imageOne.webp",
  two: "/images/equipmentAndSystemsPage/criogenicTanks/imageTwo.webp",
  three: "/images/equipmentAndSystemsPage/criogenicTanks/imageThree.webp",
  four: "/images/equipmentAndSystemsPage/criogenicTanks/imageFour.webp",
  engineer: "/images/equipmentAndSystemsPage/engineering/imageThree.webp",
  crane: "/images/equipmentAndSystemsPage/modular/imageThree.webp",
};

function tankGallery(gas: GasKey, title: L): SeedImage[] {
  const g = GASES[gas];
  const base = [
    img(
      TANK_IMAGES.yard,
      {
        en: `Vertical cryogenic storage tanks for ${g.nom.en} on a customer site`,
        uk: `Вертикальні кріогенні ємності для зберігання ${g.gen.uk.split(" (")[0]} на майданчику замовника`,
        ru: `Вертикальные криогенные ёмкости для хранения ${g.gen.ru.split(" (")[0]} на площадке заказчика`,
      },
      `${gas}-g1`,
    ),
    img(
      TANK_IMAGES.one,
      {
        en: `${title.en} — outer shell of the vacuum-insulated vessel`,
        uk: `${title.uk} — зовнішній кожух вакуумно-ізольованої посудини`,
        ru: `${title.ru} — наружный кожух вакуумно-изолированного сосуда`,
      },
      `${gas}-g2`,
    ),
    img(
      TANK_IMAGES.three,
      {
        en: "Shut-off and safety valves, pressure control unit of a cryogenic tank",
        uk: "Запірна та запобіжна арматура, вузол контролю тиску кріогенної ємності",
        ru: "Запорная и предохранительная арматура, узел контроля давления криогенной ёмкости",
      },
      `${gas}-g3`,
    ),
    img(
      TANK_IMAGES.crane,
      {
        en: "Installation of cryogenic tanks with a crane on prepared foundations",
        uk: "Монтаж кріогенних ємностей краном на підготовлені фундаменти",
        ru: "Монтаж криогенных ёмкостей краном на подготовленные фундаменты",
      },
      `${gas}-g4`,
    ),
  ];
  if (gas === "co2") {
    base.splice(
      1,
      0,
      img(
        TANK_IMAGES.engineer,
        {
          en: "Engineer commissioning a CO₂ storage tank and piping",
          uk: "Інженер під час пусконалагодження ємності CO₂ та обвʼязки",
          ru: "Инженер во время пусконаладки ёмкости CO₂ и обвязки",
        },
        `${gas}-g5`,
      ),
    );
  }
  return base;
}

/* ─── Категорії ємностей ──────────────────────────────────────────────── */

type TankCategoryDef = {
  gas: GasKey;
  order: number;
  volumes: number[];
  title: L;
  slug: ReturnType<typeof slugs>;
  short: L;
  metaTitle: L;
  metaDescription: L;
  keywords: L;
  intro: L;
  scopeItems: L[];
  turnkey: L;
  faq: Array<{ q: L; a: L }>;
};

const SCOPE_CO2: L[] = [
  {
    en: "Shut-off and safety valves",
    uk: "Запірна та запобіжна арматура",
    ru: "Запорная и предохранительная арматура",
  },
  {
    en: "Pressure control and level indication",
    uk: "Системи контролю тиску та рівня",
    ru: "Системы контроля давления и уровня",
  },
  {
    en: "Pressure-build and product vaporizers",
    uk: "Випарники підйому тиску та продуктові випарники",
    ru: "Испарители подъёма давления и продуктовые испарители",
  },
  {
    en: "Pressure-reducing units",
    uk: "Редукційні вузли",
    ru: "Редукционные узлы",
  },
  {
    en: "Process piping and tie-in to the consumer",
    uk: "Технологічна обвʼязка та підключення до споживача",
    ru: "Технологическая обвязка и подключение к потребителю",
  },
];

const SCOPE_AIR_GAS: L[] = [
  {
    en: "Ambient air vaporizers",
    uk: "Атмосферні випарники",
    ru: "Атмосферные испарители",
  },
  {
    en: "Pressure regulators",
    uk: "Регулятори тиску",
    ru: "Регуляторы давления",
  },
  {
    en: "Shut-off and safety valves",
    uk: "Запірна та запобіжна арматура",
    ru: "Запорная и предохранительная арматура",
  },
  {
    en: "Pipelines to the point of use",
    uk: "Трубопроводи до точки споживання",
    ru: "Трубопроводы до точки потребления",
  },
];

const TURNKEY: L = {
  en: "We select the equipment, deliver it, install it on prepared foundations, complete the process piping and commission the gas supply system on a turnkey basis.",
  uk: "Ми підбираємо обладнання, постачаємо його, встановлюємо на підготовлені фундаменти, виконуємо технологічну обвʼязку та запускаємо систему газопостачання під ключ.",
  ru: "Мы подбираем оборудование, поставляем его, устанавливаем на подготовленные фундаменты, выполняем технологическую обвязку и запускаем систему газоснабжения под ключ.",
};

const FAQ_COMMON: Array<{ q: L; a: L }> = [
  {
    q: {
      en: "What does the delivery include?",
      uk: "Що входить у постачання?",
      ru: "Что входит в поставку?",
    },
    a: {
      en: "The vacuum-insulated vessel with valves, safety devices and instrumentation, plus vaporizers and pressure-reducing units selected for your consumption. Installation, piping and commissioning are offered as a turnkey package.",
      uk: "Вакуумно-ізольована посудина з арматурою, запобіжними пристроями та приладами контролю, а також випарники й редукційні вузли, підібрані під ваше споживання. Монтаж, обвʼязка та пусконалагодження пропонуються як комплекс під ключ.",
      ru: "Вакуумно-изолированный сосуд с арматурой, предохранительными устройствами и приборами контроля, а также испарители и редукционные узлы, подобранные под ваше потребление. Монтаж, обвязка и пусконаладка предлагаются как комплекс под ключ.",
    },
  },
  {
    q: {
      en: "How do I choose the tank volume?",
      uk: "Як обрати обʼєм ємності?",
      ru: "Как выбрать объём ёмкости?",
    },
    a: {
      en: "Start from the monthly consumption, the delivery frequency of your gas supplier and the required reserve. As a rule of thumb, the tank should hold 1.5–2 deliveries. Send us your consumption figures and we will size the tank and vaporizer for free.",
      uk: "Відштовхуйтесь від місячного споживання, частоти поставок вашого постачальника газу та потрібного запасу. Орієнтир: ємність має вміщати 1,5–2 поставки. Надішліть нам цифри споживання — підберемо ємність і випарник безкоштовно.",
      ru: "Отталкивайтесь от месячного потребления, частоты поставок вашего поставщика газа и необходимого запаса. Ориентир: ёмкость должна вмещать 1,5–2 поставки. Пришлите нам цифры потребления — подберём ёмкость и испаритель бесплатно.",
    },
  },
  {
    q: {
      en: "What site preparation is required?",
      uk: "Яка підготовка майданчика потрібна?",
      ru: "Какая подготовка площадки нужна?",
    },
    a: {
      en: "A reinforced concrete foundation sized for the filled tank weight, access for a tanker truck, and a fenced area with the safety distances required by the applicable standards. We provide the foundation loads and layout drawing with the quotation.",
      uk: "Залізобетонний фундамент, розрахований на масу заповненої ємності, підʼїзд для автоцистерни та огороджений майданчик із безпечними відстанями за чинними нормами. Навантаження на фундамент і схему розміщення надаємо разом із комерційною пропозицією.",
      ru: "Железобетонный фундамент, рассчитанный на массу заполненной ёмкости, подъезд для автоцистерны и огороженная площадка с безопасными расстояниями по действующим нормам. Нагрузки на фундамент и схему размещения предоставляем вместе с коммерческим предложением.",
    },
  },
];

const TANK_CATEGORY_DEFS: TankCategoryDef[] = [
  {
    gas: "co2",
    order: 10,
    volumes: [10, 20, 30, 50, 80, 100],
    title: {
      en: "Cryogenic tanks for liquid CO₂ (carbon dioxide) 10–100 m³",
      uk: "Кріогенні ємності для рідкого CO₂ (вуглекислоти, діоксиду вуглецю) 10–100 м³",
      ru: "Криогенные ёмкости для жидкого CO₂ (углекислоты, диоксида углерода) 10–100 м³",
    },
    slug: slugsOf(
      "cryogenic-co2-storage-tanks",
      "kriogenni-yemnosti-dlya-ridkogo-co2",
      "kriogennye-emkosti-dlya-zhidkogo-co2",
    ),
    short: {
      en: "Supply of stationary vacuum-insulated cryogenic tanks for liquid CO₂ storage with volumes of 10, 20, 30, 50, 80 and 100 m³. Complete with shut-off and safety valves, pressure control systems, vaporizers and pressure-reducing units. Equipment selection, supply, installation, process piping and turnkey commissioning of the CO₂ system.",
      uk: "Постачання стаціонарних вакуумно-ізольованих кріогенних ємностей для зберігання рідкого CO₂ обʼємом 10, 20, 30, 50, 80 та 100 м³. Комплектація запірною та запобіжною арматурою, системами контролю тиску, випарниками і редукційними вузлами. Підбір обладнання, постачання, монтаж, технологічна обвʼязка та запуск системи CO₂ під ключ.",
      ru: "Поставка стационарных вакуумно-изолированных криогенных ёмкостей для хранения жидкого CO₂ объёмом 10, 20, 30, 50, 80 и 100 м³. Комплектация запорной и предохранительной арматурой, системами контроля давления, испарителями и редукционными узлами. Подбор оборудования, поставка, монтаж, технологическая обвязка и запуск системы CO₂ под ключ.",
    },
    metaTitle: {
      en: "Cryogenic CO₂ storage tanks 10–100 m³ — supply and installation",
      uk: "Кріогенні ємності для рідкого CO₂ 10–100 м³ — постачання та монтаж",
      ru: "Криогенные ёмкости для жидкого CO₂ 10–100 м³ — поставка и монтаж",
    },
    metaDescription: {
      en: "Vacuum-insulated cryogenic tanks for liquid CO₂ of 10, 20, 30, 50, 80 and 100 m³ with valves, vaporizers and pressure control. Selection, supply and turnkey installation in Ukraine.",
      uk: "Вакуумно-ізольовані кріогенні ємності для рідкої вуглекислоти на 10, 20, 30, 50, 80 та 100 м³ з арматурою, випарниками та контролем тиску. Підбір, постачання і монтаж під ключ по Україні.",
      ru: "Вакуумно-изолированные криогенные ёмкости для жидкой углекислоты на 10, 20, 30, 50, 80 и 100 м³ с арматурой, испарителями и контролем давления. Подбор, поставка и монтаж под ключ по Украине.",
    },
    keywords: {
      en: "cryogenic CO2 tank, liquid CO2 storage tank, carbon dioxide tank, CO2 tank 30 m3",
      uk: "кріогенні ємності CO2, ємність для рідкої вуглекислоти, кріогенний резервуар CO2, ємність CO2 30 м3",
      ru: "криогенные емкости CO2, емкость для жидкой углекислоты, криогенный резервуар CO2, емкость CO2 30 м3",
    },
    intro: {
      en: "Stationary cryogenic tanks are the backbone of any liquid CO₂ supply system: a bottling line, a greenhouse complex, a food plant or a dry ice facility. We supply vacuum-insulated vessels from 10 to 100 m³ and build the complete system around them — from the tanker connection to the reduced-pressure gas at the consumer.",
      uk: "Стаціонарні кріогенні ємності — основа будь-якої системи постачання рідкого CO₂: лінії розливу, тепличного комплексу, харчового виробництва чи цеху сухого льоду. Ми постачаємо вакуумно-ізольовані посудини від 10 до 100 м³ і будуємо навколо них повну систему — від приймання з автоцистерни до газу зі зниженим тиском у споживача.",
      ru: "Стационарные криогенные ёмкости — основа любой системы снабжения жидким CO₂: линии розлива, тепличного комплекса, пищевого производства или цеха сухого льда. Мы поставляем вакуумно-изолированные сосуды от 10 до 100 м³ и строим вокруг них полную систему — от приёма из автоцистерны до газа с пониженным давлением у потребителя.",
    },
    scopeItems: SCOPE_CO2,
    turnkey: TURNKEY,
    faq: [
      ...FAQ_COMMON,
      {
        q: {
          en: "Can the tank be used for food-grade CO₂?",
          uk: "Чи підходить ємність для харчового CO₂?",
          ru: "Подходит ли ёмкость для пищевого CO₂?",
        },
        a: {
          en: "Yes. The vessels are supplied clean for food-grade service, and we can add a laboratory kit for CO₂ purity control according to ISBT and EIGA requirements.",
          uk: "Так. Посудини постачаються чистими для харчового сервісу, а за потреби ми доукомплектуємо систему лабораторним обладнанням для контролю чистоти CO₂ за вимогами ISBT та EIGA.",
          ru: "Да. Сосуды поставляются чистыми для пищевого сервиса, а при необходимости мы доукомплектуем систему лабораторным оборудованием для контроля чистоты CO₂ по требованиям ISBT и EIGA.",
        },
      },
    ],
  },
  {
    gas: "n2",
    order: 20,
    volumes: [10, 20, 30, 50],
    title: {
      en: "Cryogenic tanks for liquid nitrogen (LIN, N₂) 10–50 m³",
      uk: "Кріогенні ємності для рідкого азоту (LIN, N₂) 10–50 м³",
      ru: "Криогенные ёмкости для жидкого азота (LIN, N₂) 10–50 м³",
    },
    slug: slugsOf(
      "liquid-nitrogen-storage-tanks",
      "kriogenni-yemnosti-dlya-ridkogo-azotu",
      "kriogennye-emkosti-dlya-zhidkogo-azota",
    ),
    short: {
      en: "Supply of vacuum-insulated cryogenic tanks for storing liquid nitrogen LIN (N₂) with volumes of 10, 20, 30 and 50 m³. Complete with ambient vaporizers, pressure regulators, shut-off and safety valves and pipelines. Turnkey installation and commissioning of nitrogen supply systems.",
      uk: "Постачання вакуумно-ізольованих кріогенних резервуарів для зберігання рідкого азоту LIN (N₂) обʼємом 10, 20, 30 та 50 м³. Комплектація атмосферними випарниками, регуляторами тиску, запірною і запобіжною арматурою та трубопроводами. Монтаж і запуск систем газопостачання азотом під ключ.",
      ru: "Поставка вакуумно-изолированных криогенных резервуаров для хранения жидкого азота LIN (N₂) объёмом 10, 20, 30 и 50 м³. Комплектация атмосферными испарителями, регуляторами давления, запорной и предохранительной арматурой и трубопроводами. Монтаж и запуск систем газоснабжения азотом под ключ.",
    },
    metaTitle: {
      en: "Liquid nitrogen storage tanks 10–50 m³ — supply and installation",
      uk: "Кріогенні ємності для рідкого азоту 10–50 м³ — постачання та монтаж",
      ru: "Криогенные ёмкости для жидкого азота 10–50 м³ — поставка и монтаж",
    },
    metaDescription: {
      en: "Vacuum-insulated cryogenic tanks for liquid nitrogen (LIN) of 10, 20, 30 and 50 m³ with ambient vaporizers and pressure regulators. Turnkey nitrogen supply systems in Ukraine.",
      uk: "Вакуумно-ізольовані кріогенні резервуари для рідкого азоту (LIN) на 10, 20, 30 та 50 м³ з атмосферними випарниками та регуляторами тиску. Системи азотного газопостачання під ключ по Україні.",
      ru: "Вакуумно-изолированные криогенные резервуары для жидкого азота (LIN) на 10, 20, 30 и 50 м³ с атмосферными испарителями и регуляторами давления. Системы азотного газоснабжения под ключ по Украине.",
    },
    keywords: {
      en: "liquid nitrogen storage tank, LIN tank, cryogenic nitrogen tank",
      uk: "ємність для рідкого азоту, кріогенний резервуар азот, резервуар LIN",
      ru: "емкость для жидкого азота, криогенный резервуар азот, резервуар LIN",
    },
    intro: {
      en: "A stationary liquid nitrogen tank replaces cylinder deliveries with a continuous, low-cost gas supply. We supply vacuum-insulated LIN tanks from 10 to 50 m³ together with ambient vaporizers and pressure regulators, sized for your actual consumption profile.",
      uk: "Стаціонарна ємність для рідкого азоту замінює балонні поставки безперервним і дешевим газопостачанням. Ми постачаємо вакуумно-ізольовані резервуари LIN від 10 до 50 м³ разом з атмосферними випарниками та регуляторами тиску, розрахованими під ваш реальний профіль споживання.",
      ru: "Стационарная ёмкость для жидкого азота заменяет баллонные поставки непрерывным и дешёвым газоснабжением. Мы поставляем вакуумно-изолированные резервуары LIN от 10 до 50 м³ вместе с атмосферными испарителями и регуляторами давления, рассчитанными под ваш реальный профиль потребления.",
    },
    scopeItems: SCOPE_AIR_GAS,
    turnkey: TURNKEY,
    faq: FAQ_COMMON,
  },
  {
    gas: "o2",
    order: 30,
    volumes: [10, 20, 30, 50],
    title: {
      en: "Cryogenic tanks for liquid oxygen (LOX, O₂) 10–50 m³",
      uk: "Кріогенні ємності для рідкого кисню (LOX, O₂) 10–50 м³",
      ru: "Криогенные ёмкости для жидкого кислорода (LOX, O₂) 10–50 м³",
    },
    slug: slugsOf(
      "liquid-oxygen-storage-tanks",
      "kriogenni-yemnosti-dlya-ridkogo-kysnyu",
      "kriogennye-emkosti-dlya-zhidkogo-kisloroda",
    ),
    short: {
      en: "Supply of vacuum-insulated cryogenic tanks for receiving and storing liquid oxygen LOX (O₂) with volumes of 10, 20, 30 and 50 m³. Complete with ambient vaporizers, pressure regulators, shut-off and safety valves and pipelines. Supply, installation and commissioning of oxygen supply systems.",
      uk: "Постачання вакуумно-ізольованих кріогенних резервуарів для приймання та зберігання рідкого кисню LOX (O₂) обʼємом 10, 20, 30 та 50 м³. Комплектація атмосферними випарниками, регуляторами тиску, запірною і запобіжною арматурою та трубопроводами. Постачання, монтаж і введення систем кисневого газопостачання в експлуатацію.",
      ru: "Поставка вакуумно-изолированных криогенных резервуаров для приёма и хранения жидкого кислорода LOX (O₂) объёмом 10, 20, 30 и 50 м³. Комплектация атмосферными испарителями, регуляторами давления, запорной и предохранительной арматурой и трубопроводами. Поставка, монтаж и ввод систем кислородного газоснабжения в эксплуатацию.",
    },
    metaTitle: {
      en: "Liquid oxygen storage tanks 10–50 m³ — supply and installation",
      uk: "Кріогенні ємності для рідкого кисню 10–50 м³ — постачання та монтаж",
      ru: "Криогенные ёмкости для жидкого кислорода 10–50 м³ — поставка и монтаж",
    },
    metaDescription: {
      en: "Vacuum-insulated cryogenic tanks for liquid oxygen (LOX) of 10, 20, 30 and 50 m³ with oxygen-service valves, vaporizers and regulators. Turnkey oxygen supply systems for hospitals and industry.",
      uk: "Вакуумно-ізольовані кріогенні резервуари для рідкого кисню (LOX) на 10, 20, 30 та 50 м³ з кисневою арматурою, випарниками та регуляторами. Кисневе газопостачання під ключ для лікарень і промисловості.",
      ru: "Вакуумно-изолированные криогенные резервуары для жидкого кислорода (LOX) на 10, 20, 30 и 50 м³ с кислородной арматурой, испарителями и регуляторами. Кислородное газоснабжение под ключ для больниц и промышленности.",
    },
    keywords: {
      en: "liquid oxygen storage tank, LOX tank, cryogenic oxygen tank hospital",
      uk: "ємність для рідкого кисню, кріогенний резервуар кисень, резервуар LOX",
      ru: "емкость для жидкого кислорода, криогенный резервуар кислород, резервуар LOX",
    },
    intro: {
      en: "Liquid oxygen storage is critical infrastructure for hospitals, steel plants and glassworks. We supply vacuum-insulated LOX tanks from 10 to 50 m³, prepared for oxygen service, together with vaporizers and regulators, and bring the system into operation with all the required documentation.",
      uk: "Зберігання рідкого кисню — критична інфраструктура для лікарень, металургійних і скляних заводів. Ми постачаємо вакуумно-ізольовані резервуари LOX від 10 до 50 м³, підготовлені для кисневого сервісу, разом із випарниками та регуляторами, і вводимо систему в експлуатацію з усією необхідною документацією.",
      ru: "Хранение жидкого кислорода — критическая инфраструктура для больниц, металлургических и стекольных заводов. Мы поставляем вакуумно-изолированные резервуары LOX от 10 до 50 м³, подготовленные для кислородного сервиса, вместе с испарителями и регуляторами, и вводим систему в эксплуатацию со всей необходимой документацией.",
    },
    scopeItems: SCOPE_AIR_GAS,
    turnkey: TURNKEY,
    faq: FAQ_COMMON,
  },
  {
    gas: "ar",
    order: 40,
    volumes: [10, 20, 30, 50],
    title: {
      en: "Cryogenic tanks for liquid argon (LAR, Ar) 10–50 m³",
      uk: "Кріогенні ємності для рідкого аргону (LAR, Ar) 10–50 м³",
      ru: "Криогенные ёмкости для жидкого аргона (LAR, Ar) 10–50 м³",
    },
    slug: slugsOf(
      "liquid-argon-storage-tanks",
      "kriogenni-yemnosti-dlya-ridkogo-argonu",
      "kriogennye-emkosti-dlya-zhidkogo-argona",
    ),
    short: {
      en: "Supply of vacuum-insulated cryogenic tanks for storing liquid argon LAR (Ar) with volumes of 10, 20, 30 and 50 m³. Complete with ambient vaporizers, pressure regulators, shut-off and safety valves. Turnkey installation of argon supply systems.",
      uk: "Постачання вакуумно-ізольованих кріогенних ємностей для зберігання рідкого аргону LAR (Ar) обʼємом 10, 20, 30 та 50 м³. Комплектація атмосферними випарниками, регуляторами тиску, запірною та запобіжною арматурою. Монтаж систем газопостачання аргоном під ключ.",
      ru: "Поставка вакуумно-изолированных криогенных ёмкостей для хранения жидкого аргона LAR (Ar) объёмом 10, 20, 30 и 50 м³. Комплектация атмосферными испарителями, регуляторами давления, запорной и предохранительной арматурой. Монтаж систем газоснабжения аргоном под ключ.",
    },
    metaTitle: {
      en: "Liquid argon storage tanks 10–50 m³ — supply and installation",
      uk: "Кріогенні ємності для рідкого аргону 10–50 м³ — постачання та монтаж",
      ru: "Криогенные ёмкости для жидкого аргона 10–50 м³ — поставка и монтаж",
    },
    metaDescription: {
      en: "Vacuum-insulated cryogenic tanks for liquid argon (LAR) of 10, 20, 30 and 50 m³ with ambient vaporizers and regulators. Turnkey argon supply for welding and metallurgy in Ukraine.",
      uk: "Вакуумно-ізольовані кріогенні ємності для рідкого аргону (LAR) на 10, 20, 30 та 50 м³ з атмосферними випарниками та регуляторами. Аргонове газопостачання під ключ для зварювання й металургії по Україні.",
      ru: "Вакуумно-изолированные криогенные ёмкости для жидкого аргона (LAR) на 10, 20, 30 и 50 м³ с атмосферными испарителями и регуляторами. Аргоновое газоснабжение под ключ для сварки и металлургии по Украине.",
    },
    keywords: {
      en: "liquid argon storage tank, LAR tank, cryogenic argon tank",
      uk: "ємність для рідкого аргону, кріогенний резервуар аргон, резервуар LAR",
      ru: "емкость для жидкого аргона, криогенный резервуар аргон, резервуар LAR",
    },
    intro: {
      en: "For welding shops, steelmakers and electronics plants a stationary argon tank pays back quickly against cylinder supply. We supply vacuum-insulated LAR tanks from 10 to 50 m³ with ambient vaporizers and regulators, and install the complete argon line to the consumers.",
      uk: "Для зварювальних цехів, металургів та виробників електроніки стаціонарна ємність для аргону швидко окупається порівняно з балонним постачанням. Ми постачаємо вакуумно-ізольовані ємності LAR від 10 до 50 м³ з атмосферними випарниками та регуляторами і монтуємо повну аргонову лінію до споживачів.",
      ru: "Для сварочных цехов, металлургов и производителей электроники стационарная ёмкость для аргона быстро окупается по сравнению с баллонным снабжением. Мы поставляем вакуумно-изолированные ёмкости LAR от 10 до 50 м³ с атмосферными испарителями и регуляторами и монтируем полную аргоновую линию до потребителей.",
    },
    scopeItems: SCOPE_AIR_GAS,
    turnkey: TURNKEY,
    faq: FAQ_COMMON,
  },
];

function slugsOf(en: string, uk: string, ru: string) {
  return slugs(en, uk, ru);
}

/* ─── Побудова категорій ──────────────────────────────────────────────── */

const SCOPE_HEADING: L = {
  en: "Scope of supply",
  uk: "Комплектація",
  ru: "Комплектация",
};
const TURNKEY_HEADING: L = {
  en: "Turnkey delivery",
  uk: "Під ключ",
  ru: "Под ключ",
};
const VOLUMES_HEADING: L = {
  en: "Available volumes",
  uk: "Доступні обʼєми",
  ru: "Доступные объёмы",
};

function volumesSentence(def: TankCategoryDef, lang: keyof L): string {
  const list = def.volumes.join(", ");
  const g = GASES[def.gas];
  return {
    en: `Tanks for ${g.gen.en} are available in ${list} m³. Smaller volumes suit workshops and pilot lines; 30 m³ and above are typical for continuous industrial consumption and for sites that receive full tanker deliveries.`,
    uk: `Ємності для ${g.gen.uk} доступні в обʼємах ${list} м³. Менші обʼєми підходять для цехів і пілотних ліній; від 30 м³ — типовий вибір для безперервного промислового споживання та майданчиків, що приймають повну автоцистерну.`,
    ru: `Ёмкости для ${g.gen.ru} доступны в объёмах ${list} м³. Меньшие объёмы подходят для цехов и пилотных линий; от 30 м³ — типичный выбор для непрерывного промышленного потребления и площадок, принимающих полную автоцистерну.`,
  }[lang];
}

export function buildTankCategory(def: TankCategoryDef): SeedCategory {
  const g = GASES[def.gas];
  return {
    _id: `cat-tanks-${def.gas}`,
    _updatedAt: SEED_UPDATED_AT,
    title: def.title,
    slug: def.slug,
    order: def.order,
    isVisible: true,
    shortDescription: def.short,
    description: blocks((lang) => [
      p(def.intro[lang], `c-${def.gas}`),
      p(g.storageNote[lang], `c-${def.gas}`),
      h2(VOLUMES_HEADING[lang], `c-${def.gas}`),
      p(volumesSentence(def, lang), `c-${def.gas}`),
      h2(SCOPE_HEADING[lang], `c-${def.gas}`),
      ...def.scopeItems.map((item) => li(item[lang], `c-${def.gas}`)),
      h2(TURNKEY_HEADING[lang], `c-${def.gas}`),
      p(def.turnkey[lang], `c-${def.gas}`),
    ]),
    image: img(TANK_IMAGES.yard, {
      en: `Cryogenic storage tanks for ${g.nom.en}`,
      uk: `Кріогенні ємності для зберігання ${g.gen.uk.split(" (")[0]}`,
      ru: `Криогенные ёмкости для хранения ${g.gen.ru.split(" (")[0]}`,
    }),
    faq: def.faq.map((item, index) =>
      faq(`faq-${def.gas}-${index}`, item.q, item.a),
    ),
    seo: {
      metaTitle: def.metaTitle,
      metaDescription: def.metaDescription,
      keywords: def.keywords,
    },
    productCount: def.volumes.length,
  };
}

/* ─── Товари: одна ємність на кожен обʼєм ─────────────────────────────── */

function volumeHint(gas: GasKey, volume: number): L {
  if (gas === "co2") {
    if (volume <= 10)
      return {
        en: "The 10 m³ tank is the entry-level option for small bottling lines, breweries, greenhouses and workshops with moderate CO₂ consumption.",
        uk: "Ємність на 10 м³ — стартовий варіант для невеликих ліній розливу, пивоварень, теплиць і цехів із помірним споживанням CO₂.",
        ru: "Ёмкость на 10 м³ — стартовый вариант для небольших линий розлива, пивоварен, теплиц и цехов с умеренным потреблением CO₂.",
      };
    if (volume <= 30)
      return {
        en: `The ${volume} m³ tank is the most common choice for beverage plants, food producers and greenhouse complexes: it takes a full tanker delivery and leaves a working reserve.`,
        uk: `Ємність на ${volume} м³ — найпоширеніший вибір для заводів напоїв, харчових виробництв і тепличних комплексів: вона приймає повну автоцистерну й лишає робочий запас.`,
        ru: `Ёмкость на ${volume} м³ — самый распространённый выбор для заводов напитков, пищевых производств и тепличных комплексов: она принимает полную автоцистерну и оставляет рабочий запас.`,
      };
    if (volume <= 50)
      return {
        en: "The 50 m³ tank is intended for large beverage and food plants and for dry ice production where daily CO₂ consumption is measured in tonnes.",
        uk: "Ємність на 50 м³ призначена для великих заводів напоїв і харчових виробництв, а також для цехів сухого льоду, де добове споживання CO₂ вимірюється тоннами.",
        ru: "Ёмкость на 50 м³ предназначена для крупных заводов напитков и пищевых производств, а также для цехов сухого льда, где суточное потребление CO₂ измеряется тоннами.",
      };
    return {
      en: `The ${volume} m³ tank is a buffer storage for CO₂ producers, distributors and large industrial consumers: it accumulates product from a recovery or liquefaction unit and smooths out delivery schedules.`,
      uk: `Ємність на ${volume} м³ — буферне сховище для виробників CO₂, дистрибʼюторів і великих промислових споживачів: вона накопичує продукт з установки уловлювання чи зрідження та вирівнює графік відвантажень.`,
      ru: `Ёмкость на ${volume} м³ — буферное хранилище для производителей CO₂, дистрибьюторов и крупных промышленных потребителей: она накапливает продукт с установки улавливания или сжижения и выравнивает график отгрузок.`,
    };
  }
  if (volume <= 10)
    return {
      en: "The 10 m³ tank suits laboratories, hospitals, workshops and food producers that are moving away from cylinder supply.",
      uk: "Ємність на 10 м³ підходить лабораторіям, лікарням, цехам і харчовим виробництвам, які відмовляються від балонного постачання.",
      ru: "Ёмкость на 10 м³ подходит лабораториям, больницам, цехам и пищевым производствам, которые отказываются от баллонного снабжения.",
    };
  if (volume <= 30)
    return {
      en: `The ${volume} m³ tank is the standard choice for medium-sized plants with continuous consumption: it accepts a full tanker delivery and keeps a reserve between deliveries.`,
      uk: `Ємність на ${volume} м³ — стандартний вибір для середніх підприємств із безперервним споживанням: вона приймає повну автоцистерну та зберігає запас між поставками.`,
      ru: `Ёмкость на ${volume} м³ — стандартный выбор для средних предприятий с непрерывным потреблением: она принимает полную автоцистерну и хранит запас между поставками.`,
    };
  return {
    en: "The 50 m³ tank is designed for large industrial sites — metallurgy, chemical plants, regional hospitals — where supply interruptions are unacceptable.",
    uk: "Ємність на 50 м³ розрахована на великі промислові майданчики — металургію, хімічні заводи, обласні лікарні — де перебої в постачанні неприпустимі.",
    ru: "Ёмкость на 50 м³ рассчитана на крупные промышленные площадки — металлургию, химические заводы, областные больницы — где перебои в снабжении недопустимы.",
  };
}

function buildTankProduct(
  def: TankCategoryDef,
  category: SeedCategory,
  volume: number,
  index: number,
): SeedProduct {
  const g = GASES[def.gas];
  const title: L = {
    en: `Cryogenic tank for ${g.nom.en} ${volume} m³`,
    uk: `Кріогенна ємність для ${g.gen.uk.split(" (")[0]} ${volume} м³`,
    ru: `Криогенная ёмкость для ${g.gen.ru.split(" (")[0]} ${volume} м³`,
  };
  const hint = volumeHint(def.gas, volume);
  const sku = `CT-${g.key.toUpperCase()}-${volume}`;

  return {
    _id: `product-tank-${def.gas}-${volume}`,
    _updatedAt: SEED_UPDATED_AT,
    title,
    slug: slugs(
      `cryogenic-${g.slug.en === "co2" ? "co2" : g.slug.en}-tank-${volume}-m3`,
      `kriogenna-yemnist-${g.slug.uk}-${volume}-m3`,
      `kriogennaya-emkost-${g.slug.ru}-${volume}-m3`,
    ),
    model: sku,
    sku,
    isPublished: true,
    isFeatured: def.gas === "co2" && (volume === 30 || volume === 50),
    order: def.order * 10 + index,
    publishedAt: SEED_UPDATED_AT,
    category,
    gallery: tankGallery(def.gas, title),
    shortDescription: {
      en: `Stationary vacuum-insulated cryogenic tank for storing ${g.gen.en}, geometric volume ${volume} m³. Supplied with valves, pressure control, vaporizers and a pressure-reducing unit; turnkey installation available.`,
      uk: `Стаціонарна вакуумно-ізольована кріогенна ємність для зберігання ${g.gen.uk}, геометричний обʼєм ${volume} м³. Постачається з арматурою, контролем тиску, випарниками та редукційним вузлом; можливий монтаж під ключ.`,
      ru: `Стационарная вакуумно-изолированная криогенная ёмкость для хранения ${g.gen.ru}, геометрический объём ${volume} м³. Поставляется с арматурой, контролем давления, испарителями и редукционным узлом; возможен монтаж под ключ.`,
    },
    description: blocks((lang) => [
      p(hint[lang], `p-${def.gas}-${volume}`),
      p(g.storageNote[lang], `p-${def.gas}-${volume}`),
      h2(SCOPE_HEADING[lang], `p-${def.gas}-${volume}`),
      ...def.scopeItems.map((item) => li(item[lang], `p-${def.gas}-${volume}`)),
      h2(TURNKEY_HEADING[lang], `p-${def.gas}-${volume}`),
      p(def.turnkey[lang], `p-${def.gas}-${volume}`),
    ]),
    features: [
      {
        en: "Vacuum-insulated stationary vessel",
        uk: "Стаціонарна вакуумно-ізольована посудина",
        ru: "Стационарный вакуумно-изолированный сосуд",
      },
      {
        en: "Shut-off and safety valves, pressure and level control",
        uk: "Запірна та запобіжна арматура, контроль тиску й рівня",
        ru: "Запорная и предохранительная арматура, контроль давления и уровня",
      },
      {
        en: "Vaporizers and pressure-reducing unit sized for the consumer",
        uk: "Випарники та редукційний вузол, підібрані під споживача",
        ru: "Испарители и редукционный узел, подобранные под потребителя",
      },
      {
        en: "Installation, process piping and commissioning by our team",
        uk: "Монтаж, технологічна обвʼязка та пусконалагодження нашою командою",
        ru: "Монтаж, технологическая обвязка и пусконаладка нашей командой",
      },
    ],
    applications: g.applications,
    specs: [
      spec(
        `s-vol`,
        LABELS.volume,
        { en: `${volume} m³`, uk: `${volume} м³`, ru: `${volume} м³` },
        LABELS.groupMain,
      ),
      spec(`s-prod`, LABELS.product, g.gen, LABELS.groupMain),
      spec(
        `s-type`,
        LABELS.type,
        {
          en: "Stationary, vacuum-insulated",
          uk: "Стаціонарна, вакуумно-ізольована",
          ru: "Стационарная, вакуумно-изолированная",
        },
        LABELS.groupMain,
      ),
      spec(
        `s-scope`,
        LABELS.scope,
        {
          en: def.scopeItems.map((item) => item.en).join("; "),
          uk: def.scopeItems.map((item) => item.uk).join("; "),
          ru: def.scopeItems.map((item) => item.ru).join("; "),
        },
        LABELS.groupScope,
      ),
      spec(
        `s-press`,
        {
          en: "Working pressure, dimensions, weight",
          uk: "Робочий тиск, габарити, маса",
          ru: "Рабочее давление, габариты, масса",
        },
        LABELS.onRequest,
        LABELS.groupMain,
      ),
    ],
    faq: [],
    priceOnRequest: true,
    availability: "madeToOrder",
    currency: "EUR",
    seo: {
      metaTitle: {
        en: `${title.en} — supply and installation`,
        uk: `${title.uk} — постачання та монтаж`,
        ru: `${title.ru} — поставка и монтаж`,
      },
      metaDescription: {
        en: `Vacuum-insulated cryogenic tank for ${g.gen.en}, ${volume} m³, with valves, vaporizers and pressure control. Selection, supply, installation and commissioning in Ukraine.`,
        uk: `Вакуумно-ізольована кріогенна ємність для ${g.gen.uk} на ${volume} м³ з арматурою, випарниками та контролем тиску. Підбір, постачання, монтаж і запуск по Україні.`,
        ru: `Вакуумно-изолированная криогенная ёмкость для ${g.gen.ru} на ${volume} м³ с арматурой, испарителями и контролем давления. Подбор, поставка, монтаж и запуск по Украине.`,
      },
      keywords: {
        en: `cryogenic tank ${volume} m3, ${g.nom.en} tank ${volume} m3`,
        uk: `кріогенна ємність ${volume} м3, ємність ${g.gen.uk.split(" (")[0]} ${volume} м3`,
        ru: `криогенная емкость ${volume} м3, емкость ${g.gen.ru.split(" (")[0]} ${volume} м3`,
      },
    },
  };
}

export const tankCategories: SeedCategory[] =
  TANK_CATEGORY_DEFS.map(buildTankCategory);

export const tankProducts: SeedProduct[] = TANK_CATEGORY_DEFS.flatMap(
  (def, catIndex) =>
    def.volumes.map((volume, index) =>
      buildTankProduct(def, tankCategories[catIndex], volume, index),
    ),
);
