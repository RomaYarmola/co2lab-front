/**
 * Блог: автор, категорії та статті.
 *
 * Теми привʼязані до кластерів каталогу (див. SEO-ROADMAP.md, фаза 2):
 * кожна стаття відповідає на реальне питання перед покупкою і лінкується
 * на відповідні товари — це головний недооцінений важіль внутрішньої перелінковки.
 *
 * Автор — інженерна команда, а не вигадана людина: підставляти неіснуючого
 * експерта під статті не можна, це підриває E-E-A-T, щойно хтось перевірить.
 */
import { SEED_UPDATED_AT, faq, h2, img, li, p, slugs, type L, type SeedFaq, type SeedImage } from "./helpers.ts";
import type { SeedBlock, SeedProduct } from "./helpers.ts";
import { tankProducts } from "./tanks.ts";
import {
  ambientVaporizerProducts,
  co2VaporizerProducts,
  cylinderProducts,
  installationProduct,
  labProduct,
} from "./equipment.ts";

/**
 * Товари беремо напряму з модулів каталогу, а не з `./index.ts`:
 * index імпортує цей файл, тож звернення назад дало б цикл і TDZ на старті.
 */
const ALL_PRODUCTS: SeedProduct[] = [
  ...tankProducts,
  ...cylinderProducts,
  labProduct,
  ...ambientVaporizerProducts,
  ...co2VaporizerProducts,
  installationProduct,
];

function seedProduct(id: string): SeedProduct {
  const found = ALL_PRODUCTS.find((item) => item._id === id);
  if (!found) throw new Error(`Seed product not found: ${id}`);
  return found;
}

/* ─── Типи ─────────────────────────────────────────────────────────────── */

export type SeedAuthor = {
  _id: string;
  name: string;
  slug: { current: string };
  role: L;
  bio: L;
  photo?: SeedImage | null;
};

export type SeedBlogCategory = {
  _id: string;
  _updatedAt: string;
  title: L;
  slug: ReturnType<typeof slugs>;
  description: L;
  order: number;
  seo: { metaTitle: L; metaDescription: L; keywords: L };
  postCount?: number;
};

export type SeedPost = {
  _id: string;
  _updatedAt: string;
  title: L;
  slug: ReturnType<typeof slugs>;
  isPublished: true;
  isFeatured: boolean;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  author: SeedAuthor;
  categories: SeedBlogCategory[];
  tags: string[];
  coverImage: SeedImage;
  excerpt: L;
  body: { en: SeedBlock[]; uk: SeedBlock[]; ru: SeedBlock[] };
  faq: SeedFaq[];
  relatedProducts: SeedProduct[];
  relatedPosts: SeedPost[];
  seo: { metaTitle: L; metaDescription: L; keywords: L };
};

/** Рядок тіла статті: абзац, підзаголовок або пункт списку. */
type Line = ["p" | "h2" | "li", string];

function body(
  src: { en: Line[]; uk: Line[]; ru: Line[] },
  prefix: string,
): { en: SeedBlock[]; uk: SeedBlock[]; ru: SeedBlock[] } {
  const build = (lines: Line[]) =>
    lines.map(([style, text]) =>
      style === "h2" ? h2(text, prefix) : style === "li" ? li(text, prefix) : p(text, prefix),
    );
  return { en: build(src.en), uk: build(src.uk), ru: build(src.ru) };
}

const PHOTO = {
  tank: "/images/catalog/cryogenic-tank-with-ambient-vaporizer.webp",
  cylinder: "/images/catalog/cryogenic-cylinder-nitrogen.webp",
  greenhouse: "/images/catalog/co2-vaporizer-in-greenhouse.webp",
  crane: "/images/catalog/cryogenic-tank-installation-crane.webp",
  lab: "/images/catalog/co2-quality-control-laboratory.webp",
};

/* ─── Автор ────────────────────────────────────────────────────────────── */

export const seedAuthor: SeedAuthor = {
  _id: "author-co2lab-engineering",
  name: "CO₂ Lab",
  slug: { current: "co2lab-engineering" },
  role: {
    en: "Engineering team, CO₂ Lab",
    uk: "Інженерна команда CO₂ Lab",
    ru: "Инженерная команда CO₂ Lab",
  },
  bio: {
    en: "Engineers who select, supply, install and commission cryogenic storage and gas supply systems for CO₂, nitrogen, oxygen and argon. The material is based on our own projects at food plants, beverage bottlers, greenhouse complexes and industrial sites.",
    uk: "Інженери, які підбирають, постачають, монтують і запускають кріогенні системи зберігання та газопостачання для CO₂, азоту, кисню й аргону. Матеріали спираються на власні проєкти на харчових виробництвах, заводах напоїв, у тепличних комплексах і на промислових майданчиках.",
    ru: "Инженеры, которые подбирают, поставляют, монтируют и запускают криогенные системы хранения и газоснабжения для CO₂, азота, кислорода и аргона. Материалы опираются на собственные проекты на пищевых производствах, заводах напитков, в тепличных комплексах и на промышленных площадках.",
  },
  photo: null,
};

/* ─── Категорії блогу ──────────────────────────────────────────────────── */

export const catSelection: SeedBlogCategory = {
  _id: "blog-cat-selection",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Equipment selection",
    uk: "Підбір обладнання",
    ru: "Подбор оборудования",
  },
  slug: slugs("equipment-selection", "pidbir-obladnannya", "podbor-oborudovaniya"),
  description: {
    en: "How to choose tank volume, vaporizer capacity and configuration for a real consumption profile.",
    uk: "Як обрати обʼєм ємності, продуктивність випарника та комплектацію під реальний профіль споживання.",
    ru: "Как выбрать объём ёмкости, производительность испарителя и комплектацию под реальный профиль потребления.",
  },
  order: 10,
  seo: {
    metaTitle: {
      en: "Cryogenic equipment selection — guides from CO₂ Lab engineers",
      uk: "Підбір кріогенного обладнання — матеріали інженерів CO₂ Lab",
      ru: "Подбор криогенного оборудования — материалы инженеров CO₂ Lab",
    },
    metaDescription: {
      en: "How to size a cryogenic tank and vaporizer, when a cylinder beats a stationary tank, and what actually drives the cost of a gas supply system.",
      uk: "Як розрахувати обʼєм кріогенної ємності та випарника, коли кріоциліндр вигідніший за стаціонарну ємність і від чого залежить вартість системи газопостачання.",
      ru: "Как рассчитать объём криогенной ёмкости и испарителя, когда криоцилиндр выгоднее стационарной ёмкости и от чего зависит стоимость системы газоснабжения.",
    },
    keywords: {
      en: "cryogenic tank sizing, vaporizer capacity, gas supply system",
      uk: "підбір кріогенної ємності, розрахунок випарника, система газопостачання",
      ru: "подбор криогенной емкости, расчет испарителя, система газоснабжения",
    },
  },
};

export const catInstallation: SeedBlogCategory = {
  _id: "blog-cat-installation",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Installation and operation",
    uk: "Монтаж та експлуатація",
    ru: "Монтаж и эксплуатация",
  },
  slug: slugs("installation-and-operation", "montazh-ta-ekspluatatsiya", "montazh-i-ekspluatatsiya"),
  description: {
    en: "Site preparation, foundations, piping, commissioning and day-to-day operation of cryogenic systems.",
    uk: "Підготовка майданчика, фундаменти, обвʼязка, пусконалагодження та щоденна експлуатація кріогенних систем.",
    ru: "Подготовка площадки, фундаменты, обвязка, пусконаладка и повседневная эксплуатация криогенных систем.",
  },
  order: 20,
  seo: {
    metaTitle: {
      en: "Installation and operation of cryogenic systems — CO₂ Lab",
      uk: "Монтаж та експлуатація кріогенних систем — CO₂ Lab",
      ru: "Монтаж и эксплуатация криогенных систем — CO₂ Lab",
    },
    metaDescription: {
      en: "What to prepare before the installation crew arrives: foundation, access for the tanker, utilities and documents.",
      uk: "Що підготувати до приїзду монтажної бригади: фундамент, підʼїзд для автоцистерни, комунікації та документи.",
      ru: "Что подготовить к приезду монтажной бригады: фундамент, подъезд для автоцистерны, коммуникации и документы.",
    },
    keywords: {
      en: "cryogenic tank foundation, installation checklist",
      uk: "фундамент під кріогенну ємність, монтаж кріогенної ємності",
      ru: "фундамент под криогенную емкость, монтаж криогенной емкости",
    },
  },
};

export const catQuality: SeedBlogCategory = {
  _id: "blog-cat-quality",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Gas quality and standards",
    uk: "Якість газів і стандарти",
    ru: "Качество газов и стандарты",
  },
  slug: slugs("gas-quality-and-standards", "yakist-gaziv-ta-standarty", "kachestvo-gazov-i-standarty"),
  description: {
    en: "Purity requirements, incoming inspection and the documents a food-grade CO₂ buyer needs.",
    uk: "Вимоги до чистоти, вхідний контроль і документи, потрібні покупцю харчового CO₂.",
    ru: "Требования к чистоте, входной контроль и документы, нужные покупателю пищевого CO₂.",
  },
  order: 30,
  seo: {
    metaTitle: {
      en: "CO₂ quality and standards: ISBT, EIGA, DSTU — CO₂ Lab",
      uk: "Якість CO₂ і стандарти: ISBT, EIGA, ДСТУ — CO₂ Lab",
      ru: "Качество CO₂ и стандарты: ISBT, EIGA, ДСТУ — CO₂ Lab",
    },
    metaDescription: {
      en: "Which CO₂ parameters are limited by ISBT and EIGA, why a supplier certificate does not replace incoming inspection, and what a minimum laboratory looks like.",
      uk: "Які параметри CO₂ обмежують ISBT та EIGA, чому сертифікат постачальника не замінює вхідний контроль і який мінімальний склад лабораторії.",
      ru: "Какие параметры CO₂ ограничивают ISBT и EIGA, почему сертификат поставщика не заменяет входной контроль и каков минимальный состав лаборатории.",
    },
    keywords: {
      en: "ISBT CO2, EIGA CO2, beverage grade CO2 quality",
      uk: "ISBT CO2, EIGA, якість харчового CO2",
      ru: "ISBT CO2, EIGA, качество пищевого CO2",
    },
  },
};

export const seedBlogCategories: SeedBlogCategory[] = [catSelection, catInstallation, catQuality];

/* ─── Стаття 1: обʼєм ємності для CO₂ ──────────────────────────────────── */

