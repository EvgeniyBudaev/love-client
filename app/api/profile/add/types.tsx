import type { z } from "zod";
import {
  addProfileParamsSchema,
  addProfileResponseSchema,
  profileDetailSchema,
} from "@/app/api/profile/add/schemas";

export type TProfileDetail = z.infer<typeof profileDetailSchema>;
export type TAddProfileParams = z.infer<typeof addProfileParamsSchema>;
export type TAddProfileResponse = z.infer<typeof addProfileResponseSchema>;
