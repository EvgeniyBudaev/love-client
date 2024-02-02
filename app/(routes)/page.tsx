import { MainPage } from "@/app/pages/mainPage";
import { getProfileList } from "@/app/api/profile/list";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_LIMIT,
} from "@/app/shared/constants/pagination";

async function loader() {
  try {
    const profileListResponse = await getProfileList({
      page: DEFAULT_PAGE.toString(),
      limit: DEFAULT_PAGE_LIMIT.toString(),
    });
    const profileList = profileListResponse.data;
    return { profileList };
  } catch (error) {
    throw new Error("errorBoundary.common.unexpectedError");
  }
}

export default async function MainRoute() {
  const data = await loader();

  return (
    <main>
      <MainPage profileList={data?.profileList} />
    </main>
  );
}
