/**
 * Блог: балонний кластер.
 *
 * Теми взяті з реального попиту (Google Suggest, вересень 2026): «скільки кг
 * вуглекислоти в балоні 40 л», «вуглекислота балон ціна», «углекислота цвет
 * баллона». Це верх воронки: людина ще купує балони, але вже рахує, скільки
 * їх треба. Звідси — прямий місток на кріоциліндри та стаціонарні ємності.
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
  catQuality,
  catSelection,
  seedAuthor,
  seedProduct,
  type SeedPost,
} from "./blog.ts";
import { tankCategories } from "./tanks.ts";
import { cylinderCategories } from "./equipment.ts";

const catTanksCo2 = tankCategories.find((c) => c._id === "cat-tanks-co2")!;
const catCylN2 = cylinderCategories.find((c) => c._id === "cat-cylinders-n2")!;

const tank10 = seedProduct("product-tank-co2-10");
const tank20 = seedProduct("product-tank-co2-20");
const cylN2 = seedProduct("product-cylinder-n2");

const PHOTO = {
  cylinderFrame: "/images/catalog/cryogenic-cylinder-stainless-frame.webp",
  cylinderN2: "/images/catalog/cryogenic-cylinder-nitrogen.webp",
  microbulk: "/images/catalog/microbulk-tank-with-piping.webp",
  tanksRow: "/images/equipmentAndSystemsPage/criogenicTanks/imageTwo.webp",
};

/* ─── Стаття: скільки CO₂ в балоні ─────────────────────────────────────── */

