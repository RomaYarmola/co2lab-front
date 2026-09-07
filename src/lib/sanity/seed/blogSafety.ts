/**
 * Блог: безпека й якість газу.
 *
 * Два запити з різних кінців воронки, які насправді про одне — довіру
 * до продукту: «чи шкідлива вуглекислота / чем опасна углекислота» і
 * «углекислота пищевая и техническая разница».
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
  catInstallation,
  catQuality,
  postIsbt,
  seedAuthor,
  seedProduct,
  type SeedPost,
} from "./blog.ts";
import { labCategory } from "./equipment.ts";

const tank30 = seedProduct("product-tank-co2-30");
const labKit = seedProduct("product-co2-lab-kit");
const install = seedProduct("product-installation-turnkey");

/** Сайт-побратим замовника: сухий лід із харчової вуглекислоти. */
const ICELAB_FOOD = {
  en: "https://icelab.com.ua/catalog/c/harchovyi-lid",
  uk: "https://icelab.com.ua/catalog/c/harchovyi-lid",
  ru: "https://icelab.com.ua/ru/catalog/c/harchovyi-lid",
};

const PHOTO = {
  crane: "/images/catalog/cryogenic-tank-installation-crane.webp",
  vaporizers: "/images/catalog/ambient-air-vaporizers-range.webp",
  lab: "/images/catalog/co2-quality-control-laboratory.webp",
  standards: "/images/supplyPage/standards/standards.webp",
};

/* ─── Стаття: безпека CO₂ на майданчику ───────────────────────────────── */

