import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import { getBaseUrl, buildLanguageAlternates } from "@/utils/createMetadata";
import {
  htmlLangs,
  isLocale,
  locales,
  ogLocales,
  type Locale,
} from "@/i18n/config";
import { getMessages } from "@/i18n/getMessages";
import { I18nProvider } from "@/i18n/I18nProvider";
import OrganizationJsonLd from "@/components/shared/seo/OrganizationJsonLd";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const messages = getMessages(locale);
  const baseUrl = getBaseUrl();
  const title = `${messages.seo.home.title} | ${messages.seo.siteName}`;
  const description = messages.seo.home.description;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${messages.seo.siteName}`,
    },
    description,
    applicationName: messages.seo.siteName,
    alternates: {
      languages: buildLanguageAlternates("/"),
    },
    formatDetection: { telephone: false, address: false, email: false },
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
    openGraph: {
      title,
      description,
      siteName: messages.seo.siteName,
      images: [
        {
          url: "/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: messages.seo.siteName,
          type: "image/jpeg",
        },
      ],
      locale: ogLocales[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/opengraph-image.jpg`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const messages = getMessages(locale);

  return (
    <html lang={htmlLangs[locale]}>
      <body
        className={`${montserrat.variable} flex min-h-screen flex-col text-[14px] lg:text-[18px] font-light leading-[120%] antialiased`}
      >
        <I18nProvider locale={locale} messages={messages}>
          <OrganizationJsonLd locale={locale} />
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </I18nProvider>
      </body>
    </html>
  );
}
