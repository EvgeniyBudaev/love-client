import {
  AddCircleOutlineIcon,
  CalendarIcon,
  ImageIcon,
  MoreHorizIcon,
  SearchIcon,
  TrashIcon,
} from "@/app/uikit/assets/icons";

export type IconType =
  | "AddCircleOutline"
  | "Calendar"
  | "Image"
  | "MoreHoriz"
  | "Search"
  | "Trash";

export const iconTypes = new Map([
  ["AddCircleOutline", <AddCircleOutlineIcon key="AddCircleOutlineIcon" />],
  ["Calendar", <CalendarIcon key="CalendarIcon" />],
  ["Image", <ImageIcon key="ImageIcon" />],
  ["MoreHoriz", <MoreHorizIcon key="MoreHorizIcon" />],
  ["Search", <SearchIcon key="SearchIcon" />],
  ["Trash", <TrashIcon key="TrashIcon" />],
]);
