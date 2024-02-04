import { z } from "zod";
import { imageSchema } from "@/app/api/profile/image";

export const deleteImageParamsSchema = z.object({
  id: z.string(),
});

export const deleteImageResponseSchema = z.object({
  data: imageSchema.optional(),
  message: z.string().optional(),
  statusCode: z.number(),
  success: z.boolean(),
});
