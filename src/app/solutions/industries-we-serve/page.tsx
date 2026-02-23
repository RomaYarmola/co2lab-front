import SupportCTA from "@/components/shared/cta/SupportCTA";
import Hero from "@/components/industriesWeServePage/hero/Hero";
import Food from "@/components/industriesWeServePage/food/Food";
import Biogas from "@/components/industriesWeServePage/biogas/Biogas";
import Logistics from "@/components/industriesWeServePage/logistics/Logistics";
import Recycling from "@/components/industriesWeServePage/recycling/Recycling";
import { createPageMetadata } from "@/utils/createMetadata";
import Chemical from "@/components/industriesWeServePage/chemical/Chemical";

export const metadata = createPageMetadata({
  title: "Industries We Serve",
  description:
    "CO₂ Lab delivers tailored CO₂ solutions across multiple industries — food, biogas, logistics, recycling — helping businesses optimize processes and meet sustainability goals.",
  path: "/solutions/industries-we-serve",
});

export default function IndustriesWeServe() {
  return (
    <>
      <Hero />
      <Food />
      <Biogas />
      <Chemical />
      <Logistics />
      <Recycling />
      <SupportCTA />
    </>
  );
}
