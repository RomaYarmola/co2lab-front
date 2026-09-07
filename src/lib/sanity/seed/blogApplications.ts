/**
 * Блог: галузеві сценарії споживання CO₂.
 *
 * Три найбільші напрямки попиту за пошуковими запитами: зварювання
 * («вуглекислота для зварювання», «суміш аргон вуглекислота»), напої
 * («co2 для пива», «карбонізація напоїв») і виробництво сухого льоду
 * («производство сухого льда оборудование»).
 *
 * Стаття про сухий лід свідомо посилається на icelab.com.ua — це реальний
 * український виробник і споживач рідкого CO₂, тобто посилання пояснює
 * читачеві ланцюг «рідкий CO₂ → гранула», а не існує заради ваги.
 */
import {
  SEED_UPDATED_AT,
  body,
  categoryPath,
  faq,
  img,
  postPath,
  productPath,
} from "./helpers.ts";
import {
  catSelection,
  postIsbt,
  seedAuthor,
  seedProduct,
  type SeedPost,
} from "./blog.ts";
import { tankCategories } from "./tanks.ts";

const catTanksCo2 = tankCategories.find((c) => c._id === "cat-tanks-co2")!;

const tank10 = seedProduct("product-tank-co2-10");
const tank20 = seedProduct("product-tank-co2-20");
const tank30 = seedProduct("product-tank-co2-30");
const tank50 = seedProduct("product-tank-co2-50");
const labKit = seedProduct("product-co2-lab-kit");
const vap100 = seedProduct("product-co2-vaporizer-100");
const vap300 = seedProduct("product-co2-vaporizer-300");
const vap1000 = seedProduct("product-co2-vaporizer-1000");

/** Сайт-побратим того самого замовника: виробник сухого льоду з рідкого CO₂. */
const ICELAB = {
  en: "https://icelab.com.ua/production",
  uk: "https://icelab.com.ua/production",
  ru: "https://icelab.com.ua/ru/production",
};

const PHOTO = {
  chemical: "/images/industriesWeServePage/chemical/imageOne.webp",
  cylinderFrame: "/images/catalog/cryogenic-cylinder-stainless-frame.webp",
  food: "/images/industriesWeServePage/food/imageOne.webp",
  lab: "/images/catalog/co2-quality-control-laboratory.webp",
  dryIce: "/images/engineeringSolutionsPage/dryIce/dryIce.webp",
  fans: "/images/catalog/forced-draft-vaporizer-fans.webp",
};

/* ─── Стаття: CO₂ для зварювання ───────────────────────────────────────── */

