import type { Metadata } from "next";
import Hero from "@/components/homePage/hero/Hero";
import Redefining from "@/components/homePage/redefining/Redefining";
import About from "@/components/homePage/about/About";
import Efficiency from "@/components/homePage/efficiency/Efficiency";
import Activity from "@/components/homePage/activity/Activity";
import Benefits from "@/components/homePage/benefits/Benefits";
import ContactUs from "@/components/homePage/contactUs/ContactUs";
import FeaturedProducts from "@/components/homePage/featured/FeaturedProducts";
import LatestPosts from "@/components/homePage/featured/LatestPosts";
import { buildStaticPageMetadata, resolveLocale } from "@/utils/pageMetadata";
import { ROUTES } from "@/constants/routes";
import Container from "@/components/shared/container/Container";
import HubLinks from "@/components/shared/hubLinks/HubLinks";
import { DRY_ICE_LANDING, INDUSTRY_LANDINGS } from "@/content/landings";
import { getTranslator } from "@/i18n/server";

type Props = { params: Promise<{ locale: string }> };

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildStaticPageMetadata(params, "home", ROUTES.home);
}

export default async function Home({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale, "hubs");
  const solutionItems = [...INDUSTRY_LANDINGS, DRY_ICE_LANDING].map((landing) => ({
    path: landing.path,
    title: landing.shortTitle[locale],
    description: landing.seo.description[locale],
  }));

  return (
    <>
      <Hero locale={locale} />
      {/* Хаби каталогу на першому скролі: головна — найсильніша сторінка сайту,
          і її вага має йти туди, де продається обладнання. */}
      <Container>
        <HubLinks
          locale={locale}
          title={t("homeTitle")}
          text={t("homeText")}
          categoryIds="all"
          columns={4}
        />
      </Container>
      <Redefining locale={locale} />
      <About locale={locale} />
      <Efficiency locale={locale} />
      <Activity locale={locale} />
      <Benefits locale={locale} />
      {/* Товари й статті на головній — внутрішні посилання на свіжий контент */}
      <FeaturedProducts locale={locale} />
      <LatestPosts locale={locale} />
      <Container>
        <HubLinks
          locale={locale}
          title={t("industriesTitle")}
          text={t("industriesText")}
          items={solutionItems}
          columns={4}
        />
      </Container>
      <ContactUs locale={locale} />
    </>
  );
}
