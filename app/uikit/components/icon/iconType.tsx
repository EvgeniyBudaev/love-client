import {
  AddCircleOutlineIcon,
  ArrowBackIcon,
  ArrowRightIcon,
  CalendarIcon,
  CheckboxIcon,
  ImageIcon,
  MoreHorizIcon,
  SearchIcon,
  TrashIcon,
} from "@/app/uikit/assets/icons";

export type IconType =
  | "AddCircleOutline"
  | "ArrowBack"
  | "ArrowRight"
  | "Calendar"
  | "Checkbox"
  | "Image"
  | "MoreHoriz"
  | "Search"
  | "Trash";

export const iconTypes = new Map([
  ["AddCircleOutline", <AddCircleOutlineIcon key="AddCircleOutlineIcon" />],
  ["ArrowBack", <ArrowBackIcon key="ArrowBackIcon" />],
  ["ArrowRight", <ArrowRightIcon key="ArrowRightIcon" />],
  ["Calendar", <CalendarIcon key="CalendarIcon" />],
  ["Checkbox", <CheckboxIcon key="CheckboxIcon" />],
  ["Image", <ImageIcon key="ImageIcon" />],
  ["MoreHoriz", <MoreHorizIcon key="MoreHorizIcon" />],
  ["Search", <SearchIcon key="SearchIcon" />],
  ["Trash", <TrashIcon key="TrashIcon" />],
]);
