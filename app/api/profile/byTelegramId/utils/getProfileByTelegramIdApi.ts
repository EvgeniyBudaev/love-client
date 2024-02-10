import { fetchApi, TApiFunction } from "@/app/api";
import type {
  TProfileByTelegramIdParams,
  TProfileByTelegramIdResponse,
} from "@/app/api/profile/byTelegramId";
import { EFormMethods } from "@/app/shared/enums";

export const getProfileByTelegramIdApi: TApiFunction<
  TProfileByTelegramIdParams,
  TProfileByTelegramIdResponse
> = (params) => {
  const { telegramId } = params;
  const url = `/api/v1/profile/telegram/${telegramId}`;
  return fetchApi<TProfileByTelegramIdResponse>(url, {
    method: EFormMethods.Get,
  });
};
