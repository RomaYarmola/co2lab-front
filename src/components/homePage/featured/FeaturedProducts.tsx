import Link from "next/link";
import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import SecondaryButton from "@/components/shared/buttons/SecondaryButton";
import ProductCard from "@/components/catalog/ProductCard";
import { localizePath, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { ROUTES } from "@/constants/routes";
import { fetchFeaturedProducts, fetchProducts } from "@/lib/sanity/fetchers";
import { mapProductCard } from "@/lib/sanity/adapters";

/**
 * Блок рекомендованих товарів. Якщо в CMS нічого не позначено як
 * «рекомендоване» — беремо перші товари каталогу, щоб секція не пустувала.
 */
export default async function FeaturedProducts({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "catalog");
  const tCommon = getTranslator(locale, "common");

  const featured = await fetchFeaturedProducts(4);
  const docs = featured.length > 0 ? featured : (await fetchProducts()).slice(0, 4);

  const products = docs
    .map((doc) => mapProductCard(doc, locale))
    .filter((product) => product.slug);

  if (products.length === 0) return null;

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-10">
          <div className="max-w-[640px]">
            <SectionTitle className="mb-3">{t("title")}</SectionTitle>
            <p className="text-[12px] lg:text-[16px] font-light leading-[140%] text-black/70">
              {t("intro")}
            </p>
          </div>
          <Link href={localizePath(locale, ROUTES.catalog)} className="shrink-0">
            <SecondaryButton variant="black">
              {tCommon("learnMore")}
            </SecondaryButton>
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {products.map((product) => (
            <li key={product.id} className="h-full">
              <ProductCard product={product} locale={locale} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
