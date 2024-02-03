import { z } from "zod";
import { zfd } from "zod-form-data";
import { fileSchema } from "@/app/api/upload";
import { EFormFields } from "@/app/pages/profileEditPage/enums";
import { EGender, ELookingFor, ESearchGender } from "@/app/shared/enums/form";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const editProfileFormSchema = zfd.formData({
  [EFormFields.Id]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.DisplayName]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Birthday]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Gender]: z.enum([EGender.Man, EGender.Woman]),
  [EFormFields.SearchGender]: z.enum([
    ESearchGender.Man,
    ESearchGender.Woman,
    ESearchGender.All,
  ]),
  [EFormFields.Location]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Description]: z.string().trim().nullish(),
  [EFormFields.Height]: z.string().trim().nullish(),
  [EFormFields.Weight]: z.string().trim().nullish(),
  [EFormFields.LookingFor]: z.enum([
    ELookingFor.Chat,
    ELookingFor.Dates,
    ELookingFor.Relationship,
    ELookingFor.Friendship,
    ELookingFor.Business,
    ELookingFor.Sex,
  ]),
  [EFormFields.Image]: fileSchema.or(fileSchema.array()).nullish(),
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
