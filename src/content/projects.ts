/**
 * Реалізовані проєкти — з файлу клієнта «Виконані інсталяції» (вересень 2026).
 *
 * Назви клієнтів клієнт не розкриває — лише галузь. Факти (обладнання, дата,
 * перелік робіт) перенесені як є; опис доповнено тільки тим, що видно на
 * фото. На знімках розмиті номерні знаки автомобілів.
 *
 * Новий обʼєкт: фото у `public/images/projects/` (WebP, до 1600 px),
 * запис у масив нижче — сторінка /projects, блоки на категоріях каталогу
 * й посадкових сторінках оновляться самі.
 */
import type { L } from "@/lib/sanity/seed/helpers";
import { ROUTES } from "@/constants/routes";

export type ProjectImage = { src: string; width: number; height: number; alt: L };

export type Project = {
  /** Якір на сторінці /projects. */
  id: string;
  /** Рік і місяць завершення, YYYY-MM — для сортування. */
  completed: string;
  completedLabel: L;
  industry: L;
  title: L;
  summary: L;
  equipment: L[];
  scope: L[];
  /** Для підсумкових цифр на сторінці. */
  tanks: { count: number; volume: number };
  images: ProjectImage[];
  /** Фото для картки; за замовчуванням — перше. */
  cover?: number;
  /** `_id` категорій каталогу, на яких показувати проєкт. */
  hubs: string[];
  /** Посадкова сторінка галузі. */
  landing?: string;
};

const IMG = "/images/projects";

const SUPPLY: L = { en: "Equipment supply", uk: "Поставка обладнання", ru: "Поставка оборудования" };
const TRANSPORT: L = { en: "Transport", uk: "Транспортування", ru: "Транспортировка" };
const COMMISSIONING: L = { en: "Commissioning and start-up", uk: "Пусконалагодження", ru: "Пусконаладка" };

