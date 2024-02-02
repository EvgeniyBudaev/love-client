import { z } from "zod";
import { paginationSchema } from "@/app/api/pagination/schemas";

const imageListItemSchema = z.object({
  url: z.string(),
});

const profileListItemSchema = z.object({
  id: z.number(),
  lastOnline: z.string(),
  image: imageListItemSchema,
});

export const profileListParamsSchema = z.object({
  limit: z.string(),
  page: z.string(),
});

export const profileListSchema = paginationSchema.extend({
  content: profileListItemSchema.array(),
});

export const profileListResponseSchema = z.object({
  data: profileListSchema.optional(),
  message: z.string().optional(),
  statusCode: z.number(),
  success: z.boolean(),
});
