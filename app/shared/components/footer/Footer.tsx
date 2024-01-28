import Link from "next/link";
import type { FC } from "react";
import { ERoutes } from "@/app/shared/enums";
import { Avatar } from "@/app/uikit/components/avatar";
import { createPath } from "@/app/shared/utils";
import "./Footer.scss";
import { Icon } from "@/app/uikit/components/icon";

export const Footer: FC = () => {
  return (
    <div className="Footer">
      <div className="Footer-Item">
        <Link
          href={createPath({
            route: ERoutes.Root,
          })}
        >
          <Icon type="Search" />
        </Link>
      </div>
      <div className="Footer-Item">
        <Link
          href={createPath({
            route: ERoutes.Profile,
          })}
        >
          <Avatar
            size={46}
            image="https://img.freepik.com/premium-photo/photo-portrait-of-pretty-girl-in-orange-sweater-smiling-isolated-on-bright-teal-color-background_908985-11469.jpg"
          />
        </Link>
      </div>
    </div>
  );
};
