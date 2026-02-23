import type { ActivityItem } from "@/components/homePage/activity/ActivityCard";

export const activityListItems: ActivityItem[] = [
  {
    title: "Solutions",
    description:
      "Comprehensive engineering solutions tailored to your CO2 processes.",
    href: "/solutions/engineering-solutions",
    theme: "dark",
    backgroundImage: "/images/homePage/activity/activityThree.webp",
  },
  {
    title: "Equipment & Systems",
    description: "Innovative equipment ensuring performance and efficiency.",
    href: "/solutions/equipment-and-systems",
    theme: "light",
  },
  {
    title: "Production & Supply",
    description: "Reliable CO2 production and distribution solutions.",
    href: "/supply",
    theme: "dark",
    backgroundImage: "/images/homePage/activity/activityOne.webp",
  },
  {
    title: "Industries We Serve",
    description:
      "Trusted by leaders across energy, food, and manufacturing sectors.",
    href: "/solutions/industries-we-serve",
    theme: "light",
  },
];
