import { getProfileDetail } from "@/app/api/profile/detail";
import { ProfilePage } from "@/app/pages/profilePage";

type TLoader = {
  id: string;
};

async function loader(params: TLoader) {
  const { id } = params;
  try {
    const profileDetailResponse = await getProfileDetail({ id: id });
    const profile = profileDetailResponse.data;
    return { profile };
  } catch (error) {
    throw new Error("errorBoundary.common.unexpectedError");
  }
}

type TProps = {
  params: { lng: string; id: string };
};

export default async function ProfileDetailRoute(props: TProps) {
  const { params } = props;
  const { id } = params;
  const data = await loader({ id });
  return <ProfilePage profile={data?.profile} />;
}
