"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";

/** slug будь-якою мовою → усі slug-и того самого документа. */
export type SlugAliases = Record<string, Partial<Record<Locale, string>>>;

const SlugAliasContext = createContext<SlugAliases>({});

/**
 * Мапа slug-ів для перемикача мов. Значення приходить із серверного
 * лейауту, тому правильні посилання є вже в SSR-розмітці — контекст, який
 * заповнювався б з ефекту, для пошукових систем не існував би.
 */
export function SlugAliasProvider({
  value,
  children,
}: {
  value: SlugAliases;
  children: ReactNode;
}) {
  return (
    <SlugAliasContext.Provider value={value}>{children}</SlugAliasContext.Provider>
  );
}

export function useSlugAliases(): SlugAliases {
  return useContext(SlugAliasContext);
}
