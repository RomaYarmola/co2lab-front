import type { Landing } from "./types";

/**
 * Попит: «co2 для теплицы», «углекислота для теплиц», «випарник co2».
 * Фото випарника в теплиці — з каталогу клієнта, реальний обʼєкт.
 */
export const greenhousesLanding: Landing = {
  id: "greenhouses",
  path: "/solutions/industries/greenhouses",
  seo: {
    title: {
      en: "CO₂ enrichment for greenhouses: tanks and vaporizers",
      uk: "CO₂ для теплиць: ємності й випарники для підживлення",
      ru: "CO₂ для теплиц: ёмкости и испарители для подкормки",
    },
    description: {
      en: "Liquid CO₂ supply for greenhouse enrichment: consumption per hectare, vaporizer and tank sizing by area, ambient or electric vaporizer.",
      uk: "Рідкий CO₂ для підживлення теплиць: споживання на гектар, підбір випарника й ємності за площею, атмосферний чи електричний випарник.",
      ru: "Жидкий CO₂ для подкормки теплиц: потребление на гектар, подбор испарителя и ёмкости по площади, атмосферный или электрический испаритель.",
    },
  },
  shortTitle: {
    en: "Greenhouses",
    uk: "Тепличні комплекси",
    ru: "Тепличные комплексы",
  },
  eyebrow: { en: "Industries", uk: "Галузі", ru: "Отрасли" },
  title: {
    en: "Liquid CO₂ for greenhouse enrichment",
    uk: "Рідкий CO₂ для підживлення теплиць",
    ru: "Жидкий CO₂ для подкормки теплиц",
  },
  lead: {
    en: "Outdoor air holds about 400 ppm of CO₂, and a closed greenhouse on a sunny morning drops below that within hours. Clean liquid CO₂ lets you hold 800–1000 ppm during the light hours without the heat and exhaust of burning gas.",
    uk: "У зовнішньому повітрі близько 400 ppm CO₂, а закрита теплиця сонячного ранку опускається нижче за кілька годин. Чистий рідкий CO₂ дає змогу тримати 800–1000 ppm у світлові години без тепла й вихлопу від спалювання газу.",
    ru: "В наружном воздухе около 400 ppm CO₂, а закрытая теплица солнечным утром опускается ниже за несколько часов. Чистый жидкий CO₂ позволяет держать 800–1000 ppm в световые часы без тепла и выхлопа от сжигания газа.",
  },
  image: {
    src: "/images/catalog/co2-vaporizer-in-greenhouse.webp",
    alt: {
      en: "CO₂ vaporizer installed at a greenhouse complex",
      uk: "Випарник CO₂, встановлений у тепличному комплексі",
      ru: "Испаритель CO₂, установленный в тепличном комплексе",
    },
  },
  body: {
    uk: [
      ["h2", "Скільки CO₂ потрібно теплиці"],
      ["p", "Витрата залежить насамперед від провітрювання: при закритих кватирках CO₂ накопичується, при відкритих — іде назовні разом із повітрям. Орієнтир для підживлення чистим CO₂ — **20–60 кг на гектар за годину** в світлові години. Точну цифру дає ваша площа, культура, цільова концентрація й режим провітрювання."],
      ["tbl", "Орієнтири для підбору; пік — за закритих кватирок і максимального дозування", "Площа | Пікова витрата | Випарник | Ємність", "1 га | 30–60 кг/год | P130E/1W, 130 кг/год | ZVT 10 або ZVT 20", "3 га | 90–180 кг/год | P270E/2W, 270 кг/год | ZVT 30", "5 га | 150–300 кг/год | P400E/3W, 400 кг/год | ZVT 50", "10 га | 300–600 кг/год | P1000E-3W, 1 000 кг/год | дві ємності по 50–60 м³"],
      ["h2", "Випарник важливіший за ємність"],
      ["p", "Тепличне споживання пікове: дозування вмикається зранку на всій площі одночасно. Ємність лише зберігає запас, а подачу в пік забезпечує [випарник CO₂](cat:cat-co2-vaporizers). Атмосферний не споживає електрики, але в мороз втрачає продуктивність; електричний стабільний, але коштує в експлуатації. Як обрати, розібрано в статті [«Атмосферний чи електричний випарник CO₂ для теплиці»](post:post-greenhouse-co2-vaporizer)."],
      ["h2", "Що входить у систему"],
      ["li", "[Кріогенна ємність для рідкого CO₂](cat:cat-tanks-co2) під одну повну поставку автоцистерною з робочим резервом."],
      ["li", "Випарник або пара випарників із перемиканням на холодну пору."],
      ["li", "Редукування й магістраль до системи розподілу в теплиці."],
      ["li", "Газоаналіз у приміщеннях, куди може потрапити CO₂: газ важчий за повітря й накопичується внизу."],
      ["li", "[Монтаж під ключ](cat:cat-installation): фундамент, підʼїзд для автоцистерни, пусконалагодження."],
      ["cta", "Скільки гектарів плануєте підживлювати?", "Надішліть площу, культуру й цільову концентрацію — порахуємо пікову витрату, підберемо випарник і ємність.", "Отримати розрахунок", "page:/contacts"],
    ],
    en: [
      ["h2", "How much CO₂ a greenhouse needs"],
      ["p", "Consumption depends above all on ventilation: with vents closed CO₂ accumulates, with vents open it leaves with the air. A guideline for pure CO₂ enrichment is **20–60 kg per hectare per hour** during the light hours. The exact figure comes from your area, crop, target concentration and ventilation pattern."],
      ["tbl", "Sizing guidelines; peak assumes closed vents and maximum dosing", "Area | Peak draw | Vaporizer | Tank", "1 ha | 30–60 kg/h | P130E/1W, 130 kg/h | ZVT 10 or ZVT 20", "3 ha | 90–180 kg/h | P270E/2W, 270 kg/h | ZVT 30", "5 ha | 150–300 kg/h | P400E/3W, 400 kg/h | ZVT 50", "10 ha | 300–600 kg/h | P1000E-3W, 1,000 kg/h | two 50–60 m³ tanks"],
      ["h2", "The vaporizer matters more than the tank"],
      ["p", "Greenhouse demand is peaky: dosing starts across the whole area at once in the morning. The tank only stores the reserve; delivery at peak is the job of the [CO₂ vaporizer](cat:cat-co2-vaporizers). An ambient unit uses no electricity but loses capacity in frost; an electric one is stable but costs to run. The choice is covered in [Ambient or electric CO₂ vaporizer for a greenhouse](post:post-greenhouse-co2-vaporizer)."],
      ["h2", "What the system includes"],
      ["li", "A [cryogenic liquid CO₂ tank](cat:cat-tanks-co2) that takes one full road tanker delivery with a working reserve."],
      ["li", "A vaporizer, or a switchover pair for the cold season."],
      ["li", "Pressure regulation and a main line to the greenhouse distribution system."],
      ["li", "Gas detection in rooms CO₂ can reach: it is heavier than air and collects at floor level."],
      ["li", "[Turnkey installation](cat:cat-installation): foundation, tanker access, commissioning."],
      ["cta", "How many hectares do you plan to enrich?", "Send the area, crop and target concentration — we will calculate peak draw and size the vaporizer and tank.", "Get a calculation", "page:/contacts"],
    ],
    ru: [
      ["h2", "Сколько CO₂ нужно теплице"],
      ["p", "Расход зависит прежде всего от проветривания: при закрытых форточках CO₂ накапливается, при открытых — уходит наружу вместе с воздухом. Ориентир для подкормки чистым CO₂ — **20–60 кг на гектар в час** в световые часы. Точную цифру даёт ваша площадь, культура, целевая концентрация и режим проветривания."],
      ["tbl", "Ориентиры для подбора; пик — при закрытых форточках и максимальном дозировании", "Площадь | Пиковый расход | Испаритель | Ёмкость", "1 га | 30–60 кг/ч | P130E/1W, 130 кг/ч | ZVT 10 или ZVT 20", "3 га | 90–180 кг/ч | P270E/2W, 270 кг/ч | ZVT 30", "5 га | 150–300 кг/ч | P400E/3W, 400 кг/ч | ZVT 50", "10 га | 300–600 кг/ч | P1000E-3W, 1 000 кг/ч | две ёмкости по 50–60 м³"],
      ["h2", "Испаритель важнее ёмкости"],
      ["p", "Тепличное потребление пиковое: дозирование включается утром на всей площади одновременно. Ёмкость лишь хранит запас, а подачу в пик обеспечивает [испаритель CO₂](cat:cat-co2-vaporizers). Атмосферный не потребляет электричества, но в мороз теряет производительность; электрический стабилен, но стоит в эксплуатации. Как выбрать, разобрано в статье [«Атмосферный или электрический испаритель CO₂ для теплицы»](post:post-greenhouse-co2-vaporizer)."],
      ["h2", "Что входит в систему"],
      ["li", "[Криогенная ёмкость для жидкого CO₂](cat:cat-tanks-co2) под одну полную поставку автоцистерной с рабочим резервом."],
      ["li", "Испаритель или пара испарителей с переключением на холодное время года."],
      ["li", "Редуцирование и магистраль до системы распределения в теплице."],
      ["li", "Газоанализ в помещениях, куда может попасть CO₂: газ тяжелее воздуха и накапливается внизу."],
      ["li", "[Монтаж под ключ](cat:cat-installation): фундамент, подъезд для автоцистерны, пусконаладка."],
      ["cta", "Сколько гектаров планируете подкармливать?", "Пришлите площадь, культуру и целевую концентрацию — посчитаем пиковый расход, подберём испаритель и ёмкость.", "Получить расчёт", "page:/contacts"],
    ],
  },
  hubs: ["cat-tanks-co2", "cat-co2-vaporizers", "cat-installation"],
  posts: ["post-greenhouse-co2-vaporizer", "post-co2-tank-volume", "post-co2-safety-on-site"],
  faq: [
    {
      question: {
        en: "Why liquid CO₂ rather than flue gas from the boiler?",
        uk: "Чому рідкий CO₂, а не димові гази котельні?",
        ru: "Почему жидкий CO₂, а не дымовые газы котельной?",
      },
      answer: {
        en: "Flue gas brings heat you may not want in summer and contaminants such as ethylene, NOx and carbon monoxide that damage crops if combustion is not perfect. Liquid CO₂ lets you dose independently of heating, at any time of year.",
        uk: "Димові гази приносять тепло, яке влітку зайве, і домішки — етилен, оксиди азоту, чадний газ, — що шкодять культурі за неідеального горіння. Рідкий CO₂ дає дозувати незалежно від опалення, у будь-яку пору року.",
        ru: "Дымовые газы приносят тепло, которое летом лишнее, и примеси — этилен, оксиды азота, угарный газ, — вредящие культуре при неидеальном горении. Жидкий CO₂ позволяет дозировать независимо от отопления, в любое время года.",
      },
    },
    {
      question: {
        en: "Does greenhouse CO₂ have to be food grade?",
        uk: "Чи потрібна для теплиці харчова вуглекислота?",
        ru: "Нужна ли для теплицы пищевая углекислота?",
      },
      answer: {
        en: "The crop absorbs the gas, so food grade or a dedicated horticultural grade is the safe choice. What matters most is the absence of the contaminants plants react to, so ask for a certificate for each delivery.",
        uk: "Культура засвоює газ, тож безпечний вибір — харчова або спеціальна тепличної марки. Найважливіше — відсутність домішок, на які реагують рослини, тому вимагайте сертифікат на кожну поставку.",
        ru: "Культура усваивает газ, поэтому безопасный выбор — пищевая или специальная тепличной марки. Важнее всего отсутствие примесей, на которые реагируют растения, поэтому требуйте сертификат на каждую поставку.",
      },
    },
  ],
};
