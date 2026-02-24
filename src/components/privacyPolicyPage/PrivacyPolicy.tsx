import Container from "@/components/shared/container/Container";
import PageTitle from "../shared/titles/PageTitle";
import { CONTACT_EMAIL_REQUEST } from "@/constants/contact";

const sections = [
  {
    title: "INTRODUCTION",
    content: (
      <p>
        CO2Lab (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your
        privacy and is committed to protecting personal data. This Privacy
        Policy explains how we collect, use, and safeguard information when you
        visit our website.
      </p>
    ),
  },
  {
    title: "INFORMATION WE COLLECT",
    content: (
      <>
        <p className="mb-3 lg:mb-4">
          We may collect and process the following information:
        </p>
        <ul className="list-none space-y-2 pl-2 [&_li]:relative [&_li]:pl-4 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-1/2 [&_li]:before:-translate-y-1/2 [&_li]:before:w-[3px] [&_li]:before:h-[3px] [&_li]:before:rounded-full [&_li]:before:bg-black">
          <li>
            Contact information (such as name, email address, company name)
          </li>
          <li>Information provided through contact forms.</li>
          <li>Technical data (IP address, browser type, device information)</li>
          <li>Usage data related to website interaction.</li>
        </ul>
      </>
    ),
  },
  {
    title: "HOW WE USE YOUR INFORMATION",
    content: (
      <>
        <p className="mb-3 lg:mb-4">We use collected information to:</p>
        <ul className="list-none space-y-2 pl-2 [&_li]:relative [&_li]:pl-4 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-1/2 [&_li]:before:-translate-y-1/2 [&_li]:before:w-[3px] [&_li]:before:h-[3px] [&_li]:before:rounded-full [&_li]:before:bg-black">
          <li>Respond to inquiries and requests.</li>
          <li>Provide information about our products and services.</li>
          <li>Improve website functionality and user experience.</li>
          <li>Ensure security and prevent misuse.</li>
        </ul>
      </>
    ),
  },
  {
    title: "DATA SHARING",
    content: (
      <p>
        We do not sell, rent, or trade personal data. Information may be shared
        only when required by law or to protect our legal rights.
      </p>
    ),
  },
  {
    title: "DATA SECURITY",
    content: (
      <p>
        We implement appropriate technical and organizational measures to
        protect personal data against unauthorized access, alteration, or
        disclosure.
      </p>
    ),
  },
  {
    title: "COOKIES",
    content: (
      <p>
        Our website may use cookies to enhance user experience and analyze
        website performance. You may control cookie preferences through your
        browser settings.
      </p>
    ),
  },
  {
    title: "YOUR RIGHTS",
    content: (
      <p>
        You have the right to request access to, correction, or deletion of your
        personal data in accordance with applicable data protection laws.
      </p>
    ),
  },
  {
    title: "CONTACT INFORMATION",
    content: (
      <>
        <p className="mb-3 lg:mb-4">
          If you have questions regarding this Privacy Policy, please contact us
          at:
        </p>
        <p>
          Email:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL_REQUEST}`}
            className="underline hover:no-underline focus:outline-none focus:underline"
          >
            {CONTACT_EMAIL_REQUEST}
          </a>
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <section className="pt-30 pb-24 lg:pt-[221px] lg:pb-[130px]">
      <Container className="flex flex-col gap-8 lg:gap-12">
        <PageTitle className="xl:text-[48px]">Privacy Policy</PageTitle>

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
