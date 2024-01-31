import type {Metadata} from "next";
import Script from "next/script";
import type {ReactNode} from "react";
import {Layout as LayoutComponent} from "@/app/shared/components/layout";
import "@/app/styles/_index.scss";

export const metadata: Metadata = {
  title: "Love",
  description: "Love assistant",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
      <title>Love</title>
    </head>
    <body>
    <LayoutComponent>{children}</LayoutComponent>
    </body>
    </html>
  );
}
