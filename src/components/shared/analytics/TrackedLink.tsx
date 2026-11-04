import type { AnchorHTMLAttributes, ReactNode } from "react";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  /** Звідки клік: footer / contacts / header … */
  location: string;
  children: ReactNode;
};

/**
 * <a> для tel:/mailto:, що підписує місце кліку. Саму подію (phone_click /
 * email_click у dataLayer, contact_phone / contact_email у Clarity) шле
 * ContactClickTracker — один раз, хоч би де стояло посилання.
 */
export default function TrackedLink({
  href,
  location,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <a href={href} data-track-location={location} {...rest}>
      {children}
    </a>
  );
}
