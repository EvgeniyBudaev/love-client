import type { FC, ReactNode } from "react";
import { Footer } from "@/app/shared/components/footer";
import "./Layout.scss";

type TProps = {
  children?: ReactNode;
};

export const Layout: FC<TProps> = ({ children }) => {
  return (
    <div className="Layout">
      <div className="Layout-Content">{children}</div>
      <Footer />
    </div>
  );
};
