import { z } from "zod";
import { zfd } from "zod-form-data";
import { fileSchema } from "@/app/api/upload";

export const profileSchema = z.any();

export const addProfileParamsSchema = zfd.formData({
  displayName: zfd.text(),
  image: fileSchema.or(fileSchema.array()).nullish(),
});

export const addProfileResponseSchema = z.object({
  data: profileSchema.optional(),
  message: z.string().optional(),
  statusCode: z.number(),
  success: z.boolean(),
});
