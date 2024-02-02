import { fetchApi, TApiFunction } from "@/app/api";
import type {
  TProfileDetailParams,
  TProfileDetailResponse,
} from "@/app/api/profile/detail/types";
import { EFormMethods } from "@/app/shared/enums";

export const getProfileDetailApi: TApiFunction<
  TProfileDetailParams,
  TProfileDetailResponse
> = (params) => {
  const { id } = params;
  const url = `/api/v1/profile/${id}`;
  return fetchApi<TProfileDetailResponse>(url, {
    method: EFormMethods.Get,
  });
};
