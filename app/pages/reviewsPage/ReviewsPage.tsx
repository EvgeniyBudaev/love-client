"use client";

import Link from "next/link";
import { type FC } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Header } from "@/app/shared/components/header";
import { ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";

export const ReviewsPage: FC = () => {
  const { t } = useTranslation("index");

  return (
    <div className="ReviewsPage">
      <Header className="SidebarContent-Header">
        <div />
        <div>{t("common.actions.reviews")}</div>
        <Link
          className="Header-Action"
          href={createPath({
            route: ERoutes.ReviewAdd,
          })}
        >
          {t("common.actions.add")}
        </Link>
      </Header>
    </div>
  );
};
