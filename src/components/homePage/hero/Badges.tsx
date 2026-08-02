import { twMerge } from "tailwind-merge";
import Badge from "@/components/shared/badge/Badge";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

type BadgesProps = {
  locale: Locale;
  className?: string;
};

export default function Badges({ locale, className }: BadgesProps) {
  const t = getTranslator(locale, "pages.home.hero");
  const labels = t.list<string>("badges");

  return (
    <div
      className={twMerge("flex flex-wrap gap-2", className)}
      role="list"
      aria-label={t("badgesLabel")}
    >
      {labels.map((label) => (
        <Badge key={label}>{label}</Badge>
      ))}
    </div>
  );
}
