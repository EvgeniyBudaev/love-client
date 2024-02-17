"use server";

import { revalidatePath } from "next/cache";
import { deleteProfileFormSchema } from "@/app/actions/profile/delete/schemas";
import {
  deleteProfile,
  type TDeleteProfileParams,
} from "@/app/api/profile/delete";
import { ERoutes } from "@/app/shared/enums";
import type { TCommonResponseError } from "@/app/shared/types/error";
import {
  getResponseError,
  getErrorsResolver,
  createPath,
} from "@/app/shared/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { TSession } from "@/app/shared/types/session";
import { redirect } from "next/navigation";
import { deleteUser } from "@/app/api/auth/delete";

export async function deleteProfileAction(prevState: any, formData: FormData) {
  const session = (await getServerSession(authOptions)) as TSession;
  if (!session) {
    return redirect(
      createPath({
        route: ERoutes.Login,
      }),
    );
  }
  // console.log(
  //   "deleteProfileAction resolver: ",
  //   Object.fromEntries(formData.entries()),
  // );
  const resolver = deleteProfileFormSchema.safeParse(
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
    const userResponse = await deleteUser({ id: session.user.id });

    if (userResponse) {
      const response = await deleteProfile(
        formData as unknown as TDeleteProfileParams,
      );
      const path = createPath({
        route: ERoutes.Profile,
        params: { id: resolver.data.id },
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
