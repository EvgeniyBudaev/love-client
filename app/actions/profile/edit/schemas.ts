import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { fileSchema, imageFileSchema, MAX_FILE_SIZE } from "@/app/api/upload";
import { EFormFields } from "@/app/pages/profileEditPage/enums";
import { EGender, ELookingFor, ESearchGender } from "@/app/shared/enums/form";
import {
  EMPTY_FIELD_ERROR_MESSAGE,
  FILE_MAX_SIZE_MESSAGE,
} from "@/app/shared/validation";

export const editProfileFormSchema = zfd
  .formData({
    [EFormFields.Id]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.DisplayName]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.Birthday]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.Gender]: z
      .enum([EGender.Man, EGender.Woman, ""])
      .transform((value) => {
        return isEmpty(value) || isNil(value) ? "" : value;
      })
      .refine(
        (value) => {
          return !isNil(value) && !isEmpty(value);
        },
        {
          message: EMPTY_FIELD_ERROR_MESSAGE,
        },
      ),
    [EFormFields.SearchGender]: z
      .enum([ESearchGender.Man, ESearchGender.Woman, ESearchGender.All, ""])
      .nullish(),
    [EFormFields.Location]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.Description]: z.string().trim().nullish(),
    [EFormFields.Height]: z.string().trim().nullish(),
    [EFormFields.Weight]: z.string().trim().nullish(),
    [EFormFields.LookingFor]: z
      .enum([
        ELookingFor.Chat,
        ELookingFor.Dates,
        ELookingFor.Relationship,
        ELookingFor.Friendship,
        ELookingFor.Business,
        ELookingFor.Sex,
        "",
      ])
      .nullish(),
    [EFormFields.IsDefaultImage]: z.string().trim().nullish(),
    // [EFormFields.Image]: z.union([z.literal(null), imageFileSchema]),
    [EFormFields.Image]: z.union([
      z.literal(null),
      fileSchema.or(fileSchema.array()),
    ]),
    [EFormFields.TelegramID]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.FirstName]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.LastName]: z.string().trim(),
    [EFormFields.Username]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.LanguageCode]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.AllowsWriteToPm]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.QueryId]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  })
  .superRefine(({ isDefaultImage, image }, ctx) => {
    if (
      Boolean(isDefaultImage) &&
      !isNil(image) &&
      !Array.isArray(image) &&
      image.size > MAX_FILE_SIZE
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [EFormFields.Image],
        message: FILE_MAX_SIZE_MESSAGE,
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [EFormFields.Image],
        message: EMPTY_FIELD_ERROR_MESSAGE,
      });
    }
    if (!Boolean(isDefaultImage) && isNil(image)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [EFormFields.Image],
        message: EMPTY_FIELD_ERROR_MESSAGE,
      });
    }
    if (
      !Boolean(isDefaultImage) &&
      !isNil(image) &&
      !Array.isArray(image) &&
      image.size > MAX_FILE_SIZE
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [EFormFields.Image],
        message: FILE_MAX_SIZE_MESSAGE,
      });
    }
  });
