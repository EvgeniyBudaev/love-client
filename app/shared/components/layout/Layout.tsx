"use client";

import { type FC, type ReactNode, useEffect } from "react";
import { Footer } from "@/app/shared/components/footer";
import { useTelegram } from "@/app/shared/hooks";
import "./Layout.scss";

type TProps = {
  children?: ReactNode;
};

export const Layout: FC<TProps> = ({ children }) => {
  const { tg } = useTelegram();

  useEffect(() => {
    tg?.ready();
  }, [tg]);

  return (
    <div className="Layout">
      <div className="Layout-Content">{children}</div>
      <Footer />
    </div>
  );
};
