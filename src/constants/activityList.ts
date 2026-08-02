import { ROUTES } from "./routes";

/**
 * Тексти карток лежать у словнику (`pages.home.activity.items`),
 * тут — тільки те, що не залежить від мови: посилання й оформлення.
 * Порядок масивів має збігатися з порядком items у словнику.
 */
export const activityHrefs: string[] = [
  ROUTES.engineeringSolutions,
  ROUTES.equipmentAndSystems,
  ROUTES.supply,
  ROUTES.industriesWeServe,
];

export const activityThemes: Array<{
  theme: "dark" | "light";
  backgroundImage?: string;
}> = [
  {
    theme: "dark",
    backgroundImage: "/images/homePage/activity/activityThree.webp",
  },
  { theme: "light" },
  {
    theme: "dark",
    backgroundImage: "/images/homePage/activity/activityOne.webp",
  },
  { theme: "light" },
];
