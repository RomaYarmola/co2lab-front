import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

const routes = [
  "",
  "/about",
  "/contacts",
  "/supply",
  "/terms-of-use",
  "/privacy-policy",
  "/solutions/engineering-solutions",
  "/solutions/equipment-and-systems",
  "/solutions/industries-we-serve",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : ("monthly" as const),
    priority: path === "" ? 1 : 0.8,
  }));
}
