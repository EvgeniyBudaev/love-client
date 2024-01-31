import { z } from "zod";
import { zfd } from "zod-form-data";
import { fileSchema } from "@/app/api/upload";
import { EFormFields } from "@/app/pages/profileAddPage/enums";
import { EGender } from "@/app/shared/enums/form";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const addProfileFormSchema = zfd.formData({
  [EFormFields.DisplayName]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Description]: z.string().trim().nullish(),
  [EFormFields.Location]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Birthday]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Gender]: z.enum([EGender.Man, EGender.Woman]),
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
