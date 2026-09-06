import { contacts } from "@/constants/contact";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";
import TrackedLink from "@/components/shared/analytics/TrackedLink";

export default function ContactsBlock({ locale }: { locale: Locale }) {
  const t = getTranslator(locale, "forms");

  const contactItems: Array<{
    label: string;
    value: string;
    href?: string;
  }> = [
    {
      label: t("phone"),
      value: contacts.phone,
      href: `tel:${contacts.phone.replace(/\s|\(|\)/g, "")}`,
    },
    {
      label: t("email"),
      value: contacts.email,
      href: `mailto:${contacts.email}`,
    },
    {
      label: "Address",
      value: contacts.address,
      href: contacts.addressLink,
    },
  ];

  return (
    <div className="md:w-1/2 lg:w-auto">
      {contactItems.map(({ label, value, href }) => (
        <div key={label} className="mb-4.5 last:mb-0">
          <p className="text-[12px] font-light leading-[120%] mb-3.5">
            {label}
          </p>
          {href !== undefined ? (
            <TrackedLink
              href={href || "#"}
              location="footer"
              className="text-[14px] font-medium leading-[120%] xl:hover:opacity-80 transition-opacity duration-300 ease-in-out block"
            >
              {value}
            </TrackedLink>
          ) : (
            <p className="text-[14px] font-medium leading-[120%]">{value}</p>
          )}
        </div>
      ))}
    </div>
  );
}
