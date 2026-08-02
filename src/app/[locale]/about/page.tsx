import type { Metadata } from "next";
import { buildStaticPageMetadata, resolveLocale } from "@/utils/pageMetadata";
import { ROUTES } from "@/constants/routes";

type Props = { params: Promise<{ locale: string }> };
import Hero from "@/components/aboutPage/hero/Hero";
import WhoWeAre from "@/components/aboutPage/about/WhoWeAre";
import WhatWeDo from "@/components/aboutPage/whatWeDo/WhatWeDo";
import Approach from "@/components/aboutPage/approach/Approach";
import WhyChoose from "@/components/aboutPage/whyChoose/WhyChoose";
import BuildCTA from "@/components/shared/cta/BuildCTA";


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildStaticPageMetadata(params, "about", ROUTES.about);
}

export default async function About({ params }: Props) {
  const locale = await resolveLocale(params);

  return (
    <>
      <Hero locale={locale} />
      <WhoWeAre locale={locale} />
      <WhatWeDo locale={locale} />
      <Approach locale={locale} />
      <WhyChoose locale={locale} />
      <BuildCTA locale={locale} />
    </>
  );
}
