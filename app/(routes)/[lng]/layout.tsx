import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { I18nContextProvider } from "@/app/i18n/context";
import { InitClient } from "@/app/shared/components/init";
import { Layout as LayoutComponent } from "@/app/shared/components/layout";
import { SessionProviderWrapper } from "@/app/shared/utils/auth";
import "@/app/styles/_index.scss";

export const metadata: Metadata = {
  title: "Love",
  description: "Love assistant",
};

export default function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: ReactNode;
  params: { lng: string };
}>) {
  return (
    <SessionProviderWrapper>
      <html lang={lng}>
        <head>
          <Script
            src="https://telegram.org/js/telegram-web-app.js"
            strategy="beforeInteractive"
          />
          <title>Love</title>
        </head>
        <body>
          <I18nContextProvider lng={lng}>
            <InitClient />
            <LayoutComponent lng={lng}>{children}</LayoutComponent>
          </I18nContextProvider>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
