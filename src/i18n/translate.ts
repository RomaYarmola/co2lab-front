import type { Messages } from "./messages/en";

export type TranslationValues = Record<string, string | number>;

/**
 * Дістає значення за крапковим шляхом. Повертає `undefined`, якщо шляху немає —
 * рішення, що робити з пропуском, приймає викликач.
 */
function resolvePath(messages: Messages, path: string): unknown {
  const segments = path.split(".");
  let current: unknown = messages;

  for (const segment of segments) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[segment];
  }

  return current;
}

/**
 * Рядок за крапковим шляхом: `t("catalog.noResults")`.
 * Якщо ключа немає — повертає сам шлях, щоб пропуск було видно у верстці,
 * а не отримати порожнє місце.
 */
export function resolveMessage(messages: Messages, path: string): string {
  const value = resolvePath(messages, path);
  return typeof value === "string" ? value : path;
}

/** Підстановка плейсхолдерів виду `{count}`. */
export function interpolate(
  template: string,
  values?: TranslationValues,
): string {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = values[key];
    return value === undefined ? match : String(value);
  });
}

export type Translator = {
  (path: string, values?: TranslationValues): string;
  /**
   * Масив зі словника — для списків карток, бейджів, пунктів меню.
   * Порожній масив, якщо ключа немає: секція просто не відрендериться.
   */
  list: <T>(path: string) => T[];
};

export function createTranslator(
  messages: Messages,
  namespace?: string,
): Translator {
  const withNamespace = (path: string) =>
    namespace ? `${namespace}.${path}` : path;

  const translator = ((path: string, values?: TranslationValues) =>
    interpolate(
      resolveMessage(messages, withNamespace(path)),
      values,
    )) as Translator;

  translator.list = <T,>(path: string): T[] => {
    const value = resolvePath(messages, withNamespace(path));
    return Array.isArray(value) ? (value as T[]) : [];
  };

  return translator;
}
