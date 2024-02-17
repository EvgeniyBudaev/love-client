import type { z } from "zod";
import {
  profileByKeycloakIdParamsSchema,
  profileByKeycloakIdResponseSchema,
  profileByKeycloakIdSchema,
} from "@/app/api/profile/byKeycloakId/schemas";

export type TProfileByKeycloakId = z.infer<typeof profileByKeycloakIdSchema>;
export type TProfileByKeycloakIdParams = z.infer<
  typeof profileByKeycloakIdParamsSchema
>;
export type TProfileByKeycloakIdResponse = z.infer<
  typeof profileByKeycloakIdResponseSchema
>;
