import PrivacyPolicy from "@/components/privacyPolicyPage/PrivacyPolicy";
import { createPageMetadata } from "@/utils/createMetadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy and personal data processing at CO₂ Lab.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
