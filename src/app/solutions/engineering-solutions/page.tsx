import Hero from "@/components/engineeringSolutionsPage/hero/Hero";
import Processing from "@/components/engineeringSolutionsPage/processing/Processing";
import Technologies from "@/components/engineeringSolutionsPage/technologies/Technologies";
import Monitoring from "@/components/engineeringSolutionsPage/monitoring/Monitoring";
import DryIce from "@/components/engineeringSolutionsPage/dryIce/DryIce";
import ConsultationCTA from "@/components/shared/cta/ConsultationCTA";
import { createPageMetadata } from "@/utils/createMetadata";
import Logistics from "@/components/engineeringSolutionsPage/logistics/Logistics";
import Utilization from "@/components/engineeringSolutionsPage/utilization/Utilization";

export const metadata = createPageMetadata({
  title: "Engineering Solutions",
  description:
    "Complete CO₂ engineering solutions from capture to utilization. Technologies, processing, monitoring, and dry ice production.",
  path: "/solutions/engineering-solutions",
});

export default function EngineeringSolutions() {
  return (
    <>
      <Hero />
      <Technologies />
      <Processing />
      <Monitoring />
      <Logistics />
      <DryIce />
      <Utilization />
      <ConsultationCTA />
    </>
  );
}