const postTankVolume: SeedPost = {
  _id: "post-co2-tank-volume",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "How to choose the volume of a CO₂ storage tank",
    uk: "Як підібрати обʼєм кріогенної ємності для CO₂",
    ru: "Как подобрать объём криогенной ёмкости для CO₂",
  },
  slug: slugs(
    "how-to-choose-co2-tank-volume",
    "yak-pidibraty-obyem-yemnosti-dlya-co2",
    "kak-podobrat-obyem-emkosti-dlya-co2",
  ),
  isPublished: true,
  isFeatured: true,
  publishedAt: "2026-09-07T09:00:00Z",
  updatedAt: "2026-09-07T09:00:00Z",
  readingTimeMinutes: 3,
  author: seedAuthor,
  categories: [catSelection],
  tags: ["CO2", "кріогенні ємності", "підбір обладнання"],
  coverImage: img(PHOTO.tank, {
    en: "Vertical cryogenic CO₂ tank with an ambient air vaporizer on a customer site",
    uk: "Вертикальна кріогенна ємність для CO₂ з атмосферним випарником на майданчику замовника",
    ru: "Вертикальная криогенная ёмкость для CO₂ с атмосферным испарителем на площадке заказчика",
  }),
  excerpt: {
    en: "An oversized tank ties up money and vents product through the safety valve. An undersized one stops the line when the tanker is late. Here is how to find the middle.",
    uk: "Завелика ємність заморожує гроші й стравлює продукт через запобіжний клапан. Замала зупиняє лінію, щойно постачальник запізнився. Розбираємо, як знайти середину.",
    ru: "Слишком большая ёмкость замораживает деньги и стравливает продукт через предохранительный клапан. Слишком маленькая останавливает линию, как только поставщик опоздал. Разбираем, как найти середину.",
  },
  body: body(
    {
      en: [
        ["p", "Tank volume is not a case of «the bigger the better». An oversized vessel costs more, takes longer to pay back and, at low turnover, vents product through the safety valve. An undersized one turns into constant calls to the supplier and a stopped line whenever a delivery is late."],
        ["h2", "Three figures to start from"],
        ["li", "Average daily consumption in kilograms or tonnes."],
        ["li", "Peak daily consumption — season, extra shift, bottling campaign."],
        ["li", "The delivery interval your gas supplier can realistically hold."],
        ["p", "The working rule: the tank should hold one and a half to two full deliveries. A road tanker in Ukraine brings roughly 20–24 tonnes, so a 30 m³ tank takes a full tanker and still leaves a working reserve."],
        ["h2", "From cubic metres to tonnes"],
        ["p", "Liquid CO₂ is stored at about −20 °C with a density near 1.03 t/m³, and tanks are filled to 90–95% of geometric volume. In round numbers: 10 m³ is about 9.5 tonnes, 30 m³ about 29 tonnes, 50 m³ about 48 tonnes."],
        ["h2", "Typical configurations"],
        ["li", "10–20 m³ — brewery, small bottling line, greenhouse of one to two hectares."],
        ["li", "30 m³ — beverage plant, food producer, greenhouse complex. The most common choice."],
        ["li", "50 m³ — large production, dry ice workshop, several consumers at once."],
        ["li", "80–100 m³ — CO₂ producer or distributor, buffer storage that smooths out the shipping schedule."],
        ["h2", "What else changes the answer"],
        ["li", "Boil-off. A vacuum-insulated tank loses roughly 0.15–0.3% per day. At low turnover an oversized tank simply vents gas you paid for."],
        ["li", "Peak demand is covered by the vaporizer, not by the tank. A 50 m³ tank with a 100 kg/h vaporizer will not save a line that needs 400 kg/h."],
        ["li", "Site constraints: space for the foundation, safety distances and access for a tanker."],
        ["h2", "A worked example"],
        ["p", "A beverage plant uses 12 tonnes of CO₂ a month, evenly across the month, and the supplier delivers once a week. Weekly demand is about 3 tonnes, so in theory a 5 m³ tank would do. In practice we would put in 20–30 m³: the supplier will not drive a tanker for three tonnes at a reasonable price, and a full delivery has to fit somewhere. The tank is chosen by the economics of delivery, not only by consumption."],
        ["h2", "Mistakes we see most often"],
        ["li", "Sizing by average consumption while the plant works in campaigns. Two weeks of bottling at triple rate empty a tank that looked comfortable on paper."],
        ["li", "Forgetting the vaporizer. The tank is generous, the vaporizer is minimal, and the line starves at peak."],
        ["li", "Choosing volume before agreeing delivery logistics with the gas supplier. Their minimum shipment often decides the answer."],
        ["li", "No reserve for growth in the piping and foundation, so the next step means rebuilding the whole site rather than swapping the vessel."],
        ["p", "Send us your monthly consumption and delivery schedule — we will size the tank and vaporizer and show the calculation, free of charge."],
      ],
      uk: [
        ["p", "Обʼєм ємності — це не «чим більше, тим краще». Завелика посудина коштує дорожче, довше окупається і за низької оборотності стравлює продукт через запобіжний клапан. Замала перетворюється на постійні дзвінки постачальнику й зупинку лінії, щойно поставка запізнилась."],
        ["h2", "Три цифри, з яких усе починається"],
        ["li", "Середньодобове споживання в кілограмах або тоннах."],
        ["li", "Пікове добове споживання — сезон, додаткова зміна, кампанія розливу."],
        ["li", "Інтервал між поставками, який реально витримує ваш постачальник газу."],
        ["p", "Робоче правило: ємність має вміщати півтори–дві повні поставки. Автоцистерна в Україні привозить приблизно 20–24 тонни, тож ємність на 30 м³ приймає повну цистерну й лишає робочий запас."],
        ["h2", "Від кубометрів до тонн"],
        ["p", "Рідкий CO₂ зберігається за температури близько −20 °C, густина — близько 1,03 т/м³, а заповнюють ємність на 90–95% геометричного обʼєму. Округлено: 10 м³ — це приблизно 9,5 тонни, 30 м³ — близько 29 тонн, 50 м³ — близько 48 тонн."],
        ["h2", "Типові конфігурації"],
        ["li", "10–20 м³ — пивоварня, невелика лінія розливу, теплиця на один-два гектари."],
        ["li", "30 м³ — завод напоїв, харчове виробництво, тепличний комплекс. Найпоширеніший вибір."],
        ["li", "50 м³ — велике виробництво, цех сухого льоду, кілька споживачів одночасно."],
        ["li", "80–100 м³ — виробник або дистрибʼютор CO₂, буферне сховище, що вирівнює графік відвантажень."],
        ["h2", "Що ще змінює відповідь"],
        ["li", "Втрати на випаровування. Вакуумно-ізольована ємність втрачає приблизно 0,15–0,3% на добу. За низької оборотності завелика ємність просто стравлює газ, за який ви заплатили."],
        ["li", "Пікове споживання закриває випарник, а не ємність. Ємність на 50 м³ з випарником на 100 кг/год не врятує лінію, якій потрібно 400 кг/год."],
        ["li", "Обмеження майданчика: місце під фундамент, безпечні відстані та підʼїзд для автоцистерни."],
        ["h2", "Приклад розрахунку"],
        ["p", "Завод напоїв споживає 12 тонн CO₂ на місяць рівномірно, постачальник возить раз на тиждень. Тижнева потреба — близько 3 тонн, тобто теоретично вистачило б ємності на 5 м³. На практиці ми поставимо 20–30 м³: постачальник не поїде з автоцистерною заради трьох тонн за адекватною ціною, а повна поставка має кудись поміститись. Ємність обирають за економікою доставки, а не лише за споживанням."],
        ["h2", "Помилки, які трапляються найчастіше"],
        ["li", "Розрахунок за середнім споживанням, коли виробництво працює кампаніями. Два тижні розливу на потрійній швидкості спорожнюють ємність, яка на папері виглядала з запасом."],
        ["li", "Забули про випарник. Ємність із запасом, випарник мінімальний — і лінія голодує в пік."],
        ["li", "Обрали обʼєм до того, як узгодили логістику з постачальником газу. Його мінімальне відвантаження часто й вирішує відповідь."],
        ["li", "Не заклали запас у трубопроводи й фундамент, тож наступний крок означає перебудову майданчика, а не заміну посудини."],
        ["p", "Надішліть місячне споживання і графік поставок — підберемо обʼєм ємності та випарник і покажемо розрахунок безкоштовно."],
      ],
      ru: [
        ["p", "Объём ёмкости — это не «чем больше, тем лучше». Слишком большой сосуд стоит дороже, дольше окупается и при низкой оборачиваемости стравливает продукт через предохранительный клапан. Слишком маленький превращается в постоянные звонки поставщику и остановку линии, как только поставка задержалась."],
        ["h2", "Три цифры, с которых всё начинается"],
        ["li", "Среднесуточное потребление в килограммах или тоннах."],
        ["li", "Пиковое суточное потребление — сезон, дополнительная смена, кампания розлива."],
        ["li", "Интервал между поставками, который реально выдерживает ваш поставщик газа."],
        ["p", "Рабочее правило: ёмкость должна вмещать полторы–две полные поставки. Автоцистерна в Украине привозит примерно 20–24 тонны, поэтому ёмкость на 30 м³ принимает полную цистерну и оставляет рабочий запас."],
        ["h2", "От кубометров к тоннам"],
        ["p", "Жидкий CO₂ хранится при температуре около −20 °C, плотность — около 1,03 т/м³, а заполняют ёмкость на 90–95% геометрического объёма. Округлённо: 10 м³ — это примерно 9,5 тонны, 30 м³ — около 29 тонн, 50 м³ — около 48 тонн."],
        ["h2", "Типовые конфигурации"],
        ["li", "10–20 м³ — пивоварня, небольшая линия розлива, теплица на один-два гектара."],
        ["li", "30 м³ — завод напитков, пищевое производство, тепличный комплекс. Самый распространённый выбор."],
        ["li", "50 м³ — крупное производство, цех сухого льда, несколько потребителей одновременно."],
        ["li", "80–100 м³ — производитель или дистрибьютор CO₂, буферное хранилище, выравнивающее график отгрузок."],
        ["h2", "Что ещё меняет ответ"],
        ["li", "Потери на испарение. Вакуумно-изолированная ёмкость теряет примерно 0,15–0,3% в сутки. При низкой оборачиваемости слишком большая ёмкость просто стравливает газ, за который вы заплатили."],
        ["li", "Пиковое потребление закрывает испаритель, а не ёмкость. Ёмкость на 50 м³ с испарителем на 100 кг/ч не спасёт линию, которой нужно 400 кг/ч."],
        ["li", "Ограничения площадки: место под фундамент, безопасные расстояния и подъезд для автоцистерны."],
        ["h2", "Пример расчёта"],
        ["p", "Завод напитков потребляет 12 тонн CO₂ в месяц равномерно, поставщик возит раз в неделю. Недельная потребность — около 3 тонн, то есть теоретически хватило бы ёмкости на 5 м³. На практике мы поставим 20–30 м³: поставщик не поедет с автоцистерной ради трёх тонн по адекватной цене, а полная поставка должна куда-то поместиться. Ёмкость выбирают по экономике доставки, а не только по потреблению."],
        ["h2", "Ошибки, которые встречаются чаще всего"],
        ["li", "Расчёт по среднему потреблению, когда производство работает кампаниями. Две недели розлива на тройной скорости опустошают ёмкость, которая на бумаге выглядела с запасом."],
        ["li", "Забыли про испаритель. Ёмкость с запасом, испаритель минимальный — и линия голодает в пик."],
        ["li", "Выбрали объём до того, как согласовали логистику с поставщиком газа. Его минимальная отгрузка часто и решает ответ."],
        ["li", "Не заложили запас в трубопроводы и фундамент, поэтому следующий шаг означает перестройку площадки, а не замену сосуда."],
        ["p", "Пришлите месячное потребление и график поставок — подберём объём ёмкости и испаритель и покажем расчёт бесплатно."],
      ],
    },
    "b1",
  ),
  faq: [
    faq(
      "faq-vol-1",
      {
        en: "Is it better to take a larger tank «for growth»?",
        uk: "Чи варто брати ємність із запасом «на виріст»?",
        ru: "Стоит ли брать ёмкость с запасом «на вырост»?",
      },
      {
        en: "Only if the growth is planned within a year or two. Until then the extra volume is money standing still plus boil-off losses on the unused part. A cheaper path is to size the piping and foundation for a bigger tank now and replace the vessel later.",
        uk: "Лише якщо зростання заплановане на рік-два. До того зайвий обʼєм — це гроші, що стоять, плюс втрати на випаровування невикористаної частини. Дешевший шлях — закласти обвʼязку й фундамент під більшу ємність зараз, а посудину замінити пізніше.",
        ru: "Только если рост запланирован на год-два. До этого лишний объём — это стоящие деньги плюс потери на испарение неиспользуемой части. Дешевле заложить обвязку и фундамент под большую ёмкость сейчас, а сосуд заменить позже.",
      },
    ),
    faq(
      "faq-vol-2",
      {
        en: "How much CO₂ is lost if production stops for a week?",
        uk: "Скільки CO₂ втратиться, якщо виробництво стане на тиждень?",
        ru: "Сколько CO₂ потеряется, если производство встанет на неделю?",
      },
      {
        en: "At 0.2% per day roughly 1.4% of the contents over a week — for a full 30 m³ tank that is about 400 kg. The pressure rises first, and only after the safety valve setpoint is reached does the product start venting.",
        uk: "За 0,2% на добу це приблизно 1,4% вмісту за тиждень — для повної ємності на 30 м³ близько 400 кг. Спершу зростає тиск, і лише після досягнення уставки запобіжного клапана продукт починає стравлюватись.",
        ru: "При 0,2% в сутки это примерно 1,4% содержимого за неделю — для полной ёмкости на 30 м³ около 400 кг. Сначала растёт давление, и только после достижения уставки предохранительного клапана продукт начинает стравливаться.",
      },
    ),
  ],
  relatedProducts: [seedProduct("product-tank-co2-30"), seedProduct("product-tank-co2-50")],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "How to choose CO₂ tank volume: calculation and typical configurations",
      uk: "Як підібрати обʼєм кріогенної ємності для CO₂: розрахунок і типові конфігурації",
      ru: "Как подобрать объём криогенной ёмкости для CO₂: расчёт и типовые конфигурации",
    },
    metaDescription: {
      en: "Consumption, delivery interval, boil-off: how to size a liquid CO₂ tank from 10 to 100 m³ and not overpay for volume you will not use.",
      uk: "Споживання, інтервал поставок, втрати на випаровування: як розрахувати ємність для рідкого CO₂ на 10–100 м³ і не переплатити за зайвий обʼєм.",
      ru: "Потребление, интервал поставок, потери на испарение: как рассчитать ёмкость для жидкого CO₂ на 10–100 м³ и не переплатить за лишний объём.",
    },
    keywords: {
      en: "CO2 tank volume, liquid CO2 storage sizing",
      uk: "обʼєм ємності для CO2, розрахунок кріогенної ємності",
      ru: "объем емкости для CO2, расчет криогенной емкости",
    },
  },
};

