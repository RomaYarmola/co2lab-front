import type { Landing } from "./types";

/**
 * Попит: «производство сухого льда оборудование», «производство сухого льда
 * бизнес план», «аппарат сухого льда» (Google Suggest, GSC icelab.com.ua).
 * До серпня 2026 на сайті був товар-пелетайзер — його стара адреса тепер
 * веде сюди (див. constants/legacyRedirects.ts).
 */
export const dryIceLanding: Landing = {
  id: "dry-ice-production",
  path: "/solutions/dry-ice-production",
  seo: {
    title: {
      en: "Dry ice production equipment, turnkey",
      uk: "Обладнання для виробництва сухого льоду під ключ",
      ru: "Оборудование для производства сухого льда под ключ",
    },
    description: {
      en: "CO₂ tank, pressure building, piping to the pelletizer and raw material supply for a dry ice workshop. Liquid CO₂ demand tables by output.",
      uk: "Ємність CO₂, підняття тиску, обвʼязка до гранулятора й постачання сировини для цеху сухого льоду. Таблиці потреби в рідкому CO₂ за продуктивністю.",
      ru: "Ёмкость CO₂, подъём давления, обвязка к гранулятору и поставка сырья для цеха сухого льда. Таблицы потребности в жидком CO₂ по производительности.",
    },
  },
  shortTitle: {
    en: "Dry ice production",
    uk: "Виробництво сухого льоду",
    ru: "Производство сухого льда",
  },
  eyebrow: {
    en: "Engineering solutions",
    uk: "Інженерні рішення",
    ru: "Инженерные решения",
  },
  title: {
    en: "Dry ice production equipment, turnkey",
    uk: "Обладнання для виробництва сухого льоду під ключ",
    ru: "Оборудование для производства сухого льда под ключ",
  },
  lead: {
    en: "A pelletizer is only as stable as the liquid CO₂ that feeds it. We design the part of the workshop that decides whether it runs every shift: the tank, pressure building, piping to the machine and the raw material supply behind it.",
    uk: "Гранулятор працює стабільно рівно настільки, наскільки стабільно до нього приходить рідкий CO₂. Ми проєктуємо ту частину цеху, від якої це залежить: ємність, підняття тиску, обвʼязку до машини й постачання сировини.",
    ru: "Гранулятор работает стабильно ровно настолько, насколько стабильно к нему приходит жидкий CO₂. Мы проектируем ту часть цеха, от которой это зависит: ёмкость, подъём давления, обвязку к машине и поставку сырья.",
  },
  image: {
    src: "/images/engineeringSolutionsPage/dryIce/dryIce.webp",
    alt: {
      en: "Dry ice pellets produced from liquid carbon dioxide",
      uk: "Гранули сухого льоду з рідкого діоксиду вуглецю",
      ru: "Гранулы сухого льда из жидкого диоксида углерода",
    },
  },
  body: {
    uk: [
      ["h2", "Що входить у цех сухого льоду"],
      ["tbl", "Вузли, без яких гранулятор не видає стабільну гранулу", "Вузол | Навіщо | Що підбираємо", "Кріогенна ємність для рідкого CO₂ | запас сировини між поставками | 30–60 м³ залежно від продуктивності", "Змійовик підняття тиску | тримає 18–21 бар на вході гранулятора | під безперервний, а не середній відбір", "Ізольована рідинна лінія | рідина не скипає дорогою до машини | мінімальна довжина за компонуванням", "Гранулятор або блок-прес | гранула 3, 16, 19 мм або блоки | під ринок збуту й зміни", "Лінія скидання газу скипання | 55–60% потоку виходить газом | виведення назовні, подалі від заборів повітря", "Газоаналіз і вентиляція | CO₂ накопичується біля підлоги | датчики з сигналізацією на 0,5% і 1,5%"],
      ["h2", "Скільки рідкого CO₂ потрібно"],
      ["p", "Під час грануляції **лише 40–45% рідини стає льодом**, решта миттєво випаровується й забирає тепло, потрібне для заморожування. Без повернення цього газу на зрідження норма — 2,2–2,5 кг рідкого CO₂ на кілограм гранул."],
      ["tbl", "Потреба в рідкому CO₂ без рекуперації газу скипання", "Вихід гранул | Рідкого CO₂ | За зміну 8 год | За місяць, 22 зміни", "100 кг/год | 230 кг/год | 1,8 т | 40 т", "200 кг/год | 460 кг/год | 3,7 т | 81 т", "300 кг/год | 690 кг/год | 5,5 т | 121 т", "400 кг/год | 920 кг/год | 7,4 т | 162 т"],
      ["p", "Звідси головне обмеження цеху: ємність підбирають під графік поставок сировини, а не під каталог. Для лінії 200 кг/год на повних змінах [ємність на 50 м³](cat:cat-tanks-co2) — це запас приблизно на чотирнадцять восьмигодинних змін."],
      ["h2", "Як ми підбираємо рішення"],
      ["no", "Продуктивність і ринок: скільки гранули й якої фракції ви продаватимете, чи є сезонні піки."],
      ["no", "Сировина: потреба в рідкому CO₂, марка (для харчового ринку — лише харчова за ISBT), мінімальна партія й відстань до наповнювальної станції."],
      ["no", "Ємність і тиск: обʼєм під одну повну автоцистерну з робочим резервом, система підняття тиску під безперервний відбір."],
      ["no", "Компонування: розташування ємності, гранулятора, складу готового продукту, трас рідини й скидання газу."],
      ["no", "Монтаж, пусконалагодження й навчання персоналу; документи на посудину під тиском."],
      ["p", "Розрахунок норм і пастки на старті розібрані в статті [«Скільки рідкого CO₂ потрібно на тонну сухого льоду»](post:post-co2-for-dry-ice). Як це виглядає на діючому виробництві в Україні — на прикладі [IceLab](https://icelab.com.ua/production): Київ і Львів, до 400 кг/год, склад сировини на 60 тонн."],
      ["cta", "Плануєте цех сухого льоду?", "Надішліть бажану продуктивність і режим змін — порахуємо потребу в CO₂, підберемо ємність і систему тиску та покажемо графік поставок.", "Обговорити проєкт", "page:/contacts"],
    ],
    en: [
      ["h2", "What a dry ice workshop consists of"],
      ["tbl", "Units a pelletizer needs to produce consistent pellets", "Unit | Why it matters | What we size", "Cryogenic liquid CO₂ tank | raw material reserve between deliveries | 30–60 m³ depending on output", "Pressure building coil | holds 18–21 bar at the pelletizer inlet | for continuous, not average, draw-off", "Insulated liquid line | liquid does not flash on the way to the machine | shortest run the layout allows", "Pelletizer or block press | 3, 16, 19 mm pellets or blocks | for your market and shift pattern", "Flash gas vent line | 55–60% of the flow leaves as gas | routed outdoors, away from air intakes", "Gas detection and ventilation | CO₂ collects at floor level | alarms at 0.5% and 1.5%"],
      ["h2", "How much liquid CO₂ it takes"],
      ["p", "In pelletizing **only 40–45% of the liquid becomes ice**; the rest flashes off and carries away the heat needed to freeze it. Without returning that gas to liquefaction the norm is 2.2–2.5 kg of liquid CO₂ per kilogram of pellets."],
      ["tbl", "Liquid CO₂ demand without flash gas recovery", "Pellet output | Liquid CO₂ | Per 8-hour shift | Per month, 22 shifts", "100 kg/h | 230 kg/h | 1.8 t | 40 t", "200 kg/h | 460 kg/h | 3.7 t | 81 t", "300 kg/h | 690 kg/h | 5.5 t | 121 t", "400 kg/h | 920 kg/h | 7.4 t | 162 t"],
      ["p", "This is the workshop's main constraint: the tank is sized to the raw material delivery schedule, not to the catalogue. For a 200 kg/h line running full shifts, a [50 m³ tank](cat:cat-tanks-co2) holds about fourteen 8-hour shifts of supply."],
      ["h2", "How we put the solution together"],
      ["no", "Output and market: how much product, which pellet size, and whether demand is seasonal."],
      ["no", "Raw material: liquid CO₂ demand, grade (food market means food grade to ISBT), minimum delivery and distance to the filling plant."],
      ["no", "Tank and pressure: volume for one full road tanker plus a working reserve, pressure building for continuous draw-off."],
      ["no", "Layout: positions of the tank, pelletizer and product store, liquid lines and gas venting."],
      ["no", "Installation, commissioning and staff training; pressure vessel documentation."],
      ["p", "The norms and start-up pitfalls are covered in [How much liquid CO₂ a tonne of dry ice takes](post:post-co2-for-dry-ice). A working Ukrainian example is [IceLab](https://icelab.com.ua/production): Kyiv and Lviv, up to 400 kg/h, a 60-tonne raw material store."],
      ["cta", "Planning a dry ice workshop?", "Send the output you need and the shift pattern — we will calculate CO₂ demand, size the tank and pressure system, and show the delivery schedule.", "Discuss the project", "page:/contacts"],
    ],
    ru: [
      ["h2", "Что входит в цех сухого льда"],
      ["tbl", "Узлы, без которых гранулятор не выдаёт стабильную гранулу", "Узел | Зачем | Что подбираем", "Криогенная ёмкость для жидкого CO₂ | запас сырья между поставками | 30–60 м³ в зависимости от производительности", "Змеевик подъёма давления | держит 18–21 бар на входе гранулятора | под непрерывный, а не средний отбор", "Изолированная жидкостная линия | жидкость не вскипает по дороге к машине | минимальная длина по компоновке", "Гранулятор или блок-пресс | гранула 3, 16, 19 мм или блоки | под рынок сбыта и смены", "Линия сброса газа вскипания | 55–60% потока выходит газом | вывод наружу, подальше от заборов воздуха", "Газоанализ и вентиляция | CO₂ накапливается у пола | датчики с сигнализацией на 0,5% и 1,5%"],
      ["h2", "Сколько жидкого CO₂ нужно"],
      ["p", "При грануляции **только 40–45% жидкости становится льдом**, остальное мгновенно испаряется и забирает тепло, нужное для замораживания. Без возврата этого газа на сжижение норма — 2,2–2,5 кг жидкого CO₂ на килограмм гранул."],
      ["tbl", "Потребность в жидком CO₂ без рекуперации газа вскипания", "Выход гранул | Жидкого CO₂ | За смену 8 ч | За месяц, 22 смены", "100 кг/ч | 230 кг/ч | 1,8 т | 40 т", "200 кг/ч | 460 кг/ч | 3,7 т | 81 т", "300 кг/ч | 690 кг/ч | 5,5 т | 121 т", "400 кг/ч | 920 кг/ч | 7,4 т | 162 т"],
      ["p", "Отсюда главное ограничение цеха: ёмкость подбирают под график поставок сырья, а не под каталог. Для линии 200 кг/ч на полных сменах [ёмкость на 50 м³](cat:cat-tanks-co2) — это запас примерно на четырнадцать восьмичасовых смен."],
      ["h2", "Как мы подбираем решение"],
      ["no", "Производительность и рынок: сколько гранулы и какой фракции вы будете продавать, есть ли сезонные пики."],
      ["no", "Сырьё: потребность в жидком CO₂, марка (для пищевого рынка — только пищевая по ISBT), минимальная партия и расстояние до наполнительной станции."],
      ["no", "Ёмкость и давление: объём под одну полную автоцистерну с рабочим резервом, система подъёма давления под непрерывный отбор."],
      ["no", "Компоновка: расположение ёмкости, гранулятора, склада готовой продукции, трасс жидкости и сброса газа."],
      ["no", "Монтаж, пусконаладка и обучение персонала; документы на сосуд под давлением."],
      ["p", "Расчёт норм и ловушки на старте разобраны в статье [«Сколько жидкого CO₂ нужно на тонну сухого льда»](post:post-co2-for-dry-ice). Как это выглядит на действующем производстве в Украине — на примере [IceLab](https://icelab.com.ua/ru/production): Киев и Львов, до 400 кг/ч, склад сырья на 60 тонн."],
      ["cta", "Планируете цех сухого льда?", "Пришлите нужную производительность и режим смен — посчитаем потребность в CO₂, подберём ёмкость и систему давления и покажем график поставок.", "Обсудить проект", "page:/contacts"],
    ],
  },
  hubs: ["cat-tanks-co2", "cat-co2-lab", "cat-installation"],
  posts: ["post-co2-for-dry-ice", "post-food-vs-technical-co2", "post-co2-safety-on-site"],
  faq: [
    {
      question: {
        en: "Can a pelletizer run from CO₂ cylinders?",
        uk: "Чи можна живити гранулятор від балонів?",
        ru: "Можно ли питать гранулятор от баллонов?",
      },
      answer: {
        en: "Only a small laboratory unit. A production pelletizer draws hundreds of kilograms of liquid an hour: a 100 kg/h line empties a 40 l cylinder in about six minutes. Production needs a stationary tank with pressure building.",
        uk: "Лише невелику лабораторну установку. Виробничий гранулятор відбирає сотні кілограмів рідини на годину: лінія 100 кг/год спорожнює 40-літровий балон приблизно за шість хвилин. Для виробництва потрібна стаціонарна ємність із підняттям тиску.",
        ru: "Только небольшую лабораторную установку. Производственный гранулятор отбирает сотни килограммов жидкости в час: линия 100 кг/ч опустошает 40-литровый баллон примерно за шесть минут. Для производства нужна стационарная ёмкость с подъёмом давления.",
      },
    },
    {
      question: {
        en: "Why do pellets come out soft and sublimate quickly?",
        uk: "Чому гранула виходить мʼякою й швидко сублімує?",
        ru: "Почему гранула получается мягкой и быстро сублимирует?",
      },
      answer: {
        en: "Most often the inlet pressure has dropped below the pelletizer's band. Continuous heavy draw-off cools the tank and pressure falls; without a pressure building coil sized for that flow the machine presses low-density pellets.",
        uk: "Найчастіше тиск на вході впав нижче робочого діапазону гранулятора. Тривалий великий відбір охолоджує ємність, і тиск падає; без змійовика підняття тиску, розрахованого на цю витрату, машина пресує гранулу низької щільності.",
        ru: "Чаще всего давление на входе упало ниже рабочего диапазона гранулятора. Длительный большой отбор охлаждает ёмкость, и давление падает; без змеевика подъёма давления, рассчитанного на этот расход, машина прессует гранулу низкой плотности.",
      },
    },
    {
      question: {
        en: "Does dry ice for food have to be made from food-grade CO₂?",
        uk: "Чи обовʼязково робити харчовий сухий лід із харчової вуглекислоти?",
        ru: "Обязательно ли делать пищевой сухой лёд из пищевой углекислоты?",
      },
      answer: {
        en: "Yes. Pelletizing purifies nothing — whatever is in the liquid ends up in the pellet and sublimates onto the product. For food, catering and pharmaceuticals the raw material has to be food grade to ISBT.",
        uk: "Так. Грануляція нічого не очищує — усе, що є в рідині, потрапляє в гранулу й сублімує на продукт. Для харчових продуктів, кейтерингу й фармацевтики сировина має бути харчовою за ISBT.",
        ru: "Да. Грануляция ничего не очищает — всё, что есть в жидкости, попадает в гранулу и сублимирует на продукт. Для пищевых продуктов, кейтеринга и фармацевтики сырьё должно быть пищевым по ISBT.",
      },
    },
  ],
};
