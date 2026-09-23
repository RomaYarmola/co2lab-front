/**
 * Єдине джерело правди для статичних маршрутів.
 * Використовується навігацією, sitemap і хлібними крихтами — щоб не розʼїжджалися.
 */
export const ROUTES = {
  home: "/",
  supply: "/supply",
  catalog: "/catalog",
  blog: "/blog",
  about: "/about",
  contacts: "/contacts",
  engineeringSolutions: "/solutions/engineering-solutions",
  equipmentAndSystems: "/solutions/equipment-and-systems",
  industriesWeServe: "/solutions/industries-we-serve",
  dryIceProduction: "/solutions/dry-ice-production",
  industryBeverages: "/solutions/industries/beverages",
  industryWelding: "/solutions/industries/welding",
  industryGreenhouses: "/solutions/industries/greenhouses",
  projects: "/projects",
  termsOfUse: "/terms-of-use",
  privacyPolicy: "/privacy-policy",
  /** Службова сторінка після відправки форми, закрита від індексації. */
  thanks: "/thanks",
} as const;

export type RouteKey = keyof typeof ROUTES;

/**
 * Дата останньої змістовної правки статичних сторінок — оновлюйте разом
 * із текстами. Раніше lastmod дорівнював часу генерації карти: Google
 * бачив «змінено» при кожному обході й перестає довіряти такому полю.
 */
export const STATIC_CONTENT_UPDATED_AT = "2026-09-23T00:00:00Z";

export type StaticRoute = {
  path: string;
  /** Ключ у словнику seo.* для title/description */
  seoKey: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
};

export const STATIC_ROUTES: StaticRoute[] = [
  { path: ROUTES.home, seoKey: "home", priority: 1, changeFrequency: "weekly" },
  { path: ROUTES.catalog, seoKey: "catalog", priority: 0.9, changeFrequency: "weekly" },
  { path: ROUTES.supply, seoKey: "supply", priority: 0.8, changeFrequency: "monthly" },
  {
    path: ROUTES.engineeringSolutions,
    seoKey: "engineeringSolutions",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: ROUTES.equipmentAndSystems,
    seoKey: "equipmentAndSystems",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: ROUTES.industriesWeServe,
    seoKey: "industriesWeServe",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  { path: ROUTES.dryIceProduction, seoKey: "landing", priority: 0.8, changeFrequency: "monthly" },
  { path: ROUTES.industryBeverages, seoKey: "landing", priority: 0.8, changeFrequency: "monthly" },
  { path: ROUTES.industryWelding, seoKey: "landing", priority: 0.8, changeFrequency: "monthly" },
  { path: ROUTES.industryGreenhouses, seoKey: "landing", priority: 0.8, changeFrequency: "monthly" },
  { path: ROUTES.projects, seoKey: "projects", priority: 0.8, changeFrequency: "monthly" },
  { path: ROUTES.blog, seoKey: "blog", priority: 0.8, changeFrequency: "daily" },
  { path: ROUTES.about, seoKey: "about", priority: 0.7, changeFrequency: "monthly" },
  { path: ROUTES.contacts, seoKey: "contacts", priority: 0.7, changeFrequency: "monthly" },
  { path: ROUTES.termsOfUse, seoKey: "termsOfUse", priority: 0.3, changeFrequency: "yearly" },
  {
    path: ROUTES.privacyPolicy,
    seoKey: "privacyPolicy",
    priority: 0.3,
    changeFrequency: "yearly",
  },
];
