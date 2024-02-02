import { EGender } from "@/app/shared/enums/form";
import { ELanguage } from "@/app/shared/enums";

const genderOptionsRU = [
  { label: "Парень", value: EGender.Man },
  { label: "Девушка", value: EGender.Woman },
];

const genderOptionsEN = [
  { label: "Boy", value: EGender.Man },
  { label: "Girl", value: EGender.Woman },
];

export const GENDER_MAPPING = {
  [ELanguage.Ru]: genderOptionsRU,
  [ELanguage.En]: genderOptionsEN,
};