export const postWelding: SeedPost = {
  _id: "post-co2-for-welding",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "CO₂ or an argon mix for welding: what changes in the weld and in the budget",
    uk: "Вуглекислота чи суміш з аргоном для зварювання: що змінюється у шві та в бюджеті",
    ru: "Углекислота или смесь с аргоном для сварки: что меняется в шве и в бюджете",
  },
  slug: {
    en: { current: "co2-or-argon-mix-for-welding" },
    uk: { current: "vuglekyslota-chy-sumish-dlya-zvaryuvannya" },
    ru: { current: "uglekislota-ili-smes-dlya-svarki" },
  },
  isPublished: true,
  isFeatured: false,
  publishedAt: "2026-09-07T12:00:00Z",
  updatedAt: "2026-09-07T12:00:00Z",
  readingTimeMinutes: 4,
  author: seedAuthor,
  categories: [catSelection],
  tags: ["CO2", "зварювання", "суміші"],
  coverImage: img(PHOTO.chemical, {
    en: "Industrial gas piping and fittings at a metalworking plant",
    uk: "Промислова газова обвʼязка й арматура на металообробному виробництві",
    ru: "Промышленная газовая обвязка и арматура на металлообрабатывающем производстве",
  }),
  excerpt: {
    en: "Pure CO₂ is the cheapest shielding gas and the one that spatters most. Where the argon mix pays for itself, how much gas a welding post actually uses, and when a workshop outgrows cylinders.",
    uk: "Чиста вуглекислота — найдешевший захисний газ і найбільш «бризкучий». Де суміш з аргоном окупається, скільки газу насправді витрачає один пост і коли цех переростає балони.",
    ru: "Чистая углекислота — самый дешёвый защитный газ и самый «брызгучий». Где смесь с аргоном окупается, сколько газа на самом деле тратит один пост и когда цех перерастает баллоны.",
  },
  body: body(
    {
      en: [
        ["p", "For semi-automatic welding of carbon steel there are two mainstream choices: pure carbon dioxide or an argon–CO₂ mixture. Pure CO₂ costs noticeably less per kilogram, which is why most workshops start with it. The full cost of a weld, however, includes the wire that turns into spatter and the hours spent chipping it off."],
        ["h2", "What the gas actually changes"],
        ["tbl", "Shielding gases for MAG welding of carbon steel", "Gas | Arc behaviour | Spatter | Penetration | Where it fits", "100% CO₂ | coarse droplet transfer | high | deep, narrow | thick sections, structural work, low cosmetic demands", "82% Ar / 18% CO₂ | stable spray transfer possible | low | wide, shallower | general fabrication, visible welds", "92% Ar / 8% CO₂ | very stable spray | very low | wide | thin sheet, robotic and semi-automatic lines", "98% Ar / 2% O₂ | spray | minimal | wide | stainless steel"],
        ["p", "The arithmetic that decides is not the price of the cylinder. Pure CO₂ produces spatter, and spatter is wire you bought, melted and then removed by hand. On visible welds and thin sheet the argon mix usually wins on total cost even though the gas itself costs more."],
        ["p", "One physical detail that catches people out: CO₂ expands from liquid at the regulator and cools sharply. On a cold day and at high flow, a plain regulator freezes over. Welding posts on pure CO₂ need a heated regulator — or a proper vaporizer if the gas comes from a tank."],
        ["h2", "How much gas one post actually uses"],
        ["p", "The consumption calculation is simple and almost always surprising. Take flow rate in litres per minute, multiply by arc-on time, and convert to kilograms at 0.54 m³ per kilogram."],
        ["tbl", "One post, 12 l/min, eight-hour shift, 22 working days", "Arc-on time | Gas per shift | Per month, one post | 40 l cylinders per month", "30% | 1.7 m³ ≈ 3.2 kg | ≈ 70 kg | 3", "50% | 2.9 m³ ≈ 5.3 kg | ≈ 117 kg | 5", "70% | 4.0 m³ ≈ 7.5 kg | ≈ 165 kg | 7"],
        ["p", "Multiply by the number of posts. A workshop with ten welders at 50% arc-on time burns about 1.2 tonnes a month — roughly fifty 40-litre cylinders, or two swaps every working day."],
        ["img", PHOTO.cylinderFrame, "Cylinders in a frame prepared for delivery to a workshop", "At a dozen posts the cylinder fleet becomes a logistics job of its own"],
        ["h2", "Where the gas quietly leaks away"],
        ["li", "Flow set «with a margin». Above 16–18 l/min the extra gas does not improve shielding; it creates turbulence that pulls air into the arc."],
        ["li", "Long torch leads left pressurised between welds."],
        ["li", "Post-flow set longer than needed on every single weld."],
        ["li", "Leaks at quick couplings — the classic overnight loss that nobody sees on the meter."],
        ["p", "Cutting flow from 18 to 13 l/min on ten posts saves roughly a quarter of the consumption without touching weld quality. That is usually the cheapest improvement available in a welding shop."],
        ["h2", "When a workshop outgrows cylinders"],
        ["p", `From about a tonne a month, cylinders start costing more in handling than in gas. The usual step is a [stationary tank](${categoryPath(catTanksCo2, "en")}) of 10–20 m³ with a vaporizer and a distribution ring around the shop, so every post takes gas from a wall socket instead of a cylinder standing beside it.`],
        ["p", `For a shop of that size a [10 m³ tank](${productPath(tank10, "en")}) covers eight to nine months of supply at one tonne a month, which is too slow a turnover — a [20 m³ vessel](${productPath(tank20, "en")}) shared with other processes, or a smaller microbulk unit, usually fits better. Sizing here follows delivery logistics rather than the tank catalogue.`],
        ["p", `The vaporizer matters more than the tank in this application. Welding demand is spiky: all posts strike an arc at the start of a shift. A [100 kg/h vaporizer](${productPath(vap100, "en")}) covers roughly twenty simultaneous posts at peak; below that the pressure sags and the shielding suffers.`],
        ["cta", "Sizing a supply for a welding shop?", "Tell us the number of posts, the flow rate and the arc-on time — we will calculate consumption, the vessel and the vaporizer, and show what the distribution ring should look like.", "Request a calculation", "/contacts"],
      ],
      uk: [
        ["p", "Для напівавтоматичного зварювання вуглецевої сталі є два основні варіанти: чиста вуглекислота або суміш аргону з CO₂. Чистий CO₂ помітно дешевший за кілограм, тому більшість цехів починають із нього. Але повна вартість шва включає ще й дріт, який перетворився на бризки, і години, витрачені на їх збивання."],
        ["h2", "Що насправді змінює газ"],
        ["tbl", "Захисні гази для зварювання вуглецевої сталі в середовищі активного газу", "Газ | Поведінка дуги | Розбризкування | Проплавлення | Де доречний", "100% CO₂ | крупнокрапельний перенос | високе | глибоке, вузьке | товстий метал, металоконструкції, невисокі вимоги до вигляду", "82% Ar / 18% CO₂ | можливий струминний перенос | низьке | ширше, менш глибоке | загальне виробництво, видимі шви", "92% Ar / 8% CO₂ | дуже стабільний струминний | дуже низьке | широке | тонкий лист, роботизовані та напівавтоматичні лінії", "98% Ar / 2% O₂ | струминний | мінімальне | широке | неіржавна сталь"],
        ["p", "Вирішує тут не ціна балона. Чистий CO₂ дає бризки, а бризки — це дріт, який ви купили, розплавили й потім зняли вручну. На видимих швах і тонкому листі суміш з аргоном зазвичай виграє за сумарними витратами, попри дорожчий газ."],
        ["p", "Фізична деталь, на якій часто спотикаються: CO₂ розширюється з рідини на редукторі й сильно охолоджується. У холодний день і на великій витраті звичайний редуктор обмерзає. Пости на чистій вуглекислоті потребують підігрітого редуктора — або повноцінного випарника, якщо газ іде з ємності."],
        ["h2", "Скільки газу насправді витрачає один пост"],
        ["p", "Розрахунок простий і майже завжди несподіваний. Візьміть витрату в літрах за хвилину, помножте на час горіння дуги й переведіть у кілограми за співвідношенням 0,54 м³ на кілограм."],
        ["tbl", "Один пост, 12 л/хв, восьмигодинна зміна, 22 робочі дні", "Час горіння дуги | Газу за зміну | За місяць, один пост | Балонів 40 л на місяць", "30% | 1,7 м³ ≈ 3,2 кг | ≈ 70 кг | 3", "50% | 2,9 м³ ≈ 5,3 кг | ≈ 117 кг | 5", "70% | 4,0 м³ ≈ 7,5 кг | ≈ 165 кг | 7"],
        ["p", "Помножте на кількість постів. Цех із десятьма зварниками за 50% часу горіння спалює близько 1,2 тонни на місяць — це приблизно пʼятдесят 40-літрових балонів, тобто дві заміни щоробочого дня."],
        ["img", PHOTO.cylinderFrame, "Балони в рамі, підготовлені до відвантаження в цех", "На десятку постів балонний парк перетворюється на окрему логістичну задачу"],
        ["h2", "Куди газ тихо витікає"],
        ["li", "Витрата, виставлена «із запасом». Вище 16–18 л/хв зайвий газ не покращує захист, а створює турбулентність, яка підсмоктує повітря в зону дуги."],
        ["li", "Довгі рукави пальника, що лишаються під тиском між швами."],
        ["li", "Час продування після шва, виставлений довшим, ніж треба, — і так на кожному шві."],
        ["li", "Витоки на швидкознімних зʼєднаннях: класична нічна втрата, якої ніхто не бачить на лічильнику."],
        ["p", "Зниження витрати з 18 до 13 л/хв на десяти постах економить приблизно чверть споживання без жодного впливу на якість шва. Зазвичай це найдешевше поліпшення, доступне зварювальному цеху."],
        ["h2", "Коли цех переростає балони"],
        ["p", `Приблизно від тонни на місяць балони починають коштувати більше в обслуговуванні, ніж у газі. Звичайний крок — [стаціонарна ємність](${categoryPath(catTanksCo2, "uk")}) на 10–20 м³ з випарником і розвідним кільцем по цеху, щоб кожен пост брав газ із настінного посту, а не з балона поруч.`],
        ["p", `Для цеху такого розміру [ємність на 10 м³](${productPath(tank10, "uk")}) — це вісім-девʼять місяців запасу за тонни на місяць, тобто надто повільна оборотність. Краще підходить [посудина на 20 м³](${productPath(tank20, "uk")}), розділена з іншими процесами, або менший мікробалк. Обʼєм тут диктує логістика поставок, а не каталог.`],
        ["p", `У цьому застосуванні випарник важливіший за ємність. Споживання зварювання пікове: на початку зміни дугу запалюють усі пости одночасно. [Випарник на 100 кг/год](${productPath(vap100, "uk")}) закриває приблизно двадцять одночасних постів у піку; нижче цього тиск просідає й захист псується.`],
        ["cta", "Підбираєте постачання для зварювального цеху?", "Напишіть кількість постів, витрату й частку часу горіння дуги — порахуємо споживання, посудину та випарник і покажемо, як має виглядати розвідне кільце.", "Замовити розрахунок", "/uk/contacts"],
      ],
      ru: [
        ["p", "Для полуавтоматической сварки углеродистой стали есть два основных варианта: чистая углекислота или смесь аргона с CO₂. Чистый CO₂ заметно дешевле за килограмм, поэтому большинство цехов начинают с него. Но полная стоимость шва включает ещё и проволоку, превратившуюся в брызги, и часы, потраченные на их сбивание."],
        ["h2", "Что на самом деле меняет газ"],
        ["tbl", "Защитные газы для сварки углеродистой стали в среде активного газа", "Газ | Поведение дуги | Разбрызгивание | Проплавление | Где уместен", "100% CO₂ | крупнокапельный перенос | высокое | глубокое, узкое | толстый металл, металлоконструкции, невысокие требования к виду", "82% Ar / 18% CO₂ | возможен струйный перенос | низкое | шире, менее глубокое | общее производство, видимые швы", "92% Ar / 8% CO₂ | очень стабильный струйный | очень низкое | широкое | тонкий лист, роботизированные и полуавтоматические линии", "98% Ar / 2% O₂ | струйный | минимальное | широкое | нержавеющая сталь"],
        ["p", "Решает здесь не цена баллона. Чистый CO₂ даёт брызги, а брызги — это проволока, которую вы купили, расплавили и потом сняли вручную. На видимых швах и тонком листе смесь с аргоном обычно выигрывает по суммарным затратам, несмотря на более дорогой газ."],
        ["p", "Физическая деталь, на которой часто спотыкаются: CO₂ расширяется из жидкости на редукторе и сильно охлаждается. В холодный день и на большом расходе обычный редуктор обмерзает. Посты на чистой углекислоте требуют подогреваемого редуктора — или полноценного испарителя, если газ идёт из ёмкости."],
        ["h2", "Сколько газа на самом деле тратит один пост"],
        ["p", "Расчёт простой и почти всегда неожиданный. Возьмите расход в литрах в минуту, умножьте на время горения дуги и переведите в килограммы по соотношению 0,54 м³ на килограмм."],
        ["tbl", "Один пост, 12 л/мин, восьмичасовая смена, 22 рабочих дня", "Время горения дуги | Газа за смену | За месяц, один пост | Баллонов 40 л в месяц", "30% | 1,7 м³ ≈ 3,2 кг | ≈ 70 кг | 3", "50% | 2,9 м³ ≈ 5,3 кг | ≈ 117 кг | 5", "70% | 4,0 м³ ≈ 7,5 кг | ≈ 165 кг | 7"],
        ["p", "Умножьте на количество постов. Цех с десятью сварщиками при 50% времени горения сжигает около 1,2 тонны в месяц — это примерно пятьдесят 40-литровых баллонов, то есть две замены каждый рабочий день."],
        ["img", PHOTO.cylinderFrame, "Баллоны в раме, подготовленные к отгрузке в цех", "На десяток постов баллонный парк превращается в отдельную логистическую задачу"],
        ["h2", "Куда газ тихо утекает"],
        ["li", "Расход, выставленный «с запасом». Выше 16–18 л/мин лишний газ не улучшает защиту, а создаёт турбулентность, подсасывающую воздух в зону дуги."],
        ["li", "Длинные рукава горелки, остающиеся под давлением между швами."],
        ["li", "Время продувки после шва, выставленное длиннее нужного, — и так на каждом шве."],
        ["li", "Утечки на быстросъёмных соединениях: классическая ночная потеря, которой никто не видит на счётчике."],
        ["p", "Снижение расхода с 18 до 13 л/мин на десяти постах экономит примерно четверть потребления без всякого влияния на качество шва. Обычно это самое дешёвое улучшение, доступное сварочному цеху."],
        ["h2", "Когда цех перерастает баллоны"],
        ["p", `Примерно от тонны в месяц баллоны начинают стоить больше в обслуживании, чем в газе. Обычный шаг — [стационарная ёмкость](${categoryPath(catTanksCo2, "ru")}) на 10–20 м³ с испарителем и разводящим кольцом по цеху, чтобы каждый пост брал газ из настенного поста, а не из баллона рядом.`],
        ["p", `Для цеха такого размера [ёмкость на 10 м³](${productPath(tank10, "ru")}) — это восемь-девять месяцев запаса при тонне в месяц, то есть слишком медленная оборачиваемость. Лучше подходит [сосуд на 20 м³](${productPath(tank20, "ru")}), разделённый с другими процессами, или меньший микробалк. Объём здесь диктует логистика поставок, а не каталог.`],
        ["p", `В этом применении испаритель важнее ёмкости. Потребление сварки пиковое: в начале смены дугу зажигают все посты одновременно. [Испаритель на 100 кг/ч](${productPath(vap100, "ru")}) закрывает примерно двадцать одновременных постов в пике; ниже этого давление проседает и защита портится.`],
        ["cta", "Подбираете снабжение для сварочного цеха?", "Напишите количество постов, расход и долю времени горения дуги — посчитаем потребление, сосуд и испаритель и покажем, как должно выглядеть разводящее кольцо.", "Заказать расчёт", "/ru/contacts"],
      ],
    },
    "wd",
  ),
  faq: [
    faq(
      "faq-weld-1",
      {
        en: "Can we switch from pure CO₂ to an argon mix without changing equipment?",
        uk: "Чи можна перейти з чистого CO₂ на суміш з аргоном без заміни обладнання?",
        ru: "Можно ли перейти с чистого CO₂ на смесь с аргоном без замены оборудования?",
      },
      {
        en: "The machine and the torch stay the same; the settings do not. A mixture needs different voltage and wire feed speed, and the flow meter has to be recalibrated because it is scaled for a specific gas. Plan a shift for re-tuning the modes and check the first welds before running production work.",
        uk: "Апарат і пальник лишаються ті самі, а налаштування — ні. Суміш потребує іншої напруги й швидкості подачі дроту, а ротаметр треба переградуювати, бо він шкалований під конкретний газ. Закладіть зміну на переналаштування режимів і перевірте перші шви до запуску виробничих виробів.",
        ru: "Аппарат и горелка остаются те же, а настройки — нет. Смесь требует другого напряжения и скорости подачи проволоки, а ротаметр надо переградуировать, потому что он шкалирован под конкретный газ. Заложите смену на перенастройку режимов и проверьте первые швы до запуска производственных изделий.",
      },
    ),
    faq(
      "faq-weld-2",
      {
        en: "Why does the regulator freeze on pure CO₂?",
        uk: "Чому на чистій вуглекислоті обмерзає редуктор?",
        ru: "Почему на чистой углекислоте обмерзает редуктор?",
      },
      {
        en: "Because liquid CO₂ evaporates inside the cylinder as gas is drawn off, and evaporation takes heat from the steel. At high flow the metal drops below zero and the moisture in the air freezes on it. A heated regulator solves it for cylinders; a tank installation solves it with a properly sized vaporizer.",
        uk: "Бо рідкий CO₂ випаровується всередині балона в міру відбору газу, а випаровування забирає тепло зі сталі. На великій витраті метал охолоджується нижче нуля, і волога з повітря намерзає на ньому. Для балонів проблему знімає підігрітий редуктор, для ємності — правильно підібраний випарник.",
        ru: "Потому что жидкий CO₂ испаряется внутри баллона по мере отбора газа, а испарение забирает тепло у стали. При большом расходе металл охлаждается ниже нуля, и влага из воздуха намерзает на нём. Для баллонов проблему снимает подогреваемый редуктор, для ёмкости — правильно подобранный испаритель.",
      },
    ),
  ],
  relatedProducts: [tank20, vap100, vap300],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "CO₂ or Ar/CO₂ mix for welding: comparison, consumption, cylinder count",
      uk: "Вуглекислота чи суміш Ar/CO₂ для зварювання: порівняння й витрата газу",
      ru: "Углекислота или смесь Ar/CO₂ для сварки: сравнение и расход газа",
    },
    metaDescription: {
      en: "How pure CO₂ and argon mixtures differ in spatter, penetration and total cost, how much gas one welding post uses per month, and when a shop should move to a tank.",
      uk: "Чим чиста вуглекислота відрізняється від сумішей з аргоном за розбризкуванням, проплавленням і сумарною вартістю, скільки газу витрачає пост і коли цеху час на ємність.",
      ru: "Чем чистая углекислота отличается от смесей с аргоном по разбрызгиванию, проплавлению и суммарной стоимости, сколько газа тратит пост и когда цеху пора на ёмкость.",
    },
    keywords: {
      en: "CO2 for welding, argon CO2 mix, MAG shielding gas consumption",
      uk: "вуглекислота для зварювання, суміш аргон вуглекислота, витрата захисного газу",
      ru: "углекислота для сварки, смесь аргон углекислота, расход защитного газа",
    },
  },
};

