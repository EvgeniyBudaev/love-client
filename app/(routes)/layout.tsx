import type {Metadata} from "next";
import Head from "next/head";
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
    <Head><title>Love</title></Head>
    <Script
      src="https://telegram.org/js/telegram-web-app.js"
      strategy="beforeInteractive"
    />
    <body>
    <LayoutComponent>{children}</LayoutComponent>
    </body>
    </html>
  );
}
