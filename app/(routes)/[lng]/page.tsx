import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProfileByTelegramId } from "@/app/api/profile/byTelegramId";
import { getProfileList } from "@/app/api/profile/list";
import { useTranslation } from "@/app/i18n";
import { MainPage } from "@/app/pages/mainPage";
import {
  DEFAULT_AGE_FROM,
  DEFAULT_AGE_TO,
  DEFAULT_SEARCH_GENDER,
} from "@/app/shared/constants/filter";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_LIMIT,
} from "@/app/shared/constants/pagination";
import { ERoutes } from "@/app/shared/enums";
import type { TSession } from "@/app/shared/types/session";
import { createPath } from "@/app/shared/utils";
import { ErrorBoundary } from "@/app/shared/components/errorBoundary";
import { DEFAULT_DISTANCE } from "@/app/shared/constants/distance";

type TSearchParams = {
  profileId?: string;
  telegramId?: string;
  page?: string;
  limit?: string;
  ageFrom?: string;
  ageTo?: string;
  searchGender?: string;
};

type TMainLoader = {
  searchParams: TSearchParams;
};

async function mainLoader(params: TMainLoader) {
  const session = (await getServerSession(authOptions)) as TSession;
  if (!session) {
    return redirect(
      createPath({
        route: ERoutes.Login,
      }),
    );
  }
  const { searchParams } = params;
  try {
    const profileResponse = searchParams.telegramId
      ? await getProfileByTelegramId({ telegramId: searchParams.telegramId })
      : undefined;
    if (profileResponse?.success && profileResponse.data) {
      const profile = profileResponse.data;
      const profileListResponse = await getProfileList({
        page: searchParams?.page ?? DEFAULT_PAGE.toString(),
        limit: searchParams?.limit ?? DEFAULT_PAGE_LIMIT.toString(),
        ageFrom: searchParams?.ageFrom ?? DEFAULT_AGE_FROM.toString(),
        ageTo: searchParams?.ageTo ?? DEFAULT_AGE_TO.toString(),
        searchGender: searchParams?.searchGender ?? DEFAULT_SEARCH_GENDER,
        profileId: profile.id.toString(),
        distance: DEFAULT_DISTANCE.toString(),
      });

      const profileList = profileListResponse.data;
      return { profile, profileList };
    }
  } catch (error) {
    throw new Error("errorBoundary.common.unexpectedError");
  }
}

type TProps = {
  params: { lng: string };
  searchParams?: TSearchParams;
};

export default async function MainRoute(props: TProps) {
  const data = await mainLoader({ searchParams: props?.searchParams ?? {} });

  return (
    <main>
      <MainPage profile={data?.profile} profileList={data?.profileList} />
    </main>
  );
}
