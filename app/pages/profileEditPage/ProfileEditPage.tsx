import type { FC } from "react";
import { TProfileDetail } from "@/app/api/profile/add";
import { ProfileForm } from "@/app/entities/profile/profileForm";

type TProps = {
  profile?: TProfileDetail;
};

export const ProfileEditPage: FC<TProps> = ({ profile }) => {
  return <ProfileForm isEdit={true} profile={profile} />;
};
