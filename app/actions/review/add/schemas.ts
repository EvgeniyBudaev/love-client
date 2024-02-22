import { z } from "zod";
import { zfd } from "zod-form-data";
import { EFormFields } from "@/app/pages/reviewAddPage/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const addReviewFormSchema = zfd.formData({
  [EFormFields.ProfileId]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Message]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Rating]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
