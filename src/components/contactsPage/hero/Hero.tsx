import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import Image from "next/image";
import ContactDetails from "./ContactDetails";
import heroImage from "../../../../public/images/contactsPage/hero/hero.webp";

export default function Hero() {
  return (
    <section className="pt-22 pb-4 lg:pt-8 lg:pb-0">
      <Container className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <div className="lg:w-[calc(50%-16px)] lg:pt-[170px] lg:pb-[101px]">
          <PageTitle className="mb-3 lg:mb-5.5 max-w-40 lg:max-w-[302px]">
            Contacts
          </PageTitle>
          <p className="mb-4 lg:mb-[85px]">
            Get in touch with CO2Lab to discuss your project, supply needs, or
            technical requirements.
          </p>
          <ContactDetails className="hidden lg:block" />
        </div>
        <div className="relative w-full lg:w-[calc(50%-16px)] min-h-[305px] sm:min-h-[380px] lg:min-h-[420px] rounded-[18px]">
          <Image quality={90}
            src="/images/homePage/hero/bgMobile.svg"
            alt="background image"
            width={152}
            height={190}
            className="absolute -z-10 right-[-41px] top-[397px] lg:hidden"
            aria-hidden
          />
          <Image quality={90}
            src="/images/homePage/hero/bgDesk.svg"
            alt="background image"
            width={269}
            height={338}
            className="absolute -z-10 bottom-[-163px] left-[-164px] hidden lg:block"
            aria-hidden
          />
          <Image quality={90}
            src={heroImage}
            alt="hero image"
            fill
            priority
            fetchPriority="high"
            placeholder="blur"
            className="object-cover rounded-[18px]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="lg:hidden absolute inset-0 z-10 rounded-[18px] bg-[linear-gradient(176.8deg,rgba(0,0,0,0)_59.28%,rgba(0,0,0,0.6)_79.3%)]"
            aria-hidden
          />
        </div>
        <ContactDetails className="lg:hidden mt-12" />
      </Container>
    </section>
  );
}
