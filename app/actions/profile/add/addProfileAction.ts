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
    };
    console.log("addProfileAction formattedParams: ", formattedParams);
    const response = await addProfile(formData as unknown as TAddProfileParams);
    console.log("addProfileAction response: ", response);
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