/**
 * Єдина точка відправки подій у GTM dataLayer.
 *
 * Події (див. SEO-ROADMAP.md, розділ 5):
 *  - form_submit / form_error  { form_name }
 *  - request_quote_click       { product }
 *  - phone_click / email_click { location }
 *
 * Якщо GTM не підключено — події просто накопичуються в масиві, нічого не ламається.
 */

export type AnalyticsEvent =
  | { event: "form_submit"; form_name: string }
  | { event: "form_error"; form_name: string }
  | { event: "request_quote_click"; product: string }
  | { event: "phone_click"; location: string }
  | { event: "email_click"; location: string };

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(payload: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    ...payload,
    page_path: window.location.pathname,
  });
}
