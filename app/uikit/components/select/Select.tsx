import { FC, type ReactNode, useRef, useState } from "react";
import { Header } from "@/app/shared/components/header";
import { Icon } from "@/app/uikit/components/icon";
import { Sidebar } from "@/app/uikit/components/sidebar";
import "./Select.scss";

type TProps = {
  children?: ReactNode;
  isSidebarOpen?: boolean;
  label: string;
  onHeaderClick?: () => void;
  onSidebarClose?: () => void;
  value?: string;
};

export const Select: FC<TProps> = ({
  children,
  isSidebarOpen = false,
  label,
  onHeaderClick,
  onSidebarClose,
  value,
}) => {
  const sidebarRef = useRef(null);

  return (
    <div className="Select">
      <div className="Select-Header" onClick={onHeaderClick}>
        <div className="Select-Header-Label">{label}</div>
        <div className="Select-HeaderRight">
          <div className="Select-Header-Value">{value ?? "--"}</div>
          <div className="Select-Header-Icon">
            <Icon type="ArrowRight" />
          </div>
        </div>
      </div>
      <Sidebar
        isActive={isSidebarOpen}
        onClose={onSidebarClose}
        ref={sidebarRef}
      >
        {children}
      </Sidebar>
    </div>
  );
};
