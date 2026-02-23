import ArrowIcon from "../icons/ArrowIcon";
import { twMerge } from "tailwind-merge";

interface MainButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
  variant?: "black" | "white";
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  loadingText?: string;
}

export default function MainButton({
  type = "button",
  children,
  className,
  variant = "black",
  disabled = false,
  isLoading = false,
  loadingText = "Надсилання...",
  onClick,
}: MainButtonProps) {
  const isBlack = variant === "black";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        "group flex w-full h-11 lg:h-[54px] p-[5px] items-stretch overflow-hidden rounded-full enabled:cursor-pointer disabled:opacity-60 enabled:active:scale-[98%] will-change-transform transition duration-300 ease-in-out enabled:focus-visible:brightness-125 xl:enabled:hover:brightness-125",
        isBlack ? "bg-black text-white" : "bg-white text-black",
        className,
      )}
    >
      <span
        className={twMerge(
          "flex flex-1 items-center rounded-l-full pl-6 pr-2 text-[12px] lg:text-[14px] font-normal leading-[120%]",
          isBlack ? "bg-black text-white" : "bg-white text-black",
        )}
      >
        {isLoading ? loadingText : children}
      </span>
      <div
        className={twMerge(
          "flex w-auto h-full aspect-square shrink-0 items-center justify-center rounded-full",
          isBlack ? "bg-white text-black" : "bg-black text-white",
        )}
      >
        <ArrowIcon className="h-[14px] w-[17px] transition-transform duration-300 ease-in-out group-focus-visible:translate-x-[2px] group-focus-visible:-translate-y-[2px] xl:group-hover:translate-x-[2px] xl:group-hover:-translate-y-[2px]" />
      </div>
    </button>
  );
}
