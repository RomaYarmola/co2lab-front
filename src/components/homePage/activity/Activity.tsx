import Image from "next/image";
import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import ActivityList from "@/components/homePage/activity/ActivityList";
import { activityListItems } from "@/constants/activityList";

export default function Activity() {
  return (
    <section className="py-12 lg:py-0">
      <div className="relative rounded-[28px] bg-black py-8 lg:pt-[59px] lg:pb-12">
        <Container className="relative">
          <Image
            src="/images/homePage/activity/bgMob.svg"
            alt=""
            width={185}
            height={161}
            className="absolute -right-1 -top-1 pointer-events-none lg:hidden"
            aria-hidden
          />
          <Image
            src="/images/homePage/activity/bgLeftDesk.svg"
            alt=""
            width={328}
            height={285}
            className="absolute right-[335px] top-5 pointer-events-none hidden lg:block"
            aria-hidden
          />
          <Image
            src="/images/homePage/activity/bgRightDesk.svg"
            alt=""
            width={290}
            height={322}
            className="absolute -right-18 top-[69px] pointer-events-none hidden lg:block"
            aria-hidden
          />
          <SectionTitle className="mb-3 text-white lg:mb-6">
            Areas of activity
          </SectionTitle>
          <p className="mb-8 lg:mb-[73px] text-white max-w-[277px]">
            From design to delivery — engineered systems for every CO₂
            application.
          </p>
          <div className="mt-6 lg:mt-8">
            <ActivityList items={activityListItems} />
          </div>
        </Container>
      </div>
    </section>
  );
}
