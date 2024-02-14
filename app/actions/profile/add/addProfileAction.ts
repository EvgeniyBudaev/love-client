"use server";

import { revalidatePath } from "next/cache";
import { addProfileFormSchema } from "@/app/actions/profile/add/schemas";
import { addProfile, type TAddProfileParams } from "@/app/api/profile/add";
import { ERoutes } from "@/app/shared/enums";
import type { TCommonResponseError } from "@/app/shared/types/error";
import {
  getResponseError,
  getErrorsResolver,
  createPath,
} from "@/app/shared/utils";
import { normalizePhoneNumber } from "@/app/shared/utils/form/normalizePhoneNumber";
import { mapSignupToDto } from "@/app/api/auth/signup/utils/mapSignupToDto";
import { signup } from "@/app/api/auth/signup";

export async function addProfileAction(prevState: any, formData: FormData) {
  console.log(
    "addProfileAction resolver: ",
    Object.fromEntries(formData.entries()),
  );
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
      mobileNumber: normalizePhoneNumber(resolver.data?.mobileNumber),
    };
    const mapperParams = mapSignupToDto(formattedParams);
    console.log("[mapperParams] ", mapperParams);
    const userResponse = await signup(mapperParams);

    // if (userResponse.success) {
    //   const profileFormData = new FormData();
    //   profileFormData.append("userId", userResponse.data.id);
    //   profileFormData.append("username", userResponse.data.username);
    //   profileFormData.append("firstName", userResponse.data.firstName);
    //   profileFormData.append("lastName", userResponse.data.lastName);
    //   profileFormData.append("email", userResponse.data.email);
    //   const response = await addProfile(formData as unknown as TAddProfileParams);
    //   const path = createPath({
    //     route: ERoutes.ProfileAdd,
    //   });
    //   revalidatePath(path);
    //   return {
    //     data: response.data,
    //     error: undefined,
    //     errors: undefined,
    //     success: true,
    //   };
    // }

    return {
      data: undefined,
      errorUI: undefined,
      errors: undefined,
      success: true,
    };
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
