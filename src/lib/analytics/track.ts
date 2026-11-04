/**
 * Єдина точка відправки подій: GTM dataLayer + Microsoft Clarity.
 *
 * dataLayer (назви не міняти — на них підписані теги в GTM-контейнері):
 *  - form_submit / form_error  { form_name }
 *  - request_quote_click       { product }
 *  - phone_click / email_click { location }
 *  - contact_click             { channel, location } — Instagram, месенджери
 *
 * Clarity (з них у кабінеті зроблені Smart Events):
 *  - contact_phone, contact_email, contact_instagram, contact_telegram,
 *    contact_whatsapp, contact_viber — клік по каналу контакту;
 *  - form_submit і form_submit_<form_name> — лише після успішної відправки;
 *  - form_error, request_quote_click.
 * Тег сесії в Clarity сегментувати не дає, а подію можна зробити smart event
 * чи кроком воронки — тому на кожен канал і кожну форму окрема подія.
 *
 * Персональні дані (ім'я, телефон, пошта) сюди не передаються ніколи.
 * Якщо GTM чи Clarity не підключено — події накопичуються в чергах, нічого
 * не ламається.
 */

export type ContactChannel =
  | "phone"
  | "email"
  | "instagram"
  | "telegram"
  | "whatsapp"
  | "viber";

export type AnalyticsEvent =
  | { event: "form_submit"; form_name: string }
  | { event: "form_error"; form_name: string }
  | { event: "request_quote_click"; product: string }
  | { event: "phone_click"; location: string }
  | { event: "email_click"; location: string }
  | { event: "contact_click"; channel: ContactChannel; location: string };

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    clarity?: ClarityFn;
  }
}

/**
 * Clarity вантажиться afterInteractive, тож подія може статися раніше за
 * скрипт. Ставимо ту саму чергу, що й офіційний сніпет
 * (c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}): сніпет її
 * збереже, а тег Clarity розбере після завантаження.
 */
function clarity(...args: unknown[]): void {
  try {
    if (!window.clarity) {
      const queue: ClarityFn = function (...queued: unknown[]) {
        (queue.q = queue.q ?? []).push(queued);
      };
      window.clarity = queue;
    }
    window.clarity(...args);
  } catch {}
}

/** Назва для Clarity: лише латиниця, цифри й «_». */
function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

const CONTACT_EVENT: Partial<Record<AnalyticsEvent["event"], ContactChannel>> = {
  phone_click: "phone",
  email_click: "email",
};

function sendToClarity(payload: AnalyticsEvent): void {
  switch (payload.event) {
    case "form_submit": {
      const form = slug(payload.form_name) || "unknown";
      clarity("event", "form_submit");
      clarity("event", `form_submit_${form}`);
      clarity("set", "lead_form", form);
      clarity("upgrade", "lead");
      return;
    }
    case "phone_click":
    case "email_click":
    case "contact_click": {
      const channel =
        payload.event === "contact_click"
          ? payload.channel
          : CONTACT_EVENT[payload.event]!;
      clarity("event", `contact_${channel}`);
      clarity("set", "contact_channel", channel);
      clarity("upgrade", "contact");
      return;
    }
    default:
      clarity("event", payload.event);
  }
}

export function trackEvent(payload: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    ...payload,
    page_path: window.location.pathname,
  });
  sendToClarity(payload);
}

/**
 * Канал контакту за href. Instagram IceLab у футері — чужий бренд, його
 * не рахуємо.
 */
export function contactChannel(href: string): ContactChannel | null {
  const h = href.trim().toLowerCase();
  if (h.startsWith("tel:")) return "phone";
  if (h.startsWith("mailto:")) return "email";
  if (h.startsWith("viber:") || h.includes("viber.com/")) return "viber";
  if (/(^|\/\/|\.)(t\.me|telegram\.me)\//.test(h) || h.startsWith("tg:"))
    return "telegram";
  if (/(^|\/\/|\.)(wa\.me|whatsapp\.com)\//.test(h) || h.startsWith("whatsapp:"))
    return "whatsapp";
  if (h.includes("instagram.com/") && !h.includes("icelab")) return "instagram";
  return null;
}

/** Клік по каналу контакту: телефон і пошта йдуть під старими назвами GTM. */
export function trackContact(channel: ContactChannel, location: string): void {
  if (channel === "phone") trackEvent({ event: "phone_click", location });
  else if (channel === "email") trackEvent({ event: "email_click", location });
  else trackEvent({ event: "contact_click", channel, location });
}
