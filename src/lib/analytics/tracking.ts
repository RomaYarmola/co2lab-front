/**
 * Контекст візиту для заявок у Telegram: звідки прийшов відвідувач
 * (Google, ChatGPT, Instagram, реклама), UTM-мітки, перша сторінка,
 * маршрут по сайту і час на сайті.
 *
 * Живе в sessionStorage — одна вкладка, одна сесія. Менеджеру це дає
 * відповідь на питання «звідки цей лід» без заглядання в аналітику,
 * а нам — звірку з GA4.
 */

const KEY = "co2lab_session";
const MAX_PAGES = 50;

type Utm = Record<string, string>;

type Session = {
  start: number;
  referrer: string;
  source: string;
  utm: Utm;
  landing: string;
  pages: Array<{ p: string; t: number }>;
};

function read(): Session | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function write(session: Session): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    // Приватний режим або заблоковане сховище — не критично, просто без контексту.
  }
}

/** Домен реферера → людяна назва джерела. */
const SOURCES: Array<[string, string]> = [
  ["chatgpt.com", "ChatGPT"],
  ["chat.openai.com", "ChatGPT"],
  ["openai.com", "ChatGPT"],
  ["perplexity.ai", "Perplexity"],
  ["claude.ai", "Claude"],
  ["gemini.google", "Gemini"],
  ["copilot.microsoft", "Copilot"],
  ["linkedin.com", "LinkedIn"],
  ["instagram.com", "Instagram"],
  ["facebook.com", "Facebook"],
  ["youtube.com", "YouTube"],
  ["t.me", "Telegram"],
  ["google.", "Google (пошук)"],
  ["bing.com", "Bing"],
  ["duckduckgo.com", "DuckDuckGo"],
  ["prom.ua", "Prom.ua"],
  ["flagma", "Flagma"],
];

function detectSource(referrer: string, utm: Utm): string {
  if (utm.utm_source) {
    return utm.utm_source + (utm.utm_medium ? ` / ${utm.utm_medium}` : "");
  }
  // Реклама часто приходить без реферера, лише з click id — без цієї гілки
  // платний трафік виглядав би як прямий захід.
  if (utm.gclid || utm.gbraid || utm.wbraid || utm.gad_source) return "Google Ads";
  if (utm.fbclid) return "Facebook / Instagram (реклама)";
  if (!referrer) return "Прямий захід / закладка";

  let host = "";
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return referrer;
  }
  if (host.endsWith("co2lab.pro")) return "Внутрішній перехід";

  for (const [needle, label] of SOURCES) {
    if (host.includes(needle)) return label;
  }
  return host;
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "gad_source",
  "fbclid",
];

/** Викликається на кожній зміні маршруту. */
export function recordVisit(pathname: string): void {
  if (typeof window === "undefined") return;
  const now = Date.now();
  let session = read();

  if (!session) {
    const params = new URLSearchParams(window.location.search);
    const utm: Utm = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) utm[key] = value;
    }

    session = {
      start: now,
      referrer: document.referrer || "",
      source: detectSource(document.referrer || "", utm),
      utm,
      landing: pathname,
      pages: [],
    };
  }

  const last = session.pages[session.pages.length - 1];
  if (!last || last.p !== pathname) {
    session.pages.push({ p: pathname, t: now });
    if (session.pages.length > MAX_PAGES) {
      session.pages = session.pages.slice(-MAX_PAGES);
    }
  }
  write(session);
}

/** Блок для повідомлення менеджеру. Порожній рядок, якщо сесії ще немає. */
export function getClientContext(): string {
  if (typeof window === "undefined") return "";
  const session = read();
  if (!session) return "";

  const minutes = Math.max(1, Math.round((Date.now() - session.start) / 60000));
  const utm = Object.entries(session.utm ?? {})
    .map(([key, value]) => `${key}=${value}`)
    .join(", ");
  const path = (session.pages ?? [])
    .slice(-12)
    .map((item) => item.p)
    .join(" → ");

  const lines = [
    "— — — — —",
    `🔎 Джерело: ${session.source}`,
    session.referrer ? `↩️ Реферер: ${session.referrer}` : null,
    utm ? `🏷️ UTM: ${utm}` : null,
    `🚪 Перша сторінка: ${session.landing}`,
    `📄 Переглянуто сторінок: ${session.pages.length}`,
    path ? `🧭 Шлях: ${path}` : null,
    `📍 Зараз: ${window.location.pathname}`,
    `⏱️ На сайті: ~${minutes} хв`,
  ].filter(Boolean);

  return "\n" + lines.join("\n");
}
