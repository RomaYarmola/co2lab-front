import { ROUTES } from "./routes";

export type NavSubmenuItem = {
  /** Ключ у словнику nav.* */
  titleKey: string;
  slug: string;
};

export type NavMenuItem = {
  titleKey: string;
  slug?: string;
  submenu?: NavSubmenuItem[];
};

export const navMenuList: NavMenuItem[] = [
  { titleKey: "home", slug: ROUTES.home },
  { titleKey: "supply", slug: ROUTES.supply },
  { titleKey: "catalog", slug: ROUTES.catalog },
  {
    titleKey: "solutions",
    submenu: [
      { titleKey: "engineeringSolutions", slug: ROUTES.engineeringSolutions },
      { titleKey: "equipmentAndSystems", slug: ROUTES.equipmentAndSystems },
      { titleKey: "industriesWeServe", slug: ROUTES.industriesWeServe },
    ],
  },
  { titleKey: "blog", slug: ROUTES.blog },
  { titleKey: "about", slug: ROUTES.about },
  { titleKey: "contacts", slug: ROUTES.contacts },
];

/** Індекс пункту в меню під поточний шлях (без префікса локалі). */
export function getActiveIndex(pathname: string): number {
  if (pathname === ROUTES.home) return 0;
  if (pathname.startsWith(ROUTES.supply)) return 1;
  if (pathname.startsWith(ROUTES.catalog)) return 2;
  if (pathname.startsWith("/solutions")) return 3;
  if (pathname.startsWith(ROUTES.blog)) return 4;
  if (pathname.startsWith(ROUTES.about)) return 5;
  if (pathname.startsWith(ROUTES.contacts)) return 6;
  return 0;
}

/** Індекс пункту "Solutions" — pill лишається на ньому при відкритому дропдауні. */
export const SOLUTIONS_INDEX = 3;
