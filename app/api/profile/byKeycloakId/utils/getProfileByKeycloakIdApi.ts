import { fetchApi, TApiFunction } from "@/app/api";
import type {
  TProfileByKeycloakIdParams,
  TProfileByKeycloakIdResponse,
} from "@/app/api/profile/byKeycloakId";
import { EFormMethods } from "@/app/shared/enums";

export const getProfileByKeycloakIdApi: TApiFunction<
  TProfileByKeycloakIdParams,
  TProfileByKeycloakIdResponse
> = (params) => {
  const { userId } = params;
  const queryParams = {
    ...(params?.latitude && { latitude: params?.latitude }),
    ...(params?.longitude && { longitude: params?.longitude }),
  };
  const url = `/api/v1/profile/keycloak/${userId}?${new URLSearchParams(queryParams)}`;
  return fetchApi<TProfileByKeycloakIdResponse>(url, {
    method: EFormMethods.Get,
  });
};
