import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { ROUTES } from "@/constants/routes";
import type { Project } from "@/content/projects";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import { cn } from "@/utils/cn";
import ProjectCard from "./ProjectCard";

/**
 * Блок «Реалізовані проєкти» для категорій, посадкових сторінок і головної.
 * Реальні обʼєкти поруч із ціною — найсильніший доказ для B2B-покупця,
 * а посилання ведуть вагу на сторінку /projects.
 */
export default function ProjectsStrip({
  locale,
  projects,
  title,
  text,
  columns = 4,
  className,
}: {
  locale: Locale;
  projects: Project[];
  title?: string;
  text?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  if (projects.length === 0) return null;
  const t = getTranslator(locale, "projects");

  return (
    <section className={className}>
      <div className="mb-6 flex flex-col gap-3 lg:mb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="flex max-w-[820px] flex-col gap-3">
          <h2 className="text-[22px] font-medium uppercase leading-[120%] lg:text-[32px]">
            {title ?? t("sectionTitle")}
          </h2>
          {text && (
            <p className="text-[12px] font-light leading-[150%] text-black/70 lg:text-[16px]">
              {text}
            </p>
          )}
        </div>
        <Link
          href={localizePath(locale, ROUTES.projects)}
          className="inline-flex shrink-0 items-center gap-2 text-[12px] font-medium uppercase leading-[120%] transition-opacity duration-300 xl:hover:opacity-70 lg:text-[14px]"
        >
          {t("allProjects")}
          <ArrowIcon className="h-3 w-3.5" />
        </Link>
      </div>
      <ul
        className={cn(
          "grid grid-cols-1 gap-4 xs:grid-cols-2 lg:gap-5",
          columns === 3 && "lg:grid-cols-3",
          columns === 4 && "lg:grid-cols-4",
        )}
      >
        {projects.map((project) => (
          <li key={project.id} className="h-full">
            <ProjectCard project={project} locale={locale} />
          </li>
        ))}
      </ul>
    </section>
  );
}
