import type { Landing } from "./types";

/**
 * Попит: «вуглекислота для пива», «какая углекислота нужна для пива»,
 * «пищевая углекислота для пива», «газификатор для напитков»; стаття
 * «CO₂ для пивоварні» вже збирає покази, але не мала комерційної сторінки.
 */
export const beveragesLanding: Landing = {
  id: "beverages",
  path: "/solutions/industries/beverages",
  seo: {
    title: {
      en: "CO₂ supply systems for breweries and beverage plants",
      uk: "CO₂ для пивоварень і заводів напоїв: ємності, випарники",
      ru: "CO₂ для пивоварен и заводов напитков: ёмкости, испарители",
    },
    description: {
      en: "Liquid CO₂ tanks, vaporizers and incoming quality control for breweries and bottling lines. Equipment by monthly output, food grade to ISBT.",
      uk: "Ємності для рідкого CO₂, випарники та вхідний контроль якості для пивоварень і ліній розливу. Комплектація за обсягом випуску, харчова CO₂ за ISBT.",
      ru: "Ёмкости для жидкого CO₂, испарители и входной контроль качества для пивоварен и линий розлива. Комплектация по объёму выпуска, пищевая CO₂ по ISBT.",
    },
  },
  shortTitle: {
    en: "Breweries and beverages",
    uk: "Пивоварні та напої",
    ru: "Пивоварни и напитки",
  },
  eyebrow: { en: "Industries", uk: "Галузі", ru: "Отрасли" },
  title: {
    en: "CO₂ supply for breweries and beverage plants",
    uk: "CO₂ для пивоварень і заводів напоїв",
    ru: "CO₂ для пивоварен и заводов напитков",
  },
  lead: {
    en: "Carbonation is only a third of the gas a brewery uses — the rest goes on purging, counter-pressure filling and transfers. We size the tank and vaporizer to that full picture and to the peaks of your filling line.",
    uk: "Карбонізація — лише третина газу, який витрачає пивоварня; решта йде на продування, ізобаричний розлив і перекачування. Ємність і випарник ми підбираємо під повну картину споживання й під піки лінії розливу.",
    ru: "Карбонизация — лишь треть газа, который тратит пивоварня; остальное уходит на продувку, изобарический розлив и перекачивание. Ёмкость и испаритель мы подбираем под полную картину потребления и под пики линии розлива.",
  },
  image: {
    src: "/images/industriesWeServePage/food/imageOne.webp",
    alt: {
      en: "Food and beverage production line using carbon dioxide",
      uk: "Лінія харчового виробництва й розливу напоїв із використанням вуглекислоти",
      ru: "Линия пищевого производства и розлива напитков с использованием углекислоты",
    },
  },
  body: {
    uk: [
      ["h2", "Комплектація за обсягом випуску"],
      ["tbl", "Орієнтири для виробництва з рекуперацією й без", "Випуск | CO₂ за 1 кг/гл | CO₂ за 2 кг/гл | Постачання", "500 гл/міс | 0,5 т | 1 т | балони або мікробалк", "2 000 гл/міс | 2 т | 4 т | ємність 10–20 м³", "8 000 гл/міс | 8 т | 16 т | ємність 20–30 м³", "20 000 гл/міс | 20 т | 40 т | ємність 50 м³ і більше"],
      ["p", "Налагоджене виробництво витрачає 0,5–1,5 кг CO₂ на гектолітр, крафтова пивоварня без рекуперації — 2–4 кг. Різницю робить кількість продувань на кожен розлитий літр, тому ми починаємо з вашого реального балансу газу, а не з таблиці."],
      ["h2", "Яка вуглекислота потрібна для пива й напоїв"],
      ["p", "Лише **харчова**: газ контактує з продуктом не тільки під час карбонізації, а й у газовій подушці танка, під час продування та ізобаричного розливу. Нормуються окремі домішки — волога, кисень, вуглеводні, ацетальдегід, сірка, бензол — на рівні мільйонних часток. Сертифікат постачальника описує партію на наповнювальній станції, тому ми закладаємо [вхідний контроль якості CO₂](cat:cat-co2-lab) біля ємності."],
      ["h2", "Що входить у систему"],
      ["li", "[Кріогенна ємність для рідкого CO₂](cat:cat-tanks-co2) під повну поставку автоцистерною з робочим резервом."],
      ["li", "[Випарник CO₂](cat:cat-co2-vaporizers), підібраний під пік: запуск лінії, продування танка й перекачування, що збіглися в часі."],
      ["li", "Редукування біля точок споживання, щоб довга траса не забирала тиск саме в пік."],
      ["li", "Резерв на мороз: атмосферний випарник узимку втрачає продуктивність."],
      ["li", "Монтаж, пусконалагодження, документи на посудину під тиском."],
      ["h2", "Азот для напоїв"],
      ["p", "Нітро-напої, дозування рідкого азоту перед закупорюванням банок і створення тиску в негазованих напоях працюють на азоті, а не на CO₂. Якщо це ваш випадок, додаємо [ємність для рідкого азоту](cat:cat-tanks-n2) з атмосферним випарником."],
      ["cta", "Рахуєте газ для пивоварні чи лінії розливу?", "Надішліть місячний випуск і формат пакування — порахуємо споживання, підберемо ємність і випарник та перелік вхідного контролю.", "Отримати розрахунок", "page:/contacts"],
    ],
    en: [
      ["h2", "Equipment by monthly output"],
      ["tbl", "Guideline figures with and without recovery", "Output | CO₂ at 1 kg/hl | CO₂ at 2 kg/hl | Supply", "500 hl/month | 0.5 t | 1 t | cylinders or microbulk", "2,000 hl/month | 2 t | 4 t | 10–20 m³ tank", "8,000 hl/month | 8 t | 16 t | 20–30 m³ tank", "20,000 hl/month | 20 t | 40 t | 50 m³ tank and above"],
      ["p", "A well-run plant uses 0.5–1.5 kg of CO₂ per hectolitre; a craft brewery without recovery spends 2–4 kg. The number of purges per litre packaged makes the difference, so we start from your actual gas balance rather than from the table."],
      ["h2", "Which CO₂ beer and beverages need"],
      ["p", "**Food grade only**: the gas touches the product not just in carbonation but in the tank headspace, during purging and counter-pressure filling. Individual contaminants — moisture, oxygen, hydrocarbons, acetaldehyde, sulphur, benzene — are limited at parts per million. A supplier certificate covers the batch at the filling plant, which is why we plan [CO₂ quality control](cat:cat-co2-lab) at the tank."],
      ["h2", "What the system includes"],
      ["li", "A [cryogenic liquid CO₂ tank](cat:cat-tanks-co2) that takes a full road tanker delivery with a working reserve."],
      ["li", "A [CO₂ vaporizer](cat:cat-co2-vaporizers) sized for the peak: line start-up, tank purging and a transfer happening at once."],
      ["li", "Pressure regulation close to the points of use, so a long run does not steal pressure at peak."],
      ["li", "Frost reserve: an ambient vaporizer loses capacity in winter."],
      ["li", "Installation, commissioning and pressure vessel documentation."],
      ["h2", "Nitrogen for beverages"],
      ["p", "Nitro drinks, liquid nitrogen dosing before can seaming and pressurising still beverages run on nitrogen, not CO₂. If that is your case, we add a [liquid nitrogen tank](cat:cat-tanks-n2) with an ambient vaporizer."],
      ["cta", "Sizing gas for a brewery or bottling line?", "Send monthly output and packaging format — we will calculate consumption, size the tank and vaporizer, and list what incoming inspection should cover.", "Get a calculation", "page:/contacts"],
    ],
    ru: [
      ["h2", "Комплектация по объёму выпуска"],
      ["tbl", "Ориентиры для производства с рекуперацией и без", "Выпуск | CO₂ при 1 кг/гл | CO₂ при 2 кг/гл | Снабжение", "500 гл/мес | 0,5 т | 1 т | баллоны или микробалк", "2 000 гл/мес | 2 т | 4 т | ёмкость 10–20 м³", "8 000 гл/мес | 8 т | 16 т | ёмкость 20–30 м³", "20 000 гл/мес | 20 т | 40 т | ёмкость 50 м³ и больше"],
      ["p", "Налаженное производство тратит 0,5–1,5 кг CO₂ на гектолитр, крафтовая пивоварня без рекуперации — 2–4 кг. Разницу делает количество продувок на каждый разлитый литр, поэтому мы начинаем с вашего реального баланса газа, а не с таблицы."],
      ["h2", "Какая углекислота нужна для пива и напитков"],
      ["p", "Только **пищевая**: газ контактирует с продуктом не только при карбонизации, но и в газовой подушке танка, при продувке и изобарическом розливе. Нормируются отдельные примеси — влага, кислород, углеводороды, ацетальдегид, сера, бензол — на уровне миллионных долей. Сертификат поставщика описывает партию на наполнительной станции, поэтому мы закладываем [входной контроль качества CO₂](cat:cat-co2-lab) у ёмкости."],
      ["h2", "Что входит в систему"],
      ["li", "[Криогенная ёмкость для жидкого CO₂](cat:cat-tanks-co2) под полную поставку автоцистерной с рабочим резервом."],
      ["li", "[Испаритель CO₂](cat:cat-co2-vaporizers), подобранный под пик: запуск линии, продувка танка и перекачивание, совпавшие по времени."],
      ["li", "Редуцирование у точек потребления, чтобы длинная трасса не забирала давление именно в пик."],
      ["li", "Резерв на мороз: атмосферный испаритель зимой теряет производительность."],
      ["li", "Монтаж, пусконаладка, документы на сосуд под давлением."],
      ["h2", "Азот для напитков"],
      ["p", "Нитро-напитки, дозирование жидкого азота перед закаткой банок и создание давления в негазированных напитках работают на азоте, а не на CO₂. Если это ваш случай, добавляем [ёмкость для жидкого азота](cat:cat-tanks-n2) с атмосферным испарителем."],
      ["cta", "Считаете газ для пивоварни или линии розлива?", "Пришлите месячный выпуск и формат упаковки — посчитаем потребление, подберём ёмкость и испаритель и перечень входного контроля.", "Получить расчёт", "page:/contacts"],
    ],
  },
  hubs: ["cat-tanks-co2", "cat-co2-vaporizers", "cat-co2-lab", "cat-tanks-n2"],
  posts: ["post-co2-for-beverages", "post-isbt-eiga-co2-quality", "post-food-vs-technical-co2", "post-co2-tank-volume"],
  faq: [
    {
      question: {
        en: "Can a craft brewery work from cylinders?",
        uk: "Чи може крафтова пивоварня працювати на балонах?",
        ru: "Может ли крафтовая пивоварня работать на баллонах?",
      },
      answer: {
        en: "Up to roughly one tonne of CO₂ a month, yes — that is about 40 cylinders. Beyond that, handling, downtime at swaps and the heel left in each cylinder usually cost more than a small tank.",
        uk: "Приблизно до тонни CO₂ на місяць — так, це близько 40 балонів. Далі обслуговування, простої на замінах і залишок у кожному балоні зазвичай коштують дорожче за невелику ємність.",
        ru: "Примерно до тонны CO₂ в месяц — да, это около 40 баллонов. Дальше обслуживание, простои на заменах и остаток в каждом баллоне обычно стоят дороже небольшой ёмкости.",
      },
    },
    {
      question: {
        en: "How much CO₂ actually dissolves in beer?",
        uk: "Скільки CO₂ насправді розчиняється в пиві?",
        ru: "Сколько CO₂ на самом деле растворяется в пиве?",
      },
      answer: {
        en: "At 2.3–2.8 volumes of carbonation — about 4.5–5.5 g per litre, roughly half a kilogram per hectolitre. Everything above that on your invoice is purging, filling and losses.",
        uk: "За 2,3–2,8 обʼєму карбонізації — приблизно 4,5–5,5 г на літр, тобто близько півкілограма на гектолітр. Усе, що в рахунку понад це, — продування, розлив і втрати.",
        ru: "При 2,3–2,8 объёма карбонизации — примерно 4,5–5,5 г на литр, то есть около полукилограмма на гектолитр. Всё, что в счёте сверх этого, — продувка, розлив и потери.",
      },
    },
  ],
};
