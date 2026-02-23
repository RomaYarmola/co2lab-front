import Container from "@/components/shared/container/Container";
import BenefitsList from "@/components/homePage/benefits/BenefitsList";

export default function Benefits() {
  return (
    <section className="py-12 lg:pt-[108px] lg:pb-0">
      <Container>
        <BenefitsList />
      </Container>
    </section>
  );
}

