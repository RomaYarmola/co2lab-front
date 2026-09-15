import type { Landing } from "./types";

/**
 * Попит: «вуглекислота для зварювання» (13 показів у GSC, поз. 9,7),
 * «углекислота для полуавтомата», «аргон для сварки», «углекислота или смесь».
 * Стаття-порівняння вже ранжується — ця сторінка дає їй комерційне продовження.
 */
export const weldingLanding: Landing = {
  id: "welding",
  path: "/solutions/industries/welding",
  seo: {
    title: {
      en: "Centralised CO₂ and argon supply for welding shops",
      uk: "Газопостачання зварювальних цехів: CO₂ та аргон",
      ru: "Газоснабжение сварочных цехов: CO₂ и аргон",
    },
    description: {
      en: "When a welding shop should move from cylinders to a tank: consumption per post, cylinder count, tank and vaporizer sizing for CO₂ and argon.",
      uk: "Коли зварювальному цеху час переходити з балонів на ємність: витрата на пост, кількість балонів, підбір ємності й випарника для CO₂ та аргону.",
      ru: "Когда сварочному цеху пора переходить с баллонов на ёмкость: расход на пост, количество баллонов, подбор ёмкости и испарителя для CO₂ и аргона.",
    },
  },
  shortTitle: {
    en: "Welding shops",
    uk: "Зварювальні цехи",
    ru: "Сварочные цеха",
  },
  eyebrow: { en: "Industries", uk: "Галузі", ru: "Отрасли" },
  title: {
    en: "Centralised gas supply for welding shops",
    uk: "Централізоване газопостачання зварювальних цехів",
    ru: "Централизованное газоснабжение сварочных цехов",
  },
  lead: {
    en: "From about a tonne of gas a month, cylinders cost more in handling than in gas. A stationary tank with a vaporizer and a distribution ring puts shielding gas at every post from a wall outlet.",
    uk: "Приблизно від тонни газу на місяць балони коштують дорожче в обслуговуванні, ніж у газі. Стаціонарна ємність із випарником і розвідним кільцем подає захисний газ на кожен пост із настінного виводу.",
    ru: "Примерно от тонны газа в месяц баллоны стоят дороже в обслуживании, чем в газе. Стационарная ёмкость с испарителем и разводящим кольцом подаёт защитный газ на каждый пост из настенного вывода.",
  },
  image: {
    src: "/images/industriesWeServePage/chemical/imageOne.webp",
    alt: {
      en: "Industrial gas piping and fittings in a metalworking shop",
      uk: "Промислова газова обвʼязка й арматура в металообробному цеху",
      ru: "Промышленная газовая обвязка и арматура в металлообрабатывающем цехе",
    },
  },
  body: {
    uk: [
      ["h2", "Коли час переходити з балонів"],
      ["tbl", "Пост 12 л/хв, 50% часу горіння дуги, 22 робочі дні", "Постів | CO₂ на місяць | Балонів 40 л на місяць | Замін на день", "3 | ≈ 350 кг | 15 | менше 1", "10 | ≈ 1,2 т | 49 | 2", "20 | ≈ 2,3 т | 98 | 4–5", "40 | ≈ 4,7 т | 195 | 9"],
      ["p", "Від 10 постів балонний парк перетворюється на окрему роботу: котити, закріплювати, підписувати накладні, зупиняти зварювання на заміні. Плюс 1–2 кг невибірного залишку в кожному балоні, оплачені й не використані."],
      ["h2", "Що входить у систему"],
      ["li", "[Ємність для рідкого CO₂](cat:cat-tanks-co2) і, якщо цех працює на суміші, [ємність для рідкого аргону](cat:cat-tanks-ar)."],
      ["li", "[Випарник CO₂](cat:cat-co2-vaporizers) або [атмосферний випарник аргону](cat:cat-ambient-vaporizers) під пікове споживання: на початку зміни дугу запалюють усі пости одночасно."],
      ["li", "Розвідне кільце по цеху й настінні пости з редукуванням і ротаметрами."],
      ["li", "Змішування аргону з CO₂ на майданчику або готова суміш — вирішуємо за економікою вашого цеху."],
      ["li", "[Монтаж під ключ](cat:cat-installation): траси, випробування на герметичність, пусконалагодження."],
      ["h2", "Чиста вуглекислота чи суміш"],
      ["tbl", "Захисні гази для MAG-зварювання вуглецевої сталі, EN ISO 14175", "Позначення | Склад | Розбризкування | Де доречний", "C1 | 100% CO₂ | високе | товстий метал, металоконструкції", "M21 | Ar + 15–25% CO₂ | низьке | загальне виробництво, видимі шви", "M20 | Ar + 5–15% CO₂ | дуже низьке | тонкий лист, роботизовані лінії"],
      ["p", "Чиста CO₂ дешевша за кілограм, але бризки — це куплений і розплавлений дріт, який потім знімають вручну. Як порахувати, що вигідніше саме вам, розібрано в статті [«Вуглекислота чи суміш з аргоном для зварювання»](post:post-co2-for-welding)."],
      ["cta", "Скільки постів у вашому цеху?", "Надішліть кількість постів, витрату й частку часу горіння дуги — порахуємо споживання, підберемо ємність, випарник і схему розвідного кільця.", "Отримати розрахунок", "page:/contacts"],
    ],
    en: [
      ["h2", "When to move away from cylinders"],
      ["tbl", "Post at 12 l/min, 50% arc-on time, 22 working days", "Posts | CO₂ per month | 40 l cylinders per month | Swaps per day", "3 | ≈ 350 kg | 15 | under 1", "10 | ≈ 1.2 t | 49 | 2", "20 | ≈ 2.3 t | 98 | 4–5", "40 | ≈ 4.7 t | 195 | 9"],
      ["p", "From ten posts the cylinder fleet becomes a job of its own: rolling, securing, signing delivery notes, stopping welding at every swap. On top of that, 1–2 kg of unusable heel in each cylinder is paid for and never used."],
      ["h2", "What the system includes"],
      ["li", "A [liquid CO₂ tank](cat:cat-tanks-co2) and, if the shop welds with a mix, a [liquid argon tank](cat:cat-tanks-ar)."],
      ["li", "A [CO₂ vaporizer](cat:cat-co2-vaporizers) or an [ambient argon vaporizer](cat:cat-ambient-vaporizers) sized for peak draw: every post strikes an arc at the start of a shift."],
      ["li", "A distribution ring around the shop with wall outlets, regulators and flow meters."],
      ["li", "On-site Ar/CO₂ mixing or a ready-made mixture — decided on the economics of your shop."],
      ["li", "[Turnkey installation](cat:cat-installation): piping, leak testing, commissioning."],
      ["h2", "Pure CO₂ or a mixture"],
      ["tbl", "Shielding gases for MAG welding of carbon steel, EN ISO 14175", "Designation | Composition | Spatter | Where it fits", "C1 | 100% CO₂ | high | thick sections, structural work", "M21 | Ar + 15–25% CO₂ | low | general fabrication, visible welds", "M20 | Ar + 5–15% CO₂ | very low | thin sheet, robotic lines"],
      ["p", "Pure CO₂ is cheaper per kilogram, but spatter is wire you bought, melted and then removed by hand. How to work out which is cheaper for your shop is covered in [CO₂ or an argon mix for welding](post:post-co2-for-welding)."],
      ["cta", "How many posts does your shop run?", "Send the number of posts, flow rate and arc-on share — we will calculate consumption and size the tank, vaporizer and distribution ring.", "Get a calculation", "page:/contacts"],
    ],
    ru: [
      ["h2", "Когда пора уходить с баллонов"],
      ["tbl", "Пост 12 л/мин, 50% времени горения дуги, 22 рабочих дня", "Постов | CO₂ в месяц | Баллонов 40 л в месяц | Замен в день", "3 | ≈ 350 кг | 15 | меньше 1", "10 | ≈ 1,2 т | 49 | 2", "20 | ≈ 2,3 т | 98 | 4–5", "40 | ≈ 4,7 т | 195 | 9"],
      ["p", "От 10 постов баллонный парк превращается в отдельную работу: катить, закреплять, подписывать накладные, останавливать сварку на замене. Плюс 1–2 кг невыбираемого остатка в каждом баллоне, оплаченные и не использованные."],
      ["h2", "Что входит в систему"],
      ["li", "[Ёмкость для жидкого CO₂](cat:cat-tanks-co2) и, если цех работает на смеси, [ёмкость для жидкого аргона](cat:cat-tanks-ar)."],
      ["li", "[Испаритель CO₂](cat:cat-co2-vaporizers) или [атмосферный испаритель аргона](cat:cat-ambient-vaporizers) под пиковое потребление: в начале смены дугу зажигают все посты одновременно."],
      ["li", "Разводящее кольцо по цеху и настенные посты с редуцированием и ротаметрами."],
      ["li", "Смешивание аргона с CO₂ на площадке или готовая смесь — решаем по экономике вашего цеха."],
      ["li", "[Монтаж под ключ](cat:cat-installation): трассы, испытание на герметичность, пусконаладка."],
      ["h2", "Чистая углекислота или смесь"],
      ["tbl", "Защитные газы для MAG-сварки углеродистой стали, EN ISO 14175", "Обозначение | Состав | Разбрызгивание | Где уместен", "C1 | 100% CO₂ | высокое | толстый металл, металлоконструкции", "M21 | Ar + 15–25% CO₂ | низкое | общее производство, видимые швы", "M20 | Ar + 5–15% CO₂ | очень низкое | тонкий лист, роботизированные линии"],
      ["p", "Чистая CO₂ дешевле за килограмм, но брызги — это купленная и расплавленная проволока, которую потом снимают вручную. Как посчитать, что выгоднее именно вам, разобрано в статье [«Углекислота или смесь с аргоном для сварки»](post:post-co2-for-welding)."],
      ["cta", "Сколько постов в вашем цехе?", "Пришлите количество постов, расход и долю времени горения дуги — посчитаем потребление, подберём ёмкость, испаритель и схему разводящего кольца.", "Получить расчёт", "page:/contacts"],
    ],
  },
  hubs: ["cat-tanks-co2", "cat-tanks-ar", "cat-co2-vaporizers", "cat-ambient-vaporizers", "cat-installation"],
  posts: ["post-co2-for-welding", "post-co2-cylinder-capacity", "post-co2-price-units", "post-cylinder-colour-marking"],
  faq: [
    {
      question: {
        en: "Does CO₂ for welding have to be food grade?",
        uk: "Чи потрібна для зварювання харчова вуглекислота?",
        ru: "Нужна ли для сварки пищевая углекислота?",
      },
      answer: {
        en: "No. Welding needs technical CO₂ of adequate purity and, above all, dry gas: moisture is what causes porosity in the weld. Food grade costs more and gives welding nothing extra.",
        uk: "Ні. Для зварювання потрібна технічна вуглекислота достатньої чистоти й передусім суха: саме волога дає пористість шва. Харчова марка дорожча й зварюванню нічого не додає.",
        ru: "Нет. Для сварки нужна техническая углекислота достаточной чистоты и прежде всего сухая: именно влага даёт пористость шва. Пищевая марка дороже и сварке ничего не добавляет.",
      },
    },
    {
      question: {
        en: "Does welding CO₂ burn or explode?",
        uk: "Чи горить і чи вибухає вуглекислота для зварювання?",
        ru: "Горит ли и взрывается ли углекислота для сварки?",
      },
      answer: {
        en: "The gas neither burns nor supports combustion. The hazards are pressure in the cylinder or vessel and accumulation in pits and closed rooms, where CO₂ displaces air and acts on breathing at a few percent.",
        uk: "Газ не горить і не підтримує горіння. Небезпеки інші: тиск у балоні чи посудині та накопичення в приямках і закритих приміщеннях, де CO₂ витісняє повітря й діє на дихання вже за кількох відсотків.",
        ru: "Газ не горит и не поддерживает горение. Опасности другие: давление в баллоне или сосуде и накопление в приямках и закрытых помещениях, где CO₂ вытесняет воздух и действует на дыхание уже при нескольких процентах.",
      },
    },
  ],
};
