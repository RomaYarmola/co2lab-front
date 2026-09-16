import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import BreadcrumbJsonLd from "@/components/shared/seo/BreadcrumbJsonLd";
import ConsultationCTA from "@/components/shared/cta/ConsultationCTA";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import { localizePath } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { ROUTES } from "@/constants/routes";
import { LANDINGS } from "@/content/landings";
import { PROJECTS, projectTotals } from "@/content/projects";
import { fetchProductCategories } from "@/lib/sanity/fetchers";
import { mapCategory } from "@/lib/sanity/adapters";
import { createPageMetadata } from "@/utils/createMetadata";
import { resolveLocale } from "@/utils/pageMetadata";
import { num } from "@/lib/sanity/seed/format";

type Props = { params: Promise<{ locale: string }> };

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale, "seo.projects");
  const cover = PROJECTS[0].images[0];
  return createPageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: ROUTES.projects,
    image: cover.src,
    imageAlt: cover.alt[locale],
  });
}

export default async function ProjectsPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale, "projects");
  const tCommon = getTranslator(locale, "common");

  const categoryDocs = await fetchProductCategories();
  const categories = new Map(
    categoryDocs.map((doc) => [doc._id, mapCategory(doc, locale)]),
  );
  const totals = projectTotals();

  const crumbs = [
    { name: tCommon("home"), path: ROUTES.home },
    { name: t("title") },
  ];

  const stats = [
    { value: num(totals.projects, locale), label: t("statProjects") },
    { value: num(totals.tanks, locale), label: t("statTanks") },
    { value: num(totals.volume, locale), label: t("statVolume") },
  ];

  return (
    <>
      <BreadcrumbJsonLd locale={locale} items={crumbs} />

      <section className="pt-22 pb-4 lg:pt-32">
        <Container>
          <Breadcrumbs locale={locale} items={crumbs} className="mb-5 lg:mb-8" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-12">
            <div className="flex flex-col gap-3 lg:gap-5">
              <PageTitle className="normal-case text-[28px] lg:text-[42px] xl:text-[52px]">
                {t("title")}
              </PageTitle>
              <p className="text-[14px] font-light leading-[155%] text-black/75 lg:text-[18px]">
                {t("lead")}
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-3 lg:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 rounded-[18px] border border-black/10 px-4 py-4 lg:px-5 lg:py-5"
                >
                  <dt className="order-2 text-[11px] font-light leading-[130%] text-black/60 lg:text-[13px]">
                    {stat.label}
                  </dt>
                  <dd className="order-1 text-[28px] font-medium leading-[110%] lg:text-[40px]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-12 flex flex-col gap-14 lg:mt-20 lg:gap-20">
            {PROJECTS.map((project) => {
              const landing = LANDINGS.find((item) => item.path === project.landing);
              const hubs = project.hubs
                .map((id) => categories.get(id))
                .filter((category) => category?.slug);

              return (
                <article
                  key={project.id}
                  id={project.id}
                  className="scroll-mt-28 border-t border-black/10 pt-10 lg:pt-14"
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
                    <div className="flex flex-col gap-5">
                      <p className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-light uppercase leading-[120%] tracking-[0.06em] text-black/50">
                        <span>{project.industry[locale]}</span>
                        <span>
                          {t("completed")}: {project.completedLabel[locale]}
                        </span>
                      </p>
                      <h2 className="text-[22px] font-medium uppercase leading-[120%] lg:text-[30px]">
                        {project.title[locale]}
                      </h2>
                      <p className="text-[14px] font-light leading-[160%] text-black/80 lg:text-[16px]">
                        {project.summary[locale]}
                      </p>

                      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <dt className="mb-2 text-[12px] font-medium uppercase leading-[120%] text-black/50">
                            {t("equipment")}
                          </dt>
                          <dd>
                            <ul className="flex flex-col gap-1.5 text-[13px] font-light leading-[145%] lg:text-[15px]">
                              {project.equipment.map((item) => (
                                <li key={item.en}>{item[locale]}</li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                        <div>
                          <dt className="mb-2 text-[12px] font-medium uppercase leading-[120%] text-black/50">
                            {t("scope")}
                          </dt>
                          <dd>
                            <ul className="flex flex-col gap-1.5 text-[13px] font-light leading-[145%] lg:text-[15px]">
                              {project.scope.map((item) => (
                                <li key={item.en}>{item[locale]}</li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      </dl>

                      {(hubs.length > 0 || landing) && (
                        <div className="flex flex-col gap-3 border-t border-black/10 pt-5">
                          <p className="text-[12px] font-medium uppercase leading-[120%] text-black/50">
                            {t("related")}
                          </p>
                          <ul className="flex flex-wrap gap-2">
                            {hubs.map((category) => (
                              <li key={category!.id}>
                                <Link
                                  href={localizePath(locale, `${ROUTES.catalog}/category/${category!.slug}`)}
                                  className="inline-flex rounded-full border border-black/15 px-3 py-1.5 text-[12px] font-light leading-[120%] transition-colors duration-300 xl:hover:border-black lg:text-[13px]"
                                >
                                  {category!.title}
                                </Link>
                              </li>
                            ))}
                            {landing && (
                              <li>
                                <Link
                                  href={localizePath(locale, landing.path)}
                                  className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1.5 text-[12px] font-light leading-[120%] text-white transition-opacity duration-300 xl:hover:opacity-80 lg:text-[13px]"
                                >
                                  {landing.shortTitle[locale]}
                                  <ArrowIcon className="h-2.5 w-3" />
                                </Link>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Фото різної орієнтації — колонками, без обрізання ємностей */}
                    <div className="columns-2 gap-3 lg:gap-4">
                      {project.images.map((image, index) => (
                        <div
                          key={image.src}
                          className="mb-3 break-inside-avoid overflow-hidden rounded-[14px] bg-black/5 lg:mb-4"
                        >
                          <Image
                            src={image.src}
                            alt={image.alt[locale]}
                            width={image.width}
                            height={image.height}
                            sizes="(min-width: 1280px) 340px, (min-width: 1024px) 28vw, 50vw"
                            priority={project === PROJECTS[0] && index === 0}
                            className="h-auto w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <ConsultationCTA locale={locale} />
    </>
  );
}
