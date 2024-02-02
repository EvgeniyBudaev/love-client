import { ESearchGender } from "@/app/shared/enums/form";
import { ELanguage } from "@/app/shared/enums";

const searchGenderOptionsRU = [
  { label: "Парня", value: ESearchGender.Man },
  { label: "Девушку", value: ESearchGender.Woman },
  { label: "Всех", value: ESearchGender.All },
];

const searchGenderOptionsEN = [
  { label: "Boy", value: ESearchGender.Man },
  { label: "Girl", value: ESearchGender.Woman },
  { label: "All", value: ESearchGender.All },
];

export const SEARCH_GENDER_MAPPING = {
  [ELanguage.Ru]: searchGenderOptionsRU,
  [ELanguage.En]: searchGenderOptionsEN,
};
