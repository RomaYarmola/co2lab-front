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

type Props = { params: Promise<{ locale: string }> };

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildStaticPageMetadata(params, "home", ROUTES.home);
}

export default async function Home({ params }: Props) {
  const locale = await resolveLocale(params);

  return (
    <>
      <Hero locale={locale} />
      <Redefining locale={locale} />
      <About locale={locale} />
      <Efficiency locale={locale} />
      <Activity locale={locale} />
      <Benefits locale={locale} />
      {/* Товари й статті на головній — внутрішні посилання на свіжий контент */}
      <FeaturedProducts locale={locale} />
      <LatestPosts locale={locale} />
      <ContactUs locale={locale} />
    </>
  );
}
