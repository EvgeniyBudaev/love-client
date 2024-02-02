import { z } from "zod";
import { zfd } from "zod-form-data";
import { fileSchema } from "@/app/api/upload";
import { EGender, ELookingFor, ESearchGender } from "@/app/shared/enums/form";

const telegramSchema = z.object({
  id: z.number(),
  profileId: z.number(),
  telegramId: z.number(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string().nullish(),
  languageCode: z.string(),
  allowsWriteToPm: z.boolean(),
  queryId: z.string(),
});

const imageSchema = z.object({
  id: z.number(),
  profileId: z.number(),
  name: z.string(),
  url: z.string(),
  size: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isDeleted: z.boolean(),
  isBlocked: z.boolean(),
  isPrimary: z.boolean(),
  isPrivate: z.boolean(),
});

export const profileSchema = z.object({
  id: z.number(),
  displayName: z.string(),
  birthday: z.string(),
  gender: z.enum([EGender.Man, EGender.Woman]),
  searchGender: z.enum([
    ESearchGender.Man,
    ESearchGender.Woman,
    ESearchGender.All,
  ]),
  location: z.string(),
  description: z.string().nullish(),
  height: z.number().nullish(),
  weight: z.number().nullish(),
  lookingFor: z.enum([
    ELookingFor.Chat,
    ELookingFor.Dates,
    ELookingFor.Relationship,
    ELookingFor.Friendship,
    ELookingFor.Business,
    ELookingFor.Sex,
  ]),
  isDeleted: z.boolean(),
  isBlocked: z.boolean(),
  isPremium: z.boolean(),
  isShowDistance: z.boolean(),
  isInvisible: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastOnline: z.string(),
  images: imageSchema.array().nullish(),
  telegram: telegramSchema.nullish(),
});

export const addProfileParamsSchema = zfd.formData({
  displayName: zfd.text(),
  birthday: zfd.text(),
  gender: zfd.text(),
  searchGender: zfd.text(),
  location: zfd.text(),
  description: zfd.text(),
  height: zfd.text(),
  weight: zfd.text(),
  lookingFor: zfd.text(),
  image: fileSchema.or(fileSchema.array()).nullish(),
  telegramId: zfd.text(),
  firstName: zfd.text(),
  lastName: zfd.text().nullish(),
  username: zfd.text(),
  languageCode: zfd.text(),
  allowsWriteToPm: zfd.text(),
  queryId: zfd.text(),
});

export const addProfileResponseSchema = z.object({
  data: profileSchema.optional(),
  message: z.string().optional(),
  statusCode: z.number(),
  success: z.boolean(),
});
