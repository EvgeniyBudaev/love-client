import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Layout } from "@/app/shared/components/layout";

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
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
