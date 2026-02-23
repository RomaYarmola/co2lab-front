type ArrowIconProps = {
  className?: string;
};

export default function ArrowIcon({ className = "" }: ArrowIconProps) {
  return (
    <svg
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`.trim()}
      aria-hidden
    >
      <path
        d="M16.8197 1.46483C16.8657 1.11863 16.6223 0.800713 16.2761 0.754741L10.6345 0.00558375C10.2883 -0.0403889 9.97034 0.202994 9.92437 0.549194C9.8784 0.895394 10.1218 1.21331 10.468 1.25928L15.4828 1.9252L14.8169 6.94001C14.7709 7.28621 15.0143 7.60412 15.3605 7.6501C15.7067 7.69607 16.0246 7.45268 16.0706 7.10649L16.8197 1.46483ZM0.384277 13.4839L0.768668 13.986L16.5773 1.8837L16.1929 1.38159L15.8085 0.879482L-0.000113444 12.9818L0.384277 13.4839Z"
        fill="currentColor"
      />
    </svg>
  );
}
