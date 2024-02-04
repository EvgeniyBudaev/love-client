"use server";

import { revalidatePath } from "next/cache";
import { editProfileFormSchema } from "@/app/actions/profile/edit/schemas";
import { editProfile, type TEditProfileParams } from "@/app/api/profile/edit";
import { ERoutes } from "@/app/shared/enums";
import type { TCommonResponseError } from "@/app/shared/types/error";
import {
  getResponseError,
  getErrorsResolver,
  createPath,
} from "@/app/shared/utils";

export async function editProfileAction(prevState: any, formData: FormData) {
  // console.log(
  //   "editProfileAction resolver: ",
  //   Object.fromEntries(formData.entries()),
  // );
  const resolver = editProfileFormSchema.safeParse(
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
    };
    console.log("editProfileAction formattedParams: ", formattedParams);
    const response = await editProfile(
      formData as unknown as TEditProfileParams,
    );
    console.log("response: ", response);
    const path = createPath({
      route: ERoutes.ProfileEdit,
      params: { id: resolver.data.id },
    });
    revalidatePath(path);
    return {
      data: response.data,
      error: undefined,
      errors: undefined,
      success: true,
    };
    // return {
    //   data: undefined,
    //   errorUI: undefined,
    //   errors: undefined,
    //   success: true,
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
