import Container from "../container/Container";
import LogoBlock from "./LogoBlock";
import CompanyBlock from "./CompanyBlock";
import SupportBlock from "./SupportBlock";
import ContactsBlock from "./ContactsBlock";
import RightsBlock from "./RightsBlock";

export default function Footer() {
  return (
    <footer className="py-8 bg-black text-white rounded-t-[20px]">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between gap-12 lg:gap-20 xl:gap-[167px]">
          <LogoBlock />
          <CompanyBlock />
          <SupportBlock />
          <ContactsBlock />
        </div>
        <RightsBlock />
      </Container>
    </footer>
  );
}
