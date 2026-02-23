import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import SecondaryButton from "@/components/shared/buttons/SecondaryButton";

export default function About() {
  return (
    <section className="py-12 lg:pt-[104px] lg:pb-0 text-white">
      <Container>
        <div className="relative rounded-[18px] px-3 lg:px-[46px] pt-8 lg:pt-[62px] pb-[182px] lg:pb-[117px]">
          <div className="absolute -z-10 inset-0 overflow-hidden rounded-[18px] bg-[linear-gradient(353.3deg,rgba(0,0,0,0)_44.74%,rgba(0,0,0,0.6)_67.83%)]">
            <Image
              src="/images/homePage/about/about.webp"
              alt="About CO2LAB"
              fill
              className="object-cover -z-10"
            />
            <div className="absolute z-10 inset-0 overflow-hidden rounded-[18px] bg-[linear-gradient(353.3deg,rgba(0,0,0,0)_44.74%,rgba(0,0,0,0.6)_67.83%)]" />
            <div className="absolute top-[-131px] lg:top-[-537px] right-0 z-20 w-[232px] lg:w-[538px] h-[259px] lg:h-[1068px]">
              <Image
                src="/images/homePage/about/smoke.webp"
                alt="Smoke"
                fill
                className="object-cover"
                aria-hidden
              />
            </div>
          </div>
          <SectionTitle className="mb-3 lg:mb-2 text-white xl:text-[64px]">
            ABOUT
            <br />
            CO2LAB
          </SectionTitle>
          <p className="sm:max-w-[431px] mb-8 text-[12px] lg:text-[16px] font-light leading-[120%]">
            At CO2Lab, we transform emissions into innovation. By closing the
            carbon loop, we give new purpose to what was once waste — creating
            technologies that drive a sustainable future.
          </p>
          <Link href="/about">
            <SecondaryButton>Read more</SecondaryButton>
            <span className="sr-only"> about CO₂ Lab</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
