import Container from "@/components/shared/container/Container";
import PageTitle from "../shared/titles/PageTitle";
import { CONTACT_EMAIL } from "@/constants/contact";

const sections = [
  {
    title: "ACCEPTANCE OF TERMS",
    content: (
      <p>
        By accessing and using this website, you agree to comply with these
        Terms of Use. If you do not agree, please do not use the website.
      </p>
    ),
  },
  {
    title: "USE OF WEBSITE",
    content: (
      <p>
        This website is provided for informational purposes only. Content may
        be changed or updated without prior notice.
      </p>
    ),
  },
  {
    title: "INTELLECTUAL PROPERTY",
    content: (
      <p>
        All content on this website, including text, images, graphics, and
        logos, is the property of CO₂ Lab or its licensors and is protected by
        applicable intellectual property laws.
      </p>
    ),
  },
  {
    title: "DISCLAIMER",
    content: (
      <p>
        Information on this website is provided &quot;as is&quot; without
        warranties of any kind. CO₂ Lab does not guarantee the accuracy or
        completeness of the content.
      </p>
    ),
  },
  {
    title: "LIMITATION OF LIABILITY",
    content: (
      <p>
        CO₂ Lab shall not be liable for any direct or indirect damages arising
        from the use or inability to use this website.
      </p>
    ),
  },
  {
    title: "EXTERNAL LINKS",
    content: (
      <p>
        This website may contain links to third-party websites. CO₂ Lab is not
        responsible for the content or practices of external sites.
      </p>
    ),
  },
  {
    title: "GOVERNING LAW",
    content: (
      <p>
        These Terms of Use are governed by and construed in accordance with
        applicable laws.
      </p>
    ),
  },
  {
    title: "CONTACT INFORMATION",
    content: (
      <>
        <p className="mb-3 lg:mb-4">
          For questions regarding these Terms of Use, please contact us at:
        </p>
        <p>
          Email:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline hover:no-underline focus:outline-none focus:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </>
    ),
  },
];

export default function TermsOfUse() {
  return (
    <section className="pt-30 pb-24 lg:pt-[221px] lg:pb-[130px]">
      <Container className="flex flex-col gap-8 lg:gap-12">
        <PageTitle className="xl:text-[48px]">Terms of Use</PageTitle>

        <div className="flex flex-col gap-6">
          {sections.map((section, index) => (
            <article key={section.title}>
              <h2 className="mb-3 lg:mb-4 text-[20px] lg:text-[24px] font-semibold uppercase leading-[120%]">
                {index + 1}. {section.title}
              </h2>
              <div>{section.content}</div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
