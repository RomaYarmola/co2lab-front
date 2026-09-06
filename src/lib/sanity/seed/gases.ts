import type { L } from "./helpers.ts";

export type GasKey = "co2" | "n2" | "o2" | "ar";

export type GasInfo = {
  key: GasKey;
  /** «CO₂», «LIN (N₂)» … */
  code: string;
  /** родовий відмінок: «рідкого CO₂ (вуглекислоти)» */
  gen: L;
  /** називний: «рідкий азот» */
  nom: L;
  /** для slug */
  slug: { en: string; uk: string; ru: string };
  /** галузі-споживачі */
  applications: L[];
  /** унікальний абзац про специфіку зберігання саме цього газу */
  storageNote: L;
};

export const GASES: Record<GasKey, GasInfo> = {
  co2: {
    key: "co2",
    code: "CO₂",
    gen: {
      en: "liquid CO₂ (carbon dioxide)",
      uk: "рідкого CO₂ (вуглекислоти, діоксиду вуглецю)",
      ru: "жидкого CO₂ (углекислоты, диоксида углерода)",
    },
    nom: { en: "liquid CO₂", uk: "рідкий CO₂", ru: "жидкий CO₂" },
    slug: { en: "co2", uk: "co2", ru: "co2" },
    applications: [
      {
        en: "Beverage production and bottling",
        uk: "Виробництво та розлив напоїв",
        ru: "Производство и розлив напитков",
      },
      {
        en: "Greenhouse CO₂ enrichment",
        uk: "CO₂-підживлення теплиць",
        ru: "CO₂-подкормка теплиц",
      },
      {
        en: "Food processing and packaging (MAP)",
        uk: "Харчова промисловість, пакування в модифікованому середовищі",
        ru: "Пищевая промышленность, упаковка в модифицированной среде",
      },
      {
        en: "Dry ice production",
        uk: "Виробництво сухого льоду",
        ru: "Производство сухого льда",
      },
      {
        en: "Water treatment and pH control",
        uk: "Водопідготовка та регулювання pH",
        ru: "Водоподготовка и регулирование pH",
      },
      {
        en: "Welding and metalworking",
        uk: "Зварювання та металообробка",
        ru: "Сварка и металлообработка",
      },
    ],
    storageNote: {
      en: "Liquid CO₂ is stored at roughly −20 °C under pressure, so the tank must hold both the temperature and the working pressure with minimal boil-off. A properly sized vacuum-insulated vessel with a pressure-build vaporizer keeps the product ready for take-off around the clock.",
      uk: "Рідкий CO₂ зберігається за температури близько −20 °C під тиском, тому ємність має одночасно утримувати температуру та робочий тиск із мінімальними втратами на випаровування. Правильно підібрана вакуумно-ізольована посудина з випарником підйому тиску забезпечує готовність продукту до відбору цілодобово.",
      ru: "Жидкий CO₂ хранится при температуре около −20 °C под давлением, поэтому ёмкость должна одновременно удерживать температуру и рабочее давление с минимальными потерями на испарение. Правильно подобранный вакуумно-изолированный сосуд с испарителем подъёма давления обеспечивает готовность продукта к отбору круглосуточно.",
    },
  },
  n2: {
    key: "n2",
    code: "LIN (N₂)",
    gen: {
      en: "liquid nitrogen (LIN, N₂)",
      uk: "рідкого азоту (LIN, N₂)",
      ru: "жидкого азота (LIN, N₂)",
    },
    nom: { en: "liquid nitrogen", uk: "рідкий азот", ru: "жидкий азот" },
    slug: { en: "liquid-nitrogen", uk: "azot", ru: "azot" },
    applications: [
      {
        en: "Food freezing and chilling",
        uk: "Заморожування та охолодження харчових продуктів",
        ru: "Заморозка и охлаждение пищевых продуктов",
      },
      {
        en: "Inerting and blanketing in chemical plants",
        uk: "Інертизація та азотне подушкування на хімічних виробництвах",
        ru: "Инертизация и азотное подушкование на химических производствах",
      },
      {
        en: "Metallurgy and heat treatment",
        uk: "Металургія та термообробка",
        ru: "Металлургия и термообработка",
      },
      {
        en: "Laboratories, medicine and cryobanks",
        uk: "Лабораторії, медицина, кріобанки",
        ru: "Лаборатории, медицина, криобанки",
      },
      {
        en: "Electronics and laser cutting",
        uk: "Електроніка та лазерне різання",
        ru: "Электроника и лазерная резка",
      },
    ],
    storageNote: {
      en: "Liquid nitrogen boils at −196 °C, so insulation quality directly defines daily losses. Vacuum-insulated tanks with an ambient vaporizer give a stable gas supply without cylinder handling and with far lower cost per cubic metre.",
      uk: "Рідкий азот кипить за −196 °C, тож якість ізоляції напряму визначає добові втрати. Вакуумно-ізольовані ємності з атмосферним випарником дають стабільне газопостачання без балонного господарства та зі значно нижчою собівартістю кубометра газу.",
      ru: "Жидкий азот кипит при −196 °C, поэтому качество изоляции напрямую определяет суточные потери. Вакуумно-изолированные ёмкости с атмосферным испарителем дают стабильное газоснабжение без баллонного хозяйства и со значительно более низкой себестоимостью кубометра газа.",
    },
  },
  o2: {
    key: "o2",
    code: "LOX (O₂)",
    gen: {
      en: "liquid oxygen (LOX, O₂)",
      uk: "рідкого кисню (LOX, O₂)",
      ru: "жидкого кислорода (LOX, O₂)",
    },
    nom: { en: "liquid oxygen", uk: "рідкий кисень", ru: "жидкий кислород" },
    slug: { en: "liquid-oxygen", uk: "kysen", ru: "kislorod" },
    applications: [
      {
        en: "Hospitals and medical oxygen supply",
        uk: "Лікарні та медичне киснепостачання",
        ru: "Больницы и медицинское кислородоснабжение",
      },
      {
        en: "Metallurgy and steelmaking",
        uk: "Металургія та сталеплавильне виробництво",
        ru: "Металлургия и сталеплавильное производство",
      },
      {
        en: "Glass and cement industry",
        uk: "Скляна та цементна промисловість",
        ru: "Стекольная и цементная промышленность",
      },
      {
        en: "Wastewater treatment and aquaculture",
        uk: "Очищення стічних вод та аквакультура",
        ru: "Очистка сточных вод и аквакультура",
      },
      {
        en: "Cutting and welding",
        uk: "Різання та зварювання металу",
        ru: "Резка и сварка металла",
      },
    ],
    storageNote: {
      en: "Oxygen systems require oxygen-clean components and dedicated safety valves. Every tank we supply for LOX is delivered degreased for oxygen service, with valves and vaporizers rated for oxygen use.",
      uk: "Кисневі системи потребують знежирених «під кисень» компонентів та спеціальних запобіжних клапанів. Кожна ємність для LOX постачається знежиреною для кисневого сервісу, з арматурою та випарниками, розрахованими на роботу з киснем.",
      ru: "Кислородные системы требуют обезжиренных «под кислород» компонентов и специальных предохранительных клапанов. Каждая ёмкость для LOX поставляется обезжиренной для кислородного сервиса, с арматурой и испарителями, рассчитанными на работу с кислородом.",
    },
  },
  ar: {
    key: "ar",
    code: "LAR (Ar)",
    gen: {
      en: "liquid argon (LAR, Ar)",
      uk: "рідкого аргону (LAR, Ar)",
      ru: "жидкого аргона (LAR, Ar)",
    },
    nom: { en: "liquid argon", uk: "рідкий аргон", ru: "жидкий аргон" },
    slug: { en: "liquid-argon", uk: "argon", ru: "argon" },
    applications: [
      {
        en: "MIG/TIG welding and shielding gas supply",
        uk: "Зварювання MIG/TIG та постачання захисного газу",
        ru: "Сварка MIG/TIG и снабжение защитным газом",
      },
      {
        en: "Metallurgy and steel degassing",
        uk: "Металургія та дегазація сталі",
        ru: "Металлургия и дегазация стали",
      },
      {
        en: "Electronics and semiconductor production",
        uk: "Електроніка та виробництво напівпровідників",
        ru: "Электроника и производство полупроводников",
      },
      {
        en: "Laboratories and analytical equipment",
        uk: "Лабораторії та аналітичне обладнання",
        ru: "Лаборатории и аналитическое оборудование",
      },
    ],
    storageNote: {
      en: "Argon is the most expensive of the air gases, so boil-off losses translate directly into money. A vacuum-insulated tank with a correctly sized ambient vaporizer keeps consumption stable and losses minimal, even at low take-off rates.",
      uk: "Аргон — найдорожчий із газів повітря, тому втрати на випаровування напряму перетворюються на гроші. Вакуумно-ізольована ємність із правильно підібраним атмосферним випарником утримує стабільне споживання та мінімальні втрати навіть за невеликого відбору.",
      ru: "Аргон — самый дорогой из газов воздуха, поэтому потери на испарение напрямую превращаются в деньги. Вакуумно-изолированная ёмкость с правильно подобранным атмосферным испарителем удерживает стабильное потребление и минимальные потери даже при небольшом отборе.",
    },
  },
};
