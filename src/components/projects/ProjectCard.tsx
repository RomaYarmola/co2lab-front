import Image from "next/image";
import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { ROUTES } from "@/constants/routes";
import type { Project } from "@/content/projects";

/** Картка обʼєкта: веде на його блок на сторінці /projects. */
export default function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const cover = project.images[project.cover ?? 0];
  const href = localizePath(locale, `${ROUTES.projects}#${project.id}`);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-black/10 bg-white transition-shadow duration-300 xl:hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-black/5 lg:h-[220px]">
        <Image
          src={cover.src}
          alt={cover.alt[locale]}
          fill
          sizes="(min-width: 1280px) 380px, (min-width: 640px) 45vw, 90vw"
          className="object-cover object-center transition-transform duration-700 ease-out xl:group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 lg:p-5">
        <p className="mb-2 flex flex-wrap gap-x-3 text-[10px] font-light uppercase leading-[120%] tracking-[0.06em] text-black/50 lg:text-[12px]">
          <span>{project.industry[locale]}</span>
          <span>{project.completedLabel[locale]}</span>
        </p>

        <h3 className="mb-3 text-[16px] font-medium uppercase leading-[120%] lg:text-[18px]">
          <Link
            href={href}
            className="transition-opacity duration-300 focus:outline-none focus-visible:underline xl:hover:opacity-70"
          >
            <span className="absolute inset-0 z-10" aria-hidden />
            {project.title[locale]}
          </Link>
        </h3>

        <ul className="mt-auto flex flex-col gap-1 text-[12px] font-light leading-[140%] text-black/70 lg:text-[14px]">
          {project.equipment.map((item) => (
            <li key={item.en}>{item[locale]}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