export const postCylinderCapacity: SeedPost = {
  _id: "post-co2-cylinder-capacity",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "How much CO₂ is really in a cylinder, and when to move to a tank",
    uk: "Скільки CO₂ насправді в балоні та коли час переходити на ємність",
    ru: "Сколько CO₂ на самом деле в баллоне и когда пора переходить на ёмкость",
  },
  slug: {
    en: { current: "how-much-co2-in-a-cylinder" },
    uk: { current: "skilky-co2-u-baloni" },
    ru: { current: "skolko-co2-v-ballone" },
  },
  isPublished: true,
  isFeatured: true,
  publishedAt: "2026-09-07T10:00:00Z",
  updatedAt: "2026-09-07T10:00:00Z",
  readingTimeMinutes: 4,
  author: seedAuthor,
  categories: [catSelection],
  tags: ["CO2", "балони", "розрахунок"],
  coverImage: img(PHOTO.cylinderFrame, {
    en: "Cryogenic cylinders in a stainless steel frame on a customer site",
    uk: "Кріоциліндри в неіржавній рамі на майданчику замовника",
    ru: "Криоцилиндры в нержавеющей раме на площадке заказчика",
  }),
  excerpt: {
    en: "A 40-litre cylinder does not hold 40 kg. Here is how much CO₂ each size really carries, how many cylinders your consumption burns through, and the point where a tank starts to cost less.",
    uk: "У 40-літровому балоні немає 40 кг. Розбираємо, скільки CO₂ реально в кожному типорозмірі, скільки балонів «зʼїдає» ваше споживання і де починається точка, після якої ємність дешевша.",
    ru: "В 40-литровом баллоне нет 40 кг. Разбираем, сколько CO₂ реально в каждом типоразмере, сколько баллонов «съедает» ваше потребление и где начинается точка, после которой ёмкость дешевле.",
  },
  body: body(
    {
      en: [
        ["p", "«How many kilograms are in a 40-litre cylinder?» is one of the most common questions we get. The answer confuses people because a cylinder is measured in litres of water capacity, while the gas inside is sold by the kilogram — and the two numbers are not the same."],
        ["h2", "Litres of the shell, kilograms of the product"],
        ["p", "The number stamped on the neck — 10, 20, 40, 50 — is the **water capacity** of the steel shell, not the mass of CO₂. Carbon dioxide is liquefied under pressure, and the filling ratio is limited by the cylinder's test pressure: roughly 0.6 to 0.75 kg per litre. Overfilling is dangerous, so a filling station will never give you «40 kg in 40 litres»."],
        ["tbl", "Filling ratio 0.6–0.75 kg/l; 1 kg of CO₂ gives about 0.54 m³ of gas at 15 °C and 1 bar", "Cylinder (water capacity) | CO₂ mass | Gas released | Gross weight", "10 l | 6–7 kg | 3.2–3.8 m³ | ~22 kg", "20 l | 12–14 kg | 6.5–7.6 m³ | ~40 kg", "40 l | 24–28 kg | 13–15 m³ | ~85 kg", "50 l | 30–35 kg | 16–19 m³ | ~105 kg"],
        ["p", "Two practical consequences. First, when you compare supplier quotes, compare the price per kilogram of CO₂, not per cylinder. Second, one or two kilograms always stay in the cylinder as an unusable heel and go back to the filler — you paid for gas you never used."],
        ["h2", "How many cylinders your production actually burns"],
        ["p", "Take a 40-litre cylinder at 24 kg as the working unit and divide your monthly consumption by it. The result is usually higher than people expect."],
        ["tbl", "One 40 l cylinder ≈ 24 kg of CO₂", "Consumption | Cylinders per month | Swaps per week | What it means in practice", "100 kg | 4 | 1 | Cylinders are comfortable", "500 kg | 21 | 5 | Still workable, storage starts to hurt", "1 t | 42 | 10 | Two swaps every working day", "3 t | 125 | 29 | A dedicated person on cylinders alone", "10 t | 417 | 96 | Only a stationary tank makes sense"],
        ["p", "At around one tonne a month the logistics stop being background noise. Someone rolls cylinders, someone signs delivery notes, the line stops while a cylinder is being changed, and the yard permanently holds two sets — full and empty."],
        ["img", PHOTO.microbulk, "Microbulk tank with piping and a vaporizer installed next to a production building", "A microbulk vessel is the intermediate step between cylinders and a large stationary tank"],
        ["h2", "The costs that never appear on the invoice"],
        ["li", "The heel: 1–2 kg per cylinder, which is 4–8% of the contents."],
        ["li", "Manual handling. A full 40 l cylinder weighs about 85 kg and must be moved, secured and connected."],
        ["li", "Downtime at every swap, multiplied by the number of swaps."],
        ["li", "Deposit or rent on the cylinder fleet, plus the space to store two sets of them."],
        ["li", "Pressure drop at the end of a cylinder, which shows up as unstable process parameters before anyone notices the cylinder is empty."],
        ["h2", "What the next step looks like"],
        ["p", `For nitrogen, oxygen and argon the intermediate format is a cryogenic cylinder: a vacuum-insulated vessel of 180–500 litres that holds liquefied gas and replaces a whole pack of pressure cylinders — see [cryogenic cylinders](${categoryPath(catCylN2, "en")}). For CO₂ the usual next step is a [stationary tank](${categoryPath(catTanksCo2, "en")}) from 10 m³, which holds about 9.5 tonnes and is refilled by road tanker.`],
        ["tbl", "", "Format | Typical consumption | Inside | Servicing", "40 l cylinders | up to 300 kg/month | gas under 50–60 bar | manual swap", "Cryogenic cylinder 180–500 l | 0.3–1.5 t/month | liquefied gas | swap every 1–3 weeks", "Stationary tank 10–30 m³ | from 2 t/month | 9.5–29 t of liquid | tanker refill on schedule"],
        ["h2", "How to find your own break-even point"],
        ["no", "Pull the delivery notes for the last three months and add up the kilograms, not the cylinders."],
        ["no", "Divide the total invoice by those kilograms — that is your real price per kilogram, heel included."],
        ["no", "Add the hours your staff spend on swaps and the cost of the downtime around them."],
        ["no", "Compare the result with a tank: bulk CO₂ delivered by tanker is normally two to four times cheaper per kilogram."],
        ["p", `In most cases the arithmetic turns at somewhere between one and two tonnes a month. Below that, cylinders win on simplicity; above it, a [10–20 m³ tank](${productPath(tank10, "en")}) pays for itself in a year or two on the price of gas alone.`],
        ["cta", "Not sure which format fits?", "Send us three months of delivery notes. We will calculate your real price per kilogram and show at what volume a tank starts to pay off.", "Request a calculation", "/contacts"],
      ],
      uk: [
        ["p", "«Скільки кілограмів у балоні на 40 літрів?» — одне з найчастіших питань, які нам ставлять. Плутанина виникає тому, що балон міряють у літрах водяної місткості, а газ усередині продають у кілограмах, і це різні числа."],
        ["h2", "Літри — це оболонка, кілограми — продукт"],
        ["p", "Цифра на горловині — 10, 20, 40, 50 — це **водяна місткість** сталевої оболонки, а не маса CO₂. Вуглекислота зріджена під тиском, і норма наповнення обмежена випробувальним тиском балона: приблизно 0,6–0,75 кг на літр. Перенаповнення небезпечне, тож «40 кг у 40 літрах» вам не наллє жодна заправна станція."],
        ["tbl", "Норма наповнення 0,6–0,75 кг/л; 1 кг CO₂ дає близько 0,54 м³ газу за 15 °C і 1 бар", "Балон (водяна місткість) | Маса CO₂ | Газу на виході | Маса брутто", "10 л | 6–7 кг | 3,2–3,8 м³ | ~22 кг", "20 л | 12–14 кг | 6,5–7,6 м³ | ~40 кг", "40 л | 24–28 кг | 13–15 м³ | ~85 кг", "50 л | 30–35 кг | 16–19 м³ | ~105 кг"],
        ["p", "Звідси два практичні висновки. Перший: порівнюючи пропозиції постачальників, порівнюйте ціну за кілограм CO₂, а не за балон. Другий: один-два кілограми завжди лишаються в балоні як невибірний залишок і їдуть назад до заправника — ви заплатили за газ, якого не отримали."],
        ["h2", "Скільки балонів насправді зʼїдає виробництво"],
        ["p", "Візьміть за робочу одиницю 40-літровий балон із 24 кг і поділіть на нього місячне споживання. Результат зазвичай виходить більший, ніж очікують."],
        ["tbl", "Один балон 40 л ≈ 24 кг CO₂", "Споживання | Балонів на місяць | Замін на тиждень | Що це означає на практиці", "100 кг | 4 | 1 | З балонами комфортно", "500 кг | 21 | 5 | Ще працює, але склад уже заважає", "1 т | 42 | 10 | Дві заміни щоробочого дня", "3 т | 125 | 29 | Окрема людина тільки на балонах", "10 т | 417 | 96 | Має сенс лише стаціонарна ємність"],
        ["p", "Приблизно на тонні на місяць логістика перестає бути фоновим шумом. Хтось котить балони, хтось підписує накладні, лінія стоїть під час заміни, а на майданчику постійно лежать два комплекти — повний і порожній."],
        ["img", PHOTO.microbulk, "Мікробалк-ємність із обвʼязкою та випарником біля виробничого корпусу", "Мікробалк — проміжна ланка між балонами й великою стаціонарною ємністю"],
        ["h2", "Витрати, яких немає в рахунку"],
        ["li", "Невибірний залишок: 1–2 кг на балон, тобто 4–8% вмісту."],
        ["li", "Ручна праця. Повний 40-літровий балон важить близько 85 кг — його треба перемістити, закріпити й підʼєднати."],
        ["li", "Простій на кожній заміні, помножений на кількість замін."],
        ["li", "Застава або оренда балонного парку плюс місце під зберігання двох комплектів."],
        ["li", "Просідання тиску наприкінці балона: параметри процесу «пливуть» раніше, ніж хтось помічає, що балон порожній."],
        ["h2", "Як виглядає наступний крок"],
        ["p", `Для азоту, кисню й аргону проміжний формат — кріоциліндр: вакуумно-ізольована посудина на 180–500 літрів зі зрідженим газом, яка замінює цілий пакет балонів під тиском, див. [кріоциліндри](${categoryPath(catCylN2, "uk")}). Для CO₂ наступний крок зазвичай одразу [стаціонарна ємність](${categoryPath(catTanksCo2, "uk")}) від 10 м³ — це близько 9,5 тонни, які привозить автоцистерна.`],
        ["tbl", "", "Формат | Типове споживання | Що всередині | Обслуговування", "Балони 40 л | до 300 кг/міс | газ під тиском 50–60 бар | заміна вручну", "Кріоциліндр 180–500 л | 0,3–1,5 т/міс | зріджений газ | заміна раз на 1–3 тижні", "Стаціонарна ємність 10–30 м³ | від 2 т/міс | 9,5–29 т рідини | заправка автоцистерною за графіком"],
        ["h2", "Як порахувати власну точку переходу"],
        ["no", "Підніміть накладні за останні три місяці й складіть кілограми, а не балони."],
        ["no", "Поділіть суму рахунків на ці кілограми — це ваша реальна ціна за кілограм разом із залишком."],
        ["no", "Додайте години, які персонал витрачає на заміни, і вартість простоїв навколо них."],
        ["no", "Порівняйте результат із ємністю: газ, привезений автоцистерною, зазвичай у два-чотири рази дешевший за кілограм."],
        ["p", `У більшості випадків арифметика перевертається десь між однією і двома тоннами на місяць. Нижче цієї межі виграють балони простотою; вище — [ємність на 10–20 м³](${productPath(tank10, "uk")}) окупається за рік-два самою лише ціною газу.`],
        ["cta", "Не впевнені, який формат ваш?", "Надішліть накладні за три місяці. Порахуємо реальну ціну за кілограм і покажемо, з якого обсягу ємність починає окупатись.", "Замовити розрахунок", "/uk/contacts"],
      ],
      ru: [
        ["p", "«Сколько килограммов в баллоне на 40 литров?» — один из самых частых вопросов, которые нам задают. Путаница возникает потому, что баллон меряют в литрах водяной вместимости, а газ внутри продают в килограммах, и это разные числа."],
        ["h2", "Литры — это оболочка, килограммы — продукт"],
        ["p", "Цифра на горловине — 10, 20, 40, 50 — это **водяная вместимость** стальной оболочки, а не масса CO₂. Углекислота сжижена под давлением, и норма наполнения ограничена испытательным давлением баллона: примерно 0,6–0,75 кг на литр. Перенаполнение опасно, поэтому «40 кг в 40 литрах» вам не нальёт ни одна заправочная станция."],
        ["tbl", "Норма наполнения 0,6–0,75 кг/л; 1 кг CO₂ даёт около 0,54 м³ газа при 15 °C и 1 бар", "Баллон (водяная вместимость) | Масса CO₂ | Газа на выходе | Масса брутто", "10 л | 6–7 кг | 3,2–3,8 м³ | ~22 кг", "20 л | 12–14 кг | 6,5–7,6 м³ | ~40 кг", "40 л | 24–28 кг | 13–15 м³ | ~85 кг", "50 л | 30–35 кг | 16–19 м³ | ~105 кг"],
        ["p", "Отсюда два практических вывода. Первый: сравнивая предложения поставщиков, сравнивайте цену за килограмм CO₂, а не за баллон. Второй: один-два килограмма всегда остаются в баллоне как невыбираемый остаток и уезжают обратно к заправщику — вы заплатили за газ, которого не получили."],
        ["h2", "Сколько баллонов на самом деле съедает производство"],
        ["p", "Возьмите за рабочую единицу 40-литровый баллон с 24 кг и разделите на него месячное потребление. Результат обычно выходит больше, чем ожидают."],
        ["tbl", "Один баллон 40 л ≈ 24 кг CO₂", "Потребление | Баллонов в месяц | Замен в неделю | Что это значит на практике", "100 кг | 4 | 1 | С баллонами комфортно", "500 кг | 21 | 5 | Ещё работает, но склад уже мешает", "1 т | 42 | 10 | Две замены каждый рабочий день", "3 т | 125 | 29 | Отдельный человек только на баллонах", "10 т | 417 | 96 | Имеет смысл только стационарная ёмкость"],
        ["p", "Примерно на тонне в месяц логистика перестаёт быть фоновым шумом. Кто-то катит баллоны, кто-то подписывает накладные, линия стоит во время замены, а на площадке постоянно лежат два комплекта — полный и пустой."],
        ["img", PHOTO.microbulk, "Микробалк-ёмкость с обвязкой и испарителем у производственного корпуса", "Микробалк — промежуточное звено между баллонами и большой стационарной ёмкостью"],
        ["h2", "Расходы, которых нет в счёте"],
        ["li", "Невыбираемый остаток: 1–2 кг на баллон, то есть 4–8% содержимого."],
        ["li", "Ручной труд. Полный 40-литровый баллон весит около 85 кг — его надо переместить, закрепить и подключить."],
        ["li", "Простой на каждой замене, умноженный на количество замен."],
        ["li", "Залог или аренда баллонного парка плюс место под хранение двух комплектов."],
        ["li", "Просадка давления в конце баллона: параметры процесса «плывут» раньше, чем кто-то заметит, что баллон пуст."],
        ["h2", "Как выглядит следующий шаг"],
        ["p", `Для азота, кислорода и аргона промежуточный формат — криоцилиндр: вакуумно-изолированный сосуд на 180–500 литров со сжиженным газом, заменяющий целый пакет баллонов под давлением, см. [криоцилиндры](${categoryPath(catCylN2, "ru")}). Для CO₂ следующий шаг обычно сразу [стационарная ёмкость](${categoryPath(catTanksCo2, "ru")}) от 10 м³ — это около 9,5 тонны, которые привозит автоцистерна.`],
        ["tbl", "", "Формат | Типовое потребление | Что внутри | Обслуживание", "Баллоны 40 л | до 300 кг/мес | газ под давлением 50–60 бар | замена вручную", "Криоцилиндр 180–500 л | 0,3–1,5 т/мес | сжиженный газ | замена раз в 1–3 недели", "Стационарная ёмкость 10–30 м³ | от 2 т/мес | 9,5–29 т жидкости | заправка автоцистерной по графику"],
        ["h2", "Как посчитать собственную точку перехода"],
        ["no", "Поднимите накладные за последние три месяца и сложите килограммы, а не баллоны."],
        ["no", "Разделите сумму счетов на эти килограммы — это ваша реальная цена за килограмм вместе с остатком."],
        ["no", "Добавьте часы, которые персонал тратит на замены, и стоимость простоев вокруг них."],
        ["no", "Сравните результат с ёмкостью: газ, привезённый автоцистерной, обычно в два-четыре раза дешевле за килограмм."],
        ["p", `В большинстве случаев арифметика переворачивается где-то между одной и двумя тоннами в месяц. Ниже этой границы выигрывают баллоны простотой; выше — [ёмкость на 10–20 м³](${productPath(tank10, "ru")}) окупается за год-два одной только ценой газа.`],
        ["cta", "Не уверены, какой формат ваш?", "Пришлите накладные за три месяца. Посчитаем реальную цену за килограмм и покажем, с какого объёма ёмкость начинает окупаться.", "Заказать расчёт", "/ru/contacts"],
      ],
    },
    "cc",
  ),
  faq: [
    faq(
      "faq-cyl-cap-1",
      {
        en: "Why does a 40-litre cylinder hold only 24 kg?",
        uk: "Чому в 40-літровому балоні лише 24 кг?",
        ru: "Почему в 40-литровом баллоне только 24 кг?",
      },
      {
        en: "Because litres describe the volume of the shell and kilograms describe the liquefied CO₂ inside it. The filling ratio is limited to roughly 0.6–0.75 kg per litre so that the liquid has room to expand when the cylinder warms up. A cylinder filled to the brim would build dangerous pressure on a hot day.",
        uk: "Бо літри описують обʼєм оболонки, а кілограми — зріджений CO₂ всередині. Норму наповнення обмежують приблизно до 0,6–0,75 кг на літр, щоб рідині було куди розширюватись під час нагрівання. Балон, налитий по вінця, у спеку набере небезпечний тиск.",
        ru: "Потому что литры описывают объём оболочки, а килограммы — сжиженный CO₂ внутри. Норму наполнения ограничивают примерно до 0,6–0,75 кг на литр, чтобы жидкости было куда расширяться при нагреве. Баллон, налитый до краёв, в жару наберёт опасное давление.",
      },
    ),
    faq(
      "faq-cyl-cap-2",
      {
        en: "Can we fill our own cylinders from a stationary tank?",
        uk: "Чи можна заправляти власні балони від стаціонарної ємності?",
        ru: "Можно ли заправлять собственные баллоны от стационарной ёмкости?",
      },
      {
        en: "Technically yes — it needs a filling ramp, a pump and cylinder weighing. Legally it is a separate activity with its own permits, personnel training and cylinder inspection records. For most producers it is simpler to keep bulk supply for the process and buy the few cylinders they still need.",
        uk: "Технічно так — потрібна заправна рампа, насос і зважування балонів. Юридично це окремий вид діяльності зі своїми дозволами, навчанням персоналу й обліком опосвідчення балонів. Більшості виробництв простіше тримати ємність під технологію, а поодинокі балони докуповувати.",
        ru: "Технически да — нужна заправочная рампа, насос и взвешивание баллонов. Юридически это отдельный вид деятельности со своими разрешениями, обучением персонала и учётом освидетельствования баллонов. Большинству производств проще держать ёмкость под технологию, а единичные баллоны докупать.",
      },
    ),
  ],
  relatedProducts: [tank10, tank20, cylN2],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "How much CO₂ is in a cylinder",
      uk: "Скільки CO₂ в балоні 10, 20, 40, 50 л",
      ru: "Сколько CO₂ в баллоне 10, 20, 40, 50 л",
    },
    metaDescription: {
      en: "A 40 l cylinder holds 24–28 kg, not 40. Tables of mass, gas output and monthly cylinder count, plus the consumption level at which a tank becomes cheaper.",
      uk: "У балоні 40 л — 24–28 кг, а не 40. Таблиці маси, виходу газу й кількості балонів на місяць та обсяг, з якого ємність стає дешевшою.",
      ru: "В баллоне 40 л — 24–28 кг, а не 40. Таблицы массы, выхода газа и количества баллонов в месяц и объём, с которого ёмкость становится дешевле.",
    },
    keywords: {
      en: "CO2 cylinder capacity, 40 l CO2 cylinder kg, cylinders vs tank",
      uk: "скільки кг вуглекислоти в балоні, балон 40 л CO2, балони чи ємність",
      ru: "сколько кг углекислоты в баллоне, баллон 40 л CO2, баллоны или емкость",
    },
  },
};

