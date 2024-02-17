import { z } from "zod";
import { filterSchema } from "@/app/api/profile/filter";

const imageListItemSchema = z.object({
  url: z.string(),
});

const telegramSchema = z.object({
  telegramId: z.number(),
});

export const profileByKeycloakIdSchema = z.object({
  id: z.number(),
  userId: z.string(),
  image: imageListItemSchema,
  filter: filterSchema,
  telegram: telegramSchema,
});

export const profileByKeycloakIdParamsSchema = z.object({
  userId: z.string(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

export const profileByKeycloakIdResponseSchema = z.object({
  data: profileByKeycloakIdSchema.optional(),
  message: z.string().optional(),
  statusCode: z.number(),
  success: z.boolean(),
});
