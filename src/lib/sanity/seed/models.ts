/**
 * Модельний ряд і ціни з прайсу CO₂ Lab (вересень 2026): ємності ZVT для CO₂,
 * випарники P…E, кріоциліндри Euro-Cyl.
 *
 * Цифри перенесені з файлу клієнта без округлень і перерахунків — це дані
 * виробника. Якщо клієнт надішле новий прайс, правити тільки тут: з цих
 * обʼєктів будуються товари, характеристики, таблиці в категоріях і SEO.
 */
import type { L } from "./helpers.ts";

// Формати живуть окремо (їх імпортує й клієнтська картка товару)
export { formatEur, num, priceFrom } from "./format.ts";

/* ═══════════════════════════════════════════════════════════════════════
   Кріогенні ємності ZVT для рідкого CO₂
   ═══════════════════════════════════════════════════════════════════════ */

export type Co2TankModel = {
  /** Частина `_id` і slug: product-tank-co2-{key}. */
  key: number;
  model: string;
  /** Геометричний обʼєм, м³ */
  volume: number;
  /** Корисний обʼєм при заповненні 95%, м³ */
  usable: number;
  /** Місткість LCO₂, кг */
  capacityKg: number;
  /** Маса порожньої ємності у виконанні на 22 бар, кг */
  emptyKg: number;
  /** Орієнтовна повна маса з LCO₂, кг */
  fullKg: number;
  diameter: number;
  height: number;
  priceEur: number;
  isFeatured?: boolean;
  /** Абзац із прайсу — чим модель відрізняється від сусідніх. */
  note: L;
};

/**
 * Slug категорії ємностей CO₂. Тут, а не в tanks.ts: на категорію посилаються
 * випарники з equipment.ts, а tanks.ts сам імпортує equipment.ts.
 */
export const CO2_TANK_CATEGORY_SLUG: L = {
  en: "cryogenic-co2-storage-tanks",
  uk: "kriogenni-yemnosti-dlya-ridkogo-co2",
  ru: "kriogennye-emkosti-dlya-zhidkogo-co2",
};

/** Робочий тиск однаковий для всієї лінійки — три виконання на вибір. */
export const CO2_TANK_PRESSURES = [18, 22, 37];

