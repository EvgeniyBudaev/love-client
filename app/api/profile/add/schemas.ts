import { z } from "zod";
import { zfd } from "zod-form-data";
import { fileSchema } from "@/app/api/upload";

export const profileSchema = z.any();

export const addProfileParamsSchema = zfd.formData({
  displayName: zfd.text(),
  description: zfd.text(),
  location: zfd.text(),
  birthday: zfd.text(),
  gender: zfd.text(),
  image: fileSchema.or(fileSchema.array()).nullish(),
  telegramId: zfd.text(),
  firstName: zfd.text(),
  lastName: zfd.text().nullish(),
  username: zfd.text(),
  languageCode: zfd.text(),
  allowsWriteToPm: zfd.text(),
  queryId: zfd.text(),
});

export const addProfileResponseSchema = z.object({
  data: profileSchema.optional(),
  message: z.string().optional(),
  statusCode: z.number(),
  success: z.boolean(),
});
