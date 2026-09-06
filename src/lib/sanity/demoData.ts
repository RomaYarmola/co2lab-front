import type {
  SanityAuthor,
  SanityBlogCategory,
  SanityBlogPost,
  SanityProduct,
  SanityProductCategory,
} from "./types";

import { seedCategories, seedProduct, seedProducts } from "./seed";

/**
 * Демо-контент на час, поки не підключено Sanity.
 * Каталог — реальний контент клієнта з `./seed` (той самий, що пушиться в Sanity);
 * блог — тимчасові демо-статті до появи реальних.
 */

/** Локальні файли з /public — `urlForImage` віддає `asset.url` без білдера. */
function img(url: string, alt: { en: string; uk: string; ru: string }) {
  return { _type: "image", asset: { _id: url, url }, alt };
}

function paragraph(text: string) {
  return { _type: "block", style: "normal", children: [{ _type: "span", text }] };
}

function heading(text: string) {
  return { _type: "block", style: "h2", children: [{ _type: "span", text }] };
}

export const demoProductCategories: SanityProductCategory[] = seedCategories;
export const demoProducts: SanityProduct[] = seedProducts;

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

// Перехресні звʼязки проставляємо після оголошення, щоб уникнути циклів
demoBlogPosts[0].relatedProducts = [seedProduct("product-tank-co2-30"), seedProduct("product-co2-lab-kit")];
demoBlogPosts[1].relatedProducts = [seedProduct("product-co2-lab-kit"), seedProduct("product-co2-vaporizer-300")];
