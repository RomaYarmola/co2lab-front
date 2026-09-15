/**
 * Блог: азот, кисень, аргон.
 *
 * До цих статей блог говорив лише про CO₂, хоча каталог продає ємності й
 * кріоциліндри для трьох інших газів, а в підказках Google великий
 * інформаційний попит: «как хранить жидкий азот», «жидкий азот или сухой
 * лед», «азот жидкий особой чистоты 1 сорт», температури й густини.
 * Кожна стаття через «товари до статті» підтримує хаби N₂ / O₂ / Ar.
 */
import {
  SEED_UPDATED_AT,
  body,
  categoryPath,
  faq,
  img,
  postPath,
} from "./helpers.ts";
import {
  catInstallation,
  catQuality,
  catSelection,
  postIsbt,
  seedAuthor,
  seedProduct,
  type SeedPost,
} from "./blog.ts";
import { tankCategories } from "./tanks.ts";
import { cylinderCategories } from "./equipment.ts";
import { postPriceUnits } from "./blogEconomics.ts";

const catTanksN2 = tankCategories.find((c) => c._id === "cat-tanks-n2")!;
const catTanksAr = tankCategories.find((c) => c._id === "cat-tanks-ar")!;
const catTanksO2 = tankCategories.find((c) => c._id === "cat-tanks-o2")!;
const catCylN2 = cylinderCategories.find((c) => c._id === "cat-cylinders-n2")!;

const cylN2 = seedProduct("product-cylinder-n2");
const tankN2 = seedProduct("product-tank-n2-30");
const tankO2 = seedProduct("product-tank-o2-30");
const tankAr = seedProduct("product-tank-ar-30");
const tankCo2 = seedProduct("product-tank-co2-30");

const ICELAB_DRY_ICE = {
  en: "https://icelab.com.ua/catalog/c/suhyi-lid",
  uk: "https://icelab.com.ua/catalog/c/suhyi-lid",
  ru: "https://icelab.com.ua/ru/catalog/c/suhyi-lid",
};

const PHOTO = {
  cylinderN2: "/images/catalog/cryogenic-cylinder-nitrogen.webp",
  cylinderFrame: "/images/catalog/cryogenic-cylinder-stainless-frame.webp",
  dryIce: "/images/engineeringSolutionsPage/dryIce/dryIce.webp",
  lab: "/images/catalog/co2-quality-control-laboratory.webp",
  tankVertical: "/images/catalog/cryogenic-storage-tank-vertical.webp",
  vaporizers: "/images/catalog/ambient-air-vaporizers-range.webp",
};

/* ─── Стаття: зберігання рідкого азоту ─────────────────────────────────── */

