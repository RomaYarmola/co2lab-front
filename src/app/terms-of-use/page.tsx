import TermsOfUse from "@/components/termsOfUsePage/TermsOfUse";
import { createPageMetadata } from "@/utils/createMetadata";

export const metadata = createPageMetadata({
  title: "Terms of Use",
  description:
    "Terms of use and legal conditions for using the CO₂ Lab website and services.",
  path: "/terms-of-use",
});

export default function TermsOfUsePage() {
  return (
    <>
      <TermsOfUse />
    </>
  );
}
