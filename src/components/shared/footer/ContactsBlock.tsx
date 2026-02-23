import { contacts } from "@/constants/contact";

const contactItems: Array<{
  label: string;
  value: string;
  href?: string;
}> = [
  {
    label: "Phone",
    value: contacts.phone,
    href: `tel:${contacts.phone.replace(/\s|\(|\)/g, "")}`,
  },
  { label: "Email", value: contacts.email, href: `mailto:${contacts.email}` },
  {
    label: "Address",
    value: contacts.address,
    href: contacts.addressLink,
  },
];

export default function ContactsBlock() {
  return (
    <div className="md:w-1/2 lg:w-auto">
      {contactItems.map(({ label, value, href }) => (
        <div key={label} className="mb-4.5 last:mb-0">
          <p className="text-[12px] font-light leading-[120%] mb-3.5">
            {label}
          </p>
          {href !== undefined ? (
            <a
              href={href || "#"}
              className="text-[14px] font-medium leading-[120%] xl:hover:opacity-80 transition-opacity duration-300 ease-in-out block"
            >
              {value}
            </a>
          ) : (
            <p className="text-[14px] font-medium leading-[120%]">{value}</p>
          )}
        </div>
      ))}
    </div>
  );
}
