import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Love",
  description: "Ассистент для поиска новых знакомств",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <Script src="https://telegram.org/js/telegram-web-app.js" />
      <body>{children}</body>
    </html>
  );
}
