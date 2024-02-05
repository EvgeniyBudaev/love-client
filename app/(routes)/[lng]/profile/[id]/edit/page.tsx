import { getProfileDetail } from "@/app/api/profile/detail";
import { ProfileBlocked } from "@/app/entities/profile/profileBlocked";
import { ProfileDeleted } from "@/app/entities/profile/profileDeleted";
import { useTranslation } from "@/app/i18n";
import { ProfileEditPage } from "@/app/pages/profileEditPage";
import { ErrorBoundary } from "@/app/shared/components/errorBoundary";

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

export default async function ProfileEditRoute(props: TProps) {
  const { params } = props;
  const { lng, id } = params;
  const { i18n, t } = await useTranslation(lng, "index");

  try {
    const data = await loader({ id });

    if (data?.profile?.isBlocked) {
      return <ProfileBlocked />;
    }

    if (data?.profile?.isDeleted) {
      return <ProfileDeleted />;
    }

    return <ProfileEditPage profile={data?.profile} />;
  } catch (error) {
    const err = error as Error;
    return <ErrorBoundary i18n={i18n} message={t(err.message)} />;
  }
}
