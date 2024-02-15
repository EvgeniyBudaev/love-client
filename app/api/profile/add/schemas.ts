import { z } from "zod";
import { zfd } from "zod-form-data";
import { imageSchema } from "@/app/api/profile/image";
import { navigatorSchema } from "@/app/api/profile/navigator";
import { telegramSchema } from "@/app/api/profile/telegram";
import { fileSchema } from "@/app/api/upload";
import { EGender, ELookingFor, ESearchGender } from "@/app/shared/enums/form";

export const profileDetailSchema = z.object({
  id: z.number(),
  displayName: z.string(),
  birthday: z.string(),
  gender: z.enum([EGender.Man, EGender.Woman]),
  searchGender: z.enum([
    ESearchGender.Man,
    ESearchGender.Woman,
    ESearchGender.All,
  ]),
  location: z.string().nullish(),
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
  navigator: navigatorSchema.nullish(),
});

export const addProfileParamsSchema = zfd.formData({
  userId: zfd.text(),
  displayName: zfd.text(),
  birthday: zfd.text(),
  gender: zfd.text(),
  searchGender: zfd.text(),
  location: zfd.text().nullish(),
  description: zfd.text().nullish(),
  height: zfd.text().nullish(),
  weight: zfd.text().nullish(),
  lookingFor: zfd.text().nullish(),
  image: fileSchema.or(fileSchema.array()).nullish(),
  telegramId: zfd.text(),
  firstName: zfd.text(),
  lastName: zfd.text().nullish(),
  username: zfd.text(),
  languageCode: zfd.text(),
  allowsWriteToPm: zfd.text(),
  queryId: zfd.text(),
  latitude: zfd.text(),
  longitude: zfd.text(),
});

export const addProfileResponseSchema = z.object({
  data: profileDetailSchema.optional(),
  message: z.string().optional(),
  statusCode: z.number(),
  success: z.boolean(),
});
