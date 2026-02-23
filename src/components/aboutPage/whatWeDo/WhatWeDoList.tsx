import type { WhatWeDoItem } from "./WhatWeDoCard";
import WhatWeDoCard from "./WhatWeDoCard";

type WhatWeDoListProps = {
  items: WhatWeDoItem[];
};

export default function WhatWeDoList({ items }: WhatWeDoListProps) {
  return (
    <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap" role="list">
      {items.map((item, index) => (
        <li key={index} className="sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)]">
          <WhatWeDoCard item={item} />
        </li>
      ))}
    </ul>
  );
}