/* ─── Стаття: CO₂ для пивоварні й розливу ──────────────────────────────── */

export const postBeverages: SeedPost = {
  _id: "post-co2-for-beverages",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "CO₂ for a brewery and a bottling line: how much you need and of what purity",
    uk: "CO₂ для пивоварні й лінії розливу: скільки треба і якої чистоти",
    ru: "CO₂ для пивоварни и линии розлива: сколько нужно и какой чистоты",
  },
  slug: {
    en: { current: "co2-for-brewery-and-bottling" },
    uk: { current: "co2-dlya-pyvovarni-ta-rozlyvu" },
    ru: { current: "co2-dlya-pivovarni-i-rozliva" },
  },
  isPublished: true,
  isFeatured: true,
  publishedAt: "2026-09-07T12:30:00Z",
  updatedAt: "2026-09-07T12:30:00Z",
  readingTimeMinutes: 4,
  author: seedAuthor,
  categories: [catSelection],
  tags: ["CO2", "напої", "харчове виробництво"],
  coverImage: img(PHOTO.food, {
    en: "Food production line where carbon dioxide is used in the process",
    uk: "Лінія харчового виробництва, де вуглекислота бере участь у технологічному процесі",
    ru: "Линия пищевого производства, где углекислота участвует в технологическом процессе",
  }),
  excerpt: {
    en: "Carbonation is only a third of the CO₂ a brewery uses. Consumption per hectolitre, where the rest disappears, the purity the product demands, and how to size the tank and vaporizer.",
    uk: "Карбонізація — це лише третина CO₂, який витрачає пивоварня. Витрата на гектолітр, куди зникає решта, якої чистоти вимагає продукт і як підібрати ємність із випарником.",
    ru: "Карбонизация — это лишь треть CO₂, который тратит пивоварня. Расход на гектолитр, куда исчезает остальное, какой чистоты требует продукт и как подобрать ёмкость с испарителем.",
  },
  body: body(
    {
      en: [
        ["p", "Ask a brewer how much CO₂ the plant uses and the answer usually starts with carbonation. Carbonation is the smallest part of it. Most of the gas goes on purging, counter-pressure filling and transfers — and that is also where it is easiest to lose."],
        ["h2", "Where the CO₂ actually goes"],
        ["tbl", "Typical split of CO₂ consumption at a brewery", "Process | Share of consumption | What it does | Purity requirement", "Carbonation | 25–35% | dissolves in the product, 4.5–5.5 g per litre | food grade, ISBT", "Tank and line purging | 25–35% | displaces oxygen before filling | food grade", "Counter-pressure filling | 20–30% | prevents foaming and oxygen pick-up | food grade", "Transfers between vessels | 10–15% | pushes product without a pump | food grade", "Dispensing | 5–10% | keeps carbonation in the keg | food grade"],
        ["p", "Every one of those touches the product or its headspace. That is why the whole plant runs on food-grade CO₂: there is no such thing as «technical gas for purging only» in a beverage line — the purge gas ends up in contact with the beer."],
        ["h2", "How much per hectolitre"],
        ["p", "A well-run plant with recovery uses 0.5–1.5 kg of CO₂ per hectolitre of finished product. A craft brewery without recovery, with frequent small batches and manual transfers, spends 2–4 kg per hectolitre. The gap is not technology — it is the number of purges per litre packaged."],
        ["tbl", "Monthly demand and the equipment behind it", "Output | At 2 kg/hl | At 1 kg/hl | Typical supply", "500 hl/month | 1.0 t | 0.5 t | cylinders or microbulk", "2 000 hl/month | 4.0 t | 2.0 t | tank 10–20 m³", "8 000 hl/month | 16 t | 8 t | tank 20–30 m³", "20 000 hl/month | 40 t | 20 t | tank 50 m³ and above"],
        ["p", `For a plant packaging 8 000 hl a month, a [30 m³ tank](${productPath(tank30, "en")}) holds about 29 tonnes — roughly two months of supply at the efficient rate, or one full road tanker delivery with reserve. That is the ratio worth aiming at: one delivery must fit, and turnover must stay fast enough that boil-off does not eat the margin.`],
        ["img", PHOTO.lab, "Laboratory equipment for incoming inspection of carbon dioxide quality", "Incoming inspection is what turns a supplier certificate into evidence you can show an auditor"],
        ["h2", "Purity: what «food grade» has to mean"],
        ["p", `The reference documents are the ISBT quality guidelines for beverage-grade carbon dioxide and the EIGA specification. They limit not only total purity but individual contaminants — moisture, oxygen, total hydrocarbons, sulphur compounds, acetaldehyde, benzene. A single number like «99.9%» says nothing on its own, because the compounds that ruin taste act at parts-per-million level. We covered the parameter list in a [separate article on ISBT and EIGA requirements](${postPath(postIsbt, "en")}).`],
        ["p", `A supplier certificate covers the batch as it left the filling plant, not what arrived in your tank after a tanker that previously carried something else. A [minimum incoming inspection kit](${productPath(labKit, "en")}) — moisture, oxygen, a sensory check — pays for itself the first time it stops a bad batch before it reaches a fermenter.`],
        ["h2", "Sizing the vaporizer, not just the tank"],
        ["p", `Brewery demand is bursty. A filling line starting up, a tank being purged and a transfer running at the same time can triple the average draw for twenty minutes. Size the vaporizer for that peak: a [300 kg/h unit](${productPath(vap300, "en")}) suits most mid-size plants, while a large bottling operation with several lines needs [1000 kg/h](${productPath(vap1000, "en")}).`],
        ["li", "Measure the peak, not the monthly average divided by hours."],
        ["li", "Remember that an ambient vaporizer loses capacity in frost and needs a standby unit or a switchover pair."],
        ["li", "Keep pressure regulation close to the point of use — a long run from the tank costs you pressure exactly when demand spikes."],
        ["cta", "Planning a supply for a brewery or bottling line?", "Send us your monthly output and packaging format. We will calculate consumption, size the tank and vaporizer, and list what incoming inspection should cover.", "Request a calculation", "/contacts"],
      ],
      uk: [
        ["p", "Запитайте пивовара, скільки CO₂ витрачає виробництво, і відповідь зазвичай починається з карбонізації. Насправді карбонізація — найменша частина. Основний газ іде на продування, ізобаричний розлив і перекачування — і саме там його найлегше втратити."],
        ["h2", "Куди насправді йде CO₂"],
        ["tbl", "Типовий розподіл споживання CO₂ на пивоварні", "Процес | Частка споживання | Що робить | Вимога до чистоти", "Карбонізація | 25–35% | розчиняється в продукті, 4,5–5,5 г на літр | харчова, ISBT", "Продування танків і ліній | 25–35% | витісняє кисень перед наповненням | харчова", "Ізобаричний розлив | 20–30% | не дає піни й підхоплення кисню | харчова", "Перекачування між ємностями | 10–15% | переміщує продукт без насоса | харчова", "Розлив у кегах і подача | 5–10% | утримує карбонізацію | харчова"],
        ["p", "Кожен із цих процесів контактує з продуктом або з газовою подушкою над ним. Тому все виробництво працює на харчовій вуглекислоті: «технічний газ тільки для продування» в лінії напоїв не існує — продувний газ так чи інакше опиняється в контакті з пивом."],
        ["h2", "Скільки на гектолітр"],
        ["p", "Налагоджене виробництво з рекуперацією витрачає 0,5–1,5 кг CO₂ на гектолітр готового продукту. Крафтова пивоварня без рекуперації, з частими малими варками й ручними перекачуваннями, витрачає 2–4 кг на гектолітр. Різниця не в технології, а в кількості продувань на кожен розлитий літр."],
        ["tbl", "Місячна потреба й обладнання під неї", "Обсяг | За 2 кг/гл | За 1 кг/гл | Типове постачання", "500 гл/міс | 1,0 т | 0,5 т | балони або мікробалк", "2 000 гл/міс | 4,0 т | 2,0 т | ємність 10–20 м³", "8 000 гл/міс | 16 т | 8 т | ємність 20–30 м³", "20 000 гл/міс | 40 т | 20 т | ємність 50 м³ і більше"],
        ["p", `Для виробництва, що розливає 8 000 гл на місяць, [ємність на 30 м³](${productPath(tank30, "uk")}) вміщає близько 29 тонн — приблизно два місяці запасу за ощадливої витрати або одна повна поставка автоцистерною із резервом. Саме до такого співвідношення варто прагнути: повна поставка має поміститись, а оборотність — лишатись достатньо швидкою, щоб втрати на випаровування не зʼїдали маржу.`],
        ["img", PHOTO.lab, "Лабораторне обладнання для вхідного контролю якості вуглекислоти", "Вхідний контроль перетворює сертифікат постачальника на доказ, який можна показати аудитору"],
        ["h2", "Чистота: що має означати «харчова»"],
        ["p", `Опорні документи — настанови ISBT щодо якості вуглекислоти для напоїв і специфікація EIGA. Вони обмежують не лише загальну чистоту, а й окремі домішки: вологу, кисень, сумарні вуглеводні, сірковмісні сполуки, ацетальдегід, бензол. Сама по собі цифра на кшталт «99,9%» не каже нічого, бо сполуки, які псують смак, працюють на рівні мільйонних часток. Перелік параметрів ми розібрали в [окремій статті про вимоги ISBT та EIGA](${postPath(postIsbt, "uk")}).`],
        ["p", `Сертифікат постачальника описує партію на момент виходу з наповнювальної станції, а не те, що приїхало у вашу ємність після цистерни, яка перед тим везла щось інше. [Мінімальний комплект вхідного контролю](${productPath(labKit, "uk")}) — волога, кисень, органолептична перевірка — окупається першого ж разу, коли зупинить погану партію до потрапляння у ферментер.`],
        ["h2", "Підбирати треба випарник, а не лише ємність"],
        ["p", `Споживання пивоварні рвучке. Запуск лінії розливу, продування танка й перекачування, які збіглись у часі, здатні втричі перевищити середній відбір на двадцять хвилин. Випарник підбирають саме під цей пік: [апарат на 300 кг/год](${productPath(vap300, "uk")}) закриває більшість середніх виробництв, а великому розливу з кількома лініями потрібен [1000 кг/год](${productPath(vap1000, "uk")}).`],
        ["li", "Міряйте пік, а не місячне споживання, поділене на години."],
        ["li", "Памʼятайте, що атмосферний випарник втрачає продуктивність у мороз і потребує резервного апарата або пари з перемиканням."],
        ["li", "Тримайте редукування ближче до точки споживання — довга траса від ємності забирає тиск саме тоді, коли попит стрибає."],
        ["cta", "Плануєте постачання для пивоварні чи лінії розливу?", "Надішліть місячний обсяг і формат пакування. Порахуємо споживання, підберемо ємність і випарник та складемо перелік того, що має закривати вхідний контроль.", "Замовити розрахунок", "/uk/contacts"],
      ],
      ru: [
        ["p", "Спросите пивовара, сколько CO₂ тратит производство, и ответ обычно начинается с карбонизации. На самом деле карбонизация — наименьшая часть. Основной газ идёт на продувку, изобарический розлив и перекачивание — и именно там его легче всего потерять."],
        ["h2", "Куда на самом деле идёт CO₂"],
        ["tbl", "Типовое распределение потребления CO₂ на пивоварне", "Процесс | Доля потребления | Что делает | Требование к чистоте", "Карбонизация | 25–35% | растворяется в продукте, 4,5–5,5 г на литр | пищевая, ISBT", "Продувка танков и линий | 25–35% | вытесняет кислород перед наполнением | пищевая", "Изобарический розлив | 20–30% | не даёт пены и подхвата кислорода | пищевая", "Перекачивание между ёмкостями | 10–15% | перемещает продукт без насоса | пищевая", "Розлив в кеги и подача | 5–10% | удерживает карбонизацию | пищевая"],
        ["p", "Каждый из этих процессов контактирует с продуктом или с газовой подушкой над ним. Поэтому всё производство работает на пищевой углекислоте: «технического газа только для продувки» в линии напитков не существует — продувочный газ так или иначе оказывается в контакте с пивом."],
        ["h2", "Сколько на гектолитр"],
        ["p", "Налаженное производство с рекуперацией тратит 0,5–1,5 кг CO₂ на гектолитр готового продукта. Крафтовая пивоварня без рекуперации, с частыми малыми варками и ручными перекачиваниями, тратит 2–4 кг на гектолитр. Разница не в технологии, а в количестве продувок на каждый разлитый литр."],
        ["tbl", "Месячная потребность и оборудование под неё", "Объём | При 2 кг/гл | При 1 кг/гл | Типовое снабжение", "500 гл/мес | 1,0 т | 0,5 т | баллоны или микробалк", "2 000 гл/мес | 4,0 т | 2,0 т | ёмкость 10–20 м³", "8 000 гл/мес | 16 т | 8 т | ёмкость 20–30 м³", "20 000 гл/мес | 40 т | 20 т | ёмкость 50 м³ и больше"],
        ["p", `Для производства, разливающего 8 000 гл в месяц, [ёмкость на 30 м³](${productPath(tank30, "ru")}) вмещает около 29 тонн — примерно два месяца запаса при экономном расходе или одна полная поставка автоцистерной с резервом. Именно к такому соотношению стоит стремиться: полная поставка должна поместиться, а оборачиваемость — оставаться достаточно быстрой, чтобы потери на испарение не съедали маржу.`],
        ["img", PHOTO.lab, "Лабораторное оборудование для входного контроля качества углекислоты", "Входной контроль превращает сертификат поставщика в доказательство, которое можно показать аудитору"],
        ["h2", "Чистота: что должно означать «пищевая»"],
        ["p", `Опорные документы — руководства ISBT по качеству углекислоты для напитков и спецификация EIGA. Они ограничивают не только общую чистоту, но и отдельные примеси: влагу, кислород, суммарные углеводороды, серосодержащие соединения, ацетальдегид, бензол. Сама по себе цифра вроде «99,9%» не говорит ничего, потому что соединения, портящие вкус, работают на уровне миллионных долей. Перечень параметров мы разобрали в [отдельной статье о требованиях ISBT и EIGA](${postPath(postIsbt, "ru")}).`],
        ["p", `Сертификат поставщика описывает партию на момент выхода с наполнительной станции, а не то, что приехало в вашу ёмкость после цистерны, которая перед этим везла что-то другое. [Минимальный комплект входного контроля](${productPath(labKit, "ru")}) — влага, кислород, органолептическая проверка — окупается в первый же раз, когда остановит плохую партию до попадания в ферментер.`],
        ["h2", "Подбирать надо испаритель, а не только ёмкость"],
        ["p", `Потребление пивоварни рывковое. Запуск линии розлива, продувка танка и перекачивание, совпавшие во времени, способны втрое превысить средний отбор на двадцать минут. Испаритель подбирают именно под этот пик: [аппарат на 300 кг/ч](${productPath(vap300, "ru")}) закрывает большинство средних производств, а крупному розливу с несколькими линиями нужен [1000 кг/ч](${productPath(vap1000, "ru")}).`],
        ["li", "Меряйте пик, а не месячное потребление, делённое на часы."],
        ["li", "Помните, что атмосферный испаритель теряет производительность в мороз и требует резервного аппарата или пары с переключением."],
        ["li", "Держите редуцирование ближе к точке потребления — длинная трасса от ёмкости забирает давление именно тогда, когда спрос скачет."],
        ["cta", "Планируете снабжение для пивоварни или линии розлива?", "Пришлите месячный объём и формат упаковки. Посчитаем потребление, подберём ёмкость и испаритель и составим перечень того, что должен закрывать входной контроль.", "Заказать расчёт", "/ru/contacts"],
      ],
    },
    "bv",
  ),
  faq: [
    faq(
      "faq-bev-1",
      {
        en: "How much CO₂ dissolves in the beer itself?",
        uk: "Скільки CO₂ розчиняється безпосередньо в пиві?",
        ru: "Сколько CO₂ растворяется непосредственно в пиве?",
      },
      {
        en: "At the usual 2.3–2.8 volumes of carbonation, about 4.5–5.5 grams per litre, or roughly half a kilogram per hectolitre. If the plant is spending three kilograms per hectolitre, five sixths of the gas is going on purging, filling and losses — which is exactly where savings are found.",
        uk: "За звичних 2,3–2,8 обʼєму карбонізації це приблизно 4,5–5,5 грама на літр, тобто близько півкілограма на гектолітр. Якщо виробництво витрачає три кілограми на гектолітр, пʼять шостих газу йде на продування, розлив і втрати — саме там і шукають економію.",
        ru: "При обычных 2,3–2,8 объёма карбонизации это примерно 4,5–5,5 грамма на литр, то есть около полукилограмма на гектолитр. Если производство тратит три килограмма на гектолитр, пять шестых газа уходит на продувку, розлив и потери — именно там и ищут экономию.",
      },
    ),
    faq(
      "faq-bev-2",
      {
        en: "Can technical-grade CO₂ be used for purging only?",
        uk: "Чи можна використовувати технічний CO₂ лише для продування?",
        ru: "Можно ли использовать технический CO₂ только для продувки?",
      },
      {
        en: "No. Purge gas fills the headspace above the product and dissolves into it during filling, so it is in food contact just as much as the carbonation gas. Mixing grades on one site also creates a real risk of the wrong cylinder ending up on the wrong line.",
        uk: "Ні. Продувний газ заповнює простір над продуктом і розчиняється в ньому під час наповнення, тож він контактує з харчовим продуктом так само, як газ для карбонізації. До того ж змішування марок на одному майданчику створює реальний ризик, що не той балон опиниться не на тій лінії.",
        ru: "Нет. Продувочный газ заполняет пространство над продуктом и растворяется в нём при наполнении, поэтому он контактирует с пищевым продуктом так же, как газ для карбонизации. К тому же смешение марок на одной площадке создаёт реальный риск, что не тот баллон окажется не на той линии.",
      },
    ),
  ],
  relatedProducts: [tank30, vap300, labKit],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "CO₂ for a brewery: consumption per hectolitre, purity and equipment",
      uk: "CO₂ для пивоварні: витрата на гектолітр, чистота й обладнання",
      ru: "CO₂ для пивоварни: расход на гектолитр, чистота и оборудование",
    },
    metaDescription: {
      en: "Where a brewery's CO₂ really goes, 0.5–4 kg per hectolitre explained, tank and vaporizer sizing by monthly output, and what food-grade purity has to cover.",
      uk: "Куди насправді йде CO₂ на пивоварні, звідки беруться 0,5–4 кг на гектолітр, підбір ємності й випарника за обсягом та що має закривати харчова чистота.",
      ru: "Куда на самом деле идёт CO₂ на пивоварне, откуда берутся 0,5–4 кг на гектолитр, подбор ёмкости и испарителя по объёму и что должна закрывать пищевая чистота.",
    },
    keywords: {
      en: "CO2 for brewery, beverage carbonation CO2 consumption, food grade CO2",
      uk: "CO2 для пива, карбонізація напоїв, харчова вуглекислота",
      ru: "CO2 для пива, карбонизация напитков, пищевая углекислота",
    },
  },
};

