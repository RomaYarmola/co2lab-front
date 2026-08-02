import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { buildStaticPageMetadata, resolveLocale } from "@/utils/pageMetadata";
import { ROUTES } from "@/constants/routes";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildStaticPageMetadata(params, "privacyPolicy", ROUTES.privacyPolicy);
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const locale = await resolveLocale(params);
  return <LegalPage locale={locale} namespace="privacy" />;
}
