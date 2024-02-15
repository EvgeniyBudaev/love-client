import type { FC } from "react";
import { TProfileDetail } from "@/app/api/profile/add";
import { ProfileForm } from "@/app/entities/profile/profileForm";

type TProps = {
  lng: string;
  profile?: TProfileDetail;
};

export const ProfileEditPage: FC<TProps> = ({ lng, profile }) => {
  return <ProfileForm isEdit={true} lng={lng} profile={profile} />;
};
