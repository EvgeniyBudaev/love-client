"use client";

import Link from "next/link";
import { FC } from "react";
import { useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { ERoutes } from "@/app/shared/enums";

export const MainPage: FC = () => {
  const { tg, user, queryId } = useTelegram();

  return (
    <div>
      <div>Привет!</div>
      <div>{user?.username}</div>
      <Link
        href={createPath({
          route: ERoutes.ProfileAdd,
        })}
      >
        Создать профиль
      </Link>
    </div>
  );
};
