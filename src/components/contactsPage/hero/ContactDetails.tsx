import {
  CONTACT_EMAIL_REQUEST,
  CONTACT_PHONE,
  SOCIAL_LINK_INSTAGRAM_CO2LAB,
  SOCIAL_LINK_LINKEDIN,
  SOCIAL_LINK_YOUTUBE,
} from "@/constants/contact";
import InstagramIcon from "@/components/shared/icons/InstagramIcon";
import LinkedInIcon from "@/components/shared/icons/LinkedInIcon";
import YouTubeIcon from "@/components/shared/icons/YouTubeIcon";
import { twMerge } from "tailwind-merge";

const socialLinks = [
  {
    name: "Instagram",
    href: SOCIAL_LINK_INSTAGRAM_CO2LAB,
    Icon: InstagramIcon,
  },
  //   { name: "LinkedIn", href: SOCIAL_LINK_LINKEDIN, Icon: LinkedInIcon },
  //   { name: "YouTube", href: SOCIAL_LINK_YOUTUBE, Icon: YouTubeIcon },
];

type ContactDetailsProps = {
  className?: string;
};

export default function ContactDetails({
  className = "",
}: ContactDetailsProps) {
  return (
    <div className={twMerge(className)}>
      <h2 className="mb-6 text-[20px] lg:text-[24px] font-semibold uppercase leading-[120%]">
        Contact Details:
      </h2>
      <div className="mb-8 lg:mb-12 flex flex-col gap-3 text-[14px] lg:text-[16px] font-light leading-[120%]">
        <p className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
          <span className="lg:w-40 font-medium"> Email: </span>
          <a
            href={`mailto:${CONTACT_EMAIL_REQUEST}`}
            className="xl:hover:opacity-60 focus-visible:opacity-60 transition duration-300 ease-in-out"
          >
            {CONTACT_EMAIL_REQUEST}
          </a>
        </p>
        <p className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
          <span className="lg:w-40 font-medium"> Phone: </span>
          <a
            href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
            className="xl:hover:opacity-60 focus-visible:opacity-60 transition duration-300 ease-in-out"
          >
            {CONTACT_PHONE}
          </a>
        </p>
      </div>
      <div className="flex flex-wrap gap-2 lg:gap-4">
        {socialLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-15 lg:gap-6 rounded-full pl-5 pr-[4px] lg:pl-6 lg:pr-[5px] py-1 lg:py-[5px] bg-black text-white transition xl:hover:brightness-125 focus-visible:brightness-125 outline-none duration-300 ease-in-out"
            aria-label={item.name}
          >
            <span className="text-[10px] lg:text-[14px] font-normal leading-[120%]">
              {item.name}
            </span>
            <span
              className={`flex h-8 w-8 lg:w-[43px] lg:h-[43px] shrink-0 items-center justify-center rounded-full ${item.name === "YouTube" ? "bg-black text-white" : "bg-white text-black"}`}
            >
              <item.Icon className="w-6 h-auto" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
