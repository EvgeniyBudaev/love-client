"use client";

import clsx from "clsx";
import { FC, useState } from "react";
import { Header } from "@/app/shared/components/header";
import { Icon } from "@/app/uikit/components/icon";
import type { TSelectOption } from "@/app/uikit/components/select";
import "./SidebarContent.scss";

type TProps = {
  options: TSelectOption[];
  onCloseSidebar?: () => void;
  onSave?: (value?: TSelectOption) => void;
  title: string;
  value?: string | number;
};

export const SidebarContent: FC<TProps> = ({
  value,
  onSave,
  options,
  onCloseSidebar,
  title,
}) => {
  const [checkedItem, setCheckedItem] = useState<TSelectOption | undefined>();

  return (
    <>
      <Header className="SidebarContent-Header">
        <Icon
          className="SidebarContent-Header-Cancel"
          onClick={onCloseSidebar}
          type="ArrowBack"
        />
        <div>{title}</div>
        <div
          className="SidebarContent-Header-Save"
          onClick={() => onSave?.(checkedItem)}
        >
          Сохранить
        </div>
      </Header>
      <div className="SidebarContent-List">
        {(options ?? []).map((item) => {
          const isChecked = item.value === checkedItem?.value;
          return (
            <div
              className={clsx("SidebarContent-List-Item", {
                ["SidebarContent-List-Item__isChecked"]: isChecked,
              })}
              key={item.value}
              onClick={() => setCheckedItem(item)}
            >
              <div>{item.label}</div>
              {isChecked && <Icon type="Checkbox" />}
            </div>
          );
        })}
      </div>
    </>
  );
};
