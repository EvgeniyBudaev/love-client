import { z } from "zod";

export const navigatorSchema = z.object({
  id: z.number(),
  profileId: z.number(),
  latitude: z.string(),
  longitude: z.string(),
});
