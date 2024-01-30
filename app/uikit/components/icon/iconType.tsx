import {
  AddCircleOutlineIcon,
  ImageIcon,
  MoreHorizIcon,
  SearchIcon,
  TrashIcon,
} from "@/app/uikit/assets/icons";

export type IconType =
  | "AddCircleOutline"
  | "Image"
  | "MoreHoriz"
  | "Search"
  | "Trash";

export const iconTypes = new Map([
  ["AddCircleOutline", <AddCircleOutlineIcon key="AddCircleOutlineIcon" />],
  ["Image", <ImageIcon key="ImageIcon" />],
  ["MoreHoriz", <MoreHorizIcon key="MoreHorizIcon" />],
  ["Search", <SearchIcon key="SearchIcon" />],
  ["Trash", <TrashIcon key="TrashIcon" />],
]);
