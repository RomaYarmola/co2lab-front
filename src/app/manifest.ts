import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CO₂ Lab",
    short_name: "CO₂ Lab",
    description:
      "Cryogenic tanks, cylinders and vaporizers for CO₂ and industrial gases; bulk liquid CO₂ supply in Ukraine.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
