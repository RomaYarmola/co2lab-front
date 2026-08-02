"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Messages } from "./messages/en";
import { createTranslator, type Translator } from "./translate";

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale, messages }), [locale, messages]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useTranslations must be used inside <I18nProvider>");
  }
  return ctx;
}

/** Перекладач для клієнтських компонентів. */
export function useTranslations(namespace?: string): Translator {
  const { messages } = useI18n();
  return useMemo(
    () => createTranslator(messages, namespace),
    [messages, namespace],
  );
}

export function useLocale(): Locale {
  return useI18n().locale;
}
