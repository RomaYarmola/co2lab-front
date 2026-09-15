import type { Landing } from "./types";
import { dryIceLanding } from "./dryIce";
import { beveragesLanding } from "./beverages";
import { weldingLanding } from "./welding";
import { greenhousesLanding } from "./greenhouses";

export type { Landing } from "./types";

/** Галузеві сторінки: /solutions/industries/<industry>. */
export const INDUSTRY_LANDINGS: Landing[] = [beveragesLanding, weldingLanding, greenhousesLanding];

export const DRY_ICE_LANDING = dryIceLanding;

export const LANDINGS: Landing[] = [dryIceLanding, ...INDUSTRY_LANDINGS];

export function industryLandingBySlug(slug: string): Landing | undefined {
  return INDUSTRY_LANDINGS.find((landing) => landing.path.endsWith(`/${slug}`));
}
