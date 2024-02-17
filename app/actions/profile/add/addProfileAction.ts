"use server";

import { revalidatePath } from "next/cache";
import { addProfileFormSchema } from "@/app/actions/profile/add/schemas";
import { addProfile, type TAddProfileParams } from "@/app/api/profile/add";
import { mapSignupToDto } from "@/app/api/auth/signup/utils/mapSignupToDto";
import { signup } from "@/app/api/auth/signup";
import { ERoutes } from "@/app/shared/enums";
import { ESearchGender } from "@/app/shared/enums/form";
import type { TCommonResponseError } from "@/app/shared/types/error";
import {
  getResponseError,
  getErrorsResolver,
  createPath,
} from "@/app/shared/utils";
import { normalizePhoneNumber } from "@/app/shared/utils/form/normalizePhoneNumber";

export async function addProfileAction(prevState: any, formData: FormData) {
  const resolver = addProfileFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!resolver.success) {
    const errors = getErrorsResolver(resolver);
    return {
      data: undefined,
      error: undefined,
      errors: errors,
      success: false,
    };
  }

  try {
    const formattedParams = {
      ...resolver.data,
      userName: normalizePhoneNumber(resolver.data?.userName),
      mobileNumber: normalizePhoneNumber(resolver.data?.mobileNumber),
    };
    const mapperParams = mapSignupToDto(formattedParams);
    const userResponse = await signup(mapperParams.signupForm);

    if (userResponse.success) {
      const profileFormData = new FormData();
      profileFormData.append("userId", userResponse.data.id);
      profileFormData.append(
        "displayName",
        mapperParams.profileForm.displayName,
      );
      profileFormData.append(
        "firstName",
        mapperParams.profileForm?.firstName ?? "",
      );
      profileFormData.append(
        "lastName",
        mapperParams.profileForm?.lastName ?? "",
      );
      profileFormData.append("birthday", mapperParams.profileForm.birthday);
      profileFormData.append("gender", mapperParams.profileForm.gender);
      profileFormData.append(
        "searchGender",
        mapperParams.profileForm?.searchGender ?? ESearchGender.All,
      );
      profileFormData.append(
        "location",
        mapperParams.profileForm?.location ?? "",
      );
      profileFormData.append(
        "description",
        mapperParams.profileForm?.description ?? "",
      );
      profileFormData.append("height", mapperParams.profileForm?.height ?? "");
      profileFormData.append("weight", mapperParams.profileForm?.weight ?? "");
      profileFormData.append(
        "lookingFor",
        mapperParams.profileForm?.lookingFor ?? "",
      );
      if (Array.isArray(mapperParams.profileForm.image)) {
        mapperParams.profileForm.image.forEach((item) => {
          profileFormData.append("image", item);
        });
      } else {
        profileFormData.append("image", mapperParams.profileForm.image);
      }
      profileFormData.append("telegramId", mapperParams.profileForm.telegramId);
      profileFormData.append("username", mapperParams.profileForm.userName);
      profileFormData.append(
        "firstName",
        mapperParams.profileForm?.firstName ?? "",
      );
      profileFormData.append(
        "lastName",
        mapperParams.profileForm?.lastName ?? "",
      );
      profileFormData.append(
        "languageCode",
        mapperParams.profileForm.languageCode,
      );
      profileFormData.append(
        "allowsWriteToPm",
        mapperParams.profileForm.allowsWriteToPm,
      );
      profileFormData.append("queryId", mapperParams.profileForm.queryId);
      profileFormData.append("latitude", mapperParams.profileForm.latitude);
      profileFormData.append("longitude", mapperParams.profileForm.longitude);
      profileFormData.append("ageFrom", mapperParams.profileForm.ageFrom);
      profileFormData.append("ageTo", mapperParams.profileForm.ageTo);
      profileFormData.append("distance", mapperParams.profileForm.distance);
      profileFormData.append("page", mapperParams.profileForm.page);
      profileFormData.append("size", mapperParams.profileForm.size);

      const response = await addProfile(
        profileFormData as unknown as TAddProfileParams,
      );
      const path = createPath({
        route: ERoutes.ProfileAdd,
      });
      revalidatePath(path);
      return {
        data: response.data,
        error: undefined,
        errors: undefined,
        success: true,
      };
    }

    // return {
    //   data: undefined,
    //   errorUI: undefined,
    //   errors: undefined,
    //   success: false,
    // };
  } catch (error) {
    const errorResponse = error as Response;
    const responseData: TCommonResponseError = await errorResponse.json();
    const { message: formError, fieldErrors } =
      getResponseError(responseData) ?? {};
    console.log("[formError] ", formError);
    console.log("[fieldErrors] ", fieldErrors);
    return {
      data: undefined,
      error: formError,
      errors: fieldErrors,
      success: false,
    };
  }
}
