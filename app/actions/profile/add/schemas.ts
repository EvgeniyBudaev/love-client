import { z } from "zod";
import { zfd } from "zod-form-data";
import { EFormFields } from "@/app/pages/profileAddPage/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";
import { fileSchema } from "@/app/api/upload";

export const addProfileFormSchema = zfd.formData({
  [EFormFields.DisplayName]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Description]: z.string().trim().nullish(),
  [EFormFields.Birthday]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Image]: fileSchema.or(fileSchema.array()).nullish(),
});
