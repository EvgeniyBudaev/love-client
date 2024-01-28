import { MoreHorizIcon, SearchIcon } from "@/app/uikit/assets/icons";

export type IconType = "MoreHoriz" | "Search";

export const iconTypes = new Map([
  ["MoreHoriz", <MoreHorizIcon key="MoreHorizIcon" />],
  ["Search", <SearchIcon key="SearchIcon" />],
]);