export const postNitrogenStorage: SeedPost = {
  _id: "post-liquid-nitrogen-storage",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "How to store liquid nitrogen and how long it keeps",
    uk: "Як зберігати рідкий азот і скільки він зберігається",
    ru: "Как хранить жидкий азот и сколько он хранится",
  },
  slug: {
    en: { current: "how-to-store-liquid-nitrogen" },
    uk: { current: "yak-zberigaty-ridkyi-azot" },
    ru: { current: "kak-hranit-zhidkiy-azot" },
  },
  isPublished: true,
  isFeatured: false,
  publishedAt: "2026-09-15T09:00:00Z",
  updatedAt: "2026-09-15T09:00:00Z",
  readingTimeMinutes: 4,
  author: seedAuthor,
  categories: [catInstallation],
  tags: ["азот", "зберігання", "безпека"],
  coverImage: img(PHOTO.cylinderN2, {
    en: "Cryogenic cylinder for liquid nitrogen",
    uk: "Кріоциліндр для рідкого азоту",
    ru: "Криоцилиндр для жидкого азота",
  }),
  excerpt: {
    en: "Liquid nitrogen cannot be stored — only slowed down. Loss rates by vessel type, why a sealed container is dangerous, and what a room with liquid nitrogen needs.",
    uk: "Рідкий азот не можна зберігати — лише сповільнювати його випаровування. Втрати за типами посудин, чому закрита ємність небезпечна і що потрібно приміщенню з рідким азотом.",
    ru: "Жидкий азот нельзя хранить — можно лишь замедлять его испарение. Потери по типам сосудов, почему закрытая ёмкость опасна и что нужно помещению с жидким азотом.",
  },
  body: body(
    {
      uk: [
        ["p", "Рідкий азот кипить за −196 °C, а в будь-якому приміщенні тепло приходить до нього з усіх боків. Тому питання «скільки він зберігається» насправді звучить як «наскільки повільно він випаровується в цій посудині». Відповідь залежить від ізоляції, розміру й того, як часто посудину відкривають."],
        ["h2", "У чому зберігають рідкий азот"],
        ["tbl", "Орієнтовні втрати в спокої, без відбору продукту", "Посудина | Обʼєм | Втрати на випаровування | Для чого", "Посудина Дьюара | 5–50 л | 0,1–0,5 л на добу | лабораторії, біоматеріал, невеликі разові задачі", "Кріоциліндр низького тиску | 180–230 л | 1,5–2,5% на добу | цехи й лабораторії зі щоденним відбором", "Стаціонарна ємність | 10–50 м³ | 0,1–0,3% на добу | безперервне промислове споживання"],
        ["p", "Великі посудини втрачають менший відсоток, бо поверхня, через яку йде тепло, росте повільніше за обʼєм. Звідси практичне правило: зберігати азот «про запас» у дрібній тарі невигідно, а тримати на майданчику великий обʼєм без регулярного відбору — теж, бо втрати йдуть щодня."],
        ["img", PHOTO.cylinderFrame, "Кріоциліндри в рамі для перевезення й зберігання зріджених газів", "Кріоциліндр на 180–230 л — проміжний формат між посудинами Дьюара й стаціонарною ємністю"],
        ["h2", "Скільки днів протримається азот"],
        ["p", "Для посудини Дьюара виробник вказує статичний час утримання: за нормальної ізоляції 35-літрова посудина тримає азот місяцями, якщо її не відкривати. Щоденний відбір і відкривання кришки скорочують цей строк у рази. Для кріоциліндра на 200 л при 2% на добу за тиждень без відбору випарується близько 28 л."],
        ["h2", "Три правила, які не можна порушувати"],
        ["li", "**Ніколи не закривайте рідкий азот герметично.** З одного літра рідини утворюється близько 0,7 м³ газу; закрита тара без запобіжного клапана руйнується. Кришки посудин Дьюара нещільні саме тому."],
        ["li", "**Приміщення має провітрюватись.** Азот не отруйний, але витісняє кисень. У малій кімнаті розлитий кріоциліндр знижує кисень до небезпечного рівня без жодного запаху. Для таких приміщень ставлять датчик кисню з сигналізацією."],
        ["li", "**Лише відповідна тара й захист.** Звичайні пластик, гума й вуглецева сталь на −196 °C стають крихкими. Працюють у кріогенних рукавицях і щитку, азот не перевозять у салоні автомобіля."],
        ["h2", "Коли переходити на ємність"],
        ["p", `Якщо кріоциліндри міняють кілька разів на тиждень, а втрати й логістика стають помітною статтею витрат, наступний крок — [стаціонарна ємність для рідкого азоту](${categoryPath(catTanksN2, "uk")}) з атмосферним випарником. Для щоденного відбору в кілька десятків літрів зазвичай достатньо [кріоциліндрів](${categoryPath(catCylN2, "uk")}). Порівняння одиниць і цін за літр, кілограм і кубометр — у статті [«Ціна CO₂, азоту й аргону»](${postPath(postPriceUnits, "uk")}).`],
        ["cta", "Підбираєте формат зберігання азоту?", "Напишіть, скільки азоту витрачаєте за день і як часто — порахуємо втрати для кожного варіанта й підберемо посудину.", "Отримати розрахунок", "/uk/contacts"],
      ],
      en: [
        ["p", "Liquid nitrogen boils at −196 °C, and in any room heat reaches it from every side. So the question «how long does it keep» really means «how slowly does it evaporate in this vessel». The answer depends on insulation, size and how often the vessel is opened."],
        ["h2", "What liquid nitrogen is stored in"],
        ["tbl", "Typical static losses, no product drawn off", "Vessel | Volume | Boil-off | Used for", "Dewar flask | 5–50 l | 0.1–0.5 l per day | laboratories, biological samples, small one-off jobs", "Low-pressure cryogenic cylinder | 180–230 l | 1.5–2.5% per day | workshops and labs with daily draw-off", "Stationary tank | 10–50 m³ | 0.1–0.3% per day | continuous industrial consumption"],
        ["p", "Larger vessels lose a smaller percentage because the surface heat comes through grows more slowly than the volume. Hence the practical rule: storing nitrogen «in reserve» in small containers does not pay, and neither does keeping a large volume on site without regular draw-off, because the losses run every day."],
        ["img", PHOTO.cylinderFrame, "Cryogenic cylinders in a frame for transporting and storing liquefied gases", "A 180–230 l cryogenic cylinder sits between Dewar flasks and a stationary tank"],
        ["h2", "How many days nitrogen will last"],
        ["p", "For a Dewar flask the manufacturer states a static holding time: a well-insulated 35 l flask holds nitrogen for months if left closed. Daily draw-off and opening the lid shorten that many times over. A 200 l cryogenic cylinder at 2% per day loses about 28 l in a week without any use."],
        ["h2", "Three rules that cannot be broken"],
        ["li", "**Never seal liquid nitrogen.** One litre of liquid makes about 0.7 m³ of gas; a closed container without a relief valve ruptures. Dewar lids are loose for exactly this reason."],
        ["li", "**The room must be ventilated.** Nitrogen is not toxic but displaces oxygen. In a small room a spilled cryogenic cylinder lowers oxygen to a dangerous level with no smell at all. Such rooms get an oxygen sensor with an alarm."],
        ["li", "**Only suitable containers and protection.** Ordinary plastic, rubber and carbon steel turn brittle at −196 °C. Work in cryogenic gloves and a face shield, and never carry nitrogen inside a car."],
        ["h2", "When to move to a tank"],
        ["p", `If cryogenic cylinders are swapped several times a week and losses and logistics become a visible cost, the next step is a [stationary liquid nitrogen tank](${categoryPath(catTanksN2, "en")}) with an ambient vaporizer. For a daily draw-off of a few dozen litres, [cryogenic cylinders](${categoryPath(catCylN2, "en")}) are usually enough. Unit and price comparisons per litre, kilogram and cubic metre are in [Price of CO₂, nitrogen and argon](${postPath(postPriceUnits, "en")}).`],
        ["cta", "Choosing how to store nitrogen?", "Tell us how much nitrogen you use per day and how often — we will calculate losses for each option and size the vessel.", "Get a calculation", "/contacts"],
      ],
      ru: [
        ["p", "Жидкий азот кипит при −196 °C, а в любом помещении тепло приходит к нему со всех сторон. Поэтому вопрос «сколько он хранится» на самом деле звучит как «насколько медленно он испаряется в этом сосуде». Ответ зависит от изоляции, размера и того, как часто сосуд открывают."],
        ["h2", "В чём хранят жидкий азот"],
        ["tbl", "Ориентировочные потери в покое, без отбора продукта", "Сосуд | Объём | Потери на испарение | Для чего", "Сосуд Дьюара | 5–50 л | 0,1–0,5 л в сутки | лаборатории, биоматериал, небольшие разовые задачи", "Криоцилиндр низкого давления | 180–230 л | 1,5–2,5% в сутки | цеха и лаборатории с ежедневным отбором", "Стационарная ёмкость | 10–50 м³ | 0,1–0,3% в сутки | непрерывное промышленное потребление"],
        ["p", "Крупные сосуды теряют меньший процент, потому что поверхность, через которую идёт тепло, растёт медленнее объёма. Отсюда практическое правило: хранить азот «про запас» в мелкой таре невыгодно, а держать на площадке большой объём без регулярного отбора — тоже, потому что потери идут каждый день."],
        ["img", PHOTO.cylinderFrame, "Криоцилиндры в раме для перевозки и хранения сжиженных газов", "Криоцилиндр на 180–230 л — промежуточный формат между сосудами Дьюара и стационарной ёмкостью"],
        ["h2", "Сколько дней продержится азот"],
        ["p", "Для сосуда Дьюара производитель указывает статическое время удержания: при нормальной изоляции 35-литровый сосуд держит азот месяцами, если его не открывать. Ежедневный отбор и открывание крышки сокращают этот срок в разы. Для криоцилиндра на 200 л при 2% в сутки за неделю без отбора испарится около 28 л."],
        ["h2", "Три правила, которые нельзя нарушать"],
        ["li", "**Никогда не закрывайте жидкий азот герметично.** Из одного литра жидкости образуется около 0,7 м³ газа; закрытая тара без предохранительного клапана разрушается. Крышки сосудов Дьюара неплотные именно поэтому."],
        ["li", "**Помещение должно проветриваться.** Азот не ядовит, но вытесняет кислород. В маленькой комнате разлитый криоцилиндр снижает кислород до опасного уровня без всякого запаха. Для таких помещений ставят датчик кислорода с сигнализацией."],
        ["li", "**Только подходящая тара и защита.** Обычные пластик, резина и углеродистая сталь при −196 °C становятся хрупкими. Работают в криогенных перчатках и щитке, азот не перевозят в салоне автомобиля."],
        ["h2", "Когда переходить на ёмкость"],
        ["p", `Если криоцилиндры меняют несколько раз в неделю, а потери и логистика становятся заметной статьёй расходов, следующий шаг — [стационарная ёмкость для жидкого азота](${categoryPath(catTanksN2, "ru")}) с атмосферным испарителем. Для ежедневного отбора в несколько десятков литров обычно достаточно [криоцилиндров](${categoryPath(catCylN2, "ru")}). Сравнение единиц и цен за литр, килограмм и кубометр — в статье [«Цена CO₂, азота и аргона»](${postPath(postPriceUnits, "ru")}).`],
        ["cta", "Подбираете формат хранения азота?", "Напишите, сколько азота тратите в день и как часто — посчитаем потери для каждого варианта и подберём сосуд.", "Получить расчёт", "/ru/contacts"],
      ],
    },
    "ns",
  ),
  faq: [
    faq(
      "faq-n2s-1",
      {
        en: "Can liquid nitrogen be kept in a thermos?",
        uk: "Чи можна тримати рідкий азот у термосі?",
        ru: "Можно ли держать жидкий азот в термосе?",
      },
      {
        en: "A household thermos is not designed for −196 °C: the glass flask can crack and the screw cap turns it into a pressure vessel. For short-term handling only a laboratory Dewar flask with a loose, vented lid is suitable.",
        uk: "Побутовий термос не розрахований на −196 °C: скляна колба може тріснути, а закручена кришка перетворює його на посудину під тиском. Для короткого зберігання підходить лише лабораторна посудина Дьюара з нещільною кришкою.",
        ru: "Бытовой термос не рассчитан на −196 °C: стеклянная колба может треснуть, а закрученная крышка превращает его в сосуд под давлением. Для короткого хранения подходит только лабораторный сосуд Дьюара с неплотной крышкой.",
      },
    ),
    faq(
      "faq-n2s-2",
      {
        en: "Why does a cryogenic cylinder lose nitrogen even when nobody uses it?",
        uk: "Чому кріоциліндр втрачає азот, навіть коли ним не користуються?",
        ru: "Почему криоцилиндр теряет азот, даже когда им не пользуются?",
      },
      {
        en: "Heat leaks through the insulation, supports and valves all the time. The liquid evaporates, pressure rises to the relief valve setting and the gas is vented. A healthy cylinder loses 1.5–2.5% a day; noticeably more usually means the vacuum insulation has degraded.",
        uk: "Тепло постійно проходить крізь ізоляцію, опори й арматуру. Рідина випаровується, тиск доходить до уставки запобіжного клапана, і газ скидається. Справний кріоциліндр втрачає 1,5–2,5% на добу; помітно більше зазвичай означає, що погіршився вакуум в ізоляції.",
        ru: "Тепло постоянно проходит через изоляцию, опоры и арматуру. Жидкость испаряется, давление доходит до уставки предохранительного клапана, и газ сбрасывается. Исправный криоцилиндр теряет 1,5–2,5% в сутки; заметно больше обычно означает, что ухудшился вакуум в изоляции.",
      },
    ),
  ],
  relatedProducts: [cylN2, tankN2],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "How to store liquid nitrogen: vessels, loss rates, safety",
      uk: "Як зберігати рідкий азот: посудини, втрати, безпека",
      ru: "Как хранить жидкий азот: сосуды, потери, безопасность",
    },
    metaDescription: {
      en: "Dewar flask 0.1–0.5 l a day, cryogenic cylinder 1.5–2.5%, tank 0.1–0.3%. Loss table by vessel, the three safety rules and when to move to a tank.",
      uk: "Посудина Дьюара 0,1–0,5 л на добу, кріоциліндр 1,5–2,5%, ємність 0,1–0,3%. Таблиця втрат, три правила безпеки й коли переходити на ємність.",
      ru: "Сосуд Дьюара 0,1–0,5 л в сутки, криоцилиндр 1,5–2,5%, ёмкость 0,1–0,3%. Таблица потерь, три правила безопасности и когда переходить на ёмкость.",
    },
    keywords: {
      en: "how to store liquid nitrogen, liquid nitrogen boil-off, Dewar flask",
      uk: "як зберігати рідкий азот, скільки зберігається рідкий азот, посудина Дьюара",
      ru: "как хранить жидкий азот, сколько хранится жидкий азот, сосуд Дьюара",
    },
  },
};

