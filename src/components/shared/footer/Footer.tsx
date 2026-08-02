import Container from "../container/Container";
import LogoBlock from "./LogoBlock";
import CompanyBlock from "./CompanyBlock";
import SupportBlock from "./SupportBlock";
import ContactsBlock from "./ContactsBlock";
import RightsBlock from "./RightsBlock";
import type { Locale } from "@/i18n/config";

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="rounded-t-[20px] bg-black py-8 text-white">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-12 md:flex-row md:flex-wrap md:justify-between lg:gap-20 xl:gap-[120px]">
          <LogoBlock locale={locale} />
          <CompanyBlock locale={locale} />
          <SupportBlock locale={locale} />
          <ContactsBlock locale={locale} />
        </div>
        <RightsBlock locale={locale} />
      </Container>
    </footer>
  );
}
