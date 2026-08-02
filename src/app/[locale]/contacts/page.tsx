import type { Metadata } from "next";
import { buildStaticPageMetadata, resolveLocale } from "@/utils/pageMetadata";
import { ROUTES } from "@/constants/routes";
import Hero from "@/components/contactsPage/hero/Hero";
import SendMessage from "@/components/contactsPage/sendMessage/SendMessage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildStaticPageMetadata(params, "contacts", ROUTES.contacts);
}

export default async function Contacts({ params }: Props) {
  const locale = await resolveLocale(params);

  return (
    <>
      <Hero locale={locale} />
      <SendMessage locale={locale} />
    </>
  );
}
