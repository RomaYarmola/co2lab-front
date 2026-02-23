import Image from "next/image";
import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import { whatWeDoListItems } from "@/constants/whatWeDoList";
import WhatWeDoList from "./WhatWeDoList";

export default function WhatWeDo() {
  return (
    <section className="py-12 lg:pt-[108px] lg:pb-0">
      <div className="relative rounded-[28px] bg-black py-8 lg:pt-[59px] lg:pb-12">
        <Container className="relative">
          <Image quality={90}
            src="/images/aboutPage/whatWeDo/bgMob.svg"
            alt="background mobile"
            width="188"
            height="158"
            className="absolute -right-3 top-0 pointer-events-none lg:hidden"
            aria-hidden
          />
          <Image quality={90}
            src="/images/aboutPage/whatWeDo/bgLeftDesk.svg"
            alt="background left desktop"
            width="328"
            height="285"
            className="absolute right-[447px] xl:right-[647px] -top-5 pointer-events-none hidden lg:block"
            aria-hidden
          />
          <Image quality={90}
            src="/images/aboutPage/whatWeDo/bgRightDesk.svg"
            alt="background right desktop"
            width="264"
            height="339"
            className="absolute right-10 xl:right-30 -top-5 pointer-events-none hidden lg:block"
            aria-hidden
          />
          <SectionTitle className="mb-3 text-white lg:mb-6">
            What We Do
          </SectionTitle>
          <p className="mb-8 lg:mb-[73px] text-white max-w-[240px] lg:max-w-[345px] text-[12px] lg:text-[14px] font-light leading-[120%]">
            Our work spans the full lifecycle of industrial CO₂:
          </p>
          <div className="mt-6 lg:mt-8">
            <WhatWeDoList items={whatWeDoListItems} />
          </div>
        </Container>
      </div>
    </section>
  );
}
