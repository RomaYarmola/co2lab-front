import Hero from "@/components/equipmentAndSystemsPage/hero/Hero";
import Comparison from "@/components/equipmentAndSystemsPage/comparison/Comparison";
import CriogenicTanks from "@/components/equipmentAndSystemsPage/criogenicTanks/CriogenicTanks";
import SupportCTA from "@/components/shared/cta/SupportCTA";
import { createPageMetadata } from "@/utils/createMetadata";
import Modular from "@/components/equipmentAndSystemsPage/modular/Modular";
import Engineering from "@/components/equipmentAndSystemsPage/engineering/Engineering";

export const metadata = createPageMetadata({
  title: "Equipment & Modular CO₂ Systems",
  description:
    "Equipment and modular CO₂ systems from blueprint to turnkey solution. Cryogenic tanks and custom installations.",
  path: "/solutions/equipment-and-systems",
});

export default function EquipmentAndSystems() {
  return (
    <>
      <Hero />
      <Modular />
      <Comparison />
      <Engineering />
      <CriogenicTanks />
      <SupportCTA />
    </>
  );
}
