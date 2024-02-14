import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { imageFileSchema } from "@/app/api/upload";
import { EFormFields } from "@/app/pages/profileAddPage/enums";
import { EGender, ELookingFor, ESearchGender } from "@/app/shared/enums/form";
import {
  EMPTY_FIELD_ERROR_MESSAGE,
  NAME_ERROR_MESSAGE,
  NAME_REGEXP,
} from "@/app/shared/validation";
import {
  EMAIL_ERROR_MESSAGE,
  EMAIL_NOT_CYRILLIC_ERROR_MESSAGE,
  EMAIL_NOT_CYRILLIC_REGEXP,
  EMAIL_REGEXP,
  PASSWORD_ERROR_MESSAGE,
  PHONE_ERROR_MESSAGE,
  PHONE_REGEXP,
} from "@/app/shared/validation/constants";

export const addProfileFormSchema = zfd
  .formData({
    [EFormFields.DisplayName]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.MobileNumber]: z
      .string()
      .trim()
      .min(11, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.Email]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE)
      .regex(EMAIL_NOT_CYRILLIC_REGEXP, EMAIL_NOT_CYRILLIC_ERROR_MESSAGE)
      .regex(EMAIL_REGEXP, EMAIL_ERROR_MESSAGE),
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
    [EFormFields.Image]: imageFileSchema,
    [EFormFields.TelegramID]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.FirstName]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE)
      .regex(NAME_REGEXP, NAME_ERROR_MESSAGE),
    [EFormFields.LastName]: z
      .string()
      .trim()
      .regex(NAME_REGEXP, NAME_ERROR_MESSAGE),
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
    [EFormFields.Latitude]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.Longitude]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.Password]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.PasswordConfirm]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    path: [EFormFields.PasswordConfirm],
    message: PASSWORD_ERROR_MESSAGE,
  })
  .refine(({ mobileNumber }) => PHONE_REGEXP.test(mobileNumber), {
    path: [EFormFields.MobileNumber],
    message: PHONE_ERROR_MESSAGE,
  });
