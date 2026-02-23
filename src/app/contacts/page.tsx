import Hero from "@/components/contactsPage/hero/Hero";
import SendMessage from "@/components/contactsPage/sendMessage/SendMessage";
import { createPageMetadata } from "@/utils/createMetadata";

export const metadata = createPageMetadata({
  title: "Contacts",
  description:
    "Get in touch with CO₂ Lab to discuss your project, supply needs, or technical requirements.",
  path: "/contacts",
});

export default function Contacts() {
  return (
    <>
      <Hero />
      <SendMessage />
    </>
  );
}
