import type { z } from "zod";
import {
  profileDetailParamsSchema,
  profileDetailResponseSchema,
} from "@/app/api/profile/detail/schemas";

export type TProfileDetailParams = z.infer<typeof profileDetailParamsSchema>;
export type TProfileDetailResponse = z.infer<
  typeof profileDetailResponseSchema
>;
