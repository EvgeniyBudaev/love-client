import { z } from "zod";

export const paginationSchema = z.object({
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
  countPages: z.number(),
  limit: z.number(),
  page: z.number(),
  totalItems: z.number(),
});
