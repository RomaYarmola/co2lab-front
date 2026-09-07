/**
 * Відправка заявки з сайту: Telegram — основний канал.
 *
 * Текст повідомлення збирається тут, щоб усі форми виглядали в чаті однаково
 * і жодна не «загубила» контекст: з якої сторінки, за яким товаром, звідки
 * прийшов відвідувач.
 */
import { getClientContext } from "@/lib/analytics/tracking";

export type LeadType = "contact" | "quote" | "consultation";

export type LeadPayload = {
  /** Тип форми — визначає заголовок повідомлення й параметр аналітики. */
  type: LeadType;
  name: string;
  phone: string;
  company?: string;
  email?: string;
  message?: string;
  /** Товар або сторінка, з якої відкрили форму. */
  context?: string;
  /** Модель і артикул — щоб менеджер не шукав позицію вручну. */
  product?: { title: string; model?: string; sku?: string };
  locale?: string;
};

const TITLES: Record<LeadType, string> = {
  contact: "✉️ Заявка з сайту",
  quote: "💰 Запит ціни на товар",
  consultation: "💬 Запит на консультацію",
};

/** Телефон у вигляді +380…, який Telegram робить тапабельним. */
function phoneLink(value: string): string {
  const digits = String(value).replace(/\D/g, "");
  return digits ? `+${digits}` : "—";
}

function buildMessage(lead: LeadPayload): string {
  const product = lead.product;
  // Блок про товар/сторінку додається лише коли є що показати — інакше
  // в чаті лишалися б порожні рядки замість заголовка.
  const subject = [
    product ? `📦 Товар: ${product.title}` : null,
    product?.model ? `🔧 Модель: ${product.model}` : null,
    product?.sku ? `🏷️ Артикул: ${product.sku}` : null,
    !product && lead.context ? `📄 Сторінка: ${lead.context}` : null,
  ].filter(Boolean);

  const lines = [
    TITLES[lead.type],
    "",
    ...(subject.length ? [...subject, ""] : []),
    `👤 Імʼя: ${lead.name || "—"}`,
    `🏢 Компанія: ${lead.company || "—"}`,
    `📞 Телефон: ${phoneLink(lead.phone)}`,
    `📧 Email: ${lead.email || "—"}`,
    lead.message ? `💬 Повідомлення: ${lead.message}` : null,
    lead.locale ? `🌐 Мова сайту: ${lead.locale.toUpperCase()}` : null,
  ].filter((line) => line !== null);

  return lines.join("\n");
}

export type SendLeadResult = { success: boolean; error?: string };

export async function sendLead(lead: LeadPayload): Promise<SendLeadResult> {
  const message = `${buildMessage(lead)}${getClientContext()}`;

  try {
    const response = await fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, lead }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      return { success: false, error: data?.error ?? `HTTP ${response.status}` };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "network error",
    };
  }
}
