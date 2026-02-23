import Container from "@/components/shared/container/Container";
import Image from "next/image";
import ContactFormWithNotifications from "./ContactFormWithNotifications";

export default function SendMessage() {
  return (
    <section className="pt-12 pb-24 lg:pt-[136px] lg:pb-30">
      <Container className="flex flex-col sm:flex-row gap-12 sm:gap-5">
        <div className="relative sm:w-[calc(50%-10px)] h-45 sm:h-auto rounded-[18px] overflow-hidden">
          <Image
            src="/images/contactsPage/sendMessage/image.webp"
            alt="background image"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full sm:w-[calc(50%-10px)]">
          {" "}
          <ContactFormWithNotifications />
        </div>
      </Container>
    </section>
  );
}
