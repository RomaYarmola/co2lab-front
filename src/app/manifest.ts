import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CO₂ Lab",
    short_name: "CO₂ Lab",
    description:
      "CO₂ capture, purification and reuse solutions; cryogenic tanks, vaporizers and gas supply systems.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
