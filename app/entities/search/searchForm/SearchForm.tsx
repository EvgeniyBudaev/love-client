"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type FC, useRef, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Header } from "@/app/shared/components/header";
import { SearchBar } from "@/app/shared/components/searchBar";
import {
  DEFAULT_AGE_FROM,
  DEFAULT_AGE_TO,
} from "@/app/shared/constants/filter";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_LIMIT,
} from "@/app/shared/constants/pagination";
import { DropDown } from "@/app/uikit/components/dropDown";
import { Icon } from "@/app/uikit/components/icon";
import { RangeSlider } from "@/app/uikit/components/rangeSlider";
import { Sidebar } from "@/app/uikit/components/sidebar";
import "./SearchForm.scss";

export const SearchForm: FC = () => {
  const { t } = useTranslation("index");
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const defaultAgeRangeFrom = searchParams.get("ageFrom")
    ? Number(searchParams.get("ageFrom"))
    : 18;
  const defaultAgeRangeTo = searchParams.get("ageTo")
    ? Number(searchParams.get("ageTo"))
    : 50;
  const [ageRange, setAgeRange] = useState<any>([
    defaultAgeRangeFrom,
    defaultAgeRangeTo,
  ]);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("ageFrom");
    params.delete("ageTo");
    const page = params.get("page") ?? DEFAULT_PAGE;
    const limit = params.get("limit") ?? DEFAULT_PAGE_LIMIT;
    params.set("page", page.toString());
    params.set("limit", limit.toString());
    const ageRangeValueFrom = Array.isArray(ageRange) ? ageRange[0] : ageRange;
    params.set("ageFrom", ageRangeValueFrom.toString());
    const ageRangeValueTo = Array.isArray(ageRange) ? ageRange[1] : ageRange;
    params.set("ageTo", ageRangeValueTo.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="SearchForm">
      <Header className="SearchForm-Header">
        <DropDown>
          <DropDown.Button>
            <div className="SearchForm-HeaderInner">
              <SearchBar title="Все люди поблизости" />
              <div className="SearchForm-WrapperIcon">
                <Icon className="SearchForm-Icon" type="Filter" />
              </div>
            </div>
          </DropDown.Button>
          <DropDown.Panel>
            <div className="SearchForm-DropDown-Menu">
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
          <div className="SidebarContent-Header-Save" onClick={handleSubmit}>
            {t("common.actions.save")}
          </div>
        </Header>
        <div className="SidebarContent-List">
          <RangeSlider
            // isShowRangeValue={true}
            isShowTooltip={true}
            label={t("common.titles.age")}
            max={DEFAULT_AGE_TO}
            min={DEFAULT_AGE_FROM}
            onChange={setAgeRange}
            step={1}
            value={ageRange}
          />
        </div>
      </Sidebar>
    </div>
  );
};
