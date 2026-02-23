import { ICELAB_LINK, SOCIAL_LINK_INSTAGRAM_ICELAB } from "@/constants/contact";
import LogoLink from "../logoLink/LogoLink";
import IceLabIcon from "../icons/IceLabIcon";
import InstagramIcon from "../icons/InstagramIcon";

export default function LogoBlock() {
  return (
    <div className="max-w-[217px]">
      <LogoLink variant="white" className="inline-block mb-10 lg:mb-12" />
      <div className="flex gap-4 items-center mb-6">
        <a
          href={ICELAB_LINK}
          target="_blank"
          rel="noopener"
          className="xl:hover:opacity-80 focus-visible:opacity-80 transition-opacity duration-300 ease-in-out outline-none"
          aria-label="icelab link"
        >
          <IceLabIcon className="w-8 lg:w10 h-auto" />
        </a>
        <a
          href={SOCIAL_LINK_INSTAGRAM_ICELAB}
          target="_blank"
          rel="noopener noreferrer"
          className="xl:hover:opacity-80 focus-visible:opacity-80 transition-opacity duration-300 ease-in-out outline-none"
          aria-label="instagram link"
        >
          <InstagramIcon className="w-8 lg:w10 h-auto" />
        </a>
      </div>
      <p className="text-[12px] font-light leading-[120%]">
        Dry ice production and supply
      </p>
    </div>
  );
}
