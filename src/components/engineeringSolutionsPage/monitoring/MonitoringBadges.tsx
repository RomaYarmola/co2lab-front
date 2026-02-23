import Badge from "@/components/shared/badge/Badge";

const topBadge = "FSSC 22000";
const rowBadges = ["ISBT", "EIGA", "FDA"] as const;

export default function MonitoringBadges() {
  return (
    <div
      className="flex flex-col sm:flex-row gap-2"
      role="list"
      aria-label="Standards and certifications"
    >
      <Badge variant="dark" className="w-fit">
        {topBadge}
      </Badge>
      <div className="flex flex-wrap gap-2">
        {rowBadges.map((label) => (
          <Badge key={label} variant="dark">
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
