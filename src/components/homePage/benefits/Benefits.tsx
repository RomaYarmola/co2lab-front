import Container from "@/components/shared/container/Container";
import BenefitsList from "@/components/homePage/benefits/BenefitsList";
import type { Locale } from "@/i18n/config";

export default function Benefits({ locale }: { locale: Locale }) {
  return (
    <section className="py-12 lg:pt-[108px] lg:pb-0">
      <Container>
        <BenefitsList locale={locale} />
      </Container>
    </section>
  );
}

