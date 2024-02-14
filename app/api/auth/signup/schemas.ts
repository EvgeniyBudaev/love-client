import { z } from "zod";

export const signupParamsSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string().nullish(),
  mobileNumber: z.string(),
  password: z.string(),
  userName: z.string(),
});

export const signupSchema = z.any();