/* ─── Стаття: рідкий азот чи сухий лід ─────────────────────────────────── */

export const postNitrogenVsDryIce: SeedPost = {
  _id: "post-liquid-nitrogen-vs-dry-ice",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Liquid nitrogen or dry ice: which one to use for cooling",
    uk: "Рідкий азот чи сухий лід: що обрати для охолодження",
    ru: "Жидкий азот или сухой лёд: что выбрать для охлаждения",
  },
  slug: {
    en: { current: "liquid-nitrogen-or-dry-ice" },
    uk: { current: "ridkyi-azot-chy-suhyi-lid" },
    ru: { current: "zhidkiy-azot-ili-suhoy-led" },
  },
  isPublished: true,
  isFeatured: false,
  publishedAt: "2026-09-15T09:30:00Z",
  updatedAt: "2026-09-15T09:30:00Z",
  readingTimeMinutes: 4,
  author: seedAuthor,
  categories: [catSelection],
  tags: ["азот", "сухий лід", "охолодження"],
  coverImage: img(PHOTO.dryIce, {
    en: "Dry ice pellets next to a cryogenic nitrogen vessel",
    uk: "Гранули сухого льоду — твердий CO₂ з температурою −78,5 °C",
    ru: "Гранулы сухого льда — твёрдый CO₂ с температурой −78,5 °C",
  }),
  excerpt: {
    en: "Nitrogen is colder, dry ice holds more cold per kilogram. A side-by-side table, the tasks each one is right for, and the safety difference people forget.",
    uk: "Азот холодніший, а сухий лід несе більше холоду на кілограм. Порівняльна таблиця, задачі для кожного й різниця в безпеці, про яку забувають.",
    ru: "Азот холоднее, а сухой лёд несёт больше холода на килограмм. Сравнительная таблица, задачи для каждого и разница в безопасности, о которой забывают.",
  },
  body: body(
    {
      uk: [
        ["p", "Обидва холодоагенти працюють без компресора й зникають, перетворюючись на газ. На цьому схожість закінчується: один — рідина за −196 °C, другий — тверда речовина за −78,5 °C, і для більшості задач правильний вибір очевидний, щойно порівняти цифри."],
        ["h2", "Порівняння в одній таблиці"],
        ["tbl", "Значення за атмосферного тиску", "Параметр | Рідкий азот N₂ | Сухий лід CO₂", "Температура | −196 °C | −78,5 °C", "Перехід у газ | кипить | сублімує, минаючи рідину", "Холод фазового переходу | ≈ 199 кДж/кг | ≈ 571 кДж/кг", "Разом із нагріванням газу до 0 °C | ≈ 400 кДж/кг | ≈ 640 кДж/кг", "Газу з 1 кг | ≈ 0,84 м³ | ≈ 0,54 м³", "Зберігання | посудина Дьюара, кріоциліндр, ємність | термобокс, втрати близько 10% на добу", "Вплив газу на людину | витісняє кисень | витісняє кисень і діє на дихання вже за кількох відсотків"],
        ["p", "Головне з таблиці: **сухий лід несе приблизно в півтора раза більше холоду на кілограм**, а азот дає нижчу температуру. Тому для «тримати холодним довго» виграє лід, для «заморозити швидко й дуже глибоко» — азот."],
        ["h2", "Коли обирати рідкий азот"],
        ["li", "Шокове заморожування харчових продуктів у тунелях і ваннах — швидкість заморожування зберігає структуру продукту."],
        ["li", "Криогенне подрібнення пластмас, спецій, гуми: матеріал стає крихким."],
        ["li", "Зберігання біологічних зразків за температур, нижчих за −150 °C."],
        ["li", "Посадка деталей із натягом охолодженням вала."],
        ["li", "Процеси, де потрібен ще й інертний газ після випаровування."],
        ["h2", "Коли обирати сухий лід"],
        ["li", "Перевезення охолодженої й замороженої продукції, фармацевтики, зразків у термобоксах."],
        ["li", "Кейтеринг і доставка їжі: лід не тане у воду й не мочить упаковку."],
        ["li", "Очищення обладнання струменем гранул — кріобластинг."],
        ["li", "Задачі без спеціальної тари: лід зберігається в термобоксі, азот — лише в кріогенній посудині."],
        ["p", `Сухий лід у гранулах 3, 16 і 19 мм виробляє, зокрема, [IceLab](${ICELAB_DRY_ICE.uk}) — з харчової вуглекислоти, з доставкою по Україні.`],
        ["h2", "Різниця в безпеці"],
        ["p", "Обидва гази в закритому приміщенні витісняють повітря, але поводяться по-різному. Азот лише замінює кисень, і людина нічого не відчуває аж до втрати свідомості. CO₂ діє на організм сам: прискорює дихання, дає головний біль і сплутаність уже за 3–5% у повітрі, і накопичується біля підлоги, бо важчий за повітря. Для обох потрібна вентиляція, але для CO₂ ще й датчики внизу."],
        ["img", PHOTO.vaporizers, "Атмосферні випарники для зріджених газів біля кріогенної посудини", "Коли азоту потрібно багато й щодня, його зберігають у стаціонарній ємності з випарником"],
        ["h2", "Якщо потрібно багато й постійно"],
        ["p", `Для тунельного заморожування чи виробничого подрібнення азот рахують уже тоннами на місяць — тут потрібна [ємність для рідкого азоту](${categoryPath(catTanksN2, "uk")}), а не кріоциліндри. Як його зберігати й скільки він втрачає в різних посудинах, розібрано в статті [«Як зберігати рідкий азот»](${postPath(postNitrogenStorage, "uk")}).`],
        ["cta", "Не впевнені, який холодоагент вам потрібен?", "Опишіть продукт, обсяги й температуру — порадимо рішення й порахуємо, скільки азоту чи CO₂ знадобиться.", "Запитати інженера", "/uk/contacts"],
      ],
      en: [
        ["p", "Both refrigerants work without a compressor and disappear by turning into gas. That is where the similarity ends: one is a liquid at −196 °C, the other a solid at −78.5 °C, and for most tasks the right choice is obvious once the numbers sit side by side."],
        ["h2", "The comparison in one table"],
        ["tbl", "Values at atmospheric pressure", "Parameter | Liquid nitrogen N₂ | Dry ice CO₂", "Temperature | −196 °C | −78.5 °C", "Turns into gas by | boiling | sublimating, skipping the liquid", "Cold from the phase change | ≈ 199 kJ/kg | ≈ 571 kJ/kg", "Including warming the gas to 0 °C | ≈ 400 kJ/kg | ≈ 640 kJ/kg", "Gas from 1 kg | ≈ 0.84 m³ | ≈ 0.54 m³", "Storage | Dewar flask, cryogenic cylinder, tank | insulated box, losses around 10% a day", "Effect of the gas on people | displaces oxygen | displaces oxygen and affects breathing at a few percent"],
        ["p", "The key point: **dry ice carries roughly one and a half times more cold per kilogram**, while nitrogen reaches a lower temperature. So for «keep it cold for a long time» ice wins, and for «freeze fast and very deep» nitrogen does."],
        ["h2", "When to choose liquid nitrogen"],
        ["li", "Shock freezing food in tunnels and baths — freezing speed preserves the product structure."],
        ["li", "Cryogenic grinding of plastics, spices and rubber: the material turns brittle."],
        ["li", "Storing biological samples below −150 °C."],
        ["li", "Shrink fitting parts by cooling the shaft."],
        ["li", "Processes that also need an inert gas once the liquid evaporates."],
        ["h2", "When to choose dry ice"],
        ["li", "Shipping chilled and frozen goods, pharmaceuticals and samples in insulated boxes."],
        ["li", "Catering and food delivery: the ice does not melt into water or soak the packaging."],
        ["li", "Cleaning equipment with a stream of pellets — dry ice blasting."],
        ["li", "Jobs without special containers: ice keeps in an insulated box, nitrogen only in a cryogenic vessel."],
        ["p", `Dry ice pellets of 3, 16 and 19 mm are made in Ukraine by, among others, [IceLab](${ICELAB_DRY_ICE.en}) — from food-grade CO₂, with delivery across the country.`],
        ["h2", "The safety difference"],
        ["p", "Both gases displace air in a closed room, but they behave differently. Nitrogen only replaces oxygen, and a person feels nothing until losing consciousness. CO₂ acts on the body itself: it speeds up breathing and causes headache and confusion at 3–5% in air, and it collects at floor level because it is heavier than air. Both need ventilation; CO₂ also needs detectors near the floor."],
        ["img", PHOTO.vaporizers, "Ambient vaporizers for liquefied gases next to a cryogenic vessel", "When nitrogen is needed in quantity every day, it is stored in a stationary tank with a vaporizer"],
        ["h2", "When you need a lot, all the time"],
        ["p", `Tunnel freezing or production-scale grinding counts nitrogen in tonnes a month — that calls for a [liquid nitrogen tank](${categoryPath(catTanksN2, "en")}), not cryogenic cylinders. How to store it and how much each vessel loses is covered in [How to store liquid nitrogen](${postPath(postNitrogenStorage, "en")}).`],
        ["cta", "Not sure which refrigerant you need?", "Describe the product, volumes and temperature — we will suggest a solution and calculate how much nitrogen or CO₂ it takes.", "Ask an engineer", "/contacts"],
      ],
      ru: [
        ["p", "Оба хладагента работают без компрессора и исчезают, превращаясь в газ. На этом сходство заканчивается: один — жидкость при −196 °C, другой — твёрдое вещество при −78,5 °C, и для большинства задач правильный выбор очевиден, как только сравнить цифры."],
        ["h2", "Сравнение в одной таблице"],
        ["tbl", "Значения при атмосферном давлении", "Параметр | Жидкий азот N₂ | Сухой лёд CO₂", "Температура | −196 °C | −78,5 °C", "Переход в газ | кипит | сублимирует, минуя жидкость", "Холод фазового перехода | ≈ 199 кДж/кг | ≈ 571 кДж/кг", "Вместе с нагревом газа до 0 °C | ≈ 400 кДж/кг | ≈ 640 кДж/кг", "Газа из 1 кг | ≈ 0,84 м³ | ≈ 0,54 м³", "Хранение | сосуд Дьюара, криоцилиндр, ёмкость | термобокс, потери около 10% в сутки", "Влияние газа на человека | вытесняет кислород | вытесняет кислород и действует на дыхание уже при нескольких процентах"],
        ["p", "Главное из таблицы: **сухой лёд несёт примерно в полтора раза больше холода на килограмм**, а азот даёт более низкую температуру. Поэтому для «держать холодным долго» выигрывает лёд, для «заморозить быстро и очень глубоко» — азот."],
        ["h2", "Когда выбирать жидкий азот"],
        ["li", "Шоковая заморозка пищевых продуктов в туннелях и ваннах — скорость заморозки сохраняет структуру продукта."],
        ["li", "Криогенное измельчение пластмасс, специй, резины: материал становится хрупким."],
        ["li", "Хранение биологических образцов при температурах ниже −150 °C."],
        ["li", "Посадка деталей с натягом охлаждением вала."],
        ["li", "Процессы, где после испарения нужен ещё и инертный газ."],
        ["h2", "Когда выбирать сухой лёд"],
        ["li", "Перевозка охлаждённой и замороженной продукции, фармацевтики, образцов в термобоксах."],
        ["li", "Кейтеринг и доставка еды: лёд не тает в воду и не мочит упаковку."],
        ["li", "Очистка оборудования струёй гранул — криобластинг."],
        ["li", "Задачи без специальной тары: лёд хранится в термобоксе, азот — только в криогенном сосуде."],
        ["p", `Сухой лёд в гранулах 3, 16 и 19 мм производит, в частности, [IceLab](${ICELAB_DRY_ICE.ru}) — из пищевой углекислоты, с доставкой по Украине.`],
        ["h2", "Разница в безопасности"],
        ["p", "Оба газа в закрытом помещении вытесняют воздух, но ведут себя по-разному. Азот лишь замещает кислород, и человек ничего не чувствует вплоть до потери сознания. CO₂ действует на организм сам: учащает дыхание, даёт головную боль и спутанность уже при 3–5% в воздухе и накапливается у пола, потому что тяжелее воздуха. Для обоих нужна вентиляция, но для CO₂ ещё и датчики внизу."],
        ["img", PHOTO.vaporizers, "Атмосферные испарители для сжиженных газов у криогенного сосуда", "Когда азота нужно много и каждый день, его хранят в стационарной ёмкости с испарителем"],
        ["h2", "Если нужно много и постоянно"],
        ["p", `Для туннельной заморозки или производственного измельчения азот считают уже тоннами в месяц — здесь нужна [ёмкость для жидкого азота](${categoryPath(catTanksN2, "ru")}), а не криоцилиндры. Как его хранить и сколько он теряет в разных сосудах, разобрано в статье [«Как хранить жидкий азот»](${postPath(postNitrogenStorage, "ru")}).`],
        ["cta", "Не уверены, какой хладагент вам нужен?", "Опишите продукт, объёмы и температуру — подскажем решение и посчитаем, сколько азота или CO₂ понадобится.", "Спросить инженера", "/ru/contacts"],
      ],
    },
    "nd",
  ),
  faq: [
    faq(
      "faq-nd-1",
      {
        en: "Can dry ice and liquid nitrogen be used together?",
        uk: "Чи можна використовувати сухий лід і рідкий азот разом?",
        ru: "Можно ли использовать сухой лёд и жидкий азот вместе?",
      },
      {
        en: "Yes, and it is common in logistics: nitrogen for fast pre-freezing at the plant, dry ice to keep the product frozen in transit. What must not be done is to seal either of them in an airtight container.",
        uk: "Так, і в логістиці це поширено: азот — для швидкого попереднього заморожування на виробництві, сухий лід — щоб продукт лишався замороженим у дорозі. Чого не можна робити — закривати будь-який із них у герметичній тарі.",
        ru: "Да, и в логистике это распространено: азот — для быстрой предварительной заморозки на производстве, сухой лёд — чтобы продукт оставался замороженным в пути. Чего нельзя делать — закрывать любой из них в герметичной таре.",
      },
    ),
    faq(
      "faq-nd-2",
      {
        en: "Which is cheaper?",
        uk: "Що дешевше?",
        ru: "Что дешевле?",
      },
      {
        en: "Compare the cost of the cold you actually use, not the price per kilogram. Dry ice delivers about one and a half times more cold per kilogram but costs more per kilogram than bulk nitrogen; the answer also depends on boil-off during storage and on whether you already have a cryogenic vessel.",
        uk: "Порівнюйте вартість холоду, який реально використовуєте, а не ціну за кілограм. Сухий лід дає приблизно в півтора раза більше холоду з кілограма, але кілограм льоду дорожчий за азот навалом; відповідь залежить ще й від втрат на зберіганні та від того, чи є у вас кріогенна посудина.",
        ru: "Сравнивайте стоимость холода, который реально используете, а не цену за килограмм. Сухой лёд даёт примерно в полтора раза больше холода с килограмма, но килограмм льда дороже азота навалом; ответ зависит ещё и от потерь при хранении и от того, есть ли у вас криогенный сосуд.",
      },
    ),
  ],
  relatedProducts: [cylN2, tankN2],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "Liquid nitrogen or dry ice: comparison table and uses",
      uk: "Рідкий азот чи сухий лід: порівняльна таблиця й застосування",
      ru: "Жидкий азот или сухой лёд: сравнительная таблица и применение",
    },
    metaDescription: {
      en: "−196 °C against −78.5 °C, 400 against 640 kJ of cold per kilogram. Which refrigerant suits freezing, transport and blasting, and how their hazards differ.",
      uk: "−196 °C проти −78,5 °C, 400 проти 640 кДж холоду на кілограм. Який холодоагент для заморожування, перевезення й очищення та чим відрізняються їхні небезпеки.",
      ru: "−196 °C против −78,5 °C, 400 против 640 кДж холода на килограмм. Какой хладагент для заморозки, перевозки и очистки и чем отличаются их опасности.",
    },
    keywords: {
      en: "liquid nitrogen vs dry ice, dry ice or liquid nitrogen for cooling",
      uk: "рідкий азот чи сухий лід, порівняння азоту й сухого льоду",
      ru: "жидкий азот или сухой лед, сравнение азота и сухого льда",
    },
  },
};

