"use server";

import { revalidatePath } from "next/cache";
import { editProfileFormSchema } from "@/app/actions/profile/edit/schemas";
import { editProfile, type TEditProfileParams } from "@/app/api/profile/edit";
import { mapUpdateToDto } from "@/app/api/profile/edit/utils";
import { ERoutes } from "@/app/shared/enums";
import type { TCommonResponseError } from "@/app/shared/types/error";
import {
  getResponseError,
  getErrorsResolver,
  createPath,
} from "@/app/shared/utils";
import { normalizePhoneNumber } from "@/app/shared/utils/form/normalizePhoneNumber";
import { update } from "@/app/api/auth/update";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import type { TSession } from "@/app/shared/types/session";
import { redirect } from "next/navigation";
import { ESearchGender } from "@/app/shared/enums/form";

export async function editProfileAction(prevState: any, formData: FormData) {
  const session = (await getServerSession(authOptions)) as TSession;
  if (!session) {
    return redirect(
      createPath({
        route: ERoutes.Login,
      }),
    );
  }
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
    const mapperParams = mapUpdateToDto(formattedParams);

    // Update user to keycloak (does not update username)
    // const userResponse = await update({...mapperParams.updateForm, id: session.user.id});
    // if (userResponse.success) {
    // }
    const profileFormData = new FormData();
    profileFormData.append("id", mapperParams.profileForm.id);
    profileFormData.append("userId", session.user.id);
    profileFormData.append("userName", mapperParams.profileForm.userName);
    profileFormData.append("displayName", mapperParams.profileForm.displayName);
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
      if (mapperParams.profileForm?.image) {
        profileFormData.append("image", mapperParams.profileForm.image);
      }
    }
    profileFormData.append("telegramId", mapperParams.profileForm.telegramId);
    profileFormData.append(
      "telegramUserName",
      mapperParams.profileForm.telegramUserName,
    );
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

    const response = await editProfile(
      formData as unknown as TEditProfileParams,
    );
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
