"use client";

import Image from "next/image";
import type { FC } from "react";
import { Container } from "@/app/shared/components/container";
import { useTelegram } from "@/app/shared/hooks";
import { Hamburger } from "@/app/uikit/components/hamburger";
import "./ProfilePage.scss";
import { DropDown } from "@/app/uikit/components/dropDown";

export const ProfilePage: FC = () => {
  const { user } = useTelegram();

  return (
    <>
      <DropDown>
        <DropDown.Button
          classes={{ dropDownButton: "ProfilePage-DropDown-Button" }}
        >
          <Hamburger />
        </DropDown.Button>
        <DropDown.Panel
          classes={{ dropDownPanel: "ProfilePage-DropDown-Panel" }}
        >
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
            src="https://img.freepik.com/premium-photo/photo-portrait-of-pretty-girl-in-orange-sweater-smiling-isolated-on-bright-teal-color-background_908985-11469.jpg"
            quality={100}
          />
        </div>
        <Container>
          <div className="ProfilePage-User">
            <div className="ProfilePage-UserAvatar">
              <Image
                alt="Фото"
                className="ProfilePage-UserAvatarImage"
                height={50}
                width={50}
                priority={true}
                src="https://img.freepik.com/premium-photo/photo-portrait-of-pretty-girl-in-orange-sweater-smiling-isolated-on-bright-teal-color-background_908985-11469.jpg"
                quality={100}
              />
            </div>
            <div className="ProfilePage-UserWraperName">
              <div className="ProfilePage-UserDisplayName">
                Наташа, 19, Москва
              </div>
              <div className="ProfilePage-Username">
                {/*{user?.username}*/}
                @natali
              </div>
            </div>
          </div>
          <div className="ProfilePage-Description">
            Я учусь на 2-ом курсе на факультете иностранных языков,
            специализируюсь на английском, ведь это самый популярный язык
            международного общения. Меня с детства привлекала профессия
            переводчика, так как этот специалист помогает людям разных культур
            общаться и понимать друг друга. Также увлекаюсь театральным
            искусством: не только посещаю спектакли, но и сама играю в
            любительских постановках.
          </div>
        </Container>
      </div>
    </>
  );
};
