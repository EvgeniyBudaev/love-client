import Link from "next/link";
import type { FC } from "react";
import { ERoutes } from "@/app/shared/enums";
import { NavLink } from "@/app/shared/components/navLink";
import { Avatar } from "@/app/uikit/components/avatar";
import { Icon } from "@/app/uikit/components/icon";
import { createPath } from "@/app/shared/utils";
import "./Footer.scss";

export const Footer: FC = () => {
  return (
    <div className="Footer">
      <div className="Footer-Item">
        <NavLink
          activeClassName="Footer-Link__isActive"
          href={createPath({
            route: ERoutes.Root,
          })}
        >
          <Icon type="Search" />
        </NavLink>
      </div>
      <div className="Footer-Item">
        <NavLink
          activeClassName="Footer-Link__isActive"
          href={createPath({
            route: ERoutes.Profile,
          })}
        >
          <div className="Footer-Avatar">
            <Avatar
              size={32}
              image="https://img.freepik.com/premium-photo/photo-portrait-of-pretty-girl-in-orange-sweater-smiling-isolated-on-bright-teal-color-background_908985-11469.jpg"
            />
          </div>
        </NavLink>
      </div>
    </div>
  );
};