/* ─── Стаття: сорти чистоти газів ──────────────────────────────────────── */

export const postGasGrades: SeedPost = {
  _id: "post-industrial-gas-purity-grades",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Purity grades of nitrogen, oxygen and argon: how to read a specification",
    uk: "Сорти чистоти азоту, кисню й аргону: як читати специфікацію",
    ru: "Сорта чистоты азота, кислорода и аргона: как читать спецификацию",
  },
  slug: {
    en: { current: "nitrogen-oxygen-argon-purity-grades" },
    uk: { current: "sorty-chystoty-azotu-kysnyu-argonu" },
    ru: { current: "sorta-chistoty-azota-kisloroda-argona" },
  },
  isPublished: true,
  isFeatured: false,
  publishedAt: "2026-09-15T10:00:00Z",
  updatedAt: "2026-09-15T10:00:00Z",
  readingTimeMinutes: 4,
  author: seedAuthor,
  categories: [catQuality],
  tags: ["азот", "аргон", "кисень", "якість"],
  coverImage: img(PHOTO.lab, {
    en: "Gas quality control laboratory with analysers",
    uk: "Лабораторія контролю якості газів з аналізаторами",
    ru: "Лаборатория контроля качества газов с анализаторами",
  }),
  excerpt: {
    en: "4.6, 5.0, «special purity grade 1» — three ways of writing the same idea. What the numbers mean, which grade each process needs, and what to check in the certificate.",
    uk: "4.6, 5.0, «особливої чистоти 1 сорт» — три способи записати одну думку. Що означають цифри, який сорт потрібен процесу і що перевіряти в сертифікаті.",
    ru: "4.6, 5.0, «особой чистоты 1 сорт» — три способа записать одну мысль. Что значат цифры, какой сорт нужен процессу и что проверять в сертификате.",
  },
  body: body(
    {
      uk: [
        ["p", "Постачальники пишуть чистоту газу по-різному: відсотками, двома цифрами через крапку або сортом за стандартом. Усе це описує одне — скільки в газі сторонніх домішок. Але переплатити або отримати не той газ легко саме через різні способи запису."],
        ["h2", "Як читати позначення 4.6 чи 5.0"],
        ["p", "Перша цифра — кількість девʼяток у чистоті, друга — остання цифра після них. **4.6 означає 99,996%**, 5.0 — 99,999%, 6.0 — 99,9999%. Корисніше дивитися на зворотний бік: скільки мільйонних часток (ppm) займають домішки."],
        ["tbl", "Позначення, чистота й типові застосування", "Позначення | Чистота | Домішки, ppm | Де застосовують", "2.6 | 99,6% | 4 000 | інертизація, продування ємностей і ліній", "4.0 | 99,99% | 100 | пакування харчових продуктів, лазерне різання", "4.6 | 99,996% | 40 | зварювання в аргоні, загальні лабораторні задачі", "5.0 | 99,999% | 10 | хроматографія, електроніка, точна металургія", "6.0 | 99,9999% | 1 | напівпровідники, аналітичні прилади"],
        ["p", "Перехід на кожну наступну сходинку чистоти помітно дорожчає. Тому починати варто з вимог процесу, а не з «візьмемо найчистіший»."],
        ["h2", "Сорти за стандартами"],
        ["p", "У документах пострадянської традиції чистоту записують сортом. Для рідкого й газоподібного азоту за ГОСТ 9293 це технічний, підвищеної й особливої чистоти; для аргону за ГОСТ 10157 — вищий і перший сорт; для кисню — технічний і медичний. Орієнтовна відповідність:"],
        ["tbl", "Звіряйте з чинною редакцією стандарту й сертифікатом партії", "Газ і сорт | Чистота не менше | Приблизно відповідає", "Азот технічний 1 сорт | 99,6% | 2.6", "Азот підвищеної чистоти 1 сорт | 99,99% | 4.0", "Азот особливої чистоти 1 сорт | 99,999% | 5.0", "Аргон першого сорту | 99,987% | між 4.0 і 4.6", "Аргон вищого сорту | 99,993% | близько 4.6", "Кисень технічний 1 сорт | 99,7% | 2.7"],
        ["img", PHOTO.lab, "Аналізатори для перевірки чистоти газу під час приймання", "Сертифікат описує партію на станції; перевірка на прийманні — те, що приїхало до вас"],
        ["h2", "Що перевіряти в сертифікаті"],
        ["li", "**Не лише основну чистоту, а й окремі домішки.** Для азоту й аргону ключові — кисень і волога: саме вони шкодять зварюванню й пакуванню."],
        ["li", "**Точку роси** — вона показує вологу наочніше за ppm."],
        ["li", "**Одиниці.** ppm за обʼємом і за масою — різні числа; порівнюйте однакові."],
        ["li", "**Партію й дату.** Сертифікат має стосуватися саме вашої поставки, а не бути разовим бланком."],
        ["h2", "Для CO₂ діють інші правила"],
        ["p", `Для вуглекислоти, що контактує з харчовими продуктами, чистоти у відсотках недостатньо: нормуються окремі домішки на рівні ppm за ISBT та EIGA. Це розібрано в статті [«Вимоги ISBT та EIGA до якості CO₂»](${postPath(postIsbt, "uk")}). Для азоту, аргону й кисню ємності підбираємо під потрібний сорт: див. [ємності для азоту](${categoryPath(catTanksN2, "uk")}), [аргону](${categoryPath(catTanksAr, "uk")}) і [кисню](${categoryPath(catTanksO2, "uk")}).`],
        ["cta", "Не впевнені, який сорт потрібен вашому процесу?", "Опишіть процес — підкажемо необхідну чистоту й що перевіряти на прийманні, щоб не переплачувати.", "Запитати інженера", "/uk/contacts"],
      ],
      en: [
        ["p", "Suppliers state gas purity in different ways: as a percentage, as two digits separated by a dot, or as a grade under a standard. All of them describe the same thing — how many foreign impurities the gas contains. Yet it is precisely the different notations that make it easy to overpay or receive the wrong gas."],
        ["h2", "How to read 4.6 or 5.0"],
        ["p", "The first digit is the number of nines in the purity, the second is the digit that follows them. **4.6 means 99.996%**, 5.0 is 99.999%, 6.0 is 99.9999%. It is more useful to look at the other side: how many parts per million the impurities take up."],
        ["tbl", "Notation, purity and typical uses", "Notation | Purity | Impurities, ppm | Used for", "2.6 | 99.6% | 4,000 | inerting, purging tanks and lines", "4.0 | 99.99% | 100 | food packaging, laser cutting", "4.6 | 99.996% | 40 | argon welding, general laboratory work", "5.0 | 99.999% | 10 | chromatography, electronics, precision metallurgy", "6.0 | 99.9999% | 1 | semiconductors, analytical instruments"],
        ["p", "Each step up in purity costs noticeably more. So start from what the process needs, not from «let's take the purest»."],
        ["h2", "Grades under standards"],
        ["p", "Documents in the post-Soviet tradition state purity as a grade. For liquid and gaseous nitrogen under GOST 9293 these are technical, high-purity and special-purity grades; for argon under GOST 10157 — premium and first grade; for oxygen — technical and medical. An approximate correspondence:"],
        ["tbl", "Check against the current edition of the standard and the batch certificate", "Gas and grade | Purity, not less than | Roughly equals", "Nitrogen, technical grade 1 | 99.6% | 2.6", "Nitrogen, high purity grade 1 | 99.99% | 4.0", "Nitrogen, special purity grade 1 | 99.999% | 5.0", "Argon, first grade | 99.987% | between 4.0 and 4.6", "Argon, premium grade | 99.993% | about 4.6", "Oxygen, technical grade 1 | 99.7% | 2.7"],
        ["img", PHOTO.lab, "Analysers for checking gas purity on delivery", "The certificate covers the batch at the plant; inspection on receipt covers what arrived at your site"],
        ["h2", "What to check in the certificate"],
        ["li", "**Not only the main purity but individual impurities.** For nitrogen and argon the key ones are oxygen and moisture: they are what harm welding and packaging."],
        ["li", "**Dew point** — it shows moisture more clearly than ppm."],
        ["li", "**Units.** ppm by volume and by mass are different numbers; compare like with like."],
        ["li", "**Batch and date.** The certificate must refer to your delivery, not be a one-off form."],
        ["h2", "CO₂ follows different rules"],
        ["p", `For carbon dioxide in contact with food, a purity percentage is not enough: individual impurities are limited at ppm level by ISBT and EIGA. That is covered in [ISBT and EIGA requirements for CO₂ quality](${postPath(postIsbt, "en")}). For nitrogen, argon and oxygen we size tanks to the grade you need: see [nitrogen](${categoryPath(catTanksN2, "en")}), [argon](${categoryPath(catTanksAr, "en")}) and [oxygen](${categoryPath(catTanksO2, "en")}) tanks.`],
        ["cta", "Not sure which grade your process needs?", "Describe the process — we will tell you the purity required and what to check on delivery so you do not overpay.", "Ask an engineer", "/contacts"],
      ],
      ru: [
        ["p", "Поставщики пишут чистоту газа по-разному: процентами, двумя цифрами через точку или сортом по стандарту. Всё это описывает одно — сколько в газе посторонних примесей. Но переплатить или получить не тот газ легко именно из-за разных способов записи."],
        ["h2", "Как читать обозначения 4.6 или 5.0"],
        ["p", "Первая цифра — количество девяток в чистоте, вторая — последняя цифра после них. **4.6 означает 99,996%**, 5.0 — 99,999%, 6.0 — 99,9999%. Полезнее смотреть с обратной стороны: сколько миллионных долей (ppm) занимают примеси."],
        ["tbl", "Обозначение, чистота и типовые применения", "Обозначение | Чистота | Примеси, ppm | Где применяют", "2.6 | 99,6% | 4 000 | инертизация, продувка ёмкостей и линий", "4.0 | 99,99% | 100 | упаковка пищевых продуктов, лазерная резка", "4.6 | 99,996% | 40 | сварка в аргоне, общие лабораторные задачи", "5.0 | 99,999% | 10 | хроматография, электроника, точная металлургия", "6.0 | 99,9999% | 1 | полупроводники, аналитические приборы"],
        ["p", "Переход на каждую следующую ступень чистоты заметно дорожает. Поэтому начинать стоит с требований процесса, а не с «возьмём самый чистый»."],
        ["h2", "Сорта по стандартам"],
        ["p", "В документах постсоветской традиции чистоту записывают сортом. Для жидкого и газообразного азота по ГОСТ 9293 это технический, повышенной и особой чистоты; для аргона по ГОСТ 10157 — высший и первый сорт; для кислорода — технический и медицинский. Ориентировочное соответствие:"],
        ["tbl", "Сверяйте с действующей редакцией стандарта и сертификатом партии", "Газ и сорт | Чистота не менее | Примерно соответствует", "Азот технический 1 сорт | 99,6% | 2.6", "Азот повышенной чистоты 1 сорт | 99,99% | 4.0", "Азот особой чистоты 1 сорт | 99,999% | 5.0", "Аргон первого сорта | 99,987% | между 4.0 и 4.6", "Аргон высшего сорта | 99,993% | около 4.6", "Кислород технический 1 сорт | 99,7% | 2.7"],
        ["img", PHOTO.lab, "Анализаторы для проверки чистоты газа при приёмке", "Сертификат описывает партию на станции; проверка при приёмке — то, что приехало к вам"],
        ["h2", "Что проверять в сертификате"],
        ["li", "**Не только основную чистоту, но и отдельные примеси.** Для азота и аргона ключевые — кислород и влага: именно они вредят сварке и упаковке."],
        ["li", "**Точку росы** — она показывает влагу нагляднее ppm."],
        ["li", "**Единицы.** ppm по объёму и по массе — разные числа; сравнивайте одинаковые."],
        ["li", "**Партию и дату.** Сертификат должен относиться именно к вашей поставке, а не быть разовым бланком."],
        ["h2", "Для CO₂ действуют другие правила"],
        ["p", `Для углекислоты, контактирующей с пищевыми продуктами, чистоты в процентах недостаточно: нормируются отдельные примеси на уровне ppm по ISBT и EIGA. Это разобрано в статье [«Требования ISBT и EIGA к качеству CO₂»](${postPath(postIsbt, "ru")}). Для азота, аргона и кислорода ёмкости подбираем под нужный сорт: см. [ёмкости для азота](${categoryPath(catTanksN2, "ru")}), [аргона](${categoryPath(catTanksAr, "ru")}) и [кислорода](${categoryPath(catTanksO2, "ru")}).`],
        ["cta", "Не уверены, какой сорт нужен вашему процессу?", "Опишите процесс — подскажем необходимую чистоту и что проверять при приёмке, чтобы не переплачивать.", "Спросить инженера", "/ru/contacts"],
      ],
    },
    "gg",
  ),
  faq: [
    faq(
      "faq-gg-1",
      {
        en: "Which argon purity is needed for TIG welding?",
        uk: "Яка чистота аргону потрібна для зварювання TIG?",
        ru: "Какая чистота аргона нужна для сварки TIG?",
      },
      {
        en: "Usually 4.6 (99.996%), which corresponds to premium grade argon. Higher purity rarely improves the weld; far more often the problem is moisture or air getting in through hoses and connections rather than the gas itself.",
        uk: "Зазвичай 4.6 (99,996%), що відповідає аргону вищого сорту. Вища чистота рідко покращує шов; значно частіше проблема не в газі, а у волозі чи повітрі, що потрапляють крізь шланги й зʼєднання.",
        ru: "Обычно 4.6 (99,996%), что соответствует аргону высшего сорта. Более высокая чистота редко улучшает шов; значительно чаще проблема не в газе, а во влаге или воздухе, попадающих через шланги и соединения.",
      },
    ),
    faq(
      "faq-gg-2",
      {
        en: "Is nitrogen from a generator as good as liquid nitrogen?",
        uk: "Чи дорівнює азот із генератора рідкому азоту?",
        ru: "Равен ли азот из генератора жидкому азоту?",
      },
      {
        en: "Not by default. Membrane and PSA generators typically give 95–99.99% depending on flow, while liquid nitrogen is usually 5.0 or better. For inerting and many packaging jobs a generator is enough; for laser cutting at high speed or electronics, check the required purity first.",
        uk: "Не за замовчуванням. Мембранні й адсорбційні генератори зазвичай дають 95–99,99% залежно від продуктивності, а рідкий азот, як правило, 5.0 і чистіший. Для інертизації й багатьох задач пакування генератора достатньо; для швидкого лазерного різання чи електроніки спершу перевірте потрібну чистоту.",
        ru: "Не по умолчанию. Мембранные и адсорбционные генераторы обычно дают 95–99,99% в зависимости от производительности, а жидкий азот, как правило, 5.0 и чище. Для инертизации и многих задач упаковки генератора достаточно; для быстрой лазерной резки или электроники сначала проверьте нужную чистоту.",
      },
    ),
  ],
  relatedProducts: [tankN2, tankAr, tankO2],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "Nitrogen, oxygen and argon purity grades: 4.6, 5.0 and standards",
      uk: "Сорти чистоти азоту, кисню й аргону: 4.6, 5.0 і стандарти",
      ru: "Сорта чистоты азота, кислорода и аргона: 4.6, 5.0 и стандарты",
    },
    metaDescription: {
      en: "4.6 is 99.996%, 5.0 is 99.999%. Grade table with uses, how GOST grades map to the notation, and what to check in a gas certificate.",
      uk: "4.6 — це 99,996%, 5.0 — 99,999%. Таблиця сортів із застосуваннями, відповідність сортів ГОСТ і що перевіряти в сертифікаті на газ.",
      ru: "4.6 — это 99,996%, 5.0 — 99,999%. Таблица сортов с применениями, соответствие сортов ГОСТ и что проверять в сертификате на газ.",
    },
    keywords: {
      en: "nitrogen purity grade 5.0, argon purity 4.6, industrial gas purity grades",
      uk: "азот особливої чистоти 1 сорт, аргон вищого сорту, чистота газу 4.6",
      ru: "азот особой чистоты 1 сорт, аргон высший сорт, чистота газа 4.6",
    },
  },
};

