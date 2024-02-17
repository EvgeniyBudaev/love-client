import { fetchApi, TApiFunction } from "@/app/api";
import type { TDelete, TDeleteParams } from "@/app/api/auth/delete";
import { EFormMethods } from "@/app/shared/enums";

export const deleteApi: TApiFunction<TDeleteParams, TDelete> = (params) => {
  const { id } = params;
  console.log("id", id);
  return fetchApi<TDelete>(`/api/v1/user/delete`, {
    method: EFormMethods.Delete,
    body: params,
  });
};
