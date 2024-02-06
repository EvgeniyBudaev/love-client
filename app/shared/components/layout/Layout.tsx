"use client";

import { type FC, type ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Footer } from "@/app/shared/components/footer";
import { Header } from "@/app/shared/components/header";
import { useTelegram } from "@/app/shared/hooks";
import { SearchBar } from "@/app/shared/components/searchBar";
import { DropDown } from "@/app/uikit/components/dropDown";
import { Icon } from "@/app/uikit/components/icon";
import { RangeSlider } from "@/app/uikit/components/rangeSlider";
import { Sidebar } from "@/app/uikit/components/sidebar";
import "./Layout.scss";
import { SliderValue } from "@nextui-org/slider";

type TProps = {
  children?: ReactNode;
};

export const Layout: FC<TProps> = ({ children }) => {
  const { tg } = useTelegram();
  const { t } = useTranslation("index");
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [ageRange, setAgeRange] = useState<SliderValue>([18, 50]);

  useEffect(() => {
    tg?.ready();
  }, [tg]);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="Layout">
      <Header className="Layout-Header">
        <DropDown>
          <DropDown.Button>
            <div className="Layout-HeaderInner">
              <SearchBar title="Все люди поблизости" />
              <div className="Layout-WrapperIcon">
                <Icon className="Layout-Icon" type="Filter" />
              </div>
            </div>
          </DropDown.Button>
          <DropDown.Panel>
            <div className="Layout-DropDown-Menu">
              <div className="DropDown-Menu">
                <div className="DropDown-MenuItem" onClick={handleOpenSidebar}>
                  {t("common.actions.filterSetup")}
                </div>
              </div>
              <div className="DropDown-Menu">
                <div className="DropDown-MenuItem DropDown-MenuItem-Cancel">
                  {t("common.actions.cancel")}
                </div>
              </div>
            </div>
          </DropDown.Panel>
        </DropDown>
      </Header>
      <Sidebar
        isActive={isSidebarOpen}
        onClose={handleCloseSidebar}
        ref={sidebarRef}
      >
        <Header className="SidebarContent-Header">
          <Icon
            className="SidebarContent-Header-Cancel"
            onClick={handleCloseSidebar}
            type="ArrowBack"
          />
          <div>{t("common.titles.filtersGeneral")}</div>
          <div className="SidebarContent-Header-Save" onClick={() => {}}>
            {t("common.actions.save")}
          </div>
        </Header>
        <div className="SidebarContent-List">
          <RangeSlider
            label={t("common.titles.age")}
            maxValue={100}
            minValue={18}
            onChange={setAgeRange}
            step={1}
            value={ageRange}
          />
        </div>
      </Sidebar>
      <div className="Layout-Content">{children}</div>
      <Footer />
    </div>
  );
};
