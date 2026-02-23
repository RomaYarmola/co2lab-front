import ExploreTechnologiesApplication from "./ExploreTechnologies";
import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import Image from "next/image";
import heroImage from "../../../../public/images/engineeringSolutionsPage/hero/hero.webp";

export default function Hero() {
  return (
    <section className="relative z-10 pt-[72px] pb-4 md:pt-[82px] lg:pt-5 md:pb-0">
      <Container>
        <div className="relative px-3 lg:px-6.5 py-[168px] lg:pt-[275px] lg:pb-[154px] rounded-[18px] overflow-hidden">
          <Image quality={90}
            src={heroImage}
            alt="Hero"
            fill
            priority
            fetchPriority="high"
            placeholder="blur"
            className="object-cover -z-10"
          />
          <PageTitle className="max-w-[304px] lg:max-w-[903px] mb-4 lg:mb-5.5 mx-auto lg:mx-0 text-white text-center lg:text-left">
            Complete CO₂ Engineering Solutions
          </PageTitle>
          <p className="mb-6 lg:mb-10 text-white text-center lg:text-left">
            From capture to utilization
          </p>
          <ExploreTechnologiesApplication />
        </div>
      </Container>
    </section>
  );
}