/* ─── Стаття 2: кріоциліндр чи стаціонарна ємність ─────────────────────── */

const postCylinderVsTank: SeedPost = {
  _id: "post-cylinder-vs-tank",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Cryogenic cylinder or stationary tank: when each one pays off",
    uk: "Кріоциліндр чи стаціонарна ємність: коли що вигідніше",
    ru: "Криоцилиндр или стационарная ёмкость: когда что выгоднее",
  },
  slug: slugs(
    "cryogenic-cylinder-or-stationary-tank",
    "kriotsylindr-chy-statsionarna-yemnist",
    "kriotsilindr-ili-statsionarnaya-emkost",
  ),
  isPublished: true,
  isFeatured: false,
  publishedAt: "2026-09-07T10:00:00Z",
  updatedAt: "2026-09-07T10:00:00Z",
  readingTimeMinutes: 3,
  author: seedAuthor,
  categories: [catSelection],
  tags: ["кріоциліндри", "азот", "підбір обладнання"],
  coverImage: img(PHOTO.cylinder, {
    en: "Cryogenic cylinder for liquid nitrogen in a transport frame with valves and pressure regulator",
    uk: "Кріоциліндр для рідкого азоту в транспортній рамі з арматурою та регулятором тиску",
    ru: "Криоцилиндр для жидкого азота в транспортной раме с арматурой и регулятором давления",
  }),
  excerpt: {
    en: "The question comes up when cylinders have become expensive but a stationary tank still looks like a big commitment. The answer is decided by three numbers, not by preference.",
    uk: "Питання виникає, коли балони вже дорогі, а стаціонарна ємність ще виглядає надто серйозним кроком. Відповідь вирішують три цифри, а не вподобання.",
    ru: "Вопрос возникает, когда баллоны уже дорогие, а стационарная ёмкость ещё выглядит слишком серьёзным шагом. Ответ решают три цифры, а не предпочтения.",
  },
  body: body(
    {
      en: [
        ["p", "A cryogenic cylinder is a portable vacuum-insulated vessel that stores liquefied gas and delivers it as gas or liquid under pressure. One cylinder replaces a rack of ten to twenty high-pressure cylinders, needs no foundation and no permit for a stationary pressure vessel."],
        ["h2", "When a cryogenic cylinder wins"],
        ["li", "Consumption is uneven or seasonal, and a stationary tank would stand half empty."],
        ["li", "The point of use moves — several workshops, a temporary site, a rented building."],
        ["li", "There is no space for a foundation or no time to go through the paperwork."],
        ["li", "A mobile reserve is needed next to an existing stationary system."],
        ["h2", "When a stationary tank wins"],
        ["li", "Consumption is steady and measured in tonnes per month."],
        ["li", "The cost per cubic metre of gas is the lowest of all supply options."],
        ["li", "There is room for a foundation and access for a tanker, so the gas is delivered in bulk."],
        ["h2", "Do the arithmetic on three lines"],
        ["p", "Compare the price per kilogram of product, the logistics (how many times a month someone has to deliver or exchange vessels) and the capital cost — foundation, piping, installation. A cylinder means zero capital cost and a higher price per kilogram. A tank is the opposite: you invest once and then buy gas cheaper."],
        ["p", "The break-even point usually appears somewhere around a few tonnes per month, but it shifts with the distance to the filling station: the further you are, the earlier a stationary tank starts to win."],
        ["h2", "The middle option"],
        ["p", "Between the two there is a small stationary tank of roughly 1000–3000 litres, refilled from a tanker on site. It gives close to bulk pricing without a large foundation and without the full permitting path of a big vessel."],
        ["h2", "How much is that in cylinders"],
        ["p", "A 500-litre cryogenic cylinder holds roughly 400 kg of liquid nitrogen, which is about 320 m³ of gas. A standard 40-litre high-pressure cylinder gives six to eight cubic metres. So one cryogenic cylinder replaces around forty-five to fifty ordinary cylinders — that is the whole rack, the manifold, the handling and most of the paperwork gone."],
        ["h2", "The hidden cost of cylinders"],
        ["li", "Rent for the cylinders themselves, charged whether they are full or standing empty."],
        ["li", "Logistics: someone loads, transports, unloads and returns them, every week."],
        ["li", "Residual pressure. A cylinder is never emptied completely, and you paid for what goes back."],
        ["li", "Downtime while changing over, and the safety risk of manual handling of heavy vessels."],
        ["p", "These lines rarely appear in the comparison, and they are usually what makes the switch pay off faster than the gas price alone suggests."],
        ["p", "Tell us your monthly volume, the number of consumption points and the distance to the nearest filling station — we will compare all three options in figures."],
      ],
      uk: [
        ["p", "Кріоциліндр — це переносна вакуумно-ізольована посудина, яка зберігає зріджений газ і видає його газом або рідиною під тиском. Один кріоциліндр замінює рампу з десяти-двадцяти балонів високого тиску, не потребує фундаменту й дозволу на стаціонарну посудину під тиском."],
        ["h2", "Коли виграє кріоциліндр"],
        ["li", "Споживання нерівномірне або сезонне, і стаціонарна ємність половину часу стояла б напівпорожньою."],
        ["li", "Точка споживання змінюється — кілька цехів, тимчасовий обʼєкт, орендоване приміщення."],
        ["li", "Немає місця під фундамент або немає часу проходити дозвільний шлях."],
        ["li", "Потрібен мобільний резерв поруч із наявною стаціонарною системою."],
        ["h2", "Коли виграє стаціонарна ємність"],
        ["li", "Споживання стабільне й вимірюється тоннами на місяць."],
        ["li", "Собівартість кубометра газу найнижча серед усіх варіантів постачання."],
        ["li", "Є місце під фундамент і підʼїзд для автоцистерни, тобто газ везуть наливом."],
        ["h2", "Порахуйте за трьома рядками"],
        ["p", "Порівняйте ціну за кілограм продукту, логістику (скільки разів на місяць треба привезти або обміняти посудини) і капітальні витрати — фундамент, обвʼязка, монтаж. Кріоциліндр — це нуль капітальних витрат і вища ціна за кілограм. Ємність — навпаки: інвестуєте один раз, далі купуєте газ дешевше."],
        ["p", "Точка беззбитковості зазвичай проходить десь у районі кількох тонн на місяць, але вона зсувається залежно від відстані до наповнювальної станції: чим ви далі, тим раніше стаціонарна ємність починає вигравати."],
        ["h2", "Проміжний варіант"],
        ["p", "Між цими двома є мала стаціонарна ємність приблизно на 1000–3000 літрів, яку заправляють з автоцистерни на місці. Вона дає ціну, близьку до наливної, без великого фундаменту й без повного дозвільного шляху великої посудини."],
        ["h2", "Скільки це в балонах"],
        ["p", "Кріоциліндр на 500 літрів вміщує приблизно 400 кг рідкого азоту, а це близько 320 м³ газу. Стандартний балон на 40 літрів дає шість-вісім кубометрів. Тобто один кріоциліндр замінює приблизно сорок пʼять — пʼятдесят звичайних балонів: зникає ціла рампа, колектор, вантажні роботи й більша частина паперів."],
        ["h2", "Приховані витрати балонного господарства"],
        ["li", "Оренда самих балонів, яка нараховується і за повні, і за ті, що стоять порожніми."],
        ["li", "Логістика: хтось щотижня вантажить, везе, розвантажує й повертає."],
        ["li", "Залишковий тиск. Балон ніколи не спорожнюється повністю, і ви заплатили за те, що поїхало назад."],
        ["li", "Простої під час заміни й ризик травм при ручному переміщенні важких посудин."],
        ["p", "Ці рядки рідко потрапляють у порівняння, і саме вони зазвичай роблять перехід вигіднішим, ніж здається за самою ціною газу."],
        ["p", "Напишіть місячний обсяг, кількість точок споживання та відстань до найближчої наповнювальної станції — порівняємо всі три варіанти в цифрах."],
      ],
      ru: [
        ["p", "Криоцилиндр — это переносной вакуумно-изолированный сосуд, который хранит сжиженный газ и выдаёт его газом или жидкостью под давлением. Один криоцилиндр заменяет рампу из десяти-двадцати баллонов высокого давления, не требует фундамента и разрешения на стационарный сосуд под давлением."],
        ["h2", "Когда выигрывает криоцилиндр"],
        ["li", "Потребление неравномерное или сезонное, и стационарная ёмкость половину времени стояла бы полупустой."],
        ["li", "Точка потребления меняется — несколько цехов, временный объект, арендованное помещение."],
        ["li", "Нет места под фундамент или нет времени проходить разрешительный путь."],
        ["li", "Нужен мобильный резерв рядом с имеющейся стационарной системой."],
        ["h2", "Когда выигрывает стационарная ёмкость"],
        ["li", "Потребление стабильное и измеряется тоннами в месяц."],
        ["li", "Себестоимость кубометра газа самая низкая среди всех вариантов снабжения."],
        ["li", "Есть место под фундамент и подъезд для автоцистерны, то есть газ везут наливом."],
        ["h2", "Посчитайте по трём строкам"],
        ["p", "Сравните цену за килограмм продукта, логистику (сколько раз в месяц нужно привезти или обменять сосуды) и капитальные затраты — фундамент, обвязка, монтаж. Криоцилиндр — это ноль капитальных затрат и более высокая цена за килограмм. Ёмкость — наоборот: инвестируете один раз, дальше покупаете газ дешевле."],
        ["p", "Точка безубыточности обычно проходит где-то в районе нескольких тонн в месяц, но она смещается в зависимости от расстояния до наполнительной станции: чем вы дальше, тем раньше стационарная ёмкость начинает выигрывать."],
        ["h2", "Промежуточный вариант"],
        ["p", "Между этими двумя есть малая стационарная ёмкость примерно на 1000–3000 литров, которую заправляют из автоцистерны на месте. Она даёт цену, близкую к наливной, без большого фундамента и без полного разрешительного пути крупного сосуда."],
        ["h2", "Сколько это в баллонах"],
        ["p", "Криоцилиндр на 500 литров вмещает примерно 400 кг жидкого азота, а это около 320 м³ газа. Стандартный баллон на 40 литров даёт шесть-восемь кубометров. То есть один криоцилиндр заменяет примерно сорок пять — пятьдесят обычных баллонов: исчезает целая рампа, коллектор, погрузочные работы и большая часть бумаг."],
        ["h2", "Скрытые затраты баллонного хозяйства"],
        ["li", "Аренда самих баллонов, которая начисляется и за полные, и за те, что стоят пустыми."],
        ["li", "Логистика: кто-то еженедельно грузит, везёт, разгружает и возвращает."],
        ["li", "Остаточное давление. Баллон никогда не опорожняется полностью, и вы заплатили за то, что уехало обратно."],
        ["li", "Простои при замене и риск травм при ручном перемещении тяжёлых сосудов."],
        ["p", "Эти строки редко попадают в сравнение, и именно они обычно делают переход выгоднее, чем кажется по одной цене газа."],
        ["p", "Напишите месячный объём, количество точек потребления и расстояние до ближайшей наполнительной станции — сравним все три варианта в цифрах."],
      ],
    },
    "b2",
  ),
  faq: [
    faq(
      "faq-cyl-vs-1",
      {
        en: "Can a cryogenic cylinder be refilled on site?",
        uk: "Чи можна заправляти кріоциліндр на місці?",
        ru: "Можно ли заправлять криоцилиндр на месте?",
      },
      {
        en: "Yes, if the supplier has a tanker with a refilling line. The alternative is exchange: the empty vessel is taken away and a full one is left. Which model is available depends on the supplier and the region.",
        uk: "Так, якщо постачальник має автоцистерну з лінією заправки. Альтернатива — обмін: порожню посудину забирають, лишають повну. Яка модель доступна, залежить від постачальника й регіону.",
        ru: "Да, если у поставщика есть автоцистерна с линией заправки. Альтернатива — обмен: пустой сосуд забирают, оставляют полный. Какая модель доступна, зависит от поставщика и региона.",
      },
    ),
    faq(
      "faq-cyl-vs-2",
      {
        en: "Does a cryogenic cylinder lose product while standing idle?",
        uk: "Чи втрачає кріоциліндр продукт під час простою?",
        ru: "Теряет ли криоцилиндр продукт во время простоя?",
      },
      {
        en: "Yes. Because of the small volume the relative losses are higher than in a stationary tank, typically around one to two percent per day. For long pauses it is better to plan take-off so the vessel is emptied rather than left standing full.",
        uk: "Так. Через малий обʼєм відносні втрати вищі, ніж у стаціонарної ємності, — зазвичай близько одного-двох відсотків на добу. За тривалих пауз краще планувати відбір так, щоб посудина спорожнялась, а не стояла повною.",
        ru: "Да. Из-за малого объёма относительные потери выше, чем у стационарной ёмкости, — обычно около одного-двух процентов в сутки. При длительных паузах лучше планировать отбор так, чтобы сосуд опорожнялся, а не стоял полным.",
      },
    ),
  ],
  relatedProducts: [seedProduct("product-cylinder-n2"), seedProduct("product-tank-n2-10")],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "Cryogenic cylinder or stationary tank — what to choose",
      uk: "Кріоциліндр чи стаціонарна ємність — що обрати",
      ru: "Криоцилиндр или стационарная ёмкость — что выбрать",
    },
    metaDescription: {
      en: "Where the break-even point between a cryogenic cylinder and a stationary tank lies, what a microbulk vessel changes, and how to compare the options in figures.",
      uk: "Де проходить точка беззбитковості між кріоциліндром і стаціонарною ємністю, що змінює мала ємність microbulk і як порівняти варіанти в цифрах.",
      ru: "Где проходит точка безубыточности между криоцилиндром и стационарной ёмкостью, что меняет малая ёмкость microbulk и как сравнить варианты в цифрах.",
    },
    keywords: {
      en: "cryogenic cylinder vs tank, microbulk",
      uk: "кріоциліндр чи ємність, microbulk, азот балони",
      ru: "криоцилиндр или емкость, microbulk, азот баллоны",
    },
  },
};