/* ─── Стаття: кольорове маркування балонів ─────────────────────────────── */

export const postCylinderMarking: SeedPost = {
  _id: "post-cylinder-colour-marking",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Gas cylinder colour coding: how not to mix up CO₂, nitrogen, oxygen and argon",
    uk: "Кольорове маркування балонів: як не переплутати CO₂, азот, кисень і аргон",
    ru: "Цветовая маркировка баллонов: как не перепутать CO₂, азот, кислород и аргон",
  },
  slug: {
    en: { current: "gas-cylinder-colour-coding" },
    uk: { current: "kolorove-markuvannya-baloniv" },
    ru: { current: "tsvetovaya-markirovka-ballonov" },
  },
  isPublished: true,
  isFeatured: false,
  publishedAt: "2026-09-07T10:30:00Z",
  updatedAt: "2026-09-07T10:30:00Z",
  readingTimeMinutes: 3,
  author: seedAuthor,
  categories: [catQuality],
  tags: ["балони", "маркування", "безпека"],
  coverImage: img(PHOTO.cylinderN2, {
    en: "Cryogenic nitrogen cylinder with identification markings",
    uk: "Кріоциліндр для рідкого азоту з ідентифікаційним маркуванням",
    ru: "Криоцилиндр для жидкого азота с идентификационной маркировкой",
  }),
  excerpt: {
    en: "Two marking systems still coexist on Ukrainian sites: the European shoulder colours and the old all-over paint. A table of both, plus what the neck stamp tells you.",
    uk: "На українських майданчиках досі співіснують дві системи: європейський колір плічок і старе суцільне фарбування. Таблиця обох і що насправді каже клеймо на горловині.",
    ru: "На украинских площадках до сих пор сосуществуют две системы: европейский цвет плечиков и старая сплошная окраска. Таблица обеих и что на самом деле говорит клеймо на горловине.",
  },
  body: body(
    {
      en: [
        ["p", "Colour on a cylinder is not decoration — it is the fastest way to tell what is inside from across a yard. The catch in Ukraine is that two systems are in service at the same time: cylinders marked to EN 1089-3 and older ones painted in full according to Soviet-era standards."],
        ["h2", "Two systems, side by side"],
        ["p", "EN 1089-3 (adopted as ДСТУ EN 1089-3) colours only the **shoulder** of the cylinder. The body can be any colour the owner likes, which is why you see grey, black and green bodies with the same shoulder. The old system painted the whole cylinder and relied on the lettering and stripes."],
        ["tbl", "Shoulder colours to EN 1089-3 and the legacy full-body scheme still found in service", "Gas | Shoulder, EN 1089-3 | Legacy marking | Lettering", "Carbon dioxide CO₂ | grey, RAL 7037 | black body | yellow «CO₂»", "Nitrogen N₂ | black, RAL 9005 | black body, brown stripe | yellow «Nitrogen»", "Oxygen O₂ | white, RAL 9010 | blue body | black «Oxygen»", "Argon Ar | dark green, RAL 6001 | grey body, green stripe | green «Argon»", "Acetylene C₂H₂ | maroon, RAL 3009 | white body | red «Acetylene»", "Ar/CO₂ welding mix | bright green, RAL 6018 | — | «Mixture» and composition"],
        ["p", "Colour is a hint, never a document. The binding identification is the label on the shoulder and the stamp on the neck ring. If the label is missing or unreadable, the cylinder goes back to the supplier — it is not identified by guesswork."],
        ["h2", "What the neck stamp says"],
        ["li", "Manufacturer and serial number."],
        ["li", "Water capacity in litres and the empty (tare) mass in kilograms."],
        ["li", "Working and test pressure."],
        ["li", "Date of manufacture and the date of the last periodic inspection."],
        ["p", "The tare mass matters in daily work: weigh a cylinder, subtract the tare, and you know exactly how much product is left. That is a far more reliable reading than a pressure gauge, because a liquefied gas keeps almost constant pressure until it is nearly empty."],
        ["p", "Periodic inspection for cylinders with non-corrosive gases is normally every five years. Check the current interval against the safety rules in force before you accept a delivery — an out-of-date cylinder is a finding waiting to happen during an inspection."],
        ["img", PHOTO.tanksRow, "A row of cryogenic vessels with identification plates on a customer site", "On stationary vessels the identification lives on the nameplate and in the passport, not in the paint"],
        ["h2", "Three mistakes that cost real money"],
        ["li", "Filling a cylinder with the wrong gas. Oxygen fittings must stay free of oil and grease; a cylinder that has held a hydrocarbon and is then filled with oxygen is a fire waiting for a spark."],
        ["li", "Adapters between different threads. The connections for oxygen, carbon dioxide and fuel gases differ on purpose, precisely so that incompatible things cannot be joined. An adapter defeats the one safeguard that works without human attention."],
        ["li", "Repainting a cylinder in house. Colour is applied by the filler, who is responsible for the identification. A repainted cylinder loses its traceability and will be rejected at the filling station."],
        ["h2", "When cylinders stop being the right answer"],
        ["p", `Colour coding is a cylinder problem. Once the consumption grows past a tonne or so a month, the whole cylinder fleet — with its colours, stamps, deposits and swaps — is replaced by one [stationary tank](${categoryPath(catTanksCo2, "en")}) with a nameplate and a passport. How to work out where that point is, we covered in a separate article on [cylinder capacity and the break-even volume](${postPath(postCylinderCapacity, "en")}).`],
        ["cta", "Moving away from cylinders?", "Tell us your gas and monthly consumption — we will size the vessel, the vaporizer and the piping, and show what changes on the site.", "Get a proposal", "/contacts"],
      ],
      uk: [
        ["p", "Колір на балоні — не декор, а найшвидший спосіб зрозуміти, що всередині, з іншого кінця майданчика. Складність в Україні в тому, що одночасно в обігу дві системи: балони, марковані за EN 1089-3, і старіші, пофарбовані повністю за радянськими стандартами."],
        ["h2", "Дві системи поруч"],
        ["p", "EN 1089-3 (у нас — ДСТУ EN 1089-3) фарбує лише **плічка** балона. Корпус може бути будь-якого кольору на розсуд власника — тому й трапляються сірі, чорні та зелені корпуси з однаковими плічками. Стара система фарбувала балон повністю й спиралась на напис та смуги."],
        ["tbl", "Колір плічок за EN 1089-3 і старе суцільне фарбування, яке досі в обігу", "Газ | Плічка, EN 1089-3 | Старе маркування | Напис", "Вуглекислота CO₂ | сірий, RAL 7037 | чорний корпус | жовтий «Вуглекислота»", "Азот N₂ | чорний, RAL 9005 | чорний корпус, коричнева смуга | жовтий «Азот»", "Кисень O₂ | білий, RAL 9010 | блакитний корпус | чорний «Кисень»", "Аргон Ar | темно-зелений, RAL 6001 | сірий корпус, зелена смуга | зелений «Аргон»", "Ацетилен C₂H₂ | каштановий, RAL 3009 | білий корпус | червоний «Ацетилен»", "Суміш Ar/CO₂ | яскраво-зелений, RAL 6018 | — | «Суміш» і склад"],
        ["p", "Колір — підказка, а не документ. Обовʼязкова ідентифікація — це наліпка на плічках і клеймо на кільці горловини. Якщо наліпки немає або її не прочитати, балон їде назад до постачальника: вміст не встановлюють на око."],
        ["h2", "Що написано на клеймі"],
        ["li", "Виробник і заводський номер."],
        ["li", "Водяна місткість у літрах і маса порожнього балона (тара) у кілограмах."],
        ["li", "Робочий і випробувальний тиск."],
        ["li", "Дата виготовлення й дата останнього опосвідчення."],
        ["p", "Тара має пряме практичне значення: зважте балон, відніміть тару — і ви точно знаєте, скільки продукту лишилось. Це набагато надійніше за манометр, бо зріджений газ тримає майже незмінний тиск, поки не спорожніє майже повністю."],
        ["p", "Періодичне опосвідчення балонів із неагресивними газами — як правило, раз на пʼять років. Перед прийманням партії звіряйте чинний інтервал із правилами безпеки: прострочений балон — це готова знахідка для перевірки."],
        ["img", PHOTO.tanksRow, "Ряд кріогенних посудин з ідентифікаційними табличками на майданчику замовника", "У стаціонарних посудин ідентифікація живе на шильді й у паспорті, а не у фарбі"],
        ["h2", "Три помилки, які коштують грошей"],
        ["li", "Заправити балон не тим газом. Киснева арматура має лишатись без слідів масла й жиру; балон, у якому був вуглеводень, а потім залили кисень, — це пожежа, що чекає на іскру."],
        ["li", "Перехідники між різними різьбами. Приєднання для кисню, вуглекислоти й горючих газів відрізняються саме для того, щоб непоєднуване не зʼєдналось. Перехідник знімає єдиний запобіжник, який працює без участі людини."],
        ["li", "Самостійне перефарбування. Колір наносить заправник, який відповідає за ідентифікацію. Перефарбований балон втрачає простежуваність, і на заправній станції його не приймуть."],
        ["h2", "Коли балони перестають бути відповіддю"],
        ["p", `Кольорове маркування — це проблема балонів. Щойно споживання переростає приблизно тонну на місяць, увесь балонний парк із його кольорами, клеймами, заставами й замінами заміщує одна [стаціонарна ємність](${categoryPath(catTanksCo2, "uk")}) із шильдою і паспортом. Як порахувати цю точку, ми розібрали окремо — у статті про [місткість балона і межу вигоди](${postPath(postCylinderCapacity, "uk")}).`],
        ["cta", "Плануєте відійти від балонів?", "Напишіть газ і місячне споживання — підберемо посудину, випарник та обвʼязку й покажемо, що зміниться на майданчику.", "Отримати пропозицію", "/uk/contacts"],
      ],
      ru: [
        ["p", "Цвет на баллоне — не декор, а самый быстрый способ понять, что внутри, с другого конца площадки. Сложность в Украине в том, что одновременно в обороте две системы: баллоны, маркированные по EN 1089-3, и более старые, окрашенные полностью по советским стандартам."],
        ["h2", "Две системы рядом"],
        ["p", "EN 1089-3 (у нас — ДСТУ EN 1089-3) окрашивает только **плечики** баллона. Корпус может быть любого цвета на усмотрение владельца — поэтому и встречаются серые, чёрные и зелёные корпуса с одинаковыми плечиками. Старая система красила баллон целиком и опиралась на надпись и полосы."],
        ["tbl", "Цвет плечиков по EN 1089-3 и старая сплошная окраска, которая до сих пор в обороте", "Газ | Плечики, EN 1089-3 | Старая маркировка | Надпись", "Углекислота CO₂ | серый, RAL 7037 | чёрный корпус | жёлтая «Углекислота»", "Азот N₂ | чёрный, RAL 9005 | чёрный корпус, коричневая полоса | жёлтая «Азот»", "Кислород O₂ | белый, RAL 9010 | голубой корпус | чёрная «Кислород»", "Аргон Ar | тёмно-зелёный, RAL 6001 | серый корпус, зелёная полоса | зелёная «Аргон»", "Ацетилен C₂H₂ | каштановый, RAL 3009 | белый корпус | красная «Ацетилен»", "Смесь Ar/CO₂ | ярко-зелёный, RAL 6018 | — | «Смесь» и состав"],
        ["p", "Цвет — подсказка, а не документ. Обязательная идентификация — это наклейка на плечиках и клеймо на кольце горловины. Если наклейки нет или её не прочитать, баллон едет обратно к поставщику: содержимое не устанавливают на глаз."],
        ["h2", "Что написано на клейме"],
        ["li", "Изготовитель и заводской номер."],
        ["li", "Водяная вместимость в литрах и масса пустого баллона (тара) в килограммах."],
        ["li", "Рабочее и испытательное давление."],
        ["li", "Дата изготовления и дата последнего освидетельствования."],
        ["p", "Тара имеет прямое практическое значение: взвесьте баллон, вычтите тару — и вы точно знаете, сколько продукта осталось. Это намного надёжнее манометра, потому что сжиженный газ держит почти неизменное давление, пока не опустеет почти полностью."],
        ["p", "Периодическое освидетельствование баллонов с неагрессивными газами — как правило, раз в пять лет. Перед приёмкой партии сверяйте действующий интервал с правилами безопасности: просроченный баллон — готовая находка для проверки."],
        ["img", PHOTO.tanksRow, "Ряд криогенных сосудов с идентификационными табличками на площадке заказчика", "У стационарных сосудов идентификация живёт на шильде и в паспорте, а не в краске"],
        ["h2", "Три ошибки, которые стоят денег"],
        ["li", "Заправить баллон не тем газом. Кислородная арматура должна оставаться без следов масла и жира; баллон, в котором был углеводород, а потом залили кислород, — это пожар, ждущий искры."],
        ["li", "Переходники между разными резьбами. Присоединения для кислорода, углекислоты и горючих газов различаются именно для того, чтобы несовместимое не соединилось. Переходник снимает единственный предохранитель, работающий без участия человека."],
        ["li", "Самостоятельная перекраска. Цвет наносит заправщик, который отвечает за идентификацию. Перекрашенный баллон теряет прослеживаемость, и на заправочной станции его не примут."],
        ["h2", "Когда баллоны перестают быть ответом"],
        ["p", `Цветовая маркировка — это проблема баллонов. Как только потребление перерастает примерно тонну в месяц, весь баллонный парк с его цветами, клеймами, залогами и заменами замещает одна [стационарная ёмкость](${categoryPath(catTanksCo2, "ru")}) с шильдой и паспортом. Как посчитать эту точку, мы разобрали отдельно — в статье о [вместимости баллона и границе выгоды](${postPath(postCylinderCapacity, "ru")}).`],
        ["cta", "Планируете уйти от баллонов?", "Напишите газ и месячное потребление — подберём сосуд, испаритель и обвязку и покажем, что изменится на площадке.", "Получить предложение", "/ru/contacts"],
      ],
    },
    "cm",
  ),
  faq: [
    faq(
      "faq-mark-1",
      {
        en: "A black cylinder — is that nitrogen or carbon dioxide?",
        uk: "Чорний балон — це азот чи вуглекислота?",
        ru: "Чёрный баллон — это азот или углекислота?",
      },
      {
        en: "Under the legacy scheme both are black, and the difference is in the lettering and the brown stripe that nitrogen carries. Under EN 1089-3 the shoulder settles it: black shoulder is nitrogen, grey is carbon dioxide. When the two systems meet in one yard, read the label rather than the paint.",
        uk: "За старою схемою обидва чорні, а різниця — у написі й коричневій смузі, яку має азот. За EN 1089-3 питання вирішують плічка: чорні — азот, сірі — вуглекислота. Коли на одному майданчику зустрічаються обидві системи, читайте наліпку, а не фарбу.",
        ru: "По старой схеме оба чёрные, а разница — в надписи и коричневой полосе, которую несёт азот. По EN 1089-3 вопрос решают плечики: чёрные — азот, серые — углекислота. Когда на одной площадке встречаются обе системы, читайте наклейку, а не краску.",
      },
    ),
    faq(
      "faq-mark-2",
      {
        en: "How do we check how much gas is left in a cylinder?",
        uk: "Як перевірити, скільки газу лишилось у балоні?",
        ru: "Как проверить, сколько газа осталось в баллоне?",
      },
      {
        en: "Weigh it and subtract the tare mass stamped on the neck. For liquefied gases such as CO₂ this is the only accurate method: pressure stays almost constant while liquid remains, so the gauge shows a comfortable reading right up to the moment the cylinder runs dry.",
        uk: "Зважити й відняти тару, вибиту на горловині. Для зріджених газів на кшталт CO₂ це єдиний точний спосіб: поки в балоні є рідина, тиск майже не змінюється, тож манометр показує комфортні цифри аж до моменту, коли балон закінчився.",
        ru: "Взвесить и вычесть тару, выбитую на горловине. Для сжиженных газов вроде CO₂ это единственный точный способ: пока в баллоне есть жидкость, давление почти не меняется, поэтому манометр показывает комфортные цифры вплоть до момента, когда баллон закончился.",
      },
    ),
  ],
  relatedProducts: [cylN2, tank10],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "Gas cylinder colour coding: full table",
      uk: "Колір балонів: таблиця маркування",
      ru: "Цвет баллонов: таблица маркировки",
    },
    metaDescription: {
      en: "Shoulder colours to EN 1089-3 next to the legacy full-body scheme, what the neck stamp contains, and the three marking mistakes that cause accidents.",
      uk: "Колір плічок за EN 1089-3 поруч зі старим суцільним фарбуванням, що містить клеймо на горловині й три помилки маркування, які призводять до аварій.",
      ru: "Цвет плечиков по EN 1089-3 рядом со старой сплошной окраской, что содержит клеймо на горловине и три ошибки маркировки, приводящие к авариям.",
    },
    keywords: {
      en: "gas cylinder colour code, EN 1089-3, CO2 cylinder colour",
      uk: "колір балона вуглекислота, маркування балонів EN 1089-3",
      ru: "цвет баллона углекислота, маркировка баллонов EN 1089-3",
    },
  },
};

export const cylinderPosts: SeedPost[] = [postCylinderCapacity, postCylinderMarking];