export const postSafety: SeedPost = {
  _id: "post-co2-safety-on-site",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "What makes CO₂ dangerous and what has to be on site because of it",
    uk: "Чим небезпечний CO₂ і що через це має бути на майданчику",
    ru: "Чем опасен CO₂ и что из-за этого должно быть на площадке",
  },
  slug: {
    en: { current: "co2-safety-on-site" },
    uk: { current: "chym-nebezpechnyi-co2-na-maydanchyku" },
    ru: { current: "chem-opasen-co2-na-ploshchadke" },
  },
  isPublished: true,
  isFeatured: false,
  publishedAt: "2026-09-07T13:30:00Z",
  updatedAt: "2026-09-07T13:30:00Z",
  readingTimeMinutes: 4,
  author: seedAuthor,
  categories: [catInstallation],
  tags: ["CO2", "безпека", "експлуатація"],
  coverImage: img(PHOTO.crane, {
    en: "Crane installing a cryogenic tank on a prepared foundation",
    uk: "Кран встановлює кріогенну ємність на підготовлений фундамент",
    ru: "Кран устанавливает криогенную ёмкость на подготовленный фундамент",
  }),
  excerpt: {
    en: "CO₂ is not flammable and not toxic in the usual sense, which is exactly why it gets underestimated. Concentration table, the three real hazards, and the site checklist that closes them.",
    uk: "CO₂ не горить і не отруйний у звичному сенсі — саме тому його недооцінюють. Таблиця концентрацій, три реальні небезпеки й чекліст майданчика, який їх закриває.",
    ru: "CO₂ не горит и не ядовит в привычном смысле — именно поэтому его недооценивают. Таблица концентраций, три реальные опасности и чек-лист площадки, который их закрывает.",
  },
  body: body(
    {
      en: [
        ["p", "Carbon dioxide does not burn, does not explode and does not smell. That combination is why it is the industrial gas people are least careful around — and why the incidents that do happen tend to be serious. The gas is heavier than air, invisible, and gives almost no warning before it takes someone down."],
        ["h2", "It is not just an asphyxiant"],
        ["p", "Nitrogen kills by displacing oxygen. CO₂ does that too, but it also acts on the body directly: it drives up the breathing rate, then causes headache, confusion and loss of consciousness at concentrations where there is still plenty of oxygen. That is why the exposure limits for CO₂ are far lower than for inert gases."],
        ["tbl", "Effect of CO₂ concentration in air", "Concentration | What happens", "0.04% (400 ppm) | Normal atmospheric background", "0.5% (5 000 ppm) | Occupational exposure limit, 8-hour average", "1.5% (15 000 ppm) | Short-term exposure limit; noticeably faster breathing", "3% | Headache and shortness of breath within minutes", "5% | Severe breathlessness and confusion in 10–15 minutes", "8–10% | Loss of consciousness within a few minutes", "above 17% | Loss of consciousness in under a minute, fatal without rescue"],
        ["p", "**CO₂ is about 1.5 times heavier than air.** It flows downhill, pools in pits, cellars, cable trenches and stairwells, and stays there. A leak that would be harmless in an open yard becomes lethal in a basement filling station or an inspection pit two metres away."],
        ["h2", "The three hazards, in order of how often they hurt people"],
        ["li", "**Accumulation in a low, poorly ventilated space.** Gas from a relief valve, a leaking connection or simply from sublimating dry ice fills the lowest point first."],
        ["li", "**Cold burns.** Liquid CO₂ in the tank is at about −20 °C, and gas escaping from a broken connection expands and forms dry ice snow at −78.5 °C. Contact is instant tissue damage, and the skin sticks to cold metal."],
        ["li", "**Pressure.** A cylinder or vessel that is heated, dropped or has its relief path blocked is a stored-energy hazard, independent of the gas inside it."],
        ["img", PHOTO.vaporizers, "Ambient air vaporizers installed outdoors next to a cryogenic vessel", "Vaporizers and relief lines belong outdoors, with the discharge pointed away from walkways"],
        ["h2", "What has to be on the site"],
        ["tbl", "Minimum safety set for a CO₂ installation", "Item | Requirement | Why", "Gas detection | sensors at the lowest point, alarm at 0.5% and 1.5% | the gas gives no warning of its own", "Ventilation | forced extraction from the floor level | CO₂ collects at the bottom, not at the ceiling", "Relief discharge | routed outdoors, above head height, away from intakes | a relief valve can vent a lot of gas quickly", "PPE | cryogenic gloves, face shield, long sleeves | protection against cold burns", "Access control | no lone working in pits and enclosed rooms | an unconscious person cannot call for help", "Signage | hazard marking at the entrance to every gas room | for contractors and emergency services"],
        ["p", "Two rules that matter more than any single piece of equipment: **never enter a pit or a closed gas room alone**, and **never trust your own perception of the air**. There is no smell, no irritation and no visible cloud until it is far too late — the detector is the only honest witness."],
        ["h2", "Transport and documents"],
        ["p", "In road transport CO₂ falls under ADR class 2: UN 1013 for compressed gas in cylinders and UN 2187 for refrigerated liquid in a tanker. Both are non-flammable, non-toxic gases by classification code — a wording that regularly misleads people into treating a delivery as routine cargo. The classification describes fire risk, not the risk of a confined space."],
        ["p", `The site documentation that follows the equipment matters too. A [turnkey installation](${productPath(install, "en")}) should hand over the vessel passport, the relief valve settings, the commissioning report and the operating procedure — not just a working system. If the operating procedure is missing, the site is running on the memory of whoever was present at start-up.`],
        ["h2", "Seasonal points people forget"],
        ["li", "In frost an ambient vaporizer ices up and loses capacity, and staff are tempted to bypass it. The bypass is what delivers liquid into a gas line."],
        ["li", "In heat the pressure in the vessel rises and the relief valve operates more often. If the discharge is routed badly, the summer is when it becomes obvious."],
        ["li", "Snow drifted around the base of a vessel hides leaks and blocks the escape route from the enclosure."],
        ["cta", "Need a safety review of an existing installation?", "We inspect the site, check the relief routing, ventilation and detection, and hand over a written list of what to fix and in what order.", "Book a site review", "/contacts"],
      ],
      uk: [
        ["p", "Вуглекислота не горить, не вибухає й не має запаху. Саме через це поєднання це найменш обережно використовуваний промисловий газ — і саме тому інциденти з ним зазвичай виходять важкими. Газ важчий за повітря, невидимий і майже не попереджає, перш ніж звалити людину."],
        ["h2", "Це не просто задушливий газ"],
        ["p", "Азот убиває, витісняючи кисень. CO₂ робить те саме, але ще й діє на організм напряму: прискорює дихання, далі викликає головний біль, сплутаність і втрату свідомості за концентрацій, коли кисню в повітрі ще вдосталь. Тому гранично допустимі рівні для CO₂ значно нижчі, ніж для інертних газів."],
        ["tbl", "Вплив концентрації CO₂ в повітрі", "Концентрація | Що відбувається", "0,04% (400 ppm) | Звичайне атмосферне тло", "0,5% (5 000 ppm) | Межа професійного впливу, середня за 8 годин", "1,5% (15 000 ppm) | Короткочасна межа; помітно прискорене дихання", "3% | Головний біль і задишка за кілька хвилин", "5% | Сильна задишка й сплутаність за 10–15 хвилин", "8–10% | Втрата свідомості за кілька хвилин", "понад 17% | Втрата свідомості менш ніж за хвилину, смерть без порятунку"],
        ["p", "**CO₂ приблизно в півтора раза важчий за повітря.** Він стікає вниз, накопичується в приямках, підвалах, кабельних лотках і на сходових майданчиках і лишається там. Витік, безпечний на відкритому майданчику, стає смертельним у підвальній наповнювальній станції чи в оглядовій ямі за два метри."],
        ["h2", "Три небезпеки в порядку того, як часто вони калічать"],
        ["li", "**Накопичення в низькому непровітрюваному місці.** Газ із запобіжного клапана, з негерметичного зʼєднання чи просто від сублімації сухого льоду заповнює найнижчу точку першою."],
        ["li", "**Холодові опіки.** Рідкий CO₂ в ємності має близько −20 °C, а газ, що виривається з розірваного зʼєднання, розширюється й утворює сніг із температурою −78,5 °C. Контакт — це миттєве ураження тканин, а шкіра прилипає до холодного металу."],
        ["li", "**Тиск.** Балон або посудина, які нагріли, впустили чи в яких перекрили шлях скидання, — це запасена енергія, незалежно від того, який газ усередині."],
        ["img", PHOTO.vaporizers, "Атмосферні випарники, встановлені надворі поруч із кріогенною посудиною", "Випарники й лінії скидання мають бути назовні, а викид — спрямований подалі від проходів"],
        ["h2", "Що має бути на майданчику"],
        ["tbl", "Мінімальний набір безпеки для установки з CO₂", "Елемент | Вимога | Навіщо", "Газоаналіз | датчики в найнижчій точці, сигналізація на 0,5% і 1,5% | газ ніяк не попереджає про себе сам", "Вентиляція | примусова витяжка з рівня підлоги | CO₂ збирається внизу, а не під стелею", "Скидання з клапана | виведене назовні, вище рівня голови, подалі від заборів повітря | запобіжний клапан здатен швидко скинути багато газу", "ЗІЗ | кріогенні рукавиці, щиток, довгий рукав | захист від холодових опіків", "Порядок доступу | заборона одиночних робіт у приямках і закритих приміщеннях | людина без свідомості не покличе на допомогу", "Знаки | маркування небезпеки на вході в кожне газове приміщення | для підрядників і рятувальних служб"],
        ["p", "Два правила, які важать більше за будь-яке окреме обладнання: **ніколи не заходити в приямок чи закрите газове приміщення наодинці** і **ніколи не довіряти власному відчуттю повітря**. Ні запаху, ні подразнення, ні видимої хмари не буде, поки не стане надто пізно — єдиний чесний свідок тут датчик."],
        ["h2", "Перевезення й документи"],
        ["p", "У дорожньому перевезенні CO₂ належить до класу 2 ADR: UN 1013 для стисненого газу в балонах і UN 2187 для охолодженої рідини в автоцистерні. Обидва за класифікаційним кодом — негорючі нетоксичні гази, і це формулювання регулярно вводить в оману, змушуючи ставитись до поставки як до звичайного вантажу. Класифікація описує ризик пожежі, а не ризик замкненого простору."],
        ["p", `Документація майданчика теж має значення. [Монтаж під ключ](${productPath(install, "uk")}) передає паспорт посудини, уставки запобіжних клапанів, акт пусконалагодження й інструкцію з експлуатації, а не лише працюючу систему. Якщо інструкції немає, майданчик працює на памʼяті того, хто був присутній під час запуску.`],
        ["h2", "Сезонні речі, про які забувають"],
        ["li", "У мороз атмосферний випарник обмерзає й втрачає продуктивність, і в персоналу зʼявляється спокуса його обійти. Саме байпас і подає рідину в газову лінію."],
        ["li", "У спеку тиск у посудині зростає, а запобіжний клапан спрацьовує частіше. Якщо скидання виведене погано, влітку це стає очевидним."],
        ["li", "Сніг, наметений навколо основи посудини, ховає витоки й перекриває шлях евакуації з огорожі."],
        ["cta", "Потрібен аудит безпеки наявної установки?", "Оглянемо майданчик, перевіримо скидання, вентиляцію та газоаналіз і передамо письмовий перелік того, що виправити й у якому порядку.", "Замовити огляд", "/uk/contacts"],
      ],
      ru: [
        ["p", "Углекислота не горит, не взрывается и не имеет запаха. Именно из-за этого сочетания это наименее осторожно используемый промышленный газ — и именно поэтому инциденты с ним обычно выходят тяжёлыми. Газ тяжелее воздуха, невидим и почти не предупреждает, прежде чем свалить человека."],
        ["h2", "Это не просто удушающий газ"],
        ["p", "Азот убивает, вытесняя кислород. CO₂ делает то же самое, но ещё и действует на организм напрямую: ускоряет дыхание, дальше вызывает головную боль, спутанность и потерю сознания при концентрациях, когда кислорода в воздухе ещё достаточно. Поэтому предельно допустимые уровни для CO₂ значительно ниже, чем для инертных газов."],
        ["tbl", "Влияние концентрации CO₂ в воздухе", "Концентрация | Что происходит", "0,04% (400 ppm) | Обычный атмосферный фон", "0,5% (5 000 ppm) | Предел профессионального воздействия, средний за 8 часов", "1,5% (15 000 ppm) | Кратковременный предел; заметно ускоренное дыхание", "3% | Головная боль и одышка за несколько минут", "5% | Сильная одышка и спутанность за 10–15 минут", "8–10% | Потеря сознания за несколько минут", "свыше 17% | Потеря сознания менее чем за минуту, смерть без спасения"],
        ["p", "**CO₂ примерно в полтора раза тяжелее воздуха.** Он стекает вниз, накапливается в приямках, подвалах, кабельных лотках и на лестничных площадках и остаётся там. Утечка, безопасная на открытой площадке, становится смертельной в подвальной наполнительной станции или в смотровой яме в двух метрах."],
        ["h2", "Три опасности в порядке того, как часто они калечат"],
        ["li", "**Накопление в низком непроветриваемом месте.** Газ из предохранительного клапана, из негерметичного соединения или просто от сублимации сухого льда заполняет самую низкую точку первой."],
        ["li", "**Холодовые ожоги.** Жидкий CO₂ в ёмкости имеет около −20 °C, а газ, вырывающийся из разорванного соединения, расширяется и образует снег с температурой −78,5 °C. Контакт — это мгновенное поражение тканей, а кожа прилипает к холодному металлу."],
        ["li", "**Давление.** Баллон или сосуд, которые нагрели, уронили или у которых перекрыли путь сброса, — это запасённая энергия, независимо от того, какой газ внутри."],
        ["img", PHOTO.vaporizers, "Атмосферные испарители, установленные на улице рядом с криогенным сосудом", "Испарители и линии сброса должны быть снаружи, а выброс — направлен подальше от проходов"],
        ["h2", "Что должно быть на площадке"],
        ["tbl", "Минимальный набор безопасности для установки с CO₂", "Элемент | Требование | Зачем", "Газоанализ | датчики в самой низкой точке, сигнализация на 0,5% и 1,5% | газ никак не предупреждает о себе сам", "Вентиляция | принудительная вытяжка с уровня пола | CO₂ собирается внизу, а не под потолком", "Сброс с клапана | выведен наружу, выше уровня головы, подальше от заборов воздуха | предохранительный клапан способен быстро сбросить много газа", "СИЗ | криогенные перчатки, щиток, длинный рукав | защита от холодовых ожогов", "Порядок доступа | запрет одиночных работ в приямках и закрытых помещениях | человек без сознания не позовёт на помощь", "Знаки | маркировка опасности на входе в каждое газовое помещение | для подрядчиков и спасательных служб"],
        ["p", "Два правила, которые весят больше любого отдельного оборудования: **никогда не заходить в приямок или закрытое газовое помещение в одиночку** и **никогда не доверять собственному ощущению воздуха**. Ни запаха, ни раздражения, ни видимого облака не будет, пока не станет слишком поздно — единственный честный свидетель здесь датчик."],
        ["h2", "Перевозка и документы"],
        ["p", "В дорожной перевозке CO₂ относится к классу 2 ADR: UN 1013 для сжатого газа в баллонах и UN 2187 для охлаждённой жидкости в автоцистерне. Оба по классификационному коду — негорючие нетоксичные газы, и эта формулировка регулярно вводит в заблуждение, заставляя относиться к поставке как к обычному грузу. Классификация описывает риск пожара, а не риск замкнутого пространства."],
        ["p", `Документация площадки тоже имеет значение. [Монтаж под ключ](${productPath(install, "ru")}) передаёт паспорт сосуда, уставки предохранительных клапанов, акт пусконаладки и инструкцию по эксплуатации, а не только работающую систему. Если инструкции нет, площадка работает на памяти того, кто присутствовал при запуске.`],
        ["h2", "Сезонные вещи, о которых забывают"],
        ["li", "В мороз атмосферный испаритель обмерзает и теряет производительность, и у персонала появляется соблазн его обойти. Именно байпас и подаёт жидкость в газовую линию."],
        ["li", "В жару давление в сосуде растёт, а предохранительный клапан срабатывает чаще. Если сброс выведен плохо, летом это становится очевидным."],
        ["li", "Снег, наметённый вокруг основания сосуда, прячет утечки и перекрывает путь эвакуации из ограждения."],
        ["cta", "Нужен аудит безопасности действующей установки?", "Осмотрим площадку, проверим сброс, вентиляцию и газоанализ и передадим письменный перечень того, что исправить и в каком порядке.", "Заказать осмотр", "/ru/contacts"],
      ],
    },
    "sf",
  ),
  faq: [
    faq(
      "faq-safe-1",
      {
        en: "Is a CO₂ leak noticeable without instruments?",
        uk: "Чи можна помітити витік CO₂ без приладів?",
        ru: "Можно ли заметить утечку CO₂ без приборов?",
      },
      {
        en: "Not reliably. A large leak of liquid produces a visible white cloud of condensed moisture and a hissing sound, but a slow leak into a pit shows nothing at all — no smell, no colour, no irritation. By the time breathing feels wrong, the concentration is already dangerous. Fixed detection at the low point is the only dependable answer.",
        uk: "Надійно — ні. Великий викид рідини дає видиму білу хмару сконденсованої вологи й шипіння, але повільний витік у приямок не показує нічого: ні запаху, ні кольору, ні подразнення. Коли дихання починає здаватись дивним, концентрація вже небезпечна. Єдина надійна відповідь — стаціонарний газоаналіз у нижній точці.",
        ru: "Надёжно — нет. Большой выброс жидкости даёт видимое белое облако сконденсированной влаги и шипение, но медленная утечка в приямок не показывает ничего: ни запаха, ни цвета, ни раздражения. Когда дыхание начинает казаться странным, концентрация уже опасна. Единственный надёжный ответ — стационарный газоанализ в нижней точке.",
      },
    ),
    faq(
      "faq-safe-2",
      {
        en: "What do we do if someone loses consciousness in a gas room?",
        uk: "Що робити, якщо людина втратила свідомість у газовому приміщенні?",
        ru: "Что делать, если человек потерял сознание в газовом помещении?",
      },
      {
        en: "Do not go in. The overwhelming majority of fatalities in confined-space gas incidents are rescuers who entered without breathing apparatus. Raise the alarm, start forced ventilation, call the emergency services and enter only with self-contained breathing apparatus and a second person on the line. This has to be written into the site procedure and rehearsed, not improvised.",
        uk: "Не заходити. Переважна більшість смертей у газових інцидентах у замкнених просторах — це рятувальники, які зайшли без дихального апарата. Підняти тривогу, увімкнути примусову вентиляцію, викликати рятувальників і заходити лише в автономному дихальному апараті та зі страхувальником. Це має бути записане в інструкції майданчика й відпрацьоване, а не вигадане на місці.",
        ru: "Не заходить. Подавляющее большинство смертей в газовых инцидентах в замкнутых пространствах — это спасатели, вошедшие без дыхательного аппарата. Поднять тревогу, включить принудительную вентиляцию, вызвать спасателей и заходить только в автономном дыхательном аппарате и со страхующим. Это должно быть записано в инструкции площадки и отработано, а не придумано на месте.",
      },
    ),
  ],
  relatedProducts: [install, tank30],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "CO₂ hazards: concentrations and checklist",
      uk: "Чим небезпечний CO₂: концентрації й чекліст",
      ru: "Чем опасен CO₂: концентрации и чек-лист",
    },
    metaDescription: {
      en: "Why CO₂ is more dangerous than an inert gas, what each concentration does, and the minimum set of detection, ventilation and PPE.",
      uk: "Чому CO₂ небезпечніший за інертний газ, що робить кожна концентрація, три реальні небезпеки на майданчику й мінімальний набір газоаналізу, вентиляції та ЗІЗ.",
      ru: "Почему CO₂ опаснее инертного газа, что делает каждая концентрация, три реальные опасности на площадке и минимальный набор газоанализа, вентиляции и СИЗ.",
    },
    keywords: {
      en: "CO2 hazard concentration, carbon dioxide safety, confined space CO2",
      uk: "чим небезпечна вуглекислота, концентрація CO2, безпека газового майданчика",
      ru: "чем опасна углекислота, концентрация CO2, безопасность газовой площадки",
    },
  },
};

