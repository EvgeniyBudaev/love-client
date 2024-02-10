import type { z } from "zod";
import {
  profileByTelegramIdParamsSchema,
  profileByTelegramIdResponseSchema,
  profileByTelegramIdSchema,
} from "@/app/api/profile/byTelegramId";

export type TProfileByTelegramId = z.infer<typeof profileByTelegramIdSchema>;
export type TProfileByTelegramIdParams = z.infer<
  typeof profileByTelegramIdParamsSchema
>;
export type TProfileByTelegramIdResponse = z.infer<
  typeof profileByTelegramIdResponseSchema
>;
