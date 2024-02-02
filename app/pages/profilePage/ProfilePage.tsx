"use client";

import isNil from "lodash/isNil";
import Image from "next/image";
import type { FC } from "react";
import { TProfile } from "@/app/api/profile/add";
import { Container } from "@/app/shared/components/container";
import { Field } from "@/app/shared/components/form/field";
import { useProxyUrl, useTelegram } from "@/app/shared/hooks";
import { PROFILE_LOOKING_FOR_MAPPING } from "@/app/shared/mapping/profile";
import { DropDown } from "@/app/uikit/components/dropDown";
import { Hamburger } from "@/app/uikit/components/hamburger";
import { Icon } from "@/app/uikit/components/icon";
import { getFullYear } from "@/app/uikit/utils/date";
import "./ProfilePage.scss";

type TProps = {
  profile?: TProfile;
};

export const ProfilePage: FC<TProps> = ({ profile }) => {
  const { proxyUrl } = useProxyUrl();
  const { user } = useTelegram();
  const fullYear = getFullYear(profile?.birthday);
  console.log("profile: ", profile);

  return (
    <>
      <DropDown>
        <DropDown.Button>
          <Hamburger />
        </DropDown.Button>
        <DropDown.Panel>
          <div className="ProfilePage-DropDown-Menu">
            <div className="ProfilePage-DropDown-MenuItem">
              Редактировать профиль
            </div>
          </div>
          <div className="ProfilePage-DropDown-Menu">
            <div className="ProfilePage-DropDown-MenuItem ProfilePage-DropDown-MenuItem-Cancel">
              Отменить
            </div>
          </div>
        </DropDown.Panel>
      </DropDown>
      <div className="ProfilePage">
        <div className="ProfilePage-WrapperMainImage">
          <Image
            alt="Фото"
            className="ProfilePage-MainImage"
            fill={true}
            priority={true}
            sizes="100vw"
            src={`${proxyUrl}${profile?.images?.[0].url}`}
            quality={100}
          />
        </div>
        <Container>
          <div className="ProfilePage-User">
            <div className="ProfilePage-UserAvatar">
              {!isNil(profile?.images?.[0]) ? (
                <Image
                  alt="Фото"
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
              {/*<div className="ProfilePage-Username">*/}
              {/*  {user?.username ?? "-"}*/}
              {/*</div>*/}
            </div>
          </div>
          {profile?.description && (
            <Field>
              <div className="ProfilePage-Inner">
                <div>{profile?.description}</div>
              </div>
            </Field>
          )}
          <div className="ProfilePage-Label">Подробнее</div>
          {profile?.location && (
            <Field>
              <div className="ProfilePage-Row">
                <Icon className="ProfilePage-Icon" type="Location" />
                <span>{profile?.location}</span>
              </div>
            </Field>
          )}
          {(profile?.height || profile?.weight) && (
            <Field>
              <div className="ProfilePage-Row">
                <Icon className="ProfilePage-Icon" type="Person" />
                {profile?.height && <span>{profile?.height} см&nbsp;</span>}
                {profile?.weight && <span>{profile?.weight} кг&nbsp;</span>}
              </div>
            </Field>
          )}
          {profile?.lookingFor && (
            <Field>
              <div className="ProfilePage-Row">
                <Icon className="ProfilePage-Icon" type="Watch" />
                <span>{PROFILE_LOOKING_FOR_MAPPING[profile?.lookingFor]}</span>
              </div>
            </Field>
          )}
        </Container>
      </div>
    </>
  );
};
