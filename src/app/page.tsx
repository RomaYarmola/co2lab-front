import Hero from "@/components/homePage/hero/Hero";
import Redefining from "@/components/homePage/redefining/Redefining";
import About from "@/components/homePage/about/About";
import Efficiency from "@/components/homePage/efficiency/Efficiency";
import Activity from "@/components/homePage/activity/Activity";
import Benefits from "@/components/homePage/benefits/Benefits";
import ContactUs from "@/components/homePage/contactUs/ContactUs";
import { createPageMetadata } from "@/utils/createMetadata";

export const metadata = createPageMetadata({
  title: "CO₂ Capture & Reuse Solutions for Industry",
  description:
    "Capture, purify, and reuse CO₂ at the source. Complete CO₂ solutions from capture to application. Closing the carbon loop with efficient, scalable clean-tech solutions.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Redefining />
      <About />
      <Efficiency />
      <Activity />
      <Benefits />
      <ContactUs />
    </>
  );
}
