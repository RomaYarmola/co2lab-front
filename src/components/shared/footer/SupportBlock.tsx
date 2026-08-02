import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import { ROUTES } from "@/constants/routes";

const supportLinks = [
  { key: "contacts", href: ROUTES.contacts },
  { key: "privacyPolicy", href: ROUTES.privacyPolicy },
  { key: "termsOfUse", href: ROUTES.termsOfUse },
] as const;

export default function SupportBlock({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "footer");

  return (
    <nav>
      <p className="mb-5 text-[12px] font-light leading-[120%]">
        {t("support")}
      </p>
      <ul className="flex flex-col gap-4">
        {supportLinks.map(({ key, href }) => (
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
