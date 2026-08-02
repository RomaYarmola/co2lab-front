import CodeSiteIcon from "../icons/CodeSiteIcon";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

export default function RightsBlock({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "footer");
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col md:flex-row-reverse md:items-center md:justify-between gap-6">
      <div className="md:w-1/2 lg:w-auto">
        <p className="text-[7px] font-normal leading-[120%] uppercase mb-1">
          {t("developedBy")}
        </p>
        <a
          href="https://code-site.art"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium leading-[120%] uppercase hover:opacity-80 transition-opacity duration-300 ease-in-out"
        >
          Code-site.art
          <CodeSiteIcon className="mb-1" />
        </a>
      </div>
      <p className="text-[16px] font-normal leading-[120%] text-center opacity-60">
        © {currentYear} CO2LAB
      </p>
    </div>
  );
}