/* ─── Стаття 3: випарник CO₂ для теплиці ───────────────────────────────── */

const postGreenhouseVaporizer: SeedPost = {
  _id: "post-greenhouse-co2-vaporizer",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Ambient or electric CO₂ vaporizer: what to choose for a greenhouse",
    uk: "Атмосферний чи електричний випарник CO₂: що обрати для теплиці",
    ru: "Атмосферный или электрический испаритель CO₂: что выбрать для теплицы",
  },
  slug: slugs(
    "ambient-or-electric-co2-vaporizer-greenhouse",
    "atmosfernyi-chy-elektrychnyi-vyparnyk-co2-dlya-teplytsi",
    "atmosfernyi-ili-elektricheskiy-isparitel-co2-dlya-teplitsy",
  ),
  isPublished: true,
  isFeatured: true,
  publishedAt: "2026-09-07T11:00:00Z",
  updatedAt: "2026-09-07T11:00:00Z",
  readingTimeMinutes: 3,
  author: seedAuthor,
  categories: [catSelection],
  tags: ["CO2", "теплиці", "випарники"],
  coverImage: img(PHOTO.greenhouse, {
    en: "CO₂ vaporizer with fans installed inside a greenhouse for carbon dioxide enrichment",
    uk: "Випарник CO₂ з вентиляторами, встановлений у теплиці для вуглекислотного підживлення",
    ru: "Испаритель CO₂ с вентиляторами, установленный в теплице для углекислотной подкормки",
  }),
  excerpt: {
    en: "CO₂ enrichment raises yield only if the gas arrives steadily and at the right temperature. The vaporizer decides both, and in a Ukrainian winter the choice is not obvious.",
    uk: "CO₂-підживлення піднімає врожайність лише тоді, коли газ надходить стабільно і з потрібною температурою. Це вирішує випарник, і в українську зиму вибір не такий очевидний.",
    ru: "CO₂-подкормка поднимает урожайность только тогда, когда газ поступает стабильно и с нужной температурой. Это решает испаритель, и в украинскую зиму выбор не так очевиден.",
  },
  body: body(
    {
      en: [
        ["p", "Liquid CO₂ is stored at about −20 °C under pressure. If you simply release the pressure without adding heat, part of the product turns into dry ice and blocks the pipeline. That is why a CO₂ vaporizer is not a length of pipe but a device with controlled heat input and temperature control at the outlet."],
        ["h2", "Ambient air vaporizer"],
        ["p", "It takes heat from the surrounding air through finned aluminium tubes and needs neither electricity nor steam. For nitrogen, oxygen and argon this is the standard solution. For CO₂ in Ukraine it works only within limits: in cold weather and at high take-off the air simply does not carry enough heat, the unit ices up, and the outlet temperature drops below what the dosing system tolerates."],
        ["p", "For a greenhouse there is one favourable factor: the peak of CO₂ demand falls on daylight hours, when the air is warmest. But winter enrichment, which is exactly when it matters most for yield, remains the weak point."],
        ["h2", "Electric or water-heated"],
        ["li", "Stable outlet temperature all year round, independent of weather."],
        ["li", "Controlled automatically to a setpoint, which the dosing computer needs."],
        ["li", "Requires power. As an order of magnitude: the latent heat of CO₂ is around 275 kJ/kg, plus heating the gas to ambient, so roughly 30 kW is needed for 300 kg/h."],
        ["li", "The water or steam version pays off when the site already has a hot water circuit — the running cost then drops to the pump."],
        ["h2", "How to size the capacity for a greenhouse"],
        ["p", "As a rough guide, a closed greenhouse consumes about 30–60 kg of CO₂ per hectare per hour at peak, depending on ventilation and the target concentration, which is usually kept at 700–1000 ppm against roughly 420 ppm in outside air. For five hectares that means 150–300 kg/h, so a 300 kg/h vaporizer with a margin is the sensible pick."],
        ["p", "Open vents change the picture completely: as soon as ventilation starts, consumption rises sharply while the effect drops. This is worth agreeing with the agronomist before choosing the equipment, not after."],
        ["h2", "A practical compromise"],
        ["p", "On many sites the workable answer is an ambient vaporizer as the base plus an electric one for peak and winter operation. The base runs for free most of the year, and the electric unit switches in when the air stops coping."],
        ["h2", "What else the system needs besides the vaporizer"],
        ["li", "A dosing unit with a control valve that the climate computer can command."],
        ["li", "CO₂ sensors in the growing zone, not only near the unit — concentration varies strongly across a greenhouse."],
        ["li", "Distribution hoses along the rows; without them the gas stays where it entered."],
        ["li", "A pressure-reducing station matched to the dosing pressure, usually far below the tank pressure."],
        ["h2", "The classic mistake"],
        ["p", "The vaporizer is sized by average daily consumption instead of the peak hour. On paper the numbers add up, in practice the concentration sags exactly at midday, when light is at its maximum and the plant would use the CO₂ best. Size for the peak hour with a margin of twenty to thirty percent; the extra capacity costs far less than a season of underfeeding."],
        ["p", "Send us the greenhouse area, crop, ventilation type and target concentration — we will calculate the capacity and show both variants with running costs."],
      ],
      uk: [
        ["p", "Рідкий CO₂ зберігається за температури близько −20 °C під тиском. Якщо просто скинути тиск без підведення тепла, частина продукту перетворюється на сухий лід і забиває трубопровід. Саме тому випарник CO₂ — це не відрізок труби, а апарат із керованим підведенням тепла та контролем температури на виході."],
        ["h2", "Атмосферний випарник"],
        ["p", "Він забирає тепло з навколишнього повітря через оребрені алюмінієві труби й не потребує ані електрики, ані пари. Для азоту, кисню та аргону це стандартне рішення. Для CO₂ в українських умовах він працює лише в межах: у холодну погоду й за великого відбору повітря просто не віддає стільки тепла, апарат обмерзає, а температура на виході падає нижче за прийнятну для системи дозування."],
        ["p", "Для теплиці є одна сприятлива обставина: пік потреби в CO₂ припадає на світлову добу, коли повітря найтепліше. Але зимове підживлення, тобто саме той період, коли воно найбільше впливає на врожайність, лишається слабким місцем."],
        ["h2", "Електричний або водяний"],
        ["li", "Стабільна температура на виході цілий рік, незалежно від погоди."],
        ["li", "Керується автоматикою за уставкою, а це те, що потрібно кліматичному компʼютеру."],
        ["li", "Потребує електрики. Як порядок величини: теплота випаровування CO₂ — близько 275 кДж/кг, плюс нагрів газу до температури повітря, тож на 300 кг/год потрібно орієнтовно 30 кВт."],
        ["li", "Водяний або паровий варіант окупається, коли на майданчику вже є контур гарячої води — тоді експлуатаційні витрати зводяться до насоса."],
        ["h2", "Як розрахувати продуктивність для теплиці"],
        ["p", "Орієнтовно закрита теплиця споживає близько 30–60 кг CO₂ на гектар за годину в піковий період, залежно від вентиляції та цільової концентрації, яку зазвичай тримають на рівні 700–1000 ppm проти приблизно 420 ppm у зовнішньому повітрі. Для пʼяти гектарів це 150–300 кг/год, тобто розумний вибір — випарник на 300 кг/год із запасом."],
        ["p", "Відкриті кватирки змінюють картину повністю: щойно починається провітрювання, споживання різко зростає, а ефект падає. Це варто узгодити з агрономом до вибору обладнання, а не після."],
        ["h2", "Практичний компроміс"],
        ["p", "На багатьох обʼєктах робоча відповідь — атмосферний випарник як базовий плюс електричний для піків і зими. Базовий більшу частину року працює безкоштовно, а електричний вмикається тоді, коли повітря перестає справлятись."],
        ["h2", "Що ще потрібно системі, крім випарника"],
        ["li", "Вузол дозування з регулювальним клапаном, яким може керувати кліматичний компʼютер."],
        ["li", "Датчики CO₂ у зоні вирощування, а не лише біля апарата — концентрація по теплиці відчутно різниться."],
        ["li", "Розподільчі рукави вздовж рядів; без них газ лишається там, куди зайшов."],
        ["li", "Редукційна станція під тиск дозування, який зазвичай значно нижчий за тиск в ємності."],
        ["h2", "Класична помилка"],
        ["p", "Випарник підбирають за середньодобовим споживанням замість пікової години. На папері цифри сходяться, на практиці концентрація просідає саме опівдні, коли світла найбільше і рослина використала б CO₂ найкраще. Рахуйте за піковою годиною із запасом двадцять-тридцять відсотків: додаткова продуктивність коштує значно менше, ніж сезон недогодовування."],
        ["p", "Надішліть площу теплиці, культуру, тип вентиляції та цільову концентрацію — розрахуємо продуктивність і покажемо обидва варіанти з експлуатаційними витратами."],
      ],
      ru: [
        ["p", "Жидкий CO₂ хранится при температуре около −20 °C под давлением. Если просто сбросить давление без подвода тепла, часть продукта превращается в сухой лёд и забивает трубопровод. Именно поэтому испаритель CO₂ — это не отрезок трубы, а аппарат с управляемым подводом тепла и контролем температуры на выходе."],
        ["h2", "Атмосферный испаритель"],
        ["p", "Он забирает тепло из окружающего воздуха через оребрённые алюминиевые трубы и не требует ни электричества, ни пара. Для азота, кислорода и аргона это стандартное решение. Для CO₂ в украинских условиях он работает лишь в пределах: в холодную погоду и при большом отборе воздух просто не отдаёт столько тепла, аппарат обмерзает, а температура на выходе падает ниже приемлемой для системы дозирования."],
        ["p", "Для теплицы есть одно благоприятное обстоятельство: пик потребности в CO₂ приходится на светлое время суток, когда воздух теплее всего. Но зимняя подкормка, то есть именно тот период, когда она сильнее всего влияет на урожайность, остаётся слабым местом."],
        ["h2", "Электрический или водяной"],
        ["li", "Стабильная температура на выходе круглый год, независимо от погоды."],
        ["li", "Управляется автоматикой по уставке, а это то, что нужно климатическому компьютеру."],
        ["li", "Требует электричества. Как порядок величины: теплота испарения CO₂ — около 275 кДж/кг, плюс нагрев газа до температуры воздуха, поэтому на 300 кг/ч нужно ориентировочно 30 кВт."],
        ["li", "Водяной или паровой вариант окупается, когда на площадке уже есть контур горячей воды — тогда эксплуатационные расходы сводятся к насосу."],
        ["h2", "Как рассчитать производительность для теплицы"],
        ["p", "Ориентировочно закрытая теплица потребляет около 30–60 кг CO₂ на гектар в час в пиковый период, в зависимости от вентиляции и целевой концентрации, которую обычно держат на уровне 700–1000 ppm против примерно 420 ppm в наружном воздухе. Для пяти гектаров это 150–300 кг/ч, то есть разумный выбор — испаритель на 300 кг/ч с запасом."],
        ["p", "Открытые форточки меняют картину полностью: как только начинается проветривание, потребление резко растёт, а эффект падает. Это стоит согласовать с агрономом до выбора оборудования, а не после."],
        ["h2", "Практический компромисс"],
        ["p", "На многих объектах рабочий ответ — атмосферный испаритель как базовый плюс электрический для пиков и зимы. Базовый большую часть года работает бесплатно, а электрический включается тогда, когда воздух перестаёт справляться."],
        ["h2", "Что ещё нужно системе, кроме испарителя"],
        ["li", "Узел дозирования с регулирующим клапаном, которым может управлять климатический компьютер."],
        ["li", "Датчики CO₂ в зоне выращивания, а не только у аппарата — концентрация по теплице заметно различается."],
        ["li", "Распределительные рукава вдоль рядов; без них газ остаётся там, куда вошёл."],
        ["li", "Редукционная станция под давление дозирования, которое обычно значительно ниже давления в ёмкости."],
        ["h2", "Классическая ошибка"],
        ["p", "Испаритель подбирают по среднесуточному потреблению вместо пикового часа. На бумаге цифры сходятся, на практике концентрация проседает именно в полдень, когда света больше всего и растение использовало бы CO₂ лучше всего. Считайте по пиковому часу с запасом двадцать-тридцать процентов: дополнительная производительность стоит значительно меньше, чем сезон недокорма."],
        ["p", "Пришлите площадь теплицы, культуру, тип вентиляции и целевую концентрацию — рассчитаем производительность и покажем оба варианта с эксплуатационными расходами."],
      ],
    },
    "b3",
  ),
  faq: [
    faq(
      "faq-gh-1",
      {
        en: "Why does the ambient vaporizer ice up and what to do about it?",
        uk: "Чому атмосферний випарник обмерзає і що з цим робити?",
        ru: "Почему атмосферный испаритель обмерзает и что с этим делать?",
      },
      {
        en: "Frost is normal: moisture from the air freezes on the cold fins. Once the ice layer thickens, heat transfer drops and the outlet gas becomes too cold. The standard answer is two vaporizers working in turn so each has time to defrost, or a unit sized with a margin.",
        uk: "Іній — це норма: волога з повітря замерзає на холодних ребрах. Коли шар льоду товщає, теплообмін падає, а газ на виході стає надто холодним. Стандартна відповідь — два випарники, що працюють по черзі, щоб кожен встигав відтанути, або апарат із запасом продуктивності.",
        ru: "Иней — это норма: влага из воздуха замерзает на холодных рёбрах. Когда слой льда утолщается, теплообмен падает, а газ на выходе становится слишком холодным. Стандартный ответ — два испарителя, работающих по очереди, чтобы каждый успевал оттаять, или аппарат с запасом производительности.",
      },
    ),
    faq(
      "faq-gh-2",
      {
        en: "Can flue gas from a boiler be used instead of pure CO₂?",
        uk: "Чи можна використати димові гази котла замість чистого CO₂?",
        ru: "Можно ли использовать дымовые газы котла вместо чистого CO₂?",
      },
      {
        en: "Technically yes, and it is common in Europe, but it requires cleaning and continuous monitoring of nitrogen oxides, carbon monoxide and ethylene — plants are sensitive to all three. Liquid CO₂ is simpler and predictable, which is why most Ukrainian greenhouses use it.",
        uk: "Технічно так, і в Європі це поширено, але потребує очищення й безперервного контролю оксидів азоту, чадного газу та етилену — рослини чутливі до всіх трьох. Рідкий CO₂ простіший і передбачуваний, тому більшість українських теплиць працює саме на ньому.",
        ru: "Технически да, и в Европе это распространено, но требует очистки и непрерывного контроля оксидов азота, угарного газа и этилена — растения чувствительны ко всем трём. Жидкий CO₂ проще и предсказуем, поэтому большинство украинских теплиц работает именно на нём.",
      },
    ),
  ],
  relatedProducts: [
    seedProduct("product-co2-vaporizer-300"),
    seedProduct("product-co2-vaporizer-500"),
    seedProduct("product-tank-co2-30"),
  ],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "CO₂ vaporizer for a greenhouse: ambient or electric",
      uk: "Випарник CO₂ для теплиці: атмосферний чи електричний",
      ru: "Испаритель CO₂ для теплицы: атмосферный или электрический",
    },
    metaDescription: {
      en: "Why CO₂ needs heat to vaporize, how much power an electric unit draws, and how to size capacity from greenhouse area and target concentration.",
      uk: "Чому CO₂ потребує тепла для випаровування, скільки електрики бере електричний апарат і як розрахувати продуктивність за площею теплиці та цільовою концентрацією.",
      ru: "Почему CO₂ нужно тепло для испарения, сколько электричества берёт электрический аппарат и как рассчитать производительность по площади теплицы и целевой концентрации.",
    },
    keywords: {
      en: "CO2 vaporizer greenhouse, CO2 enrichment",
      uk: "випарник CO2 теплиця, CO2 підживлення теплиць",
      ru: "испаритель CO2 теплица, CO2 подкормка теплиц",
    },
  },
};

