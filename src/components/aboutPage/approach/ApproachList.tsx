const items = [
  {
    title: "ENGINEERING FIRST",
    description:
      "We build solutions based on technical expertise, process understanding, and real-world performance requirements.",
    theme: "dark" as const,
  },
  {
    title: "END-TO-END RESPONSIBILITY",
    description:
      "We take full ownership of projects - from design and implementation to delivery and support.",
    theme: "light" as const,
  },
  {
    title: "QUALITY & COMPLIANCE",
    description:
      "All systems and processes are designed to meet industry standards and regulatory requirements.",
    theme: "light" as const,
  },
  {
    title: "SCALABLE SOLUTIONS",
    description:
      "Our technologies are adaptable and scalable to match different capacities and operational needs.",
    theme: "dark" as const,
  },
];

export default function ApproachList() {
  return (
    <ul className="flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-x-5 md:gap-y-6">
      {items.map((item) => (
        <li key={item.title} className="md:w-[calc(50%-10px)] md:h-auto">
          <article
            className={`rounded-[20px] px-8 py-6 h-full ${
              item.theme === "dark"
                ? "bg-black text-white"
                : "bg-white text-black border border-black"
            }`}
          >
            <h3 className="mb-4 lg:mb-6 text-[20px] lg:text-[24px] font-semibold leading-[120%] uppercase">
              {item.title}
            </h3>
            <p
              className={`text-[12px] lg:text-[14px] font-light leading-[120%] ${
                item.theme === "dark" ? "text-white/80" : "text-neutral-500"
              }`}
            >
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