/* ─── Стаття: CO₂ для виробництва сухого льоду ─────────────────────────── */

export const postDryIce: SeedPost = {
  _id: "post-co2-for-dry-ice",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "How much liquid CO₂ a tonne of dry ice takes",
    uk: "Скільки рідкого CO₂ потрібно на тонну сухого льоду",
    ru: "Сколько жидкого CO₂ нужно на тонну сухого льда",
  },
  slug: {
    en: { current: "liquid-co2-per-tonne-of-dry-ice" },
    uk: { current: "skilky-ridkogo-co2-na-tonnu-suhogo-lodu" },
    ru: { current: "skolko-zhidkogo-co2-na-tonnu-suhogo-lda" },
  },
  isPublished: true,
  isFeatured: false,
  publishedAt: "2026-09-07T13:00:00Z",
  updatedAt: "2026-09-07T13:00:00Z",
  readingTimeMinutes: 4,
  author: seedAuthor,
  categories: [catSelection],
  tags: ["CO2", "сухий лід", "виробництво"],
  coverImage: img(PHOTO.dryIce, {
    en: "Dry ice pellets produced from liquid carbon dioxide",
    uk: "Гранули сухого льоду, виготовлені з рідкого діоксиду вуглецю",
    ru: "Гранулы сухого льда, изготовленные из жидкого диоксида углерода",
  }),
  excerpt: {
    en: "A pelletizer turns less than half of the liquid it receives into dry ice — the rest flashes off as gas. What that means for the raw material bill, the tank size and the pressure at the inlet.",
    uk: "Гранулятор перетворює на сухий лід менш ніж половину рідини, яку отримує, — решта миттєво випаровується. Що це означає для рахунку за сировину, обʼєму ємності та тиску на вході.",
    ru: "Гранулятор превращает в сухой лёд меньше половины жидкости, которую получает, — остальное мгновенно испаряется. Что это значит для счёта за сырьё, объёма ёмкости и давления на входе.",
  },
  body: body(
    {
      en: [
        ["p", "Dry ice is solid carbon dioxide, and it is made from the same liquid CO₂ that a brewery or a welding shop buys. The surprise for anyone planning a workshop is the conversion ratio: you do not get a kilogram of pellets from a kilogram of liquid."],
        ["h2", "Why less than half of it becomes ice"],
        ["p", "Liquid CO₂ arrives at the pelletizer at about 20 bar and −20 °C. When it is released to atmospheric pressure, part of it flashes into gas, and the heat that evaporation removes freezes the rest into snow at −78.5 °C. The snow is then pressed into pellets or blocks."],
        ["p", "The physics fixes the split at roughly 40–45% snow and 55–60% flash gas. In practice that means **2.2–2.5 kg of liquid CO₂ per kilogram of dry ice** if the flash gas is simply vented. Plants that return the flash gas to a liquefaction unit bring the figure down towards 1.1–1.2, but that requires a recovery system, not just a pelletizer."],
        ["tbl", "Liquid CO₂ demand by pelletizer capacity, without flash gas recovery", "Pellet output | Liquid CO₂ | Per 8-hour shift | Per month, 22 shifts", "100 kg/h | 230 kg/h | 1.8 t | 40 t", "200 kg/h | 460 kg/h | 3.7 t | 81 t", "300 kg/h | 690 kg/h | 5.5 t | 121 t", "400 kg/h | 920 kg/h | 7.4 t | 162 t"],
        ["p", `The numbers on the right are why a dry ice workshop is a heavy consumer even at modest output. A [50 m³ tank](${productPath(tank50, "en")}) holds about 48 tonnes — under two weeks of supply for a 200 kg/h line running full shifts. Storage here is sized around the delivery schedule far more tightly than in most other applications.`],
        ["img", PHOTO.fans, "Forced draft vaporizer with fans for high continuous gas demand", "Continuous liquid draw-off cools the tank, so pressure has to be maintained deliberately"],
        ["h2", "Pressure is the parameter that breaks first"],
        ["p", "A pelletizer needs liquid delivered within a narrow pressure band, typically around 18–21 bar. Continuous heavy draw-off cools the tank contents and the pressure drops — and a pelletizer fed below its band starts producing soft, low-density pellets that sublimate faster in the customer's box."],
        ["li", "A pressure building coil, sized for the continuous flow rather than the average."],
        ["li", "Insulated liquid lines kept as short as the layout allows."],
        ["li", "A vent line for the flash gas, routed outdoors — this is a large, continuous gas flow, not a trickle."],
        ["li", "Gas detection in the workshop, because both the pelletizer and the stored product release CO₂ continuously."],
        ["h2", "Purity: the ice inherits it from the liquid"],
        ["p", `Dry ice used for food cooling, transporting pharmaceuticals or blasting food equipment is in contact with the product, so the liquid CO₂ behind it has to be food grade to ISBT. Nothing in the pelletizing process removes contamination — whatever is in the liquid ends up in the pellet and then sublimates directly onto the product. [Incoming inspection](${productPath(labKit, "en")}) belongs at the tank, before the liquid reaches the machine.`],
        ["p", `In Ukraine dry ice is produced industrially by, among others, [IceLab](${ICELAB.en}) — plants in Kyiv and Lviv with an output of up to 400 kg/h and a 60-tonne raw material store. That store is the point: at that capacity the CO₂ supply has to be sized as a continuous industrial feed, not as a periodic purchase.`],
        ["h2", "What to work out before ordering a pelletizer"],
        ["no", "The pellet output you actually need per shift, including seasonal peaks."],
        ["no", "Liquid CO₂ demand at 2.2–2.5 kg per kilogram of ice, unless you are also buying recovery."],
        ["no", "Storage volume that takes one full tanker delivery with a working reserve."],
        ["no", "Continuous flow rate and the pressure building capacity that holds the inlet band."],
        ["no", "Ventilation and gas detection for the workshop and the storage room."],
        ["cta", "Planning a dry ice workshop?", "Send us the pelletizer capacity and shift pattern. We will size the tank, the pressure building system and the piping, and tell you what the delivery schedule has to look like.", "Discuss the project", "/contacts"],
      ],
      uk: [
        ["p", "Сухий лід — це твердий діоксид вуглецю, і роблять його з того самого рідкого CO₂, який купує пивоварня чи зварювальний цех. Несподіванкою для тих, хто планує цех, стає коефіцієнт переробки: з кілограма рідини кілограма гранул не виходить."],
        ["h2", "Чому льодом стає менше половини"],
        ["p", "Рідкий CO₂ приходить до гранулятора під тиском близько 20 бар за температури −20 °C. Коли його випускають до атмосферного тиску, частина миттєво переходить у газ, а тепло, яке забирає це випаровування, заморожує решту в сніг із температурою −78,5 °C. Далі сніг пресують у гранули або блоки."],
        ["p", "Фізика фіксує співвідношення приблизно на рівні 40–45% снігу і 55–60% газу миттєвого скипання. На практиці це означає **2,2–2,5 кг рідкого CO₂ на кілограм сухого льоду**, якщо газ скипання просто стравлюють. Виробництва, які повертають цей газ на зрідження, знижують показник до 1,1–1,2 — але для цього потрібна система рекуперації, а не самий лише гранулятор."],
        ["tbl", "Потреба в рідкому CO₂ за продуктивністю гранулятора, без рекуперації газу скипання", "Вихід гранул | Рідкого CO₂ | За зміну 8 год | За місяць, 22 зміни", "100 кг/год | 230 кг/год | 1,8 т | 40 т", "200 кг/год | 460 кг/год | 3,7 т | 81 т", "300 кг/год | 690 кг/год | 5,5 т | 121 т", "400 кг/год | 920 кг/год | 7,4 т | 162 т"],
        ["p", `Цифри в правій колонці й пояснюють, чому цех сухого льоду — важкий споживач навіть за скромного випуску. [Ємність на 50 м³](${productPath(tank50, "uk")}) вміщає близько 48 тонн — це менше двох тижнів запасу для лінії 200 кг/год на повних змінах. Обʼєм зберігання тут підбирають під графік поставок значно жорсткіше, ніж у більшості інших застосувань.`],
        ["img", PHOTO.fans, "Випарник примусової дії з вентиляторами для великого безперервного відбору газу", "Безперервний відбір рідини охолоджує ємність, тож тиск доводиться підтримувати цілеспрямовано"],
        ["h2", "Тиск — параметр, який ламається першим"],
        ["p", "Гранулятору потрібна рідина у вузькому діапазоні тиску, зазвичай близько 18–21 бар. Тривалий великий відбір охолоджує вміст ємності, і тиск падає — а гранулятор, який отримує рідину нижче свого діапазону, починає видавати мʼяку гранулу низької щільності, що швидше сублімує вже в термобоксі клієнта."],
        ["li", "Змійовик підняття тиску, підібраний під безперервну витрату, а не під середню."],
        ["li", "Ізольовані рідинні лінії, максимально короткі за компонуванням."],
        ["li", "Лінія скидання газу скипання, виведена назовні: це великий безперервний потік, а не цівка."],
        ["li", "Газоаналіз у цеху, бо CO₂ безперервно виділяють і гранулятор, і складований продукт."],
        ["h2", "Чистота: лід успадковує її від рідини"],
        ["p", `Сухий лід для охолодження харчових продуктів, перевезення фармацевтики чи очищення харчового обладнання контактує з продуктом, тож рідкий CO₂ за ним має бути харчовим за ISBT. Ніщо в процесі грануляції не очищує газ — усе, що є в рідині, потрапляє в гранулу, а потім сублімує просто на продукт. [Вхідний контроль](${productPath(labKit, "uk")}) має стояти біля ємності, до того як рідина дійде до машини.`],
        ["p", `В Україні сухий лід у промислових обсягах виробляє, зокрема, [IceLab](${ICELAB.uk}) — виробництва в Києві та Львові з потужністю до 400 кг/год і складом сировини на 60 тонн. Саме цей склад тут показовий: за такої продуктивності постачання CO₂ доводиться будувати як безперервне промислове живлення, а не як періодичну закупівлю.`],
        ["h2", "Що порахувати до замовлення гранулятора"],
        ["no", "Реальний потрібний вихід гранул за зміну, включно із сезонними піками."],
        ["no", "Потребу в рідкому CO₂ за нормою 2,2–2,5 кг на кілограм льоду, якщо ви не купуєте ще й рекуперацію."],
        ["no", "Обʼєм зберігання, який приймає одну повну автоцистерну з робочим резервом."],
        ["no", "Безперервну витрату й продуктивність системи підняття тиску, яка утримує вхідний діапазон."],
        ["no", "Вентиляцію та газоаналіз для цеху й для складу готового продукту."],
        ["cta", "Плануєте цех сухого льоду?", "Надішліть продуктивність гранулятора й режим змін. Підберемо ємність, систему підняття тиску та обвʼязку й скажемо, яким має бути графік поставок.", "Обговорити проєкт", "/uk/contacts"],
      ],
      ru: [
        ["p", "Сухой лёд — это твёрдый диоксид углерода, и делают его из того же жидкого CO₂, который покупает пивоварня или сварочный цех. Неожиданностью для тех, кто планирует цех, становится коэффициент переработки: из килограмма жидкости килограмма гранул не выходит."],
        ["h2", "Почему льдом становится меньше половины"],
        ["p", "Жидкий CO₂ приходит к гранулятору под давлением около 20 бар при температуре −20 °C. Когда его выпускают до атмосферного давления, часть мгновенно переходит в газ, а тепло, которое забирает это испарение, замораживает остальное в снег с температурой −78,5 °C. Дальше снег прессуют в гранулы или блоки."],
        ["p", "Физика фиксирует соотношение примерно на уровне 40–45% снега и 55–60% газа мгновенного вскипания. На практике это означает **2,2–2,5 кг жидкого CO₂ на килограмм сухого льда**, если газ вскипания просто стравливают. Производства, возвращающие этот газ на сжижение, снижают показатель до 1,1–1,2 — но для этого нужна система рекуперации, а не один лишь гранулятор."],
        ["tbl", "Потребность в жидком CO₂ по производительности гранулятора, без рекуперации газа вскипания", "Выход гранул | Жидкого CO₂ | За смену 8 ч | За месяц, 22 смены", "100 кг/ч | 230 кг/ч | 1,8 т | 40 т", "200 кг/ч | 460 кг/ч | 3,7 т | 81 т", "300 кг/ч | 690 кг/ч | 5,5 т | 121 т", "400 кг/ч | 920 кг/ч | 7,4 т | 162 т"],
        ["p", `Цифры в правой колонке и объясняют, почему цех сухого льда — тяжёлый потребитель даже при скромном выпуске. [Ёмкость на 50 м³](${productPath(tank50, "ru")}) вмещает около 48 тонн — это меньше двух недель запаса для линии 200 кг/ч на полных сменах. Объём хранения здесь подбирают под график поставок значительно жёстче, чем в большинстве других применений.`],
        ["img", PHOTO.fans, "Испаритель принудительного действия с вентиляторами для большого непрерывного отбора газа", "Непрерывный отбор жидкости охлаждает ёмкость, поэтому давление приходится поддерживать целенаправленно"],
        ["h2", "Давление — параметр, который ломается первым"],
        ["p", "Гранулятору нужна жидкость в узком диапазоне давления, обычно около 18–21 бар. Длительный большой отбор охлаждает содержимое ёмкости, и давление падает — а гранулятор, получающий жидкость ниже своего диапазона, начинает выдавать мягкую гранулу низкой плотности, которая быстрее сублимирует уже в термобоксе клиента."],
        ["li", "Змеевик подъёма давления, подобранный под непрерывный расход, а не под средний."],
        ["li", "Изолированные жидкостные линии, максимально короткие по компоновке."],
        ["li", "Линия сброса газа вскипания, выведенная наружу: это большой непрерывный поток, а не струйка."],
        ["li", "Газоанализ в цехе, потому что CO₂ непрерывно выделяют и гранулятор, и складируемый продукт."],
        ["h2", "Чистота: лёд наследует её от жидкости"],
        ["p", `Сухой лёд для охлаждения пищевых продуктов, перевозки фармацевтики или очистки пищевого оборудования контактирует с продуктом, поэтому жидкий CO₂ за ним должен быть пищевым по ISBT. Ничто в процессе грануляции не очищает газ — всё, что есть в жидкости, попадает в гранулу, а потом сублимирует прямо на продукт. [Входной контроль](${productPath(labKit, "ru")}) должен стоять у ёмкости, до того как жидкость дойдёт до машины.`],
        ["p", `В Украине сухой лёд в промышленных объёмах производит, в частности, [IceLab](${ICELAB.ru}) — производства в Киеве и Львове с мощностью до 400 кг/ч и складом сырья на 60 тонн. Именно этот склад здесь показателен: при такой производительности снабжение CO₂ приходится строить как непрерывное промышленное питание, а не как периодическую закупку.`],
        ["h2", "Что посчитать до заказа гранулятора"],
        ["no", "Реальный нужный выход гранул за смену, включая сезонные пики."],
        ["no", "Потребность в жидком CO₂ по норме 2,2–2,5 кг на килограмм льда, если вы не покупаете ещё и рекуперацию."],
        ["no", "Объём хранения, который принимает одну полную автоцистерну с рабочим резервом."],
        ["no", "Непрерывный расход и производительность системы подъёма давления, удерживающей входной диапазон."],
        ["no", "Вентиляцию и газоанализ для цеха и для склада готового продукта."],
        ["cta", "Планируете цех сухого льда?", "Пришлите производительность гранулятора и режим смен. Подберём ёмкость, систему подъёма давления и обвязку и скажем, каким должен быть график поставок.", "Обсудить проект", "/ru/contacts"],
      ],
    },
    "di",
  ),
  faq: [
    faq(
      "faq-dryice-1",
      {
        en: "Why does a kilogram of dry ice take more than two kilograms of liquid CO₂?",
        uk: "Чому на кілограм сухого льоду йде понад два кілограми рідкого CO₂?",
        ru: "Почему на килограмм сухого льда уходит больше двух килограммов жидкого CO₂?",
      },
      {
        en: "Because the freezing is done by the CO₂ itself. Releasing the liquid to atmospheric pressure evaporates part of it, and that evaporation removes the heat needed to freeze the remainder. Roughly 55–60% leaves as gas and 40–45% stays as snow. Flash gas recovery returns most of the vented part to the process.",
        uk: "Бо заморожує сам же CO₂. Випуск рідини до атмосферного тиску випаровує її частину, і саме це випаровування забирає тепло, потрібне для заморожування решти. Приблизно 55–60% іде газом, 40–45% лишається снігом. Рекуперація повертає більшу частину стравленого назад у процес.",
        ru: "Потому что замораживает сам же CO₂. Выпуск жидкости до атмосферного давления испаряет её часть, и именно это испарение забирает тепло, нужное для замораживания остального. Примерно 55–60% уходит газом, 40–45% остаётся снегом. Рекуперация возвращает большую часть стравленного обратно в процесс.",
      },
    ),
    faq(
      "faq-dryice-2",
      {
        en: "Does dry ice have to be made from food-grade CO₂?",
        uk: "Чи обовʼязково робити сухий лід із харчової вуглекислоти?",
        ru: "Обязательно ли делать сухой лёд из пищевой углекислоты?",
      },
      {
        en: "If the ice will touch food, packaging, pharmaceuticals or equipment that touches them — yes. Pelletizing does not purify anything: contaminants in the liquid end up in the pellet and sublimate straight onto whatever the ice is cooling. For purely industrial cooling with no product contact the requirement is lower, but keeping one grade on site is simpler and safer.",
        uk: "Якщо лід контактуватиме з продуктами, пакуванням, фармацевтикою чи обладнанням, яке їх торкається, — так. Грануляція нічого не очищує: домішки з рідини потрапляють у гранулу й сублімують просто на те, що лід охолоджує. Для суто технічного охолодження без контакту з продуктом вимоги нижчі, але тримати на майданчику одну марку простіше й безпечніше.",
        ru: "Если лёд будет контактировать с продуктами, упаковкой, фармацевтикой или оборудованием, которое их касается, — да. Грануляция ничего не очищает: примеси из жидкости попадают в гранулу и сублимируют прямо на то, что лёд охлаждает. Для чисто технического охлаждения без контакта с продуктом требования ниже, но держать на площадке одну марку проще и безопаснее.",
      },
    ),
  ],
  relatedProducts: [tank50, tank30, labKit],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "Liquid CO₂ per tonne of dry ice: conversion ratio and tank sizing",
      uk: "Скільки рідкого CO₂ на тонну сухого льоду: норма витрати й підбір ємності",
      ru: "Сколько жидкого CO₂ на тонну сухого льда: норма расхода и подбор ёмкости",
    },
    metaDescription: {
      en: "A pelletizer needs 2.2–2.5 kg of liquid CO₂ per kilogram of pellets. Demand tables by capacity, the inlet pressure band, and what the workshop needs besides the machine.",
      uk: "Гранулятору потрібно 2,2–2,5 кг рідкого CO₂ на кілограм гранул. Таблиці потреби за продуктивністю, діапазон тиску на вході й що потрібно цеху крім машини.",
      ru: "Гранулятору нужно 2,2–2,5 кг жидкого CO₂ на килограмм гранул. Таблицы потребности по производительности, диапазон давления на входе и что нужно цеху кроме машины.",
    },
    keywords: {
      en: "dry ice production CO2 consumption, pelletizer liquid CO2, dry ice plant",
      uk: "виробництво сухого льоду CO2, гранулятор сухого льоду, витрата рідкого CO2",
      ru: "производство сухого льда CO2, гранулятор сухого льда, расход жидкого CO2",
    },
  },
};

export const applicationPosts: SeedPost[] = [postWelding, postBeverages, postDryIce];