export const PROJECTS: Project[] = [
  {
    id: "beverage-plant",
    completed: "2025-12",
    completedLabel: { en: "December 2025", uk: "грудень 2025", ru: "декабрь 2025" },
    industry: { en: "Soft drinks bottling", uk: "Розлив газованих напоїв", ru: "Розлив газированных напитков" },
    title: {
      en: "A 50 m³ CO₂ tank and a 1,000 kg/h gasifier for a soft drinks plant",
      uk: "Ємність CO₂ на 50 м³ і газифікатор на 1 000 кг/год для заводу напоїв",
      ru: "Ёмкость CO₂ на 50 м³ и газификатор на 1 000 кг/ч для завода напитков",
    },
    summary: {
      en: "For a soft drinks bottling plant we supplied a 50 m³ Chart Ferox tank and a Grobelny gasifier rated at 1,000 kg/h. The tank was delivered on a low-loader and set on its foundation, the gasifiers were installed on a process platform inside the plant, then we laid the pipelines and commissioned the system.",
      uk: "Для підприємства з розливу газованих напоїв постачили ємність Chart Ferox на 50 м³ і газифікатор Grobelny продуктивністю 1 000 кг/год. Ємність доставили тралом і встановили на фундамент, газифікатори змонтували на технологічному майданчику в цеху, проклали трубопроводи й провели пусконалагодження.",
      ru: "Для предприятия по розливу газированных напитков поставили ёмкость Chart Ferox на 50 м³ и газификатор Grobelny производительностью 1 000 кг/ч. Ёмкость доставили тралом и установили на фундамент, газификаторы смонтировали на технологической площадке в цехе, проложили трубопроводы и провели пусконаладку.",
    },
    equipment: [
      { en: "Chart Ferox tank, 50 m³", uk: "Ємність Chart Ferox, 50 м³", ru: "Ёмкость Chart Ferox, 50 м³" },
      { en: "Grobelny gasifier, 1,000 kg/h", uk: "Газифікатор Grobelny, 1 000 кг/год", ru: "Газификатор Grobelny, 1 000 кг/ч" },
    ],
    scope: [
      SUPPLY,
      TRANSPORT,
      { en: "Installation of the tank, gasifiers and pipelines", uk: "Монтаж ємності, газифікаторів і трубопроводів", ru: "Монтаж ёмкости, газификаторов и трубопроводов" },
      COMMISSIONING,
    ],
    tanks: { count: 1, volume: 50 },
    images: [
      {
        src: `${IMG}/beverages-co2-tank-50m3-delivery.webp`,
        width: 1280,
        height: 960,
        alt: {
          en: "50 m³ CO₂ tank on a low-loader on its way to a beverage plant",
          uk: "Ємність CO₂ на 50 м³ на тралі під час доставки на завод напоїв",
          ru: "Ёмкость CO₂ на 50 м³ на трале во время доставки на завод напитков",
        },
      },
      {
        src: `${IMG}/beverages-co2-tank-50m3-foundation.webp`,
        width: 960,
        height: 1280,
        alt: {
          en: "The 50 m³ CO₂ tank on its foundation: support legs, piping and pressure gauges",
          uk: "Ємність CO₂ на 50 м³ на фундаменті: опори, обвʼязка й манометри",
          ru: "Ёмкость CO₂ на 50 м³ на фундаменте: опоры, обвязка и манометры",
        },
      },
      {
        src: `${IMG}/beverages-co2-vaporizers-1000-kg-h.webp`,
        width: 572,
        height: 763,
        alt: {
          en: "Gasifier units with fans and a control cabinet on the process platform of the plant",
          uk: "Газифікатори з вентиляторами й шафою керування на технологічному майданчику заводу",
          ru: "Газификаторы с вентиляторами и шкафом управления на технологической площадке завода",
        },
      },
      {
        src: `${IMG}/beverages-co2-vaporizer-piping.webp`,
        width: 960,
        height: 1280,
        alt: {
          en: "Gasifier outlet with flanged stainless piping and safety line",
          uk: "Вихід газифікатора з фланцевою обвʼязкою з нержавіючої сталі та запобіжною лінією",
          ru: "Выход газификатора с фланцевой обвязкой из нержавеющей стали и предохранительной линией",
        },
      },
    ],
    hubs: ["cat-tanks-co2", "cat-co2-vaporizers", "cat-installation"],
    landing: ROUTES.industryBeverages,
  },
  {
    id: "dry-ice-plant",
    completed: "2025-01",
    completedLabel: { en: "January 2025", uk: "січень 2025", ru: "январь 2025" },
    industry: { en: "Dry ice production", uk: "Виробництво сухого льоду", ru: "Производство сухого льда" },
    title: {
      en: "A 60 m³ CO₂ tank and a 300 kg/h dry ice machine",
      uk: "Ємність CO₂ на 60 м³ і машина сухого льоду на 300 кг/год",
      ru: "Ёмкость CO₂ на 60 м³ и машина сухого льда на 300 кг/ч",
    },
    summary: {
      en: "For a dry ice producer we supplied a 60 m³ Chart Ferox tank and a 300 kg/h dry ice machine. We installed the tank, the equipment and the liquid CO₂ pipeline from the tank to the production building, and commissioned the line. The raw material is delivered by road tanker straight to the tank.",
      uk: "Для виробника сухого льоду постачили ємність Chart Ferox на 60 м³ і машину продуктивністю 300 кг/год. Змонтували ємність, обладнання й трубопровід рідкого CO₂ від ємності до виробничої будівлі, провели пусконалагодження. Сировину завозять автоцистерною прямо до ємності.",
      ru: "Для производителя сухого льда поставили ёмкость Chart Ferox на 60 м³ и машину производительностью 300 кг/ч. Смонтировали ёмкость, оборудование и трубопровод жидкого CO₂ от ёмкости до производственного здания, провели пусконаладку. Сырьё завозят автоцистерной прямо к ёмкости.",
    },
    equipment: [
      { en: "Chart Ferox tank, 60 m³", uk: "Ємність Chart Ferox, 60 м³", ru: "Ёмкость Chart Ferox, 60 м³" },
      { en: "Dry ice machine, 300 kg/h", uk: "Машина для виробництва сухого льоду, 300 кг/год", ru: "Машина для производства сухого льда, 300 кг/ч" },
    ],
    scope: [
      SUPPLY,
      TRANSPORT,
      { en: "Installation of the tank, equipment and pipelines", uk: "Монтаж ємності, обладнання й трубопроводів", ru: "Монтаж ёмкости, оборудования и трубопроводов" },
      COMMISSIONING,
    ],
    tanks: { count: 1, volume: 60 },
    images: [
      {
        src: `${IMG}/dry-ice-plant-co2-tank-60m3-site.webp`,
        width: 741,
        height: 556,
        alt: {
          en: "Dry ice production site with a 60 m³ vertical CO₂ tank next to the production building",
          uk: "Майданчик виробництва сухого льоду з вертикальною ємністю CO₂ на 60 м³ біля виробничої будівлі",
          ru: "Площадка производства сухого льда с вертикальной ёмкостью CO₂ на 60 м³ возле производственного здания",
        },
      },
      {
        src: `${IMG}/dry-ice-plant-co2-tanker-filling.webp`,
        width: 718,
        height: 539,
        alt: {
          en: "Road tanker filling the CO₂ tank at the dry ice plant",
          uk: "Автоцистерна заправляє ємність CO₂ на виробництві сухого льоду",
          ru: "Автоцистерна заправляет ёмкость CO₂ на производстве сухого льда",
        },
      },
      {
        src: `${IMG}/dry-ice-plant-co2-tank-60m3-base.webp`,
        width: 694,
        height: 520,
        alt: {
          en: "Base of the 60 m³ CO₂ tank with the valve group and flexible hoses",
          uk: "Нижня частина ємності CO₂ на 60 м³ із групою арматури та гнучкими рукавами",
          ru: "Нижняя часть ёмкости CO₂ на 60 м³ с группой арматуры и гибкими рукавами",
        },
      },
      {
        src: `${IMG}/dry-ice-plant-co2-pipeline.webp`,
        width: 692,
        height: 519,
        alt: {
          en: "Stainless liquid CO₂ pipeline from the tank along the wall of the production building",
          uk: "Трубопровід рідкого CO₂ з нержавіючої сталі від ємності вздовж стіни виробничої будівлі",
          ru: "Трубопровод жидкого CO₂ из нержавеющей стали от ёмкости вдоль стены производственного здания",
        },
      },
    ],
    hubs: ["cat-tanks-co2", "cat-installation"],
    landing: ROUTES.dryIceProduction,
  },
  {
    id: "flower-greenhouse",
    completed: "2024-12",
    completedLabel: { en: "December 2024", uk: "грудень 2024", ru: "декабрь 2024" },
    industry: { en: "Greenhouse business, flowers", uk: "Тепличне господарство, квіти", ru: "Тепличное хозяйство, цветы" },
    title: {
      en: "A 20 m³ CO₂ tank and a 250 kg/h gasifier for a flower greenhouse",
      uk: "Ємність CO₂ на 20 м³ і газифікатор на 250 кг/год для квіткової теплиці",
      ru: "Ёмкость CO₂ на 20 м³ и газификатор на 250 кг/ч для цветочной теплицы",
    },
    summary: {
      en: "For a greenhouse business growing flowers we supplied a 20 m³ liquid CO₂ tank and a 250 kg/h gasifier for CO₂ enrichment of the greenhouses. The tank was delivered, installed next to the greenhouse and commissioned.",
      uk: "Для тепличного господарства, що вирощує квіти, постачили ємність для рідкого CO₂ на 20 м³ і газифікатор продуктивністю 250 кг/год для підживлення теплиць вуглекислотою. Ємність доставили, змонтували біля теплиці й провели пусконалагодження.",
      ru: "Для тепличного хозяйства, выращивающего цветы, поставили ёмкость для жидкого CO₂ на 20 м³ и газификатор производительностью 250 кг/ч для подкормки теплиц углекислотой. Ёмкость доставили, смонтировали возле теплицы и провели пусконаладку.",
    },
    equipment: [
      { en: "Liquid CO₂ tank, 20 m³", uk: "Ємність для рідкого CO₂, 20 м³", ru: "Ёмкость для жидкого CO₂, 20 м³" },
      { en: "Gasifier, 250 kg/h", uk: "Газифікатор, 250 кг/год", ru: "Газификатор, 250 кг/ч" },
    ],
    scope: [
      SUPPLY,
      TRANSPORT,
      { en: "Tank installation", uk: "Монтаж ємності", ru: "Монтаж ёмкости" },
      COMMISSIONING,
    ],
    tanks: { count: 1, volume: 20 },
    images: [
      {
        src: `${IMG}/flower-greenhouse-co2-tank-20m3.webp`,
        width: 697,
        height: 929,
        alt: {
          en: "20 m³ vertical liquid CO₂ tank next to a flower greenhouse",
          uk: "Вертикальна ємність для рідкого CO₂ на 20 м³ біля квіткової теплиці",
          ru: "Вертикальная ёмкость для жидкого CO₂ на 20 м³ возле цветочной теплицы",
        },
      },
      {
        src: `${IMG}/flower-greenhouse-co2-vaporizer-250-kg-h.webp`,
        width: 795,
        height: 891,
        alt: {
          en: "250 kg/h CO₂ gasifier with four fans in a steel frame",
          uk: "Газифікатор CO₂ на 250 кг/год із чотирма вентиляторами в сталевій рамі",
          ru: "Газификатор CO₂ на 250 кг/ч с четырьмя вентиляторами в стальной раме",
        },
      },
    ],
    hubs: ["cat-tanks-co2", "cat-co2-vaporizers"],
    landing: ROUTES.industryGreenhouses,
  },
  {
    id: "vegetable-greenhouse",
    completed: "2024-11",
    completedLabel: { en: "November 2024", uk: "листопад 2024", ru: "ноябрь 2024" },
    industry: { en: "Greenhouse business, vegetables", uk: "Тепличне господарство, овочі", ru: "Тепличное хозяйство, овощи" },
    title: {
      en: "Four 60 m³ CO₂ tanks for a vegetable greenhouse business",
      uk: "Чотири ємності CO₂ по 60 м³ для овочевого тепличного господарства",
      ru: "Четыре ёмкости CO₂ по 60 м³ для овощного тепличного хозяйства",
    },
    summary: {
      en: "For a greenhouse business growing vegetables we supplied four 60 m³ Chart Ferox tanks — 240 m³ of liquid CO₂ storage in total. The tanks were lifted onto their foundations by crane, the pipelines installed and the system commissioned. CO₂ is received from road tankers at a covered unloading bay next to the tanks.",
      uk: "Для тепличного господарства, що вирощує овочі, постачили чотири ємності Chart Ferox по 60 м³ — разом 240 м³ зберігання рідкого CO₂. Ємності встановили краном на фундаменти, змонтували трубопроводи й провели пусконалагодження. Вуглекислоту приймають з автоцистерн на критому майданчику поруч із ємностями.",
      ru: "Для тепличного хозяйства, выращивающего овощи, поставили четыре ёмкости Chart Ferox по 60 м³ — вместе 240 м³ хранения жидкого CO₂. Ёмкости установили краном на фундаменты, смонтировали трубопроводы и провели пусконаладку. Углекислоту принимают из автоцистерн на крытой площадке рядом с ёмкостями.",
    },
    equipment: [
      {
        en: "Four Chart Ferox tanks, 60 m³ each — 240 m³ in total",
        uk: "Чотири ємності Chart Ferox по 60 м³ — разом 240 м³",
        ru: "Четыре ёмкости Chart Ferox по 60 м³ — вместе 240 м³",
      },
    ],
    scope: [
      SUPPLY,
      TRANSPORT,
      { en: "Installation of the tanks and pipelines", uk: "Монтаж ємностей і трубопроводів", ru: "Монтаж ёмкостей и трубопроводов" },
      COMMISSIONING,
    ],
    tanks: { count: 4, volume: 240 },
    images: [
      {
        src: `${IMG}/greenhouse-four-co2-tanks-60m3.webp`,
        width: 580,
        height: 774,
        alt: {
          en: "Four 60 m³ CO₂ tanks installed in a row, the crane still on site",
          uk: "Чотири ємності CO₂ по 60 м³ у ряд, кран ще на майданчику",
          ru: "Четыре ёмкости CO₂ по 60 м³ в ряд, кран ещё на площадке",
        },
      },
      {
        src: `${IMG}/greenhouse-co2-tank-60m3-lifting.webp`,
        width: 580,
        height: 774,
        alt: {
          en: "Two cranes lifting a 60 m³ CO₂ tank into the vertical position",
          uk: "Два крани піднімають ємність CO₂ на 60 м³ у вертикальне положення",
          ru: "Два крана поднимают ёмкость CO₂ на 60 м³ в вертикальное положение",
        },
      },
      {
        src: `${IMG}/greenhouse-co2-tanker-unloading.webp`,
        width: 1280,
        height: 960,
        alt: {
          en: "CO₂ road tanker at the covered unloading bay next to the storage tanks and insulated pipelines",
          uk: "Автоцистерна CO₂ на критому майданчику приймання поруч з ємностями та ізольованими трубопроводами",
          ru: "Автоцистерна CO₂ на крытой площадке приёма рядом с ёмкостями и изолированными трубопроводами",
        },
      },
    ],
    hubs: ["cat-tanks-co2", "cat-installation"],
    landing: ROUTES.industryGreenhouses,
  },
];

export function projectsForCategory(categoryId: string): Project[] {
  return PROJECTS.filter((project) => project.hubs.includes(categoryId));
}

export function projectsForLanding(path: string): Project[] {
  return PROJECTS.filter((project) => project.landing === path);
}

export function projectTotals() {
  return PROJECTS.reduce(
    (sum, project) => ({
      projects: sum.projects + 1,
      tanks: sum.tanks + project.tanks.count,
      volume: sum.volume + project.tanks.volume,
    }),
    { projects: 0, tanks: 0, volume: 0 },
  );
}
