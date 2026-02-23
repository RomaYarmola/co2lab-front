import ConsultationCTA from "@/components/shared/cta/ConsultationCTA";
import Hero from "@/components/supplyPage/hero/Hero";
import Standards from "@/components/supplyPage/standards/Standards";
import Distribution from "@/components/supplyPage/distribution/Distribution";
import Benefits from "@/components/supplyPage/benefits/Benefits";
import { createPageMetadata } from "@/utils/createMetadata";
import Biogenic from "@/components/supplyPage/biogenic/Biogenic";

export const metadata = createPageMetadata({
  title: "CO₂ Production and Supply",
  description:
    "Full-cycle CO₂ production and supply. From biogenic CO₂ capture to dry ice manufacturing and reliable distribution — certified quality and long-term supply.",
  path: "/supply",
});

export default function SupplyPage() {
  return (
    <>
      <Hero />
      <Biogenic />
      <Benefits />
      <Standards />
      <Distribution />
      <ConsultationCTA />
    </>
  );
}
