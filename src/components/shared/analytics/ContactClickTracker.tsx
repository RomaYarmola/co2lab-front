"use client";

import { useEffect } from "react";
import { contactChannel, trackContact } from "@/lib/analytics/track";

/**
 * Кліки по контактах (телефон, пошта, Instagram, месенджери) одним слухачем
 * на документі — і в шапці, і у футері, і в тексті статей із CMS, куди
 * TrackedLink не потрапляє. Місце кліку береться з data-track-location
 * (його ставить TrackedLink), інакше — з найближчого header / footer.
 */
export default function ContactClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]");
      if (!link) return;
      const channel = contactChannel(link.getAttribute("href") ?? "");
      if (!channel) return;
      const location =
        link.closest("[data-track-location]")?.getAttribute("data-track-location") ??
        (link.closest("header") ? "header" : link.closest("footer") ? "footer" : "content");
      trackContact(channel, location);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
