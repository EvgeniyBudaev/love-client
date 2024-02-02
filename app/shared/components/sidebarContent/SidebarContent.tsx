"use client";

import clsx from "clsx";
import { FC, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Header } from "@/app/shared/components/header";
import { Icon } from "@/app/uikit/components/icon";
import type { TSelectOption } from "@/app/uikit/components/select";
import "./SidebarContent.scss";

type TProps = {
  options: TSelectOption[];
  onCloseSidebar?: () => void;
  onSave?: (value?: TSelectOption) => void;
  title: string;
};

export const SidebarContent: FC<TProps> = ({
  onSave,
  options,
  onCloseSidebar,
  title,
}) => {
  const [checkedItem, setCheckedItem] = useState<TSelectOption | undefined>();
  const { t } = useTranslation("index");

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
          {t("common.actions.save")}
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
