import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { ROUTES } from "@/constants/routes";

const companyLinks = [
  { key: "home", href: ROUTES.home },
  { key: "supply", href: ROUTES.supply },
  { key: "catalog", href: ROUTES.catalog },
  { key: "engineeringSolutions", href: ROUTES.engineeringSolutions },
  { key: "equipmentAndSystems", href: ROUTES.equipmentAndSystems },
  { key: "industriesWeServe", href: ROUTES.industriesWeServe },
  { key: "blog", href: ROUTES.blog },
] as const;

export default function CompanyBlock({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "nav");
  const tFooter = getTranslator(locale, "footer");

  return (
    <nav className="md:w-1/2 lg:w-auto">
      <p className="mb-5 text-[12px] font-light leading-[120%]">
        {tFooter("company")}
      </p>
      <ul className="flex flex-col gap-4">
        {companyLinks.map(({ key, href }) => (
          <li key={href}>
            <Link
              href={localizePath(locale, href)}
              className="text-[14px] font-medium uppercase leading-[120%] transition-opacity duration-300 ease-in-out hover:opacity-80"
            >
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
