import type { FC, ReactNode } from "react";
import "./Section.scss";

type TProps = {
  children?: ReactNode;
  title: string;
};

export const Section: FC<TProps> = ({ children, title }) => {
  return (
    <div className="Section">
      <div className="Section-Header">
        <span className="Section-Title">{title}</span>
      </div>
      <div className="Section-Container">{children}</div>
    </div>
  );
};