/* ─── Стаття: харчова чи технічна вуглекислота ─────────────────────────── */

export const postFoodVsTechnical: SeedPost = {
  _id: "post-food-vs-technical-co2",
  _updatedAt: SEED_UPDATED_AT,
  title: {
    en: "Food-grade or technical CO₂: what the difference really is",
    uk: "Харчова чи технічна вуглекислота: у чому насправді різниця",
    ru: "Пищевая или техническая углекислота: в чём на самом деле разница",
  },
  slug: {
    en: { current: "food-grade-vs-technical-co2" },
    uk: { current: "harchova-chy-tehnichna-vuglekyslota" },
    ru: { current: "pishchevaya-ili-tehnicheskaya-uglekislota" },
  },
  isPublished: true,
  isFeatured: true,
  publishedAt: "2026-09-07T14:00:00Z",
  updatedAt: "2026-09-07T14:00:00Z",
  readingTimeMinutes: 4,
  author: seedAuthor,
  categories: [catQuality],
  tags: ["CO2", "якість", "харчове виробництво"],
  coverImage: img(PHOTO.lab, {
    en: "Laboratory equipment for checking carbon dioxide quality on delivery",
    uk: "Лабораторне обладнання для перевірки якості вуглекислоти під час приймання",
    ru: "Лабораторное оборудование для проверки качества углекислоты при приёмке",
  }),
  excerpt: {
    en: "The difference is not a percentage. It is a list of individually limited impurities, a certificate for every batch and a traceable chain from the filling plant to your tank.",
    uk: "Різниця не у відсотках чистоти. Вона в переліку окремо нормованих домішок, сертифікаті на кожну партію й простежуваному ланцюгу від наповнювальної станції до вашої ємності.",
    ru: "Разница не в процентах чистоты. Она в перечне отдельно нормируемых примесей, сертификате на каждую партию и прослеживаемой цепочке от наполнительной станции до вашей ёмкости.",
  },
  body: body(
    {
      en: [
        ["p", "Ask two suppliers for «food-grade CO₂» and you may get the same gas from the same source with different paperwork — or genuinely different products. The word on the invoice is not the specification, and the difference between grades is not the headline purity figure."],
        ["h2", "Why «99.9%» tells you nothing"],
        ["p", "Technical CO₂ is typically declared at 99.5% and food grade at 99.9%. That is a difference of 0.4 percentage points, which sounds trivial — and it is, on its own. The compounds that ruin a beverage act at parts per million: acetaldehyde changes the taste at 0.2 ppm, sulphur compounds are detectable by smell at even lower levels, benzene is a toxicity issue rather than a taste one."],
        ["p", "So the food-grade specification does not simply raise the purity number. It lists individual contaminants and puts a ceiling on each of them separately."],
        ["tbl", "Typical limits for beverage-grade CO₂ (ISBT / EIGA) against a technical grade declaration", "Parameter | Food grade | Technical grade | Why it matters", "CO₂ purity | ≥ 99.9% v/v | ≥ 99.5% v/v | the headline figure, and the least informative one", "Moisture | ≤ 20 ppm | not individually limited | corrosion, ice in fittings, carbonation instability", "Oxygen | ≤ 30 ppm | not limited | oxidation and shortened shelf life", "Total hydrocarbons | ≤ 50 ppm as methane | not limited | foreign taste and odour", "Acetaldehyde | ≤ 0.2 ppm | not limited | detectable off-flavour", "Aromatics (benzene) | ≤ 0.02 ppm | not limited | toxicity", "Total sulphur | ≤ 0.1 ppm | not limited | rotten-egg odour at trace level", "Ammonia, NO/NO₂ | ≤ 2.5 ppm each | not limited | taste and safety", "Sensory check | required | none | catches what instruments miss"],
        ["img", PHOTO.standards, "Documentation and standards governing industrial gas quality", "The grade lives in the certificate and the traceability chain, not in the word on the invoice"],
        ["h2", "Where each grade is allowed"],
        ["tbl", "", "Application | Grade required | Note", "Carbonating drinks, brewing | food | full ISBT list", "Purging tanks and lines in a beverage plant | food | the purge gas contacts the product", "Modified atmosphere packaging | food | direct contact with the food", "Dry ice for cooling food or pharmaceuticals | food | the ice sublimates onto the product", "Greenhouse CO₂ enrichment | food or dedicated horticultural | the crop absorbs it", "Welding shielding | technical | no product contact", "Fire extinguishers, pneumatics | technical | no product contact"],
        ["p", `The dry ice line in that table is the one most often missed. A pellet is nothing but frozen CO₂ — whatever was in the liquid ends up in the ice and sublimates directly onto whatever is being cooled. Producers who supply the food and catering market state the grade explicitly for this reason; [IceLab's food-grade ice](${ICELAB_FOOD.en}), for instance, is positioned around exactly that: the raw material is certified CO₂, and that is what makes the ice safe to put next to food.`],
        ["h2", "What a certificate does and does not cover"],
        ["p", "A certificate of analysis describes a batch at the moment it left the filling plant. It says nothing about the tanker that carried it to you, the hose used to transfer it, or the condition of your own vessel. Contamination in this chain is not exotic: a tanker that previously carried a different product, a hose left open in a yard, or a tank that has never been checked after an insulation repair."],
        ["li", "Ask for a certificate for every delivery, not a one-off specification sheet."],
        ["li", "Check that the parameters listed match the ISBT list, not just total purity."],
        ["li", "Record the certificate against the delivery in your traceability system — an auditor will ask for the link between a batch of product and a batch of gas."],
        ["li", `Run [incoming inspection](${productPath(labKit, "en")}) on moisture, oxygen and a sensory check at minimum. See the [equipment for CO₂ quality control](${categoryPath(labCategory, "en")}).`],
        ["p", `The full parameter list and how the ISBT and EIGA documents relate to each other is covered in a [separate article](${postPath(postIsbt, "en")}).`],
        ["h2", "The practical rule"],
        ["p", "If a site handles food or beverages at all, keep one grade on the whole site. Two grades in one yard means that sooner or later the wrong cylinder is connected to the wrong line, and the saving on technical gas for purging turns into a recalled batch. The price difference between grades is small compared with the cost of finding out the hard way."],
        ["cta", "Not sure which grade your process needs?", "Describe the process and we will say what the specification has to cover, what to check on delivery and what to keep on file for an audit.", "Ask an engineer", "/contacts"],
      ],
      uk: [
        ["p", "Попросіть у двох постачальників «харчову вуглекислоту» — і можете отримати той самий газ із того самого джерела з різними документами або справді різні продукти. Слово в рахунку не є специфікацією, а різниця між марками — не у заголовній цифрі чистоти."],
        ["h2", "Чому «99,9%» не каже нічого"],
        ["p", "Технічна вуглекислота зазвичай декларується як 99,5%, харчова — як 99,9%. Різниця в 0,4 відсоткового пункту звучить дрібницею — і сама по собі нею є. Сполуки, які псують напій, працюють на рівні мільйонних часток: ацетальдегід змінює смак за 0,2 ppm, сірковмісні сполуки чути ще за менших концентрацій, бензол — питання токсичності, а не смаку."],
        ["p", "Тому харчова специфікація не просто піднімає цифру чистоти. Вона перелічує окремі домішки й ставить стелю кожній із них окремо."],
        ["tbl", "Типові межі для харчової вуглекислоти (ISBT / EIGA) проти декларації технічної марки", "Параметр | Харчова | Технічна | Чому це важливо", "Чистота CO₂ | ≥ 99,9% об. | ≥ 99,5% об. | заголовна цифра й найменш інформативна", "Волога | ≤ 20 ppm | окремо не нормується | корозія, лід в арматурі, нестабільна карбонізація", "Кисень | ≤ 30 ppm | не нормується | окиснення й скорочення терміну придатності", "Сумарні вуглеводні | ≤ 50 ppm у перерахунку на метан | не нормується | сторонній смак і запах", "Ацетальдегід | ≤ 0,2 ppm | не нормується | помітний сторонній присмак", "Ароматичні (бензол) | ≤ 0,02 ppm | не нормується | токсичність", "Сумарна сірка | ≤ 0,1 ppm | не нормується | запах тухлих яєць на слідовому рівні", "Аміак, NO/NO₂ | ≤ 2,5 ppm кожного | не нормується | смак і безпека", "Органолептична перевірка | обовʼязкова | немає | ловить те, що пропускають прилади"],
        ["img", PHOTO.standards, "Документація та стандарти, що визначають якість промислових газів", "Марка живе в сертифікаті й ланцюгу простежуваності, а не в слові на рахунку"],
        ["h2", "Де яка марка допустима"],
        ["tbl", "", "Застосування | Потрібна марка | Примітка", "Карбонізація напоїв, пивоваріння | харчова | повний перелік ISBT", "Продування танків і ліній на виробництві напоїв | харчова | продувний газ контактує з продуктом", "Пакування в модифікованому середовищі | харчова | прямий контакт із харчовим продуктом", "Сухий лід для охолодження харчових продуктів чи фармацевтики | харчова | лід сублімує просто на продукт", "Підживлення теплиць CO₂ | харчова або спеціальна тепличної марки | культура засвоює газ", "Захисний газ у зварюванні | технічна | контакту з продуктом немає", "Вогнегасники, пневматика | технічна | контакту з продуктом немає"],
        ["p", `Рядок про сухий лід у цій таблиці пропускають найчастіше. Гранула — це нічого, крім замороженого CO₂: усе, що було в рідині, потрапляє в лід і сублімує просто на те, що охолоджують. Виробники, які працюють на харчовий ринок і кейтеринг, саме тому вказують марку явно; [харчовий лід IceLab](${ICELAB_FOOD.uk}), наприклад, побудований саме навколо цього: сировина — сертифікована вуглекислота, і саме вона робить лід придатним ставити поруч із продуктами.`],
        ["h2", "Що покриває сертифікат, а що ні"],
        ["p", "Сертифікат аналізу описує партію на момент виходу з наповнювальної станції. Він не каже нічого про цистерну, яка везла її до вас, про рукав, яким її перекачували, і про стан вашої власної посудини. Забруднення в цьому ланцюгу — не екзотика: цистерна, що перед тим везла інший продукт, рукав, залишений відкритим на майданчику, або ємність, яку жодного разу не перевіряли після ремонту ізоляції."],
        ["li", "Вимагайте сертифікат на кожну поставку, а не одноразовий бланк специфікації."],
        ["li", "Перевіряйте, що перелічені параметри збігаються з переліком ISBT, а не лише із загальною чистотою."],
        ["li", "Заносьте сертифікат у систему простежуваності поруч із поставкою — аудитор попросить звʼязок між партією продукту й партією газу."],
        ["li", `Робіть [вхідний контроль](${productPath(labKit, "uk")}) щонайменше на вологу, кисень і органолептику. Див. [обладнання для контролю якості CO₂](${categoryPath(labCategory, "uk")}).`],
        ["p", `Повний перелік параметрів і те, як співвідносяться документи ISBT та EIGA, ми розібрали в [окремій статті](${postPath(postIsbt, "uk")}).`],
        ["h2", "Практичне правило"],
        ["p", "Якщо на майданчику взагалі є харчові продукти чи напої, тримайте одну марку на всьому майданчику. Дві марки в одному дворі означають, що рано чи пізно не той балон під'єднають не до тієї лінії, і економія на технічному газі для продування обернеться відкликаною партією. Різниця в ціні між марками мала порівняно з вартістю дізнатись це на практиці."],
        ["cta", "Не впевнені, яка марка потрібна вашому процесу?", "Опишіть процес — скажемо, що має покривати специфікація, що перевіряти на прийманні і що зберігати для аудиту.", "Запитати інженера", "/uk/contacts"],
      ],
      ru: [
        ["p", "Попросите у двух поставщиков «пищевую углекислоту» — и можете получить тот же газ из того же источника с разными документами или действительно разные продукты. Слово в счёте не является спецификацией, а разница между марками — не в заголовочной цифре чистоты."],
        ["h2", "Почему «99,9%» не говорит ничего"],
        ["p", "Техническая углекислота обычно декларируется как 99,5%, пищевая — как 99,9%. Разница в 0,4 процентного пункта звучит мелочью — и сама по себе ею является. Соединения, портящие напиток, работают на уровне миллионных долей: ацетальдегид меняет вкус при 0,2 ppm, серосодержащие соединения слышны при ещё меньших концентрациях, бензол — вопрос токсичности, а не вкуса."],
        ["p", "Поэтому пищевая спецификация не просто поднимает цифру чистоты. Она перечисляет отдельные примеси и ставит потолок каждой из них по отдельности."],
        ["tbl", "Типовые пределы для пищевой углекислоты (ISBT / EIGA) против декларации технической марки", "Параметр | Пищевая | Техническая | Почему это важно", "Чистота CO₂ | ≥ 99,9% об. | ≥ 99,5% об. | заголовочная цифра и наименее информативная", "Влага | ≤ 20 ppm | отдельно не нормируется | коррозия, лёд в арматуре, нестабильная карбонизация", "Кислород | ≤ 30 ppm | не нормируется | окисление и сокращение срока годности", "Суммарные углеводороды | ≤ 50 ppm в пересчёте на метан | не нормируется | посторонний вкус и запах", "Ацетальдегид | ≤ 0,2 ppm | не нормируется | заметный посторонний привкус", "Ароматические (бензол) | ≤ 0,02 ppm | не нормируется | токсичность", "Суммарная сера | ≤ 0,1 ppm | не нормируется | запах тухлых яиц на следовом уровне", "Аммиак, NO/NO₂ | ≤ 2,5 ppm каждого | не нормируется | вкус и безопасность", "Органолептическая проверка | обязательна | нет | ловит то, что пропускают приборы"],
        ["img", PHOTO.standards, "Документация и стандарты, определяющие качество промышленных газов", "Марка живёт в сертификате и цепочке прослеживаемости, а не в слове на счёте"],
        ["h2", "Где какая марка допустима"],
        ["tbl", "", "Применение | Нужная марка | Примечание", "Карбонизация напитков, пивоварение | пищевая | полный перечень ISBT", "Продувка танков и линий на производстве напитков | пищевая | продувочный газ контактирует с продуктом", "Упаковка в модифицированной среде | пищевая | прямой контакт с пищевым продуктом", "Сухой лёд для охлаждения пищевых продуктов или фармацевтики | пищевая | лёд сублимирует прямо на продукт", "Подкормка теплиц CO₂ | пищевая или специальная тепличной марки | культура усваивает газ", "Защитный газ в сварке | техническая | контакта с продуктом нет", "Огнетушители, пневматика | техническая | контакта с продуктом нет"],
        ["p", `Строку о сухом льде в этой таблице пропускают чаще всего. Гранула — это ничего, кроме замороженного CO₂: всё, что было в жидкости, попадает в лёд и сублимирует прямо на то, что охлаждают. Производители, работающие на пищевой рынок и кейтеринг, именно поэтому указывают марку явно; [пищевой лёд IceLab](${ICELAB_FOOD.ru}), например, построен именно вокруг этого: сырьё — сертифицированная углекислота, и именно она делает лёд пригодным ставить рядом с продуктами.`],
        ["h2", "Что покрывает сертификат, а что нет"],
        ["p", "Сертификат анализа описывает партию на момент выхода с наполнительной станции. Он не говорит ничего о цистерне, которая везла её к вам, о рукаве, которым её перекачивали, и о состоянии вашего собственного сосуда. Загрязнение в этой цепочке — не экзотика: цистерна, перед тем везшая другой продукт, рукав, оставленный открытым на площадке, или ёмкость, которую ни разу не проверяли после ремонта изоляции."],
        ["li", "Требуйте сертификат на каждую поставку, а не разовый бланк спецификации."],
        ["li", "Проверяйте, что перечисленные параметры совпадают с перечнем ISBT, а не только с общей чистотой."],
        ["li", "Заносите сертификат в систему прослеживаемости рядом с поставкой — аудитор попросит связь между партией продукта и партией газа."],
        ["li", `Делайте [входной контроль](${productPath(labKit, "ru")}) как минимум на влагу, кислород и органолептику. См. [оборудование для контроля качества CO₂](${categoryPath(labCategory, "ru")}).`],
        ["p", `Полный перечень параметров и то, как соотносятся документы ISBT и EIGA, мы разобрали в [отдельной статье](${postPath(postIsbt, "ru")}).`],
        ["h2", "Практическое правило"],
        ["p", "Если на площадке вообще есть пищевые продукты или напитки, держите одну марку на всей площадке. Две марки в одном дворе означают, что рано или поздно не тот баллон подключат не к той линии, и экономия на техническом газе для продувки обернётся отозванной партией. Разница в цене между марками мала по сравнению со стоимостью узнать это на практике."],
        ["cta", "Не уверены, какая марка нужна вашему процессу?", "Опишите процесс — скажем, что должна покрывать спецификация, что проверять при приёмке и что хранить для аудита.", "Спросить инженера", "/ru/contacts"],
      ],
    },
    "ft",
  ),
  faq: [
    faq(
      "faq-grade-1",
      {
        en: "Is food-grade CO₂ physically different gas?",
        uk: "Чи є харчова вуглекислота фізично іншим газом?",
        ru: "Является ли пищевая углекислота физически другим газом?",
      },
      {
        en: "Often it is the same gas from the same source, purified further and, just as importantly, handled through a controlled chain: dedicated tankers and hoses, a certificate for each batch, and records that link a delivery to a production lot. The grade is as much about the process around the gas as about the gas itself.",
        uk: "Часто це той самий газ із того самого джерела, доочищений і — що не менш важливо — проведений через контрольований ланцюг: виділені цистерни й рукави, сертифікат на кожну партію й записи, що звʼязують поставку з виробничою партією. Марка — це стільки ж про процес навколо газу, скільки про сам газ.",
        ru: "Часто это тот же газ из того же источника, доочищенный и — что не менее важно — проведённый через контролируемую цепочку: выделенные цистерны и рукава, сертификат на каждую партию и записи, связывающие поставку с производственной партией. Марка — это столько же о процессе вокруг газа, сколько о самом газе.",
      },
    ),
    faq(
      "faq-grade-2",
      {
        en: "Do we need our own laboratory if the supplier provides certificates?",
        uk: "Чи потрібна власна лабораторія, якщо постачальник дає сертифікати?",
        ru: "Нужна ли собственная лаборатория, если поставщик даёт сертификаты?",
      },
      {
        en: "You do not need a full analytical laboratory, but you do need incoming inspection. A certificate covers the gas at the filling plant; the checks at your receiving point cover everything that happened between there and your tank. Moisture, oxygen and a sensory check take minutes and catch the failures that actually occur in practice.",
        uk: "Повноцінна аналітична лабораторія не потрібна, а вхідний контроль потрібен. Сертифікат описує газ на наповнювальній станції; перевірка на вашому прийманні закриває все, що сталося між станцією та вашою ємністю. Волога, кисень і органолептика займають хвилини й ловлять саме ті відмови, які трапляються на практиці.",
        ru: "Полноценная аналитическая лаборатория не нужна, а входной контроль нужен. Сертификат описывает газ на наполнительной станции; проверка на вашей приёмке закрывает всё, что произошло между станцией и вашей ёмкостью. Влага, кислород и органолептика занимают минуты и ловят именно те отказы, которые случаются на практике.",
      },
    ),
  ],
  relatedProducts: [labKit, tank30],
  relatedPosts: [],
  seo: {
    metaTitle: {
      en: "Food-grade vs technical CO₂",
      uk: "Харчова чи технічна вуглекислота",
      ru: "Пищевая или техническая углекислота",
    },
    metaDescription: {
      en: "The difference is a list of impurities limited at ppm level, not a purity percentage. Comparison table and the uses that require food grade.",
      uk: "Різниця — це перелік домішок, нормованих на рівні ppm, а не відсоток чистоти. Таблиця порівняння і застосування, що вимагають харчової марки.",
      ru: "Разница — это перечень примесей, нормируемых на уровне ppm, а не процент чистоты. Таблица сравнения и применения, требующие пищевой марки.",
    },
    keywords: {
      en: "food grade vs technical CO2, ISBT CO2 limits, beverage grade carbon dioxide",
      uk: "харчова і технічна вуглекислота різниця, норми ISBT, харчовий CO2",
      ru: "пищевая и техническая углекислота разница, нормы ISBT, пищевой CO2",
    },
  },
};

export const safetyPosts: SeedPost[] = [postSafety, postFoodVsTechnical];
