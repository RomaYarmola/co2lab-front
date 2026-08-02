import type { ReactNode } from "react";

/**
 * Кореневий layout навмисно порожній: <html>/<body> живуть у app/[locale]/layout.tsx,
 * бо lang-атрибут залежить від локалі маршруту.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