export const CO2_TANKS: Co2TankModel[] = [
  {
    key: 3,
    model: "ZVT 3",
    volume: 3.28,
    usable: 3.116,
    capacityKg: 3427,
    emptyKg: 2560,
    fullKg: 5987,
    diameter: 1730,
    height: 4002,
    priceEur: 17000,
    note: {
      en: "The smallest model in the range: a vertical vacuum-insulated tank for stationary storage of liquid carbon dioxide (LCO₂), holding 3.4 t.",
      uk: "Найменша модель лінійки: вертикальна вакуумно-ізольована ємність для стаціонарного зберігання рідкого діоксиду вуглецю (LCO₂) на 3,4 т.",
      ru: "Самая маленькая модель линейки: вертикальная вакуумно-изолированная ёмкость для стационарного хранения жидкого диоксида углерода (LCO₂) на 3,4 т.",
    },
  },
  {
    key: 6,
    model: "ZVT 6",
    volume: 5.96,
    usable: 5.662,
    capacityKg: 6234,
    emptyKg: 3830,
    fullKg: 10064,
    diameter: 1730,
    height: 6003,
    priceEur: 31000,
    note: {
      en: "A vertical vacuum-insulated tank for 6.2 t of liquid CO₂. Same 1,730 mm diameter as the ZVT 3, so it takes the same footprint and simply stands taller — 6 m instead of 4 m.",
      uk: "Вертикальна вакуумно-ізольована ємність на 6,2 т рідкого CO₂. Діаметр той самий, що в ZVT 3, — 1 730 мм, тож площа на майданчику однакова, а висота 6 м замість 4 м.",
      ru: "Вертикальная вакуумно-изолированная ёмкость на 6,2 т жидкого CO₂. Диаметр тот же, что у ZVT 3, — 1 730 мм, поэтому площадь на площадке одинаковая, а высота 6 м вместо 4 м.",
    },
  },
  {
    key: 10,
    model: "ZVT 10",
    volume: 10.68,
    usable: 10.146,
    capacityKg: 11201,
    emptyKg: 5560,
    fullKg: 16761,
    diameter: 2100,
    height: 6217,
    priceEur: 55500,
    note: {
      en: "An industrial vacuum-insulated tank for stationary storage of 11.2 t of LCO₂. It can be supplied with a vaporizer, a pressure-regulating unit, and shut-off and safety valves.",
      uk: "Промислова вакуумно-ізольована ємність для стаціонарного зберігання 11,2 т LCO₂. Може комплектуватися випарником, регуляційним вузлом, запірною та запобіжною арматурою.",
      ru: "Промышленная вакуумно-изолированная ёмкость для стационарного хранения 11,2 т LCO₂. Может комплектоваться испарителем, регулировочным узлом, запорной и предохранительной арматурой.",
    },
  },
  {
    key: 20,
    model: "ZVT 20",
    volume: 20.08,
    usable: 19.076,
    capacityKg: 20985,
    emptyKg: 9070,
    fullKg: 30055,
    diameter: 2100,
    height: 10219,
    priceEur: 64000,
    note: {
      en: "A vertical cryogenic tank for industrial storage of up to 20,985 kg of liquid CO₂. The 2,100 mm diameter matches the ZVT 10 — the models differ in height.",
      uk: "Вертикальна кріогенна ємність для промислового зберігання до 20 985 кг рідкого CO₂. Діаметр 2 100 мм, як у ZVT 10, — моделі відрізняються висотою.",
      ru: "Вертикальная криогенная ёмкость для промышленного хранения до 20 985 кг жидкого CO₂. Диаметр 2 100 мм, как у ZVT 10, — модели отличаются высотой.",
    },
  },
  {
    key: 30,
    model: "ZVT 30",
    volume: 29.55,
    usable: 28.073,
    capacityKg: 30965,
    emptyKg: 14710,
    fullKg: 45675,
    diameter: 2345,
    height: 12363,
    priceEur: 94500,
    isFeatured: true,
    note: {
      en: "An industrial vacuum-insulated tank for about 31 t of liquid CO₂. Suited to building a stationary CO₂ storage and gasification system; a complete package with vaporizer, pressure regulator, valves and control system is available.",
      uk: "Промислова вакуумно-ізольована ємність приблизно на 31 т рідкого CO₂. Підходить для побудови стаціонарної системи зберігання та газифікації CO₂: можливе комплектне постачання з випарником, регулятором тиску, арматурою та системою контролю.",
      ru: "Промышленная вакуумно-изолированная ёмкость примерно на 31 т жидкого CO₂. Подходит для построения стационарной системы хранения и газификации CO₂: возможна комплектная поставка с испарителем, регулятором давления, арматурой и системой контроля.",
    },
  },
  {
    key: 40,
    model: "ZVT 40",
    volume: 40.07,
    usable: 38.067,
    capacityKg: 42066,
    emptyKg: 16900,
    fullKg: 58966,
    diameter: 3000,
    height: 9723,
    priceEur: 128000,
    note: {
      en: "The low, wide version: 3,000 mm in diameter and 42 t of LCO₂. It suits sites where the overall tank height has to be limited — 9.7 m against 16.4 m for the ZVT 41 of almost the same capacity.",
      uk: "Низьке широке виконання діаметром 3 000 мм на 42 т LCO₂. Модель для обʼєктів, де потрібно обмежити загальну висоту резервуара: 9,7 м проти 16,4 м у ZVT 41 майже такої самої місткості.",
      ru: "Низкое широкое исполнение диаметром 3 000 мм на 42 т LCO₂. Модель для объектов, где нужно ограничить общую высоту резервуара: 9,7 м против 16,4 м у ZVT 41 почти такой же вместимости.",
    },
  },
  {
    key: 41,
    model: "ZVT 41",
    volume: 40.68,
    usable: 38.646,
    capacityKg: 42620,
    emptyKg: 19130,
    fullKg: 61750,
    diameter: 2345,
    height: 16365,
    priceEur: 130000,
    note: {
      en: "The narrow, tall version for more than 42 t of LCO₂. With a 2,345 mm diameter it takes less ground area than the ZVT 40 — at the cost of a 16.4 m height.",
      uk: "Вузьке високе виконання місткістю понад 42 т LCO₂. За рахунок діаметра 2 345 мм займає меншу площу майданчика, ніж ZVT 40, — зате має висоту 16,4 м.",
      ru: "Узкое высокое исполнение вместимостью более 42 т LCO₂. За счёт диаметра 2 345 мм занимает меньшую площадь площадки, чем ZVT 40, — зато имеет высоту 16,4 м.",
    },
  },
  {
    key: 50,
    model: "ZVT 50",
    volume: 50.29,
    usable: 47.776,
    capacityKg: 52769,
    emptyKg: 20120,
    fullKg: 72889,
    diameter: 3000,
    height: 11724,
    priceEur: 160500,
    isFeatured: true,
    note: {
      en: "A large-capacity industrial tank — 52.8 t of LCO₂ — for centralised CO₂ supply systems. We can design the complete storage, gasification and distribution system for the consumer's flow rate.",
      uk: "Промислова ємність великої місткості — 52,8 т LCO₂ — для систем централізованого постачання CO₂. Можливе проєктування комплексної системи зберігання, газифікації та подачі CO₂ під потрібну витрату споживача.",
      ru: "Промышленная ёмкость большой вместимости — 52,8 т LCO₂ — для систем централизованного снабжения CO₂. Возможно проектирование комплексной системы хранения, газификации и подачи CO₂ под нужный расход потребителя.",
    },
  },
  {
    key: 60,
    model: "ZVT 60",
    volume: 60.51,
    usable: 57.485,
    capacityKg: 63471,
    emptyKg: 23340,
    fullKg: 86811,
    diameter: 3000,
    height: 13725,
    priceEur: 193500,
    note: {
      en: "The largest model in the range, storing up to 63,471 kg of liquid CO₂ at 95% fill.",
      uk: "Найбільша модель лінійки — для зберігання до 63 471 кг рідкого CO₂ при заповненні 95%.",
      ru: "Самая большая модель линейки — для хранения до 63 471 кг жидкого CO₂ при заполнении 95%.",
    },
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   Випарники CO₂
   ═══════════════════════════════════════════════════════════════════════ */

export type Co2VaporizerModel = {
  capacity: number;
  model: string;
  priceEur: number;
  /** Підвісний/підлоговий монтаж або окрема рама на знімних ніжках. */
  mounting: "wallOrFloor" | "legs";
  isFeatured?: boolean;
  note: L;
};

export const CO2_VAPORIZERS: Co2VaporizerModel[] = [
  {
    capacity: 130,
    model: "P130E/1W",
    priceEur: 14890,
    mounting: "wallOrFloor",
    note: {
      en: "An industrial vaporizer for gasifying liquid carbon dioxide (LCO₂) at 130 kg/h. The standard package includes solenoid and safety valves, a mounting kit with an inlet filter and counter-flanges, temperature sensors and a pressure transmitter.",
      uk: "Промисловий випарник для газифікації рідкого діоксиду вуглецю (LCO₂) продуктивністю 130 кг/год. У стандартну комплектацію входять електромагнітні та запобіжні клапани, монтажний комплект із вхідним фільтром і контрфланцями, датчики температури та перетворювач тиску.",
      ru: "Промышленный испаритель для газификации жидкого диоксида углерода (LCO₂) производительностью 130 кг/ч. В стандартную комплектацию входят электромагнитные и предохранительные клапаны, монтажный комплект с входным фильтром и контрфланцами, датчики температуры и преобразователь давления.",
    },
  },
  {
    capacity: 270,
    model: "P270E/2W",
    priceEur: 16990,
    mounting: "wallOrFloor",
    note: {
      en: "An industrial vaporizer that turns liquid CO₂ into gas at 270 kg/h.",
      uk: "Промисловий випарник для переведення рідкого CO₂ у газоподібний стан продуктивністю 270 кг/год.",
      ru: "Промышленный испаритель для перевода жидкого CO₂ в газообразное состояние производительностью 270 кг/ч.",
    },
  },
  {
    capacity: 400,
    model: "P400E/3W",
    priceEur: 18670,
    mounting: "wallOrFloor",
    isFeatured: true,
    note: {
      en: "An industrial CO₂ vaporizer rated at 400 kg/h for storage systems and centralised carbon dioxide distribution.",
      uk: "Промисловий випарник CO₂ продуктивністю 400 кг/год для систем зберігання та централізованої подачі діоксиду вуглецю.",
      ru: "Промышленный испаритель CO₂ производительностью 400 кг/ч для систем хранения и централизованной подачи диоксида углерода.",
    },
  },
  {
    capacity: 650,
    model: "P650E-2W",
    priceEur: 21390,
    mounting: "legs",
    note: {
      en: "A high-capacity industrial vaporizer gasifying up to 650 kg of liquid CO₂ per hour, on removable legs.",
      uk: "Високопродуктивний промисловий випарник для газифікації до 650 кг рідкого CO₂ на годину, на знімних ніжках.",
      ru: "Высокопроизводительный промышленный испаритель для газификации до 650 кг жидкого CO₂ в час, на съёмных ножках.",
    },
  },
  {
    capacity: 1000,
    model: "P1000E-3W",
    priceEur: 23990,
    mounting: "legs",
    note: {
      en: "A large industrial vaporizer gasifying up to 1,000 kg of liquid CO₂ per hour (1 t/h), on removable legs.",
      uk: "Промисловий випарник великої продуктивності для газифікації до 1 000 кг рідкого CO₂ на годину (1 т/год), на знімних ніжках.",
      ru: "Промышленный испаритель большой производительности для газификации до 1 000 кг жидкого CO₂ в час (1 т/ч), на съёмных ножках.",
    },
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   Кріоциліндри Euro-Cyl для LIN, LOX і LAr
   ═══════════════════════════════════════════════════════════════════════ */

export type CylinderBase = "squareWheels" | "roundRing" | "roundWheels" | "pallet";

export type CryoCylinderModel = {
  /** Частина `_id` і slug: product-cryocylinder-{id}. */
  id: string;
  model: string;
  /** Геометричний обʼєм, л */
  volume: number;
  /** Корисний обʼєм, л */
  usable: number;
  /** Налаштування запобіжного клапана, бар */
  relief: number;
  /** Опціональне налаштування клапана, бар */
  reliefOption?: number;
  /** Розривна мембрана, бар */
  burstDisc?: number;
  /** Добові втрати на випаровування (NER), %/добу */
  nerLin: number;
  nerLoxAr: number;
  diameter: number;
  base: CylinderBase;
  /** «650 × 675» для квадратної основи або діаметр круглої, мм */
  baseSize: string;
  height: number;
  emptyKg: number;
  maxLinKg: number;
  maxLoxKg: number;
  maxLarKg: number;
  priceEur: number;
  isFeatured?: boolean;
  note: L;
};

export const CRYO_CYLINDERS: CryoCylinderModel[] = [
  {
    id: "120-4-sb",
    model: "Euro-Cyl 120/4 SB",
    volume: 120,
    usable: 114,
    relief: 4,
    reliefOption: 1.5,
    burstDisc: 6,
    nerLin: 2.0,
    nerLoxAr: 1.4,
    diameter: 508,
    base: "squareWheels",
    baseSize: "650 × 675",
    height: 1290,
    emptyKg: 100,
    maxLinKg: 186,
    maxLoxKg: 224,
    maxLarKg: 253,
    priceEur: 3600,
    note: {
      en: "A compact mobile vacuum-insulated cryogenic vessel for transporting, storing and dispensing liquid nitrogen (LIN), liquid oxygen (LOX) and liquid argon (LAr), on a square wheeled base.",
      uk: "Компактна мобільна вакуумно-ізольована кріогенна ємність для транспортування, зберігання та видачі рідкого азоту (LIN), рідкого кисню (LOX) та рідкого аргону (LAr) на квадратній колісній базі.",
      ru: "Компактная мобильная вакуумно-изолированная криогенная ёмкость для транспортировки, хранения и выдачи жидкого азота (LIN), жидкого кислорода (LOX) и жидкого аргона (LAr) на квадратной колёсной базе.",
    },
  },
  {
    id: "180-4",
    model: "Euro-Cyl 180/4",
    volume: 196,
    usable: 186,
    relief: 4,
    reliefOption: 1.5,
    burstDisc: 6,
    nerLin: 1.9,
    nerLoxAr: 1.3,
    diameter: 508,
    base: "roundRing",
    baseSize: "508",
    height: 1613,
    emptyKg: 109,
    maxLinKg: 259,
    maxLoxKg: 321,
    maxLarKg: 369,
    priceEur: 5880,
    isFeatured: true,
    note: {
      en: "A low-pressure vacuum-insulated cryogenic vessel of 196 L for storing and dispensing liquid nitrogen, oxygen and argon, on a round base with a support ring.",
      uk: "Низькотискова вакуумно-ізольована кріогенна ємність на 196 л для зберігання та видачі рідкого азоту, кисню та аргону, на круглій основі з опорним кільцем.",
      ru: "Низконапорная вакуумно-изолированная криогенная ёмкость на 196 л для хранения и выдачи жидкого азота, кислорода и аргона, на круглом основании с опорным кольцом.",
    },
  },
  {
    id: "230-4-rb",
    model: "Euro-Cyl 230/4 RB",
    volume: 240,
    usable: 228,
    relief: 4,
    reliefOption: 1.5,
    burstDisc: 6,
    nerLin: 1.8,
    nerLoxAr: 1.2,
    diameter: 660,
    base: "roundWheels",
    baseSize: "660",
    height: 1391,
    emptyKg: 135,
    maxLinKg: 309,
    maxLoxKg: 385,
    maxLarKg: 443,
    priceEur: 7200,
    note: {
      en: "A mobile low-pressure cryogenic vessel of 240 L with a round wheeled base for transporting, storing and dispensing cryogenic liquids.",
      uk: "Мобільна низькотискова кріогенна ємність обʼємом 240 л із круглою колісною базою для транспортування, зберігання та видачі кріогенних рідин.",
      ru: "Мобильная низконапорная криогенная ёмкость объёмом 240 л с круглой колёсной базой для транспортировки, хранения и выдачи криогенных жидкостей.",
    },
  },
  {
    id: "230-4-sb",
    model: "Euro-Cyl 230/4 SB",
    volume: 240,
    usable: 228,
    relief: 4,
    reliefOption: 1.5,
    burstDisc: 6,
    nerLin: 1.8,
    nerLoxAr: 1.2,
    diameter: 660,
    base: "squareWheels",
    baseSize: "715 × 715",
    height: 1391,
    emptyKg: 155,
    maxLinKg: 327,
    maxLoxKg: 403,
    maxLarKg: 461,
    priceEur: 7200,
    note: {
      en: "A mobile vacuum-insulated vessel of 240 L on a square wheeled base, designed for liquid nitrogen, oxygen and argon. Same volume as the 230/4 RB; the square base is 20 kg heavier.",
      uk: "Мобільна вакуумно-ізольована ємність обʼємом 240 л на квадратній колісній базі, призначена для роботи з рідким азотом, киснем та аргоном. Обʼєм той самий, що в 230/4 RB; квадратна основа важча на 20 кг.",
      ru: "Мобильная вакуумно-изолированная ёмкость объёмом 240 л на квадратной колёсной базе, предназначена для работы с жидким азотом, кислородом и аргоном. Объём тот же, что у 230/4 RB; квадратное основание тяжелее на 20 кг.",
    },
  },
  {
    id: "600-8",
    model: "Euro-Cyl 600/8",
    volume: 673,
    usable: 639,
    relief: 8,
    nerLin: 1.6,
    nerLoxAr: 1.1,
    diameter: 965,
    base: "pallet",
    baseSize: "1 030 × 1 030",
    height: 1915,
    emptyKg: 735,
    maxLinKg: 1086,
    maxLoxKg: 1303,
    maxLarKg: 1464,
    priceEur: 20190,
    note: {
      en: "A larger cryogenic vessel of 673 L for transporting, storing and dispensing liquid nitrogen, oxygen and argon. A protective pallet frame makes industrial transport and handling easier.",
      uk: "Кріогенна ємність збільшеної місткості — 673 л — для транспортування, зберігання та видачі рідкого азоту, кисню та аргону. Захисна палетна рама спрощує промислове транспортування та переміщення обладнання.",
      ru: "Криогенная ёмкость увеличенной вместимости — 673 л — для транспортировки, хранения и выдачи жидкого азота, кислорода и аргона. Защитная паллетная рама упрощает промышленную транспортировку и перемещение оборудования.",
    },
  },
  {
    id: "1000-8",
    model: "Euro-Cyl 1000/8",
    volume: 993,
    usable: 943,
    relief: 8,
    nerLin: 1.5,
    nerLoxAr: 1.0,
    diameter: 1067,
    base: "pallet",
    baseSize: "1 130 × 1 130",
    height: 2165,
    emptyKg: 720,
    maxLinKg: 1493,
    maxLoxKg: 1812,
    maxLarKg: 2050,
    priceEur: 29790,
    note: {
      en: "A low-pressure vacuum-insulated cryogenic vessel of almost 1 m³ for industrial storage, transport and supply of liquefied gases, in a pallet frame.",
      uk: "Низькотискова вакуумно-ізольована кріогенна ємність обʼємом майже 1 м³ для промислового зберігання, транспортування та подачі рідких газів, у палетній рамі.",
      ru: "Низконапорная вакуумно-изолированная криогенная ёмкость объёмом почти 1 м³ для промышленного хранения, транспортировки и подачи жидких газов, в паллетной раме.",
    },
  },
];
