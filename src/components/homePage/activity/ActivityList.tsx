import ActivityCard from "@/components/homePage/activity/ActivityCard";
import type { ActivityItem } from "@/components/homePage/activity/ActivityCard";

export type { ActivityItem };

type ActivityListProps = {
  items: ActivityItem[];
};

export default function ActivityList({ items }: ActivityListProps) {
  return (
    <ul className="flex flex-col gap-3 md:flex-row md:flex-wrap" role="list">
      {items.map((item, index) => (
        <li key={index} className="md:w-[calc(50%-6px)] lg:w-[calc(25%-9px)]">
          <ActivityCard item={item} />
        </li>
      ))}
    </ul>
  );
}
