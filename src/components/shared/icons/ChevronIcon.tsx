type ChevronIconProps = {
  open?: boolean;
  className?: string;
};

export default function ChevronIcon({
  open = false,
  className = "",
}: ChevronIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ease-in-out ${open ? "" : "rotate-180"} ${className}`.trim()}
      aria-hidden
    >
      <path
        d="M2.72003 10.0333L7.0667 5.68666C7.58003 5.17333 8.42003 5.17333 8.93336 5.68666L13.28 10.0333"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
