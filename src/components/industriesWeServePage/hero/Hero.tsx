import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import Image from "next/image";
import heroImage from "../../../../public/images/industriesWeServePage/hero/hero.webp";

export default function Hero() {
  return (
    <section className="relative z-10 pt-[72px] pb-4 md:pt-[82px] lg:pt-5 md:pb-0">
      <Container>
        <div className="relative px-3 lg:px-6.5 py-[198px] lg:pt-[280px] lg:pb-[198px] rounded-[18px] overflow-hidden">
          <Image quality={100}
            src={heroImage}
            alt="Hero"
            fill
            priority
            fetchPriority="high"
            placeholder="blur"
            className="object-cover -z-10"
          />
          <PageTitle className="max-w-[304px] lg:max-w-[598px] mb-3 lg:mb-5.5 mx-auto lg:mx-0 text-white text-center lg:text-left">
            Industries We Serve
          </PageTitle>
          <p className="max-w-[598px] mx-auto lg:mx-0 text-white text-center lg:text-left">
            CO2Lab delivers tailored CO₂ solutions across multiple industries —
            helping businesses optimize processes, ensure quality, and meet
            sustainability goals.
          </p>
        </div>
      </Container>
    </section>
  );
}
