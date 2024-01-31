import clsx from "clsx";
import {FC, useState} from "react";
import {Header} from "@/app/shared/components/header";
import {Icon} from "@/app/uikit/components/icon";
import "./SidebarContent.scss";

type TOption = {
  label: string;
  value: string | number;
};

type TProps = {
  options: TOption[];
  onCloseSidebar?: () => void;
  onSave?: (value?: string | number) => void;
  title: string;
  value?: string;
};

export const SidebarContent: FC<TProps> = ({
                                             value,
                                             onSave,
                                             options,
                                             onCloseSidebar,
                                             title,
                                           }) => {
  const [checkedItem, setCheckedItem] = useState<string | number | undefined>();

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
          const isChecked = item.value === checkedItem;
          return (
            <div
              className={clsx("SidebarContent-List-Item", {
                ["SidebarContent-List-Item__isChecked"]: isChecked,
              })}
              key={item.value}
              onClick={() => setCheckedItem(item.value)}
            >
              <div>{item.label}</div>
              {isChecked && <Icon type="Checkbox"/>}
            </div>
          );
        })}
      </div>
    </>
  );
};