/* ─── Стаття 4: фундамент і майданчик ──────────────────────────────────── */

const postFoundation: SeedPost = {
  _id: "post-tank-foundation-checklist",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Foundation and site for a cryogenic tank: a checklist before installation",
    uk: "Фундамент і майданчик під кріогенну ємність: чекліст перед монтажем",
    ru: "Фундамент и площадка под криогенную ёмкость: чек-лист перед монтажом",
  },
  slug: slugs(
    "cryogenic-tank-foundation-checklist",
    "fundament-i-maydanchyk-pid-kriogennu-yemnist",
    "fundament-i-ploshchadka-pod-kriogennuyu-emkost",
  ),
  isPublished: true,
  isFeatured: false,
  publishedAt: "2026-09-07T12:00:00Z",
  updatedAt: "2026-09-07T12:00:00Z",
  readingTimeMinutes: 3,
  author: seedAuthor,
  categories: [catInstallation],
  tags: ["монтаж", "фундамент", "кріогенні ємності"],
  coverImage: img(PHOTO.crane, {
    en: "Cryogenic tank delivered on a low-loader and lifted by cranes during installation",
    uk: "Кріогенна ємність, доставлена тралом і піднята кранами під час монтажу",
    ru: "Криогенная ёмкость, доставленная тралом и поднятая кранами во время монтажа",
  }),
  excerpt: {
    en: "The most common reason installation slips is not the equipment but the site. Here is what to prepare so the crew works instead of waiting.",
    uk: "Найчастіша причина зриву строків монтажу — не обладнання, а неготовий майданчик. Ось що підготувати, щоб бригада працювала, а не чекала.",
    ru: "Самая частая причина срыва сроков монтажа — не оборудование, а неготовая площадка. Вот что подготовить, чтобы бригада работала, а не ждала.",
  },
  body: body(
    {
      en: [
        ["p", "Equipment usually arrives on time. What holds a project up is concrete that has not cured, a gate a low-loader cannot pass, or a missing power supply. Everything below can be prepared in parallel with manufacturing, so installation starts the day the tank arrives."],
        ["h2", "Foundation"],
        ["li", "A reinforced concrete slab designed for the weight of the filled tank. For a 30 m³ CO₂ vessel that is roughly forty tonnes together with the product."],
        ["li", "The loads and the support layout come from the supplier with the quotation. Do not pour concrete before you have that drawing — the anchor spacing is not universal."],
        ["li", "Concrete needs time to reach strength. Plan three to four weeks between pouring and installation."],
        ["h2", "Access and space"],
        ["li", "A tanker must reach the filling point within hose distance, normally fifteen to twenty metres, and be able to turn around."],
        ["li", "The area is fenced, with safety distances to buildings, windows and sources of ignition defined by the project and applicable rules."],
        ["li", "Space for the vaporizer next to the tank. Remember that it ices up and drips during defrosting, so no walkway underneath."],
        ["h2", "Utilities"],
        ["li", "Power, if the vaporizer is electric, and for automation and lighting."],
        ["li", "Earthing."],
        ["li", "The pipeline route to the consumer. The shorter and simpler it is, the lower the pressure drop and heat gain."],
        ["h2", "Documents"],
        ["p", "Pressure vessels are subject to registration, and installation is carried out by an organisation holding the corresponding permit. Agree in advance who prepares the paperwork — you or the contractor. This is worth settling at the contract stage, because collecting documents afterwards takes longer than the installation itself."],
        ["h2", "Checklist before the crew arrives"],
        ["li", "Foundation poured, cured, dimensions and anchors match the drawing."],
        ["li", "Access road clear, gate width and turning radius checked against the low-loader."],
        ["li", "Crane access and a hard standing for outriggers."],
        ["li", "Power supply brought to the site, earthing loop ready."],
        ["li", "Pipeline route agreed, penetrations through walls made."],
        ["li", "Responsible person on site who can sign for the work."],
        ["h2", "How long preparation takes"],
        ["li", "Layout and load drawing from the supplier — issued with the quotation."],
        ["li", "Design and approvals — from two weeks, depending on the site and who does it."],
        ["li", "Foundation: excavation, reinforcement, pouring — about a week of work."],
        ["li", "Concrete curing — three to four weeks, and this is the part that cannot be compressed."],
        ["li", "Installation and piping — one to two weeks. Commissioning — a few days."],
        ["h2", "Who is responsible for what"],
        ["p", "The usual split: the customer prepares the foundation, access, power and the room for the pipeline route; the contractor supplies the equipment, installs it, does the piping, pressure-tests and commissions. Problems start where the boundary is not written down — most often the power supply to the vaporizer and the wall penetrations. Fix both in the contract."],
        ["p", "We supply the load diagram and layout together with the commercial proposal, so preparation can start before the contract is signed."],
      ],
      uk: [
        ["p", "Обладнання зазвичай приходить вчасно. Проєкт затримує бетон, який не набрав міцності, ворота, крізь які не проходить трал, або відсутнє живлення. Усе, що нижче, можна готувати паралельно з виготовленням, щоб монтаж почався того ж дня, коли приїде ємність."],
        ["h2", "Фундамент"],
        ["li", "Залізобетонна плита, розрахована на масу заповненої ємності. Для посудини на 30 м³ під CO₂ це приблизно сорок тонн разом із продуктом."],
        ["li", "Навантаження та схему опор дає постачальник разом із комерційною пропозицією. Не бетонуйте, доки не маєте цього креслення — розташування анкерів не універсальне."],
        ["li", "Бетону потрібен час, щоб набрати міцність. Закладайте три-чотири тижні між заливкою та монтажем."],
        ["h2", "Підʼїзд і місце"],
        ["li", "Автоцистерна має під'їхати до точки наповнення на відстань шланга, зазвичай пʼятнадцять-двадцять метрів, і мати де розвернутись."],
        ["li", "Майданчик огороджений, із безпечними відстанями до будівель, вікон і джерел займання, які визначає проєкт і чинні норми."],
        ["li", "Місце під випарник поруч із ємністю. Памʼятайте, що він обмерзає і під час відтавання з нього тече, тож проходу під ним бути не повинно."],
        ["h2", "Комунікації"],
        ["li", "Електрика, якщо випарник електричний, а також для автоматики й освітлення."],
        ["li", "Заземлення."],
        ["li", "Траса трубопроводу до споживача. Чим вона коротша й простіша, тим менші втрати тиску й притік тепла."],
        ["h2", "Документи"],
        ["p", "Посудини під тиском підлягають реєстрації, а монтаж виконує організація з відповідним дозволом. Заздалегідь узгодьте, хто оформлює документи — ви чи підрядник. Це варто закрити ще на етапі договору, бо збирати папери потім довше, ніж виконати сам монтаж."],
        ["h2", "Чекліст перед приїздом бригади"],
        ["li", "Фундамент залитий, набрав міцність, розміри й анкери збігаються з кресленням."],
        ["li", "Підʼїзд вільний, ширину воріт і радіус розвороту перевірено під трал."],
        ["li", "Є місце для крана й тверда основа під виносні опори."],
        ["li", "Живлення підведено, контур заземлення готовий."],
        ["li", "Трасу трубопроводу узгоджено, отвори крізь стіни зроблено."],
        ["li", "На обʼєкті є відповідальна особа, яка може підписати роботи."],
        ["h2", "Скільки часу займає підготовка"],
        ["li", "План розміщення й схема навантажень від постачальника — видаються разом із пропозицією."],
        ["li", "Проєктування та погодження — від двох тижнів, залежно від обʼєкта й того, хто це робить."],
        ["li", "Фундамент: земляні роботи, армування, заливка — близько тижня робіт."],
        ["li", "Набір міцності бетону — три-чотири тижні, і саме це стиснути не вийде."],
        ["li", "Монтаж та обвʼязка — один-два тижні. Пусконалагодження — кілька днів."],
        ["h2", "Хто за що відповідає"],
        ["p", "Звичний поділ: замовник готує фундамент, підʼїзд, живлення й місце під трасу трубопроводу; підрядник постачає обладнання, монтує, робить обвʼязку, випробовує та запускає. Проблеми починаються там, де межу не прописали — найчастіше це живлення випарника й отвори крізь стіни. Закрийте обидва пункти в договорі."],
        ["p", "Схему навантажень і план розміщення ми надаємо разом із комерційною пропозицією, щоб підготовку можна було почати ще до підписання договору."],
      ],
      ru: [
        ["p", "Оборудование обычно приходит вовремя. Проект задерживает бетон, который не набрал прочность, ворота, через которые не проходит трал, или отсутствующее питание. Всё, что ниже, можно готовить параллельно с изготовлением, чтобы монтаж начался в тот же день, когда приедет ёмкость."],
        ["h2", "Фундамент"],
        ["li", "Железобетонная плита, рассчитанная на массу заполненной ёмкости. Для сосуда на 30 м³ под CO₂ это примерно сорок тонн вместе с продуктом."],
        ["li", "Нагрузки и схему опор даёт поставщик вместе с коммерческим предложением. Не бетонируйте, пока не получили этот чертёж — расположение анкеров не универсально."],
        ["li", "Бетону нужно время, чтобы набрать прочность. Закладывайте три-четыре недели между заливкой и монтажом."],
        ["h2", "Подъезд и место"],
        ["li", "Автоцистерна должна подъехать к точке наполнения на расстояние шланга, обычно пятнадцать-двадцать метров, и иметь где развернуться."],
        ["li", "Площадка ограждена, с безопасными расстояниями до зданий, окон и источников возгорания, которые определяет проект и действующие нормы."],
        ["li", "Место под испаритель рядом с ёмкостью. Помните, что он обмерзает и при оттаивании с него течёт, поэтому прохода под ним быть не должно."],
        ["h2", "Коммуникации"],
        ["li", "Электричество, если испаритель электрический, а также для автоматики и освещения."],
        ["li", "Заземление."],
        ["li", "Трасса трубопровода до потребителя. Чем она короче и проще, тем меньше потери давления и приток тепла."],
        ["h2", "Документы"],
        ["p", "Сосуды под давлением подлежат регистрации, а монтаж выполняет организация с соответствующим разрешением. Заранее согласуйте, кто оформляет документы — вы или подрядчик. Это стоит закрыть ещё на этапе договора, потому что собирать бумаги потом дольше, чем выполнить сам монтаж."],
        ["h2", "Чек-лист перед приездом бригады"],
        ["li", "Фундамент залит, набрал прочность, размеры и анкеры совпадают с чертежом."],
        ["li", "Подъезд свободен, ширина ворот и радиус разворота проверены под трал."],
        ["li", "Есть место для крана и твёрдое основание под выносные опоры."],
        ["li", "Питание подведено, контур заземления готов."],
        ["li", "Трасса трубопровода согласована, отверстия через стены сделаны."],
        ["li", "На объекте есть ответственное лицо, которое может подписать работы."],
        ["h2", "Сколько времени занимает подготовка"],
        ["li", "План размещения и схема нагрузок от поставщика — выдаются вместе с предложением."],
        ["li", "Проектирование и согласования — от двух недель, в зависимости от объекта и того, кто это делает."],
        ["li", "Фундамент: земляные работы, армирование, заливка — около недели работ."],
        ["li", "Набор прочности бетона — три-четыре недели, и именно это сжать не получится."],
        ["li", "Монтаж и обвязка — одна-две недели. Пусконаладка — несколько дней."],
        ["h2", "Кто за что отвечает"],
        ["p", "Обычное разделение: заказчик готовит фундамент, подъезд, питание и место под трассу трубопровода; подрядчик поставляет оборудование, монтирует, делает обвязку, испытывает и запускает. Проблемы начинаются там, где границу не прописали — чаще всего это питание испарителя и отверстия через стены. Закройте оба пункта в договоре."],
        ["p", "Схему нагрузок и план размещения мы предоставляем вместе с коммерческим предложением, чтобы подготовку можно было начать ещё до подписания договора."],
      ],
    },
    "b4",
  ),
  faq: [
    faq(
      "faq-found-1",
      {
        en: "How long does installation take?",
        uk: "Скільки триває монтаж?",
        ru: "Сколько длится монтаж?",
      },
      {
        en: "For one tank with a vaporizer and piping to a single consumer, typically one to two weeks on site once the foundation is ready, plus commissioning. Multi-tank systems and long pipelines are scheduled individually.",
        uk: "Для однієї ємності з випарником та обвʼязкою до одного споживача — зазвичай один-два тижні на майданчику після готовності фундаменту, плюс пусконалагодження. Системи з кількома ємностями й довгими трубопроводами плануються окремо.",
        ru: "Для одной ёмкости с испарителем и обвязкой до одного потребителя — обычно одна-две недели на площадке после готовности фундамента, плюс пусконаладка. Системы с несколькими ёмкостями и длинными трубопроводами планируются отдельно.",
      },
    ),
    faq(
      "faq-found-2",
      {
        en: "Can a tank be placed indoors?",
        uk: "Чи можна встановити ємність у приміщенні?",
        ru: "Можно ли установить ёмкость в помещении?",
      },
      {
        en: "As a rule, no. Cryogenic vessels vent gas through the safety valve, and in an enclosed space that displaces oxygen. Indoor placement requires a separate project with forced ventilation and oxygen monitoring; the usual solution is an outdoor pad with a canopy.",
        uk: "Як правило, ні. Кріогенні посудини стравлюють газ через запобіжний клапан, а в замкнутому просторі це витісняє кисень. Розміщення всередині потребує окремого проєкту з примусовою вентиляцією та контролем кисню; звичне рішення — відкритий майданчик із навісом.",
        ru: "Как правило, нет. Криогенные сосуды стравливают газ через предохранительный клапан, а в замкнутом пространстве это вытесняет кислород. Размещение внутри требует отдельного проекта с принудительной вентиляцией и контролем кислорода; обычное решение — открытая площадка с навесом.",
      },
    ),
  ],
  relatedProducts: [
    seedProduct("product-installation-turnkey"),
    seedProduct("product-tank-co2-30"),
  ],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "Foundation and site for a cryogenic tank — installation checklist",
      uk: "Фундамент і майданчик під кріогенну ємність — чекліст монтажу",
      ru: "Фундамент и площадка под криогенную ёмкость — чек-лист монтажа",
    },
    metaDescription: {
      en: "Foundation loads, tanker access, safety distances, utilities and permits: what to prepare so installation of a cryogenic tank is not delayed.",
      uk: "Навантаження на фундамент, підʼїзд автоцистерни, безпечні відстані, комунікації та дозволи: що підготувати, щоб монтаж кріогенної ємності не затримався.",
      ru: "Нагрузки на фундамент, подъезд автоцистерны, безопасные расстояния, коммуникации и разрешения: что подготовить, чтобы монтаж криогенной ёмкости не задержался.",
    },
    keywords: {
      en: "cryogenic tank foundation, tank installation requirements",
      uk: "фундамент під кріогенну ємність, майданчик під ємність",
      ru: "фундамент под криогенную емкость, площадка под емкость",
    },
  },
};

