import type { Metadata } from "next";
import { buildStaticPageMetadata, resolveLocale } from "@/utils/pageMetadata";
import { ROUTES } from "@/constants/routes";
import Container from "@/components/shared/container/Container";
import HubLinks from "@/components/shared/hubLinks/HubLinks";
import ProjectsStrip from "@/components/projects/ProjectsStrip";
import { PROJECTS } from "@/content/projects";
import { getTranslator } from "@/i18n/server";

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
  const tHubs = getTranslator(locale, "hubs");
  const tProjects = getTranslator(locale, "projects");

  return (
    <>
      <Hero locale={locale} />
      <WhoWeAre locale={locale} />
      <WhatWeDo locale={locale} />
      <Approach locale={locale} />
      <WhyChoose locale={locale} />
      <Container>
        <ProjectsStrip
          locale={locale}
          projects={PROJECTS}
          text={tProjects("homeText")}
          className="pt-12 lg:pt-20"
        />
        <HubLinks
          locale={locale}
          title={tHubs("catalogTitle")}
          categoryIds={["cat-tanks-co2", "cat-tanks-n2", "cat-co2-vaporizers", "cat-installation"]}
          columns={4}
        />
      </Container>
      <BuildCTA locale={locale} />
    </>
  );
}
