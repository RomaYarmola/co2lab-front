import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import SecondaryButton from "@/components/shared/buttons/SecondaryButton";
import TrackedLink from "@/components/shared/analytics/TrackedLink";
import { isLocale, localizePath, locales, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { ROUTES } from "@/constants/routes";
import { CONTACT_EMAIL_REQUEST, CONTACT_PHONE } from "@/constants/contact";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Службова сторінка після відправки форми. Закрита від індексації:
 * у пошуку вона не потрібна, а в аналітиці її перегляд — сигнал конверсії.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const t = getTranslator(raw, "seo.thanks");

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: true },
  };
}

export default async function ThanksPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const t = getTranslator(locale, "thanks");
  const tCommon = getTranslator(locale, "common");

  const steps = [t("step1"), t("step2"), t("step3")];

  return (
    <section className="flex min-h-[70vh] items-center pt-28 pb-16 lg:pt-36 lg:pb-24">
      <Container>
        <div className="mx-auto max-w-[720px] text-center">
          <span
            className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-black text-white lg:size-20"
            aria-hidden
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-7 lg:size-9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>

          <PageTitle className="mb-4">{t("title")}</PageTitle>
          <p className="mx-auto mb-10 max-w-[560px] text-[14px] font-light leading-[150%] text-black/70 lg:text-[18px]">
            {t("subtitle")}
          </p>

          <ol className="mx-auto mb-10 grid max-w-[640px] gap-4 text-left sm:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step}
                className="rounded-[18px] border border-black/10 p-4 lg:p-5"
              >
                <span className="mb-2 block text-[12px] font-medium leading-[120%] text-black/40">
                  {index + 1}
                </span>
                <span className="text-[12px] font-light leading-[140%] text-black/80 lg:text-[14px]">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <p className="mb-8 text-[12px] font-light leading-[150%] text-black/60 lg:text-[14px]">
            {t("urgent")}{" "}
            <TrackedLink
              href={`tel:${CONTACT_PHONE.replace(/\s|\(|\)/g, "")}`}
              location="thanks"
              className="font-medium text-black underline underline-offset-4"
            >
              {CONTACT_PHONE}
            </TrackedLink>{" "}
            <span className="text-black/40">·</span>{" "}
            <TrackedLink
              href={`mailto:${CONTACT_EMAIL_REQUEST}`}
              location="thanks"
              className="font-medium text-black underline underline-offset-4"
            >
              {CONTACT_EMAIL_REQUEST}
            </TrackedLink>
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href={localizePath(locale, ROUTES.catalog)}>
              <SecondaryButton variant="black">
                {tCommon("backToCatalog")}
              </SecondaryButton>
            </Link>
            <Link href={localizePath(locale, ROUTES.blog)}>
              <SecondaryButton
                variant="white"
                className="border border-black/15"
              >
                {t("readBlog")}
              </SecondaryButton>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
