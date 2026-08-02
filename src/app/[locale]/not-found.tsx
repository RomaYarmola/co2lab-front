import Link from "next/link";
import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import SecondaryButton from "@/components/shared/buttons/SecondaryButton";
import { defaultLocale, localizePath } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { ROUTES } from "@/constants/routes";

/**
 * notFound() усередині [locale] не отримує params, тому показуємо
 * дефолтну локаль — сторінка й так віддається зі статусом 404
 * і не потрапляє в індекс.
 */
export default function NotFound() {
  const t = getTranslator(defaultLocale, "common");

  return (
    <section className="flex min-h-[60vh] items-center pt-28 pb-16 lg:pt-36">
      <Container className="text-center">
        <p className="mb-4 text-[64px] font-medium leading-[100%] text-black/15 lg:text-[120px]">
          404
        </p>
        <PageTitle className="mb-4">{t("notFoundTitle")}</PageTitle>
        <p className="mx-auto mb-8 max-w-[520px] text-[12px] lg:text-[16px] font-light leading-[150%] text-black/70">
          {t("notFoundText")}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={localizePath(defaultLocale, ROUTES.home)}>
            <SecondaryButton variant="black">{t("goHome")}</SecondaryButton>
          </Link>
          <Link href={localizePath(defaultLocale, ROUTES.catalog)}>
            <SecondaryButton
              variant="white"
              className="border border-black/15"
            >
              {t("backToCatalog")}
            </SecondaryButton>
          </Link>
        </div>
      </Container>
    </section>
  );
}
