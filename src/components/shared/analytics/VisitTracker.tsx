"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordVisit } from "@/lib/analytics/tracking";

/**
 * Записує маршрут відвідувача в сесію — джерело переходу, UTM і шлях по сайту
 * потім додаються до заявки в Telegram. Нічого не рендерить.
 */
export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    recordVisit(pathname);
  }, [pathname]);

  return null;
}
