import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import { CONTACT_EMAIL_REQUEST } from "@/constants/contact";
import type { Locale } from "@/i18n/config";
import { getTranslator } from "@/i18n/server";

type LegalBlock = {
  type: "p" | "ul" | "email";
  text?: string;
  items?: string[];
};

type LegalSection = {
  title: string;
  blocks: LegalBlock[];
};

/**
 * Спільний рендерер для Privacy Policy і Terms of Use.
 * Контент повністю приходить зі словника (`legal.privacy` / `legal.terms`),
 * тож юридичні тексти перекладаються без правок у верстці.
 */
export default function LegalPage({
  locale,
  namespace,
}: {
  locale: Locale;
  namespace: "privacy" | "terms";
}) {
  const t = getTranslator(locale, `legal.${namespace}`);
  const sections = t.list<LegalSection>("sections");

  return (
    <section className="pt-30 pb-24 lg:pt-[221px] lg:pb-[130px]">
      <Container className="flex flex-col gap-8 lg:gap-12">
        <PageTitle className="xl:text-[48px]">{t("title")}</PageTitle>

        <div className="flex flex-col gap-6">
          {sections.map((section, index) => (
            <article key={section.title}>
              <h2 className="mb-3 lg:mb-4 text-[20px] lg:text-[24px] font-semibold uppercase leading-[120%]">
                {index + 1}. {section.title}
              </h2>
              <div>
                {section.blocks.map((block, blockIndex) => {
                  if (block.type === "ul") {
                    return (
                      <ul
                        key={blockIndex}
                        className="list-none space-y-2 pl-2 [&_li]:relative [&_li]:pl-4 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-1/2 [&_li]:before:-translate-y-1/2 [&_li]:before:w-[3px] [&_li]:before:h-[3px] [&_li]:before:rounded-full [&_li]:before:bg-black"
                      >
                        {(block.items ?? []).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    );
                  }

                  if (block.type === "email") {
                    return (
                      <p key={blockIndex}>
                        {block.text}{" "}
                        <a
                          href={`mailto:${CONTACT_EMAIL_REQUEST}`}
                          className="underline underline-offset-4 transition-opacity duration-300 xl:hover:opacity-70"
                        >
                          {CONTACT_EMAIL_REQUEST}
                        </a>
                      </p>
                    );
                  }

                  return (
                    <p key={blockIndex} className="mb-3 last:mb-0 lg:mb-4">
                      {block.text}
                    </p>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
