import Link from "next/link";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "Supply", href: "/supply" },
  { label: "Engineering Solutions", href: "/solutions/engineering-solutions" },
  { label: "Equipment & Systems", href: "/solutions/equipment-and-systems" },
  { label: "Industries we serve", href: "/solutions/industries-we-serve" },
] as const;

export default function CompanyBlock() {
  return (
    <nav className="md:w-1/2 lg:w-auto">
      <p className="text-[12px] font-light leading-[120%] mb-5">Company</p>
      <ul className="flex flex-col gap-4">
        {companyLinks.map(({ label, href }) => (
          <li key={href + label}>
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
