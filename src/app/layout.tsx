import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import { getBaseUrl } from "@/utils/createMetadata";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

const baseUrl = getBaseUrl();
const defaultTitle = "CO₂ Capture & Reuse Solutions for Industry | CO2Lab";
const defaultDescription =
  "Capture, purify, and reuse CO₂ at the source. Closing the carbon loop with efficient, scalable clean-tech solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: defaultTitle,
    template: "%s | CO₂ Lab",
  },
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: baseUrl,
    siteName: "CO₂ Lab",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "CO₂ Lab",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [`${baseUrl}/opengraph-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} flex min-h-screen flex-col text-[14px] lg:text-[18px] font-light leading-[120%] antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
