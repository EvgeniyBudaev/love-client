"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import type { TProfileByTelegramId } from "@/app/api/profile/byTelegramId";
import type { TProfileList } from "@/app/api/profile/list";
import { SearchForm } from "@/app/entities/search/searchForm";
import { useProxyUrl } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { ERoutes } from "@/app/shared/enums";
import "./MainPage.scss";

type TProps = {
  profile?: TProfileByTelegramId;
  profileList?: TProfileList;
};

export const MainPage: FC<TProps> = ({ profile, profileList }) => {
  const { proxyUrl } = useProxyUrl();

  return (
    <div className="MainPage">
      <SearchForm profile={profile} />
      <Link
        href={createPath({
          route: ERoutes.ProfileAdd,
        })}
      >
        Создать профиль
      </Link>
      <div className="MainPage-List">
        {(profileList?.content ?? []).map((item) => (
          <Link
            href={createPath({
              route: ERoutes.Profile,
              params: { id: item.id },
            })}
            key={item.id}
          >
            <div className="MainPage-WrapperImage" key={item.id}>
              <Image
                alt=""
                className="MainPage-Image"
                fill={true}
                priority={true}
                sizes="100vw"
                src={`${proxyUrl}${item.image.url}`}
                quality={100}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
