import {
  AddCircleOutlineIcon,
  ArrowBackIcon,
  ArrowRightIcon,
  AttentionIcon,
  CalendarIcon,
  CheckboxIcon,
  ExitIcon,
  FilterIcon,
  ImageIcon,
  LocationIcon,
  MoreHorizIcon,
  NoImageIcon,
  PersonIcon,
  SearchIcon,
  TrashIcon,
  WatchIcon,
} from "@/app/uikit/assets/icons";

export type IconType =
  | "AddCircleOutline"
  | "ArrowBack"
  | "ArrowRight"
  | "Attention"
  | "Calendar"
  | "Checkbox"
  | "Exit"
  | "Filter"
  | "Image"
  | "Location"
  | "MoreHoriz"
  | "NoImage"
  | "Person"
  | "Search"
  | "Trash"
  | "Watch";

export const iconTypes = new Map([
  ["AddCircleOutline", <AddCircleOutlineIcon key="AddCircleOutlineIcon" />],
  ["ArrowBack", <ArrowBackIcon key="ArrowBackIcon" />],
  ["ArrowRight", <ArrowRightIcon key="ArrowRightIcon" />],
  ["Attention", <AttentionIcon key="AttentionIcon" />],
  ["Calendar", <CalendarIcon key="CalendarIcon" />],
  ["Checkbox", <CheckboxIcon key="CheckboxIcon" />],
  ["Exit", <ExitIcon key="ExitIcon" />],
  ["Filter", <FilterIcon key="FilterIcon" />],
  ["Image", <ImageIcon key="ImageIcon" />],
  ["Location", <LocationIcon key="LocationIcon" />],
  ["MoreHoriz", <MoreHorizIcon key="MoreHorizIcon" />],
  ["NoImage", <NoImageIcon key="NoImageIcon" />],
  ["Person", <PersonIcon key="PersonIcon" />],
  ["Search", <SearchIcon key="SearchIcon" />],
  ["Trash", <TrashIcon key="TrashIcon" />],
  ["Watch", <WatchIcon key="WatchIcon" />],
]);
