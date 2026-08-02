import Link from "next/link";
import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import SecondaryButton from "@/components/shared/buttons/SecondaryButton";
import PostCard from "@/components/blog/PostCard";
import { localizePath, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { ROUTES } from "@/constants/routes";
import { fetchLatestPosts } from "@/lib/sanity/fetchers";
import { mapPostCard } from "@/lib/sanity/adapters";

export default async function LatestPosts({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "blog");
  const tCommon = getTranslator(locale, "common");

  const posts = (await fetchLatestPosts(3))
    .map((doc) => mapPostCard(doc, locale))
    .filter((post) => post.slug);

  if (posts.length === 0) return null;

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-10">
          <div className="max-w-[640px]">
            <SectionTitle className="mb-3">{t("latest")}</SectionTitle>
            <p className="text-[12px] lg:text-[16px] font-light leading-[140%] text-black/70">
              {t("intro")}
            </p>
          </div>
          <Link href={localizePath(locale, ROUTES.blog)} className="shrink-0">
            <SecondaryButton variant="black">
              {tCommon("readMore")}
            </SecondaryButton>
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {posts.map((post) => (
            <li key={post.id} className="h-full">
              <PostCard post={post} locale={locale} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
