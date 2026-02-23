import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import ApproachList from "@/components/aboutPage/approach/ApproachList";
import Image from "next/image";

export default function Approach() {
  return (
    <section className="py-12 lg:pt-30 lg:pb-0">
      <Container className="relative">
        <Image
          src="/images/aboutPage/approach/bgMob.svg"
          alt=""
          aria-hidden
          width={171}
          height={216}
          className="absolute -z-10 -top-20 -left-2 pointer-events-none lg:hidden"
        />
        <Image
          src="/images/aboutPage/approach/bgDesk.svg"
          alt=""
          aria-hidden
          width={285}
          height={328}
          className="absolute -z-10 -top-26 left-74 pointer-events-none hidden lg:block"
        />
        <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-8 lg:mb-14">
          <SectionTitle>Our Approach</SectionTitle>
          <p className="md:w-[calc(50%-10px)]">
            We prioritize technical excellence, reliability, and transparency in
            every project. Our solutions are engineered to meet industrial
            standards, adapted to customer needs, and delivered with full
            operational support — from planning to execution.
          </p>
        </div>
        <ApproachList />
      </Container>
    </section>
  );
}
