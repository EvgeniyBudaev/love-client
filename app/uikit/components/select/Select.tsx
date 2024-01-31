"use client";

import { FC, type ReactNode, useRef } from "react";
import { Icon } from "@/app/uikit/components/icon";
import { Sidebar } from "@/app/uikit/components/sidebar";
import "./Select.scss";

type TProps = {
  children?: ReactNode;
  headerTitle?: string | number;
  isSidebarOpen?: boolean;
  label: string;
  onHeaderClick?: () => void;
  onSidebarClose?: () => void;
};

export const Select: FC<TProps> = ({
  children,
  headerTitle,
  isSidebarOpen = false,
  label,
  onHeaderClick,
  onSidebarClose,
}) => {
  const sidebarRef = useRef(null);

  return (
    <div className="Select">
      <div className="Select-Header" onClick={onHeaderClick}>
        <div className="Select-Header-Label">{label}</div>
        <div className="Select-HeaderRight">
          <div className="Select-Header-Value">{headerTitle ?? "--"}</div>
          <Icon type="ArrowRight" />
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
