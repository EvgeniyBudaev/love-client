import type {Metadata} from "next";
import type {ReactNode} from "react";
import "@/app/styles/_index.scss";

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
    <body>
    {children}
    </body>
    </html>
  );
}
