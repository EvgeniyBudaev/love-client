"use client";

import isNil from "lodash/isNil";
import Image from "next/image";
import Link from "next/link";
import { FC, useRef, useState } from "react";
import type { TProfile } from "@/app/api/profile/add";
import { ProfileSidebar } from "@/app/entities/profile/profileSidebar";
import { useTranslation } from "@/app/i18n/client";
import { Container } from "@/app/shared/components/container";
import { Field } from "@/app/shared/components/form/field";
import { DEFAULT_LANGUAGE } from "@/app/shared/constants/language";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useProxyUrl, useTelegram } from "@/app/shared/hooks";
import { PROFILE_LOOKING_FOR_MAPPING } from "@/app/shared/mapping/profile";
import { createPath } from "@/app/shared/utils";
import { DropDown } from "@/app/uikit/components/dropDown";
import { Hamburger } from "@/app/uikit/components/hamburger";
import { Icon } from "@/app/uikit/components/icon";
import { Slider } from "@/app/uikit/components/slider";
import { getFullYear } from "@/app/uikit/utils/date";
import "./ProfilePage.scss";

type TProps = {
  profile?: TProfile;
};

export const ProfilePage: FC<TProps> = ({ profile }) => {
  const { proxyUrl } = useProxyUrl();
  const { user } = useTelegram();
  const { t } = useTranslation("index");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const fullYear = getFullYear(profile?.birthday);
  const language = (user?.language_code as ELanguage) ?? DEFAULT_LANGUAGE;

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <DropDown>
        <DropDown.Button>
          <Hamburger />
        </DropDown.Button>
        <DropDown.Panel>
          <div className="DropDown-Menu">
            {profile?.id && (
              <Link
                className="DropDown-MenuItem"
                href={createPath({
                  route: ERoutes.ProfileEdit,
                  params: { id: profile.id },
                })}
              >
                {t("common.actions.edit")}
              </Link>
            )}
          </div>
          <div className="DropDown-Menu">
            <div className="DropDown-MenuItem" onClick={handleOpenSidebar}>
              {t("common.actions.settings")}
            </div>
          </div>
          <div className="DropDown-Menu">
            <div className="DropDown-MenuItem DropDown-MenuItem-Cancel">
              {t("common.actions.cancel")}
            </div>
          </div>
        </DropDown.Panel>
      </DropDown>
      <ProfileSidebar
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={handleCloseSidebar}
        profile={profile}
        ref={sidebarRef}
      />
      <div className="ProfilePage">
        <div className="ProfilePage-Slider">
          <Slider images={profile?.images} />
        </div>
        <Container>
          <div className="ProfilePage-User">
            <div className="ProfilePage-UserAvatar">
              {!isNil(profile?.images?.[0]) ? (
                <Image
                  alt={`${profile?.images?.[0].url}`}
                  className="ProfilePage-UserAvatarImage"
                  height={50}
                  width={50}
                  priority={true}
                  src={`${proxyUrl}${profile?.images?.[0].url}`}
                  quality={100}
                />
              ) : (
                <Icon type="NoImage" />
              )}
            </div>
            <div className="ProfilePage-Inner">
              <div className="ProfilePage-Label">
                {profile?.displayName}, {fullYear}
              </div>
            </div>
          </div>
          {profile?.description && (
            <Field>
              <div className="ProfilePage-Inner">
                <div>{profile?.description}</div>
              </div>
            </Field>
          )}
          <div className="ProfilePage-Label">
            {t("common.titles.moreDetails")}
          </div>
          {profile?.location && (
            <Field>
              <div className="ProfilePage-Row">
                <Icon className="ProfilePage-Icon" type="Location" />
                <span>{profile?.location}</span>
              </div>
            </Field>
          )}
          {((!isNil(profile?.height) && profile?.height !== 0) ||
            (!isNil(profile?.weight) && profile?.weight !== 0)) && (
            <Field>
              <div className="ProfilePage-Row">
                <Icon className="ProfilePage-Icon" type="Person" />
                {!isNil(profile?.height) && (
                  <span>
                    {profile?.height} {t("common.reductions.cm")}&nbsp;
                  </span>
                )}
                {!isNil(profile?.weight) && (
                  <span>
                    {profile?.weight} {t("common.reductions.kg")}&nbsp;
                  </span>
                )}
              </div>
            </Field>
          )}
          {profile?.lookingFor && (
            <Field>
              <div className="ProfilePage-Row">
                <Icon className="ProfilePage-Icon" type="Watch" />
                <span>
                  {PROFILE_LOOKING_FOR_MAPPING[profile?.lookingFor][language]}
                </span>
              </div>
            </Field>
          )}
        </Container>
      </div>
    </>
  );
};
