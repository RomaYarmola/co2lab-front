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
  table,
  type L,
  type SeedCategory,
  type SeedImage,
  type SeedProduct,
} from "./helpers.ts";
import { GASES, type GasKey } from "./gases.ts";
import { co2VaporizerCategory, installationCategory } from "./equipment.ts";
import {
  CO2_TANK_CATEGORY_SLUG,
  CO2_TANKS,
  CO2_TANK_PRESSURES,
  formatEur,
  num,
  priceFrom,
  type Co2TankModel,
} from "./models.ts";

/* ─── Фото ─────────────────────────────────────────────────────────────
 * `/images/catalog/*` — фото клієнта з каталогу «Кріогенне обладнання»
 * (витягнуті з docx). Решта — знімки з маркетингових сторінок сайту.
 */

const TANK_IMAGES = {
  onSite: "/images/catalog/cryogenic-tank-with-ambient-vaporizer.webp",
  vertical: "/images/catalog/cryogenic-storage-tank-vertical.webp",
  install: "/images/catalog/cryogenic-tank-installation-crane.webp",
  valves: "/images/equipmentAndSystemsPage/criogenicTanks/imageThree.webp",
  engineer: "/images/equipmentAndSystemsPage/engineering/imageThree.webp",
};

function tankGallery(gas: GasKey, title: L): SeedImage[] {
  const g = GASES[gas];
  const base = [
    img(
      TANK_IMAGES.onSite,
      {
        en: `Vertical cryogenic tank for ${g.nom.en} with an ambient air vaporizer on a customer site`,
        uk: `Вертикальна кріогенна ємність для ${g.gen.uk.split(" (")[0]} з атмосферним випарником на майданчику замовника`,
        ru: `Вертикальная криогенная ёмкость для ${g.gen.ru.split(" (")[0]} с атмосферным испарителем на площадке заказчика`,
      },
      `${gas}-g1`,
    ),
    img(
      TANK_IMAGES.vertical,
      {
        en: `${title.en} — vacuum-insulated vessel with valve group and pressure gauge`,
        uk: `${title.uk} — вакуумно-ізольована посудина з групою арматури та манометром`,
        ru: `${title.ru} — вакуумно-изолированный сосуд с группой арматуры и манометром`,
      },
      `${gas}-g2`,
    ),
    img(
      TANK_IMAGES.valves,
      {
        en: "Shut-off and safety valves, pressure control unit of a cryogenic tank",
        uk: "Запірна та запобіжна арматура, вузол контролю тиску кріогенної ємності",
        ru: "Запорная и предохранительная арматура, узел контроля давления криогенной ёмкости",
      },
      `${gas}-g3`,
    ),
    img(
      TANK_IMAGES.install,
      {
        en: "Delivery of a cryogenic tank on a low-loader and lifting by crane on site",
        uk: "Доставка кріогенної ємності тралом і підйом краном на майданчику",
        ru: "Доставка криогенной ёмкости тралом и подъём краном на площадке",
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
      en: "The vacuum-insulated vessel comes with its piping: shut-off and safety valves and pressure and level instruments. Vaporizers and pressure-reducing units are selected for your consumption. Installation, pipelines to the consumer and commissioning are offered as a turnkey package.",
      uk: "Вакуумно-ізольована посудина приходить з обвʼязкою: запірною та запобіжною арматурою, приладами контролю тиску й рівня. Випарники й редукційні вузли підбираємо під ваше споживання. Монтаж, трубопроводи до споживача й пусконалагодження пропонуємо комплексом під ключ.",
      ru: "Вакуумно-изолированный сосуд приходит с обвязкой: запорной и предохранительной арматурой, приборами контроля давления и уровня. Испарители и редукционные узлы подбираем под ваше потребление. Монтаж, трубопроводы до потребителя и пусконаладку предлагаем комплексом под ключ.",
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
      en: "Will you help with the foundation?",
      uk: "Чи допоможете з фундаментом?",
      ru: "Поможете ли с фундаментом?",
    },
    a: {
      en: "Yes. We provide the basic data for the foundation design, and your contractor builds it for the specific site. The foundation is sized for the weight of the filled tank; the site also needs tanker access and a fenced area with the safety distances required by the standards.",
      uk: "Так. Надаємо базові дані для проєкту фундаменту, за якими ваш підрядник робить його під конкретний майданчик. Фундамент розраховують на масу заповненої ємності; ще потрібні підʼїзд для автоцистерни й огороджений майданчик із безпечними відстанями за нормами.",
      ru: "Да. Предоставляем базовые данные для проекта фундамента, по которым ваш подрядчик делает его под конкретную площадку. Фундамент рассчитывают на массу заполненной ёмкости; ещё нужны подъезд для автоцистерны и огороженная площадка с безопасными расстояниями по нормам.",
    },
  },
  {
    q: {
      en: "How is the tank registered with the State Labour Service?",
      uk: "Як зареєструвати ємність у Держпраці?",
      ru: "Как зарегистрировать ёмкость в Гоструда?",
    },
    a: {
      en: "The tank arrives with a full document package and all certificates from the European manufacturer. A specialised company then issues the pressure vessel passport, and this set is submitted to the State Labour Service (Derzhpratsi).",
      uk: "Ємність приїжджає з повним пакетом документів і всіма сертифікатами європейського виробника. На їх основі спеціалізована компанія оформлює паспорт посудини, після чого комплект подається в Держпраці.",
      ru: "Ёмкость приезжает с полным пакетом документов и всеми сертификатами европейского производителя. На их основе специализированная компания оформляет паспорт сосуда, после чего комплект подаётся в Гоструда (Держпраці).",
    },
  },
  {
    q: {
      en: "Do you pipe tanks supplied by others?",
      uk: "Чи обвʼязуєте ємності інших постачальників?",
      ru: "Обвязываете ли ёмкости других поставщиков?",
    },
    a: {
      en: "No. We take responsibility for the system we have selected and supplied ourselves: tank, vaporizer, pipelines and start-up. If you have your own installer, we can sell just the tank or the vaporizer.",
      uk: "Ні. Ми відповідаємо за систему, яку підібрали й постачили самі: ємність, випарник, трубопроводи й запуск. Якщо у вас свій монтажник, можемо продати лише ємність або випарник.",
      ru: "Нет. Мы отвечаем за систему, которую подобрали и поставили сами: ёмкость, испаритель, трубопроводы и запуск. Если у вас свой монтажник, можем продать только ёмкость или испаритель.",
    },
  },
];

const TANK_CATEGORY_DEFS: TankCategoryDef[] = [
  {
    gas: "co2",
    order: 10,
    // Модельний ряд CO₂ — у models.ts (ZVT 3…60), товари будує buildCo2TankProduct
    volumes: [],
    title: {
      en: "Cryogenic tanks for liquid CO₂ (carbon dioxide) 3–60 m³",
      uk: "Кріогенні ємності для рідкого CO₂ (вуглекислоти, діоксиду вуглецю) 3–60 м³",
      ru: "Криогенные ёмкости для жидкого CO₂ (углекислоты, диоксида углерода) 3–60 м³",
    },
    slug: slugsOf(
      CO2_TANK_CATEGORY_SLUG.en,
      CO2_TANK_CATEGORY_SLUG.uk,
      CO2_TANK_CATEGORY_SLUG.ru,
    ),
    short: {
      en: "Vertical vacuum-insulated ZVT tanks for stationary storage of liquid CO₂: nine models from 3.28 to 60.51 m³ (3.4–63.5 t of LCO₂), working pressure 18, 22 or 37 bar. Prices from €17,000 excl. VAT. A tank with its piping on its own, or a turnkey system with vaporizer, pipelines and commissioning.",
      uk: "Вертикальні вакуумно-ізольовані ємності ZVT для стаціонарного зберігання рідкого CO₂: девʼять моделей від 3,28 до 60,51 м³ (3,4–63,5 т LCO₂), робочий тиск 18, 22 або 37 бар. Ціни від 17 000 € без ПДВ. Ємність з обвʼязкою окремо або система під ключ — з випарником, трубопроводами й пусконалагодженням.",
      ru: "Вертикальные вакуумно-изолированные ёмкости ZVT для стационарного хранения жидкого CO₂: девять моделей от 3,28 до 60,51 м³ (3,4–63,5 т LCO₂), рабочее давление 18, 22 или 37 бар. Цены от 17 000 € без НДС. Ёмкость с обвязкой отдельно или система под ключ — с испарителем, трубопроводами и пусконаладкой.",
    },
    metaTitle: {
      en: "Liquid CO₂ tanks 3–60 m³ — prices from €17,000",
      uk: "Ємності для вуглекислоти 3–60 м³ — ціни від 17 000 €",
      ru: "Ёмкости для углекислоты 3–60 м³ — цены от 17 000 €",
    },
    metaDescription: {
      en: "Nine cryogenic tank models for liquid CO₂: 3.3–60.5 m³, 18/22/37 bar, supplied with piping. Prices from €17,000 excl. VAT. Turnkey installation in Ukraine.",
      uk: "Девʼять моделей ємностей для рідкого CO₂: 3,3–60,5 м³, тиск 18/22/37 бар, з обвʼязкою. Ціни від 17 000 € без ПДВ. Монтаж під ключ по Україні.",
      ru: "Девять моделей ёмкостей для жидкого CO₂: 3,3–60,5 м³, давление 18/22/37 бар, с обвязкой. Цены от 17 000 € без НДС. Монтаж под ключ по Украине.",
    },
    keywords: {
      en: "liquid CO2 storage tank, cryogenic CO2 tank price, carbon dioxide tank, LCO2 tank",
      uk: "ємність для вуглекислоти, бочка для вуглекислоти, кріогенна ємність CO2 ціна, ємність для діоксиду вуглецю, резервуар двоокису вуглецю",
      ru: "емкость для углекислоты, бочка для углекислоты, криогенная емкость CO2 цена, емкость для диоксида углерода, резервуар двуокиси углерода",
    },
    intro: {
      en: "A stationary cryogenic tank is the backbone of a liquid CO₂ supply system for a bottling line, a greenhouse, a food plant or a dry ice facility. We supply vertical vacuum-insulated ZVT tanks from 3.28 to 60.51 m³ and, where needed, build the whole system around them — from the tanker connection to gas at the right pressure at the point of use.",
      uk: "Стаціонарна кріогенна ємність — основа системи постачання рідкого CO₂ для лінії розливу, теплиці, харчового виробництва чи цеху сухого льоду. Постачаємо вертикальні вакуумно-ізольовані ємності ZVT від 3,28 до 60,51 м³ і за потреби будуємо навколо них усю систему — від приймання з автоцистерни до газу потрібного тиску в точці споживання.",
      ru: "Стационарная криогенная ёмкость — основа системы снабжения жидким CO₂ для линии розлива, теплицы, пищевого производства или цеха сухого льда. Поставляем вертикальные вакуумно-изолированные ёмкости ZVT от 3,28 до 60,51 м³ и при необходимости строим вокруг них всю систему — от приёма из автоцистерны до газа нужного давления в точке потребления.",
    },
    scopeItems: SCOPE_CO2,
    turnkey: TURNKEY,
    faq: [],
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
      en: "Liquid nitrogen storage tanks 10–50 m³",
      uk: "Кріогенні ємності для рідкого азоту 10–50 м³",
      ru: "Криогенные ёмкости для жидкого азота 10–50 м³",
    },
    metaDescription: {
            en: "Vacuum-insulated tanks for liquid nitrogen (LIN): 10, 20, 30 and 50 m³ with ambient vaporizers. Selection, supply and installation in Ukraine.",
      uk: "Вакуумно-ізольовані резервуари для рідкого азоту (LIN) на 10, 20, 30 і 50 м³ з атмосферними випарниками. Підбір, постачання й монтаж по Україні.",
      ru: "Вакуумно-изолированные резервуары для жидкого азота (LIN) на 10, 20, 30 и 50 м³ с атмосферными испарителями. Подбор, поставка и монтаж.",
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
      en: "Liquid oxygen storage tanks 10–50 m³",
      uk: "Кріогенні ємності для рідкого кисню 10–50 м³",
      ru: "Криогенные ёмкости для жидкого кислорода 10–50 м³",
    },
    metaDescription: {
            en: "Vacuum-insulated tanks for liquid oxygen (LOX): 10, 20, 30 and 50 m³ with oxygen-service valves. Selection, supply and installation in Ukraine.",
      uk: "Вакуумно-ізольовані резервуари для рідкого кисню (LOX) на 10, 20, 30 і 50 м³ з кисневою арматурою. Підбір, постачання й монтаж по Україні.",
      ru: "Вакуумно-изолированные резервуары для жидкого кислорода (LOX) на 10, 20, 30 и 50 м³ с кислородной арматурой. Подбор, поставка и монтаж.",
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
      en: "Liquid argon storage tanks 10–50 m³",
      uk: "Кріогенні ємності для рідкого аргону 10–50 м³",
      ru: "Криогенные ёмкости для жидкого аргона 10–50 м³",
    },
    metaDescription: {
            en: "Vacuum-insulated tanks for liquid argon (LAR): 10, 20, 30 and 50 m³ with ambient vaporizers. Selection, supply and installation in Ukraine.",
      uk: "Вакуумно-ізольовані ємності для рідкого аргону (LAR) на 10, 20, 30 і 50 м³ з атмосферними випарниками. Підбір, постачання й монтаж по Україні.",
      ru: "Вакуумно-изолированные ёмкости для жидкого аргона (LAR) на 10, 20, 30 и 50 м³ с атмосферными испарителями. Подбор, поставка и монтаж.",
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

/**
 * Густина рідини (кг/м³) і вихід газу з 1 кг (м³ за 15 °C, 1 бар) — для
 * таблиці «скільки вміщає ємність». Ті самі значення, що в статті
 * «Ціна CO₂ за кг, м³ і тонну», щоб цифри на сайті не розходились.
 */
const LIQUID = {
  co2: { density: 1030, gasPerKg: 0.54 },
  n2: { density: 809, gasPerKg: 0.84 },
  o2: { density: 1141, gasPerKg: 0.74 },
  ar: { density: 1394, gasPerKg: 0.59 },
} as const;

/** Типове застосування за обʼємом — однакове для всіх газів. */
function volumeUse(volume: number): L {
  if (volume <= 10)
    return { en: "pilot lines, small workshops and laboratories", uk: "пілотні лінії, невеликі цехи й лабораторії", ru: "пилотные линии, небольшие цеха и лаборатории" };
  if (volume <= 20)
    return { en: "medium plants with steady consumption", uk: "середні виробництва з рівномірним споживанням", ru: "средние производства с равномерным потреблением" };
  if (volume <= 30)
    return { en: "continuous consumption, takes a full road tanker", uk: "безперервне споживання, приймає повну автоцистерну", ru: "непрерывное потребление, принимает полную автоцистерну" };
  if (volume <= 50)
    return { en: "large plants, several consumers on one site", uk: "великі виробництва, кілька споживачів на майданчику", ru: "крупные производства, несколько потребителей на площадке" };
  return { en: "producers and distributors, buffer storage", uk: "виробники й дистрибʼютори, буферне зберігання", ru: "производители и дистрибьюторы, буферное хранение" };
}

const fmt = (value: number, lang: keyof L) =>
  lang === "en" ? value.toFixed(1) : value.toFixed(1).replace(".", ",");

function volumeTable(def: TankCategoryDef, lang: keyof L) {
  const { density, gasPerKg } = LIQUID[def.gas];
  const head = {
    en: "Volume | Liquid, t | Gas, thousand m³ | Typical use",
    uk: "Обʼєм | Рідини, т | Газу, тис. м³ | Типове застосування",
    ru: "Объём | Жидкости, т | Газа, тыс. м³ | Типовое применение",
  }[lang];
  const rows = def.volumes.map((volume) => {
    const tonnes = (volume * density * 0.92) / 1000;
    return `${volume} ${lang === "en" ? "m³" : "м³"} | ${fmt(tonnes, lang)} | ${fmt(tonnes * gasPerKg, lang)} | ${volumeUse(volume)[lang]}`;
  });
  return table([head, ...rows], {
    en: "How much product a tank holds at about 92% fill; gas at 15 °C and 1 bar",
    uk: "Скільки продукту вміщає ємність за заповнення близько 92%; газ за 15 °C і 1 бар",
    ru: "Сколько продукта вмещает ёмкость при заполнении около 92%; газ при 15 °C и 1 бар",
  }, `c-${def.gas}`);
}

const PRICE_HEADING: L = { en: "What drives the price", uk: "Від чого залежить ціна", ru: "От чего зависит цена" };
const PRICE_ITEMS: L[] = [
  { en: "Volume and working pressure of the vessel — the largest part of the cost.", uk: "Обʼєм і робочий тиск посудини — найбільша частина вартості.", ru: "Объём и рабочее давление сосуда — самая большая часть стоимости." },
  { en: "Scope: vaporizer, pressure building, valves and metering.", uk: "Комплектація: випарник, система підняття тиску, арматура й прилади обліку.", ru: "Комплектация: испаритель, система подъёма давления, арматура и приборы учёта." },
  { en: "Vertical or horizontal design, dictated by the site.", uk: "Вертикальне чи горизонтальне виконання — диктує майданчик.", ru: "Вертикальное или горизонтальное исполнение — диктует площадка." },
  { en: "Installation: foundation, piping, tanker access, commissioning.", uk: "Монтаж: фундамент, обвʼязка, підʼїзд для автоцистерни, пусконалагодження.", ru: "Монтаж: фундамент, обвязка, подъезд для автоцистерны, пусконаладка." },
  { en: "Oversized cargo delivery to the site.", uk: "Доставка негабаритного вантажу до майданчика.", ru: "Доставка негабаритного груза до площадки." },
];
const PRICE_NOTE: L = {
  en: "We fix the price in a quotation after sizing the tank to your consumption — so you do not pay for volume you will not use.",
  uk: "Ціну фіксуємо в комерційній пропозиції після підбору під ваше споживання — так ви не платите за обʼєм, який не використаєте.",
  ru: "Цену фиксируем в коммерческом предложении после подбора под ваше потребление — так вы не платите за объём, который не используете.",
};

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
      volumeTable(def, lang),
      h2(SCOPE_HEADING[lang], `c-${def.gas}`),
      ...def.scopeItems.map((item) => li(item[lang], `c-${def.gas}`)),
      h2(TURNKEY_HEADING[lang], `c-${def.gas}`),
      p(def.turnkey[lang], `c-${def.gas}`),
      h2(PRICE_HEADING[lang], `c-${def.gas}`),
      ...PRICE_ITEMS.map((item) => li(item[lang], `c-${def.gas}`)),
      p(PRICE_NOTE[lang], `c-${def.gas}`),
    ]),
    image: img(TANK_IMAGES.onSite, {
      en: `Cryogenic storage tank for ${g.nom.en} with an ambient air vaporizer`,
      uk: `Кріогенна ємність для зберігання ${g.gen.uk.split(" (")[0]} з атмосферним випарником`,
      ru: `Криогенная ёмкость для хранения ${g.gen.ru.split(" (")[0]} с атмосферным испарителем`,
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

/* ─── Товари N₂, O₂, Ar: одна ємність на кожен обʼєм ──────────────────── */

/** Підказка за обʼємом для N₂, O₂ і Ar (CO₂ — див. co2TankUse). */
function volumeHint(volume: number): L {
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
  const hint = volumeHint(volume);
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
    isFeatured: false,
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
      // Варіант у сімействі однотипних товарів: хабом для пошуку є категорія.
      noIndex: true,
      metaTitle: {
        en: title.en,
        uk: title.uk,
        ru: title.ru,
      },
      metaDescription: {
                en: `Vacuum-insulated cryogenic tank for ${g.gen.en}, ${volume} m³, with valves and vaporizers. Selection, supply and commissioning in Ukraine.`,
        uk: `Вакуумно-ізольована кріогенна ємність для ${g.gen.uk} на ${volume} м³ з арматурою та випарниками. Підбір, постачання й монтаж.`,
        ru: `Вакуумно-изолированная криогенная ёмкость для ${g.gen.ru} на ${volume} м³ с арматурой и испарителями. Подбор, поставка и монтаж.`,
      },
      keywords: {
        en: `cryogenic tank ${volume} m3, ${g.nom.en} tank ${volume} m3`,
        uk: `кріогенна ємність ${volume} м3, ємність ${g.gen.uk.split(" (")[0]} ${volume} м3`,
        ru: `криогенная емкость ${volume} м3, емкость ${g.gen.ru.split(" (")[0]} ${volume} м3`,
      },
    },
  };
}

/* ═══════════════════════════════════════════════════════════════════════
   CO₂: реальний модельний ряд ZVT із прайсу клієнта (models.ts)
   ═══════════════════════════════════════════════════════════════════════ */

const t1 = (kg: number, lang: keyof L) => num(Math.round(kg / 10) / 100, lang, 2);
const mm = (value: number, lang: keyof L) =>
  `${num(value, lang)} ${lang === "en" ? "mm" : "мм"}`;
const m3 = (value: number, lang: keyof L) =>
  `${num(value, lang)} ${lang === "en" ? "m³" : "м³"}`;
const kgs = (value: number, lang: keyof L) =>
  `${num(value, lang)} ${lang === "en" ? "kg" : "кг"}`;
const pressures = (lang: keyof L) =>
  `${CO2_TANK_PRESSURES.join(" / ")} ${lang === "en" ? "bar" : "бар"}`;

const CO2_TANK_TEXT = {
  naming: {
    en: "The same equipment goes by several names: cryogenic tank, storage vessel, bulk tank. The gas, too — carbon dioxide, CO₂, and LCO₂ for the liquid in manufacturer documents. In Ukraine buyers usually say «vuhlekyslota» and often simply call the tank a «barrel for carbon dioxide».",
    uk: "Це обладнання називають по-різному: кріогенна ємність, резервуар, «бочка для вуглекислоти». Так само й газ: вуглекислота, діоксид вуглецю, рідше двоокис вуглецю, а в документах виробника — carbon dioxide або LCO₂ для рідкої фази. Мова про одне й те саме.",
    ru: "Это оборудование называют по-разному: криогенная ёмкость, резервуар, «бочка для углекислоты». Так же и газ: углекислота, диоксид углерода, реже двуокись углерода, а в документах производителя — carbon dioxide или LCO₂ для жидкой фазы. Речь об одном и том же.",
  },
  modelsHeading: { en: "Models and prices", uk: "Моделі та ціни", ru: "Модели и цены" },
  tableHead: {
    en: "Model | Volume, m³ | LCO₂, t | Diameter × height, mm | Price from, € excl. VAT",
    uk: "Модель | Обʼєм, м³ | LCO₂, т | Діаметр × висота, мм | Ціна від, € без ПДВ",
    ru: "Модель | Объём, м³ | LCO₂, т | Диаметр × высота, мм | Цена от, € без НДС",
  },
  tableCaption: {
    en: "LCO₂ capacity as stated by the manufacturer at 95% fill. Working pressure for every model: 18, 22 or 37 bar",
    uk: "Місткість LCO₂ — за даними виробника при заповненні 95%. Робочий тиск для кожної моделі: 18, 22 або 37 бар",
    ru: "Вместимость LCO₂ — по данным производителя при заполнении 95%. Рабочее давление для каждой модели: 18, 22 или 37 бар",
  },
  pair: {
    en: "The ZVT 40 and ZVT 41 hold almost the same — about 42 t. The ZVT 40 is lower (9.7 m) and wider (3,000 mm); the ZVT 41 is taller (16.4 m) but takes less ground (2,345 mm). The site decides: a height limit or a footprint limit.",
    uk: "ZVT 40 і ZVT 41 вміщують майже однаково — близько 42 т. ZVT 40 нижча (9,7 м) і ширша (3 000 мм), ZVT 41 вища (16,4 м), але займає меншу площу (2 345 мм). Вибір диктує майданчик: обмеження по висоті чи по площі.",
    ru: "ZVT 40 и ZVT 41 вмещают почти одинаково — около 42 т. ZVT 40 ниже (9,7 м) и шире (3 000 мм), ZVT 41 выше (16,4 м), но занимает меньшую площадь (2 345 мм). Выбор диктует площадка: ограничение по высоте или по площади.",
  },
  priceNote: {
    en: "The price depends on the working pressure, the valves and instrumentation, the level and pressure control system and the delivery terms. Delivery, installation, the vaporizer, the pressure-regulating unit and process piping to the consumer are quoted separately.",
    uk: "Вартість залежить від робочого тиску, комплектації арматурою та КВПіА, системи контролю рівня й тиску та умов поставки. Доставка, монтаж, випарник, регуляційний вузол і технологічна обвʼязка до споживача розраховуються окремо.",
    ru: "Стоимость зависит от рабочего давления, комплектации арматурой и КИПиА, системы контроля уровня и давления и условий поставки. Доставка, монтаж, испаритель, регулировочный узел и технологическая обвязка до потребителя рассчитываются отдельно.",
  },
  designHeading: {
    en: "Insulation, pressure and vessel material",
    uk: "Ізоляція, тиск і матеріал посудини",
    ru: "Изоляция, давление и материал сосуда",
  },
  insulation: {
    en: "**Insulation.** CO₂ tanks come in two types: vacuum-insulated and polyurethane-foam (PUR) insulated. The ZVT models in the table are vacuum-insulated; ask us if you need a PUR tank.",
    uk: "**Ізоляція.** Ємності для CO₂ бувають двох видів: з вакуумною ізоляцією та з пінополіуретановою (ППУ). Моделі ZVT у таблиці — вакуумні; якщо потрібна ємність з ППУ, запитайте.",
    ru: "**Изоляция.** Ёмкости для CO₂ бывают двух видов: с вакуумной изоляцией и с пенополиуретановой (ППУ). Модели ZVT в таблице — вакуумные; если нужна ёмкость с ППУ, спросите.",
  },
  pressure: {
    en: "**Working pressure** — 18, 22 or 37 bar, chosen for your process. The empty weights in the specifications are for the 22 bar version.",
    uk: "**Робочий тиск** — 18, 22 або 37 бар, обирається під ваш технологічний процес. Маса порожньої ємності в характеристиках указана для виконання на 22 бар.",
    ru: "**Рабочее давление** — 18, 22 или 37 бар, выбирается под ваш технологический процесс. Масса пустой ёмкости в характеристиках указана для исполнения на 22 бар.",
  },
  material: {
    en: "**Inner vessel** — carbon steel or stainless steel, depending on the version.",
    uk: "**Внутрішня посудина** — з вуглецевої або нержавіючої сталі, залежно від виконання.",
    ru: "**Внутренний сосуд** — из углеродистой или нержавеющей стали, в зависимости от исполнения.",
  },
  scopeHeading: {
    en: "What comes with the tank",
    uk: "Що входить у постачання",
    ru: "Что входит в поставку",
  },
  scope: {
    en: "The tank arrives with its piping: shut-off and safety valves and pressure and level instruments. All that is left is to run a line to your equipment or tie the tank into an existing one — weld on the flanges and connect.",
    uk: "Ємність приходить з обвʼязкою: запірною та запобіжною арматурою, приладами контролю тиску й рівня. Лишається підвести трасу до вашого обладнання або підʼєднати ємність до наявної — приварити фланці й підключитися.",
    ru: "Ёмкость приходит с обвязкой: запорной и предохранительной арматурой, приборами контроля давления и уровня. Остаётся подвести трассу к вашему оборудованию или подсоединить ёмкость к существующей — приварить фланцы и подключиться.",
  },
  foundationHeading: {
    en: "Foundation and registration",
    uk: "Фундамент і реєстрація в Держпраці",
    ru: "Фундамент и регистрация в Гоструда",
  },
  foundation: {
    en: "The foundation is designed for the weight of the filled tank — from 6 t for the ZVT 3 to 86.8 t for the ZVT 60. We provide the basic data for the foundation design; your contractor builds it for the specific site.",
    uk: "Фундамент розраховують на масу заповненої ємності — від 6 т у ZVT 3 до 86,8 т у ZVT 60. Базові дані для проєкту фундаменту надаємо, а виконує його ваш підрядник під конкретний майданчик.",
    ru: "Фундамент рассчитывают на массу заполненной ёмкости — от 6 т у ZVT 3 до 86,8 т у ZVT 60. Базовые данные для проекта фундамента предоставляем, а выполняет его ваш подрядчик под конкретную площадку.",
  },
  registration: {
    en: "The tank arrives with a full document package and all certificates from the European manufacturer. A specialised company issues the pressure vessel passport, and the set is then submitted to the State Labour Service.",
    uk: "Ємність приїжджає з повним пакетом документів і всіма сертифікатами європейського виробника. Спеціалізована компанія оформлює паспорт посудини, після чого комплект подається в Держпраці.",
    ru: "Ёмкость приезжает с полным пакетом документов и всеми сертификатами европейского производителя. Специализированная компания оформляет паспорт сосуда, после чего комплект подаётся в Гоструда.",
  },
};

/** Хто зазвичай ставить ємність такого класу — за місткістю, т LCO₂. */
function co2TankUse(model: Co2TankModel, lang: keyof L): string {
  const t = model.capacityKg / 1000;
  const projects = localePath(lang, "/projects");
  if (t < 8)
    return {
      en: "Tanks of 3–6 t suit consumers that use up to a few tonnes a month: small bottling lines, breweries, greenhouses and workshops moving from cylinders to liquid CO₂.",
      uk: "Ємності на 3–6 т ставлять там, де споживання — до кількох тонн на місяць: невеликі лінії розливу, пивоварні, теплиці й цехи, які переходять із балонів на рідку вуглекислоту.",
      ru: "Ёмкости на 3–6 т ставят там, где потребление — до нескольких тонн в месяц: небольшие линии розлива, пивоварни, теплицы и цеха, которые переходят с баллонов на жидкую углекислоту.",
    }[lang];
  if (t < 25)
    return {
      en: "Tanks of 11–21 t are the working choice for medium beverage plants, food producers and greenhouses of several hectares.",
      uk: "Ємності на 11–21 т — робочий вибір для середніх заводів напоїв, харчових виробництв і теплиць на кілька гектарів.",
      ru: "Ёмкости на 11–21 т — рабочий выбор для средних заводов напитков, пищевых производств и теплиц на несколько гектаров.",
    }[lang];
  if (t < 35)
    return {
      en: "A 31 t tank takes a full road tanker and still leaves a working reserve — the standard choice for continuous industrial consumption.",
      uk: "Ємність на 31 т приймає повну автоцистерну й лишає робочий запас — стандартний вибір для безперервного промислового споживання.",
      ru: "Ёмкость на 31 т принимает полную автоцистерну и оставляет рабочий запас — стандартный выбор для непрерывного промышленного потребления.",
    }[lang];
  if (t < 45)
    return {
      en: "42 t tanks serve large plants and sites with several consumers. Two versions of the same capacity let the tank fit a height or a footprint limit.",
      uk: "Ємності на 42 т — для великих виробництв і кількох споживачів на одному майданчику. Два виконання однієї місткості дають змогу вписатися в обмеження по висоті чи по площі.",
      ru: "Ёмкости на 42 т — для крупных производств и нескольких потребителей на одной площадке. Два исполнения одной вместимости позволяют вписаться в ограничение по высоте или по площади.",
    }[lang];
  return {
    en: `Tanks of 50–60 m³ are for centralised CO₂ supply: large greenhouse complexes, dry ice production, multi-line plants. We have installed tanks of this class for a beverage plant, a greenhouse business and a dry ice facility — see [our projects](${projects}).`,
    uk: `Ємності на 50–60 м³ — для централізованого постачання CO₂: великі тепличні комплекси, виробництво сухого льоду, заводи з кількома лініями. Ємності цього класу ми монтували для заводу напоїв, тепличного господарства й виробництва сухого льоду — див. [реалізовані проєкти](${projects}).`,
    ru: `Ёмкости на 50–60 м³ — для централизованного снабжения CO₂: крупные тепличные комплексы, производство сухого льда, заводы с несколькими линиями. Ёмкости этого класса мы монтировали для завода напитков, тепличного хозяйства и производства сухого льда — см. [реализованные проекты](${projects}).`,
  }[lang];
}

const CO2_TANK_FAQ: Array<{ q: L; a: L }> = [
  FAQ_COMMON[0],
  {
    q: {
      en: "What is the working pressure of the tank?",
      uk: "Який робочий тиск у ємності?",
      ru: "Какое рабочее давление в ёмкости?",
    },
    a: {
      en: "18, 22 or 37 bar — all three versions are available for every ZVT model. The pressure affects the vessel weight and the price.",
      uk: "18, 22 або 37 бар — для кожної моделі ZVT доступні всі три виконання. Від тиску залежать маса посудини й ціна.",
      ru: "18, 22 или 37 бар — для каждой модели ZVT доступны все три исполнения. От давления зависят масса сосуда и цена.",
    },
  },
  {
    q: {
      en: "What is the inner vessel made of?",
      uk: "З якого матеріалу внутрішня посудина?",
      ru: "Из какого материала внутренний сосуд?",
    },
    a: {
      en: "Carbon steel or stainless steel, depending on the version. Insulation is either vacuum or polyurethane foam; the ZVT range is vacuum-insulated.",
      uk: "З вуглецевої або нержавіючої сталі — залежно від виконання. Ізоляція буває вакуумна або пінополіуретанова; лінійка ZVT — з вакуумною.",
      ru: "Из углеродистой или нержавеющей стали — в зависимости от исполнения. Изоляция бывает вакуумная или пенополиуретановая; линейка ZVT — с вакуумной.",
    },
  },
  FAQ_COMMON[1],
  FAQ_COMMON[2],
  FAQ_COMMON[3],
  FAQ_COMMON[4],
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
  {
    q: {
      en: "Do you supply transport tanks?",
      uk: "Чи постачаєте транспортні ємності?",
      ru: "Поставляете ли транспортные ёмкости?",
    },
    a: {
      en: "On request — for transporting liquid CO₂, oxygen, nitrogen and argon. The price depends on the volume and design, so it is not listed on the site: send us your requirements.",
      uk: "Під запит — для перевезення рідкого CO₂, кисню, азоту й аргону. Ціна залежить від обʼєму та виконання, тому на сайті її немає: надішліть вимоги, розрахуємо.",
      ru: "Под запрос — для перевозки жидкого CO₂, кислорода, азота и аргона. Цена зависит от объёма и исполнения, поэтому на сайте её нет: пришлите требования, рассчитаем.",
    },
  },
];

function buildCo2TankCategory(def: TankCategoryDef): SeedCategory {
  const g = GASES.co2;
  const k = "c-co2";
  const vaporizers = (lang: keyof L) => categoryPath(co2VaporizerCategory, lang);
  const install = (lang: keyof L) => categoryPath(installationCategory, lang);
  return {
    _id: "cat-tanks-co2",
    _updatedAt: SEED_UPDATED_AT,
    title: def.title,
    slug: def.slug,
    order: def.order,
    isVisible: true,
    shortDescription: def.short,
    description: blocks((lang) => [
      p(def.intro[lang], k),
      p(CO2_TANK_TEXT.naming[lang], k),
      p(g.storageNote[lang], k),
      h2(CO2_TANK_TEXT.modelsHeading[lang], k),
      table(
        [
          CO2_TANK_TEXT.tableHead[lang],
          ...CO2_TANKS.map(
            (m) =>
              `${m.model} | ${num(m.volume, lang)} | ${t1(m.capacityKg, lang)} | ${num(m.diameter, lang)} × ${num(m.height, lang)} | ${num(m.priceEur, lang)}`,
          ),
        ],
        CO2_TANK_TEXT.tableCaption,
        k,
      ),
      p(CO2_TANK_TEXT.pair[lang], k),
      p(CO2_TANK_TEXT.priceNote[lang], k),
      h2(CO2_TANK_TEXT.designHeading[lang], k),
      li(CO2_TANK_TEXT.insulation[lang], k),
      li(CO2_TANK_TEXT.pressure[lang], k),
      li(CO2_TANK_TEXT.material[lang], k),
      h2(CO2_TANK_TEXT.scopeHeading[lang], k),
      p(CO2_TANK_TEXT.scope[lang], k),
      p(
        {
          en: `You can buy just the tank or just a [CO₂ vaporizer](${vaporizers(lang)}), or order a turnkey system: tank, vaporizer, pipelines and start-up. We do [turnkey installation](${install(lang)}) only for equipment we have supplied — we do not pipe other suppliers' tanks.`,
          uk: `Можна купити лише ємність або лише [випарник CO₂](${vaporizers(lang)}), а можна замовити систему під ключ: ємність, випарник, трубопроводи й запуск. [Монтаж під ключ](${install(lang)}) робимо тільки для обладнання, яке постачили самі, — чужі ємності не обвʼязуємо.`,
          ru: `Можно купить только ёмкость или только [испаритель CO₂](${vaporizers(lang)}), а можно заказать систему под ключ: ёмкость, испаритель, трубопроводы и запуск. [Монтаж под ключ](${install(lang)}) делаем только для оборудования, которое поставили сами, — чужие ёмкости не обвязываем.`,
        }[lang],
        k,
      ),
      h2(CO2_TANK_TEXT.foundationHeading[lang], k),
      p(CO2_TANK_TEXT.foundation[lang], k),
      p(CO2_TANK_TEXT.registration[lang], k),
    ]),
    image: img(TANK_IMAGES.onSite, {
      en: "Cryogenic storage tank for liquid CO₂ with an ambient air vaporizer",
      uk: "Кріогенна ємність для зберігання рідкого CO₂ з атмосферним випарником",
      ru: "Криогенная ёмкость для хранения жидкого CO₂ с атмосферным испарителем",
    }),
    faq: CO2_TANK_FAQ.map((item, index) => faq(`faq-co2-${index}`, item.q, item.a)),
    seo: {
      metaTitle: def.metaTitle,
      metaDescription: def.metaDescription,
      keywords: def.keywords,
    },
    productCount: CO2_TANKS.length,
  };
}

/** Фото товару: спершу реальні обʼєкти з ємностями того ж класу. */
function co2TankGallery(model: Co2TankModel, title: L): SeedImage[] {
  const base = tankGallery("co2", title);
  if (model.volume < 45) return base;
  return [
    ...base,
    img(
      "/images/projects/greenhouse-four-co2-tanks-60m3.webp",
      {
        en: "Four 60 m³ CO₂ tanks installed for a vegetable greenhouse business",
        uk: "Чотири ємності CO₂ по 60 м³, змонтовані для тепличного господарства",
        ru: "Четыре ёмкости CO₂ по 60 м³, смонтированные для тепличного хозяйства",
      },
      `co2-${model.key}-p1`,
    ),
    img(
      "/images/projects/beverages-co2-tank-50m3-foundation.webp",
      {
        en: "Base of a 50 m³ CO₂ tank on its foundation with piping and pressure gauges",
        uk: "Опори ємності CO₂ на 50 м³ на фундаменті з обвʼязкою та манометрами",
        ru: "Опоры ёмкости CO₂ на 50 м³ на фундаменте с обвязкой и манометрами",
      },
      `co2-${model.key}-p2`,
    ),
  ];
}

function buildCo2TankProduct(
  model: Co2TankModel,
  category: SeedCategory,
  index: number,
): SeedProduct {
  const k = `p-co2-${model.key}`;
  const title: L = {
    en: `Cryogenic CO₂ tank ${model.model} — ${num(model.volume, "en")} m³ / ${t1(model.capacityKg, "en")} t`,
    uk: `Кріогенна ємність для CO₂ ${model.model} — ${num(model.volume, "uk")} м³ / ${t1(model.capacityKg, "uk")} т`,
    ru: `Криогенная ёмкость для CO₂ ${model.model} — ${num(model.volume, "ru")} м³ / ${t1(model.capacityKg, "ru")} т`,
  };
  const vaporizers = (lang: keyof L) => categoryPath(co2VaporizerCategory, lang);
  const install = (lang: keyof L) => categoryPath(installationCategory, lang);
  const fullT = (lang: keyof L) => num(Math.round(model.fullKg / 100) / 10, lang, 1);

  return {
    _id: `product-tank-co2-${model.key}`,
    _updatedAt: SEED_UPDATED_AT,
    title,
    // Для 10/20/30/50 slug той самий, що був у товарів «10 м³» тощо, — адреси не змінились
    slug: slugs(
      `cryogenic-co2-tank-${model.key}-m3`,
      `kriogenna-yemnist-co2-${model.key}-m3`,
      `kriogennaya-emkost-co2-${model.key}-m3`,
    ),
    model: model.model,
    sku: model.model.replace(" ", "-"),
    isPublished: true,
    isFeatured: Boolean(model.isFeatured),
    order: 100 + index,
    publishedAt: SEED_UPDATED_AT,
    category,
    gallery: co2TankGallery(model, title),
    shortDescription: {
      en: `Vertical vacuum-insulated tank for liquid CO₂ (carbon dioxide): ${num(model.volume, "en")} m³, ${num(model.capacityKg, "en")} kg of LCO₂, working pressure 18, 22 or 37 bar. Supplied with piping; price ${priceFrom(model.priceEur, "en")}.`,
      uk: `Вертикальна вакуумно-ізольована ємність для рідкого CO₂ (вуглекислоти): ${num(model.volume, "uk")} м³, ${num(model.capacityKg, "uk")} кг LCO₂, робочий тиск 18, 22 або 37 бар. Постачається з обвʼязкою; ціна ${priceFrom(model.priceEur, "uk")}.`,
      ru: `Вертикальная вакуумно-изолированная ёмкость для жидкого CO₂ (углекислоты): ${num(model.volume, "ru")} м³, ${num(model.capacityKg, "ru")} кг LCO₂, рабочее давление 18, 22 или 37 бар. Поставляется с обвязкой; цена ${priceFrom(model.priceEur, "ru")}.`,
    },
    description: blocks((lang) => [
      p(model.note[lang], k),
      p(co2TankUse(model, lang), k),
      h2(CO2_TANK_TEXT.scopeHeading[lang], k),
      li(
        {
          en: "Vessel with piping: shut-off and safety valves",
          uk: "Посудина з обвʼязкою: запірна та запобіжна арматура",
          ru: "Сосуд с обвязкой: запорная и предохранительная арматура",
        }[lang],
        k,
      ),
      li(
        {
          en: "Pressure and level instruments",
          uk: "Прилади контролю тиску й рівня",
          ru: "Приборы контроля давления и уровня",
        }[lang],
        k,
      ),
      li(
        {
          en: "Document package and certificates from the European manufacturer",
          uk: "Пакет документів і сертифікати європейського виробника",
          ru: "Пакет документов и сертификаты европейского производителя",
        }[lang],
        k,
      ),
      p(
        {
          en: `On site you run a line to your equipment or tie the tank into an existing one — weld on the flanges and connect. The [vaporizer](${vaporizers(lang)}), pressure-regulating unit, delivery and [installation](${install(lang)}) are quoted separately or as a turnkey package.`,
          uk: `На майданчику лишається підвести трасу до обладнання або підʼєднати ємність до наявної — приварити фланці й підключитися. [Випарник](${vaporizers(lang)}), регуляційний вузол, доставка й [монтаж](${install(lang)}) — окремими позиціями або комплексом під ключ.`,
          ru: `На площадке остаётся подвести трассу к оборудованию или подсоединить ёмкость к существующей — приварить фланцы и подключиться. [Испаритель](${vaporizers(lang)}), регулировочный узел, доставка и [монтаж](${install(lang)}) — отдельными позициями или комплексом под ключ.`,
        }[lang],
        k,
      ),
      h2(CO2_TANK_TEXT.foundationHeading[lang], k),
      p(
        {
          en: `The foundation is designed for the full weight — about ${fullT("en")} t for the ${model.model}. We provide the basic data for its design.`,
          uk: `Фундамент розраховують на повну масу — для ${model.model} це близько ${fullT("uk")} т. Базові дані для його проєкту надаємо.`,
          ru: `Фундамент рассчитывают на полную массу — для ${model.model} это около ${fullT("ru")} т. Базовые данные для его проекта предоставляем.`,
        }[lang],
        k,
      ),
      p(CO2_TANK_TEXT.registration[lang], k),
      h2({ en: "Price", uk: "Ціна", ru: "Цена" }[lang], k),
      p(
        `${{ en: "From", uk: "Від", ru: "От" }[lang]} ${formatEur(model.priceEur, lang)} ${{ en: "excl. VAT.", uk: "без ПДВ.", ru: "без НДС." }[lang]} ${CO2_TANK_TEXT.priceNote[lang]}`,
        k,
      ),
    ]),
    features: [
      {
        en: `Holds ${num(model.capacityKg, "en")} kg of liquid CO₂`,
        uk: `Місткість ${num(model.capacityKg, "uk")} кг рідкого CO₂`,
        ru: `Вместимость ${num(model.capacityKg, "ru")} кг жидкого CO₂`,
      },
      {
        en: "Working pressure 18 / 22 / 37 bar",
        uk: "Робочий тиск 18 / 22 / 37 бар",
        ru: "Рабочее давление 18 / 22 / 37 бар",
      },
      {
        en: "Vacuum insulation, vertical stationary design",
        uk: "Вакуумна ізоляція, вертикальне стаціонарне виконання",
        ru: "Вакуумная изоляция, вертикальное стационарное исполнение",
      },
      {
        en: "Documents and certificates from the European manufacturer",
        uk: "Документи й сертифікати європейського виробника",
        ru: "Документы и сертификаты европейского производителя",
      },
    ],
    applications: GASES.co2.applications,
    specs: [
      spec("s-model", LABELS.model, { en: model.model, uk: model.model, ru: model.model }, LABELS.groupMain),
      spec(
        "s-vol",
        LABELS.volume,
        {
          en: `${m3(model.volume, "en")} (${num(model.volume * 1000, "en")} L)`,
          uk: `${m3(model.volume, "uk")} (${num(model.volume * 1000, "uk")} л)`,
          ru: `${m3(model.volume, "ru")} (${num(model.volume * 1000, "ru")} л)`,
        },
        LABELS.groupMain,
      ),
      spec(
        "s-usable",
        { en: "Usable volume at 95%", uk: "Корисний обʼєм при 95%", ru: "Полезный объём при 95%" },
        { en: m3(model.usable, "en"), uk: m3(model.usable, "uk"), ru: m3(model.usable, "ru") },
        LABELS.groupMain,
      ),
      spec(
        "s-cap",
        { en: "LCO₂ capacity", uk: "Місткість LCO₂", ru: "Вместимость LCO₂" },
        {
          en: `${kgs(model.capacityKg, "en")} (≈${t1(model.capacityKg, "en")} t)`,
          uk: `${kgs(model.capacityKg, "uk")} (≈${t1(model.capacityKg, "uk")} т)`,
          ru: `${kgs(model.capacityKg, "ru")} (≈${t1(model.capacityKg, "ru")} т)`,
        },
        LABELS.groupMain,
      ),
      spec(
        "s-press",
        { en: "Working pressure", uk: "Робочий тиск", ru: "Рабочее давление" },
        { en: pressures("en"), uk: pressures("uk"), ru: pressures("ru") },
        LABELS.groupMain,
      ),
      spec(
        "s-ins",
        LABELS.insulation,
        { en: "Vacuum", uk: "Вакуумна", ru: "Вакуумная" },
        LABELS.groupMain,
      ),
      spec(
        "s-type",
        { en: "Design", uk: "Виконання", ru: "Исполнение" },
        { en: "Vertical, stationary", uk: "Вертикальне, стаціонарне", ru: "Вертикальное, стационарное" },
        LABELS.groupMain,
      ),
      spec(
        "s-prod",
        LABELS.product,
        { en: "Liquid CO₂ (carbon dioxide)", uk: "Рідкий CO₂ (вуглекислота)", ru: "Жидкий CO₂ (углекислота)" },
        LABELS.groupMain,
      ),
      spec(
        "s-d",
        LABELS.diameter,
        { en: mm(model.diameter, "en"), uk: mm(model.diameter, "uk"), ru: mm(model.diameter, "ru") },
        LABELS.groupSize,
      ),
      spec(
        "s-h",
        LABELS.height,
        { en: mm(model.height, "en"), uk: mm(model.height, "uk"), ru: mm(model.height, "ru") },
        LABELS.groupSize,
      ),
      spec(
        "s-empty",
        { en: "Empty weight (22 bar)", uk: "Маса порожньої (22 бар)", ru: "Масса пустой (22 бар)" },
        { en: kgs(model.emptyKg, "en"), uk: kgs(model.emptyKg, "uk"), ru: kgs(model.emptyKg, "ru") },
        LABELS.groupSize,
      ),
      spec(
        "s-full",
        { en: "Approx. full weight with LCO₂", uk: "Орієнтовна повна маса з LCO₂", ru: "Ориентировочная полная масса с LCO₂" },
        { en: kgs(model.fullKg, "en"), uk: kgs(model.fullKg, "uk"), ru: kgs(model.fullKg, "ru") },
        LABELS.groupSize,
      ),
    ],
    faq: [],
    price: model.priceEur,
    priceOnRequest: false,
    availability: "madeToOrder",
    currency: "EUR",
    seo: {
      metaTitle: {
        en: `CO₂ tank ${model.model}, ${num(model.volume, "en")} m³ — from ${formatEur(model.priceEur, "en")}`,
        uk: `Ємність CO₂ ${model.model}, ${num(model.volume, "uk")} м³ — від ${formatEur(model.priceEur, "uk")}`,
        ru: `Ёмкость CO₂ ${model.model}, ${num(model.volume, "ru")} м³ — от ${formatEur(model.priceEur, "ru")}`,
      },
      metaDescription: {
        en: `Vacuum-insulated tank for ${t1(model.capacityKg, "en")} t of liquid CO₂: 18/22/37 bar, ${num(model.diameter, "en")} × ${num(model.height, "en")} mm. From ${formatEur(model.priceEur, "en")} excl. VAT. Supply and installation.`,
        uk: `Вакуумна ємність на ${t1(model.capacityKg, "uk")} т рідкої вуглекислоти: 18/22/37 бар, ${num(model.diameter, "uk")} × ${num(model.height, "uk")} мм. Від ${formatEur(model.priceEur, "uk")} без ПДВ. Постачання й монтаж.`,
        ru: `Вакуумная ёмкость на ${t1(model.capacityKg, "ru")} т жидкой углекислоты: 18/22/37 бар, ${num(model.diameter, "ru")} × ${num(model.height, "ru")} мм. От ${formatEur(model.priceEur, "ru")} без НДС. Поставка и монтаж.`,
      },
      keywords: {
        en: `${model.model} CO2 tank, CO2 tank ${Math.round(model.volume)} m3 price, liquid CO2 tank ${t1(model.capacityKg, "en")} t`,
        uk: `ємність ${model.model}, ємність для вуглекислоти ${Math.round(model.volume)} м3 ціна, бочка для вуглекислоти ${t1(model.capacityKg, "uk")} т`,
        ru: `емкость ${model.model}, емкость для углекислоты ${Math.round(model.volume)} м3 цена, бочка для углекислоты ${t1(model.capacityKg, "ru")} т`,
      },
    },
  };
}

export const tankCategories: SeedCategory[] = TANK_CATEGORY_DEFS.map((def) =>
  def.gas === "co2" ? buildCo2TankCategory(def) : buildTankCategory(def),
);

export const tankProducts: SeedProduct[] = TANK_CATEGORY_DEFS.flatMap(
  (def, catIndex) =>
    def.gas === "co2"
      ? CO2_TANKS.map((model, index) =>
          buildCo2TankProduct(model, tankCategories[catIndex], index),
        )
      : def.volumes.map((volume, index) =>
          buildTankProduct(def, tankCategories[catIndex], volume, index),
        ),
);
