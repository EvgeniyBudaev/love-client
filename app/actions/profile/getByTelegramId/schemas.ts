import { z } from "zod";
import { zfd } from "zod-form-data";
import { EFormFields } from "@/app/shared/components/layout/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const getProfileByTelegramIdFormSchema = zfd.formData({
  [EFormFields.TelegramID]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Latitude]: z.string().trim().nullish(),
  [EFormFields.Longitude]: z.string().trim().nullish(),
});
