/**
 * Оформлення карток «Що ми робимо»; тексти — у словнику
 * `pages.about.whatWeDo.items`. Порядок має збігатися зі словником.
 */
export const whatWeDoThemes: Array<{
  theme: "dark" | "light";
  backgroundImage?: string;
}> = [
  {
    theme: "dark",
    backgroundImage: "/images/aboutPage/whatWeDo/imageOne.webp",
  },
  { theme: "light" },
  {
    theme: "dark",
    backgroundImage: "/images/aboutPage/whatWeDo/imageTwo.webp",
  },
  { theme: "light" },
];