/* ─── Стаття 5: ISBT / EIGA ────────────────────────────────────────────── */

const postIsbt: SeedPost = {
  _id: "post-isbt-eiga-co2-quality",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "ISBT and EIGA requirements for beverage-grade CO₂",
    uk: "Вимоги ISBT та EIGA до якості CO₂ для напоїв",
    ru: "Требования ISBT и EIGA к качеству CO₂ для напитков",
  },
  slug: slugs(
    "isbt-eiga-co2-quality-requirements",
    "vymogy-isbt-ta-eiga-do-yakosti-co2",
    "trebovaniya-isbt-i-eiga-k-kachestvu-co2",
  ),
  isPublished: true,
  isFeatured: false,
  publishedAt: "2026-09-07T13:00:00Z",
  updatedAt: "2026-09-07T13:00:00Z",
  readingTimeMinutes: 3,
  author: seedAuthor,
  categories: [catQuality],
  tags: ["CO2", "ISBT", "EIGA", "контроль якості"],
  coverImage: img(PHOTO.lab, {
    en: "Container laboratory for CO₂ quality control with analysers and a sampling panel",
    uk: "Контейнерна лабораторія контролю якості CO₂ з аналізаторами та панеллю відбору проб",
    ru: "Контейнерная лаборатория контроля качества CO₂ с анализаторами и панелью отбора проб",
  }),
  excerpt: {
    en: "For a bottler, CO₂ is a food ingredient rather than a technical gas. Which parameters are limited, why a supplier certificate is not enough, and what a minimum laboratory looks like.",
    uk: "Для розливника CO₂ — це харчовий інгредієнт, а не технічний газ. Які параметри обмежують, чому сертифіката постачальника недостатньо і який мінімальний склад лабораторії.",
    ru: "Для розливщика CO₂ — это пищевой ингредиент, а не технический газ. Какие параметры ограничивают, почему сертификата поставщика недостаточно и каков минимальный состав лаборатории.",
  },
  body: body(
    {
      en: [
        ["p", "Carbon dioxide that goes into a drink is a food ingredient. It is judged not only by purity but by a list of trace impurities, some of which are limited at parts-per-billion level because they are detectable by taste and smell long before they are dangerous."],
        ["h2", "Who sets the requirements"],
        ["li", "ISBT, the International Society of Beverage Technologists, whose specification is the de facto industry standard for beverage CO₂."],
        ["li", "EIGA, the European Industrial Gases Association, whose document is aligned with ISBT and is what European suppliers refer to."],
        ["li", "In Ukraine, the relevant DSTU standards and food safety requirements under HACCP apply on top of that."],
        ["h2", "What is actually controlled"],
        ["p", "The typical set of limits looks roughly like this. Exact values should always be taken from the current revision of the specification, since it is periodically updated."],
        ["li", "CO₂ purity — not less than 99.9% by volume."],
        ["li", "Moisture — up to about 20 ppm."],
        ["li", "Oxygen — up to about 30 ppm."],
        ["li", "Carbon monoxide — up to about 10 ppm."],
        ["li", "Total hydrocarbons — up to about 50 ppm calculated as methane, with a tighter limit on non-methane compounds."],
        ["li", "Benzene — at the level of tens of parts per billion."],
        ["li", "Sulphur compounds — around 100 ppb in total; these are what give the classic off-smell."],
        ["li", "Acetaldehyde, ammonia and nitrogen oxides — units of ppm and below."],
        ["h2", "Why this matters even if you do not produce CO₂"],
        ["p", "Responsibility for the finished drink lies with the bottler. A supplier certificate confirms the quality of a particular batch at the moment of shipment; it says nothing about what happened during transport, or whether the product was loaded into a tank that previously held a technical grade. That is why incoming inspection is a separate control point in a HACCP plan, not a formality."],
        ["h2", "A minimum laboratory"],
        ["li", "CO₂ purity analyser."],
        ["li", "Moisture or dew point analyser."],
        ["li", "Oxygen analyser."],
        ["li", "A sampling system for both the liquid and the gas phase — sampling from the wrong phase is the most common source of false results."],
        ["li", "Calibration gases and consumables, with a schedule for verification."],
        ["p", "A full set covering every ISBT parameter is expensive, and not every plant needs one. A common approach is to keep continuous monitoring of the critical few parameters on site and send samples to an external laboratory for the full profile at an agreed frequency."],
        ["h2", "How often to test"],
        ["p", "The practical scheme is layered. The critical parameters — purity, moisture, oxygen — are checked on every incoming delivery, because that is where contamination enters. The full profile, including benzene and sulphur compounds, is ordered from an external laboratory at an agreed interval, typically quarterly, and additionally whenever the supplier or the source of the gas changes."],
        ["h2", "What to do with an out-of-spec batch"],
        ["li", "Do not connect the tanker to the tank until the incoming result is in — a rejected batch mixed into the tank contaminates the whole vessel."],
        ["li", "Record the result, notify the supplier, keep the sample."],
        ["li", "If the product is already in the tank: stop take-off, decide with the supplier on emptying and cleaning, and check the finished goods produced since the last clean result."],
        ["p", "This is exactly the scenario an auditor asks about, and having a written procedure for it matters more than the number of analysers on the bench."],
        ["p", "We help define the mandatory set for a specific process, supply the analysers and sampling systems, and audit an existing laboratory against ISBT and EIGA requirements."],
      ],
      uk: [
        ["p", "Діоксид вуглецю, який потрапляє в напій, — це харчовий інгредієнт. Його оцінюють не лише за чистотою, а за переліком слідових домішок, частину з яких обмежують на рівні мільярдних часток, бо вони помітні на смак і запах задовго до того, як стають небезпечними."],
        ["h2", "Хто встановлює вимоги"],
        ["li", "ISBT, Міжнародне товариство технологів напоїв, чия специфікація де-факто є галузевим стандартом для харчового CO₂."],
        ["li", "EIGA, Європейська асоціація виробників промислових газів, документ якої узгоджений з ISBT і на який посилаються європейські постачальники."],
        ["li", "В Україні понад це діють відповідні ДСТУ та вимоги харчової безпеки в межах HACCP."],
        ["h2", "Що саме контролюють"],
        ["p", "Типовий набір меж виглядає приблизно так. Точні значення завжди беріть із чинної редакції специфікації, оскільки її періодично оновлюють."],
        ["li", "Чистота CO₂ — не менше 99,9% обʼємних."],
        ["li", "Волога — приблизно до 20 ppm."],
        ["li", "Кисень — приблизно до 30 ppm."],
        ["li", "Оксид вуглецю — приблизно до 10 ppm."],
        ["li", "Загальні вуглеводні — приблизно до 50 ppm у перерахунку на метан, із жорсткішою межею для неметанових сполук."],
        ["li", "Бензол — на рівні десятків мільярдних часток."],
        ["li", "Сірчисті сполуки — сумарно близько 100 ppb; саме вони дають класичний сторонній запах."],
        ["li", "Ацетальдегід, аміак та оксиди азоту — одиниці ppm і нижче."],
        ["h2", "Чому це важливо, навіть якщо ви не виробляєте CO₂"],
        ["p", "Відповідальність за готовий напій лежить на розливнику. Сертифікат постачальника підтверджує якість конкретної партії на момент відвантаження; він нічого не каже про те, що сталося під час перевезення, і чи не залили продукт у цистерну, де до того був технічний газ. Саме тому вхідний контроль — це окрема контрольна точка в плані HACCP, а не формальність."],
        ["h2", "Мінімальний склад лабораторії"],
        ["li", "Аналізатор чистоти CO₂."],
        ["li", "Аналізатор вологи або точки роси."],
        ["li", "Аналізатор кисню."],
        ["li", "Система відбору проб з рідкої та газової фази — відбір не з тієї фази є найпоширенішим джерелом хибних результатів."],
        ["li", "Калібрувальні гази й витратні матеріали з графіком повірки."],
        ["p", "Повний комплект під усі параметри ISBT коштує дорого, і не кожному підприємству він потрібен. Поширений підхід — тримати на місці безперервний контроль кількох критичних параметрів, а повний профіль замовляти в зовнішній лабораторії з узгодженою періодичністю."],
        ["h2", "Як часто перевіряти"],
        ["p", "Практична схема — багаторівнева. Критичні параметри — чистоту, вологу, кисень — перевіряють на кожній вхідній поставці, бо саме там заходить забруднення. Повний профіль, включно з бензолом і сірчистими сполуками, замовляють у зовнішній лабораторії з узгодженою періодичністю, зазвичай раз на квартал, і додатково щоразу, коли змінюється постачальник або джерело газу."],
        ["h2", "Що робити з партією поза специфікацією"],
        ["li", "Не підключайте автоцистерну до ємності, доки немає результату вхідного контролю — забракована партія, змішана з вмістом, забруднює всю посудину."],
        ["li", "Зафіксуйте результат, повідомте постачальника, збережіть пробу."],
        ["li", "Якщо продукт уже в ємності: зупиніть відбір, узгодьте з постачальником спорожнення й очищення, перевірте готову продукцію, випущену від останнього чистого результату."],
        ["p", "Саме про цей сценарій питає аудитор, і наявність письмової процедури важить більше, ніж кількість аналізаторів на столі."],
        ["p", "Ми допомагаємо визначити обовʼязковий набір під конкретний процес, постачаємо аналізатори та системи відбору проб і проводимо аудит наявної лабораторії на відповідність вимогам ISBT і EIGA."],
      ],
      ru: [
        ["p", "Диоксид углерода, который попадает в напиток, — это пищевой ингредиент. Его оценивают не только по чистоте, а по перечню следовых примесей, часть из которых ограничивают на уровне миллиардных долей, потому что они заметны на вкус и запах задолго до того, как становятся опасными."],
        ["h2", "Кто устанавливает требования"],
        ["li", "ISBT, Международное общество технологов напитков, чья спецификация де-факто является отраслевым стандартом для пищевого CO₂."],
        ["li", "EIGA, Европейская ассоциация производителей промышленных газов, документ которой согласован с ISBT и на который ссылаются европейские поставщики."],
        ["li", "В Украине сверх этого действуют соответствующие ДСТУ и требования пищевой безопасности в рамках HACCP."],
        ["h2", "Что именно контролируют"],
        ["p", "Типовой набор пределов выглядит примерно так. Точные значения всегда берите из действующей редакции спецификации, поскольку её периодически обновляют."],
        ["li", "Чистота CO₂ — не менее 99,9% объёмных."],
        ["li", "Влага — примерно до 20 ppm."],
        ["li", "Кислород — примерно до 30 ppm."],
        ["li", "Оксид углерода — примерно до 10 ppm."],
        ["li", "Общие углеводороды — примерно до 50 ppm в пересчёте на метан, с более жёстким пределом для неметановых соединений."],
        ["li", "Бензол — на уровне десятков миллиардных долей."],
        ["li", "Сернистые соединения — суммарно около 100 ppb; именно они дают классический посторонний запах."],
        ["li", "Ацетальдегид, аммиак и оксиды азота — единицы ppm и ниже."],
        ["h2", "Почему это важно, даже если вы не производите CO₂"],
        ["p", "Ответственность за готовый напиток лежит на розливщике. Сертификат поставщика подтверждает качество конкретной партии на момент отгрузки; он ничего не говорит о том, что произошло при перевозке, и не залили ли продукт в цистерну, где до этого был технический газ. Именно поэтому входной контроль — это отдельная контрольная точка в плане HACCP, а не формальность."],
        ["h2", "Минимальный состав лаборатории"],
        ["li", "Анализатор чистоты CO₂."],
        ["li", "Анализатор влаги или точки росы."],
        ["li", "Анализатор кислорода."],
        ["li", "Система отбора проб из жидкой и газовой фазы — отбор не из той фазы является самым частым источником ложных результатов."],
        ["li", "Калибровочные газы и расходные материалы с графиком поверки."],
        ["p", "Полный комплект под все параметры ISBT стоит дорого, и не каждому предприятию он нужен. Распространённый подход — держать на месте непрерывный контроль нескольких критических параметров, а полный профиль заказывать во внешней лаборатории с согласованной периодичностью."],
        ["h2", "Как часто проверять"],
        ["p", "Практическая схема — многоуровневая. Критические параметры — чистоту, влагу, кислород — проверяют на каждой входной поставке, потому что именно там заходит загрязнение. Полный профиль, включая бензол и сернистые соединения, заказывают во внешней лаборатории с согласованной периодичностью, обычно раз в квартал, и дополнительно каждый раз, когда меняется поставщик или источник газа."],
        ["h2", "Что делать с партией вне спецификации"],
        ["li", "Не подключайте автоцистерну к ёмкости, пока нет результата входного контроля — забракованная партия, смешанная с содержимым, загрязняет весь сосуд."],
        ["li", "Зафиксируйте результат, уведомите поставщика, сохраните пробу."],
        ["li", "Если продукт уже в ёмкости: остановите отбор, согласуйте с поставщиком опорожнение и очистку, проверьте готовую продукцию, выпущенную с последнего чистого результата."],
        ["p", "Именно про этот сценарий спрашивает аудитор, и наличие письменной процедуры значит больше, чем количество анализаторов на столе."],
        ["p", "Мы помогаем определить обязательный набор под конкретный процесс, поставляем анализаторы и системы отбора проб и проводим аудит имеющейся лаборатории на соответствие требованиям ISBT и EIGA."],
      ],
    },
    "b5",
  ),
  faq: [
    faq(
      "faq-isbt-1",
      {
        en: "Is a supplier certificate enough to pass an audit?",
        uk: "Чи достатньо сертифіката постачальника, щоб пройти аудит?",
        ru: "Достаточно ли сертификата поставщика, чтобы пройти аудит?",
      },
      {
        en: "Usually not. An auditor asks how you verify the incoming product yourself and what you do with a batch that fails. A certificate plus a documented incoming inspection procedure and records of results is what closes the question.",
        uk: "Зазвичай ні. Аудитор питає, як ви самі перевіряєте вхідний продукт і що робите з партією, яка не пройшла. Сертифікат плюс задокументована процедура вхідного контролю та записи результатів — ось що закриває питання.",
        ru: "Обычно нет. Аудитор спрашивает, как вы сами проверяете входной продукт и что делаете с партией, которая не прошла. Сертификат плюс задокументированная процедура входного контроля и записи результатов — вот что закрывает вопрос.",
      },
    ),
    faq(
      "faq-isbt-2",
      {
        en: "Which impurities most often cause a rejected batch?",
        uk: "Які домішки найчастіше стають причиною відбраковки партії?",
        ru: "Какие примеси чаще всего становятся причиной отбраковки партии?",
      },
      {
        en: "In practice, moisture and sulphur compounds. Moisture usually points to a problem with drying at the producer or to a contaminated tanker; sulphur compounds are immediately noticeable in the taste of the drink and are the most frequent reason for complaints.",
        uk: "На практиці — волога й сірчисті сполуки. Волога зазвичай вказує на проблему з осушенням у виробника або на забруднену цистерну; сірчисті сполуки одразу помітні у смаку напою і є найчастішою причиною рекламацій.",
        ru: "На практике — влага и сернистые соединения. Влага обычно указывает на проблему с осушкой у производителя или на загрязнённую цистерну; сернистые соединения сразу заметны во вкусе напитка и являются самой частой причиной рекламаций.",
      },
    ),
  ],
  relatedProducts: [seedProduct("product-co2-lab-kit"), seedProduct("product-tank-co2-30")],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "ISBT and EIGA requirements for beverage CO₂ quality",
      uk: "Вимоги ISBT та EIGA до якості CO₂ для напоїв",
      ru: "Требования ISBT и EIGA к качеству CO₂ для напитков",
    },
    metaDescription: {
      en: "Purity, moisture, oxygen, hydrocarbons, benzene and sulphur compounds: which CO₂ parameters are limited for beverages and what a minimum incoming-inspection laboratory needs.",
      uk: "Чистота, волога, кисень, вуглеводні, бензол і сірчисті сполуки: які параметри CO₂ обмежують для напоїв і що потрібно для мінімальної лабораторії вхідного контролю.",
      ru: "Чистота, влага, кислород, углеводороды, бензол и сернистые соединения: какие параметры CO₂ ограничивают для напитков и что нужно для минимальной лаборатории входного контроля.",
    },
    keywords: {
      en: "ISBT CO2 specification, EIGA CO2, beverage grade CO2",
      uk: "ISBT CO2, EIGA, харчовий CO2 вимоги",
      ru: "ISBT CO2, EIGA, пищевой CO2 требования",
    },
  },
};

/* ─── Експорт ──────────────────────────────────────────────────────────── */

export const seedPosts: SeedPost[] = [
  postTankVolume,
  postGreenhouseVaporizer,
  postCylinderVsTank,
  postFoundation,
  postIsbt,
];

// Перехресні звʼязки проставляємо після оголошення, щоб уникнути циклів
postTankVolume.relatedPosts = [postCylinderVsTank, postFoundation];
postCylinderVsTank.relatedPosts = [postTankVolume];
postGreenhouseVaporizer.relatedPosts = [postTankVolume, postFoundation];
postFoundation.relatedPosts = [postTankVolume];
postIsbt.relatedPosts = [postTankVolume];

for (const category of seedBlogCategories) {
  category.postCount = seedPosts.filter((post) =>
    post.categories.some((item) => item._id === category._id),
  ).length;
}
