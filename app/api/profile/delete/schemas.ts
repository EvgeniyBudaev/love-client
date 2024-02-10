import { z } from "zod";
import { profileDetailSchema } from "@/app/api/profile/add";

export const deleteProfileParamsSchema = z.object({
  id: z.string(),
});

export const deleteProfileResponseSchema = z.object({
  data: profileDetailSchema.optional(),
  message: z.string().optional(),
  statusCode: z.number(),
  success: z.boolean(),
});
