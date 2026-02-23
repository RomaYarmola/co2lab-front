import Hero from "@/components/aboutPage/hero/Hero";
import WhoWeAre from "@/components/aboutPage/about/WhoWeAre";
import WhatWeDo from "@/components/aboutPage/whatWeDo/WhatWeDo";
import Approach from "@/components/aboutPage/approach/Approach";
import WhyChoose from "@/components/aboutPage/whyChoose/WhyChoose";
import BuildCTA from "@/components/shared/cta/BuildCTA";
import { createPageMetadata } from "@/utils/createMetadata";

export const metadata = createPageMetadata({
  title: "About CO₂ Lab",
  description:
    "CO₂ Lab delivers end-to-end CO₂ technologies — from capture and purification to supply and logistics — for industrial partners worldwide.",
  path: "/about",
});

export default function About() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <WhatWeDo />
      <Approach />
      <WhyChoose />
      <BuildCTA />
    </>
  );
}