/* ─── Стаття: довідник властивостей зріджених газів ────────────────────── */

export const postGasProperties: SeedPost = {
  _id: "post-liquefied-gas-properties",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Properties of liquid nitrogen, oxygen, argon and CO₂: reference table",
    uk: "Властивості рідкого азоту, кисню, аргону й CO₂: довідкова таблиця",
    ru: "Свойства жидкого азота, кислорода, аргона и CO₂: справочная таблица",
  },
  slug: {
    en: { current: "liquefied-gas-properties-table" },
    uk: { current: "vlastyvosti-zridzhenykh-gaziv" },
    ru: { current: "svoystva-szhizhennyh-gazov" },
  },
  isPublished: true,
  isFeatured: false,
  publishedAt: "2026-09-15T10:30:00Z",
  updatedAt: "2026-09-15T10:30:00Z",
  readingTimeMinutes: 3,
  author: seedAuthor,
  categories: [catQuality],
  tags: ["довідник", "азот", "кисень", "аргон", "CO2"],
  coverImage: img(PHOTO.tankVertical, {
    en: "Vertical cryogenic storage tank for liquefied gases",
    uk: "Вертикальна кріогенна ємність для зріджених газів",
    ru: "Вертикальная криогенная ёмкость для сжиженных газов",
  }),
  excerpt: {
    en: "Boiling point, liquid density, gas yield per kilogram and per litre, critical temperature and hazards — the figures engineers look up most often, in one place.",
    uk: "Температура кипіння, густина рідини, вихід газу з кілограма й літра, критична температура й небезпеки — цифри, які інженери шукають найчастіше, в одному місці.",
    ru: "Температура кипения, плотность жидкости, выход газа с килограмма и литра, критическая температура и опасности — цифры, которые инженеры ищут чаще всего, в одном месте.",
  },
  body: body(
    {
      uk: [
        ["p", "Довідкові значення для чотирьох газів, з якими працюють кріогенні системи. Газові обʼєми наведені за 15 °C і 1 бар — так само рахують ціни й поставки в інших статтях блогу."],
        ["h2", "Основні властивості"],
        ["tbl", "Значення за атмосферного тиску, якщо не вказано інше", "Параметр | Азот N₂ | Кисень O₂ | Аргон Ar | Вуглекислота CO₂", "Молярна маса, г/моль | 28,01 | 32,00 | 39,95 | 44,01", "Температура кипіння | −195,8 °C | −183,0 °C | −185,9 °C | сублімує за −78,5 °C", "Густина рідини, кг/м³ | 809 | 1 141 | 1 394 | ≈ 1 030 за −20 °C і 20 бар", "Густина газу за 15 °C, кг/м³ | 1,18 | 1,35 | 1,69 | 1,86", "Газу з 1 кг, м³ | 0,84 | 0,74 | 0,59 | 0,54", "Газу з 1 л рідини, м³ | 0,68 | 0,84 | 0,82 | ≈ 0,56", "Критична температура | −146,9 °C | −118,6 °C | −122,3 °C | +31,0 °C", "Колір рідини | безбарвна | блідо-блакитна | безбарвна | безбарвна", "Головна небезпека | витісняє кисень | сильний окисник | витісняє кисень | фізіологічно активний, накопичується внизу"],
        ["h2", "Що з цього випливає на практиці"],
        ["li", "**Рідкий CO₂ не існує за атмосферного тиску.** Нижче 5,2 бар він переходить у сніг або газ, тому зберігається лише під тиском — близько 20 бар за −20 °C."],
        ["li", "**Критична температура CO₂ +31 °C.** У спеку балон із вуглекислотою містить уже не рідину й газ, а надкритичний флюїд — звідси обмеження норми наповнення."],
        ["li", "**Кубометр рідкого аргону важчий за кубометр рідкого азоту майже вдвічі.** Порівнювати ціни за літр між різними газами не можна — лише за кілограм."],
        ["li", "**Кисень — окисник.** Масло, жир і горючі матеріали поруч із рідким киснем здатні займатися; обладнання для нього знежирюють."],
        ["img", PHOTO.vaporizers, "Атмосферні випарники перетворюють зріджений газ на газ для подачі споживачам", "Один літр рідкого азоту дає близько 680 л газу — звідси розмір випарників"],
        ["h2", "Де ці цифри знадобляться"],
        ["p", `Густина й вихід газу — основа будь-якого розрахунку ємності: скільки тонн вміщає посудина і скільки кубометрів газу вона видасть. Готові таблиці для ємностей різних обʼємів є в категоріях [ємностей для азоту](${categoryPath(catTanksN2, "uk")}), [кисню](${categoryPath(catTanksO2, "uk")}) і [аргону](${categoryPath(catTanksAr, "uk")}). Перерахунок цін між кілограмами, літрами й кубометрами — у статті [«Ціна CO₂, азоту й аргону»](${postPath(postPriceUnits, "uk")}).`],
      ],
      en: [
        ["p", "Reference values for the four gases cryogenic systems work with. Gas volumes are given at 15 °C and 1 bar — the same basis used for prices and deliveries in the other blog articles."],
        ["h2", "Key properties"],
        ["tbl", "Values at atmospheric pressure unless stated otherwise", "Parameter | Nitrogen N₂ | Oxygen O₂ | Argon Ar | Carbon dioxide CO₂", "Molar mass, g/mol | 28.01 | 32.00 | 39.95 | 44.01", "Boiling point | −195.8 °C | −183.0 °C | −185.9 °C | sublimes at −78.5 °C", "Liquid density, kg/m³ | 809 | 1,141 | 1,394 | ≈ 1,030 at −20 °C and 20 bar", "Gas density at 15 °C, kg/m³ | 1.18 | 1.35 | 1.69 | 1.86", "Gas from 1 kg, m³ | 0.84 | 0.74 | 0.59 | 0.54", "Gas from 1 l of liquid, m³ | 0.68 | 0.84 | 0.82 | ≈ 0.56", "Critical temperature | −146.9 °C | −118.6 °C | −122.3 °C | +31.0 °C", "Liquid colour | colourless | pale blue | colourless | colourless", "Main hazard | displaces oxygen | strong oxidiser | displaces oxygen | physiologically active, collects low"],
        ["h2", "What follows in practice"],
        ["li", "**Liquid CO₂ does not exist at atmospheric pressure.** Below 5.2 bar it turns into snow or gas, so it is stored only under pressure — about 20 bar at −20 °C."],
        ["li", "**The critical temperature of CO₂ is +31 °C.** In hot weather a CO₂ cylinder holds a supercritical fluid rather than liquid and gas — hence the limit on the filling ratio."],
        ["li", "**A cubic metre of liquid argon weighs almost twice as much as one of liquid nitrogen.** Prices per litre cannot be compared across gases — only per kilogram."],
        ["li", "**Oxygen is an oxidiser.** Oil, grease and combustibles near liquid oxygen can ignite; equipment for it is degreased."],
        ["img", PHOTO.vaporizers, "Ambient vaporizers turn liquefied gas into gas for consumers", "One litre of liquid nitrogen gives about 680 l of gas — which is what sizes the vaporizers"],
        ["h2", "Where these figures are needed"],
        ["p", `Density and gas yield are the basis of any tank calculation: how many tonnes a vessel holds and how many cubic metres of gas it delivers. Ready tables for tanks of different volumes are in the [nitrogen](${categoryPath(catTanksN2, "en")}), [oxygen](${categoryPath(catTanksO2, "en")}) and [argon](${categoryPath(catTanksAr, "en")}) tank categories. Price conversion between kilograms, litres and cubic metres is in [Price of CO₂, nitrogen and argon](${postPath(postPriceUnits, "en")}).`],
      ],
      ru: [
        ["p", "Справочные значения для четырёх газов, с которыми работают криогенные системы. Газовые объёмы приведены при 15 °C и 1 бар — так же считают цены и поставки в других статьях блога."],
        ["h2", "Основные свойства"],
        ["tbl", "Значения при атмосферном давлении, если не указано иное", "Параметр | Азот N₂ | Кислород O₂ | Аргон Ar | Углекислота CO₂", "Молярная масса, г/моль | 28,01 | 32,00 | 39,95 | 44,01", "Температура кипения | −195,8 °C | −183,0 °C | −185,9 °C | сублимирует при −78,5 °C", "Плотность жидкости, кг/м³ | 809 | 1 141 | 1 394 | ≈ 1 030 при −20 °C и 20 бар", "Плотность газа при 15 °C, кг/м³ | 1,18 | 1,35 | 1,69 | 1,86", "Газа из 1 кг, м³ | 0,84 | 0,74 | 0,59 | 0,54", "Газа из 1 л жидкости, м³ | 0,68 | 0,84 | 0,82 | ≈ 0,56", "Критическая температура | −146,9 °C | −118,6 °C | −122,3 °C | +31,0 °C", "Цвет жидкости | бесцветная | бледно-голубая | бесцветная | бесцветная", "Главная опасность | вытесняет кислород | сильный окислитель | вытесняет кислород | физиологически активен, накапливается внизу"],
        ["h2", "Что из этого следует на практике"],
        ["li", "**Жидкий CO₂ не существует при атмосферном давлении.** Ниже 5,2 бар он переходит в снег или газ, поэтому хранится только под давлением — около 20 бар при −20 °C."],
        ["li", "**Критическая температура CO₂ +31 °C.** В жару баллон с углекислотой содержит уже не жидкость и газ, а сверхкритический флюид — отсюда ограничение нормы наполнения."],
        ["li", "**Кубометр жидкого аргона тяжелее кубометра жидкого азота почти вдвое.** Сравнивать цены за литр между разными газами нельзя — только за килограмм."],
        ["li", "**Кислород — окислитель.** Масло, жир и горючие материалы рядом с жидким кислородом способны воспламениться; оборудование для него обезжиривают."],
        ["img", PHOTO.vaporizers, "Атмосферные испарители превращают сжиженный газ в газ для подачи потребителям", "Один литр жидкого азота даёт около 680 л газа — отсюда размер испарителей"],
        ["h2", "Где эти цифры пригодятся"],
        ["p", `Плотность и выход газа — основа любого расчёта ёмкости: сколько тонн вмещает сосуд и сколько кубометров газа он выдаст. Готовые таблицы для ёмкостей разных объёмов есть в категориях [ёмкостей для азота](${categoryPath(catTanksN2, "ru")}), [кислорода](${categoryPath(catTanksO2, "ru")}) и [аргона](${categoryPath(catTanksAr, "ru")}). Пересчёт цен между килограммами, литрами и кубометрами — в статье [«Цена CO₂, азота и аргона»](${postPath(postPriceUnits, "ru")}).`],
      ],
    },
    "gp",
  ),
  faq: [
    faq(
      "faq-gp-1",
      {
        en: "How many cubic metres of gas are in a litre of liquid nitrogen?",
        uk: "Скільки кубометрів газу в літрі рідкого азоту?",
        ru: "Сколько кубометров газа в литре жидкого азота?",
      },
      {
        en: "About 0.68 m³ at 15 °C and atmospheric pressure, or roughly 0.69 m³ at 20 °C. That is the familiar expansion ratio of about 1 to 700.",
        uk: "Близько 0,68 м³ за 15 °C і атмосферного тиску, або приблизно 0,69 м³ за 20 °C. Це і є відоме співвідношення розширення приблизно 1 до 700.",
        ru: "Около 0,68 м³ при 15 °C и атмосферном давлении, или примерно 0,69 м³ при 20 °C. Это и есть известное соотношение расширения примерно 1 к 700.",
      },
    ),
    faq(
      "faq-gp-2",
      {
        en: "Why is liquid oxygen blue?",
        uk: "Чому рідкий кисень блакитний?",
        ru: "Почему жидкий кислород голубой?",
      },
      {
        en: "Oxygen molecules absorb a little red light, so the liquid looks pale blue. Liquid oxygen is also weakly attracted by a magnet — a property the other three gases in the table do not have.",
        uk: "Молекули кисню трохи поглинають червоне світло, тож рідина виглядає блідо-блакитною. Рідкий кисень ще й слабко притягується магнітом — властивість, якої немає в інших трьох газів із таблиці.",
        ru: "Молекулы кислорода немного поглощают красный свет, поэтому жидкость выглядит бледно-голубой. Жидкий кислород ещё и слабо притягивается магнитом — свойство, которого нет у трёх других газов из таблицы.",
      },
    ),
  ],
  relatedProducts: [tankN2, tankO2, tankAr, tankCo2],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "Liquid nitrogen, oxygen, argon and CO₂ properties table",
      uk: "Властивості рідкого азоту, кисню, аргону й CO₂: таблиця",
      ru: "Свойства жидкого азота, кислорода, аргона и CO₂: таблица",
    },
    metaDescription: {
      en: "Boiling point, liquid density, gas per kilogram and per litre, critical temperature and hazards of N₂, O₂, Ar and CO₂ in one reference table.",
      uk: "Температура кипіння, густина рідини, газ із кілограма й літра, критична температура й небезпеки N₂, O₂, Ar і CO₂ в одній довідковій таблиці.",
      ru: "Температура кипения, плотность жидкости, газ из килограмма и литра, критическая температура и опасности N₂, O₂, Ar и CO₂ в одной справочной таблице.",
    },
    keywords: {
      en: "liquid nitrogen temperature, liquid argon density, liquefied gas properties",
      uk: "рідкий азот скільки градусів, густина рідкого аргону, властивості зріджених газів",
      ru: "жидкий азот сколько градусов, плотность жидкого аргона, свойства сжиженных газов",
    },
  },
};

export const gasPosts: SeedPost[] = [
  postNitrogenStorage,
  postNitrogenVsDryIce,
  postGasGrades,
  postGasProperties,
];
