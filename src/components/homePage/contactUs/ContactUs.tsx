import Image from "next/image";
import Container from "@/components/shared/container/Container";
import ContactApplication from "./ContactApplication";
import SectionTitle from "@/components/shared/titles/SectionTitle";

export default function ContactUs() {
  return (
    <section className="pt-12 pb-24 lg:pt-[136px] lg:pb-[76px]">
      <Container className="overflow-hidden rounded-[18px]">
        <div className="relative overflow-hidden rounded-[18px]">
          <Image quality={90}
            src="/images/homePage/contactUs/image.webp"
            alt="contact us image"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1280px"
            priority
          />

          <Image quality={90}
            src="/images/homePage/contactUs/smokeMob.webp"
            alt=""
            width={338}
            height={524}
            className="pointer-events-none absolute -bottom-62 -right-7 z-[5] lg:hidden"
            aria-hidden
          />
          <Image quality={90}
            src="/images/homePage/contactUs/smokeDesk.webp"
            alt=""
            width={758}
            height={31}
            className="pointer-events-none absolute -bottom-98 -right-7 z-[5] hidden lg:block"
            aria-hidden
          />

          <div className="relative z-10 flex flex-col justify-end px-3 lg:px-12 pt-8 pb-[148px] lg:py-[84px]">
            <SectionTitle className="mb-3 text-white lg:mb-8 lg:max-w-[604px]">
              Let&apos;s build a cleaner future together
            </SectionTitle>
            <p
              className="mb-8 lg:mb-12 max-w-[548px] text-[12px] lg:text-[18px] font-light leading-[120%] text-white 
            "
            >
              Our engineers will help you integrate CO₂ solutions that meet your
              production and environmental goals. Get advice and learn how to
              optimize your carbon cycle.
            </p>
            <ContactApplication />
          </div>
        </div>
      </Container>
    </section>
  );
}
