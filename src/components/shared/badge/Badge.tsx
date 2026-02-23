import { twMerge } from "tailwind-merge";

const lightBorderStyle = {
  background:
    "linear-gradient(91.17deg, rgba(148, 148, 148, 0.2) -0.34%, #C7C7C7 100.72%)",
  padding: "1px",
  WebkitMask:
    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor" as const,
  maskComposite: "exclude" as const,
};

const darkBorderStyle = {
  background:
    "linear-gradient(91.17deg, rgba(255, 255, 255, 0.15) -0.34%, rgba(148, 148, 148, 0.4) 100.72%)",
  padding: "1px",
  WebkitMask:
    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor" as const,
  maskComposite: "exclude" as const,
};

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
};

export default function Badge({
  children,
  className,
  variant = "light",
}: BadgeProps) {
  const isDark = variant === "dark";

  return (
    <span
      role="listitem"
      className={twMerge(
        "relative inline-flex items-center justify-center rounded-full px-5 py-3.5 text-[12px] lg:text-[14px] font-normal leading-[120%]",
        isDark ? "uppercase" : "",
        isDark
          ? "text-white bg-[linear-gradient(90deg,rgba(60,60,60,0.9)_0%,rgba(45,45,45,0.95)_100%)] shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]"
          : "text-black/80 bg-[linear-gradient(90deg,rgba(106,106,106,0.08)_0%,rgba(208,208,208,0.0064)_100%)] shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]",
        className,
      )}
    >
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={isDark ? darkBorderStyle : lightBorderStyle}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
