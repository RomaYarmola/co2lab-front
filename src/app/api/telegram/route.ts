import { NextResponse, type NextRequest } from "next/server";

/**
 * Заявка з сайту → Telegram.
 *
 * Повідомлення надсилається без parse_mode: Telegram сам робить телефони й
 * посилання клікабельними, а будь-який `<` у тексті користувача не ламає
 * розмітку і не повертає 400, як це було з parse_mode: html.
 */

export const runtime = "nodejs";

// Історично на Vercel заведено TELEGRAM_BOT_ID; TELEGRAM_BOT_TOKEN — коректніша
// назва для того самого значення. Підтримуємо обидві, щоб не ламати прод.
const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_ID || "";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

const MAX_MESSAGE_LENGTH = 3500;
const TELEGRAM_TIMEOUT_MS = 8000;

export async function POST(request: NextRequest) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("[telegram] не задано TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID");
    return NextResponse.json(
      { error: "Notifications are not configured" },
      { status: 500 },
    );
  }

  let message: string;
  try {
    const body: unknown = await request.json();
    // Старий формат — просто рядок; новий — { message, lead }.
    const raw =
      typeof body === "string"
        ? body
        : ((body as { message?: unknown })?.message ?? "");
    message = typeof raw === "string" ? raw.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const text = message.slice(0, MAX_MESSAGE_LENGTH);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          disable_web_page_preview: true,
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        description?: string;
      } | null;
      // Опис від Telegram у логи, назовні — нейтральна помилка.
      console.error("[telegram] відмова:", response.status, data?.description);
      return NextResponse.json(
        { error: "Failed to deliver the message" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    console.error("[telegram] помилка:", aborted ? "timeout" : error);
    return NextResponse.json(
      { error: aborted ? "Telegram timeout" : "Failed to deliver the message" },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
