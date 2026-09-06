"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/track";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  /** Звідки клік: footer / contacts / header … */
  location: string;
  children: ReactNode;
};

/**
 * <a> для tel:/mailto:, який відправляє phone_click / email_click у dataLayer.
 * Для інших href поводиться як звичайне посилання.
 */
export default function TrackedLink({
  href,
  location,
  children,
  onClick,
  ...rest
}: TrackedLinkProps) {
  return (
    <a
      href={href}
      onClick={(event) => {
        if (href.startsWith("tel:"))
          trackEvent({ event: "phone_click", location });
        else if (href.startsWith("mailto:"))
          trackEvent({ event: "email_click", location });
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
