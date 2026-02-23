import { twMerge } from "tailwind-merge";
import Badge from "@/components/shared/badge/Badge";

const badgeLabels = [
  "Advanced technology",
  "Operational reliability",
  "Sustainable solutions",
] as const;

type BadgesProps = {
  className?: string;
};

export default function Badges({ className }: BadgesProps) {
  return (
    <div
      className={twMerge("flex flex-wrap gap-2", className)}
      role="list"
      aria-label="Features"
    >
      {badgeLabels.map((label) => (
        <Badge key={label}>{label}</Badge>
      ))}
    </div>
  );
}
