"use client";

import type { FC } from "react";
import { useTelegram } from "@/app/shared/hooks";

export const ProfilePage: FC = () => {
  const { user } = useTelegram();

  return (
    <div>
      <div>Профиль:</div>
      <div>{user?.username}</div>
    </div>
  );
};
