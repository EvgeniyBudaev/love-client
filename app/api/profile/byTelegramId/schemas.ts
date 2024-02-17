import { z } from "zod";
import { ESearchGender } from "@/app/shared/enums/form";
import { filterSchema } from "@/app/api/profile/filter";

const imageListItemSchema = z.object({
  url: z.string(),
});

const telegramSchema = z.object({
  telegramId: z.number(),
});

export const profileByTelegramIdSchema = z.object({
  id: z.number(),
  userId: z.string(),
  image: imageListItemSchema,
  filter: filterSchema,
  telegram: telegramSchema,
});

export const profileByTelegramIdParamsSchema = z.object({
  telegramId: z.string(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

export const profileByTelegramIdResponseSchema = z.object({
  data: profileByTelegramIdSchema.optional(),
  message: z.string().optional(),
  statusCode: z.number(),
  success: z.boolean(),
});
