import Container from "@/components/shared/container/Container";
import MainButton from "@/components/shared/buttons/MainButton";
import PageTitle from "@/components/shared/titles/PageTitle";
import Image from "next/image";
import Badges from "./Badges";
import Link from "next/link";
import HeroSlider from "./slider/HeroSlider";
import heroImage from "../../../../public/images/homePage/hero/hero.webp";

export default function Hero() {
  return (
    <section className="pt-22 pb-4 lg:pt-8 lg:pb-0">
      <Container className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <div className="lg:w-[calc(50%-16px)] lg:pt-30 lg:pb-10">
          <PageTitle className="mb-3 lg:mb-5.5">
            Turning emissions into opportunity
          </PageTitle>
          <p className="mb-4 lg:mb-10">
            Complete CO₂ solutions — from capture to application
          </p>
          <Link href="/solutions/engineering-solutions">
            <MainButton className="sm:max-w-[288px] lg:mb-20">
              Explore Solutions
            </MainButton>
          </Link>
          <Badges className="hidden lg:flex max-w-[335px]" />
        </div>
        <div className="relative w-full lg:w-[calc(50%-16px)] min-h-[305px] lg:min-h-[420px] rounded-[18px]">
          <Image
            src="/images/homePage/hero/bgMobile.svg"
            alt=""
            width={152}
            height={190}
            className="absolute -z-10 right-[-41px] top-[-74px] lg:hidden"
            aria-hidden
          />
          <Image
            src="/images/homePage/hero/bgDesk.svg"
            alt=""
            width={269}
            height={338}
            className="absolute -z-10 bottom-[-163px] left-[-164px] hidden lg:block"
            aria-hidden
          />
          <Image
            src={heroImage}
            alt=""
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
          <div className="absolute inset-0 z-20 rounded-[18px]">
            <HeroSlider />
          </div>
        </div>
        <Badges className="lg:hidden" />
      </Container>
    </section>
  );
}
