import Link from "next/link";

const supportLinks = [
  { label: "Contacts", href: "/contacts" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
] as const;

export default function SupportBlock() {
  return (
    <nav>
      <p className="text-[12px] font-light leading-[120%] mb-5">Support</p>
      <ul className="flex flex-col gap-4">
        {supportLinks.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-[14px] font-medium leading-[120%] uppercase hover:opacity-80 transition-opacity duration-300 ease-in-out"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
