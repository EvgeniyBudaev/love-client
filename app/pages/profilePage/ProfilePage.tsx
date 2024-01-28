"use client";

import Image from "next/image";
import type { FC } from "react";
import { Container } from "@/app/shared/components/container";
import { useTelegram } from "@/app/shared/hooks";
import "./ProfilePage.scss";

export const ProfilePage: FC = () => {
  const { user } = useTelegram();

  return (
    <div className="ProfilePage">
      <div className="ProfilePage-WrapperMainImage">
        <Image
          alt="Фото"
          className="ProfilePage-MainImage"
          // height={300}
          // width={470}
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
              // fill={true}
              priority={true}
              // sizes="100vw"
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
  );
};
