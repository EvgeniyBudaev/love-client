import { MainPage } from "@/app/pages/mainPage";
import { getProfileList } from "@/app/api/profile/list";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_LIMIT,
} from "@/app/shared/constants/pagination";
import {
  DEFAULT_AGE_FROM,
  DEFAULT_AGE_TO,
} from "@/app/shared/constants/filter";

type TSearchParams = {
  page?: string;
  limit?: string;
  ageFrom?: string;
  ageTo?: string;
};

type TMainLoader = {
  searchParams: TSearchParams;
};

async function mainLoader(params: TMainLoader) {
  const { searchParams } = params;
  try {
    const profileListResponse = await getProfileList({
      page: searchParams.page ?? DEFAULT_PAGE.toString(),
      limit: searchParams.limit ?? DEFAULT_PAGE_LIMIT.toString(),
      ageFrom: searchParams.ageFrom ?? DEFAULT_AGE_FROM.toString(),
      ageTo: searchParams.ageTo ?? DEFAULT_AGE_TO.toString(),
    });
    const profileList = profileListResponse.data;
    return { profileList };
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
      <MainPage profileList={data?.profileList} />
    </main>
  );
}
