import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { imageFileSchema } from "@/app/api/upload";
import { EFormFields } from "@/app/pages/profileAddPage/enums";
import { EGender, ELookingFor, ESearchGender } from "@/app/shared/enums/form";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const addProfileFormSchema = zfd.formData({
  [EFormFields.DisplayName]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Birthday]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Gender]: z
    .enum([EGender.Man, EGender.Woman, ""])
    .transform((value) => {
      return isEmpty(value) || isNil(value) ? "" : value;
    })
    .refine(
      (value) => {
        return !isNil(value) && !isEmpty(value);
      },
      {
        message: EMPTY_FIELD_ERROR_MESSAGE,
      },
    ),
  [EFormFields.SearchGender]: z
    .enum([ESearchGender.Man, ESearchGender.Woman, ESearchGender.All, ""])
    .nullish(),
  [EFormFields.Location]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Description]: z.string().trim().nullish(),
  [EFormFields.Height]: z.string().trim().nullish(),
  [EFormFields.Weight]: z.string().trim().nullish(),
  [EFormFields.LookingFor]: z
    .enum([
      ELookingFor.Chat,
      ELookingFor.Dates,
      ELookingFor.Relationship,
      ELookingFor.Friendship,
      ELookingFor.Business,
      ELookingFor.Sex,
      "",
    ])
    .nullish(),
  [EFormFields.Image]: imageFileSchema,
  [EFormFields.TelegramID]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.FirstName]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.LastName]: z.string().trim(),
  [EFormFields.Username]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.LanguageCode]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.AllowsWriteToPm]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.QueryId]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
